# Common tasks

Step-by-step instructions for the development tasks that come up most often. Each section is self-contained.

**Audience:** developers working on the codebase. Paths are relative to `esn-ukraine-web/`.

- [Add a page](#add-a-page)
- [Edit content that lives in code](#edit-content-that-lives-in-code)
- [Update the navigation, footer and social links](#update-the-navigation-footer-and-social-links)
- [Add or change a redirect](#add-or-change-a-redirect)
- [Allow a new image host](#allow-a-new-image-host)
- [Add a rich text block type](#add-a-rich-text-block-type)
- [Update the Privacy Policy or Cookie Policy](#update-the-privacy-policy-or-cookie-policy)
- [Add an environment variable](#add-an-environment-variable)

## Add a page

This example adds a static page at `/volunteer`.

> [!WARNING]
> Check the `redirects()` list in `next.config.ts` first. If the new path is used as a redirect source there (for example `/partners`), the redirect wins and your page will never be shown.

1. **Create the page file** `app/(website)/volunteer/page.tsx`. Keep it a Server Component, without `'use client'`, so it can export metadata:

   ```tsx
   import type { Metadata } from 'next';
   import Link from 'next/link';
   import { ArrowLeft } from 'lucide-react';

   export const metadata: Metadata = {
     title: 'Volunteer | ESN Ukraine',
     description: 'Join ESN Ukraine as a volunteer and help international students in Ukraine.',
     alternates: { canonical: 'https://esnukraine.org/volunteer' },
   };

   export default function VolunteerPage() {
     return (
       <main className="min-h-svh bg-white">
         <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
           <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
             <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
               <ArrowLeft className="w-4 h-4" />
               <span className="text-sm font-medium">Back to Home</span>
             </Link>
             <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Volunteer</h1>
           </div>
         </section>
         {/* page content */}
       </main>
     );
   }
   ```

   Put interactive parts (state, effects, click handlers) into a separate client component and import it.

2. **Add the page to the sitemap** in `app/sitemap.ts`, in the `staticUrls` list:

   ```ts
   {
     url: 'https://esnukraine.org/volunteer',
     lastModified: new Date(),
     priority: 0.7,
   },
   ```

3. **Link the page** from the menu or footer if needed. See [Update the navigation](#update-the-navigation-footer-and-social-links).

4. **Check** the page locally and on the Vercel Preview deployment, on desktop and mobile. Verify the title in the browser tab.

5. **Document it** in [Routes](../reference/routes.md).

For a page that shows CMS content, also see [Add a content type](add-a-content-type.md).

## Edit content that lives in code

Some content cannot be edited in Sanity Studio. Change it in these files and deploy it through a pull request:

| Content | File | Notes |
|---|---|---|
| Homepage texts ("This is ESN Ukraine", "Our Network", "Stay Connected", hashtag ticker) | `app/(website)/page.tsx` | The intro paragraph lists the section cities; update it when sections change |
| About Us texts and statistics | `app/(website)/about-us/page.tsx` | Statistics are an array of `{ value, label, color }` objects. History photos are listed in `HistorySlider` |
| About Us video | `public/This is ESN Ukraine.mp4` | Referenced by its file name in `about-us/page.tsx` |
| Erasmus+ pages | `app/(website)/erasmus/**/page.tsx` | Most texts are constants at the top of each file. Keep `metadata`, the canonical URL and the JSON-LD object consistent with the content |
| ESNcard page | `app/(website)/for-students/esncard/page.tsx` | The benefit cards are an inline array |
| Contact details | `app/(website)/contact/page.tsx` and `components/layout/Footer.tsx` | Email and address appear in both files. The contact page has its own `socialLinks` array |
| Footer text and copyright | `components/layout/Footer.tsx` | The copyright year is written out ("© 2026") |
| Board group headings | `components/sections/BoardSection.client.tsx` (`GROUPS`) and `sanity/schemaTypes/boardMember.ts` (list titles) | Include the term, for example "2025-26". See [Recurring maintenance tasks](maintenance-tasks.md#annual-board-changeover) |
| Section map | `public/ESN Ukraine section map.webp` | See [Recurring maintenance tasks](maintenance-tasks.md#add-a-new-esn-section) |
| Default social sharing image | `public/og-image.jpg` | 1200 × 630 px |
| Privacy Policy, Cookie Policy | `app/(website)/privacy/page.tsx`, `app/(website)/cookies/page.tsx` | See [below](#update-the-privacy-policy-or-cookie-policy) |

## Update the navigation, footer and social links

All menus are in [`lib/navigation.tsx`](../../esn-ukraine-web/lib/navigation.tsx):

| Constant | Controls |
|---|---|
| `MAIN_NAV` | The header menu. Items are `type: 'link'` (a single link), `type: 'dropdown'` (a list of links) or `type: 'mega'` (columns with headings; currently shown as one list) |
| `FOOTER_QUICK_LINKS` | "Quick Links" in the footer |
| `FOOTER_POLICY_LINKS` | "Policies" in the footer. External URLs open in a new tab automatically |
| `SOCIAL_LINKS` | Social icons in the footer and in the mobile menu. Each entry has an `Icon` (from `lucide-react` or a custom SVG component), `href` and an accessible `label` |

For example, to add the new page to the "About Us" menu:

```ts
{
  heading: 'Who We Are',
  items: [
    { label: 'About Us', href: '/about-us' },
    { label: 'National Board', href: '/national-board' },
    { label: 'Former Boards', href: '/about-us/former-boards' },
    { label: 'Volunteer', href: '/volunteer' }, // new
  ],
},
```

The desktop dropdowns appear from 1280 px wide. Check that long menus still fit, and test the mobile menu as well.

> [!NOTE]
> The contact page (`app/(website)/contact/page.tsx`) has its own list of social links with larger icons. Update it together with `SOCIAL_LINKS`.

## Add or change a redirect

Redirects are in the `redirects()` function in [`next.config.ts`](../../esn-ukraine-web/next.config.ts).

1. Add an entry in the matching group:

   ```ts
   { source: '/old-path', destination: '/new-path', permanent: true },
   ```

   - `permanent: true` returns **308** and tells search engines to update their index. Use `permanent: false` (307) only for temporary moves.
   - Parameters work as in Next.js: `:slug` matches one segment, and `:path*` matches zero or more segments.
   - Put specific rules **before** wildcard rules.

2. After the Preview deployment is ready, test the redirect:

   ```bash
   curl -I https://<preview-url>/old-path
   # Expect: HTTP/2 308 and location: /new-path
   ```

3. If you rename a page, also update `app/sitemap.ts`, internal links and the [Routes](../reference/routes.md) page.

## Allow a new image host

`next/image` only loads remote images from hosts listed in `images.remotePatterns` in `next.config.ts`. Currently allowed: `cdn.sanity.io` and `images.unsplash.com`. To add another host:

```ts
{
  protocol: 'https',
  hostname: 'example.org',
  port: '',
  pathname: '/**',
},
```

Keep the list short. Every allowed host can use the image optimiser of the Vercel project.

## Add a rich text block type

The rich text of news and events is configured twice, once per content type, and rendered twice, once per detail page. A new block type therefore needs **four** changes. This example adds a "callout" block.

1. **Schemas:** in both `sanity/schemaTypes/news.ts` and `sanity/schemaTypes/event.ts`, add an object to the `of` array of the `body` field. Use Ukrainian titles, as in the rest of the Studio:

   ```ts
   {
     type: 'object',
     name: 'callout',
     title: 'Виноска (Callout)',
     fields: [
       defineField({
         name: 'text',
         type: 'text',
         title: 'Текст',
         validation: (rule) => rule.required(),
       }),
     ],
   },
   ```

2. **Renderers:** in both `app/(website)/news/[slug]/page.tsx` and `app/(website)/events/[slug]/page.tsx`, add a renderer to `portableTextComponents.types`:

   ```tsx
   callout: ({ value }: { value: { text?: string } }) => (
     <aside className="my-10 rounded-2xl border border-esn-cyan/20 bg-esn-cyan/5 p-6 text-lg text-esn-dark">
       {value?.text}
     </aside>
   ),
   ```

3. **Queries:** the `body[]{ ... }` projections already return every field of custom blocks. Change the queries only if the block contains references or images that need `->` dereferencing.

4. **Test:** in `npm run dev`, add the block to a draft in the Studio and preview it in draft mode, or publish it on a test document. Then document the block in [Content model](../reference/content-model.md#rich-text-body) and the [editor guide](../content-editing/news-and-events.md).

## Update the Privacy Policy or Cookie Policy

1. Edit the text in `app/(website)/privacy/page.tsx` or `app/(website)/cookies/page.tsx`.
2. Update the `lastUpdated` prop of `PolicyPageLayout`.
3. If you add, remove or rename a section, keep the `TABLE_OF_CONTENTS` array in sync. Each `id` must match the `id` of an `<h2>` in the page.
4. Have the change reviewed by the person responsible for data protection at ESN Ukraine.

> [!NOTE]
> **To confirm:** who at ESN Ukraine is responsible for approving changes to the legal pages.

Update the policies whenever you change analytics, cookies, forms or external services. See [Privacy and analytics](../architecture/privacy-and-analytics.md).

## Add an environment variable

Follow the checklist in [Environment variables → Adding a new variable](../reference/environment-variables.md#adding-a-new-variable).

## Related

- [Add a content type](add-a-content-type.md)
- [Routes](../reference/routes.md)
- [SEO](../architecture/seo.md)
- [Styling](../reference/styling.md)
