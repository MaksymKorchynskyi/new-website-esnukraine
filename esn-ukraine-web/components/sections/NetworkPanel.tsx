import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/*
 * "Our Network" on the home page: rotating photos on the left; on the right the text, sitting
 * on a large white map of Ukraine that works as its background and reaches behind the photos.
 *
 * The map is /images/ukraine-map-mask.webp — a solid silhouette of Ukraine (no oblast borders),
 * rendered from public/images/ukraine-map.svg — used as a CSS mask over a white fill. A soft
 * drop shadow (on the wrapper, so it follows the outline) lifts it off the page like paper.
 */

interface NetworkPanelProps {
  /** The rotating photo collage */
  photos: ReactNode;
}

export default function NetworkPanel({ photos }: NetworkPanelProps) {
  return (
    <div className="relative isolate grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14">
      {/* Large white map of Ukraine. Phone/tablet: behind the text, below the photos.
          Desktop: centred behind the text and reaching left behind the photos. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[4%] left-1/2 -z-10 w-[150%] -translate-x-1/2 drop-shadow-[0_14px_32px_rgba(46,49,146,0.13)] sm:w-[115%] lg:bottom-auto lg:left-auto lg:right-[-6%] lg:top-1/2 lg:w-[80%] lg:-translate-y-1/2 lg:translate-x-0"
      >
        <div
          style={{
            aspectRatio: '1400 / 937',
            backgroundColor: '#ffffff',
            WebkitMaskImage: 'url(/images/ukraine-map-mask.webp)',
            maskImage: 'url(/images/ukraine-map-mask.webp)',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        />
      </div>

      {/* Photos — above the map */}
      <div className="relative z-10">{photos}</div>

      {/* Text — sits on the white part of the map */}
      <div className="relative z-10 py-10 sm:py-14 lg:py-16 lg:pl-6 xl:pl-10">
        <div className="mx-auto max-w-md px-2 sm:max-w-lg lg:mx-0 lg:max-w-[30rem] lg:px-0">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-esn-dark sm:text-sm">Our Network</p>
          <h2 className="mb-4 text-[2rem] font-black leading-[1.08] tracking-tight text-esn-dark sm:mb-5 sm:text-5xl lg:text-[2.4rem] xl:text-5xl">
            One Family,
            <span className="mt-1 block text-esn-cyan">Growing Across Ukraine.</span>
          </h2>
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            The ESN family in Ukraine is growing bigger every year. We started with small steps, but now the spirit of mobility is spreading fast. We are actively working on opening new sections to cover every corner of Ukraine.
          </p>
          <Link
            href="/our-sections"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-esn-dark px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-esn-dark/20 transition-colors hover:bg-esn-magenta sm:mt-8 sm:text-sm"
          >
            View Our Sections
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
