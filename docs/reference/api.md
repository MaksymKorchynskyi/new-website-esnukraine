# API reference

The website has five API routes under `esn-ukraine-web/app/api/`, plus the RSS feed. They are used by Sanity (revalidation webhook), by maintainers (draft mode), by the newsletter form and by the contact form.

**Audience:** developers who change these routes, and maintainers who configure the Sanity webhook or debug the newsletter.

| Method and path | Purpose | Authentication |
|---|---|---|
| [`POST /api/revalidate`](#post-apirevalidate) | Invalidate cached content after a publish in Sanity | Shared secret |
| [`GET /api/draft-mode/enable`](#get-apidraft-modeenable) | Turn on draft mode in the browser | `SANITY_DRAFT_MODE_SECRET` |
| [`GET /api/draft-mode/disable`](#get-apidraft-modedisable) | Turn off draft mode | None |
| [`POST /api/newsletter/subscribe`](#post-apinewslettersubscribe) | Subscribe an email address to the newsletter | Origin check and rate limit |
| [`POST /api/contact`](#post-apicontact) | Send a contact-form message by email | Origin check and rate limit |
| [`GET /rss.xml`](#get-rssxml) | RSS feed of the latest news | None |

All JSON responses use `Content-Type: application/json`.

## POST /api/revalidate

Invalidates the Next.js data cache, so that pages show newly published content. It is called by a [Sanity GROQ-powered webhook](https://www.sanity.io/docs/webhooks) on every publish.

- **Source:** [`app/api/revalidate/route.ts`](../../esn-ukraine-web/app/api/revalidate/route.ts)
- **Runtime:** Node.js
- **Environment:** `SANITY_REVALIDATE_SECRET`

### Authentication

Two methods are accepted, both checked against `SANITY_REVALIDATE_SECRET`:

- **Signature (recommended).** When the webhook's **Secret** field is filled in, Sanity signs the body (`sanity-webhook-signature` header). The route verifies it with `parseBody` from `next-sanity/webhook`.
- **Secret in the request.** `Authorization: Bearer <secret>`, an `x-sanity-secret` header or `?secret=<secret>` in the URL, compared in constant time. This is the setup the site used before November 2026, so an existing webhook keeps working unchanged.

### Request body

Either the full document (the default when no projection is set) or the projection `{ _type, "slug": slug.current }`. The route reads `_type` and the slug, as a string or as `slug.current`:

| Field | Type | Description |
|---|---|---|
| `_type` | string | Required. The document type that changed, for example `news`. |
| `slug` | string | Optional. The slug of the changed document; expires the `news:<slug>` / `event:<slug>` tag. |

### Behaviour

1. Waits for Sanity's eventual consistency, so the regenerated page reads the new version of the document.
2. Calls `revalidateTag(_type, { expire: 0 })` and, when a slug is given, `revalidateTag('<type>:<slug>', { expire: 0 })`.

With `expire: 0` the cached entries are gone immediately: the first visitor after a publish already gets the fresh page.

### Responses

| Status | Body | When |
|---|---|---|
| `200` | `{ "revalidated": true, "tags": ["news", "news:my-article"], "now": 1761400000000 }` | Success |
| `400` | `{ "message": "Bad request: missing _type" }` | The projection does not include `_type` |
| `401` | `{ "message": "Invalid signature" }` or `{ "message": "Unauthorized: Invalid token" }` | The signature or the secret does not match `SANITY_REVALIDATE_SECRET` |
| `503` | `{ "message": "Revalidation is not configured" }` | `SANITY_REVALIDATE_SECRET` is not set |
| `500` | `{ "message": "Internal Server Error" }` | Unexpected error. The message is logged |

### Example

```bash
# The request must be signed; use the "Test" button of the webhook in sanity.io/manage
# or the Sanity CLI instead of a hand-written curl call.
```

See [Deployment and environments](../guides/deployment-and-environments.md#configure-the-sanity-webhook) for the webhook configuration in Sanity.

## GET /api/draft-mode/enable

Turns on [Next.js draft mode](https://nextjs.org/docs/app/guides/draft-mode) in the current browser and redirects to a page. In draft mode, pages show unpublished drafts and visual editing overlays. See [Rendering and data flow](../architecture/rendering-and-data-flow.md#draft-mode-and-visual-editing).

- **Source:** [`app/api/draft-mode/enable/route.ts`](../../esn-ukraine-web/app/api/draft-mode/enable/route.ts)
- **Environment:** `SANITY_DRAFT_MODE_SECRET`

### Query parameters

| Parameter | Required | Description |
|---|---|---|
| `secret` | Yes | Must equal `SANITY_DRAFT_MODE_SECRET` (compared in constant time) |
| `slug` | No | The path to open after enabling draft mode, for example `/news/my-article`. Defaults to `/`. Only site-relative paths are accepted; anything else redirects to `/`. |

### Responses

| Status | Body | When |
|---|---|---|
| `307` | Redirect to `slug` and set the draft mode cookie | The secret is valid |
| `401` | Plain text `Invalid secret` | The secret is missing or wrong |

> [!WARNING]
> The URL contains a secret. Do not share it, and do not paste it into chats, issues or documents.

## GET /api/draft-mode/disable

Turns off draft mode in the current browser and redirects to a page.

- **Source:** [`app/api/draft-mode/disable/route.ts`](../../esn-ukraine-web/app/api/draft-mode/disable/route.ts)

| Parameter | Required | Description |
|---|---|---|
| `slug` | No | The path to open afterwards. Defaults to `/`. Only site-relative paths are accepted. |

**Response:** `307` redirect to `slug`, with the draft mode cookie removed.

## POST /api/newsletter/subscribe

Adds an email address to the newsletter audience in Resend. It is called by the newsletter form ([`components/sections/NewsletterForm.client.tsx`](../../esn-ukraine-web/components/sections/NewsletterForm.client.tsx)) on the homepage and the News page.

- **Source:** [`app/api/newsletter/subscribe/route.ts`](../../esn-ukraine-web/app/api/newsletter/subscribe/route.ts)
- **Runtime:** Node.js
- **Environment:** `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `RATE_LIMIT_SALT` (optional)

### Request

```http
POST /api/newsletter/subscribe
Content-Type: application/json

{ "email": "student@example.com", "consent": true, "honeypot": "" }
```

| Field | Type | Rules |
|---|---|---|
| `email` | string | Required. Trimmed, at most 254 characters, a valid email address. Lowercased before saving. |
| `consent` | boolean | Required. Must be `true` (privacy policy consent). |
| `honeypot` | string | Optional. Comes from a hidden field that people do not see. A non-empty value marks the request as a bot. |

### Processing steps

"Production" below means `NODE_ENV=production` and `VERCEL_ENV` is not `preview`. Local `npm run dev` and Vercel Preview deployments therefore skip the origin check and do not require the rate limiter. A local `npm run start` counts as production.

```mermaid
sequenceDiagram
    accTitle: Newsletter subscription
    accDescr: The browser posts the form to the subscribe route. In production the route checks the origin and the rate limit, then validates the input, ignores bots, and adds the contact to the Resend audience.

    participant Browser as Newsletter form
    participant API as /api/newsletter/subscribe
    participant Redis as Upstash Redis
    participant Resend as Resend

    Browser->>API: POST email, consent, honeypot
    API->>API: Production only - check Origin or Referer
    API->>Redis: Rate limit by IP, 5 per minute
    Redis-->>API: Allowed or blocked
    API->>API: Parse JSON and validate with Zod
    API->>API: Honeypot filled - return success without saving
    API->>Resend: contacts.create with email and audienceId
    Resend-->>API: Created, duplicate or error
    API-->>Browser: JSON result
```

1. **Origin check (production only).** The `Origin` or `Referer` header must have the host `esnukraine.org` or a subdomain of it. Otherwise the route returns `403`.
2. **Client IP.** Determined with `ipAddress()` from `@vercel/functions`.
3. **Rate limit.** If Upstash is configured: a sliding window of 5 requests per minute per IP address. If Upstash is not configured in production, the route returns `503`. Elsewhere the limit is skipped.
4. **Parsing and validation** with Zod. See the field rules above.
5. **Honeypot.** If filled in, the route returns a fake success response and stores nothing.
6. **Resend configuration.** If `RESEND_API_KEY` or `RESEND_AUDIENCE_ID` is missing, the route returns `503`.
7. **Subscription.** `resend.contacts.create({ email, unsubscribed: false, audienceId })`. A duplicate address is treated as success. The route recognises duplicates by a `validation_error` or an "already exists" message.

### Responses

| Status | `error` or `message` | When |
|---|---|---|
| `200` | "Welcome aboard! You've been subscribed to our newsletter." | Subscribed |
| `200` | "Welcome aboard! You've been subscribed to our newsletter." | Already subscribed |
| `200` | "Subscribed successfully!" | Honeypot filled in; nothing stored |
| `400` | "Invalid request body." | The body is not valid JSON |
| `400` | The first validation message, for example "Please enter a valid email address." or "Privacy consent is required." | Validation failed, or Resend rejected the address |
| `403` | "Unauthorized origin." | Production request from another origin |
| `429` | "Too many requests. Please try again later." (+ `Retry-After` header, in seconds) | Rate limit exceeded |
| `503` | "Service Unavailable" | Production without Upstash credentials |
| `503` | "Newsletter service is temporarily unavailable." | Resend credentials missing |
| `500` | "Something went wrong. Please try again later." | Resend returned an error |
| `500` | "An unexpected error occurred. Please try again." | Any other error |

All responses have the shape `{ "success": boolean, "message"?: string, "error"?: string }`.

### Logging

Logs never contain email addresses. The route logs blocked origins, missing configuration, Resend errors and unexpected exceptions with the prefix `[Newsletter]`. Logs are visible in the Vercel dashboard (**Logs**).

## POST /api/contact

Sends a message from the contact form ([`app/(website)/contact/page.tsx`](../../esn-ukraine-web/app/(website)/contact/page.tsx)) by email through Resend.

- **Source:** [`app/api/contact/route.ts`](../../esn-ukraine-web/app/api/contact/route.ts)
- **Runtime:** Node.js
- **Environment:** `RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO` (optional), `KV_REST_API_URL`, `KV_REST_API_TOKEN`

### Request

```http
POST /api/contact
Content-Type: application/json

{ "name": "Jane Doe", "email": "jane@example.com", "subject": "partnership", "message": "…", "honeypot": "" }
```

`subject` is one of `general`, `buddy`, `partnership`, `new-section`, `media`, `other`. `name` is 2–100 characters, `message` 10–5000 characters. `honeypot` must stay empty (bots that fill it get a fake success).

### Responses

| Status | `error` | When |
|---|---|---|
| `200` | — | Sent (`{ "success": true }`) |
| `400` | The first validation message | Validation failed |
| `403` | "Unauthorized origin." | Production request from another origin |
| `429` | "Too many messages. Please try again in a few minutes." (+ `Retry-After`) | More than 3 messages in 10 minutes from one visitor |
| `502` | "We could not send your message. Please email us at …" | Resend returned an error |
| `503` | "The contact form is temporarily unavailable. Please email us at …" | `RESEND_API_KEY` or `CONTACT_EMAIL_FROM` missing |
| `503` | "Service Unavailable" | Production without Upstash credentials |

The email is sent to `CONTACT_EMAIL_TO` with the visitor's address as `Reply-To`; all values are escaped in the HTML body.

## GET /rss.xml

RSS 2.0 feed of the 30 latest news items, generated by [`app/rss.xml/route.ts`](../../esn-ukraine-web/app/rss.xml/route.ts). It uses `sanityFetch` with the `news` tag, so it is refreshed together with the news pages. If Sanity is unreachable the feed is served empty rather than failing.

## Related

- [Environment variables](environment-variables.md)
- [Privacy and analytics](../architecture/privacy-and-analytics.md)
- [Troubleshooting](../guides/troubleshooting.md)
