# Rendering and data flow

This page explains how pages are rendered and cached, how content from Sanity reaches visitors, and what happens when an editor publishes a change. It also covers draft mode, images, dates and error handling.

**Audience:** developers who change data fetching, add pages, or investigate why content is (not) updating.

## Layouts

The `app/` folder has two independent root layouts, implemented as [route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups):

| Layout | Applies to | What it provides |
|---|---|---|
| `app/(website)/layout.tsx` | All public pages | `<html>` and `<body>`, the Manrope font, default metadata, the PostHog provider, `Header`, `Footer`, `CookieBanner`, page view tracking, Vercel `<Analytics />`, and `<VisualEditing />` when draft mode is on |
| `app/studio/layout.tsx` | `/studio` | A full-height page for Sanity Studio, with `robots: noindex, nofollow` |

Because these are separate root layouts, moving between the website and `/studio` is a full page load.

## Rendering strategies

Every public page is rendered on the server. The table shows how each group of routes is rendered, as confirmed by a production build:

| Strategy | Routes | Behaviour |
|---|---|---|
| **Static** | `/about-us`, `/contact`, `/cookies`, `/privacy`, `/erasmus` and its subpages, `/for-students/*`, `/blog`, `/projects`, `/robots.txt` | Rendered once at build time. These pages do not read from Sanity, so content changes need a new deployment. |
| **Incremental static regeneration (ISR)** | `/`, `/news`, `/events`, `/national-board`, `/our-sections`, `/about-us/former-boards`, `/sitemap.xml` | Rendered at build time and cached. Refreshed after one hour or when the publish webhook invalidates the cache. |
| **ISR with pre-rendered parameters** | `/news/[slug]`, `/events/[slug]` | `generateStaticParams` pre-renders every published slug at build time. A slug published later is rendered on its first request and then cached. Unknown slugs return the 404 page. |
| **Static shell, browser application** | `/studio/[[...tool]]` (`dynamic = 'force-static'`) | The page delivers the Studio application, which then runs in the browser. |
| **Dynamic** | `/api/*` | Executed on every request. The newsletter route runs on the Edge runtime. |

The cache lifetime and tags come from `sanityFetch`, described below. Pages do not export their own `revalidate` settings.

## Fetching data from Sanity

All server-side reads go through one function: `sanityFetch` in [`sanity/lib/fetch.ts`](../../esn-ukraine-web/sanity/lib/fetch.ts).

```ts
const news = await sanityFetch<NewsArticlePreview[]>({
  query: getLatestNewsQuery,   // GROQ query
  params: { /* GROQ parameters, e.g. slug */ },
  tags: ['news'],              // cache tags; use the document type
});
```

Its behaviour depends on the context:

| Context | Perspective | Caching | Other |
|---|---|---|---|
| **Normal request** (production, preview) | `published`: only published documents | Next.js data cache with `revalidate: 3600` and tags `['sanity', …tags]` | `stega` off |
| **Draft mode** | `previewDrafts`: drafts override published documents | No caching (`revalidate: 0`) | Uses `SANITY_API_READ_TOKEN`; `stega` on, for visual editing |
| **Development** (`npm run dev`) | `published` | No caching (`revalidate: 0`) | Content changes appear on refresh |

Implementation details worth knowing:

- **The CDN is bypassed.** The client in `sanity/lib/client.ts` sets `useCdn: false`, so every fetch reads fresh data from the Sanity API. Next.js caching keeps the number of API calls low.
- **Tags are sanitised.** Characters outside `a–z`, `A–Z`, `0–9`, `_`, `-` and `:` are replaced with `-`. Tags such as `news:<slug>` can contain special characters from slugs, which caused server errors in the past.
- **Every tag list includes `sanity`.** That way a single `revalidateTag('sanity')` refreshes every page that uses CMS data.
- **`draftMode()` outside a request.** At build time, for example inside `generateStaticParams`, the function throws. `sanityFetch` catches the error and treats the request as not being in draft mode.

