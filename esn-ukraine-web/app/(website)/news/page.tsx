import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";

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
    "imageUrl": mainImage.asset->url
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
                <Link
                  key={article._id}
                  href={`/news/${article.slug.current}`}
                  className="group"
                >
                  <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-esn-cyan/5">
                          <span className="text-esn-cyan font-bold text-xl">ESN</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <Calendar className="w-4 h-4 text-esn-cyan" />
                        {new Date(article.publishedAt).toLocaleDateString('uk-UA', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-esn-dark mb-3 group-hover:text-esn-cyan transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      {article.excerpt && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-grow">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-esn-dark group-hover:text-esn-cyan group-hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
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
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-xl border border-gray-200 bg-white px-6 py-4 text-esn-dark focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none placeholder:text-gray-400 font-medium transition-all shadow-sm"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl bg-esn-dark px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-esn-cyan hover:scale-105 tracking-wider uppercase"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
