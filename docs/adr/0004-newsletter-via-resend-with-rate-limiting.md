# ADR-0004: Collect newsletter subscriptions in Resend, protected by rate limiting

- **Status:** Accepted
- **Date:** Introduced in August 2026 and hardened in September 2026; documented retroactively on 2026-10-26

## Context

ESN Ukraine wants to collect newsletter subscribers on the website. The project has no database of its own. A public form attracts bots and abuse, and email addresses are personal data, so consent and minimal processing are required.

## Decision

The subscription runs through one API route, `POST /api/newsletter/subscribe`, on the **Edge runtime**, with several layers:

1. **Origin check:** in production, only requests whose `Origin` or `Referer` is `esnukraine.org` (or a subdomain) are accepted.
2. **Rate limiting:** Upstash Redis with a sliding window of 5 requests per minute per IP address. In production the route **fails closed**: it refuses requests if the rate limiter is not configured.
3. **Validation:** Zod checks the email address and requires `consent: true`.
4. **Honeypot:** a hidden field. Requests that fill it in get a fake success response.
5. **Storage:** the address is added as a contact to a **Resend audience**.
6. **Privacy:** no email addresses are written to logs.

## Consequences

### Positive

- No database to run; subscribers are managed in Resend's interface.
- Several independent layers make abuse unlikely.
- Logs contain no personal data.

### Negative

- **Single opt-in:** addresses are added without a confirmation email. The consent flag is checked but not stored by our code.
- **Two more services and accounts** (Resend, Upstash) to maintain, pay for and hand over.
- In production the form stops working if either service is misconfigured. This is intentional for the rate limiter.
- The Edge runtime restricts which Node.js APIs and libraries the route can use.

## References

- [API reference: POST /api/newsletter/subscribe](../reference/api.md#post-apinewslettersubscribe)
- [Privacy and analytics](../architecture/privacy-and-analytics.md#newsletter-data)
- Commits `3e397b9` (newsletter integration), `669d190`, `7f39edd`, `89774ca` and `c3b56e1` (security hardening)
