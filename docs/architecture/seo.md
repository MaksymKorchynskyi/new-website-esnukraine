# SEO

This page explains how the website supports search engines and social sharing: metadata, social images, structured data, the sitemap, `robots.txt`, and the redirects from the previous website.

**Audience:** developers who add pages or change URLs, and maintainers responsible for search visibility.

## Foundations

- **Server-rendered HTML.** Every public page is pre-rendered on the server (see [Rendering and data flow](rendering-and-data-flow.md)), so crawlers get complete HTML without running JavaScript.
- **Metadata** uses the Next.js [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata): `export const metadata` for static pages and `generateMetadata` for CMS pages.
- **Stable URLs.** News and events use the slug from Sanity: `/news/<slug>` and `/events/<slug>`.

## Metadata

### Defaults in the root layout

`app/(website)/layout.tsx` defines defaults for all public pages:

| Field | Value |
|---|---|
| `metadataBase` | `https://` + `VERCEL_PROJECT_PRODUCTION_URL`, else `VERCEL_URL`, else `https://esnukraine.org`. Used to turn relative URLs, such as image paths, into absolute ones. |
| `title` | `ESN Ukraine` |
| `description` | A one-sentence description of ESN Ukraine |
| `openGraph` | Title, description, `url: https://esnukraine.org`, site name, `/og-image.jpg` (1200 × 630), `locale: uk_UA`, `type: website` |
| `twitter` | `summary_large_image` card with the same image |
| `robots` | `index: true, follow: true` |

No `title.template` is configured, so every page sets its full title.

### Page-level metadata

| Pages | Metadata |
|---|---|
| `/` | Own title, description, Open Graph and Twitter data |
| `/news/[slug]`, `/events/[slug]` | `generateMetadata`: `<title> — ESN Ukraine`, the excerpt as description, Open Graph type `article` with the publication time, and a 1200 × 630 image cropped from the card image |
| `/erasmus` and its 5 subpages | Own title and description, a canonical URL, Open Graph data **without an image**, JSON-LD |
| `/privacy`, `/cookies`, `/about-us/former-boards`, `/blog`, `/for-students/buddy`, `/for-students/housing`, `/for-students/survival-guide` | Own title and description |
| `/about-us`, `/contact`, `/news`, `/events`, `/national-board`, `/our-sections`, `/projects`, `/for-students/esncard` | **Inherit the defaults** (title "ESN Ukraine") |

> [!NOTE]
> `/about-us` and `/contact` are Client Components (`'use client'`). A Client Component cannot export `metadata`. To give these pages their own metadata, move the interactive parts into separate client components, or add a `layout.tsx` next to the page that exports the metadata.

### Conventions for new pages

- **Title:** `<Page title> | ESN Ukraine`. This format is already used by most pages that set a title, such as the Erasmus+, Blog and For Students pages.
- **Description:** one or two sentences, about 150 characters, specific to the page.
- **Open Graph:** metadata objects are merged **shallowly**. If a page defines `openGraph`, it replaces the whole default object, including the default image. Specify `images` (and `locale`, if needed) in the page's own `openGraph`.
- **Canonical URL:** set `alternates: { canonical: 'https://esnukraine.org/<path>' }` for important content pages, as the Erasmus+ pages do.

## Social sharing images

| Page type | Image |
|---|---|
| Default | `public/og-image.jpg`, 1200 × 630 |
| News and event detail pages | The card image (`mainImage`), cropped to 1200 × 630 by `urlFor()`, which honours the editor's hotspot |

## Structured data (JSON-LD)

