# ADR-0007: Redirect URLs of the previous Drupal website permanently

- **Status:** Accepted
- **Date:** August–September 2026; documented retroactively on 2026-10-26

## Context

Before this project, `esnukraine.org` ran on Drupal. Its URLs were indexed by search engines and linked from other websites, social media posts and documents. The new website has a different structure: for example, it has no individual section pages and no blog posts yet. Without redirects, those links would lead to 404 pages, and the domain would lose search rankings.

## Decision

We define **permanent redirects** (HTTP 308) in `next.config.ts` from every known old URL to the **closest equivalent new page**:

- one-to-one where an equivalent exists, for example `/national-erasmus-office` → `/erasmus/national-erasmus-office`;
- many-to-one where none exists, for example old section pages (`/esn-:section`) → `/our-sections`, old blog URLs → `/blog`, Drupal system paths and files → `/` or `/news`.

At the time of writing there are 43 rules.

## Consequences

### Positive

- Old links keep working, and search engines transfer rankings to the new URLs.
- The rules are versioned and reviewed with the code.

### Negative

- **Redirects run before pages.** A redirect source cannot be used as a new page or CMS slug while the rule exists.
- **Generic targets can count as soft 404s.** Search engines may treat many-to-one redirects to generic pages, such as old articles → `/news`, as soft 404s and drop them from the index over time.
- **The list must be maintained by hand.** New rules go before wildcard rules.

## References

- [SEO: redirects from the previous website](../architecture/seo.md#redirects-from-the-previous-website)
- [Common tasks: add or change a redirect](../guides/common-tasks.md#add-or-change-a-redirect)
- Commits `3e397b9` (URL restructure and first redirects), `f20c411` (complete redirect mapping), `cf40068` (more redirects)
