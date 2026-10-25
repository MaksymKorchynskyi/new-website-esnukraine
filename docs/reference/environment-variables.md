# Environment variables

Every environment variable the application reads, where it is used, whether it is required, and where to get its value. The template for local development is [`esn-ukraine-web/.env.example`](../../esn-ukraine-web/.env.example).

**Audience:** developers setting up the project, and maintainers configuring Vercel.

> [!WARNING]
> Variables that start with `NEXT_PUBLIC_` are compiled into the JavaScript sent to browsers, so anyone can read them. Never use this prefix for a secret.
>
> Next.js inlines `NEXT_PUBLIC_` values at **build time**. After changing one in Vercel, redeploy for the change to take effect.

## Summary

| Variable | Scope | Required | Used in |
|---|---|---|---|
| [`NEXT_PUBLIC_SANITY_PROJECT_ID`](#next_public_sanity_project_id) | Public | **Always** | `sanity/env.ts`, `sanity.cli.ts` |
| [`NEXT_PUBLIC_SANITY_DATASET`](#next_public_sanity_dataset) | Public | **Always** | `sanity/env.ts`, `sanity.cli.ts` |
| [`NEXT_PUBLIC_SANITY_API_VERSION`](#next_public_sanity_api_version) | Public | No | `sanity/env.ts` |
| [`SANITY_API_READ_TOKEN`](#sanity_api_read_token) | Server | For draft mode | `sanity/lib/fetch.ts`, `app/api/draft-mode/enable/route.ts` |
| [`SANITY_REVALIDATE_SECRET`](#sanity_revalidate_secret) | Server | In Production | `app/api/revalidate/route.ts` |
| [`RESEND_API_KEY`](#resend_api_key) | Server | For the newsletter | `app/api/newsletter/subscribe/route.ts` |
| [`RESEND_AUDIENCE_ID`](#resend_audience_id) | Server | For the newsletter | `app/api/newsletter/subscribe/route.ts` |
| [`KV_REST_API_URL`](#kv_rest_api_url-and-kv_rest_api_token) | Server | In Production, for the newsletter | `app/api/newsletter/subscribe/route.ts` |
| [`KV_REST_API_TOKEN`](#kv_rest_api_url-and-kv_rest_api_token) | Server | In Production, for the newsletter | `app/api/newsletter/subscribe/route.ts` |
| [`NEXT_PUBLIC_POSTHOG_KEY`](#next_public_posthog_key) | Public | No | `components/analytics/PostHogProvider.tsx` |
| [`VERCEL_ENV`, `VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL`](#variables-set-by-vercel) | Server | Set by Vercel | Root layout, newsletter API |
| `NODE_ENV` | — | Set by Next.js | `sanity/lib/fetch.ts`, `sanity.config.ts`, newsletter API |

## Sanity

### `NEXT_PUBLIC_SANITY_PROJECT_ID`

The ID of the Sanity project. If it is missing, every page that loads Sanity configuration throws `Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID`.

**Where to get it:** [sanity.io/manage](https://www.sanity.io/manage) → the project → the ID is shown at the top.

### `NEXT_PUBLIC_SANITY_DATASET`

The name of the dataset the website reads and the Studio edits, for example `production`. If it is missing, pages throw `Missing environment variable: NEXT_PUBLIC_SANITY_DATASET`.

**Where to get it:** [sanity.io/manage](https://www.sanity.io/manage) → the project → **Datasets**.

> [!NOTE]
> **To confirm:** whether Preview deployments use the same dataset as Production. With a shared dataset, Studio edits made on a preview change the live content.

### `NEXT_PUBLIC_SANITY_API_VERSION`

The [Sanity API version](https://www.sanity.io/docs/api-versioning), as a date. Optional; defaults to `2026-01-24`. Change it deliberately, together with testing, because API versions can change query behaviour.

### `SANITY_API_READ_TOKEN`

An API token with read access (the **Viewer** role). It serves two purposes:

- `/api/draft-mode/enable` compares the `token` query parameter with it;
- in draft mode, `sanityFetch` uses it to read drafts.

Without it, draft mode cannot be enabled, and a warning is logged if draft mode is somehow active. The rest of the website works normally.

**Where to get it:** sanity.io/manage → the project → **API** → **Tokens** → **Add API token** with the Viewer role. Treat it as a secret.

### `SANITY_REVALIDATE_SECRET`

A shared secret, chosen by you, that the Sanity webhook sends to `/api/revalidate`. Without a matching secret, the route answers `401` and content updates only through the hourly revalidation.

**How to create it:** generate a long random string, for example with `openssl rand -base64 32`. Store it in Vercel and in the webhook configuration in Sanity. See [Configure the Sanity webhook](../guides/deployment-and-environments.md#configure-the-sanity-webhook).

## Newsletter

### `RESEND_API_KEY`

An API key for [Resend](https://resend.com/) with permission to manage contacts. If it is missing, the newsletter API answers `503 "Newsletter service is temporarily unavailable."`.

**Where to get it:** Resend dashboard → **API Keys**.

### `RESEND_AUDIENCE_ID`

The ID of the Resend audience that collects newsletter subscribers. Missing → same `503` as above.

**Where to get it:** Resend dashboard → **Audiences** → the audience → ID.

### `KV_REST_API_URL` and `KV_REST_API_TOKEN`

The REST endpoint and token of the Upstash Redis database used for rate limiting.

- **Production:** required. Without them, the newsletter API answers `503 "Service Unavailable"` and logs a critical error.
- **Local development and Preview:** optional. Rate limiting is skipped.

The names follow the convention used by the Upstash Redis integration in the Vercel Marketplace (formerly Vercel KV).

> [!NOTE]
> **To confirm:** whether the values come from the Vercel integration or were added manually.

**Where to get them:** the Upstash console → the database → **REST API**, or the Vercel project's **Storage** tab if the integration is used.

## Analytics

### `NEXT_PUBLIC_POSTHOG_KEY`

The PostHog project API key for the EU Cloud. This key is public by design. If it is missing, PostHog stays inactive and logs a warning in the browser console. Even when it is set, nothing is tracked until a visitor accepts analytics cookies.

**Where to get it:** PostHog (eu.posthog.com) → **Project settings** → **Project API key**.

## Variables set by Vercel

These variables are provided automatically by [Vercel](https://vercel.com/docs/projects/environment-variables/system-environment-variables). Do not define them yourself.

| Variable | Used for |
|---|---|
| `VERCEL_ENV` | `production`, `preview` or `development`. The newsletter API treats `preview` as non-production, so the origin check and the mandatory rate limiter are skipped |
| `VERCEL_PROJECT_PRODUCTION_URL` | The first choice for `metadataBase` in the root layout, so that absolute URLs in metadata use the production domain |
| `VERCEL_URL` | The fallback for `metadataBase` when the production URL is not available |

When neither is set (locally), `metadataBase` is `https://esnukraine.org`.

## Environment matrix

Recommended configuration per Vercel environment:

| Variable | Development (local) | Preview | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Required | Required | Required |
| `NEXT_PUBLIC_SANITY_DATASET` | Required | Required | Required |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional | Optional | Optional |
| `SANITY_API_READ_TOKEN` | Optional | Optional | Recommended (for draft mode) |
| `SANITY_REVALIDATE_SECRET` | Not needed | Not needed | Required |
| `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` | Optional | Optional | Required |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Optional | Optional | Required |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | Optional | Recommended |

> [!NOTE]
> **To confirm:** which values are currently set for each environment (Vercel → **Settings** → **Environment Variables**).

## Adding a new variable

1. Read it in code: `process.env.MY_VARIABLE`. Use the `NEXT_PUBLIC_` prefix only for values that may be public.
2. Add it to [`.env.example`](../../esn-ukraine-web/.env.example) with a comment.
3. Document it on this page.
4. Set it in Vercel for every environment that needs it, then redeploy.
5. Mention it in the pull request description.

## Related

- [Getting started](../getting-started.md#step-3-configure-environment-variables)
- [Deployment and environments](../guides/deployment-and-environments.md)
- [Services and accounts](../operations/services-and-accounts.md)
