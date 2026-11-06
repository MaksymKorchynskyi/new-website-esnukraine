'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlide {
  id: string | number;
  type: string;
  date: string;
  title: string;
  description: string;
  image: string;
  /** Tiny base64 preview (Sanity LQIP) — used for the blurred backdrop and as the loading placeholder */
  imageBlur?: string;
  /** CSS object-position, e.g. "50% 30%" (from the Sanity hotspot) */
  imagePosition?: string;
  link: string;
}

export interface HeroSectionProps {
  slides: HeroSlide[];
}

/**
 * Title sizing by length. On lg the title sits in a half-width column next to the photo card,
 * so it steps down there and grows back on xl.
 */
function getTitleSizeClass(title: string): string {
  const length = title?.length || 0;
  if (length < 28) {
    return 'text-[1.75rem] sm:text-4xl md:text-6xl lg:text-5xl xl:text-7xl';
  } else if (length <= 48) {
    return 'text-2xl sm:text-[1.75rem] md:text-5xl lg:text-[2.75rem] xl:text-6xl';
  } else {
    return 'text-xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl';
  }
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null || touchStartY === null || touchEndY === null) return;
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      const headerHeight = 84;
      const targetTop = nextSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  /*
   * Layout idea: the sharp photo only ever fills a bounded card, never the whole screen.
   * The full-bleed area behind it is a heavily blurred, brand-tinted copy of the photo
   * (Sanity's ~20px LQIP), which looks the same at any resolution. So a 1280px photo
   * stays crisp on phones, tablets and 4K/retina desktops alike.
   */
  return (
    <section
      className="relative w-full overflow-hidden bg-esn-navy pt-[76px] text-white sm:pt-[84px] lg:h-svh lg:min-h-[680px]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ─── BACKDROP: blurred photo colours + brand tint ─── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {slides.map((slide, index) => {
          const isNear =
            index === currentSlide ||
            index === (currentSlide + 1) % slides.length ||
            index === (currentSlide - 1 + slides.length) % slides.length;
          if (!slide.imageBlur || !isNear) return null;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute -inset-16 bg-cover bg-center blur-3xl"
                style={{ backgroundImage: `url("${slide.imageBlur}")` }}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-br from-esn-navy/90 via-esn-dark/75 to-esn-navy/95" />
        <div className="absolute -top-24 right-[10%] h-96 w-96 rounded-full bg-esn-cyan/10 blur-3xl" />
        <div className="absolute -bottom-24 left-[5%] h-80 w-80 rounded-full bg-esn-magenta/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col lg:px-16 xl:px-24">
        <div className="flex-1 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">

          {/* ─── PHOTO CARD ─── */}
          {/* Mobile: edge-to-edge 4:3. Tablet: rounded 16:9 card. Desktop: 3:2 card on the right, max 680px wide */}
          <div className="relative md:px-12 md:pt-8 lg:order-2 lg:col-span-6 lg:flex lg:justify-end lg:px-0 lg:pt-0">
            <div className="relative w-full lg:max-w-[640px] xl:max-w-[680px]">
              {/* Brand accent layer peeking out behind the card */}
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden translate-x-3 translate-y-3 rounded-2xl bg-gradient-to-br from-esn-cyan via-esn-dark to-esn-magenta md:block lg:translate-x-5 lg:translate-y-5 lg:rounded-3xl"
              />
              <div className="relative aspect-[4/3] overflow-hidden bg-esn-navy md:aspect-video md:rounded-2xl md:shadow-2xl md:ring-1 md:ring-white/10 lg:aspect-[3/2] lg:rounded-3xl">
                {slides.map((slide, index) => {
                  // Only mount <Image> for the active slide and its neighbours,
                  // so the browser doesn't download every slide up front
                  const isActive = index === currentSlide;
                  const isAdjacent =
                    index === (currentSlide + 1) % slides.length ||
                    index === (currentSlide - 1 + slides.length) % slides.length;
                  if (!isActive && !isAdjacent) return null;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        quality={75}
                        sizes="(min-width: 1280px) 680px, (min-width: 1024px) 50vw, 100vw"
                        placeholder={slide.imageBlur ? 'blur' : 'empty'}
                        blurDataURL={slide.imageBlur}
                        className="object-cover"
                        style={{ objectPosition: slide.imagePosition ?? '50% 50%' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── TEXT ─── */}
          {/* Every slide's text is stacked in one grid cell, so the block is as tall as the
              tallest slide and the layout never jumps when the slide changes */}
          <div className="grid px-5 pt-6 sm:px-12 md:pt-12 lg:order-1 lg:col-span-6 lg:px-0 lg:pt-0">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              const Heading = isActive ? 'h1' : 'p';
              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`[grid-area:1/1] transition-all duration-700 ease-out ${
                    isActive
                      ? 'visible translate-y-0 opacity-100'
                      : 'pointer-events-none invisible translate-y-3 opacity-0'
                  }`}
                >
                  {/* Meta Info */}
                  <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3 md:mb-4">
                    <span className="bg-esn-cyan px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white sm:text-xs">
                      {slide.type}
                    </span>
                    <span className="flex items-center text-xs font-medium text-gray-200 sm:text-sm">
                      <Calendar className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {slide.date}
                    </span>
                  </div>

                  <Heading
                    className={`mb-3 break-words font-sans font-black leading-tight tracking-tight text-white sm:mb-4 md:mb-6 ${getTitleSizeClass(slide.title)}`}
                  >
                    {slide.title}
                  </Heading>

                  <p className="mb-5 max-w-lg text-sm font-medium leading-relaxed text-gray-200 line-clamp-3 md:mb-8 md:text-lg lg:line-clamp-4 xl:text-xl">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.link}
                    tabIndex={isActive ? undefined : -1}
                    className="group inline-flex w-auto max-w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-esn-dark shadow-md transition-all hover:bg-esn-magenta hover:text-white sm:px-5 sm:py-2.5 sm:text-[11px] md:gap-2 md:px-8 md:py-4 md:text-sm"
                  >
                    Read Full Story
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5 md:h-5 md:w-5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── CONTROLS & NAVIGATION ─── */}
        <div className="px-5 pb-6 pt-8 sm:px-12 sm:pb-10 lg:px-0">
          <div className="relative flex items-end justify-between border-t border-white/20 pt-4 sm:pt-6">

            {/* Progress Indicators */}
            <div className="flex items-center gap-2 sm:gap-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="group relative flex cursor-pointer items-center py-2.5 sm:py-0"
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === currentSlide}
                >
                  <span className={`h-1.5 rounded-full transition-all duration-300 sm:h-1 ${idx === currentSlide ? 'w-10 bg-esn-cyan sm:w-16' : 'w-5 bg-white/40 group-hover:bg-white sm:w-8 sm:bg-white/30'}`} />
                  <span className="absolute -top-4 left-0 hidden text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100 sm:inline">0{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Scroll Down — desktop only, centred in the controls row */}
            <button
              onClick={scrollToNextSection}
              className="group absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center text-white/80 transition-all duration-300 hover:text-white lg:flex"
              aria-label="Scroll down"
            >
              <span className="mb-2 text-xs font-medium uppercase tracking-wider">Scroll</span>
              <span className="flex h-10 w-6 items-center justify-center rounded-full border-2 border-white/30">
                <span className="h-3 w-1 rounded-full bg-white/60" />
              </span>
            </button>

            {/* Arrows */}
            <div className="flex gap-2.5 sm:gap-2">
              <button
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-esn-dark active:scale-95 sm:h-12 sm:w-12 sm:active:scale-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-esn-dark active:scale-95 sm:h-12 sm:w-12 sm:active:scale-100"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
