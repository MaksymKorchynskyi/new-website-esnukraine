# Getting started

This tutorial takes you from a fresh computer to a running copy of the website and Sanity Studio. It ends with a small practice change so that you see the development loop in action. Plan for 30–60 minutes.

**Audience:** developers who are new to this project. You should know the basics of Git, the command line and React.

## What you will have at the end

- the website running at <http://localhost:3000>, showing real content from Sanity;
- Sanity Studio running at <http://localhost:3000/studio>;
- an understanding of where the main parts of the code live;
- the checks you need to run before opening a pull request.

## Prerequisites

| Requirement | Details |
|---|---|
| **Node.js** | Version **22.12 or newer** is recommended; 20.19+ also works. Next.js 16 needs at least 20.9, and Sanity needs 20.19–21.x or 22.12+. Check with `node --version`. |
| **npm** | Comes with Node.js. The project uses `package-lock.json`, so use npm rather than Yarn or pnpm. |
| **Git** | Any recent version. |
| **GitHub access** | Read access is enough to run the project, because the repository is public. To push branches, ask the maintainer for write access. |
| **Sanity access** | The Sanity **project ID** and **dataset** name. To use the Studio, you also need a Sanity account invited to the project. Ask the maintainer. |

> [!TIP]
> If you have access to the Vercel project, you can download the development environment variables with the [Vercel CLI](https://vercel.com/docs/cli/env). Inside `esn-ukraine-web/`, run `vercel link` once, then `vercel env pull .env.local`.

## Step 1: Clone the repository

```bash
git clone https://github.com/MaksymKorchynskyi/new-website-esnukraine.git
cd new-website-esnukraine
```

The repository root contains documentation only. The application lives in the `esn-ukraine-web/` folder, and you run all npm commands there.

## Step 2: Install dependencies

```bash
cd esn-ukraine-web
npm ci
```

`npm ci` installs the exact versions from `package-lock.json`. Use `npm install` only when you intend to add or update dependencies.

## Step 3: Configure environment variables

Copy the template and open the copy in your editor:

```bash
cp .env.example .env.local
```

Only two variables are required to run the website:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=<project id>
NEXT_PUBLIC_SANITY_DATASET=<dataset name>
```

Leave the other variables empty for now. Without them:

- draft previews do not work (`SANITY_API_READ_TOKEN`);
- the newsletter form returns an error (`RESEND_*`);
- PostHog analytics are disabled (`NEXT_PUBLIC_POSTHOG_KEY`).

See [Environment variables](reference/environment-variables.md) for the full list.

> [!WARNING]
> Never commit `.env.local`. Git ignores it already, so keep it that way.

## Step 4: Start the development server

```bash
npm run dev
```

Open <http://localhost:3000>. You should see the homepage with current news and events from Sanity.

In development mode, Sanity data is **not cached**. When you publish a change in the Studio, refresh the page to see it.

If the page shows the error `Missing environment variable: NEXT_PUBLIC_SANITY_DATASET` or `…PROJECT_ID`, check Step 3 and restart the server.

## Step 5: Open Sanity Studio

Open <http://localhost:3000/studio> and log in with the Sanity account that has access to the project.

The Studio is part of this Next.js application (see [ADR-0002](adr/0002-sanity-cms-with-embedded-studio.md)). Editing content here changes **real content** in the dataset you configured.

> [!NOTE]
> If the Studio shows a CORS error or keeps asking you to log in, a project administrator must allow your origin. In [sanity.io/manage](https://www.sanity.io/manage), open the project → **API** → **CORS origins**, and add `http://localhost:3000` with **Allow credentials** enabled.

## Step 6: Take a tour of the code

Open these files in order. Together they explain most of the application:

| File | What it shows |
|---|---|
| `app/(website)/layout.tsx` | The shell of every public page: fonts, header, footer, cookie banner, analytics and default metadata. |
| `app/(website)/page.tsx` | The homepage. Server-side data fetching from Sanity, passed to client components. |
| `sanity/lib/fetch.ts` | `sanityFetch`, the single entry point for CMS data, including caching and draft mode. |
| `sanity/lib/queries.ts` | Shared GROQ queries. |
| `sanity/schemaTypes/news.ts` | A complete content type: fields, validation and the rich-text editor configuration. |
| `lib/navigation.tsx` | The header menu, footer links and social links. |
| `next.config.ts` | Image settings, redirects from the old website and the analytics proxy. |

The [architecture overview](architecture/overview.md) describes how these parts fit together.

## Step 7: Practise the development loop

Make a small, temporary change to see hot reloading:

1. Open `lib/navigation.tsx` and change the label `'Our Sections'` in `FOOTER_QUICK_LINKS` to `'Our Sections (test)'`.
2. Save the file. The footer at <http://localhost:3000> updates without a full reload.
3. Undo the change, for example with `git checkout -- lib/navigation.tsx`.

For a real contribution, create a branch and follow [CONTRIBUTING.md](../CONTRIBUTING.md).

## Step 8: Run the checks

Run the same checks as before a pull request:

```bash
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript
npm run build      # production build
```

`npm run build` renders every page and fetches all news and events from Sanity, so it needs network access and the Sanity variables. To try the production build locally, run `npm run start` afterwards. In this mode the newsletter API behaves as in production: it accepts requests only from `esnukraine.org` and requires the rate-limit variables.

> [!NOTE]
> ESLint currently reports some existing errors. Compare the output before and after your change, and make sure you do not add new ones.

## Next steps

- Read [Rendering and data flow](architecture/rendering-and-data-flow.md) to understand caching and revalidation.
- Look up pages in [Routes](reference/routes.md) and content types in [Content model](reference/content-model.md).
- Pick a task from [Common tasks](guides/common-tasks.md).
- If something does not work, see [Troubleshooting](guides/troubleshooting.md).
