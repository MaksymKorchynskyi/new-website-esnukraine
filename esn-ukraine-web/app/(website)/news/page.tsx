import { client } from "@/sanity/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewsCard } from "@/components/ui/Card";

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface NewsArticle {
  _id: string;
  slug: { current: string };
  title: string;
  publishedAt: string;
  excerpt: string;
  imageUrl: string | null;
  category: string | null;
}

// ==========================================
// SANITY FETCH (CMS integration)
// ==========================================
async function getNews(): Promise<NewsArticle[]> {
  const query = `*[_type == "news"] | order(publishedAt desc) {
    _id, 
    title, 
    slug,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    "category": category->title
  }`;
  return await client.fetch(query);
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-esn-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-esn-magenta/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="max-w-3xl">

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              News
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              The latest updates from ESN Ukraine. Events, announcements, and stories from our community.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No news articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((article) => (
                <NewsCard
                  key={article._id}
                  title={article.title}
                  slug={article.slug.current}
                  imageUrl={article.imageUrl}
                  excerpt={article.excerpt}
                  publishedAt={article.publishedAt}
                  category={article.category}
                  type="news"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-6">
            Never Miss an Update
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter and stay connected with ESN Ukraine.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-xl border border-gray-200 bg-white px-6 py-4 text-esn-dark focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none placeholder:text-gray-400 font-medium transition-all shadow-sm"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl bg-esn-dark px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-esn-cyan tracking-wider uppercase"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
