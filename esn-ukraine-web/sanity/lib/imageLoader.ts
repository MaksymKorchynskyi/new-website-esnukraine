import type { ImageLoader } from 'next/image';

/**
 * next/image loader for images hosted on the Sanity CDN.
 *
 * Sanity resizes and converts images for free (it only counts as bandwidth),
 * so these never go through the Vercel Image Optimizer and its 5 000
 * transformations/month quota on the Hobby plan. `auto=format` returns
 * WebP/AVIF to browsers that accept it. A `h` already present in the URL
 * (from `urlFor(...).width().height()`) is scaled with the requested width so
 * crops keep their aspect ratio.
 */
export const sanityImageLoader: ImageLoader = ({ src, width, quality }) => {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }
  if (url.hostname !== 'cdn.sanity.io') return src;

  const currentW = Number(url.searchParams.get('w'));
  const currentH = Number(url.searchParams.get('h'));
  if (currentW && currentH) {
    url.searchParams.set('h', String(Math.round((currentH * width) / currentW)));
  }
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  url.searchParams.set('auto', 'format');
  if (!url.searchParams.has('fit')) url.searchParams.set('fit', 'max');
  return url.toString();
};

export function isSanityCdnUrl(src: string): boolean {
  return src.startsWith('https://cdn.sanity.io/');
}
