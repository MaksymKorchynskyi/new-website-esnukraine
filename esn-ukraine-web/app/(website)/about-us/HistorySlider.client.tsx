'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { src: '/history_1.png', alt: 'ESN Kyiv receives candidate status, 2018' },
  { src: '/history_2.png', alt: 'Ukraine becomes a full member of ESN, Palermo 2019' },
  { src: '/history_3.jpg', alt: 'ESN Ukraine volunteers at a national assembly' },
];

export default function HistorySlider() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative group rounded-3xl overflow-hidden aspect-[4/3] bg-[#F8F9FA] shadow-sm border border-[#F3F4F6]">
      <div
        className="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {IMAGES.map((image, i) => (
          <div key={image.src} className="relative min-w-full h-full" aria-hidden={i !== current}>
            {/* Original files, as on production (no re-compression) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
          disabled={current === 0}
          aria-label="Previous photo"
          className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm backdrop-blur disabled:opacity-0 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setCurrent((prev) => Math.min(IMAGES.length - 1, prev + 1))}
          disabled={current === IMAGES.length - 1}
          aria-label="Next photo"
          className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm backdrop-blur disabled:opacity-0 transition-all"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={current === i}
            className={`transition-all rounded-full ${current === i ? 'w-6 bg-white scale-100' : 'w-2 bg-white/60 hover:bg-white/80'} h-2`}
          />
        ))}
      </div>
    </div>
  );
}
