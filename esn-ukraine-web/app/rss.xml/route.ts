import { sanityFetch } from '@/sanity/lib/fetch';
import { getRssItemsQuery } from '@/sanity/lib/queries';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

interface RssItem {
  title: string;
  slug: string;
  publishedAt: string;
  _updatedAt: string;
  excerpt?: string | null;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** RSS 2.0 feed of the latest news. Refreshed with the `news` cache tag. */
export async function GET() {
  let items: RssItem[] = [];
  try {
    items = await sanityFetch<RssItem[]>({ query: getRssItemsQuery, tags: ['news'] });
  } catch (error) {
    console.error('[RSS] Could not load news:', error);
  }

  const lastBuild = items[0]?._updatedAt ? new Date(items[0]._updatedAt) : new Date();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} News</title>
    <link>${SITE_URL}/news</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Updates, stories and opportunities from Erasmus Student Network Ukraine.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}/news/${encodeURIComponent(item.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/news/${encodeURIComponent(item.slug)}</guid>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      ${item.excerpt ? `<description>${escapeXml(item.excerpt)}</description>` : ''}
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
