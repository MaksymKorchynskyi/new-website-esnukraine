# ADR-0005: Build cookie consent in-house and use opt-in EU analytics

- **Status:** Accepted
- **Date:** September 2026; documented retroactively on 2026-10-26

## Context

ESN Ukraine wants to understand how the website is used. Its audience includes people in the EU and Ukraine, so analytics that use cookies or similar storage need informed, opt-in consent. Commercial consent management platforms cost money and load additional third-party scripts.

## Decision

- We built a **small in-house consent solution**: `lib/cookies.ts`, `CookieBanner` and `CookieSettings`.
  - It has two categories: essential (always on) and analytics (off until accepted).
  - **Accept All** and **Reject All** are equally prominent.
  - The choice is stored in `localStorage`, with a supporting cookie, and broadcast with a browser event.
- **PostHog on its EU Cloud** provides product analytics:
  - it is initialised in **opted-out** mode and opts in only after consent;
  - session recording is disabled;
  - requests go through a **first-party proxy**: the `/ingest/posthog` rewrite to `eu.i.posthog.com`.
- **Vercel Web Analytics** is added with its `<Analytics />` component in the root layout.

## Consequences

### Positive

- No licence costs and no external consent scripts. The code is small and fully under our control.
- PostHog data stays in the EU region. The first-party proxy makes tracking more reliable for visitors who did consent.
- The consent events decouple the banner from the analytics tools, so adding a tool means adding one listener.

### Negative

- **The Privacy Policy and Cookie Policy must be kept in sync by hand** with the implementation (see [Privacy and analytics](../architecture/privacy-and-analytics.md)).
- **Consent is stored only in the visitor's browser.** There is no server-side record of consents.
- **Two analytics tools** must be maintained and documented.
- `<Analytics />` is not connected to the consent state, so its relation to the consent categories must be reflected in the policies.

## References

- [Privacy and analytics](../architecture/privacy-and-analytics.md)
- Commits `fdb7959` (cookie consent system and policies), `643eedc` (Vercel Web Analytics), `50debcd` (PostHog)
