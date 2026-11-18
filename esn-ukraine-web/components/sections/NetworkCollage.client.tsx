'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import SanityImage from '@/components/ui/SanityImage';

export interface VolunteerPhotoItem {
  id: string;
  url: string;
  alt: string;
  lqip?: string;
}

interface NetworkCollageProps {
  photosSlotA?: VolunteerPhotoItem[];
  photosSlotB?: VolunteerPhotoItem[];
  photosSlotC?: VolunteerPhotoItem[];
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function PhotoSlot({
  photos,
  intervalMs = 5000,
  className = '',
  active,
}: {
  photos: VolunteerPhotoItem[];
  intervalMs?: number;
  className?: string;
  /** false while the collage is off-screen or the visitor prefers reduced motion */
  active: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Збільшується при кліку, щоб перезапустити таймер автоперемикання
  const [clicks, setClicks] = useState(0);
  const canSwitch = photos.length > 1;

  useEffect(() => {
    if (photos.length <= 1 || !active) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [photos.length, intervalMs, clicks, active]);

  if (!photos.length) return null;
  const currentPhoto = photos[currentIndex % photos.length];

  // Клік показує наступне фото і починає відлік до автоперемикання заново
  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setClicks((c) => c + 1);
  };

  return (
    <div
      role={canSwitch ? 'button' : undefined}
      tabIndex={canSwitch ? 0 : undefined}
      aria-label={canSwitch ? 'Show next photo' : undefined}
      onClick={canSwitch ? showNext : undefined}
      onKeyDown={
        canSwitch
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showNext();
              }
            }
          : undefined
      }
      className={`relative overflow-hidden rounded-xl shadow-lg transition duration-300 hover:shadow-xl bg-gray-200 ${
        canSwitch
          ? 'cursor-pointer select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esn-cyan focus-visible:ring-offset-2'
          : ''
      } ${className}`}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentPhoto.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full"
        >
          <SanityImage
            src={currentPhoto.url}
            alt={currentPhoto.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            placeholder={currentPhoto.lqip ? 'blur' : 'empty'}
            blurDataURL={currentPhoto.lqip}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function NetworkCollage({
  photosSlotA = [],
  photosSlotB = [],
  photosSlotC = [],
}: NetworkCollageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );

  // The photos only rotate while the collage is on screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (photosSlotA.length + photosSlotB.length + photosSlotC.length === 0) return null;

  const active = inView && !reduceMotion;

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className="relative grid grid-cols-2 gap-3 sm:gap-4">
        {/* Ліва колонка (2 фото) */}
        <div className="space-y-3 sm:space-y-4">
          <PhotoSlot
            photos={photosSlotA}
            intervalMs={4500} // Зміна кожні 4.5с
            className="h-44 sm:h-64 w-full"
            active={active}
          />
          <PhotoSlot
            photos={photosSlotB}
            intervalMs={6000} // Зміна кожні 6.0с
            className="h-32 sm:h-48 w-full"
            active={active}
          />
        </div>

        {/* Права колонка (1 високе фото) */}
        <div className="pt-6 sm:pt-8">
          <PhotoSlot
            photos={photosSlotC}
            intervalMs={5200} // Зміна кожні 5.2с
            className="h-full w-full min-h-[220px] sm:min-h-[300px]"
            active={active}
          />
        </div>

        {/* Декоративні розмиті плями на фоні */}
        <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 bg-esn-magenta/20 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 bg-esn-cyan/20 rounded-full blur-2xl" aria-hidden="true" />
      </div>
    </MotionConfig>
  );
}
