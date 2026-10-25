# Styling

How the website is styled: the Tailwind CSS setup, ESN design tokens, typography, animations, responsive behaviour, and UI patterns that repeat across pages.

**Audience:** developers who build or change UI.

The website uses [Tailwind CSS 3](https://v3.tailwindcss.com/docs) utility classes directly in the components. There are no CSS modules and no component library. Global CSS is limited to [`app/globals.css`](../../esn-ukraine-web/app/globals.css). The configuration is in [`tailwind.config.ts`](../../esn-ukraine-web/tailwind.config.ts).

## Colours

### ESN tokens

Defined in `theme.extend.colors` and available as `text-*`, `bg-*`, `border-*` and similar classes:

| Token | Hex | Typical use |
|---|---|---|
| `esn-cyan` | `#00AEEF` | Links, accents, hover states, active menu items |
| `esn-magenta` | `#EC008C` | Secondary accents, hover state of call-to-action buttons |
| `esn-green` | `#7AC143` | Accents, success states |
| `esn-dark` | `#2E3192` | Headings, primary buttons, dark page headers |
| `esn-navy` | `#17194A` | Footer background (the footer uses the literal value `bg-[#17194A]`) |

These are the brand colours of the Erasmus Student Network. Prefer the tokens to new hex values.

### Other colours in use

| Value | Where |
|---|---|
| `#141B41` | End colour of dark header gradients; background of the homepage "Moments We Shared" section |
| `#1a1d5e` | Start colour of the header gradient on news and event pages |
| `#F47B20` | ESN orange: one statistic on the About Us page. It is also offered as a text colour in the Studio |
| `yellow-400`, `orange-500` | Fourth and fifth colour of the ESN colour stripe |
| `#F4F8FA`, `#F8F9FA`, `#F3F4F6` and light tints | Light section backgrounds and borders on the About Us and Erasmus+ pages |
| Tailwind `gray-*` | Body text (`gray-600` to `gray-800`), secondary text (`gray-400` to `gray-500`), borders |

The CSS variables `--background` (`#ffffff`) and `--foreground` (`#111827`) in `globals.css` set the page defaults.

## Typography

- **Font:** [Manrope](https://fonts.google.com/specimen/Manrope), loaded with `next/font/google` in the root layout (Latin and Cyrillic subsets, `display: swap`). It is exposed as the CSS variable `--font-manrope` and mapped to Tailwind's `font-sans`, so every page uses it by default.
- **Headings:** very bold (`font-black`) with tight letter spacing (`tracking-tight`), in `text-esn-dark` on light backgrounds or `text-white` on dark headers. Page titles scale from `text-4xl`/`text-5xl` on phones to `text-7xl` on large screens.
- **Labels and buttons:** small, bold, uppercase text with wide letter spacing (`uppercase tracking-widest`).
- **Rich text:** news and event bodies sit in a `prose prose-lg` container from `@tailwindcss/typography`. Most elements, however, use the custom renderers in the detail pages, which set their own sizes and colours.

## Animations

Custom animations from `tailwind.config.ts`:

| Class | Effect |
|---|---|
| `animate-fade-in` | Fade in over 0.8 s |
| `animate-slide-up` | Fade in and move up 20 px over 0.8 s |
| `animate-marquee` | Endless horizontal scroll (40 s), used by the hashtag ticker on the homepage |
| `animate-menu-slide-down` | Short slide-down for header dropdowns |

Other animation techniques in use:

- **Framer Motion** animates the cookie banner, the cookie settings dialog, the newsletter form states, the "Our Network" collage, the gallery lightbox and the former boards accordion.
- The **About Us** page defines `.reveal` classes in a `<style jsx global>` block. Sections fade in while scrolling, on screens 768 px and wider.
- Tailwind's built-in `animate-spin` and `animate-pulse` are used for loading states.

> [!NOTE]
> Some class names in the code have no definition in this setup and therefore no effect:
>
> - `animate-fade-in-up`, `animate-scale-up`;
> - `animate-in`, `fade-in` and `zoom-in-95` (they belong to the `tailwindcss-animate` plugin, which is not installed);
> - the `xs:` prefix (there is no `xs` breakpoint).
>
> To use any of them, define it in `tailwind.config.ts` first.

## Utilities

`globals.css` adds one utility class:

- `.scrollbar-hide` hides scrollbars while keeping elements scrollable. It is used in the horizontal "Moments We Shared" row.

## Responsive design

- **Breakpoints:** Tailwind defaults: `sm` 640 px, `md` 768 px, `lg` 1024 px, `xl` 1280 px, `2xl` 1536 px. Styles are mobile-first.
- **Header:** dropdown navigation from `xl` (1280 px). Below that, the header shows a menu button.
- **Fixed header:** the header is `position: fixed`, 72 px high on phones and 80 px from `sm`, plus a 4 px colour stripe. Page headers start with enough top padding (for example `pt-28` or `pt-40`) to clear it.
- **Viewport units:** `svh` and `dvh` are used instead of `vh` to handle mobile browser toolbars.
- **iOS:** the homepage hero sets its height in pixels on screens narrower than 1024 px, to prevent jumps when the Safari toolbar shows or hides. Past iOS-specific fixes covered hover states, `svh` and scroll jitter.

## Recurring UI patterns

These patterns are repeated as class lists in several files rather than extracted into shared components. Copy an existing example when you need one:

| Pattern | Description | Example |
|---|---|---|
| **ESN colour stripe** | Five equal blocks: cyan, magenta, green, `yellow-400` and `orange-500`. Height 4 px in the header, 3 px in dialogs and dropdowns | `components/layout/Header.tsx` |
| **Dark page header** | `bg-esn-dark` with a diagonal gradient to `#141B41`, two large blurred circles in cyan and magenta, a "Back to Home" link and a large white `h1` | `app/(website)/news/page.tsx` |
| **Light page header** | White background, grey "Back to Home" link, large `text-esn-dark` title and a lead paragraph | `app/(website)/our-sections/page.tsx` |
| **Content width** | `mx-auto max-w-7xl` with horizontal padding `px-6 sm:px-12 lg:px-24`; articles use `max-w-5xl` | Most pages |
| **Pill buttons** | `rounded-full`, uppercase, `font-bold tracking-widest`, `bg-esn-dark text-white`, hover `bg-esn-cyan` or `bg-esn-magenta` | `components/ui/UnderDevelopment.tsx` |
| **Cards** | `rounded-2xl` or `rounded-3xl`, a light border, `shadow-sm` that grows on hover, an image on top | `components/ui/Card.tsx` |
| **Focus styles** | `focus:ring-2 focus:ring-esn-cyan` on clickable cards and `focus-visible:ring-*` on toggles | `components/sections/BoardSection.client.tsx` |

## Icons and images

- Icons come from [`lucide-react`](https://lucide.dev/icons/). The X (Twitter) logo is a custom SVG (`XSocialIcon` in `lib/navigation.tsx`). The contact page contains its own inline SVG icons for social networks.
- Use `next/image` for images (see [Rendering and data flow](../architecture/rendering-and-data-flow.md#images)) and give every meaningful image an `alt` text.

## Related

- [Components](components.md)
- [Configuration](configuration.md#tailwind-css-and-postcss)
