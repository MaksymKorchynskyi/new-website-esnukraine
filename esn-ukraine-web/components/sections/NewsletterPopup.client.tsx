'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Mail, X } from 'lucide-react';
import NewsletterForm from '@/components/sections/NewsletterForm.client';
import { lockScroll } from '@/lib/scrollLock';

const noopSubscribe = () => () => {};

/**
 * "Subscribe" button that opens the newsletter signup in a modal.
 * Uses the same form and /api/newsletter/subscribe endpoint as the inline form.
 */
export default function NewsletterPopupButton({ label = 'Subscribe' }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  // true only in the browser, so the portal never renders during SSR
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  // Autofocus the email field only with a mouse/trackpad: on phones it would pop the
  // keyboard up in the middle of the opening animation and push the sheet around.
  const focusOnOpen = mounted && window.matchMedia('(pointer: fine)').matches;

  // Close on Escape + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);

    // iOS-safe page scroll lock (restores the scroll position on close)
    const unlock = lockScroll();

    // Keep the overlay matched to the visible area, so the on-screen keyboard
    // never covers the sheet (the layout viewport does not shrink on iOS).
    const vv = window.visualViewport;
    const fitToViewport = () => {
      const el = overlayRef.current;
      if (!el || !vv) return;
      el.style.top = `${vv.offsetTop}px`;
      el.style.height = `${vv.height}px`;
    };
    fitToViewport();
    vv?.addEventListener('resize', fitToViewport);
    vv?.addEventListener('scroll', fitToViewport);

    return () => {
      window.removeEventListener('keydown', onKey);
      vv?.removeEventListener('resize', fitToViewport);
      vv?.removeEventListener('scroll', fitToViewport);
      unlock();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 bg-esn-dark text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-esn-magenta transition-colors duration-300 shadow-lg shadow-esn-dark/20 hover:shadow-esn-magenta/30"
      >
        {label}
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="newsletter-popup"
                ref={overlayRef}
                className="fixed inset-x-0 top-0 h-[100dvh] z-[100] flex items-center justify-center p-4 sm:p-6 overscroll-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Backdrop: plain dim on phones, blue blur from sm up */}
                <div
                  className="absolute inset-0 bg-black/30 sm:bg-esn-navy/60 sm:backdrop-blur-sm touch-none"
                  onClick={() => setOpen(false)}
                  aria-hidden
                />

                {/* Dialog: centered card on every screen size */}
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="newsletter-popup-title"
                  className="relative w-full max-w-md sm:max-w-lg max-h-full overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-2xl"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* ESN colour strip */}
                  <div className="flex h-1" aria-hidden>
                    <div className="flex-1 bg-esn-cyan" />
                    <div className="flex-1 bg-esn-magenta" />
                    <div className="flex-1 bg-esn-green" />
                    <div className="flex-1 bg-yellow-400" />
                    <div className="flex-1 bg-orange-500" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-esn-dark transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="px-5 pt-9 pb-7 sm:px-10 sm:pt-12 sm:pb-10 text-center">
                    <div className="mx-auto mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-esn-cyan/10">
                      <Mail className="h-6 w-6 text-esn-dark" />
                    </div>
                    <h2
                      id="newsletter-popup-title"
                      className="mb-2 sm:mb-3 text-2xl sm:text-3xl font-black tracking-tight text-esn-dark"
                    >
                      Never Miss an Update
                    </h2>
                    <p className="mx-auto mb-6 sm:mb-7 max-w-sm text-sm sm:text-base text-gray-600">
                      Subscribe to our newsletter and get ESN Ukraine news straight to your inbox.
                    </p>
                    <NewsletterForm autoFocus={focusOnOpen} fullWidthButton />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
