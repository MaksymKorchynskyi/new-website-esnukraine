'use client';

import Image, { type ImageProps } from 'next/image';
import { isSanityCdnUrl, sanityImageLoader } from '@/sanity/lib/imageLoader';

/**
 * `next/image` for photos stored in Sanity: served and resized by the Sanity
 * CDN instead of the Vercel optimizer. Falls back to the default loader for
 * any other `src` (e.g. files in /public), so it can be used everywhere.
 */
export default function SanityImage({ alt, ...props }: ImageProps) {
  const src = typeof props.src === 'string' ? props.src : '';
  if (src && isSanityCdnUrl(src)) {
    return <Image loader={sanityImageLoader} alt={alt} {...props} />;
  }
  return <Image alt={alt} {...props} />;
}
