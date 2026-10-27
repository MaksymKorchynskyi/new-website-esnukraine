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
| `title` | `default: "ESN Ukraine"`, `template: "%s \| ESN Ukraine"`. A page sets only its own part, for example `Our Sections`, and the template adds the site name |
| `description` | A one-sentence description of ESN Ukraine |
| `openGraph` | Title, description, site name, `/og-image.jpg` (1200 × 630), `locale: en_US`, `type: website`. There is no `url`: each page sets its own |
| `twitter` | `summary_large_image` card with the same image |
| `robots` | `index: true, follow: true` |
| `verification` | `google`: the Google Search Console verification token, rendered as `<meta name="google-site-verification">` (see [Google Search Console](#google-search-console)) |

The homepage is the only page that skips the template (`absoluteTitle: true`), so its title stays plain "ESN Ukraine".

### The `buildMetadata` helper

Pages do not write `openGraph` and `twitter` by hand. They call `buildMetadata()` from `lib/seo.ts`:

```ts
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Our Sections',            // the template adds " | ESN Ukraine"
  description: 'Find your local ESN section in Ukraine…',
  path: '/our-sections',            // canonical URL and og:url, resolved with metadataBase
});
```

It returns the title, description, canonical URL, and complete Open Graph and Twitter data (site name, `/og-image.jpg` unless `image` is given, `locale: en_US`). This matters because metadata objects are merged **shallowly**: a page that defines `openGraph` itself replaces the whole default object, including the image. `lib/seo.ts` also exports `truncate()`, which shortens CMS text to about 155 characters on a word boundary.

### Page-level metadata

| Pages | Metadata |
|---|---|
| `/` | Title "ESN Ukraine" (no template), own description |
| Every other static page | Own title and description through `buildMetadata`, plus canonical URL and full Open Graph data |
| `/about-us`, `/contact` | Client Components, so the metadata lives in a `layout.tsx` next to the page (`about-us/layout.tsx`, `contact/layout.tsx`) |
| `/news/[slug]`, `/events/[slug]` | `generateMetadata`: the document title, the excerpt shortened to about 155 characters as description, a canonical URL, Open Graph type `article` with the publication time, and a 1200 × 630 image cropped from the card image (default image if the document has none) |
| `/erasmus` and its 5 subpages | The same, plus JSON-LD |
| `/projects`, `/blog`, `/for-students/buddy`, `/for-students/housing`, `/for-students/survival-guide` | Placeholder pages: own title and description, but `robots: noindex` and no entry in the sitemap, until real content is added |

> [!NOTE]
> A `string` title in a **layout** resets the title template for all routes below it. `about-us/layout.tsx` therefore declares `title: { default: 'About Us', template: '%s | ESN Ukraine' }`, so that `/about-us/former-boards` still gets the suffix. Do the same if you add a layout with metadata above other pages.

### Conventions for new pages

- **Title:** the page's own name only, for example `Housing`. The root template adds ` | ESN Ukraine`, so do not write the suffix yourself. Keep the page name short: the whole title should stay under about 60 characters, or Google truncates it.
- **Uniqueness:** every indexable page needs its own title and description. Do not copy the homepage text.
- **Description:** one or two sentences, 120–160 characters, specific to the page, in English.
- **Canonical URL and Open Graph:** use `buildMetadata`, which sets both and keeps the default image.
- **Placeholder pages:** add `robots: { index: false, follow: true }` and leave the page out of `app/sitemap.ts` until it has real content.

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

- **16 static URLs**, listed by hand with priorities between 0.3 and 1.0. Their `lastModified` is the time the sitemap was generated.
- **Every news item and event** with a slug, with `lastModified` taken from the document's `_updatedAt`.
- The base URL `https://esnukraine.org` is hard-coded.
- The sitemap uses `sanityFetch` with the `news` and `event` tags, so it refreshes together with the content (at least hourly).

The placeholder pages (Projects, Blog, Buddy, Housing, Survival Guide) are deliberately not listed because they are `noindex`. When you add, rename or remove a public page, update the static list in `app/sitemap.ts`.

## robots.txt

`app/robots.ts` allows all crawlers, disallows `/studio` and `/api`, and points to `https://esnukraine.org/sitemap.xml`. The Studio layout also sets `noindex, nofollow`.

## Google Search Console

The website is registered in [Google Search Console](https://search.google.com/search-console) as a **URL-prefix property** for `https://esnukraine.org/`. It shows how Google indexes the website, crawl and indexing errors, and the search queries that lead to it.

- **Verification method:** HTML tag. The token is set in `verification.google` of the root layout metadata, so every public page renders `<meta name="google-site-verification" content="…">`. The token is not a secret: it is visible in the page source.
- **Sitemap:** submit `https://esnukraine.org/sitemap.xml` in Search Console under **Sitemaps**. Google re-reads it automatically afterwards.

> [!WARNING]
> Do not remove the `verification` field. Google re-checks the tag periodically, and the property loses its verified status when the tag disappears from the homepage. If the property is re-created or another owner verifies with a new token, replace the token in `app/(website)/layout.tsx`.

Access to the property is managed in Search Console under **Settings → Users and permissions**. See [Services and accounts](../operations/services-and-accounts.md#google-search-console).

## Language

The website copy is in English. The root layout sets `<html lang="en">` and the Open Graph locale `en_US`. The language switcher in the header shows "UA" as "coming soon". If you add translated content, keep `lang` in line with the language of each page, and declare the language versions with `alternates.languages`, which renders `hreflang` links.

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
