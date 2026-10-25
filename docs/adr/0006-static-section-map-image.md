# ADR-0006: Show the section map as a static image

- **Status:** Accepted
- **Date:** September 2026, image replaced in October 2026; documented retroactively on 2026-10-26

## Context

The Our Sections page shows a map of Ukraine with the cities where ESN sections operate. Sections are added rarely, at most a few times a year. According to the commit history, an earlier interactive map was replaced with a static map in September 2026 (commit `af84d35`). The repository does not contain the interactive implementation, so its details and the exact reasons for the change are unknown.

## Decision

We show the map as a **static image** rendered with `next/image` (`components/ui/UkraineMap.tsx`):

- first as an optimised SVG (September 2026);
- since October 2026 as a designed image, `public/ESN Ukraine section map.webp` (1536 × 1024 px), loaded with priority (commits `e9edf37` and `11d0fdf`).

## Consequences

### Positive

- No map libraries and no client-side JavaScript for the map, so the page loads fast.
- Designers have full control over the look of the map.

### Negative

- **The map is not data-driven.** Adding a section in the Studio does not update it. Someone has to edit the image and deploy it (see [Add a new ESN section](../guides/maintenance-tasks.md#add-a-new-esn-section)).
- The information is only in the image, so it depends on the image's alternative text and on the section cards below it for accessibility.
- Files from earlier versions remain in `public/` (`ESN_Ukraine_Map.svg`, `images/ukraine-map.svg`), along with the `geojson-rewind` development dependency.

## References

- [Routes: /our-sections](../reference/routes.md#public-pages)
- Commits `af84d35`, `c98fee0`, `6190e2e`, `e9edf37`, `11d0fdf`
