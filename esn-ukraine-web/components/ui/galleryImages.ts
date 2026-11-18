import { hasAsset, urlFor } from '@/sanity/lib/image';
import type { GalleryImage } from '@/sanity/lib/types';
import type { LightboxGalleryImage } from '@/components/ui/PhotoGalleryLightbox';

/**
 * Maps Sanity gallery images to the URLs the lightbox needs. Same sources as
 * the production site: the thumbnail grid uses the original file (resized per
 * breakpoint by the Sanity CDN) and the full-screen view shows the original.
 */
export function buildLightboxImages(images: GalleryImage[]): LightboxGalleryImage[] {
  return images.filter(hasAsset).map((img) => {
    const original = img.asset.url ?? urlFor(img).url();
    return {
      _key: img._key,
      thumbUrl: original,
      fullUrl: original,
      lqip: img.asset.lqip ?? undefined,
      caption: img.caption ?? undefined,
      alt: img.alt ?? undefined,
    };
  });
}
