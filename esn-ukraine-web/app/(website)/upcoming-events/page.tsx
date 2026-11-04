import { sanityFetch } from '@/sanity/lib/fetch';
import { groq } from 'next-sanity';
import PageHero from '@/components/ui/PageHero';
import UpcomingEvents, {
  type UpcomingEvent,
  type SectionOption,
} from '@/components/sections/UpcomingEvents.client';
import { buildMetadata } from '@/lib/seo';
import { isUpcomingEvent } from '@/lib/events';

export const metadata = buildMetadata({
  title: 'Upcoming Events',
  description:
    'See what ESN Ukraine and its local sections have planned next. Filter upcoming events by section and save the date.',
  path: '/upcoming-events',
});

// ==========================================
// DATA FETCHING
// ==========================================
async function getData(): Promise<{ events: UpcomingEvent[]; sections: SectionOption[] }> {
  const query = groq`{
    "events": *[_type == "upcomingEvent" && defined(date) && dateTime(date) > dateTime(now()) - 60*60*48] | order(date asc) {
      _id,
      title,
      date,
      location,
      description,
      link,
      "causes": coalesce(causes, []),
      "imageUrl": image.asset->url,
      "section": section->{ _id, name }
    },
    "sections": *[_type == "section"] | order(order asc, name asc) { _id, name }
  }`;

  const data = await sanityFetch<{ events: UpcomingEvent[]; sections: SectionOption[] }>({
    query,
    tags: ['upcomingEvent', 'section'],
  });

  return {
    // Announcements disappear automatically once their day has passed.
    events: (data?.events ?? []).filter((e) => isUpcomingEvent(e.date)),
    sections: data?.sections ?? [],
  };
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function UpcomingEventsPage() {
  const { events, sections } = await getData();

  return (
    <main className="min-h-svh bg-white">
      <PageHero
        title="Upcoming Events"
        compactTitle
        lead={
          <>
            See what is <span className="font-black text-esn-dark">coming up next</span> at ESN Ukraine
            and save the date.
          </>
        }
        sub="Filter by section or by ESN cause to find what interests you, or leave the filters empty to browse everything we have planned."
      />

      <section className="pt-10 pb-24 sm:pt-14 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <UpcomingEvents events={events} sections={sections} />
        </div>
      </section>
    </main>
  );
}