The queries themselves are listed in [Content model → Queries](../reference/content-model.md#queries).

## How published content reaches visitors

When an editor publishes a document, Sanity calls the website's revalidation webhook. The [API reference](../reference/api.md#post-apirevalidate) describes the endpoint.

```mermaid
sequenceDiagram
    accTitle: Publishing content
    accDescr: An editor publishes a document in Sanity Studio. Sanity sends a webhook to the revalidate API route, which marks cached data as stale. The next visitor still receives the previous version while the page regenerates in the background, and later visitors receive the updated page.

    actor Editor
    participant Studio as Sanity Studio
    participant Lake as Sanity Content Lake
    participant API as /api/revalidate
    participant Cache as Next.js cache on Vercel
    actor Visitor

    Editor->>Studio: Click Publish
    Studio->>Lake: Save the published document
    Lake->>API: Webhook POST with _type and secret
    API->>API: Compare the secret with SANITY_REVALIDATE_SECRET
    API->>Cache: revalidateTag sanity and revalidateTag _type, profile max
    API-->>Lake: 200 revalidated
    Visitor->>Cache: Request a page
    Cache-->>Visitor: Previous version, marked stale
    Cache->>Lake: Regenerate the page in the background
    Visitor->>Cache: Request the page again
    Cache-->>Visitor: Updated page
```

Key points:

- `revalidateTag(tag, 'max')` uses **stale-while-revalidate**. The first request after publishing may still show the previous version; a refresh a few seconds later shows the new one.
- The route always invalidates the `sanity` tag. As a result, **any publish refreshes every CMS-backed page**, not only pages of the changed type. This is simple and cheap at the current content volume.
- If the webhook fails or is not configured, content still updates **within one hour** through time-based revalidation.
- **Static pages are not affected.** Content in code, such as the Erasmus+ pages, changes only with a new deployment.

The webhook itself is configured in Sanity, not in this repository. See [Deployment and environments](../guides/deployment-and-environments.md#configure-the-sanity-webhook).

## Serving a page

```mermaid
sequenceDiagram
    accTitle: Serving a cached page
    accDescr: Vercel serves cached pages immediately. Stale pages are served and regenerated in the background. Pages that have never been generated, such as a newly published article, are rendered on the first request and then cached.

    actor Visitor
    participant Vercel as Vercel cache
    participant Next as Next.js server
    participant Lake as Sanity

    Visitor->>Vercel: GET /news/some-article
    alt Cached and fresh
        Vercel-->>Visitor: Cached HTML
    else Cached but stale
        Vercel-->>Visitor: Cached HTML
        Vercel->>Next: Regenerate in the background
        Next->>Lake: GROQ queries through sanityFetch
        Next-->>Vercel: Store the new HTML
    else Never generated, for example a new slug
        Vercel->>Next: Render now
        Next->>Lake: GROQ queries through sanityFetch
        Next-->>Vercel: Store the HTML
        Vercel-->>Visitor: HTML
    end
```

If a regeneration fails, for example because Sanity is unreachable or a component throws, Next.js keeps serving the last successfully generated version. A new deployment, however, fails if a page cannot be pre-rendered during the build.

## Draft mode and visual editing

Draft mode shows unpublished drafts on the real website and adds click-to-edit overlays that link back to the Studio.

1. A maintainer opens `/api/draft-mode/enable?token=<SANITY_API_READ_TOKEN>&slug=/news/<slug>`.
2. The route compares the token with `SANITY_API_READ_TOKEN`, enables Next.js draft mode (a cookie in the browser), and redirects to the given path.
3. While the cookie is present, `sanityFetch` uses the `previewDrafts` perspective without caching. The root layout renders `<VisualEditing />`, which turns the invisible `stega` markers in strings into edit links.
4. `/api/draft-mode/disable?slug=/` turns draft mode off.

> [!WARNING]
> The enable URL contains the Sanity read token. Anyone with the URL can read draft content while the token is valid. Do not share the URL or paste it into chats or issues. If it leaks, rotate the token as described in [Deployment and environments](../guides/deployment-and-environments.md#rotate-secrets).

The Studio configuration (`sanity.config.ts`) does not include Sanity's Presentation tool, so the Studio has no **Preview** button. `sanity/lib/live.ts` sets up Sanity's Live Content API (`defineLive`), but nothing uses it yet.

## Images

| Source | Used for | How it is rendered |
|---|---|---|
| **Sanity assets** (`cdn.sanity.io`) | All images uploaded by editors | Mostly `next/image`, which resizes the image and serves AVIF or WebP (see `images` in `next.config.ts`) |
| **`public/`** | Logos, the About Us history photos and video, the section map, the default sharing image, the "under construction" mascot | `next/image` or `<img>`/`<video>` |
| **`images.unsplash.com`** | Built-in placeholder photos when CMS data is missing (see [below](#built-in-fallback-content)) and decorative photos on the ESNcard page | `next/image` |

Sanity image URLs are built in two ways:

- **`asset->url` in GROQ** returns the URL of the original upload. Cards, homepage slides, the "Our Network" collage, section logos and board photos use it, and `next/image` takes care of resizing.
- **`urlFor()`** from [`sanity/lib/image.ts`](../../esn-ukraine-web/sanity/lib/image.ts) builds a resized URL with a fixed width and height, honouring the editor's hotspot and crop. Article and event headers and social sharing images (1200 × 630) use it. Images in the article body use it when the query does not return the asset URL.

Board photos, the gallery lightbox, the About Us history slider and the footer logo use a plain `<img>` element, so these images are not resized by `next/image`.

Images in the article body and gallery use the low-quality image placeholder (`metadata.lqip`) from Sanity as a blur-up placeholder when it is available.

## Dates

`formatDate` in [`sanity/lib/utils.ts`](../../esn-ukraine-web/sanity/lib/utils.ts) formats dates as `DD/MM/YYYY`. It uses the time zone of the machine that renders the page. On Vercel that is UTC, not Kyiv time, so an event that starts shortly after midnight Kyiv time can show the previous day.

## Error handling

| Mechanism | File | When it is used |
|---|---|---|
| Error boundary | `app/(website)/error.tsx` | A rendering error inside a page. Shows "Something went wrong" with a **Try again** button. |
| Not found | `app/(website)/not-found.tsx` | `notFound()` calls, for example an unknown news or event slug. Shows a 404 page with a link home. |
| Loading state | `app/(website)/loading.tsx` | A spinner while a page loads during client-side navigation. |

### Built-in fallback content

Some components contain built-in content that is shown when Sanity returns nothing:

| Where | Condition | What visitors see |
|---|---|---|
| `/events` | No events, or the fetch fails | A built-in list of sample events (`MOCK_EVENTS` in `app/(website)/events/page.tsx`) |
| `/national-board` | No board member documents | Built-in placeholder profiles (`FALLBACK_BOARD_MEMBERS` in `components/sections/BoardSection.client.tsx`) |
| Homepage "Our Network" | A slot has no photos | Built-in stock photos for that slot |
| Homepage hero, news and event cards | A document has no image | A stock photo, or an "ESN" placeholder tile on cards |

> [!IMPORTANT]
> The homepage hero has **no** fallback. It needs at least one published news item or event with **Spotlight** enabled. Without one, rendering the homepage fails. Regenerations keep serving the previous version, but the next deployment build fails.

If the website shows unfamiliar events or people, check first that Sanity is reachable and that the environment variables point to the right project and dataset.

## Related

- [Architecture overview](overview.md)
- [Content model](../reference/content-model.md)
- [API reference](../reference/api.md)
- [ADR-0001: Next.js App Router, static first](../adr/0001-nextjs-app-router-static-first.md)
- [ADR-0003: On-demand revalidation with cache tags](../adr/0003-on-demand-revalidation-with-cache-tags.md)
