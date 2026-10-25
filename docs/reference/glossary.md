# Glossary

Terms used in this project, from the Erasmus Student Network and from the technology stack.

**Audience:** everyone, especially developers new to ESN and volunteers new to web development.

## ESN and Erasmus+ terms

| Term | Meaning |
|---|---|
| **ESN** | Erasmus Student Network, a European non-profit student organisation that supports international students under the principle *Students Helping Students*. |
| **ESN Ukraine** | The national organisation of ESN in Ukraine. It represents the Ukrainian ESN sections and owns this website. |
| **Section** | A local ESN branch, usually linked to a university or city, for example ESN Kyiv. Sections are shown on `/our-sections`. |
| **National Board** | The elected leadership of ESN Ukraine for one term, for example "The Board 2025-26". Shown on `/national-board`. |
| **Board Support** | Volunteers who support the National Board in specific roles. A group on `/national-board`. |
| **Audit Board & Advisory Council** | Bodies that audit and advise the National Board. A group on `/national-board`. |
| **Former boards** | National Boards of previous terms. Shown on `/about-us/former-boards`. |
| **NR** | National Representative, the representative of ESN Ukraine in the international network. The general contact address `ukraine-nr@esn.org` belongs to this role. |
| **ESNcard** | ESN's membership card, which gives discounts and benefits across Europe. Described on `/for-students/esncard`. |
| **Buddy System** | A programme that pairs incoming international students with local students. The page is a placeholder at the moment. |
| **Erasmus+** | The EU programme for education, training, youth and sport. The website explains its opportunities under `/erasmus`. |
| **Erasmus Mundus** | Joint master's programmes with full EU scholarships. |
| **ESC** | European Solidarity Corps, the EU programme for volunteering and solidarity projects. |
| **National Erasmus+ Office (NEO)** | The office that represents the Erasmus+ programme in Ukraine. |

## Website and CMS terms

| Term | Meaning |
|---|---|
| **Spotlight** | A switch on news items and events that puts them into the homepage hero slider. |
| **Our Network photos** | Photos for the homepage collage, assigned to slot A (top left), B (bottom left) or C (right). |
| **Slug** | The URL-friendly identifier of a news item or event, for example `spring-national-assembly-esn-ukraine` in `/events/spring-national-assembly-esn-ukraine`. |
| **Sanity Studio** | The content editing application, embedded in the website at `/studio`. |
| **Content Lake** | Sanity's hosted database, which stores documents and assets. |
| **Dataset** | A separate collection of content inside a Sanity project, for example `production`. |
| **Document** | One content item in Sanity, such as a news article or a board member. |
| **Draft** | An unpublished version of a document. Visitors see only published versions; drafts are visible in draft mode. |
| **Portable Text** | Sanity's JSON format for rich text, rendered with `@portabletext/react`. |
| **GROQ** | Sanity's query language. The queries are in `sanity/lib/queries.ts` and in some pages. |
| **Perspective** | Which version of the content a query sees: `published` (the default on the website) or drafts (in draft mode). |
| **Stega** | Invisible markers that Sanity adds to strings in draft mode, so that visual editing can link text back to the Studio. |
| **Hotspot** | The focal point an editor sets on an image. Images that `urlFor()` crops respect it. |
| **LQIP** | Low-quality image placeholder: a tiny blurred preview that Sanity generates for each image. |

## Next.js and hosting terms

| Term | Meaning |
|---|---|
| **App Router** | The Next.js routing system based on the `app/` folder, which this project uses. |
| **Route group** | A folder in parentheses, such as `(website)`, that groups routes without adding a URL segment. |
| **Server Component** | A React component that renders only on the server. This is the default. |
| **Client Component** | A component marked with `'use client'` that also runs in the browser. Needed for interactivity. |
| **ISR** | Incremental static regeneration: pages are generated once, cached, and regenerated in the background after they expire or are revalidated. |
| **Cache tag** | A label attached to cached data, such as `news`, so that it can be invalidated with `revalidateTag()`. |
| **Revalidation** | Marking cached data as outdated so that it is regenerated. It happens after one hour or when the Sanity webhook calls `/api/revalidate`. |
| **Draft mode** | A Next.js mode, enabled by a cookie, in which pages are rendered on every request and show drafts. |
| **Edge runtime** | A lightweight server runtime, used by the newsletter API. |
| **Preview deployment** | A Vercel deployment of a branch or pull request with its own URL. |
| **Production deployment** | The deployment of `main` that serves `esnukraine.org`. |
| **Instant Rollback** | A Vercel feature that makes a previous production deployment live again. |
