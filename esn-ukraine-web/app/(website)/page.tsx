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



export default async function Home() {
  const sanitySpotlight = await sanityFetch<SpotlightItem[]>({ query: getSpotlightItemsQuery });
  const sanityNews = await sanityFetch<NewsArticlePreview[]>({ query: getLatestNewsQuery });
  const sanityEvents = await sanityFetch<EventPreview[]>({ query: getLatestEventsQuery });

  const SPOTLIGHT_SLIDES = sanitySpotlight.map((item, index) => ({
    id: item._id || String(index),
    type: item._type === 'news' ? 'Новина' : 'Подія',
    date: new Date(item.date || item.publishedAt || '').toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' }),
    title: item.title,
    description: item.excerpt,
    image: item.bannerUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
    link: `/${item._type === 'news' ? 'news' : 'events'}/${item.slug}`
  }));

  const NEWS = sanityNews.map((item, index) => ({
    id: item._id || String(index),
    title: item.title,
    publishedAt: item.publishedAt,
    category: item.categoryTitle || 'News',
    excerpt: item.excerpt,
    imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
    slug: item.slug.current,
    type: 'news' as const
  }));

  const PAST_EVENTS = sanityEvents.map((item, index) => ({
    id: index,
    title: item.title,
    date: new Date(item.date).toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' }),
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
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-esn-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] bg-esn-magenta/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-6xl px-6 sm:px-12">
          <div className="grid gap-16 lg:grid-cols-12">

            {/* Left Column: Heading */}
            <div className="hidden md:block lg:col-span-4">
              <h2 className="sticky top-10 text-5xl font-black uppercase leading-tight text-esn-dark">
                We are the <br />
                <span className="text-esn-cyan">Erasmus Generation</span>
              </h2>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-8 space-y-8">
              <p className="text-2xl font-medium leading-relaxed text-gray-800 md:text-3xl">
                <span className="font-bold text-esn-dark">Erasmus Student Network Ukraine</span> is a national-level student organization that represents local ESN sections.
                At the moment, we have a growing network of sections in Kyiv, Lviv, Chernivtsi, and Odesa.
              </p>

              <div className="h-px w-full bg-gradient-to-r from-esn-dark to-transparent opacity-20" />

              <p className="text-xl leading-relaxed text-gray-600">
                Our mission is to represent international students, thus providing opportunities for cultural understanding and self-development under the principle of <strong className="text-esn-magenta font-black">Students Helping Students</strong>.
                We are one of the youngest existing sections of ESN, but we possess all the energy and courage to make your exchange in Ukraine the most amazing time of your life!
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-8 mt-8">
                <p className="text-4xl font-black text-esn-dark">#ESNukraine</p>

                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-esn-dark px-8 py-3 text-sm font-bold uppercase tracking-widest text-esn-dark transition-all hover:bg-esn-dark hover:text-white"
                >
                  Read More
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          3. OUR SECTIONS (UPDATED: COLLAGE & EXPANSION)
          Оновлено: Колаж + Текст + Кнопка (без списку) + Градієнт у заголовку
      ========================================= */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left Side: Visual Collage */}
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 w-full">
                  <Image src="https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&q=80" alt="ESN Community" fill={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover shadow-lg rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
                </div>
                <div className="relative h-48 w-full">
                  <Image src="https://images.unsplash.com/photo-1526716173434-a1b560f2065d?auto=format&fit=crop&q=80" alt="ESN Events" fill={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover shadow-lg rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
                </div>
              </div>
              <div className="pt-8">
                <div className="relative h-full w-full min-h-[300px]">
                  <Image src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80" alt="ESN Network" fill={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover shadow-lg rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 bg-esn-magenta/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 bg-esn-cyan/20 rounded-full blur-2xl"></div>
            </div>

            {/* Right Side: Content */}
            <div className="lg:pl-10">
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-px w-8 bg-esn-dark"></span>
                <span className="text-sm font-bold uppercase tracking-widest text-esn-dark">Our Network</span>
              </div>

              <h2 className="mb-6 text-4xl font-black leading-tight text-esn-dark md:text-5xl">
                One Family,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-esn-cyan to-esn-dark">Growing Across Ukraine.</span>
              </h2>

              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                The ESN family in Ukraine is growing bigger every year. We started with small steps, but now the spirit of mobility is spreading fast. We are actively working on opening new sections to cover every corner of Ukraine.
              </p>

              <Link href="/sections" className="inline-flex items-center bg-esn-dark px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-esn-magenta rounded-full shadow-lg hover:shadow-xl group">
                View Our Sections
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          4. LATEST NEWS (CLEAN GRID)
          Модульна сітка новин.
      ========================================= */}
      <section className="bg-white py-24 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-black text-esn-dark md:text-5xl">Latest Updates</h2>
              <p className="mt-4 text-lg text-gray-500 max-w-md">Keep up with the pulse of the organization. What we have been up to lately.</p>
            </div>
            <Link href="/news" className="group flex items-center font-bold text-esn-magenta">
              <span className="border-b-2 border-esn-magenta pb-0.5 group-hover:border-transparent transition-colors">Read all news</span>
              <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="relative bg-gray-50 pt-24 pb-8 px-6 sm:px-12 lg:px-24 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-gradient-to-br from-esn-cyan/20 to-esn-magenta/20"></div>
        </div>

        {/* Outlined Box */}
        <div className="relative z-10 border border-esn-dark/15 rounded-3xl p-10 md:p-16 max-w-4xl mx-auto bg-white/60 backdrop-blur-sm text-center shadow-xl shadow-esn-dark/5">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-esn-dark/5 rounded-2xl mb-4">
              <Mail className="h-7 w-7 text-esn-dark" />
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-black text-esn-dark md:text-4xl tracking-tight">
            Stay Connected
          </h2>

          <p className="mb-10 text-lg font-medium text-gray-500 leading-relaxed max-w-lg mx-auto">
            Subscribe to our newsletter. No spam — just ESN love, mobility news, and event recaps.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm text-esn-dark focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none placeholder:text-gray-400 font-medium transition-all"
            />
            <button className="whitespace-nowrap rounded-full bg-esn-dark px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-esn-cyan hover:shadow-lg tracking-wider uppercase">
              Subscribe
            </button>
          </form>
        </div>

        {/* Infinite Marquee Ticker */}
        <div className="relative z-10 mt-16 mb-4 overflow-hidden">
          <div className="w-max animate-marquee flex">
            {[...Array(2)].map((_, dupeIdx) => (
              <div key={dupeIdx} className="flex gap-16 pr-16">
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
                    className={`whitespace-nowrap text-3xl font-bold text-gray-300 cursor-pointer transition-colors duration-300 ${item.hoverColor}`}
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