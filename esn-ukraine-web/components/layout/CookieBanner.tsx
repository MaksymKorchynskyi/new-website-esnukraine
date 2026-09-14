'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import {
  hasConsentBeenGiven,
  acceptAll,
  rejectAll,
  OPEN_SETTINGS_EVENT,
} from '@/lib/cookies';
import CookieSettings from './CookieSettings';

export default function CookieBanner() {
  // null = not yet determined (SSR safety), true = show, false = hide
  const [visible, setVisible] = useState<boolean | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Check consent on mount (client only — avoids hydration mismatch)
  useEffect(() => {
    setVisible(!hasConsentBeenGiven());
  }, []);

  // Listen for "open cookie settings" from footer / cookie policy page
  useEffect(() => {
    const handler = () => setSettingsOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, handler);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
  }, []);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setVisible(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    rejectAll();
    setVisible(false);
  }, []);

  const handleSettingsSave = useCallback(() => {
    setSettingsOpen(false);
    setVisible(false);
  }, []);

  // Don't render anything during SSR or after consent is given
  // (settings modal can still open via footer button even when banner is hidden)
  return (
    <>
      <AnimatePresence>
        {visible === true && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
            className="fixed bottom-0 left-0 right-0 sm:right-auto sm:bottom-5 sm:left-5 z-[60] w-full sm:max-w-[420px]"
            role="dialog"
            aria-label="Cookie consent"
            aria-describedby="cookie-banner-description"
          >
            <div className="relative bg-white sm:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* ESN gradient stripe */}
              <div className="flex h-[3px]">
                <div className="flex-1 bg-esn-cyan" />
                <div className="flex-1 bg-esn-magenta" />
                <div className="flex-1 bg-esn-green" />
                <div className="flex-1 bg-yellow-400" />
                <div className="flex-1 bg-orange-500" />
              </div>

              <div className="p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-esn-cyan/10">
                    <Cookie className="w-5 h-5 text-esn-cyan" />
                  </div>
                  <h2 className="text-lg font-black text-esn-dark tracking-tight">
                    We use cookies
                  </h2>
                </div>

                {/* Description */}
                <p
                  id="cookie-banner-description"
                  className="text-sm text-gray-500 leading-relaxed mb-5"
                >
                  We use cookies on this website to enhance your user experience and make
                  sure everything works correctly. Learn more in our{' '}
                  <Link
                    href="/cookies"
                    className="text-esn-cyan hover:underline font-medium"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-2.5">
                  {/* Primary row: Accept + Reject (equal prominence) */}
                  <div className="flex gap-2.5">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 px-4 py-2.5 text-sm font-bold rounded-full bg-esn-dark text-white hover:bg-esn-cyan transition-colors duration-200 tracking-wide"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 px-4 py-2.5 text-sm font-bold rounded-full border border-esn-dark text-esn-dark hover:bg-gray-50 transition-colors duration-200 tracking-wide"
                    >
                      Reject All
                    </button>
                  </div>

                  {/* Secondary: Manage Preferences */}
                  <button
                    onClick={() => setSettingsOpen(true)}
                    className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-esn-dark transition-colors duration-200 tracking-wide"
                  >
                    Manage Preferences
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <CookieSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSettingsSave}
      />
    </>
  );
}
