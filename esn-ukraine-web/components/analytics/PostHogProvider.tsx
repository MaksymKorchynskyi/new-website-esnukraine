'use client';

import posthog from 'posthog-js';
import { PostHogProvider as CSPostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { getConsent } from '@/lib/cookies';

if (typeof window !== 'undefined') {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: '/ingest/posthog', 
      ui_host: 'https://eu.posthog.com',
      capture_pageview: false, 
      opt_out_capturing_by_default: true,
      disable_session_recording: true,
    });
  } else {
    console.warn('PostHog API key is missing. Analytics will not be tracked.');
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Check initial consent state
    const consent = getConsent();
    if (consent) {
      if (consent.analytics) {
        posthog.opt_in_capturing();
        window.dispatchEvent(new Event('ph-opted-in'));
      } else {
        posthog.opt_out_capturing();
      }
    }

    // 2. Listen to banner changes
    const handleConsentUpdate = (e: CustomEvent) => {
      const { analytics } = e.detail;
      if (analytics) {
        posthog.opt_in_capturing();
        window.dispatchEvent(new Event('ph-opted-in'));
      } else {
        posthog.opt_out_capturing();
      }
    };

    window.addEventListener('esn-consent-updated', handleConsentUpdate as EventListener);
    return () => {
      window.removeEventListener('esn-consent-updated', handleConsentUpdate as EventListener);
    };
  }, []);

  return <CSPostHogProvider client={posthog}>{children}</CSPostHogProvider>;
}
