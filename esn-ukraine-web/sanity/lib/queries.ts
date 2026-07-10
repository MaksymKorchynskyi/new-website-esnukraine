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
    "bannerUrl": bannerImage.asset->url
  }
`;
