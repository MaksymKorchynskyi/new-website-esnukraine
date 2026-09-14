'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, List } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TocItem {
  id: string;
  label: string;
}

interface PolicyPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
  tableOfContents: TocItem[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PolicyPageLayout({
  title,
  lastUpdated,
  children,
  tableOfContents,
}: PolicyPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocOpen, setTocOpen] = useState(false);

  // IntersectionObserver — highlight active ToC item based on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    tableOfContents.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [tableOfContents]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      setTocOpen(false);
    }
  }, []);

  return (
    <main className="min-h-svh bg-white text-esn-dark selection:bg-esn-cyan selection:text-white">
      {/* ======================== Hero Section ======================== */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-28 sm:pt-32 md:pt-36 pb-4 sm:pb-8 md:pb-10 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] bg-esn-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] bg-esn-magenta/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-esn-dark transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <span className="text-esn-dark font-semibold line-clamp-1">{title}</span>
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-esn-dark mb-4 break-words">
            {title}
          </h1>

          {/* Last updated */}
          <p className="text-sm text-gray-400 font-medium">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ======================== Content Section ======================== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
        {/* Mobile ToC */}
        <div className="lg:hidden mb-2 sm:mb-6">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="flex items-center gap-2 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-bold text-esn-dark hover:bg-gray-100 transition-colors"
          >
            <List className="w-4 h-4" />
            <span>Table of Contents</span>
            <ChevronDown
              className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                tocOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {tocOpen && (
            <nav className="mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <ul className="space-y-2">
                {tableOfContents.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`text-sm text-left w-full transition-colors hover:text-esn-cyan ${
                        activeSection === id
                          ? 'text-esn-cyan font-bold'
                          : 'text-gray-500'
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 min-w-0">
            <div className="prose prose-base md:prose-lg max-w-none prose-headings:font-black prose-headings:text-esn-dark prose-headings:tracking-tight prose-a:text-esn-cyan prose-a:no-underline hover:prose-a:underline prose-a:break-words prose-strong:text-esn-dark prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-table:text-sm prose-th:text-esn-dark prose-th:font-bold prose-th:bg-gray-50 prose-td:text-gray-600">
              {children}
            </div>
          </div>

          {/* Desktop Sidebar: Sticky ToC */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28">
              <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  On this page
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {tableOfContents.map(({ id, label }) => (
                      <li key={id}>
                        <button
                          onClick={() => scrollToSection(id)}
                          className={`text-sm text-left w-full py-1 transition-all duration-200 border-l-2 pl-3 ${
                            activeSection === id
                              ? 'text-esn-cyan font-bold border-esn-cyan'
                              : 'text-gray-500 hover:text-esn-dark border-transparent hover:border-gray-300'
                          }`}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
