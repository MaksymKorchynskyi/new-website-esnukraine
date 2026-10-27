import type { Metadata } from 'next';

export const SITE_NAME = 'ESN Ukraine';
export const DEFAULT_OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

interface BuildMetadataOptions {
  /** Page title without the site name: the root `title.template` appends " | ESN Ukraine". */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/our-sections". Resolved against `metadataBase`. */
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: 'website' | 'article';
  publishedTime?: string;
  /** Skip the title template (use for the homepage, which carries the full brand title). */
  absoluteTitle?: boolean;
}

/**
 * Builds a complete metadata object. Next.js merges metadata shallowly, so a page that
 * sets `openGraph` or `twitter` replaces the root values entirely; this helper always
 * emits every field (image, siteName, locale) so nothing is lost.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  publishedTime,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const ogImage = { alt: title, ...image };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: 'en_US',
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Trims text to `max` characters on a word boundary, adding an ellipsis (Google cuts snippets at ~155–160). */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:–—-]+$/, '')}…`;
}
