import { SITE_NAME, SITE_URL } from '@/lib/seo';

/**
 * Renders a JSON-LD <script>. `<` is escaped so content can never close the
 * script tag (XSS-safe even when values come from the CMS).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const SOCIAL_PROFILES = [
  'https://www.instagram.com/esn.ukraine',
  'https://www.linkedin.com/company/erasmus-student-network-ukraine/',
  'https://x.com/esnukraine',
  'https://www.youtube.com/@esnukraine',
];

/** Organization node, referenced by every other schema via `@id`. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'ESN Ukraine',
    alternateName: 'Erasmus Student Network Ukraine',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-esn-ukraine.png`,
    email: 'ukraine-nr@esn.org',
    sameAs: SOCIAL_PROFILES,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Erasmus Student Network AISBL',
      url: 'https://esn.org',
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
  breadcrumbs,
}: {
  name: string;
  description: string;
  path: string;
  breadcrumbs?: { name: string; path: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
    publisher: { '@id': ORGANIZATION_ID },
    ...(breadcrumbs ? { breadcrumb: breadcrumbListJsonLd(breadcrumbs) } : {}),
  };
}

export function breadcrumbListJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function newsArticleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  type = 'NewsArticle',
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string;
  /** `Article` for past-event reports, `NewsArticle` for news. */
  type?: 'NewsArticle' | 'Article';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    ...(image ? { image: [image] } : {}),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  };
}

export function eventJsonLd({
  name,
  description,
  startDate,
  location,
  url,
  image,
  organizer,
}: {
  name: string;
  description?: string | null;
  startDate: string;
  location?: string | null;
  url?: string | null;
  image?: string | null;
  organizer?: string | null;
}) {
  const isOnline = /online/i.test(location ?? '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    ...(description ? { description } : {}),
    startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    ...(location
      ? isOnline
        ? { location: { '@type': 'VirtualLocation', url: url ?? SITE_URL } }
        : { location: { '@type': 'Place', name: location, address: location } }
      : {}),
    ...(url ? { url } : {}),
    ...(image ? { image: [image] } : {}),
    organizer: organizer
      ? { '@type': 'Organization', name: organizer, parentOrganization: { '@id': ORGANIZATION_ID } }
      : { '@id': ORGANIZATION_ID },
  };
}
