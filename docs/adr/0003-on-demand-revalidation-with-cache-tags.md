# ADR-0003: Refresh content with cache tags and a Sanity webhook

- **Status:** Accepted
- **Date:** Introduced in June 2026 and refined until September 2026; documented retroactively on 2026-10-26

## Context

With static-first rendering ([ADR-0001](0001-nextjs-app-router-static-first.md)), published content must reach the website quickly, without rebuilding the whole site for every edit. At the same time, the solution should be simple enough for volunteers to understand, and it should keep Sanity API usage low.

## Decision

- All Sanity reads go through `sanityFetch` (`sanity/lib/fetch.ts`). It caches results for **one hour** (`revalidate: 3600`) and tags them with **`sanity` plus the document types** they depend on, for example `['sanity', 'news']`.
- A **Sanity webhook** calls `POST /api/revalidate` on every publish. The route checks a shared secret (`SANITY_REVALIDATE_SECRET`) and calls `revalidateTag('sanity', 'max')` and `revalidateTag(<_type>, 'max')`.
- Because Next.js caches the results, the Sanity client **bypasses Sanity's CDN** (`useCdn: false`) and always reads fresh data when a page regenerates.
- Tags are **sanitised**. Characters outside `[a-zA-Z0-9_\-:]` are replaced, because slugs with special characters in tags caused server errors.

## Consequences

### Positive

- Published changes appear on the website within seconds.
- The hourly time-based revalidation is a safety net if the webhook fails.
- The approach is simple: there is no mapping from documents to pages, and new content types work automatically when they use their type name as a tag.

### Negative

- **Every publish invalidates all CMS-backed pages,** because of the shared `sanity` tag. This causes more regenerations than strictly necessary, which is acceptable at the current content volume.
- **Stale-while-revalidate** (`'max'` profile): the first request after a publish may still show the previous version.
- **The webhook configuration lives in Sanity,** outside the repository, and must be documented and maintained separately.
- **The endpoint authenticates with a shared secret,** not with Sanity's signed payloads.

## References

- [Rendering and data flow](../architecture/rendering-and-data-flow.md#how-published-content-reaches-visitors)
- [API reference: POST /api/revalidate](../reference/api.md#post-apirevalidate)
- [Configure the Sanity webhook](../guides/deployment-and-environments.md#configure-the-sanity-webhook)
- Commits `31a14e0` (API routes), `74dde62` and `fcf16e7` (revalidation and slug fixes), `a442620` (tag sanitisation)
