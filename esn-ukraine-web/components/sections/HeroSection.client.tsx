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
  link: string;
}

export interface HeroSectionProps {
  slides: HeroSlide[];
}

function getTitleSizeClass(title: string): string {
  const length = title?.length || 0;
  if (length < 30) {
    return "text-4xl sm:text-5xl md:text-7xl lg:text-8xl";
  } else if (length <= 60) {
    return "text-3xl sm:text-4xl md:text-6xl lg:text-7xl";
  } else {
    return "text-2xl sm:text-3xl md:text-5xl lg:text-6xl";
  }
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  return (
    <section
      className="relative h-[100dvh] min-h-[580px] sm:h-screen w-full overflow-hidden bg-esn-dark text-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* SLIDES RENDERING */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill={true}
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* THE GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-esn-dark via-esn-dark/90 to-transparent md:bg-gradient-to-r md:from-esn-dark md:via-esn-dark/80 md:to-transparent" />
        </div>
      ))}

      {/* CONTENT CONTAINER */}
      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-12 lg:px-24 pt-20 pb-24 sm:pt-16 sm:pb-0">
          <div className="max-w-2xl">

            {/* Анімований текстовий блок */}
            <div key={currentSlide} className="animate-fade-in-up">

              {/* Meta Info */}
              <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="bg-esn-cyan px-2.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
                  {slides[currentSlide].type}
                </span>
                <span className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
                  <Calendar className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {slides[currentSlide].date}
                </span>
              </div>

              {/* Title */}
              <h1 className={`mb-4 sm:mb-6 font-sans font-black leading-tight tracking-tight text-white break-words ${getTitleSizeClass(slides[currentSlide].title)}`}>
                {slides[currentSlide].title}
              </h1>

              {/* Description */}
              <p className="mb-6 sm:mb-8 text-base sm:text-lg font-medium leading-relaxed text-gray-200 md:text-xl max-w-lg line-clamp-3 sm:line-clamp-none">
                {slides[currentSlide].description}
              </p>

              {/* CTA Button */}
              <Link
                href={slides[currentSlide].link}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 sm:px-8 sm:py-4 text-[11px] sm:text-sm font-bold uppercase tracking-widest text-esn-dark transition-all hover:bg-esn-magenta hover:text-white shadow-md w-auto max-w-fit"
              >
                Read Full Story
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-5 sm:w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* CONTROLS & NAVIGATION */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 z-30 w-full px-5 sm:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl items-end justify-between border-t border-white/20 pt-4 sm:pt-6">

          {/* Progress Indicators */}
          <div className="flex gap-2 sm:gap-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`group relative h-1 cursor-pointer transition-all duration-300 ${idx === currentSlide ? 'w-10 sm:w-16 bg-esn-cyan' : 'w-5 sm:w-8 bg-white/30 hover:bg-white'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className="absolute -top-4 left-0 text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100">0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-esn-dark"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-esn-dark"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={() => {
            const nextSection = document.querySelector('section:nth-of-type(2)');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-center text-white/80 hover:text-white transition-all duration-300"
          aria-label="Scroll down"
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
  );
}
