import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";

// ==========================================
// INTERFACES
// ==========================================
interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  caption?: string;
  alt?: string;
  hotspot?: { x: number; y: number };
}

interface GalleryImage {
  _key: string;
  asset: { _ref: string; _type: "reference"; url?: string };
  caption?: string;
  hotspot?: { x: number; y: number };
}

interface NewsArticle {
  _id: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  mainImage: SanityImage | null;
  body: any[];
  gallery: GalleryImage[] | null;
}

// ==========================================
// DATA FETCHING
// ==========================================
const ARTICLE_QUERY = `*[_type == "news" && slug.current == $slug][0] {
  _id,
  title,
  publishedAt,
  excerpt,
  mainImage,
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset->,
      "caption": caption,
      "alt": alt
    }
  },
  gallery[] {
    _key,
    asset->,
    caption
  }
}`;

async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  return await client.fetch(ARTICLE_QUERY, { slug });
}

// ==========================================
// SEO METADATA
// ==========================================
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} — ESN Ukraine`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.mainImage
        ? [{ url: urlFor(article.mainImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

// ==========================================
// PORTABLE TEXT COMPONENTS
// ==========================================
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage & { asset: any } }) => {
      if (!value?.asset) return null;
      const imageUrl = value.asset?.url || urlFor(value).width(1200).url();
      return (
        <figure className="my-10 -mx-4 sm:mx-0">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={imageUrl}
              alt={value.alt || value.caption || "Фото у статті"}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-400 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-black text-esn-dark mt-14 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-esn-dark mt-10 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-bold text-esn-dark mt-8 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg leading-[1.85] text-gray-700 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-esn-cyan pl-6 py-2 bg-esn-cyan/5 rounded-r-xl">
        <p className="text-lg italic text-gray-600 leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-esn-dark">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-esn-cyan font-medium underline decoration-esn-cyan/30 underline-offset-2 hover:decoration-esn-cyan transition-colors"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 space-y-3 list-none pl-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 space-y-3 list-none pl-0 counter-reset-item">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-lg text-gray-700 leading-relaxed">
        <span className="mt-2 w-2 h-2 rounded-full bg-esn-cyan flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start gap-3 text-lg text-gray-700 leading-relaxed">
        <span>{children}</span>
      </li>
    ),
  },
};

// ==========================================
// GALLERY COMPONENT
// ==========================================
function PhotoGallery({ images }: { images: GalleryImage[] }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-gray-50">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-1 bg-esn-cyan rounded-full" />
          <h2 className="text-2xl md:text-3xl font-black text-esn-dark">
            Фотогалерея
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, idx) => {
            const imageUrl = img.asset?.url || urlFor(img).width(800).url();
            return (
              <figure
                key={img._key || idx}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={imageUrl}
                    alt={img.caption || `Фото ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {img.caption && (
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// READING TIME HELPER
// ==========================================
function getReadingTime(body: any[]): number {
  if (!body) return 1;
  const text = body
    .filter((block: any) => block._type === "block")
    .map((block: any) =>
      block.children?.map((child: any) => child.text).join(" ") || ""
    )
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    notFound();
  }

  const readingTime = getReadingTime(article.body);
  const mainImageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1600).height(900).url()
    : null;

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-esn-dark pt-36 pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d5e] via-esn-dark to-[#141B41]" />

        {/* Decorative blurs */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-esn-cyan/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-esn-magenta/8 rounded-full blur-3xl" />

        {/* Background image overlay */}
        {mainImageUrl && (
          <div className="absolute inset-0 opacity-10">
            <Image
              src={mainImageUrl}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column — Text */}
          <div>
            {/* Back link */}
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Усі новини</span>
            </Link>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-2 text-esn-cyan text-sm font-semibold">
                <Calendar className="w-4 h-4" />
                {new Date(article.publishedAt).toLocaleDateString("uk-UA", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Right Column — Featured Image */}
          {mainImageUrl && (
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={mainImageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </section>



      {/* ─── Article Content ─── */}
      <section className="py-16 md:py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-3xl">
          {article.body && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={article.body} components={portableTextComponents} />
            </div>
          )}
        </div>
      </section>

      {/* ─── Photo Gallery ─── */}
      {article.gallery && article.gallery.length > 0 && (
        <PhotoGallery images={article.gallery} />
      )}

      {/* ─── Share & Navigation ─── */}
      <section className="py-12 px-6 sm:px-12 border-t border-gray-100">
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-esn-dark font-bold hover:text-esn-cyan transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Усі новини
          </Link>

          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-esn-dark hover:border-esn-cyan/30 transition-all text-sm font-medium"
            title="Поширити"
          >
            <Share2 className="w-4 h-4" />
            Поширити
          </button>
        </div>
      </section>
    </main>
  );
}
