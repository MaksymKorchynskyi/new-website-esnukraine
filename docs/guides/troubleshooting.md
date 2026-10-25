# Troubleshooting

Known symptoms, their usual causes and how to fix them. Each entry follows the pattern **Symptom → Cause → Fix**.

**Audience:** developers and maintainers. Editors can start with the [content editing guide](../content-editing/README.md#getting-help).

| Symptom | Section |
|---|---|
| `Missing environment variable: NEXT_PUBLIC_SANITY_…` | [Missing Sanity configuration](#missing-sanity-configuration) |
| Published content does not appear on the website | [Content does not update](#content-does-not-update) |
| A news or event URL returns 404 | [News or event page returns 404](#news-or-event-page-returns-404) |
| The homepage shows an error, or the build fails on `/` | [Homepage fails without Spotlight items](#homepage-fails-without-spotlight-items) |
| Unfamiliar events or people are shown | [Built-in sample content appears](#built-in-sample-content-appears) |
| Studio shows a CORS error or keeps asking to log in | [Studio cannot connect](#studio-cannot-connect) |
| Studio rejects an image or file | [Upload is rejected](#upload-is-rejected) |
| The newsletter form shows an error | [Newsletter errors](#newsletter-errors) |
| PostHog shows no data | [No analytics data](#no-analytics-data) |
| Drafts or edit overlays appear on the website | [Stuck in draft mode](#stuck-in-draft-mode) |
| The Vercel build fails | [Build fails](#build-fails) |
| Dates are one day off | [Dates are one day off](#dates-are-one-day-off) |
| The homepage hero behaves differently on iPhone | [Hero height on mobile](#hero-height-on-mobile) |

## Missing Sanity configuration

**Symptom:** a page shows `Error: Missing environment variable: NEXT_PUBLIC_SANITY_DATASET` (or `…PROJECT_ID`).

**Cause:** `sanity/env.ts` requires both variables and throws when either is undefined.

**Fix:** locally, add both to `esn-ukraine-web/.env.local` and restart `npm run dev`. On Vercel, add them for the affected environment (Production or Preview) and redeploy.

## Content does not update

**Symptom:** a document is published in the Studio, but the website still shows the old version.

**Causes and fixes:**

1. **Stale-while-revalidate.** After a publish, the first request still gets the previous version while the page regenerates. Wait a few seconds and refresh again.
2. **The document is not published.** Drafts are invisible on the website. In the Studio, check that the document shows as published and has no pending changes.
3. **The webhook failed.** In sanity.io/manage → **API** → **Webhooks**, open the delivery log:
   - `401`: the secret header does not match `SANITY_REVALIDATE_SECRET` in Vercel;
   - `404` or a timeout: the URL is wrong;
   - no deliveries: the webhook is disabled, or its filter does not include the document type.

   See [Configure the Sanity webhook](deployment-and-environments.md#configure-the-sanity-webhook).
4. **The content is in code.** Static pages such as the Erasmus+ pages only change with a deployment. See [What is managed where](../architecture/overview.md#what-is-managed-where).

Without a working webhook, CMS pages still refresh **within an hour**. To refresh everything immediately, redeploy the latest production deployment in Vercel.

## News or event page returns 404

**Symptom:** `/news/<slug>` or `/events/<slug>` shows "Page Not Found".

**Causes and fixes:**

- **The document is not published,** or the slug in the URL differs from the slug in the Studio.
- **The slug was changed.** Old URLs are not redirected automatically. Add a redirect if the old URL was shared ([Common tasks](common-tasks.md#add-or-change-a-redirect)).
- **The slug collides with a redirect.** `next.config.ts` redirects some old `/news/...` paths to `/news`. Choose another slug.
- **The slug contains special characters,** such as apostrophes or non-Latin letters. This usually happens when a slug is typed by hand; the Studio's **Generate** button produces safe slugs. Change it to lowercase Latin letters, digits and hyphens, and add a redirect if the old address was shared. See [Images and files → Slugs](../content-editing/images-and-files.md#slugs).

## Homepage fails without Spotlight items

**Symptom:** after editors change Spotlight settings, the homepage shows "Something went wrong", or a production build fails while pre-rendering `/`.

**Cause:** the homepage hero (`components/sections/HeroSection.client.tsx`) expects at least one slide. The slides come from news items and events with **Spotlight** enabled.

**Fix:** in the Studio, enable **Показувати в Spotlight на головній** on at least one published news item or event, then publish. Redeploy if a build failed.

## Built-in sample content appears

**Symptom:** `/events` lists events ESN Ukraine never organised, `/national-board` shows placeholder profiles, or the homepage collage shows stock photos.

**Cause:** these components fall back to built-in content when Sanity returns no documents. `/events` also falls back when the request fails. See [Built-in fallback content](../architecture/rendering-and-data-flow.md#built-in-fallback-content).

**Fix:**

- Check that the documents exist and are published.
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` point to the right project and dataset.
- Look for Sanity errors in the Vercel logs.

## Studio cannot connect

**Symptom:** `/studio` shows a CORS error, "Unauthorized", or a login loop.

**Causes and fixes:**

- **The origin is not allowed.** Add the origin, for example `http://localhost:3000` or a preview URL, under **API** → **CORS origins** in sanity.io/manage, with **Allow credentials** enabled.
- **Your account has no access** to the Sanity project. Ask an administrator to invite you.
- **Browser privacy settings** interfere with the Sanity login. Allow cookies for the site, or try another browser.

## Upload is rejected

**Symptom:** the Studio shows a message such as "Розмір фото (… МБ) перевищує ліміт…" or "Ширина зображення (…px) перевищує…".

**Cause:** the field's size or resolution limit. See [Content model → Upload limits](../reference/content-model.md#upload-limits).

**Fix:** compress or resize the file, for example with [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/), and upload it again. For editors: [Images and files](../content-editing/images-and-files.md).

## Newsletter errors

The form shows the error message returned by `/api/newsletter/subscribe`. Check the response in the browser's network tab and the Vercel logs (prefix `[Newsletter]`).

| Status and message | Cause | Fix |
|---|---|---|
| `403 Unauthorized origin.` | The request came from a host other than `esnukraine.org` in production. A local `npm run start` also counts as production | Use `npm run dev` locally, or test on Preview |
| `429 Too many requests…` | More than 5 attempts per minute from one IP address | Wait a minute |
| `503 Service Unavailable` | `KV_REST_API_URL` or `KV_REST_API_TOKEN` is missing in production | Set both in Vercel and redeploy |
| `503 Newsletter service is temporarily unavailable.` | `RESEND_API_KEY` or `RESEND_AUDIENCE_ID` is missing | Set both and redeploy |
| `500 Something went wrong…` | Resend rejected the request, for example because of an invalid key or a deleted audience | Read the logged Resend error; check the key and the audience in Resend |

## No analytics data

**Symptom:** PostHog shows no page views.

**Causes and fixes:**

- **No consent.** PostHog tracks only after the visitor clicks **Accept All**, or enables analytics in the cookie settings. Test in a private window and accept analytics.
- **The key is missing.** `NEXT_PUBLIC_POSTHOG_KEY` must be set in the environment **at build time**. Redeploy after you add it. The browser console shows "PostHog API key is missing" when it is absent.
- **Requests are blocked.** In the network tab, look for requests to `/ingest/posthog/…`. Ad blockers can block them.

## Stuck in draft mode

**Symptom:** the website shows unpublished drafts or click-to-edit overlays.

**Cause:** the draft mode cookie is set in your browser.

**Fix:** open `/api/draft-mode/disable`. Clearing the site's cookies also works.

## Build fails

**Symptom:** a Vercel deployment fails.

**Causes and fixes:**

- **A missing environment variable** in that environment. Preview and Production have separate settings. Check the build log for `Missing environment variable`.
- **A type error.** Run `npx tsc --noEmit` locally.
- **A pre-rendering error.** The build fetches content for every page. A Sanity outage, or content that breaks a component, fails the build. An example is the case in [Homepage fails without Spotlight items](#homepage-fails-without-spotlight-items). The build log names the failing route.
- **An incompatible Node.js version.** Check the Node.js version in the Vercel project settings (20.19+ or 22.12+).

## Dates are one day off

**Symptom:** an event that starts shortly after midnight Kyiv time shows the previous day.

**Cause:** `formatDate` in `sanity/lib/utils.ts` uses the server's time zone, and on Vercel that is UTC. See [Rendering and data flow → Dates](../architecture/rendering-and-data-flow.md#dates).

**Fix:** to show Kyiv dates, format with `Intl.DateTimeFormat` and `timeZone: 'Europe/Kyiv'` in `formatDate`.

## Hero height on mobile

**Symptom:** the homepage hero has a fixed pixel height on phones and tablets, unlike other sections.

**Cause:** this is intentional. Below 1024 px, `HeroSection.client.tsx` sets the height from `window.innerHeight` once, and updates it on orientation change. This avoids jumps when the iOS Safari toolbar shows or hides. Several earlier branches (`fix/ios-*`) dealt with this issue.

**Fix:** none needed. If you change the hero, test on a real iPhone.

## Related

- [Deployment and environments](deployment-and-environments.md)
- [API reference](../reference/api.md)
- [Environment variables](../reference/environment-variables.md)
