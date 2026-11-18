import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronRight, Mail } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection.client';
import NetworkPanel from '@/components/sections/NetworkPanel';
import { NewsCard } from '@/components/ui/Card';

// Lazy-load below-the-fold client components to reduce initial JS bundle (TBT optimization)
const EventsSection = dynamic(() => import('@/components/sections/EventsSection.client'), {
  loading: () => <div className="py-16 md:py-24" />,
});
const NetworkCollage = dynamic(() => import('@/components/sections/NetworkCollage.client'), {
  loading: () => (
    <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
      <div className="space-y-3 sm:space-y-4">
        <div className="h-44 sm:h-64 w-full rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-32 sm:h-48 w-full rounded-xl bg-gray-200 animate-pulse" />
      </div>
      <div className="pt-6 sm:pt-8">
        <div className="h-full w-full min-h-[220px] sm:min-h-[300px] rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </div>
  ),
});
const NewsletterForm = dynamic(() => import('@/components/sections/NewsletterForm.client'), {
  loading: () => <div className="h-12" />,
});

import { stegaClean } from 'next-sanity';
import { sanityFetch } from "@/sanity/lib/fetch";
import { getHomePageQuery } from "@/sanity/lib/queries";
import type { HomePageData, NetworkPhoto } from "@/sanity/lib/types";
import { hasAsset, hotspotPosition, originalImageUrl } from "@/sanity/lib/image";
import { formatDate } from "@/sanity/lib/utils";
import type { VolunteerPhotoItem } from '@/components/sections/NetworkCollage.client';

import { buildMetadata } from '@/lib/seo';
import { JsonLd, websiteJsonLd } from '@/lib/jsonld';

export const metadata = buildMetadata({
  title: 'ESN Ukraine',
  description:
    'Erasmus Student Network Ukraine is a national-level student organization representing local ESN sections. Discover our network, news, and events.',
  path: '/',
  absoluteTitle: true,
});


/** Network collage photo → the shape the client component needs (URL built on the server). */
function toCollagePhoto(photo: NetworkPhoto): VolunteerPhotoItem | null {
  if (!hasAsset(photo.image)) return null;
  return {
    id: photo.id,
    url: photo.image.asset.url ?? "",
    alt: photo.title,
    lqip: photo.image.asset.lqip ?? undefined,
  };
}

