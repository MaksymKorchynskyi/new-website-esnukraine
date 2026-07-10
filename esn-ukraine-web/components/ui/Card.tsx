import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate } from "@/sanity/lib/utils";

interface BaseCardProps {
  title: string;
  imageUrl?: string | null;
  slug: string;
  type: 'news' | 'event';
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
  location?: string;
}

type CardProps = NewsCardProps | EventCardProps;

export function NewsCard({ title, imageUrl, slug, excerpt, publishedAt, category }: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`} className="group block">
      <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-esn-dark/10">
        {/* Image Section */}
        <div className="relative h-52 sm:h-64 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-esn-cyan/5">
              <span className="text-esn-cyan font-bold text-xl">ESN</span>
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 sm:px-3 text-xs font-bold uppercase tracking-wider text-esn-dark rounded-md shadow-sm z-10">
              {category}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          {/* Date */}
          {publishedAt && (
            <div className="mb-3 sm:mb-4 flex items-center text-xs sm:text-sm font-medium text-gray-400">
              <Calendar className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
              <span>{formatDate(publishedAt)}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold leading-tight text-esn-dark group-hover:text-esn-cyan transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="mb-4 sm:mb-6 flex-1 text-sm sm:text-base text-gray-500 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Read More */}
          <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-100">
            <span className="text-xs sm:text-sm font-bold text-esn-dark uppercase tracking-wide group-hover:text-esn-magenta transition-colors">
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function EventCard({ title, imageUrl, slug, description, date, location }: EventCardProps) {
  return (
    <Link href={`/events/${slug}`} className="group block">
      <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-esn-dark/10">
        {/* Image Section */}
        <div className="relative h-52 sm:h-64 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-esn-cyan/5">
              <span className="text-esn-cyan font-bold text-xl">ESN</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          {/* Date & Location */}
          <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
            {date && (
              <div className="flex items-center text-xs sm:text-sm font-medium text-gray-400">
                <Calendar className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                <span>{formatDate(date)}</span>
              </div>
            )}
            
            {location && (
              <div className="flex items-center text-xs sm:text-sm font-medium text-gray-400">
                <MapPin className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                <span>{location}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold leading-tight text-esn-dark group-hover:text-esn-cyan transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="mb-4 sm:mb-6 flex-1 text-sm sm:text-base text-gray-500 line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}

          {/* Read More */}
          <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-100">
            <span className="text-xs sm:text-sm font-bold text-esn-dark uppercase tracking-wide group-hover:text-esn-magenta transition-colors">
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
