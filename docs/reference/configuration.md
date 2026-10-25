# Configuration

This page is the reference for the project's npm scripts, dependencies and configuration files. Environment variables have their own page: [Environment variables](environment-variables.md).

**Audience:** developers who change the build, tooling or framework settings.

All paths are relative to `esn-ukraine-web/`.

## npm scripts

Defined in [`package.json`](../../esn-ukraine-web/package.json):

| Command | Runs | Purpose |
|---|---|---|
| `npm run dev` | `next dev` | Development server at <http://localhost:3000> with hot reloading |
| `npm run build` | `next build` | Production build. Pre-renders pages and fetches Sanity content |
| `npm run start` | `next start` | Serves the production build locally |
| `npm run lint` | `eslint` | Lints the project with the flat config in `eslint.config.mjs` |

There is no script for type checking. Run `npx tsc --noEmit`. `next build` does not run ESLint.

The Sanity CLI is installed with the `sanity` package and can be run with `npx sanity …`. It reads the project ID and dataset from `sanity.cli.ts`.

## Dependencies

### Runtime dependencies

| Package | Purpose | Used in |
|---|---|---|
| `next` | Framework | Everywhere |
| `react`, `react-dom` | UI library | Everywhere |
| `sanity` | Sanity Studio | `sanity.config.ts`, schemas |
| `next-sanity` | Sanity client, `groq`, `NextStudio`, `VisualEditing`, `defineLive` | `sanity/lib/`, `app/studio/`, root layout |
| `@sanity/image-url` | Builds resized image URLs (`urlFor`) | `sanity/lib/image.ts` |
| `@sanity/vision` | GROQ playground in the Studio (development only) | `sanity.config.ts` |
| `styled-components` | Required peer dependency of Sanity Studio and `next-sanity`; not imported directly | — |
| `@portabletext/react` | Renders rich text | News and event detail pages |
| `@tailwindcss/typography` | `prose` classes for rich text | `tailwind.config.ts` |
| `framer-motion` | Animations | Cookie banner and settings, newsletter form, homepage collage, gallery lightbox, former boards |
| `lucide-react` | Icons | Components and pages |
| `posthog-js` | Product analytics | `components/analytics/` |
| `@vercel/analytics` | Vercel Web Analytics | Root layout |
| `@vercel/functions` | `ipAddress()` helper | Newsletter API |
| `resend` | Resend API client | Newsletter API |
| `@upstash/redis`, `@upstash/ratelimit` | Rate limiting | Newsletter API |
| `zod` | Request validation | Newsletter API |
| `clsx`, `tailwind-merge`, `cmdk`, `use-debounce` | — | Not imported anywhere at the moment |

### Development dependencies

| Package | Purpose |
|---|---|
| `typescript`, `@types/node`, `@types/react`, `@types/react-dom` | TypeScript compiler and type definitions |
| `eslint`, `eslint-config-next` | Linting. Keep `eslint-config-next` on the same version as `next` |
| `tailwindcss`, `postcss`, `autoprefixer` | CSS build pipeline |
| `geojson-rewind` | Not imported anywhere. It was used by the earlier interactive map |

Keep these package groups on matching versions when you upgrade:

- `next` with `eslint-config-next`;
- `sanity` with `@sanity/vision`;
- `next-sanity` with the `sanity` version range it supports.

## `next.config.ts`