export default async function Home() {
  // One GROQ request for the whole page instead of four sequential ones.
  const data = await sanityFetch<HomePageData>({
    query: getHomePageQuery,
    tags: ['news', 'event', 'networkPhoto'],
  });

  const photosBySlot = (slot: string) =>
    (data.photos ?? [])
      .filter((p) => stegaClean(p.slot) === slot)
      .map(toCollagePhoto)
      .filter((p): p is VolunteerPhotoItem => p !== null);
  const photosSlotA = photosBySlot('slotA');
  const photosSlotB = photosBySlot('slotB');
  const photosSlotC = photosBySlot('slotC');

  // Slides without any photo are skipped: the hero never shows a stock image
  const SPOTLIGHT_SLIDES = (data.spotlight ?? [])
    .filter((item) => hasAsset(item.banner))
    .map((item) => ({
      id: item._id,
      type: item._type === 'news' ? 'News' : 'Event',
      date: formatDate(item.date || item.publishedAt),
      title: item.title,
      description: item.excerpt,
      image: originalImageUrl(item.banner) ?? "",
      imageBlur: item.banner?.asset?.lqip ?? undefined,
      imagePosition: hotspotPosition(item.banner),
      link: `/${item._type === 'news' ? 'news' : 'events'}/${item.slug}`,
    }));

  const NEWS = (data.news ?? []).map((item) => ({
    id: item._id,
    title: item.title,
    publishedAt: item.publishedAt,
    excerpt: item.excerpt,
    imageUrl: originalImageUrl(item.image),
    imageLqip: item.image?.asset?.lqip,
    slug: item.slug,
    type: 'news' as const,
  }));

  const PAST_EVENTS = (data.events ?? []).map((item) => ({
    id: item._id,
    title: item.title,
    date: formatDate(item.date),
    location: item.location || 'Online',
    description: item.excerpt,
    image: originalImageUrl(item.image),
    imageLqip: item.image?.asset?.lqip ?? undefined,
    link: `/events/${item.slug}`,
  }));
  return (
    <main className="min-h-svh bg-white text-esn-dark selection:bg-esn-cyan selection:text-white">
      <JsonLd data={websiteJsonLd()} />
      {/* Permanent page heading for assistive tech and search engines; the hero's
          rotating slide titles are h2 */}
      <h1 className="sr-only">ESN Ukraine — Erasmus Student Network Ukraine</h1>

      {/* =========================================
          1. HERO SECTION (SLIDER WITH GRADIENT)
          Оновлена версія: Банер + Новини
      ========================================= */}
      <HeroSection slides={SPOTLIGHT_SLIDES} />

      {/* =========================================
          2. ABOUT US (TYPOGRAPHY & MISSION)
          Еталонна верстка тексту.
      ========================================= */}
      <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -z-10 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] bg-esn-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] bg-esn-magenta/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-6xl px-5 sm:px-12">
          <div className="grid gap-8 md:gap-16 lg:grid-cols-12">

            {/* Left Column: Heading */}
            <div className="lg:col-span-4">
              <h2 className="mb-4 md:mb-0 md:sticky md:top-24 text-[1.9rem] xs:text-[2.2rem] sm:text-5xl lg:text-[2.65rem] xl:text-5xl font-black md:uppercase leading-[1.08] tracking-tighter sm:tracking-tight text-esn-dark">
                This is{' '}
                <br className="hidden sm:block" />
                <span className="text-esn-cyan whitespace-nowrap inline sm:block sm:mt-1.5">ESN Ukraine.</span>
              </h2>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-8 space-y-5 md:space-y-8">
              <p className="text-lg sm:text-2xl font-medium leading-relaxed text-gray-800 md:text-3xl">
                <span className="font-bold text-esn-dark">Erasmus Student Network Ukraine</span> is a national-level student organization that represents local ESN sections.
                At the moment, we have a growing network of sections in Kyiv, Lviv, Chernivtsi, and Odesa.
              </p>

              <div className="h-px w-full bg-gradient-to-r from-esn-dark to-esn-dark/0 opacity-20" />

              <div className="space-y-4 sm:space-y-5 text-base sm:text-xl leading-relaxed text-gray-600">
                <p>
                  Our mission is to facilitate the development of the Ukrainian youth sector on its path to the EU, implementing the best international educational practices.
                </p>
                <p>
                  Remaining true to the principle of <span className="text-esn-magenta font-black whitespace-nowrap">Students Helping Students</span>, we possess all the energy and courage to represent our youth internationally and build a strong European future for Ukraine!
                </p>
              </div>

              <div className="flex flex-row items-center justify-start gap-4 sm:gap-8 pt-3 sm:pt-4 flex-wrap">
                <p className="text-2xl sm:text-4xl font-black text-esn-dark shrink-0">#ESNukraine</p>

                <div>
                  <Link
                    href="/about-us"
                    aria-label="Read more about ESN Ukraine"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-esn-dark sm:border-2 px-5 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-esn-dark transition-all hover:bg-esn-dark hover:text-white shrink-0 min-h-[42px]"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          3. OUR NETWORK
          Rotating photo collage + text on a white map of Ukraine (NetworkPanel)
      ========================================= */}
      {/* Full-screen grey band (desktop): fills the screen below the 84px header when scrolled to */}
      <section className="relative flex items-center overflow-hidden bg-gray-100 py-12 sm:py-16 md:py-24 lg:min-h-[calc(100svh-84px)]">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-12">
          <NetworkPanel
            photos={
              <NetworkCollage
                photosSlotA={photosSlotA}
                photosSlotB={photosSlotB}
                photosSlotC={photosSlotC}
              />
            }
          />
        </div>
      </section>

      {/* =========================================
          4. LATEST NEWS (CLEAN GRID)
          Модульна сітка новин.
      ========================================= */}
      <section className="relative bg-white py-12 sm:py-16 md:py-24 px-5 sm:px-12 lg:px-24 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-esn-dark md:text-5xl">Latest Updates</h2>
              <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-500 max-w-md">Keep up with the pulse of the organization. What we have been up to lately.</p>
            </div>
            <div className="hidden md:block">
              <Link href="/news" className="group inline-flex items-center font-bold text-esn-magenta sm:text-base">
                <span className="border-b-2 border-transparent pb-0.5 group-hover:border-esn-magenta transition-colors">Read all news</span>
                <ChevronRight className="ml-1 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>

          {/* Mobile 'Read all news' button below the grid */}
          <div className="mt-8 flex justify-start md:hidden">
            <Link href="/news" className="group inline-flex items-center font-bold text-esn-magenta text-[13px] uppercase tracking-wider">
              <span className="border-b-2 border-transparent pb-0.5 group-hover:border-esn-magenta transition-colors">Read all news</span>
              <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          5. PAST EVENTS (MEMORY LANE)
          Галерея спогадів, горизонтальний скрол.
      ========================================= */}
      <EventsSection events={PAST_EVENTS} />

      {/* =========================================
          6. STAY CONNECTED (OUTLINED BOX)
      ========================================= */}
      <section className="relative bg-gray-50 pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-12 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-br from-esn-cyan/20 to-esn-magenta/20"></div>
        </div>

        <div className="px-5 sm:px-12 lg:px-24 mb-10 sm:mb-16">
          {/* Outlined Box */}
          <div className="relative z-10 border border-esn-dark/15 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 max-w-4xl mx-auto bg-white/60 backdrop-blur-sm text-center shadow-xl shadow-esn-dark/5">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-esn-dark/5 rounded-2xl mb-2 sm:mb-4">
              <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-esn-dark" />
            </div>
          </div>

          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-black text-esn-dark md:text-4xl tracking-tight">
            Stay Connected
          </h2>

          <p className="mb-6 sm:mb-8 text-base sm:text-lg font-medium text-gray-600 leading-relaxed max-w-md mx-auto">
            Join our community newsletter to receive the latest updates, events, and ESN Ukraine initiatives.
          </p>

          <NewsletterForm />
          </div>
        </div>

        {/* Infinite Marquee Ticker */}
        <div className="relative w-full z-10" aria-hidden="true">
        <div className="w-max motion-safe:animate-marquee flex">
          {[...Array(2)].map((_, dupeIdx) => (
            <div key={dupeIdx} className="flex gap-10 sm:gap-16 pr-10 sm:pr-16">
              {[
                { tag: '#Travel', hoverColor: 'hover:text-esn-cyan' },
                { tag: '#Education', hoverColor: 'hover:text-esn-magenta' },
                { tag: '#SocialImpact', hoverColor: 'hover:text-esn-green' },
                { tag: '#Culture', hoverColor: 'hover:text-esn-dark' },
                { tag: '#Mobility', hoverColor: 'hover:text-esn-cyan' },
                { tag: '#Volunteering', hoverColor: 'hover:text-esn-magenta' },
                { tag: '#Erasmus', hoverColor: 'hover:text-esn-green' },
                { tag: '#Diversity', hoverColor: 'hover:text-esn-dark' },
                { tag: '#Inclusion', hoverColor: 'hover:text-esn-cyan' },
                { tag: '#ErasmusGeneration', hoverColor: 'hover:text-esn-magenta' },
              ].map((item) => (
                <span
                  key={`${dupeIdx}-${item.tag}`}
                  className={`whitespace-nowrap text-xl sm:text-3xl font-bold text-gray-300 cursor-pointer transition-colors duration-300 ${item.hoverColor}`}
                >
                  {item.tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      </section>
    </main>
  );
}

