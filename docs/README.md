# ESN Ukraine website documentation

This is the documentation home for the [esnukraine.org](https://esnukraine.org) codebase. It explains how the website works, how to change it safely, and how to keep it running when maintainers change.

## How this documentation is organised

The documentation follows the [Diátaxis](https://diataxis.fr/) framework. Each page has one purpose:

| Type | Use it when you want to… | Where |
|---|---|---|
| **Tutorial** | learn the project by doing, step by step | [Getting started](getting-started.md) |
| **How-to guides** | complete a specific task | [`guides/`](#how-to-guides-for-developers-and-maintainers), [`content-editing/`](#how-to-guides-for-content-editors) |
| **Reference** | look up exact facts: routes, APIs, schemas, settings | [`reference/`](#reference) |
| **Explanation** | understand how and why the system works | [`architecture/`](#explanation), [`adr/`](adr/README.md) |

Pages about running the project as an organisation are in [`operations/`](#operations).

## Reading paths

### I am a new developer

1. [Getting started](getting-started.md): run the website and Studio locally.
2. [Architecture overview](architecture/overview.md): the big picture and the repository structure.
3. [Rendering and data flow](architecture/rendering-and-data-flow.md): how content gets from Sanity to the page.
4. [Routes](reference/routes.md) and [Components](reference/components.md): find your way around the code.
5. [CONTRIBUTING.md](../CONTRIBUTING.md): branches, commits, pull requests and checks.

### I publish content

1. [Content editing guide](content-editing/README.md): how Sanity Studio and publishing work.
2. [News and events](content-editing/news-and-events.md).
3. [Homepage, people and sections](content-editing/homepage-people-and-sections.md).
4. [Images and files](content-editing/images-and-files.md).

### I maintain the website (IT lead or webmaster)

1. [Services and accounts](operations/services-and-accounts.md): everything the website depends on.
2. [Deployment and environments](guides/deployment-and-environments.md).
3. [Recurring maintenance tasks](guides/maintenance-tasks.md).
4. [Troubleshooting](guides/troubleshooting.md).
5. [Handover checklist](operations/handover-checklist.md): use it when you hand the project over or take it over.

## Tutorial

- [Getting started](getting-started.md): prerequisites, local setup, a tour of the code and your first change.

## Explanation

- [Architecture overview](architecture/overview.md): context, constraints, building blocks, what lives in the CMS and what lives in code.
- [Rendering and data flow](architecture/rendering-and-data-flow.md): static generation, incremental static regeneration, caching, revalidation, draft mode and images.
- [Privacy and analytics](architecture/privacy-and-analytics.md): cookie consent, PostHog, Vercel Web Analytics and newsletter data.
- [SEO](architecture/seo.md): metadata, sitemap, robots, structured data and redirects from the previous website.
- [Architecture decision records](adr/README.md): why key technical decisions were made.

## Reference

- [Routes](reference/routes.md): every page, API route and special route, with rendering mode and data source.
- [API](reference/api.md): request and response details for the API routes.
- [Content model](reference/content-model.md): Sanity document types, fields, validation and queries.
- [Configuration](reference/configuration.md): npm scripts, dependencies and configuration files.
- [Environment variables](reference/environment-variables.md): every variable, its scope and where to set it.
- [Components](reference/components.md): the React components and shared libraries.
- [Styling](reference/styling.md): design tokens, typography, animations and UI patterns.
- [Glossary](reference/glossary.md): ESN and technical terms used in this project.

## How-to guides for developers and maintainers

- [Common tasks](guides/common-tasks.md): add a page, edit code-managed content, update navigation, add a redirect, and more.
- [Add a content type](guides/add-a-content-type.md): from a Sanity schema to a rendered page.
- [Deployment and environments](guides/deployment-and-environments.md): Vercel, the Sanity webhook, rollbacks and secrets.
- [Troubleshooting](guides/troubleshooting.md): symptoms, causes and fixes.
- [Recurring maintenance tasks](guides/maintenance-tasks.md): board changeover, new sections, backups and dependency updates.

## How-to guides for content editors

- [Content editing guide](content-editing/README.md)
- [News and events](content-editing/news-and-events.md)
- [Homepage, people and sections](content-editing/homepage-people-and-sections.md)
- [Images and files](content-editing/images-and-files.md)

## Operations

- [Services and accounts](operations/services-and-accounts.md): the external services the website depends on.
- [Handover checklist](operations/handover-checklist.md): transferring maintenance between volunteers.

## Keeping the documentation up to date

Documentation lives next to the code and changes in the same pull request. Use this map to find the pages affected by a change:

| When you change… | Update… |
|---|---|
| A page or route in `app/` | [Routes](reference/routes.md). If the page is public, also update `app/sitemap.ts` and, if needed, `lib/navigation.tsx` |
| An API route in `app/api/` | [API](reference/api.md) |
| A Sanity schema in `sanity/schemaTypes/` | [Content model](reference/content-model.md), the [content editing guides](content-editing/README.md), and the CMS/code table in the [architecture overview](architecture/overview.md#what-is-managed-where) |
| GROQ queries or `sanity/lib/fetch.ts` | [Content model](reference/content-model.md#queries) and [Rendering and data flow](architecture/rendering-and-data-flow.md) |
| Environment variables | [`.env.example`](../esn-ukraine-web/.env.example), [Environment variables](reference/environment-variables.md), [Deployment and environments](guides/deployment-and-environments.md) |
| Components in `components/` | [Components](reference/components.md) |
| Tailwind theme or recurring UI patterns | [Styling](reference/styling.md) |
| `next.config.ts` (images, rewrites, redirects) | [Configuration](reference/configuration.md) and, for redirects, [SEO](architecture/seo.md#redirects-from-the-previous-website) |
| Analytics, cookies or any personal data processing | [Privacy and analytics](architecture/privacy-and-analytics.md) **and** the Privacy Policy and Cookie Policy pages |
| External services (added, removed or moved to another account) | [Services and accounts](operations/services-and-accounts.md) |
| The deployment process or Vercel settings | [Deployment and environments](guides/deployment-and-environments.md) |
| A significant technical decision | Add an [architecture decision record](adr/README.md) |

## Writing conventions

- **Language:** British English, matching the official spelling used by the EU and ESN ("Erasmus+ Programme", "organisation"). Keep code identifiers and quoted UI labels exactly as they are.
- **Style:** short sentences, second person ("you"), imperative mood for steps ("Open the Studio…"), sentence-case headings.
- **Links:** use relative links between pages and to source files, for example `../esn-ukraine-web/sanity/lib/fetch.ts`, so that they work on GitHub and in forks. Do not reference line numbers; they go out of date quickly.
- **Versions:** mention major versions only (for example "Next.js 16") and link to `package.json` for exact versions.
- **Unknowns:** never guess. Mark facts that cannot be verified from the repository with a note that starts with **To confirm:**, so the next maintainer can fill them in.
- **Alerts:** use GitHub alerts (`> [!NOTE]`, `> [!IMPORTANT]`, `> [!WARNING]`) sparingly, for information the reader must not miss.
- **Diagrams:** use [Mermaid](https://mermaid.js.org/), which GitHub renders natively. Add `accTitle` and `accDescr` to every diagram and explain it in the text.
- **Public repository:** this repository is public. Never include secrets, environment variable values, tokens, project IDs or personal data. Refer to roles ("the webmaster") instead of names.
