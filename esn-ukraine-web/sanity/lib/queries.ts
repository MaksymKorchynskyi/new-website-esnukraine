import { groq } from "next-sanity";

// ==========================================
// NEWS QUERIES
// ==========================================

export const getLatestNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    "categoryTitle": category->title
  }
`;

export const getAllNewsSlugsQuery = groq`
  *[_type == "news" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const getNewsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    excerpt,
    mainImage,
    bannerImage,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->,
        "caption": caption,
        "alt": alt
      }
    },
    attachmentFiles[] {
      _key,
      title,
      description,
      "fileUrl": asset->url,
      "originalFilename": asset->originalFilename,
      "mimeType": asset->mimeType,
      "size": asset->size
    },
    gallery[] {
      _key,
      asset->,
      caption
    }
  }
`;

// ==========================================
// EVENTS QUERIES
// ==========================================

export const getLatestEventsQuery = groq`
  *[_type == "event"] | order(date desc)[0...4] {
    _id,
    title,
    slug,
    date,
    location,
    excerpt,
    "imageUrl": mainImage.asset->url,
    "categoryTitle": category->title
  }
`;

export const getAllEventsSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const getEventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    date,
    publishedAt,
    excerpt,
    location,
    "categoryTitle": category->title,
    registrationLink,
    mainImage,
    bannerImage,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->,
        "caption": caption,
        "alt": alt
      }
    },
    gallery[] {
      _key,
      asset->,
      caption
    }
  }
`;

// ==========================================
// SPOTLIGHT QUERIES
// ==========================================

export const getSpotlightItemsQuery = groq`
  *[_type in ["news", "event"] && isSpotlight == true] | order(coalesce(date, publishedAt) desc)[0...5] {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    publishedAt,
    excerpt,
    // Fall back to the card photo when no banner is set, so a slide never needs a stock image
    "bannerUrl": coalesce(bannerImage.asset->url, mainImage.asset->url),
    // Tiny blurred preview (base64) — fills the hero backdrop without needing a high-res photo
    "bannerLqip": coalesce(bannerImage.asset->metadata.lqip, mainImage.asset->metadata.lqip),
    "bannerHotspot": select(defined(bannerImage.asset) => bannerImage.hotspot, mainImage.hotspot)
  }
`;

// ==========================================
// NETWORK COLLAGE QUERIES
// ==========================================

export const getNetworkPhotosQuery = groq`
  *[_type == "networkPhoto" && defined(image.asset)] | order(slot asc, order asc) {
    "id": _id,
    title,
    slot,
    "url": image.asset->url
  }
`;
