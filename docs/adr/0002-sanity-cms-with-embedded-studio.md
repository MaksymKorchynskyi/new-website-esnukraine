# ADR-0002: Use Sanity as the CMS, with the Studio embedded in the website

- **Status:** Accepted
- **Date:** In place since the beginning of the project; documented retroactively on 2026-10-26

## Context

News, events, board members, sections and photos change often and are maintained by **non-technical volunteers** who speak Ukrainian and change from year to year. The content is structured: dates, locations, images and categories. It includes many photos. The organisation cannot run or maintain its own CMS server or database.

## Decision

We use **Sanity**, a hosted headless CMS, with these choices:

- The **content model lives in this repository** (`sanity/schemaTypes/`) and is versioned with the code.
- The **Studio is embedded** in the Next.js application at `/studio`, with `NextStudio` from `next-sanity` (`sanity.config.ts`, `basePath: '/studio'`). It is deployed together with the website.
- Studio labels, help texts and validation messages are in **Ukrainian**, for the editors.
- **Upload validators** limit file size and resolution, to keep within the storage limits of the Sanity plan and to keep pages fast.

## Consequences

### Positive

- There is no CMS server to host, patch or back up ourselves. Sanity runs the database, the asset CDN and the authentication.
- One deployment ships both the website and the matching Studio, so schema and website never get out of sync.
- Editors work in a modern interface in their own language, with immediate feedback from the validation rules.
- The content model is reviewed in pull requests like any other code.

### Negative

- The Studio and its dependencies (`sanity`, `styled-components`) are part of the application, which adds to install and build time.
- Every editor needs a Sanity account. The number of seats and the available roles depend on the Sanity plan.
- Every origin that serves the Studio, including localhost and preview URLs, must be allowed in Sanity's CORS settings.
- Schema changes do not migrate existing content. Renaming or removing fields needs a migration, or tolerant queries.
- Editing depends on a third-party service and its pricing.

## References

- [Content model](../reference/content-model.md)
- [Content editing guide](../content-editing/README.md)
- Commits `708ec60` (Sanity client and fetch utilities), `f8dddde` and `1d77fdc`/`410b917`/`71971be` (upload limits)
