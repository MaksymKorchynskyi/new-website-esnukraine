import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/fetch';
import { getSitemapEntriesQuery } from '@/sanity/lib/queries';
import { SITE_URL } from '@/lib/seo';

type SitemapItem = {
  _type: 'news' | 'event';
  slug: string;
  _updatedAt: string;
};

/**
 * Static pages carry no `lastModified`: a date that changes on every regeneration
 * teaches Google to ignore it. `priority` is not emitted either (ignored by Google).
 */
const STATIC_PATHS = [
  '/',
  '/about-us',
  '/national-board',
  '/about-us/former-boards',
  '/contact',
  '/our-sections',
  '/news',
  '/upcoming-events',
  '/events',
  '/erasmus',
  '/erasmus/academic-mobility',
  '/erasmus/erasmus-mundus',
  '/erasmus/trainings-and-exchanges',
  '/erasmus/european-solidarity-corps',
  '/erasmus/national-erasmus-office',
  '/for-students/esncard',
  '/privacy',
  '/cookies',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  let dynamicItems: SitemapItem[] = [];
  try {
    dynamicItems = await sanityFetch<SitemapItem[]>({ query: getSitemapEntriesQuery, tags: ['news', 'event'] });
  } catch (error) {
    // Sanity unavailable: still publish the static part of the sitemap
    console.error('[Sitemap] Could not load Sanity documents:', error);
  }

  const dynamicUrls: MetadataRoute.Sitemap = dynamicItems.map((item) => ({
    // encodeURI keeps "/" and "-" but escapes anything outside the URL-safe set
    url: `${SITE_URL}/${item._type === 'news' ? 'news' : 'events'}/${encodeURIComponent(item.slug)}`,
    lastModified: new Date(item._updatedAt),
  }));

  return [...staticUrls, ...dynamicUrls];
}
