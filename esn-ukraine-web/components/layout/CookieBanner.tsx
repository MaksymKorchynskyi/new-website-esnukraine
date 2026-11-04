'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import {
  hasConsentBeenGiven,
  acceptAll,
  rejectAll,
  subscribeToConsent,
  OPEN_SETTINGS_EVENT,
} from '@/lib/cookies';
import CookieSettings from './CookieSettings';

/** Run `fn` after the browser has painted, so a tap feels instant on slow phones. */
function afterPaint(fn: () => void) {
  requestAnimationFrame(() => setTimeout(fn, 0));
}

export default function CookieBanner() {
  // Read consent straight from storage. On the server (and during hydration) we
  // pretend consent exists, so the banner never flashes for returning visitors.
  const consentGiven = useSyncExternalStore(subscribeToConsent, hasConsentBeenGiven, () => true);
  // Hides the banner immediately on tap, before consent is written and analytics react
  const [dismissed, setDismissed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Listen for "open cookie settings" from footer / cookie policy page
  useEffect(() => {
    const handler = () => setSettingsOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, handler);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
  }, []);

  const handleAcceptAll = useCallback(() => {
    setDismissed(true);
    afterPaint(acceptAll);
  }, []);

  const handleRejectAll = useCallback(() => {
    setDismissed(true);
    afterPaint(rejectAll);
  }, []);

  const handleSettingsSave = useCallback(() => {
    setSettingsOpen(false);
    setDismissed(true);
  }, []);

  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const visible = !consentGiven && !dismissed;

  return (
    <>
      {visible && (
        // z-40: stays under the header and its mobile menu (z-50)
        <div
          className="fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[420px] motion-safe:animate-cookie-in"
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cookie-banner-description"
        >
          <div className="relative overflow-hidden bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] sm:border sm:rounded-2xl sm:shadow-2xl">
            {/* ESN gradient stripe */}
            <div className="flex h-[3px]" aria-hidden>
              <div className="flex-1 bg-esn-cyan" />
              <div className="flex-1 bg-esn-magenta" />
              <div className="flex-1 bg-esn-green" />
              <div className="flex-1 bg-yellow-400" />
              <div className="flex-1 bg-orange-500" />
            </div>

            <div className="px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-esn-cyan/10 shrink-0">
                  <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-esn-cyan" />
                </div>
                <h2 className="text-base sm:text-lg font-black text-esn-dark tracking-tight">
                  We use cookies
                </h2>
              </div>

              {/* Description */}
              <p
                id="cookie-banner-description"
                className="text-[13px] sm:text-sm text-gray-500 leading-relaxed mb-4 sm:mb-5"
              >
                We use cookies to enhance your experience and make sure everything works
                correctly. Learn more in our{' '}
                <Link href="/cookies" className="text-esn-cyan hover:underline font-medium">
                  Cookie Policy
                </Link>
                .
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-1.5 sm:gap-2.5">
                {/* Primary row: Accept + Reject (equal prominence) */}
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="flex-1 min-h-11 px-4 py-2.5 text-sm font-bold rounded-full bg-esn-dark text-white hover:bg-esn-cyan active:scale-[0.98] transition duration-150 tracking-wide touch-manipulation"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="flex-1 min-h-11 px-4 py-2.5 text-sm font-bold rounded-full border border-esn-dark text-esn-dark hover:bg-gray-50 active:scale-[0.98] transition duration-150 tracking-wide touch-manipulation"
                  >
                    Reject All
                  </button>
                </div>

                {/* Secondary: Manage Preferences */}
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className="w-full min-h-10 py-2 text-xs font-semibold text-gray-500 hover:text-esn-dark transition-colors duration-150 tracking-wide touch-manipulation"
                >
                  Manage Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      <CookieSettings isOpen={settingsOpen} onClose={closeSettings} onSave={handleSettingsSave} />
    </>
  );
}
