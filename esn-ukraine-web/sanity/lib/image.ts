import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Image URL builder that honours the crop and hotspot set in the Studio.
 * `auto('format')` lets the Sanity CDN return WebP/AVIF; `fit('max')` never
 * upscales a small source. Call `.width()`/`.height()`/`.fit('crop')` as needed.
 */
export const urlFor = (source: SanityImageSource) =>
  builder.image(source).auto('format').fit('max')

/** Minimal image projection used across GROQ queries (see queries.ts). */
export interface ProjectedImage {
  asset?: {
    _id?: string
    _ref?: string
    url?: string
    lqip?: string | null
    dimensions?: { width: number; height: number; aspectRatio: number } | null
  } | null
  crop?: { top: number; bottom: number; left: number; right: number } | null
  hotspot?: { x: number; y: number; width?: number; height?: number } | null
  alt?: string | null
  caption?: string | null
}

/** True when the projection actually carries an asset. */
export function hasAsset<T extends ProjectedImage>(
  image?: T | null,
): image is T & { asset: NonNullable<ProjectedImage['asset']> } {
  return Boolean(image?.asset && (image.asset._id || image.asset._ref))
}

/**
 * URL of the original uploaded file (same source the production site has always
 * used). `SanityImage` then asks the Sanity CDN for the width the browser needs,
 * at the same quality (75) the Vercel optimizer used, so photos look the same.
 */
export function originalImageUrl(image?: ProjectedImage | null): string | null {
  return image?.asset?.url ?? null
}

/** CSS `object-position` from a hotspot, so `object-cover` keeps the subject visible. */
export function hotspotPosition(image?: ProjectedImage | null): string | undefined {
  if (!image?.hotspot) return undefined
  return `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
}
