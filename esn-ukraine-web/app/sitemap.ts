import { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/fetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const query = `
    *[_type in ["news", "event"] && defined(slug.current)] {
      _type,
      "slug": slug.current,
      _updatedAt
    }
  `;

  type SitemapItem = {
    _type: 'news' | 'event';
    slug: string;
    _updatedAt: string;
  };

  const dynamicItems: SitemapItem[] = await sanityFetch({ query, tags: ['news', 'event'] });

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: 'https://esnukraine.org',
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: 'https://esnukraine.org/about',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://esnukraine.org/contact',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://esnukraine.org/sections',
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  const dynamicUrls: MetadataRoute.Sitemap = dynamicItems.map((item) => ({
    url: `https://esnukraine.org/${item._type === 'news' ? 'news' : 'events'}/${item.slug}`,
    lastModified: new Date(item._updatedAt),
    priority: 0.6,
  }));

  return [...staticUrls, ...dynamicUrls];
}
