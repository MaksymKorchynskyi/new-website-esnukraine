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

// ---------------------------------------------------------------------------
// Toggle Switch
// ---------------------------------------------------------------------------

function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  id,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  id: string;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 shrink-0
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

// ---------------------------------------------------------------------------
// Cookie Settings Modal
// ---------------------------------------------------------------------------

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function CookieSettings({ isOpen, onClose, onSave }: CookieSettingsProps) {
  const [analytics, setAnalytics] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Load current consent state when opening
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const consent = getConsent();
      setAnalytics(consent?.analytics ?? false);

      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      // Restore focus
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap + Escape handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-focus first interactive element
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const firstFocusable = modalRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      setTimeout(() => firstFocusable?.focus(), 50);
    }
  }, [isOpen]);

  const handleSavePreferences = useCallback(() => {
    const state: CookieConsentState = { essential: true, analytics };
    setConsent(state);
    onSave();
  }, [analytics, onSave]);

  const handleAcceptAll = useCallback(() => {
    const state: CookieConsentState = { essential: true, analytics: true };
    setConsent(state);
    onSave();
  }, [onSave]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[70]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label="Cookie Preferences"
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ESN gradient stripe */}
              <div className="flex h-[3px]">
                <div className="flex-1 bg-esn-cyan" />
                <div className="flex-1 bg-esn-magenta" />
                <div className="flex-1 bg-esn-green" />
                <div className="flex-1 bg-yellow-400" />
                <div className="flex-1 bg-orange-500" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <h2 className="text-lg font-black text-esn-dark tracking-tight">
                  Cookie Preferences
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-esn-dark hover:bg-gray-100 transition-colors"
                  aria-label="Close cookie preferences"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
                Choose which cookies you&apos;d like to allow. Your preferences will be
                saved and you can change them at any time.
              </p>

              {/* Categories */}
              <div className="px-6 pb-4 space-y-3">
                {COOKIE_CATEGORIES.map((cat) => {
                  const isEssential = cat.id === 'essential';
                  const isChecked = isEssential ? true : analytics;

                  return (
                    <div
                      key={cat.id}
                      className={`rounded-xl border p-4 transition-colors ${
                        isChecked
                          ? 'border-esn-cyan/30 bg-esn-cyan/5'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {CATEGORY_ICONS[cat.id] || null}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                              <span className="text-sm font-bold text-esn-dark">
                                {cat.label}
                              </span>
                              {isEssential && (
                                <span className="shrink-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">
                                  Always Active
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          id={`cookie-toggle-${cat.id}`}
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
              <div className="flex flex-col sm:flex-row gap-2.5 px-6 pb-6">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-2.5 text-sm font-bold rounded-full bg-esn-dark text-white hover:bg-esn-cyan transition-colors duration-200 tracking-wide"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-2.5 text-sm font-bold rounded-full border border-esn-dark text-esn-dark hover:bg-gray-50 transition-colors duration-200 tracking-wide"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
