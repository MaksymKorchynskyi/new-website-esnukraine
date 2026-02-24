'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Globe,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Mail,
  ArrowDown
} from 'lucide-react';

// ==========================================
// MOCK DATA: HERO SLIDES (Нові дані для слайдера)
// ==========================================
const HERO_SLIDES = [
  {
    id: 1,
    type: "Event",
    date: "20 Nov 2025",
    title: "ESN General Assembly in Seville",
    description: "Our delegation is representing Ukraine among 42 countries. Follow the live updates from the biggest student gathering in Europe.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
    link: "/news/assembly-seville"
  },
  {
    id: 2,
    type: "News",
    date: "15 Oct 2025",
    title: "Erasmus+ Days: Horizons Expanded",
    description: "Over 500 students attended our lecture series on mobility opportunities. Check out the recording and presentation materials.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
    link: "/news/erasmus-days"
  },
  {
    id: 3,
    type: "Social Impact",
    date: "01 Oct 2025",
    title: "Shelter Support Initiative",
    description: "Volunteers from Kyiv and Lviv united to collect 2 tons of food for local animal shelters. Join our next charity trip.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80",
    link: "/events/shelter-support"
  },
  {
    id: 4,
    type: "Community",
    date: "Sep 2025",
    title: "Carpathian Retreat Recap",
    description: "Building the strategy for 2026 while climbing Hoverla. See how our volunteers recharge and plan the future.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    link: "/news/retreat"
  },
  {
    id: 5,
    type: "Culture",
    date: "Aug 2025",
    title: "Welcome Week: New Beginnings",
    description: "Greeting 150+ international students with city tours and traditional dinners. The start of a new semester journey.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
    link: "/events/welcome-week"
  }
];

// ==========================================
// MOCK DATA (Решта даних без змін)
// ==========================================

const NEWS = [
  {
    id: 1,
    title: "ESN Ukraine at the General Assembly in Seville",
    date: "20 Nov 2025",
    category: "International",
    excerpt: "Our delegation represented Ukrainian students ensuring our voice is heard on the global level among 42 countries.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Erasmus+ Days 2025: Expanding Horizons",
    date: "15 Oct 2025",
    category: "Education",
    excerpt: "Over 500 students attended our lecture series on mobility opportunities. Here is how it went.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Social Impact Days: Shelter Support",
    date: "01 Oct 2025",
    category: "Social Impact",
    excerpt: "Volunteers from Kyiv and Lviv united to collect 2 tons of food for local animal shelters.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
  }
];

const PAST_EVENTS = [
  {
    id: 1,
    title: "National Platform Odesa",
    date: "August 2025",
    location: "Odesa",
    description: "The largest gathering of ESNers in Ukraine this summer. 3 days of workshops and networking.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Carpathian Retreat",
    date: "September 2025",
    location: "Yaremche",
    description: "Team building in the mountains. We climbed Hoverla and planned the strategic year ahead.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Welcome Week Kyiv",
    date: "September 2025",
    location: "Kyiv",
    description: "Greeting 150+ international students with city tours, quest museums, and traditional dinners.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "EuroDinner Lviv",
    date: "October 2025",
    location: "Lviv",
    description: "A culinary journey through Europe where students shared dishes from their home countries.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80"
  }
];

