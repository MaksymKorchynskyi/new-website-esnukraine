import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import PageHero from "@/components/ui/PageHero";
import { NewsCard } from "@/components/ui/Card";
import NewsletterPopupButton from "@/components/sections/NewsletterPopup.client";
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'News',
  description:
    'Updates, stories and opportunities from ESN Ukraine: projects, partnerships and the people behind the Erasmus Student Network in Ukraine.',
  path: '/news',
});

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
  const query = groq`*[_type == "news"] | order(publishedAt desc) {
    _id, 
    title, 
    slug,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    "category": category->title
  }`;
  return await sanityFetch<NewsArticle[]>({ query, tags: ['news'] });
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="min-h-svh bg-white">
      <PageHero
        title="News"
        lead={
          <>
            <span className="font-black text-esn-dark">Updates, stories and opportunities</span> from
            our community, for everyone who wants to stay in the loop.
          </>
        }
        sub="Read about our projects, partnerships and the people behind them. Subscribe to get the latest news in your inbox."
        actionSlot={<NewsletterPopupButton />}
      />

      {/* News Grid */}
      <section className="pt-10 pb-24 sm:pt-14 px-6 sm:px-12 lg:px-24">
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
    </main>
  );
}
