'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Mail, X } from 'lucide-react';
import NewsletterForm from '@/components/sections/NewsletterForm.client';

const noopSubscribe = () => () => {};

/**
 * "Subscribe" button that opens the newsletter signup in a modal.
 * Uses the same form and /api/newsletter/subscribe endpoint as the inline form.
 */
export default function NewsletterPopupButton({ label = 'Subscribe' }: { label?: string }) {
  const [open, setOpen] = useState(false);
  // true only in the browser, so the portal never renders during SSR
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Close on Escape + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
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
                className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-esn-navy/60 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                  aria-hidden
                />

                {/* Dialog: bottom sheet on phones, centered card on larger screens */}
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="newsletter-popup-title"
                  className="relative w-full sm:max-w-lg overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
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

                  <div className="px-6 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-10 sm:pt-12 sm:pb-10 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-esn-cyan/10">
                      <Mail className="h-6 w-6 text-esn-dark" />
                    </div>
                    <h2
                      id="newsletter-popup-title"
                      className="mb-3 text-2xl sm:text-3xl font-black tracking-tight text-esn-dark"
                    >
                      Never Miss an Update
                    </h2>
                    <p className="mx-auto mb-7 max-w-sm text-sm sm:text-base text-gray-600">
                      Subscribe to our newsletter and get ESN Ukraine news straight to your inbox.
                    </p>
                    <NewsletterForm autoFocus />
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
