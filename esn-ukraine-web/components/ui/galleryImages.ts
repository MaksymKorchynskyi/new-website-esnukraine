import { hasAsset, urlFor } from '@/sanity/lib/image';
import type { GalleryImage } from '@/sanity/lib/types';
import type { LightboxGalleryImage } from '@/components/ui/PhotoGalleryLightbox';

/** Maps Sanity gallery images to the thumbnail + full-size URLs the lightbox needs. */
export function buildLightboxImages(images: GalleryImage[]): LightboxGalleryImage[] {
  return images.filter(hasAsset).map((img) => ({
    _key: img._key,
    // 4:3 crop that follows the hotspot; the Sanity CDN resizes it per breakpoint
    thumbUrl: urlFor(img).width(800).height(600).fit('crop').url(),
    // Never the original: 1920px max, WebP/AVIF, q80
    fullUrl: urlFor(img).width(1920).fit('max').quality(80).url(),
    lqip: img.asset.lqip ?? undefined,
    caption: img.caption ?? undefined,
    alt: img.alt ?? undefined,
  }));
}
