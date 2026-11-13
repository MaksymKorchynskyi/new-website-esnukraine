import { buildMetadata, truncate } from "@/lib/seo";
import { JsonLd, newsArticleJsonLd } from "@/lib/jsonld";
import { hasAsset, urlFor, type ProjectedImage } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getNewsBySlugQuery, getAllNewsSlugsQuery } from "@/sanity/lib/queries";
import type { NewsArticleDetail } from "@/sanity/lib/types";
import AttachmentFiles from "@/components/ui/AttachmentFiles";
import PhotoGalleryLightbox from "@/components/ui/PhotoGalleryLightbox";
import PortableTextContent from "@/components/portable-text/PortableTextContent";
import ArticleHeroImages from "@/components/ui/ArticleHeroImages";
import { buildLightboxImages } from "@/components/ui/galleryImages";
import { formatDate } from "@/sanity/lib/utils";

interface NewsPageProps {
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
 * Loads an article by slug. Unknown slugs are rejected against the cached list
 * of all slugs first (0 Sanity requests for random URLs), then `notFound()`
 * gives a real 404.
 */
async function getArticle(rawSlug: string): Promise<NewsArticleDetail> {
  const slug = decodeSlug(rawSlug);
  if (slug.length > 200) notFound();

  const slugs = await sanityFetch<{ slug: string }[]>({ query: getAllNewsSlugsQuery, tags: ["news"] });
  if (!slugs.some((s) => s.slug === slug)) notFound();

  const article = await sanityFetch<NewsArticleDetail | null>({
    query: getNewsBySlugQuery,
    params: { slug },
    tags: ["news", `news:${slug}`],
  });
  if (!article) notFound();
  return article;
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
    query: getAllNewsSlugsQuery,
    tags: ["news"],
  });

  return slugs.map((slugObj) => ({ slug: slugObj.slug }));
}

// ==========================================
// SEO METADATA
// ==========================================
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  return buildMetadata({
    title: article.title,
    description: truncate(article.excerpt),
    path: `/news/${encodeURIComponent(article.slug)}`,
    image: ogImageFor(article.mainImage),
    type: "article",
    publishedTime: article.publishedAt,
  });
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const path = `/news/${encodeURIComponent(article.slug)}`;

  return (
    <main className="min-h-svh bg-white">
      <JsonLd
        data={newsArticleJsonLd({
          title: article.title,
          description: truncate(article.excerpt),
          path,
          image: ogImageFor(article.mainImage)?.url,
          datePublished: article.publishedAt,
          dateModified: article._updatedAt,
        })}
      />

      {/* ─── Hero Section ─── */}
      <section className="relative bg-esn-dark pt-40 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d5e] via-esn-dark to-[#141B41]" />

        {/* Decorative blurs */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-esn-cyan/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-esn-magenta/8 rounded-full blur-3xl" />

        <ArticleHeroImages mainImage={article.mainImage} bannerImage={article.bannerImage} title={article.title}>
          {/* Back link */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">All News</span>
          </Link>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="inline-flex items-center gap-2 text-gray-300 text-sm font-medium">
              <Calendar className="w-4 h-4 text-gray-400" />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-5xl">{article.excerpt}</p>
          )}
        </ArticleHeroImages>
      </section>

      {/* ─── Article Content ─── */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          {article.body && (
            <div className="prose prose-lg prose-blue max-w-none break-words [word-break:break-word] [overflow-wrap:anywhere] overflow-hidden sm:overflow-visible">
              <PortableTextContent value={article.body} />
            </div>
          )}
        </div>
      </section>

      {/* ─── Attachment Files ─── */}
      <AttachmentFiles files={article.attachmentFiles} />

      {/* ─── Photo Gallery ─── */}
      {article.gallery && article.gallery.length > 0 && (
        <PhotoGalleryLightbox images={buildLightboxImages(article.gallery)} />
      )}

      {/* ─── Navigation ─── */}
      <section className="py-12 px-6 sm:px-12 border-t border-gray-100">
        <div className="mx-auto max-w-5xl flex items-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-esn-dark font-bold hover:text-esn-cyan transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            All News
          </Link>
        </div>
      </section>
    </main>
  );
}
