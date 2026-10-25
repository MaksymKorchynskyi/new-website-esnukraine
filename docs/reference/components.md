# Components

A catalogue of the React components and shared modules in `esn-ukraine-web/`. For each one: whether it runs on the server or in the browser, what it does, and where it is used.

**Audience:** developers looking for an existing component before writing a new one.

**Server** components render only on the server and send no JavaScript for themselves. **Client** components start with `'use client'` and run in the browser as well; they are needed for state, effects and event handlers.

## Layout — `components/layout/`

| Component | Type | Purpose | Used in |
|---|---|---|---|
| `Header.tsx` | Client | Fixed header with the five-colour ESN stripe, the logo and the main menu. From 1280 px wide: dropdown menus (hover and click, closes on <kbd>Esc</kbd>). Below that: a full-height mobile menu with social links and scroll locking. Data: `MAIN_NAV`, `SOCIAL_LINKS` | Root layout |
| `Footer.tsx` | Client | Mission statement, social links, contact emails (general: `ukraine-nr@esn.org`, technical: `web-master@esnukraine.org`), quick links and policy links. Client only because the logo scrolls to the top when you are already on the homepage | Root layout |
| `LanguageSwitcher.tsx` | Client | A static "EN / UA" indicator. UA is shown as "coming soon"; there is no translation yet | `Header` |
| `CookieBanner.tsx` | Client | The cookie consent banner, plus the settings dialog. Listens for `esn-open-cookie-settings` | Root layout |
| `CookieSettings.tsx` | Client | Accessible dialog for cookie preferences with an analytics toggle and a focus trap | `CookieBanner` |

## Page sections — `components/sections/`

| Component | Type | Purpose | Props | Used in |
|---|---|---|---|---|
| `HeroSection.client.tsx` | Client | Homepage hero slider. Auto-advances every 6 s and pauses while the mouse is over it. Supports swipe, arrows and slide indicators. Below 1024 px it fixes its height in pixels to avoid jumps when the mobile browser bar resizes | `slides: HeroSlide[]` (`id`, `type`, `date`, `title`, `description`, `image`, `link`). **Needs at least one slide** | `/` |
| `EventsSection.client.tsx` | Client | "Moments We Shared": a horizontally scrolling row of event cards with arrow buttons and a "View All Events" link | `events: PastEvent[]` | `/` (loaded with `next/dynamic`) |
| `NetworkCollage.client.tsx` | Client | "Our Network" collage with three photo slots that fade between photos at different intervals. Uses built-in stock photos for empty slots | `photosSlotA/B/C?: { id, url, alt }[]` | `/` (loaded with `next/dynamic`) |
| `NewsletterForm.client.tsx` | Client | Email field, privacy consent checkbox and hidden honeypot field. Validates on the client, posts to `/api/newsletter/subscribe`, and shows success and error states | — | `/` (loaded with `next/dynamic`), `/news` |
| `BoardSection.client.tsx` | Client | National Board grid grouped into Board, Board Support, and Audit Board & Advisory Council. Each card is a photo; clicking it opens an enlarged photo, and the name and position appear when the pointer is over it. Contains built-in placeholder profiles for an empty CMS | `members: BoardMemberItem[]` | `/national-board` |

## UI — `components/ui/`

| Component | Type | Purpose | Used in |
|---|---|---|---|
| `Card.tsx` → `NewsCard`, `EventCard` | Server | Cards with image, date, category or location, title, text and a "Read More" footer. Link to `/news/<slug>` or `/events/<slug>` | `/`, `/news`, `/events` |
| `AttachmentFiles.tsx` | Client | List of attached files with type and size. On desktop, PDFs open in an in-page preview (iframe, with a 12 s timeout); other files and all files on mobile open in a new tab | News and event detail pages |
| `PhotoGalleryLightbox.tsx` | Client | "Photo Gallery" grid and a full-screen viewer with keyboard (<kbd>Esc</kbd>, <kbd>←</kbd>, <kbd>→</kbd>) and swipe navigation | News and event detail pages |
| `PolicyPageLayout.tsx` | Client | Layout for legal pages: title, "last updated" date and a table of contents that highlights the current section while scrolling. Props: `title`, `lastUpdated`, `tableOfContents`, `children` | `/privacy`, `/cookies` |
| `UkraineMap.tsx` | Server | Shows the static section map image `public/ESN Ukraine section map.webp` | `/our-sections` |
| `UnderDevelopment.tsx` | Server | "Under Construction" page with the ESN mascot | `/projects`, `/for-students/buddy`, `/for-students/housing`, `/for-students/survival-guide` |

