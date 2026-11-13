import { sanityFetch } from "@/sanity/lib/fetch";
import { getAllNewsQuery } from "@/sanity/lib/queries";
import type { NewsArticlePreview } from "@/sanity/lib/types";
import { cardImageUrl, hasAsset } from "@/sanity/lib/image";
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

/** Cards in the first row (3 columns on desktop) load eagerly: one of them is the LCP image. */
const EAGER_CARDS = 3;

export default async function NewsPage() {
  const news = await sanityFetch<NewsArticlePreview[]>({ query: getAllNewsQuery, tags: ['news'] });

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
      <section className="pt-10 pb-24 sm:pt-14 px-6 sm:px-12 lg:px-24" aria-label="All news">
        <div className="mx-auto max-w-7xl">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No news articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((article, index) => (
                <NewsCard
                  key={article._id}
                  title={article.title}
                  slug={article.slug}
                  imageUrl={hasAsset(article.image) ? cardImageUrl(article.image) : null}
                  imageLqip={article.image?.asset?.lqip}
                  excerpt={article.excerpt}
                  publishedAt={article.publishedAt}
                  category={article.categoryTitle}
                  priority={index < EAGER_CARDS}
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
