'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from 'posthog-js/react';

function PostHogPageViewImpl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!pathname || !posthog) return;
    
    const track = () => {
      let url = window.location.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', { $current_url: url });
    };

    if (!posthog.has_opted_out_capturing()) {
      track();
    }

    window.addEventListener('ph-opted-in', track);
    return () => window.removeEventListener('ph-opted-in', track);
  }, [pathname, searchParams, posthog]);
  
  return null;
}

export default function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewImpl />
    </Suspense>
  );
}
