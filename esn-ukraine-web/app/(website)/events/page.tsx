import { sanityFetch } from "@/sanity/lib/fetch";
import { getAllEventsQuery } from "@/sanity/lib/queries";
import type { EventPreview } from "@/sanity/lib/types";
import { originalImageUrl } from "@/sanity/lib/image";
import PageHero from "@/components/ui/PageHero";
import { EventCard } from "@/components/ui/Card";
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Past Events',
  description:
    'A look back at ESN Ukraine events: national assemblies, international conferences and community gatherings that brought students and volunteers together.',
  path: '/events',
});

function truncateToSentences(text: string, maxSentences: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences || sentences.length <= maxSentences) return text;
  return sentences.slice(0, maxSentences).join('').trim() + '...';
}

/** Cards in the first row (3 columns on desktop) load eagerly: one of them is the LCP image. */
const EAGER_CARDS = 3;

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function EventsPage() {
  // No try/catch: if Sanity fails during a background ISR regeneration, Next.js keeps
  // serving the last good version of the page instead of caching an empty one.
  const events = await sanityFetch<EventPreview[]>({ query: getAllEventsQuery, tags: ['event'] });

  return (
    <main className="min-h-svh bg-white">
      <PageHero
        title="Past Events"
        lead={
          <>
            A look back at the moments that <span className="font-black text-esn-dark">shaped our network</span>,
            from national assemblies to international conferences.
          </>
        }
        sub="Each of these events was made possible by volunteers. Find your local section and be part of the next one."
        action={{ href: "/our-sections", label: "Find your section" }}
      />

      {/* Events Grid */}
      <section className="pt-10 pb-24 sm:pt-14 px-6 sm:px-12 lg:px-24" aria-label="Past events">
        <div className="mx-auto max-w-7xl">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No events yet.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <EventCard
                  key={event._id}
                  title={event.title}
                  slug={event.slug}
                  imageUrl={originalImageUrl(event.image)}
                  imageLqip={event.image?.asset?.lqip}
                  description={event.excerpt ? truncateToSentences(event.excerpt, 3) : null}
                  date={event.date}
                  location={event.location}
                  priority={index < EAGER_CARDS}
                  type="event"
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