export default function Home() {
  // --- LOGIC FOR HERO SLIDER ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };
  // -----------------------------

  return (
    <main className="min-h-screen bg-white text-[#2E3192] selection:bg-[#00AEEF] selection:text-white">

      {/* =========================================
          1. HERO SECTION (SLIDER WITH GRADIENT)
          Оновлена версія: Банер + Новини
      ========================================= */}
      <section
        className="relative h-screen w-full overflow-hidden bg-[#2E3192] text-white"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* SLIDES RENDERING */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* THE GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2E3192] via-[#2E3192]/90 to-transparent md:bg-gradient-to-r md:from-[#2E3192] md:via-[#2E3192]/80 md:to-transparent" />
          </div>
        ))}

        {/* CONTENT CONTAINER */}
        <div className="relative z-20 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-24 pt-16">
            <div className="max-w-2xl">

              {/* Анімований текстовий блок */}
              <div key={currentSlide} className="animate-fade-in-up">

                {/* Meta Info */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="bg-[#00AEEF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {HERO_SLIDES[currentSlide].type}
                  </span>
                  <span className="flex items-center text-sm font-medium text-gray-300">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    {HERO_SLIDES[currentSlide].date}
                  </span>
                </div>

                {/* Title */}
                <h1 className="mb-6 font-sans text-5xl font-black leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
                  {HERO_SLIDES[currentSlide].title}
                </h1>

                {/* Description */}
                <p className="mb-8 text-lg font-medium leading-relaxed text-gray-200 md:text-xl max-w-lg">
                  {HERO_SLIDES[currentSlide].description}
                </p>

                {/* CTA Button */}
                <Link
                  href={HERO_SLIDES[currentSlide].link}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#2E3192] transition-all hover:bg-[#EC008C] hover:text-white"
                >
                  Read Full Story
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* CONTROLS & NAVIGATION */}
        <div className="absolute bottom-10 left-0 z-30 w-full px-6 sm:px-12 lg:px-24">
          <div className="mx-auto flex max-w-7xl items-end justify-between border-t border-white/20 pt-6">

            {/* Progress Indicators */}
            <div className="flex gap-4">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`group relative h-1 cursor-pointer transition-all duration-300 ${idx === currentSlide ? 'w-16 bg-[#00AEEF]' : 'w-8 bg-white/30 hover:bg-white'
                    }`}
                >
                  <span className="absolute -top-4 left-0 text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100">0{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#2E3192]"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#2E3192]"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={() => {
              const nextSection = document.querySelector('section:nth-of-type(2)');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col items-center text-white/80 hover:text-white transition-all duration-300"
          >
            <span className="text-xs font-medium uppercase tracking-wider mb-2 group-hover:mb-3 transition-all">
              Scroll
            </span>
            <div className="relative">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce"></div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* =========================================
          2. ABOUT US (TYPOGRAPHY & MISSION)
          Еталонна верстка тексту.
      ========================================= */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-[#00AEEF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] bg-[#EC008C]/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-6xl px-6 sm:px-12">
          <div className="grid gap-16 lg:grid-cols-12">

            {/* Left Column: Heading */}
            <div className="lg:col-span-4">
              <h2 className="sticky top-10 text-5xl font-black uppercase leading-tight text-[#2E3192]">
                We are the <br />
                <span className="text-[#00AEEF]">Erasmus Generation</span>
              </h2>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-8 space-y-8">
              <p className="text-2xl font-medium leading-relaxed text-gray-800 md:text-3xl">
                <span className="font-bold text-[#2E3192]">Erasmus Student Network Ukraine</span> is a national-level student organization that represents local ESN sections.
                At the moment, we have a growing network of sections in Kyiv, Lviv, Chernivtsi, and Odesa.
              </p>

              <div className="h-px w-full bg-gradient-to-r from-[#2E3192] to-transparent opacity-20" />

              <p className="text-xl leading-relaxed text-gray-600">
                Our mission is to represent international students, thus providing opportunities for cultural understanding and self-development under the principle of <strong className="text-[#EC008C] font-black">Students Helping Students</strong>.
                We are one of the youngest existing sections of ESN, but we possess all the energy and courage to make your exchange in Ukraine the most amazing time of your life!
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-8 mt-8">
                <p className="text-4xl font-black text-[#2E3192]">#ESNukraine</p>

                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-[#2E3192] px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#2E3192] transition-all hover:bg-[#2E3192] hover:text-white"
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
                <img src="https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&q=80" alt="ESN Community" className="h-64 w-full object-cover shadow-lg rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
                <img src="https://images.unsplash.com/photo-1526716173434-a1b560f2065d?auto=format&fit=crop&q=80" alt="ESN Events" className="h-48 w-full object-cover shadow-lg rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
              </div>
              <div className="pt-8">
                <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80" alt="ESN Network" className="h-full w-full object-cover shadow-lg rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 bg-[#EC008C]/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 bg-[#00AEEF]/20 rounded-full blur-2xl"></div>
            </div>

            {/* Right Side: Content */}
            <div className="lg:pl-10">
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-px w-8 bg-[#2E3192]"></span>
                <span className="text-sm font-bold uppercase tracking-widest text-[#2E3192]">Our Network</span>
              </div>

              <h2 className="mb-6 text-4xl font-black leading-tight text-[#2E3192] md:text-5xl">
                One Family,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#2E3192]">Growing Across Ukraine.</span>
              </h2>

              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                The ESN family in Ukraine is growing bigger every year. We started with small steps, but now the spirit of mobility is spreading fast. We are actively working on opening new sections to cover every corner of Ukraine.
              </p>

              <Link href="/sections" className="inline-flex items-center bg-[#2E3192] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#EC008C] rounded-full shadow-lg hover:shadow-xl group">
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
              <h2 className="text-4xl font-black text-[#2E3192] md:text-5xl">Latest Updates</h2>
              <p className="mt-4 text-lg text-gray-500 max-w-md">Keep up with the pulse of the organization. What we have been up to lately.</p>
            </div>
            <Link href="/news" className="group flex items-center font-bold text-[#EC008C]">
              <span className="border-b-2 border-[#EC008C] pb-0.5 group-hover:border-transparent transition-colors">Read all news</span>
              <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((item) => (
              <article key={item.id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#2E3192]/10 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2E3192] rounded-md shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 flex items-center text-sm font-medium text-gray-400">
                    <Calendar className="mr-2 h-4 w-4 text-[#00AEEF]" />
                    {item.date}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight text-[#2E3192] group-hover:text-[#00AEEF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mb-6 flex-1 text-gray-500 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <span className="text-sm font-bold text-[#2E3192] uppercase tracking-wide group-hover:text-[#EC008C] transition-colors">Read Article</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          5. PAST EVENTS (MEMORY LANE)
          Галерея спогадів, горизонтальний скрол.
      ========================================= */}
      <section className="bg-[#141B41] py-24 overflow-hidden text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 mb-12">
          <h2 className="text-4xl font-black md:text-5xl">Moments We Shared</h2>
          <p className="mt-4 text-xl text-gray-400">Highlights from our past events. This is how we make memories.</p>
        </div>

        {/* Horizontal Scroll Gallery Container */}
        <div className="relative w-full">
          <div className="flex gap-6 overflow-x-auto pb-12 px-6 sm:px-12 lg:px-24 scrollbar-hide snap-x snap-mandatory" id="events-slider">
            {PAST_EVENTS.map((event) => (
              <div key={event.id} className="relative flex-none w-[85vw] sm:w-[400px] snap-center group">
                <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-gray-800 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E3192] via-transparent to-transparent opacity-90" />

                  {/* Text Content overlay */}
                  <div className="absolute bottom-0 left-0 p-8 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="mb-2 text-[#7AC143] font-bold text-sm uppercase tracking-widest">
                      {event.date}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 leading-tight">{event.title}</h3>
                    <div className="flex items-center text-sm text-[#00AEEF] font-bold mb-4">
                      <MapPin className="h-4 w-4 mr-1" /> {event.location}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* End Card */}
            <div className="flex-none w-[200px] flex items-center justify-center snap-center">
              <Link href="/events" className="group flex flex-col items-center justify-center h-40 w-40 rounded-full border border-white/20 hover:bg-white hover:text-[#2E3192] transition-all">
                <span className="font-bold">View Archive</span>
                <ArrowRight className="mt-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Custom Slider Controls */}
          <button
            onClick={() => {
              const slider = document.getElementById('events-slider');
              if (slider) {
                slider.scrollBy({ left: -416, behavior: 'smooth' });
              }
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#2E3192] transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              const slider = document.getElementById('events-slider');
              if (slider) {
                slider.scrollBy({ left: 416, behavior: 'smooth' });
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#2E3192] transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

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
            <input
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