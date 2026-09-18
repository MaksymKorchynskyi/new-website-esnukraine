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
      url: 'https://esnukraine.org/about-us',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://esnukraine.org/contact',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://esnukraine.org/our-sections',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://esnukraine.org/privacy',
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: 'https://esnukraine.org/cookies',
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: 'https://esnukraine.org/erasmus',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://esnukraine.org/erasmus/academic-mobility',
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: 'https://esnukraine.org/erasmus/erasmus-mundus',
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: 'https://esnukraine.org/erasmus/trainings-and-exchanges',
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: 'https://esnukraine.org/erasmus/european-solidarity-corps',
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: 'https://esnukraine.org/erasmus/national-erasmus-office',
      lastModified: new Date(),
      priority: 0.7,
    },
  ];

  const dynamicUrls: MetadataRoute.Sitemap = dynamicItems.map((item) => ({
    url: `https://esnukraine.org/${item._type === 'news' ? 'news' : 'events'}/${item.slug}`,
    lastModified: new Date(item._updatedAt),
    priority: 0.6,
  }));

  return [...staticUrls, ...dynamicUrls];
}
