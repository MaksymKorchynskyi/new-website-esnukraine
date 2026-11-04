import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  /** Large lead paragraph. Wrap key words in <span className="font-black text-esn-dark"> for emphasis. */
  lead: ReactNode;
  /** Supporting paragraph shown in the right column on desktop. */
  sub?: ReactNode;
  /** Optional call to action under the supporting paragraph. */
  action?: { href: string; label: string };
  /** Custom action element (e.g. a button that opens a popup). Used instead of `action`. */
  actionSlot?: ReactNode;
  /** Smaller title for long page names (e.g. "Upcoming Events"). */
  compactTitle?: boolean;
  backHref?: string;
  backLabel?: string;
}

/**
 * Page header for listing pages (News, Events). Same typography as Our Sections,
 * laid out in two columns so it spans the full width of the card grid below.
 */
export default function PageHero({
  title,
  lead,
  sub,
  action,
  actionSlot,
  compactTitle = false,
  backHref = '/',
  backLabel = 'Back to Home',
}: PageHeroProps) {
  return (
    <section className="pt-28 sm:pt-32 px-6 sm:px-12 lg:px-24 bg-white">
      <div className="mx-auto max-w-7xl pb-10 sm:pb-14 border-b border-gray-200">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-esn-dark transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">{backLabel}</span>
        </Link>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className={`${compactTitle ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-4xl sm:text-5xl md:text-7xl'} font-black text-esn-dark leading-[1.08] tracking-tight mb-6 sm:mb-8`}>
              {title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl leading-[1.6] text-gray-900 font-medium tracking-tight">
              {lead}
            </p>
          </div>

          {(sub || action || actionSlot) && (
            <div className="lg:col-span-4 lg:border-l lg:border-gray-200 lg:pl-10 lg:pb-2">
              {sub && (
                <p className="text-lg sm:text-xl text-gray-600 font-medium leading-[1.6]">
                  {sub}
                </p>
              )}
              {actionSlot ? (
                <div className={sub ? 'mt-6' : ''}>{actionSlot}</div>
              ) : action && (
                <Link
                  href={action.href}
                  className="mt-6 inline-flex items-center gap-2 bg-esn-dark text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-esn-magenta transition-colors duration-300 shadow-lg shadow-esn-dark/20 hover:shadow-esn-magenta/30"
                >
                  {action.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
