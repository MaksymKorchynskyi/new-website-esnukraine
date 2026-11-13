import { buildMetadata, truncate } from "@/lib/seo";
import { JsonLd, newsArticleJsonLd } from "@/lib/jsonld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { hasAsset, urlFor, type ProjectedImage } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { getAllEventsSlugsQuery, getEventBySlugQuery } from "@/sanity/lib/queries";
import type { EventDetail } from "@/sanity/lib/types";
import AttachmentFiles from "@/components/ui/AttachmentFiles";
import PhotoGalleryLightbox from "@/components/ui/PhotoGalleryLightbox";
import PortableTextContent from "@/components/portable-text/PortableTextContent";
import ArticleHeroImages from "@/components/ui/ArticleHeroImages";
import { buildLightboxImages } from "@/components/ui/galleryImages";
import { formatDate } from "@/sanity/lib/utils";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/**
 * Loads an event by slug. The slug is decoded exactly once and checked against
 * the cached list of all slugs before Sanity is queried, so random URLs cost
 * nothing and return a real 404.
 */
async function getEvent(rawSlug: string): Promise<EventDetail> {
  const slug = decodeSlug(rawSlug);
  if (slug.length > 200) notFound();

  const slugs = await sanityFetch<{ slug: string }[]>({ query: getAllEventsSlugsQuery, tags: ["event"] });
  if (!slugs.some((s) => s.slug === slug)) notFound();

  const event = await sanityFetch<EventDetail | null>({
    query: getEventBySlugQuery,
    params: { slug },
    tags: ["event", `event:${slug}`],
  });
  if (!event) notFound();
  return event;
}

function ogImageFor(image: ProjectedImage | null) {
  return hasAsset(image)
    ? { url: urlFor(image).width(1200).height(630).fit("crop").format("jpg").quality(80).url(), width: 1200, height: 630 }
    : undefined;
}

// ==========================================
// STATIC GENERATION
// ==========================================
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: getAllEventsSlugsQuery,
    tags: ["event"],
  });

  return slugs.map((slugObj) => ({ slug: slugObj.slug }));
}

// ==========================================
// SEO METADATA
// ==========================================
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  return buildMetadata({
    title: event.title,
    description: truncate(event.excerpt),
    path: `/events/${encodeURIComponent(event.slug)}`,
    image: ogImageFor(event.mainImage),
    type: "article",
    publishedTime: event.publishedAt,
  });
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);
  const path = `/events/${encodeURIComponent(event.slug)}`;

  return (
    <main className="min-h-svh bg-white">
      <JsonLd
        data={newsArticleJsonLd({
          type: "Article",
          title: event.title,
          description: truncate(event.excerpt),
          path,
          image: ogImageFor(event.mainImage)?.url,
          datePublished: event.publishedAt || event.date,
          dateModified: event._updatedAt,
        })}
      />

      {/* ─── Hero Section ─── */}
      <section className="relative bg-esn-dark pt-40 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d5e] via-esn-dark to-[#141B41]" />

        {/* Decorative blurs */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-esn-cyan/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-esn-magenta/8 rounded-full blur-3xl" />

        <ArticleHeroImages mainImage={event.mainImage} bannerImage={event.bannerImage} title={event.title}>
          {/* Back link */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">All Events</span>
          </Link>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="inline-flex items-center gap-2 text-gray-300 text-sm font-medium">
              <Calendar className="w-4 h-4 text-gray-400" />
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            </span>
            {event.location && (
              <span className="inline-flex items-center gap-2 text-esn-magenta text-sm font-semibold">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">{event.title}</h1>

          {/* Excerpt */}
          {event.excerpt && (
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-5xl">{event.excerpt}</p>
          )}
        </ArticleHeroImages>
      </section>

      {/* ─── Registration CTA ─── */}
      {event.registrationLink && /^https?:\/\//i.test(event.registrationLink) && (
        <section className="py-8 px-6 sm:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="p-6 bg-esn-cyan/5 border border-esn-cyan/20 rounded-2xl">
              <p className="text-esn-dark font-medium mb-4">Registration for this event is open!</p>
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-esn-cyan px-6 py-3 text-sm font-bold uppercase tracking-widest text-white rounded-xl hover:bg-esn-dark transition-colors"
              >
                Register
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ─── Article Content ─── */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          {event.body && (
            <div className="prose prose-lg max-w-none break-words [word-break:break-word] [overflow-wrap:anywhere] overflow-hidden sm:overflow-visible">
              <PortableTextContent value={event.body} />
            </div>
          )}
        </div>
      </section>

      {/* ─── Attachment Files ─── */}
      <AttachmentFiles files={event.attachmentFiles} />

      {/* ─── Photo Gallery ─── */}
      {event.gallery && event.gallery.length > 0 && (
        <PhotoGalleryLightbox images={buildLightboxImages(event.gallery)} />
      )}

      {/* ─── Navigation ─── */}
      <section className="py-12 px-6 sm:px-12 border-t border-gray-100">
        <div className="mx-auto max-w-5xl flex items-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-esn-dark font-bold hover:text-esn-cyan transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            All Events
          </Link>
        </div>
      </section>
    </main>
  );
}
