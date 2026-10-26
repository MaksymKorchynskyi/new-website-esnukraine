# Services and accounts

An inventory of every external service the website depends on: what it is used for, how it is connected, what happens if it fails, and who owns the account. Use it to plan access, budgets and handovers.

**Audience:** the webmaster or IT lead, and anyone taking over maintenance.

> [!IMPORTANT]
> This repository is public. Record owners as **roles** (for example "Webmaster" or "Communication Manager"), never as personal names, emails or phone numbers. Keep credentials in a password manager, never in this file.

## At a glance

| Service | Used for | If it is unavailable |
|---|---|---|
| [Vercel](#vercel) | Hosting, builds, CDN, image optimisation, API routes, Web Analytics, logs | **The website is down** |
| [Sanity](#sanity) | Content, images and files, Studio login, publish webhook | Cached pages are still served, but editing, regeneration and new builds fail, and images may not load |
| [Domain and DNS](#domain-dns-and-email) | `esnukraine.org` | **The website is unreachable** |
| [GitHub](#github) | Source code, pull requests, triggers deployments | The live website keeps running, but no new deployments are possible |
| [Resend](#resend) | Newsletter audience | Newsletter subscriptions fail |
| [Upstash Redis](#upstash-redis) | Rate limiting for the newsletter | Newsletter subscriptions fail in production |
| [PostHog](#posthog) | Product analytics (EU Cloud) | No analytics; the website is not affected |
| [Google Search Console](#google-search-console) | Search indexing reports, sitemap submission | No search reports; the website and its ranking are not affected |
| [Email](#domain-dns-and-email) | `web-master@esnukraine.org` (technical contact), `ukraine-nr@esn.org` (general contact) | Visitors cannot reach the team |

## Vercel

| | |
|---|---|
| **Used for** | Builds and hosting of `esn-ukraine-web/`; Preview deployments for every branch; the edge network; `next/image` optimisation; the Edge function for the newsletter; Web Analytics; runtime logs |
| **Connected through** | The Git integration with the GitHub repository; environment variables in the project settings (see [Environment variables](../reference/environment-variables.md)) |
| **Dashboard** | [vercel.com](https://vercel.com/) → the team → the project |
| **Plan** | To confirm |
| **Owner and admins** | To confirm |

## Sanity

| | |
|---|---|
| **Used for** | The Content Lake (all documents), the asset CDN (`cdn.sanity.io`), Studio user accounts and roles, API tokens, the publish webhook, CORS settings |
| **Connected through** | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET` |
| **Dashboard** | [sanity.io/manage](https://www.sanity.io/manage) |
| **Plan** | To confirm. The upload limits in the Studio mention the free plan |
| **Owner and admins** | To confirm |
| **Editors** | To confirm: who has Editor access to the Studio |

## GitHub

| | |
|---|---|
| **Used for** | The source code and documentation, issues, pull requests; deployments through the Vercel integration |
| **Repository** | <https://github.com/MaksymKorchynskyi/new-website-esnukraine> (public) |
| **Owner and admins** | The repository is under a personal account. To confirm: the long-term owner |

> [!TIP]
> For continuity, consider moving the repository to a GitHub organisation owned by ESN Ukraine. GitHub redirects the old URL after a transfer. Reconnect the Vercel Git integration afterwards.

## Resend

| | |
|---|---|
| **Used for** | Storing newsletter subscribers in an audience. Sending newsletters is not part of this codebase |
| **Connected through** | `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` |
| **Dashboard** | [resend.com](https://resend.com/) |
| **Plan, owner and admins** | To confirm |

## Upstash Redis

| | |
|---|---|
| **Used for** | Rate limiting of the newsletter API (5 requests per minute per IP address) |
| **Connected through** | `KV_REST_API_URL`, `KV_REST_API_TOKEN` |
| **Dashboard** | [console.upstash.com](https://console.upstash.com/), or the Storage tab of the Vercel project if the Marketplace integration is used |
| **Plan, owner and admins** | To confirm |

## PostHog

| | |
|---|---|
| **Used for** | Product analytics after consent, EU Cloud, proxied through `/ingest/posthog` |
| **Connected through** | `NEXT_PUBLIC_POSTHOG_KEY`; the rewrite in `next.config.ts` |
| **Dashboard** | [eu.posthog.com](https://eu.posthog.com/) |
| **Plan, owner and admins** | To confirm |

## Google Search Console

| | |
|---|---|
| **Used for** | Indexing and crawl reports, search performance, submitting the sitemap |
| **Connected through** | The `<meta name="google-site-verification">` tag set by `verification.google` in `app/(website)/layout.tsx` (URL-prefix property `https://esnukraine.org/`). See [SEO](../architecture/seo.md#google-search-console) |
| **Dashboard** | [search.google.com/search-console](https://search.google.com/search-console) |
| **Plan** | Free |
| **Owner and users** | To confirm. Add users under **Settings → Users and permissions** |

## Domain, DNS and email

| | |
|---|---|
| **Domain** | `esnukraine.org`. To confirm: registrar, renewal date, who pays |
| **DNS** | To confirm: the DNS provider, and the records that point to Vercel |
| **Email** | `web-master@esnukraine.org` is published as the technical contact (footer, `SECURITY.md`). To confirm: the email provider and who receives this mailbox. `ukraine-nr@esn.org` is the general contact on the `esn.org` domain |

## Other external links

These are linked from the website but not technically integrated:

- the **Code of Conduct**, a Google Docs document linked in the footer (`FOOTER_POLICY_LINKS` in `lib/navigation.tsx`). To confirm: who owns the document;
- **social media profiles** (Instagram, LinkedIn, X, YouTube, Linktree), linked in `lib/navigation.tsx` and on the contact page;
- **esncard.org**, linked from the ESNcard page;
- **Google Maps**, the address link in the footer and on the contact page.

## Good practice for accounts

- Register accounts with an **organisational email address**, such as the webmaster mailbox, rather than a personal one.
- Keep **at least two administrators** from the current team on every service.
- Store credentials and recovery codes in a **shared password manager** owned by ESN Ukraine.
- Enable **two-factor authentication** wherever possible.
- Update this page when anything changes, and check it during every [handover](handover-checklist.md).

## Related

- [Handover checklist](handover-checklist.md)
- [Deployment and environments](../guides/deployment-and-environments.md)
- [Recurring maintenance tasks](../guides/maintenance-tasks.md#review-access)
