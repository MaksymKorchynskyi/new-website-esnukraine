// =============================================================================
// Cookie Consent Management — ESN Ukraine
// =============================================================================
// Pure TypeScript utility for managing GDPR cookie consent.
// No external dependencies. Works with localStorage + thin HTTP cookie.
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CookieConsentState {
  /** Always true — cannot be disabled */
  essential: true;
  /** Vercel Analytics + PostHog */
  analytics: boolean;
}

export interface CookieCategoryInfo {
  id: keyof CookieConsentState;
  label: string;
  description: string;
  required: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'esn-cookie-consent';
const HTTP_COOKIE_NAME = 'esn_consent_given';
const COOKIE_MAX_AGE_DAYS = 365;
const CONSENT_EVENT = 'esn-consent-updated';
export const OPEN_SETTINGS_EVENT = 'esn-open-cookie-settings';

/** Cookie category definitions — displayed in the settings modal */
export const COOKIE_CATEGORIES: CookieCategoryInfo[] = [
  {
    id: 'essential',
    label: 'Strictly Necessary',
    description:
      'Cookies required for the website to function properly. They enable core features like page navigation, security, and remembering your cookie preferences.',
    required: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description:
      'Help us understand how visitors use our website so we can improve the experience. All data is anonymized and never sold to third parties.',
    required: false,
  },
];

// ---------------------------------------------------------------------------
// Core API
// ---------------------------------------------------------------------------

/**
 * Read the current consent state from localStorage.
 * Returns `null` if the user has not yet interacted with the banner.
 */
export function getConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    // Validate shape
    if (typeof parsed.essential !== 'boolean' || typeof parsed.analytics !== 'boolean') {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Persist the consent state to localStorage and set a thin HTTP cookie
 * so server-side code can detect that consent was given.
 */
export function setConsent(state: CookieConsentState): void {
  if (typeof window === 'undefined') return;

  // localStorage — primary store
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  // Thin HTTP cookie — lets middleware/server know consent was given
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${HTTP_COOKIE_NAME}=1; path=/; max-age=${maxAge}; SameSite=Lax`;

  // Notify listeners
  dispatchConsentEvent(state);
}

/**
 * Returns `true` if the user has previously interacted with the banner.
 */
export function hasConsentBeenGiven(): boolean {
  return getConsent() !== null;
}

// ---------------------------------------------------------------------------
// Shortcut helpers
// ---------------------------------------------------------------------------

/** Accept all categories */
export function acceptAll(): CookieConsentState {
  const state: CookieConsentState = { essential: true, analytics: true };
  setConsent(state);
  return state;
}

/** Reject all optional categories (essential stays on) */
export function rejectAll(): CookieConsentState {
  const state: CookieConsentState = { essential: true, analytics: false };
  setConsent(state);
  return state;
}

// ---------------------------------------------------------------------------
// Event System
// ---------------------------------------------------------------------------

/**
 * Dispatch a custom event on `window` so that analytics scripts (or any
 * other listener) can react to consent changes without tight coupling.
 *
 * Usage in analytics wrapper:
 * ```ts
 * window.addEventListener('esn-consent-updated', (e) => {
 *   const { analytics } = (e as CustomEvent).detail;
 *   if (analytics) loadAnalytics();
 * });
 * ```
 */
export function dispatchConsentEvent(state: CookieConsentState): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}
