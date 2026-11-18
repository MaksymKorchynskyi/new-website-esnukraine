import type { ReactNode } from 'react';
import SanityImage from '@/components/ui/SanityImage';
import { hasAsset, urlFor, type ProjectedImage } from '@/sanity/lib/image';

interface ArticleHeroImagesProps {
  mainImage: ProjectedImage | null;
  bannerImage: ProjectedImage | null;
  title: string;
  /** Text column (back link, meta, title, excerpt) */
  children: ReactNode;
}

/**
 * Shared hero body for news and event pages: decorative banner at 10% opacity
 * behind the text, featured photo on the right. Image sources, sizes and
 * quality match the production site (16:9 crops at quality 75); only the
 * featured photo gets `priority`, since it is the LCP candidate.
 */
export default function ArticleHeroImages({ mainImage, bannerImage, title, children }: ArticleHeroImagesProps) {
  const banner = hasAsset(bannerImage) ? bannerImage : hasAsset(mainImage) ? mainImage : null;
  const main = hasAsset(mainImage) ? mainImage : null;

  return (
    <>
      {banner && (
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <SanityImage
            src={urlFor(banner).width(1920).height(1080).url()}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-12 lg:px-24 grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column — Text */}
        <div className="lg:col-span-7">
          <div className="flex flex-col items-start justify-center h-full -mt-12">{children}</div>
        </div>

        {/* Right Column — Featured Image */}
        {main && (
          <div className="lg:col-span-5 max-w-md w-full relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <SanityImage
              src={urlFor(main).width(1600).height(900).url()}
              alt={main.alt || title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder={main.asset.lqip ? 'blur' : 'empty'}
              blurDataURL={main.asset.lqip ?? undefined}
            />
          </div>
        )}
      </div>
    </>
  );
}
