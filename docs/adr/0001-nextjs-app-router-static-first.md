# ADR-0001: Use Next.js App Router with static-first rendering

- **Status:** Accepted
- **Date:** In place since the beginning of the project (the earliest commit in the repository dates from February 2026); documented retroactively on 2026-10-26

## Context

ESN Ukraine needed a new public website to replace its previous Drupal site at `esnukraine.org`. The situation:

- The website is **read-heavy**: visitors read pages far more often than editors change them.
- **Search visibility** matters, because students, universities and partners find ESN Ukraine through search engines and shared links.
- The team consists of **a few volunteers who change regularly**. Mainstream, well-documented technology makes onboarding easier.
- There is **little or no budget** for hosting and maintenance, and no capacity to run servers.

## Decision

We build the website with **Next.js (App Router), React and TypeScript**, deployed on **Vercel**, with static-first rendering:

- Pages are rendered on the server and **pre-rendered at build time**.
- Pages that show CMS content use **incremental static regeneration** (ISR): they are cached for up to one hour and refreshed on demand when content is published ([ADR-0003](0003-on-demand-revalidation-with-cache-tags.md)).
- Components are **Server Components by default**. Only interactive parts are Client Components.
- Dynamic server code is limited to a few API routes.

## Consequences

### Positive

- Pages are served from Vercel's cache, so they are fast and cheap to host, even during traffic peaks.
- Crawlers receive complete HTML, which supports search engines and link previews.
- Next.js and React are widely known, so new volunteers are likely to find learning material and help.
- Every branch gets a Preview deployment, which makes reviewing changes easy for non-developers too.

### Negative

- **Builds depend on Sanity.** Every page is pre-rendered with content, so a build fails if Sanity is unreachable or content breaks a component.
- **The project is coupled to Vercel features:** image optimisation, the Edge runtime, Web Analytics and `@vercel/functions`. Moving to another host would need changes.
- **The App Router has a learning curve:** server and client boundaries, and caching behaviour.
- **Content in code needs a deployment to change.** This applies to the pages that do not read from the CMS, such as the Erasmus+ pages.

## References

- [Architecture overview](../architecture/overview.md)
- [Rendering and data flow](../architecture/rendering-and-data-flow.md)
- Commits `667598c` (project moved into `esn-ukraine-web/`), `a282cdc` (global layout and metadata) and `31a14e0` (CMS data in pages and API routes)
