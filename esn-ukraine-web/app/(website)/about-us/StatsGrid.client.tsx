'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  color: string;
}

/* ── Animated Counter ── */
function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const numMatch = value.match(/[\d,.]+/);
  const num = numMatch ? parseFloat(numMatch[0].replace(/,/g, '')) : 0;
  const prefix = numMatch ? value.substring(0, numMatch.index) : '';
  const suffix = numMatch ? value.substring(numMatch.index! + numMatch[0].length) : value;

  // Starts at the final value: the server-rendered HTML (and search engines) show
  // "200+" rather than "0+". The count-up only plays once the card is on screen.
  const [count, setCount] = useState(num);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const frame = useRef<number | null>(null);

  const startAnimation = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(num);
      return;
    }
    setIsAnimating(true);
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(num * easeOut);
      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
      } else {
        setCount(num);
        setIsAnimating(false);
      }
    };
    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
    // startAnimation only reads `num`/`duration`, which are derived from the props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, duration]);

  const isFloat = num % 1 !== 0;
  const displayCount = isFloat ? count.toFixed(1) : Math.floor(count);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ${isAnimating ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
      onClick={(e) => {
        e.stopPropagation();
        if (!isAnimating) startAnimation();
      }}
      title="Click to recount!"
    >
      {prefix}{displayCount}{suffix}
    </span>
  );
}

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`reveal reveal-d${Math.min(i + 1, 3)} text-center py-8 px-4 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 cursor-pointer group`}
          onClick={(e) => {
            const span = e.currentTarget.querySelector('span');
            if (span) span.click();
          }}
        >
          <div className={`text-4xl sm:text-5xl font-black mb-3 ${stat.color}`}>
            <AnimatedCounter value={stat.value} />
          </div>
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
