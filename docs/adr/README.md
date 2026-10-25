# Architecture decision records

An architecture decision record (ADR) is a short document that captures one important technical decision: the situation, what was decided and why, and what follows from it. ADRs keep the reasoning behind the system available after the people who made the decisions have moved on, which matters in a volunteer organisation.

**Audience:** developers and maintainers who want to understand why the system looks the way it does, or who are about to change a fundamental part of it.

## Index

| ADR | Title | Status |
|---|---|---|
| [0001](0001-nextjs-app-router-static-first.md) | Use Next.js App Router with static-first rendering | Accepted |
| [0002](0002-sanity-cms-with-embedded-studio.md) | Use Sanity as the CMS, with the Studio embedded in the website | Accepted |
| [0003](0003-on-demand-revalidation-with-cache-tags.md) | Refresh content with cache tags and a Sanity webhook | Accepted |
| [0004](0004-newsletter-via-resend-with-rate-limiting.md) | Collect newsletter subscriptions in Resend, protected by rate limiting | Accepted |
| [0005](0005-in-house-cookie-consent-and-eu-analytics.md) | Build cookie consent in-house and use opt-in EU analytics | Accepted |
| [0006](0006-static-section-map-image.md) | Show the section map as a static image | Accepted |
| [0007](0007-permanent-redirects-for-drupal-migration.md) | Redirect URLs of the previous Drupal website permanently | Accepted |

> [!NOTE]
> ADRs 0001–0007 were written **retroactively** in October 2026, based on the code and the commit history. Their context sections describe what can be reconstructed from the repository. The original authors may have considered further factors.

## When to write an ADR

Write an ADR when a decision:

- is hard or expensive to reverse, for example choosing or replacing a service, framework or hosting provider;
- changes how data flows, is stored or is protected;
- affects how editors or maintainers work;
- is likely to be questioned later ("why don't we just…?").

Small implementation choices do not need an ADR.

## How to write one

1. Copy [`0000-template.md`](0000-template.md) to a new file with the next number and a short title, for example `0008-add-site-search.md`.
2. Fill in the sections, and keep them short. One or two pages is enough.
3. Set the status to **Proposed** and open a pull request. Discuss the decision there.
4. When the pull request is merged, change the status to **Accepted** and add the ADR to the index above.

## Statuses

| Status | Meaning |
|---|---|
| **Proposed** | Under discussion |
| **Accepted** | In effect |
| **Deprecated** | No longer recommended, but not replaced |
| **Superseded by ADR-XXXX** | Replaced by a newer decision |

Do not rewrite an accepted ADR when the decision changes. Write a new ADR that supersedes it, and update the status of the old one. That way the history stays visible.

The format follows [Michael Nygard's original proposal](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
