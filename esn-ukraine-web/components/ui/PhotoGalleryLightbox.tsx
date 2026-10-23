"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ==========================================
// TYPES
// ==========================================
export interface LightboxGalleryImage {
  _key: string;
  /** Thumbnail URL (pre-built on server, typically 800w) */
  thumbUrl: string;
  /** Full-res URL (pre-built on server, typically 1920w) */
  fullUrl: string;
  /** LQIP blur data URL from Sanity metadata */
  lqip?: string;
  /** Optional caption */
  caption?: string;
}

interface PhotoGalleryLightboxProps {
  images: LightboxGalleryImage[];
}

// ==========================================
// LIGHTBOX OVERLAY
// ==========================================
function LightboxOverlay({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: LightboxGalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Touch / swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart === null) return;
        const diff = e.changedTouches[0].clientX - touchStart;
        if (Math.abs(diff) > 60) {
          diff > 0 ? onPrev() : onNext();
        }
        setTouchStart(null);
      }}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-esn-magenta text-white transition-colors flex items-center justify-center backdrop-blur-md shadow-lg"
        aria-label="Закрити"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-white/70 text-sm font-medium tabular-nums">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors flex items-center justify-center backdrop-blur-md"
          aria-label="Попереднє фото"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors flex items-center justify-center backdrop-blur-md"
          aria-label="Наступне фото"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Image container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative inline-block max-w-[92vw] max-h-[85dvh] rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Use native img for lightbox – no Next.js Image layout constraints */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.fullUrl}
            alt={image.caption || `Фото ${currentIndex + 1}`}
            className="block w-auto h-auto max-w-[92vw] max-h-[85dvh] object-contain rounded-2xl select-none"
            draggable={false}
          />

          {/* Caption overlay */}
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12 rounded-b-2xl">
              <p className="text-white text-sm sm:text-base font-medium">
                {image.caption}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ==========================================
// MAIN GALLERY COMPONENT
// ==========================================
export default function PhotoGalleryLightbox({
  images,
}: PhotoGalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => {
    setSelectedIndex(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-gray-50">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1.5 h-8 bg-esn-cyan rounded-full shadow-sm" />
          <h2 className="text-2xl md:text-3xl font-black text-esn-dark tracking-tight">
            Photo Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <figure
              key={img._key || idx}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Відкрити фото ${idx + 1}${img.caption ? `: ${img.caption}` : ""}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(idx);
                }
              }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={img.thumbUrl}
                  alt={img.caption || `Фото ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder={img.lqip ? "blur" : "empty"}
                  blurDataURL={img.lqip}
                />

                {/* Zoom icon overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-esn-dark flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {img.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-black/0 p-4 pt-10 opacity-100">
                  <p className="text-white text-sm font-medium">
                    {img.caption}
                  </p>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <LightboxOverlay
            images={images}
            currentIndex={selectedIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