The six Erasmus+ pages embed [schema.org](https://schema.org/) data in a `<script type="application/ld+json">` tag:

- `WebPage` with a `publisher` of type `Organization` (ESN Ukraine);
- on the five subpages, also a `BreadcrumbList` (Home → Erasmus+ → page).

The data is a constant object in each page file and is serialised with `JSON.stringify`.

> [!WARNING]
> If you add JSON-LD built from CMS content, escape `<` characters so that editor-supplied text cannot close the script tag, for example `JSON.stringify(data).replace(/</g, '\\u003c')`.

## Sitemap

`app/sitemap.ts` generates `/sitemap.xml`:

- **22 static URLs**, listed by hand with priorities between 0.3 and 1.0. Their `lastModified` is the time the sitemap was generated.
- **Every news item and event** with a slug, with `lastModified` taken from the document's `_updatedAt`.
- The base URL `https://esnukraine.org` is hard-coded.
- The sitemap uses `sanityFetch` with the `news` and `event` tags, so it refreshes together with the content (at least hourly).

When you add, rename or remove a public page, update the static list in `app/sitemap.ts`.

## robots.txt

`app/robots.ts` allows all crawlers, disallows `/studio` and `/api`, and points to `https://esnukraine.org/sitemap.xml`. The Studio layout also sets `noindex, nofollow`.

## Language

The website copy is in English. The root layout sets `<html lang="uk">` and the Open Graph locale `uk_UA`. The language switcher in the header shows "UA" as "coming soon". If you add translated content, keep `lang` in line with the language of each page, and declare the language versions with `alternates.languages`, which renders `hreflang` links.

## Redirects from the previous website

Before this project, `esnukraine.org` ran on Drupal. To preserve links and search rankings, `next.config.ts` defines **43 permanent redirects** (HTTP 308) from old URLs to the closest new page. See [ADR-0007](../adr/0007-permanent-redirects-for-drupal-migration.md).

| Group | Count | Examples |
|---|---|---|
| About us and team | 5 | `/what-esn-ukraine` → `/about-us`; `/our-team` → `/national-board`; `/our-team/alumni` → `/about-us/former-boards` |
| Projects | 1 | `/our-impact` → `/projects` |
| Section pages | 6 | `/esn-kyiv`, `/esn-:section` → `/our-sections` |
| For students | 4 | `/incoming-students` → `/erasmus`; `/buddy-system` → `/for-students/buddy` |
| Erasmus+ | 6 | `/academic-mobility` → `/erasmus/academic-mobility`; `/for-students/erasmus` → `/erasmus` |
| Alumni and section boards | 3 | `/alumni-network` → `/about-us/former-boards`; `/board-esn-:section` → `/our-sections` |
| ESNcard and partners | 3 | `/esncard`, `/partners`, `/partners/:slug*` → `/for-students/esncard` |
| News, blog and policies | 9 | `/blog/:year/:month/:day/:slug` → `/blog`; selected old `/news/...` articles → `/news`; `/privacy-policy` → `/privacy` |
| Drupal files | 3 | `/sites/default/files/:path*` → `/` |
| Drupal system paths | 2 | `/node/:path*` → `/` |
| RSS | 1 | `/rss.xml` → `/news` |

Things to keep in mind:

- Redirects run **before** pages are matched. A redirect for `/news/<slug>` hides a new CMS article with the same slug, so do not reuse the slugs listed in `next.config.ts`.
- Order matters: specific rules come before wildcard rules such as `/esn-:section`.
- To add a redirect, see [Common tasks](../guides/common-tasks.md#add-or-change-a-redirect).

## Image alternative text

Alternative text helps both accessibility and image search:

| Image | Alt text source |
|---|---|
| Images inside the article body and "photo row" galleries | The **Alt текст** field, otherwise the caption |
| National Board and former board photos | The required or optional alt field on the image |
| "Our Network" homepage photos | The document's title field |
| Card, header and gallery images of news and events | No alt field. Cards and headers use the document title, gallery photos use the caption or a generic "Фото N" |
| Section logos | The section name |

## Related

- [Routes](../reference/routes.md)
- [Common tasks: add a page](../guides/common-tasks.md#add-a-page)
- [Content editing: images and files](../content-editing/images-and-files.md)
