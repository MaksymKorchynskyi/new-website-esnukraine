'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import EsnStarOutline from '@/components/ui/EsnStarOutline';

export interface HeroSlide {
  id: string | number;
  type: string;
  date: string;
  title: string;
  description: string;
  image: string;
  /** Tiny base64 preview (Sanity LQIP) — shown as a blurred placeholder while the photo loads */
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

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/*
 * Hero backdrops — blues only (no magenta/violet), built around ESN blue #2E3192, the colour of
 * the previous full-photo banner and of the site's headings and buttons. Static CSS gradients,
 * no blur filters, so they cost nothing to render.
 */

/**
 * Tablets: ESN blue stays the dominant colour, with a cyan glow top-right, a soft light
 * top-left and only a gentle deepening towards the bottom-right corner.
 */
const HERO_BACKDROP =
  'radial-gradient(ellipse 65% 50% at 100% 0%, rgba(0,174,239,0.24), transparent 65%),' +
  'radial-gradient(ellipse 55% 45% at 0% 0%, rgba(255,255,255,0.08), transparent 60%),' +
  'linear-gradient(135deg, #3236A0 0%, #2E3192 45%, #282B86 80%, #232677 100%)';

/**
 * Desktops: deeper and more layered (static).
 *  - a bright ESN-blue light source top-left that falls off into deep navy bottom-right
 *  - a soft diagonal light beam across the banner
 *  - a blue halo behind the photo card so it floats off the background
 *  - a cyan glow top-right and a faint cyan reflection bottom-left
 *  - a navy vignette along the bottom that grounds the controls row
 */
const HERO_BACKDROP_DESKTOP =
  'radial-gradient(ellipse 36% 46% at 70% 50%, rgba(60,130,240,0.34), transparent 70%),' +
  'radial-gradient(ellipse 48% 55% at 100% 0%, rgba(0,174,239,0.34), transparent 65%),' +
  'radial-gradient(ellipse 35% 40% at 0% 100%, rgba(0,174,239,0.10), transparent 70%),' +
  'radial-gradient(ellipse 55% 60% at 8% 0%, rgba(78,84,210,0.55), transparent 70%),' +
  'linear-gradient(115deg, transparent 28%, rgba(255,255,255,0.045) 42%, transparent 56%),' +
  'linear-gradient(to top, rgba(14,16,50,0.5), transparent 32%),' +
  'linear-gradient(125deg, #2E3192 0%, #2A2D8C 30%, #222579 58%, #1A1C5C 82%, #15174A 100%)';

/**
 * Phones: the same family, top-to-bottom to suit the tall screen. Kept close to ESN blue —
 * not dark — so the hero matches the rest of the site.
 */
const HERO_BACKDROP_PHONE =
  'radial-gradient(ellipse 90% 35% at 100% 0%, rgba(0,174,239,0.20), transparent 70%),' +
  'radial-gradient(ellipse 80% 30% at 0% 45%, rgba(255,255,255,0.05), transparent 70%),' +
  'linear-gradient(180deg, #30349A 0%, #2E3192 40%, #2A2D8A 75%, #25287D 100%)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const count = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  // Slides whose photo has been requested. Starts with the first and the next one, grows as the
  // visitor moves through the slider and never shrinks — so nothing is downloaded before it is
  // about to be shown, and going back never re-downloads or flashes.
  const [mounted, setMounted] = useState<ReadonlySet<number>>(() => new Set([0, 1]));
  const sectionRef = useRef<HTMLElement>(null);
  // Touch positions live in refs: storing them in state re-rendered the whole hero on every touchmove
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );

  const goTo = useCallback(
    (index: number) => {
      const target = (index + count) % count;
      const upcoming = (target + 1) % count;
      setCurrentSlide(target);
      setMounted((prev) =>
        prev.has(target) && prev.has(upcoming) ? prev : new Set([...prev, target, upcoming]),
      );
    },
    [count],
  );

  // Autoplay: one timer per slide, so manual navigation restarts the countdown.
  // Paused on mouse hover, when the hero is scrolled out of view, and for reduced-motion users.
  const autoplay = count > 1 && !isHovered && isInView && !reduceMotion;
  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => goTo(currentSlide + 1), 6000);
    return () => clearTimeout(timer);
  }, [autoplay, currentSlide, goTo]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => goTo(currentSlide + 1);
  const prevSlide = () => goTo(currentSlide - 1);
  const upNextIndex = (currentSlide + 1) % count;
  const upNext = slides[upNextIndex];

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.targetTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    touchEnd.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.targetTouches[0];
    touchEnd.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = () => {
    const start = touchStart.current;
    const end = touchEnd.current;
    if (!start || !end) return;
    const deltaX = start.x - end.x;
    const deltaY = start.y - end.y;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      goTo(currentSlide + (deltaX > 0 ? 1 : -1));
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
   * Layout idea: the sharp photo only ever fills a bounded card, never the whole screen,
   * so even a 1280px photo stays crisp on phones, tablets and 4K/retina desktops alike.
   * The background is a gradient in the site's own blues (see HERO_BACKDROP).
   */
  return (
    <section
      ref={sectionRef}
      // lg: as tall as the LARGEST of the viewport units, plus 2px. Safari on macOS showed a
      // thin white line of the next section under a 100svh hero (its svh can come out a few px
      // short of the visible height), so take whichever unit is biggest and run 2px past it.
      className="relative w-full overflow-hidden bg-esn-dark pt-[77px] text-white sm:pt-[84px] lg:h-[calc(max(100vh,100dvh,100svh)+2px)] lg:min-h-[680px]"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setIsHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Brand gradient backdrop — static CSS gradients, no blur filters.
          Phones get a deeper, vertical version of it; tablets and desktops the diagonal one. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{ backgroundImage: HERO_BACKDROP_PHONE }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block lg:hidden"
        style={{ backgroundImage: HERO_BACKDROP }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ backgroundImage: HERO_BACKDROP_DESKTOP }}
      />

      {/* Large ESN star outline — barely visible, cropped by the banner edge, behind the photo.
          Its hub (the octagon) always stays in view so the shape reads as the ESN logo:
          Phone: large, behind the text, bottom-right · Tablet: bottom-right corner, low down by
          the slider controls · Desktop: large, centred behind the photo card, taller than the
          banner, with the arms running off the right edge. Static SVG, no cost. */}
      <EsnStarOutline className="pointer-events-none absolute -bottom-[12%] -right-[40%] aspect-square w-[105%] rotate-[-8deg] md:-bottom-[30%] md:-right-[18%] md:w-[60%] lg:bottom-auto lg:right-[-12%] lg:top-1/2 lg:h-[118%] lg:w-auto lg:-translate-y-1/2" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col lg:px-16 xl:px-24">
        {/* Desktop: the photo and text are centred in the visible space between the header
            (already excluded by the section's top padding) and the controls divider line.
            The controls row is absolutely placed; its divider sits 113px above the bottom
            (pt-6 + 48px arrows + pb-10 + 1px border), so the bottom padding = 113px + the same
            40px breathing room as the top. */}
        <div className="flex-1 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-[153px] lg:pt-10 xl:gap-16">

          {/* ─── PHOTO CARD ─── */}
          {/* Mobile: edge-to-edge 4:3. Tablet: rounded 16:9 card. Desktop: 3:2 card on the right, max 680px wide */}
          <div className="relative md:px-12 md:pt-8 lg:order-2 lg:col-span-6 lg:flex lg:justify-end lg:px-0 lg:pt-0">
            <div className="relative w-full lg:max-w-[640px] xl:max-w-[680px]">
              {/* ─── CARD STACK — tablet & desktop: the next story peeks out from behind the
                  photo, with one more blank card behind it, so it's clear there are more
                  stories. Clicking the stack opens the next one; on hover it fans out a little.
                  The cards are scaled down and shifted right (translate % is of the card's own
                  width), so a slim strip of each shows past the photo's right edge. ─── */}
              {count > 1 && (
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label={`Next story: ${upNext.title}`}
                  className="group absolute inset-0 hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esn-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-esn-dark md:block lg:rounded-3xl"
                >
                  {/* back: blank card */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-[11%] scale-[0.84] rounded-2xl bg-white/[0.07] ring-1 ring-white/15 transition-transform duration-500 ease-out group-hover:translate-x-[13%] lg:translate-x-[16%] lg:rounded-3xl lg:group-hover:translate-x-[19%]"
                  />
                  {/* middle: the next story */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-[6%] scale-[0.92] overflow-hidden rounded-2xl bg-esn-navy shadow-xl shadow-black/30 ring-1 ring-white/15 transition-transform duration-500 ease-out group-hover:translate-x-[7.5%] lg:translate-x-[8.5%] lg:rounded-3xl lg:group-hover:translate-x-[10.5%]"
                  >
                    {slides.map((slide, index) =>
                      mounted.has(index) ? (
                        <span
                          key={slide.id}
                          className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                            index === upNextIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          {/* Same src, sizes and quality as the main photo → the browser reuses
                              the file it already has, no extra download */}
                          <Image
                            src={slide.image}
                            alt=""
                            fill
                            quality={75}
                            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 45vw, 100vw"
                            className="object-cover"
                            style={{ objectPosition: slide.imagePosition ?? '50% 50%' }}
                          />
                        </span>
                      ) : null,
                    )}
                    {/* dimmed so it reads as "behind"; lifts a little on hover */}
                    <span className="absolute inset-0 bg-esn-dark/55 transition-colors duration-500 group-hover:bg-esn-dark/30" />
                  </span>
                </button>
              )}

              <div className="relative aspect-[4/3] overflow-hidden bg-white/5 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)] md:aspect-video md:[mask-image:none] md:rounded-2xl md:shadow-2xl md:shadow-black/30 md:ring-1 md:ring-white/10 lg:aspect-[3/2] lg:rounded-3xl">
                {slides.map((slide, index) => {
                  if (!mounted.has(index)) return null;
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
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
                        sizes="(min-width: 1280px) 680px, (min-width: 1024px) 45vw, 100vw"
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
                  // lg:self-center: a slide with a shorter title is centred in the shared cell
                  // (sized by the tallest slide), so its text lines up with the photo's centre
                  className={`[grid-area:1/1] lg:self-center transition-[opacity,transform,visibility] duration-700 ease-out motion-reduce:transition-none ${
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
        <div className="px-5 pb-6 pt-8 sm:px-12 sm:pb-10 lg:absolute lg:inset-x-16 lg:bottom-0 lg:px-0 xl:inset-x-24">
          {/* Dots, scroll cue and arrows all sit on one centre line */}
          <div className="relative flex items-center justify-between border-t border-white/20 pt-4 sm:pt-6">

            {/* Progress Indicators */}
            <div className="flex items-center gap-2 sm:gap-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className="group relative flex cursor-pointer items-center py-2.5 sm:py-0"
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === currentSlide}
                >
                  <span className={`h-1.5 rounded-full transition-all duration-300 sm:h-1 ${idx === currentSlide ? 'w-10 bg-esn-cyan sm:w-16' : 'w-5 bg-white/40 group-hover:bg-white sm:w-8 sm:bg-white/30'}`} />
                  <span className="absolute -top-4 left-0 hidden text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100 sm:inline">0{idx + 1}</span>
                </button>
              ))}

              {/* Counter — shows how many stories there are */}
              {count > 1 && (
                <span className="ml-1 text-xs font-bold tabular-nums tracking-widest text-white/45 sm:ml-2 sm:text-sm" aria-live="polite">
                  <span className="text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
                  <span className="mx-1.5">/</span>
                  {String(count).padStart(2, '0')}
                </span>
              )}
            </div>

            {/* Scroll Down — same placement as the previous banner: centred, 32px above the
                bottom of the screen, shown from sm up. The row ends 40px above the banner's
                bottom; on desktop the banner runs 2px below the screen, hence -6px there. */}
            <button
              onClick={scrollToNextSection}
              className="group absolute -bottom-2 left-1/2 lg:-bottom-1.5 hidden -translate-x-1/2 flex-col items-center text-white/80 transition-all duration-300 hover:text-white sm:flex"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white hover:text-esn-dark sm:h-12 sm:w-12"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white hover:text-esn-dark sm:h-12 sm:w-12"
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
