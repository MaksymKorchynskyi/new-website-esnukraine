'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export interface PastEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface EventsSectionProps {
  events: PastEvent[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  return (
    <section className="bg-[#141B41] py-12 sm:py-16 md:py-24 overflow-hidden text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-12 lg:px-24 mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-black md:text-5xl">Moments We Shared</h2>
        <p className="mt-2 sm:mt-4 text-base sm:text-xl text-gray-400">Highlights from our past events. This is how we make memories.</p>
      </div>

      {/* Horizontal Scroll Gallery Container */}
      <div className="relative w-full">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 sm:pb-12 px-5 sm:px-12 lg:px-24 scrollbar-hide snap-x snap-mandatory" id="events-slider">
          {events.map((event) => (
            <div key={event.id} className="relative flex-none w-[82vw] sm:w-[400px] snap-center group">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-800 relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill={true}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-esn-dark via-transparent to-transparent opacity-90" />

                {/* Text Content overlay */}
                <div className="absolute bottom-0 left-0 p-5 sm:p-8 transform transition-transform duration-500 sm:translate-y-2 sm:group-hover:translate-y-0">
                  <div className="mb-1 sm:mb-2 text-esn-green font-bold text-xs sm:text-sm uppercase tracking-widest">
                    {event.date}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-1.5 sm:mb-2 leading-tight">{event.title}</h3>
                  <div className="flex items-center text-xs sm:text-sm text-esn-cyan font-bold mb-2 sm:mb-4">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> {event.location}
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3 sm:line-clamp-none">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* End Card */}
          <div className="flex-none w-[150px] sm:w-[200px] flex items-center justify-center snap-center">
            <Link href="/events" className="group flex flex-col items-center justify-center h-28 w-28 sm:h-40 sm:w-40 rounded-full border border-white/20 hover:bg-white hover:text-esn-dark transition-all">
              <span className="font-bold text-xs sm:text-base">View Archive</span>
              <ArrowRight className="mt-1.5 sm:mt-2 h-3.5 w-3.5 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
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
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white hover:text-esn-dark transition-all"
          aria-label="Previous events"
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
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white hover:text-esn-dark transition-all"
          aria-label="Next events"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
