'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/this-is-esn-ukraine.mp4';

/**
 * The 6 MB promo video used to download for every visitor on page load. Now the
 * file is only requested when the block scrolls into view, plays while visible
 * and pauses off-screen. Visitors who prefer reduced motion get controls instead
 * of autoplay.
 */
export default function MissionVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceMotion(reduce);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = VIDEO_SRC;
          if (!reduce) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      controls={reduceMotion}
      aria-label="This is ESN Ukraine"
      className="w-full h-full object-cover"
    />
  );
}
