# Routes

A complete inventory of the routes in `esn-ukraine-web/app/`: every page, API route and special route, with its source file, rendering mode, data source and status.

**Audience:** developers looking for the code behind a URL, and maintainers checking what the website contains.

Legend:

- **Rendering:** *Static* = rendered at build time. *ISR* = incremental static regeneration: cached, refreshed hourly or by the publish webhook (see [Rendering and data flow](../architecture/rendering-and-data-flow.md#rendering-strategies)). *Dynamic* = executed per request.
- **Metadata:** *Own* = the page sets its own title and description. *Default* = the page inherits "ESN Ukraine" from the root layout.
- **Status:** *Live* = complete page. *Placeholder* = shows a "coming soon" or "under construction" message. *UI only* = the interface exists but is not connected to a backend.

## Public pages

All public pages are under `app/(website)/` and share the root layout `app/(website)/layout.tsx`. In the table, file paths are relative to `app/(website)/`.

| Path | Source | Rendering | Data | Metadata | Status |
|---|---|---|---|---|---|
| `/` | `page.tsx` | ISR | Sanity: Spotlight items, the 3 newest news items, the 4 events with the latest dates, "Our Network" photos. Other texts in code | Own | Live |
| `/about-us` | `about-us/page.tsx` (Client Component) | Static | Code: texts, statistics, history photos, video | Default | Live |
| `/about-us/former-boards` | `about-us/former-boards/page.tsx`, `FormerBoardsClient.tsx` | ISR | Sanity: `formerBoard` | Own | Live |
| `/national-board` | `national-board/page.tsx`, `components/sections/BoardSection.client.tsx` | ISR | Sanity: `boardMember`. Built-in placeholder profiles when there are none | Default | Live |
| `/our-sections` | `our-sections/page.tsx`, `components/ui/UkraineMap.tsx` | ISR | Sanity: `section`. Static map image | Default | Live |
| `/news` | `news/page.tsx` | ISR | Sanity: all `news`, newest first | Default | Live |
| `/news/[slug]` | `news/[slug]/page.tsx` | ISR; all slugs pre-rendered at build | Sanity: one `news` document | Own (`generateMetadata`) | Live |
| `/events` | `events/page.tsx` | ISR | Sanity: all `event`, latest date first. Built-in sample events when there are none or the fetch fails | Default | Live |
| `/events/[slug]` | `events/[slug]/page.tsx` | ISR; all slugs pre-rendered at build | Sanity: one `event` document | Own (`generateMetadata`) | Live |
| `/erasmus` | `erasmus/page.tsx` | Static | Code | Own, canonical, JSON-LD | Live |
| `/erasmus/academic-mobility` | `erasmus/academic-mobility/page.tsx` | Static | Code | Own, canonical, JSON-LD | Live |
| `/erasmus/erasmus-mundus` | `erasmus/erasmus-mundus/page.tsx` | Static | Code | Own, canonical, JSON-LD | Live |
| `/erasmus/trainings-and-exchanges` | `erasmus/trainings-and-exchanges/page.tsx` | Static | Code | Own, canonical, JSON-LD | Live |
| `/erasmus/european-solidarity-corps` | `erasmus/european-solidarity-corps/page.tsx` | Static | Code | Own, canonical, JSON-LD | Live |
| `/erasmus/national-erasmus-office` | `erasmus/national-erasmus-office/page.tsx` | Static | Code | Own, canonical, JSON-LD | Live |
| `/for-students/esncard` | `for-students/esncard/page.tsx` | Static | Code; links to esncard.org | Default | Live |
| `/for-students/buddy` | `for-students/buddy/page.tsx` | Static | — | Own | Placeholder |
| `/for-students/housing` | `for-students/housing/page.tsx` | Static | — | Own | Placeholder |
| `/for-students/survival-guide` | `for-students/survival-guide/page.tsx` | Static | — | Own | Placeholder |
| `/projects` | `projects/page.tsx` | Static | — | Default | Placeholder |
| `/blog` | `blog/page.tsx` | Static | — | Own | Placeholder ("Content coming soon") |
| `/contact` | `contact/page.tsx` (Client Component) | Static | Code: email, address, social links, and a contact form with name, email, topic and message fields | Default | Live. The contact form is **UI only**: submitting it shows a confirmation but sends nothing |
| `/privacy` | `privacy/page.tsx`, `components/ui/PolicyPageLayout.tsx` | Static | Code | Own | Live |
| `/cookies` | `cookies/page.tsx`, `cookies/CookieSettingsButton.tsx` | Static | Code | Own | Live |

The Buddy System, Housing, Survival Guide and Projects pages render the shared `UnderDevelopment` component ("Under Construction").

### Special files in `app/(website)/`

| File | Purpose |
|---|---|
| `layout.tsx` | Root layout of the public website: see [Rendering and data flow](../architecture/rendering-and-data-flow.md#layouts) |
| `error.tsx` | Error boundary ("Something went wrong") |
| `not-found.tsx` | 404 page, shown when a page calls `notFound()` |
| `loading.tsx` | Loading spinner during navigation |

## Sanity Studio

| Path | Source | Rendering | Notes |
|---|---|---|---|
| `/studio` and everything below | `app/studio/[[...tool]]/page.tsx`, `app/studio/layout.tsx` | Static shell (`force-static`), browser application | Renders `NextStudio` with `sanity.config.ts`. Not indexed (`noindex`, disallowed in `robots.txt`) |

## API routes

| Method and path | Source | Runtime | Purpose |
|---|---|---|---|
| `POST /api/revalidate` | `app/api/revalidate/route.ts` | Node.js | Webhook from Sanity that invalidates cached content |
| `GET /api/draft-mode/enable` | `app/api/draft-mode/enable/route.ts` | Node.js | Turns on draft mode (requires a token) |
| `GET /api/draft-mode/disable` | `app/api/draft-mode/disable/route.ts` | Node.js | Turns off draft mode |
| `POST /api/newsletter/subscribe` | `app/api/newsletter/subscribe/route.ts` | Edge | Newsletter subscription |

Requests, responses and errors are documented in the [API reference](api.md).

## Metadata routes and files

| Path | Source | Rendering | Content |
|---|---|---|---|
| `/sitemap.xml` | `app/sitemap.ts` | ISR | 22 static URLs plus every news item and event. See [SEO](../architecture/seo.md#sitemap) |
| `/robots.txt` | `app/robots.ts` | Static | Allows everything except `/studio` and `/api`, and links the sitemap |
| `/icon.png`, `/apple-icon.png`, `/favicon.ico` | `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` | Static | Browser and home-screen icons, detected through the Next.js file conventions |

`public/manifest.webmanifest` exists but is not referenced in the metadata.

## Rewrites

Defined in `next.config.ts`:

| Source | Destination | Purpose |
|---|---|---|
| `/ingest/posthog/:path*` | `https://eu.i.posthog.com/:path*` | First-party proxy for PostHog analytics. See [Privacy and analytics](../architecture/privacy-and-analytics.md#posthog-product-analytics) |

## Redirects

`next.config.ts` contains 43 permanent redirects from URLs of the previous website. They are grouped and explained in [SEO → Redirects from the previous website](../architecture/seo.md#redirects-from-the-previous-website). The source of truth is the `redirects()` function in [`next.config.ts`](../../esn-ukraine-web/next.config.ts).

## Navigation

The header and footer menus are defined in [`lib/navigation.tsx`](../../esn-ukraine-web/lib/navigation.tsx).

**Header (`MAIN_NAV`).** On screens 1280 px and wider, the menu shows dropdowns. Below that width, it collapses into a mobile menu.

| Menu item | Links |
|---|---|
| About Us | About Us, National Board, Former Boards, Our Sections |
| For Students | Survival Guide, Buddy System, Housing, ESNcard |
| Erasmus+ | Erasmus+, Academic Mobility, Erasmus Mundus Master Programmes, Erasmus Trainings and Exchanges, European Solidarity Corps, National Erasmus+ Office |
| Projects | `/projects` |
| News & Media | News, Events, Blog |
| Contact | `/contact` |

**Footer.**

- Quick links (`FOOTER_QUICK_LINKS`): Home, About Us, Events, News, Our Sections, Erasmus+.
- Policies (`FOOTER_POLICY_LINKS`): Privacy Policy, Code of Conduct (an external Google Docs document), Cookie Policy.
- Social links (`SOCIAL_LINKS`): Instagram, LinkedIn, X, YouTube and email. The header uses the same list in the mobile menu.

## Related

- [Rendering and data flow](../architecture/rendering-and-data-flow.md)
- [Common tasks: add a page](../guides/common-tasks.md#add-a-page)
- [Components](components.md)