| Setting | Value | Purpose |
|---|---|---|
| `images.formats` | `image/avif`, `image/webp` | Modern formats served by `next/image` |
| `images.deviceSizes`, `images.imageSizes` | Fixed lists of widths | Widths generated for responsive images |
| `images.remotePatterns` | `https://cdn.sanity.io/**`, `https://images.unsplash.com/**` | Hosts allowed in `next/image` |
| `experimental.optimizePackageImports` | `@sanity/icons`, `@sanity/ui`, `@sanity/util`, `sanity`, `lucide-react`, `framer-motion` | Imports only the modules in use, to keep bundles small |
| `rewrites().beforeFiles` | `/ingest/posthog/:path*` → `https://eu.i.posthog.com/:path*` | First-party proxy for PostHog |
| `redirects()` | 43 permanent redirects | Old Drupal URLs. See [SEO](../architecture/seo.md#redirects-from-the-previous-website) |

No custom `headers()` and no middleware (`middleware.ts` or `proxy.ts`) are configured.

## `tsconfig.json`

| Option | Value | Note |
|---|---|---|
| `strict` | `true` | Full strict type checking |
| `target` | `ES2017` | |
| `module` / `moduleResolution` | `esnext` / `bundler` | |
| `jsx` | `react-jsx` | |
| `paths` | `"@/*": ["./*"]` | `@/` points to the `esn-ukraine-web/` folder |
| `incremental` | `true` | Writes `tsconfig.tsbuildinfo` (ignored by Git) |
| `plugins` | `next` | Next.js TypeScript plugin |

## `eslint.config.mjs`

An ESLint flat config that combines `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Build output (`.next/`, `out/`, `build/`) and `next-env.d.ts` are ignored.

## Tailwind CSS and PostCSS

- [`tailwind.config.ts`](../../esn-ukraine-web/tailwind.config.ts) scans `app/`, `components/` and `sanity/` for class names. It extends the theme with the ESN colours, the Manrope font family and custom animations, and enables `@tailwindcss/typography`. See [Styling](styling.md).
- `postcss.config.mjs` runs `tailwindcss` and `autoprefixer`.
- [`app/globals.css`](../../esn-ukraine-web/app/globals.css) contains the Tailwind directives, two CSS variables (`--background`, `--foreground`) and the `.scrollbar-hide` utility.

## Sanity configuration

| File | Purpose |
|---|---|
| [`sanity.config.ts`](../../esn-ukraine-web/sanity.config.ts) | Studio configuration: `basePath: '/studio'`, the schema, the structure tool with the custom sidebar, and the Vision tool in development only |
| [`sanity.cli.ts`](../../esn-ukraine-web/sanity.cli.ts) | Project ID and dataset for the Sanity CLI, read from the `NEXT_PUBLIC_SANITY_*` variables |
| [`sanity/env.ts`](../../esn-ukraine-web/sanity/env.ts) | Exports `projectId`, `dataset` (both required; it throws `Missing environment variable: …` if they are missing) and `apiVersion` (default `2026-01-24`) |
| [`sanity/structure.ts`](../../esn-ukraine-web/sanity/structure.ts) | The Studio sidebar (see [Content model](content-model.md#studio-structure)) |
| [`sanity/schemaTypes/index.ts`](../../esn-ukraine-web/sanity/schemaTypes/index.ts) | Registers all document types |
| [`sanity/lib/client.ts`](../../esn-ukraine-web/sanity/lib/client.ts) | The Sanity client: `useCdn: false`, stega configured with `studioUrl: '/studio'` |

## Icons and web app manifest

| File | Purpose |
|---|---|
| `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` | Browser and home-screen icons through the Next.js file conventions |
| `public/og-image.jpg` | Default social sharing image (1200 × 630) |
| `public/manifest.webmanifest` | A web app manifest. It is not linked from the metadata |

## Git ignore rules

`esn-ukraine-web/.gitignore` excludes:

- dependencies (`node_modules/`);
- build output (`.next/`, `out/`, `build/`);
- environment files (`.env*`, except `.env.example`);
- the local Vercel link (`.vercel`);
- TypeScript build info (`*.tsbuildinfo`) and `next-env.d.ts`.

The root `.gitignore` excludes `.DS_Store`.

## Related

- [Environment variables](environment-variables.md)
- [Deployment and environments](../guides/deployment-and-environments.md)
- [Architecture overview](../architecture/overview.md#technology-stack)
