'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface VolunteerPhotoItem {
  id: string;
  url: string;
  alt: string;
}

interface NetworkCollageProps {
  photosSlotA?: VolunteerPhotoItem[];
  photosSlotB?: VolunteerPhotoItem[];
  photosSlotC?: VolunteerPhotoItem[];
}

// Стандартний (фоновий) набір фотографій, якщо не передано через пропси або Sanity
const DEFAULT_PHOTOS_SLOT_A: VolunteerPhotoItem[] = [
  {
    id: 'a1',
    url: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&q=80',
    alt: 'ESN Ukraine Community Event',
  },
  {
    id: 'a2',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
    alt: 'Volunteers Discussion & Planning',
  },
  {
    id: 'a3',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    alt: 'Youth Conference Gathering',
  },
];

const DEFAULT_PHOTOS_SLOT_B: VolunteerPhotoItem[] = [
  {
    id: 'b1',
    url: 'https://images.unsplash.com/photo-1526716173434-a1b560f2065d?auto=format&fit=crop&q=80',
    alt: 'ESN Student Activity',
  },
  {
    id: 'b2',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80',
    alt: 'Volunteers Group Celebration',
  },
  {
    id: 'b3',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
    alt: 'University Campus Workshop',
  },
];

const DEFAULT_PHOTOS_SLOT_C: VolunteerPhotoItem[] = [
  {
    id: 'c1',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80',
    alt: 'ESN Ukraine Network Family',
  },
  {
    id: 'c2',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
    alt: 'ESN Section Leadership Portrait',
  },
  {
    id: 'c3',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    alt: 'Active Volunteer Member',
  },
];

function PhotoSlot({
  photos,
  intervalMs = 5000,
  className = '',
}: {
  photos: VolunteerPhotoItem[];
  intervalMs?: number;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [photos.length, intervalMs]);

  if (!photos.length) return null;
  const currentPhoto = photos[currentIndex];

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl bg-gray-200 ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentPhoto.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function NetworkCollage({
  photosSlotA = DEFAULT_PHOTOS_SLOT_A,
  photosSlotB = DEFAULT_PHOTOS_SLOT_B,
  photosSlotC = DEFAULT_PHOTOS_SLOT_C,
}: NetworkCollageProps) {
  return (
    <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
      {/* Ліва колонка (2 фото) */}
      <div className="space-y-3 sm:space-y-4">
        <PhotoSlot
          photos={photosSlotA}
          intervalMs={4500} // Зміна кожні 4.5с
          className="h-44 sm:h-64 w-full"
        />
        <PhotoSlot
          photos={photosSlotB}
          intervalMs={6000} // Зміна кожні 6.0с
          className="h-32 sm:h-48 w-full"
        />
      </div>

      {/* Права колонка (1 високе фото) */}
      <div className="pt-6 sm:pt-8">
        <PhotoSlot
          photos={photosSlotC}
          intervalMs={5200} // Зміна кожні 5.2с
          className="h-full w-full min-h-[220px] sm:min-h-[300px]"
        />
      </div>

      {/* Декоративні розмиті плями на фоні */}
      <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 bg-esn-magenta/20 rounded-full blur-2xl" />
      <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 bg-esn-cyan/20 rounded-full blur-2xl" />
    </div>
  );
}
