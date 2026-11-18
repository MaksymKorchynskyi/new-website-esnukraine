'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Reveal-on-scroll for elements with the `.reveal` class. The page itself stays a
 * Server Component; only this thin wrapper runs in the browser.
 */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    el.querySelectorAll('.reveal').forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <style>{`
        @media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
          .reveal {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
          }
          .reveal-d1 { transition-delay: 0.1s; }
          .reveal-d2 { transition-delay: 0.2s; }
          .reveal-d3 { transition-delay: 0.3s; }
        }
      `}</style>
      {children}
    </div>
  );
}
