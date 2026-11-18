'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getConsent, subscribeToConsent } from '@/lib/cookies';
import { capturePageview, startAnalytics, stopAnalytics } from '@/lib/analytics';

function currentUrl(pathname: string, query: string) {
  return window.location.origin + pathname + (query ? `?${query}` : '');
}

function AnalyticsLoaderImpl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const lastTracked = useRef<string | null>(null);
  const route = useRef({ pathname, query });
  useEffect(() => {
    route.current = { pathname, query };
  }, [pathname, query]);

  // Load / unload PostHog whenever the analytics consent changes
  useEffect(() => {
    const apply = async () => {
      if (getConsent()?.analytics) {
        const ph = await startAnalytics();
        const url = currentUrl(route.current.pathname, route.current.query);
        // First page view after consent (the route-change effect ran before PostHog loaded)
        if (ph && lastTracked.current !== url) {
          lastTracked.current = url;
          capturePageview(url);
        }
      } else {
        stopAnalytics();
        lastTracked.current = null;
      }
    };

    void apply();
    return subscribeToConsent(() => void apply());
  }, []);

  // Page views on client-side navigation
  useEffect(() => {
    const url = currentUrl(pathname, query);
    if (lastTracked.current === url) return;
    lastTracked.current = url;
    capturePageview(url);
  }, [pathname, query]);

  return null;
}

export default function AnalyticsLoader() {
  return (
    <Suspense fallback={null}>
      <AnalyticsLoaderImpl />
    </Suspense>
  );
}
