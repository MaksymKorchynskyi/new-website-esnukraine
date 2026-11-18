import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import SanityImage from "@/components/ui/SanityImage";
import { formatDate } from "@/sanity/lib/utils";

interface BaseCardProps {
  title: string;
  /** Original Sanity image URL (resized by the Sanity CDN via SanityImage) */
  imageUrl?: string | null;
  /** Sanity LQIP blur placeholder */
  imageLqip?: string | null;
  slug: string;
  type: 'news' | 'event';
  /** Set on the first row of a grid so the LCP image is not lazy-loaded */
  priority?: boolean;
  className?: string;
}

interface NewsCardProps extends BaseCardProps {
  type: 'news';
  excerpt?: string | null;
  publishedAt?: string;
  category?: string | null;
}

interface EventCardProps extends BaseCardProps {
  type: 'event';
  description?: string | null;
  date?: string;
  location?: string | null;
}

const CARD_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

function CardImage({ imageUrl, imageLqip, priority }: Pick<BaseCardProps, 'imageUrl' | 'imageLqip' | 'priority'>) {
  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-full bg-esn-cyan/5">
        <span className="text-esn-cyan font-bold text-xl">ESN</span>
      </div>
    );
  }
  return (
    <SanityImage
      src={imageUrl}
      // The title is already the link text: an empty alt avoids reading it twice
      alt=""
      fill
      priority={priority}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      sizes={CARD_SIZES}
      placeholder={imageLqip ? 'blur' : 'empty'}
      blurDataURL={imageLqip ?? undefined}
    />
  );
}

export function NewsCard({ title, imageUrl, imageLqip, slug, excerpt, publishedAt, category, priority }: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`} className="group block" aria-label={`Read more: ${title}`}>
      <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 sm:border-gray-100 shadow-md sm:shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-esn-dark/10">
        {/* Image Section */}
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <CardImage imageUrl={imageUrl} imageLqip={imageLqip} priority={priority} />

          {/* Category Badge */}
          {category && (
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 sm:px-3 text-xs font-bold uppercase tracking-wider text-esn-dark rounded-md shadow-sm z-10">
              {category}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div className="flex-1 mb-4 sm:mb-6">
            {/* Date */}
            {publishedAt && (
              <div className="mb-3 sm:mb-4 flex items-center text-xs sm:text-sm font-medium text-gray-500">
                <Calendar className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
              </div>
            )}

            {/* Title */}
            <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold leading-tight text-esn-dark group-hover:text-esn-cyan transition-colors break-words">
              {title}
            </h2>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-sm sm:text-base text-gray-600 sm:text-gray-500 line-clamp-3 leading-relaxed break-words">
                {excerpt}
              </p>
            )}
          </div>

          {/* Read More */}
          <div className="pt-4 sm:pt-6 border-t border-gray-100 shrink-0">
            <span className="text-xs sm:text-sm font-bold text-esn-dark uppercase tracking-wide group-hover:text-esn-magenta transition-colors block" aria-hidden="true">
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function EventCard({ title, imageUrl, imageLqip, slug, description, date, location, priority }: EventCardProps) {
  return (
    <Link href={`/events/${slug}`} className="group block" aria-label={`Read more: ${title}`}>
      <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 sm:border-gray-100 shadow-md sm:shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-esn-dark/10">
        {/* Image Section */}
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <CardImage imageUrl={imageUrl} imageLqip={imageLqip} priority={priority} />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div className="flex-1 mb-4 sm:mb-6">
            {/* Date & Location */}
            <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
              {date && (
                <div className="flex items-center text-xs sm:text-sm font-medium text-gray-500">
                  <Calendar className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                  <time dateTime={date}>{formatDate(date)}</time>
                </div>
              )}

              {location && (
                <div className="flex items-center text-xs sm:text-sm font-medium text-gray-500">
                  <MapPin className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold leading-tight text-esn-dark group-hover:text-esn-cyan transition-colors break-words">
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p className="text-sm sm:text-base text-gray-600 sm:text-gray-500 line-clamp-3 leading-relaxed break-words">
                {description}
              </p>
            )}
          </div>

          {/* Read More */}
          <div className="pt-4 sm:pt-6 border-t border-gray-100 shrink-0">
            <span className="text-xs sm:text-sm font-bold text-esn-dark uppercase tracking-wide group-hover:text-esn-magenta transition-colors block" aria-hidden="true">
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
