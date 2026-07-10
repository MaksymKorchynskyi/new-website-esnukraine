import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Mail
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection.client';
import EventsSection from '@/components/sections/EventsSection.client';
import { NewsCard } from '@/components/ui/Card';

import Image from 'next/image';
import { sanityFetch } from "@/sanity/lib/fetch";
import { getSpotlightItemsQuery, getLatestNewsQuery, getLatestEventsQuery } from "@/sanity/lib/queries";
import type { SpotlightItem, NewsArticlePreview, EventPreview } from "@/sanity/lib/types";
import { formatDate } from "@/sanity/lib/utils";



export default async function Home() {
  const sanitySpotlight = await sanityFetch<SpotlightItem[]>({ query: getSpotlightItemsQuery });
  const sanityNews = await sanityFetch<NewsArticlePreview[]>({ query: getLatestNewsQuery });
  const sanityEvents = await sanityFetch<EventPreview[]>({ query: getLatestEventsQuery });

  const SPOTLIGHT_SLIDES = sanitySpotlight.map((item, index) => ({
    id: item._id || String(index),
    type: item._type === 'news' ? 'News' : 'Event',
    date: formatDate(item.date || item.publishedAt),
    title: item.title,
    description: item.excerpt,
    image: item.bannerUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
    link: `/${item._type === 'news' ? 'news' : 'events'}/${item.slug}`
  }));

  const NEWS = sanityNews.map((item, index) => ({
    id: item._id || String(index),
    title: item.title,
    publishedAt: item.publishedAt,
    excerpt: item.excerpt,
    imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
    slug: item.slug.current,
    type: 'news' as const
  }));

  const PAST_EVENTS = sanityEvents.map((item, index) => ({
    id: index,
    title: item.title,
    date: formatDate(item.date),
    location: item.location || 'Online',
    description: item.excerpt,
    image: item.imageUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    link: `/events/${item.slug.current}`
  }));
  return (
    <main className="min-h-screen bg-white text-esn-dark selection:bg-esn-cyan selection:text-white">

      {/* =========================================
          1. HERO SECTION (SLIDER WITH GRADIENT)
          Оновлена версія: Банер + Новини
      ========================================= */}
      <HeroSection slides={SPOTLIGHT_SLIDES} />

      {/* =========================================
          2. ABOUT US (TYPOGRAPHY & MISSION)
          Еталонна верстка тексту.
      ========================================= */}
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
              <h2 className="mb-4 md:mb-0 md:sticky md:top-24 text-4xl sm:text-5xl lg:text-[2.65rem] xl:text-5xl font-black uppercase leading-[1.08] tracking-tight text-esn-dark">
                This is <br />
                <span className="text-esn-cyan whitespace-nowrap block mt-1.5">ESN Ukraine.</span>
              </h2>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-8 space-y-5 md:space-y-8">
              <p className="text-lg sm:text-2xl font-medium leading-relaxed text-gray-800 md:text-3xl">
                <span className="font-bold text-esn-dark">Erasmus Student Network Ukraine</span> is a national-level student organization that represents local ESN sections.
                At the moment, we have a growing network of sections in Kyiv, Lviv, Chernivtsi, and Odesa.
              </p>

              <div className="h-px w-full bg-gradient-to-r from-esn-dark to-transparent opacity-20" />

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
                    href="/about"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-esn-dark sm:border-2 px-5 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-esn-dark transition-all hover:bg-esn-dark hover:text-white shrink-0 min-h-[42px]"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          3. OUR SECTIONS (UPDATED: COLLAGE & EXPANSION)
          Оновлено: Колаж + Текст + Кнопка (без списку) + Градієнт у заголовку
      ========================================= */}
      <section className="relative bg-gray-50 py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-12">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left Side: Visual Collage */}
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative h-44 sm:h-64 w-full">
                  <Image src="https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&q=80" alt="ESN Community" fill={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-xl" />
                </div>
                <div className="relative h-32 sm:h-48 w-full">
                  <Image src="https://images.unsplash.com/photo-1526716173434-a1b560f2065d?auto=format&fit=crop&q=80" alt="ESN Events" fill={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-xl" />
                </div>
              </div>
              <div className="pt-6 sm:pt-8">
                <div className="relative h-full w-full min-h-[220px] sm:min-h-[300px]">
                  <Image src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80" alt="ESN Network" fill={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-xl" />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 bg-esn-magenta/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 bg-esn-cyan/20 rounded-full blur-2xl"></div>
            </div>

            {/* Right Side: Content */}
            <div className="mt-2 lg:mt-0 lg:pl-10">
              <div className="mb-4 sm:mb-6 inline-flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-esn-dark">Our Network</span>
              </div>

              <h2 className="mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-[2.65rem] xl:text-5xl font-black leading-[1.08] tracking-tight text-esn-dark">
                One Family, <br />
                <span className="text-esn-cyan block mt-1.5">Growing Across Ukraine.</span>
              </h2>

              <p className="mb-6 sm:mb-8 text-base sm:text-xl leading-relaxed text-gray-600">
                The ESN family in Ukraine is growing bigger every year. We started with small steps, but now the spirit of mobility is spreading fast. We are actively working on opening new sections to cover every corner of Ukraine.
              </p>

              <div className="pt-1 sm:pt-0">
                <Link href="/sections" className="inline-flex items-center justify-center bg-esn-dark px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-esn-magenta rounded-full shadow-md sm:shadow-lg hover:shadow-xl group w-auto">
                  View Our Sections
                  <ArrowRight className="ml-2 sm:ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
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
            <div>
              <Link href="/news" className="group inline-flex items-center font-bold text-esn-magenta text-xs sm:text-base">
                <span className="border-b-2 border-transparent pb-0.5 group-hover:border-esn-magenta transition-colors">Read all news</span>
                <ChevronRight className="ml-1 h-3.5 w-3.5 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
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
      <section className="relative bg-gray-50 pt-12 sm:pt-16 md:pt-24 pb-6 sm:pb-8 px-5 sm:px-12 lg:px-24 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-gradient-to-br from-esn-cyan/20 to-esn-magenta/20"></div>
        </div>

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

          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full sm:flex-1 rounded-full border border-gray-200 bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-sm text-esn-dark focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none placeholder:text-gray-400 font-medium shadow-sm transition-all"
            />
            <button
              type="submit"
              className="group whitespace-nowrap px-8 py-3 sm:py-3.5 rounded-full bg-esn-dark text-xs sm:text-sm font-bold text-white transition-all hover:bg-esn-cyan hover:shadow-lg tracking-wider uppercase inline-flex items-center justify-center gap-2 shadow-md shrink-0 active:scale-95"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-4 sm:mt-5 flex justify-center">
            <div className="inline-flex items-start gap-2.5 text-left max-w-sm">
              <input
                id="privacy-consent"
                name="privacy-consent"
                type="checkbox"
                required
                defaultChecked
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-esn-dark focus:ring-esn-cyan cursor-pointer transition-colors accent-esn-dark shrink-0"
              />
              <label htmlFor="privacy-consent" className="text-xs text-gray-500 leading-normal cursor-pointer select-none">
                I agree to the processing of personal data per ESN Ukraine&apos;s{' '}
                <Link href="/privacy" className="font-semibold text-esn-dark underline decoration-esn-dark/30 hover:decoration-esn-dark hover:text-esn-cyan transition-colors">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
          </div>
        </div>

        {/* Infinite Marquee Ticker */}
        <div className="relative z-10 mt-10 sm:mt-16 mb-2 sm:mb-4 overflow-hidden">
          <div className="w-max animate-marquee flex">
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