## Analytics — `components/analytics/`

| Component | Type | Purpose |
|---|---|---|
| `PostHogProvider.tsx` | Client | Initialises PostHog in opted-out mode and opts in or out according to the cookie consent. Wraps the whole website in the root layout |
| `PostHogPageView.tsx` | Client | Sends a `$pageview` on every route change, but only while tracking is allowed |

See [Privacy and analytics](../architecture/privacy-and-analytics.md).

## Components inside `app/`

| Component | Type | Purpose |
|---|---|---|
| `app/(website)/about-us/former-boards/FormerBoardsClient.tsx` | Client | Accordion of former boards with member photos |
| `app/(website)/cookies/CookieSettingsButton.tsx` | Client | "Manage Cookie Settings" button; dispatches `esn-open-cookie-settings` |
| `app/(website)/about-us/page.tsx` | Client (whole page) | Contains local components: scroll-reveal animations, animated counters and the history photo slider |
| `app/(website)/contact/page.tsx` | Client (whole page) | Contact details, social links and the contact form (UI only) |
| `portableTextComponents` in `news/[slug]/page.tsx` and `events/[slug]/page.tsx` | Server | Renderers for rich text: headings, paragraphs, lists, quotes, links, coloured and resized text, dividers, inline images and photo rows. Defined separately in both files |

## Shared modules

| Module | Exports | Purpose |
|---|---|---|
| [`lib/navigation.tsx`](../../esn-ukraine-web/lib/navigation.tsx) | `MAIN_NAV`, `SOCIAL_LINKS`, `FOOTER_QUICK_LINKS`, `FOOTER_POLICY_LINKS`, `XSocialIcon`, nav types | Single source for menus and social links. The contact page keeps its own list of social links |
| [`lib/cookies.ts`](../../esn-ukraine-web/lib/cookies.ts) | `getConsent`, `setConsent`, `acceptAll`, `rejectAll`, `hasConsentBeenGiven`, `dispatchConsentEvent`, `COOKIE_CATEGORIES`, `OPEN_SETTINGS_EVENT` | Cookie consent state and events |
| [`sanity/lib/client.ts`](../../esn-ukraine-web/sanity/lib/client.ts) | `client` | Configured Sanity client |
| [`sanity/lib/fetch.ts`](../../esn-ukraine-web/sanity/lib/fetch.ts) | `sanityFetch` | The only function to read Sanity data in pages (caching, tags, draft mode) |
| [`sanity/lib/queries.ts`](../../esn-ukraine-web/sanity/lib/queries.ts) | GROQ queries | See [Content model → Queries](content-model.md#queries) |
| [`sanity/lib/types.ts`](../../esn-ukraine-web/sanity/lib/types.ts) | Result types | Hand-written TypeScript types for query results |
| [`sanity/lib/image.ts`](../../esn-ukraine-web/sanity/lib/image.ts) | `urlFor`, `urlForImage` (identical) | Sanity image URL builder |
| [`sanity/lib/utils.ts`](../../esn-ukraine-web/sanity/lib/utils.ts) | `formatDate` | `DD/MM/YYYY` formatting in the server's time zone |
| [`sanity/lib/imageValidation.ts`](../../esn-ukraine-web/sanity/lib/imageValidation.ts) | `validateImageSize`, `validateFileSize`, `ACCEPTED_IMAGE_TYPES`, `ACCEPTED_FILE_TYPES` | Upload validation used in schemas |
| [`sanity/lib/live.ts`](../../esn-ukraine-web/sanity/lib/live.ts) | `sanityFetch`, `SanityLive` (Live Content API) | Not used at the moment |
| [`sanity/lib/mockData.ts`](../../esn-ukraine-web/sanity/lib/mockData.ts) | Mock news and events | Not imported anywhere at the moment |

> [!TIP]
> Two different functions are called `sanityFetch`. Import the one from `@/sanity/lib/fetch`, not the one from `@/sanity/lib/live`.

## Related

- [Styling](styling.md)
- [Routes](routes.md)
- [Rendering and data flow](../architecture/rendering-and-data-flow.md)
