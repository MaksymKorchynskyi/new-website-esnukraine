/**
 * PostHog is loaded on demand (dynamic import), and only after the visitor has
 * accepted analytics cookies. Until then no PostHog code, cookies or
 * localStorage entries exist in the browser, and ~107 KB of JavaScript is
 * never downloaded by visitors who decline.
 */
type PostHog = typeof import('posthog-js').default;

let instance: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;

export async function startAnalytics(): Promise<PostHog | null> {
  if (instance) return instance;
  if (typeof window === 'undefined') return null;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;

  if (!loading) {
    loading = import('posthog-js').then(({ default: posthog }) => {
      // Same capture settings as the production site before November 2026
      // (autocapture, heatmaps etc. stay at the PostHog defaults); only the
      // moment of loading changed.
      posthog.init(key, {
        api_host: '/ingest/posthog',
        ui_host: 'https://eu.posthog.com',
        capture_pageview: false, // sent manually on route changes (SPA)
        disable_session_recording: true,
      });
      instance = posthog;
      return posthog;
    });
  }
  return loading;
}

/** Withdraws consent: stops capturing and clears the PostHog identifiers. */
export function stopAnalytics(): void {
  if (!instance) return;
  instance.opt_out_capturing();
  instance.reset();
  instance.clear_opt_in_out_capturing();
  instance = null;
  loading = null;
}

export function capturePageview(url: string): void {
  instance?.capture('$pageview', { $current_url: url });
}
