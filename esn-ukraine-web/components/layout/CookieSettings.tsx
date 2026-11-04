'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BarChart3 } from 'lucide-react';
import {
  getConsent,
  setConsent,
  COOKIE_CATEGORIES,
  type CookieConsentState,
} from '@/lib/cookies';
import { lockScroll } from '@/lib/scrollLock';

// ---------------------------------------------------------------------------
// Toggle Switch
// ---------------------------------------------------------------------------

function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  id,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  id: string;
  label: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 shrink-0 touch-manipulation
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esn-cyan focus-visible:ring-offset-2
        ${disabled
          ? 'bg-gray-200 cursor-not-allowed opacity-60'
          : checked
            ? 'bg-esn-cyan cursor-pointer'
            : 'bg-gray-300 cursor-pointer hover:bg-gray-400'
        }
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Category Icons
// ---------------------------------------------------------------------------

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  essential: <Shield className="w-5 h-5 text-esn-dark" />,
  analytics: <BarChart3 className="w-5 h-5 text-esn-cyan" />,
};

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// ---------------------------------------------------------------------------
// Dialog (mounted only while open, so it always starts from the saved consent)
// ---------------------------------------------------------------------------

function SettingsDialog({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [analytics, setAnalytics] = useState(() => getConsent()?.analytics ?? false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Scroll lock (iOS-safe) + focus the first control, restore focus on close
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    // preventScroll: don't let the browser jump the page on phones
    firstFocusable?.focus({ preventScroll: true });
    return () => {
      unlock();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  // Focus trap + Escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const save = useCallback(
    (state: CookieConsentState) => {
      onSave();
      // Close first, then store consent and let analytics react after the next paint
      requestAnimationFrame(() => setTimeout(() => setConsent(state), 0));
    },
    [onSave],
  );

  return (
    <motion.div
      key="cookie-settings"
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Backdrop (no blur on phones: it is expensive on low-end devices) */}
      <div
        className="absolute inset-0 bg-black/40 sm:bg-black/30 sm:backdrop-blur-sm touch-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog: bottom sheet on phones, centered card on larger screens */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="relative w-full sm:max-w-md max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl"
        initial={{ y: 24 }}
        animate={{ y: 0 }}
        exit={{ y: 24 }}
        transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* ESN gradient stripe */}
        <div className="flex h-[3px]" aria-hidden>
          <div className="flex-1 bg-esn-cyan" />
          <div className="flex-1 bg-esn-magenta" />
          <div className="flex-1 bg-esn-green" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-orange-500" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 pb-2">
          <h2 id="cookie-settings-title" className="text-lg font-black text-esn-dark tracking-tight">
            Cookie Preferences
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-esn-dark hover:bg-gray-100 transition-colors touch-manipulation"
            aria-label="Close cookie preferences"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="px-5 sm:px-6 pb-4 text-sm text-gray-500 leading-relaxed">
          Choose which cookies you&apos;d like to allow. Your preferences will be saved and you
          can change them at any time.
        </p>

        {/* Categories */}
        <div className="px-5 sm:px-6 pb-4 space-y-3">
          {COOKIE_CATEGORIES.map((cat) => {
            const isEssential = cat.id === 'essential';
            const isChecked = isEssential ? true : analytics;

            return (
              <div
                key={cat.id}
                className={`rounded-xl border p-4 transition-colors ${
                  isChecked ? 'border-esn-cyan/30 bg-esn-cyan/5' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 shrink-0">{CATEGORY_ICONS[cat.id] || null}</div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                        <span className="text-sm font-bold text-esn-dark">{cat.label}</span>
                        {isEssential && (
                          <span className="shrink-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">
                            Always Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    id={`cookie-toggle-${cat.id}`}
                    label={cat.label}
                    checked={isChecked}
                    onChange={isEssential ? () => {} : setAnalytics}
                    disabled={isEssential}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 px-5 sm:px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-6">
          <button
            type="button"
            onClick={() => save({ essential: true, analytics })}
            className="flex-1 min-h-11 px-4 py-2.5 text-sm font-bold rounded-full bg-esn-dark text-white hover:bg-esn-cyan active:scale-[0.98] transition duration-150 tracking-wide touch-manipulation"
          >
            Save Preferences
          </button>
          <button
            type="button"
            onClick={() => save({ essential: true, analytics: true })}
            className="flex-1 min-h-11 px-4 py-2.5 text-sm font-bold rounded-full border border-esn-dark text-esn-dark hover:bg-gray-50 active:scale-[0.98] transition duration-150 tracking-wide touch-manipulation"
          >
            Accept All
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Cookie Settings Modal
// ---------------------------------------------------------------------------

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function CookieSettings({ isOpen, onClose, onSave }: CookieSettingsProps) {
  return (
    <AnimatePresence>
      {isOpen && <SettingsDialog key="cookie-settings" onClose={onClose} onSave={onSave} />}
    </AnimatePresence>
  );
}
