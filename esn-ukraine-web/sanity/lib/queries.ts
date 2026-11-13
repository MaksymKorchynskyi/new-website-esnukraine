import { groq } from "next-sanity";

/**
 * Narrow image projection: everything the site needs to render a photo
 * (crop/hotspot for `urlFor`, LQIP for blur placeholders, intrinsic size),
 * without dereferencing the whole asset document (palette, blurHash, …).
 */
export const IMAGE_PROJECTION = groq`{
  crop,
  hotspot,
  alt,
  caption,
  "asset": asset->{
    _id,
    url,
    "lqip": metadata.lqip,
    "dimensions": metadata.dimensions{ width, height, aspectRatio }
  }
}`;

const NEWS_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "image": mainImage${IMAGE_PROJECTION},
  "categoryTitle": category->title
`;

const EVENT_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  date,
  location,
  excerpt,
  "image": mainImage${IMAGE_PROJECTION}
`;

/** Rich text with images and galleries projected narrowly. */
const BODY_PROJECTION = groq`body[] {
  ...,
  _type == "image" => {
    ...,
    "asset": asset->{
      _id,
      url,
      "lqip": metadata.lqip,
      "dimensions": metadata.dimensions{ width, height, aspectRatio }
    }
  },
  _type == "imageGallery" => {
    ...,
    images[] ${IMAGE_PROJECTION.replace('{', '{ _key, _type,')}
  }
}`;

const ATTACHMENTS_PROJECTION = groq`attachmentFiles[] {
  _key,
  title,
  description,
  "fileUrl": asset->url,
  "originalFilename": asset->originalFilename,
  "mimeType": asset->mimeType,
  "size": asset->size
}`;

const GALLERY_PROJECTION = groq`gallery[] ${IMAGE_PROJECTION.replace('{', '{ _key,')}`;

// ==========================================
// NEWS QUERIES
// ==========================================

export const getAllNewsQuery = groq`
  *[_type == "news" && defined(slug.current)] | order(publishedAt desc) { ${NEWS_CARD_FIELDS} }
`;

export const getAllNewsSlugsQuery = groq`
  *[_type == "news" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const getNewsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage${IMAGE_PROJECTION},
    "bannerImage": bannerImage${IMAGE_PROJECTION},
    ${BODY_PROJECTION},
    ${ATTACHMENTS_PROJECTION},
    ${GALLERY_PROJECTION}
  }
`;

// ==========================================
// EVENTS QUERIES
// ==========================================

/** Past events only: an event dated in the future belongs on /upcoming-events. */
export const getAllEventsQuery = groq`
  *[_type == "event" && defined(slug.current) && dateTime(date) <= dateTime(now())] | order(date desc) { ${EVENT_CARD_FIELDS} }
`;

export const getAllEventsSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const getEventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    date,
    publishedAt,
    excerpt,
    location,
    "categoryTitle": category->title,
    registrationLink,
    "mainImage": mainImage${IMAGE_PROJECTION},
    "bannerImage": bannerImage${IMAGE_PROJECTION},
    ${BODY_PROJECTION},
    ${ATTACHMENTS_PROJECTION},
    ${GALLERY_PROJECTION}
  }
`;

// ==========================================
// HOME PAGE: one request for everything
// ==========================================

export const getHomePageQuery = groq`{
  "spotlight": *[_type in ["news", "event"] && isSpotlight == true && defined(slug.current)]
    | order(coalesce(date, publishedAt) desc)[0...5] {
      _id,
      _type,
      title,
      "slug": slug.current,
      date,
      publishedAt,
      excerpt,
      // Fall back to the card photo when no banner is set, so a slide never needs a stock image
      "banner": select(defined(bannerImage.asset) => bannerImage, mainImage)${IMAGE_PROJECTION}
    },
  "news": *[_type == "news" && defined(slug.current)] | order(publishedAt desc)[0...3] { ${NEWS_CARD_FIELDS} },
  "events": *[_type == "event" && defined(slug.current) && dateTime(date) <= dateTime(now())] | order(date desc)[0...4] { ${EVENT_CARD_FIELDS} },
  "photos": *[_type == "networkPhoto" && defined(image.asset)] | order(slot asc, order asc) {
    "id": _id,
    title,
    slot,
    "image": image${IMAGE_PROJECTION}
  }
}`;

// ==========================================
// SITEMAP / RSS
// ==========================================

export const getSitemapEntriesQuery = groq`
  *[_type in ["news", "event"] && defined(slug.current)] {
    _type,
    "slug": slug.current,
    _updatedAt
  }
`;

export const getRssItemsQuery = groq`
  *[_type == "news" && defined(slug.current)] | order(publishedAt desc)[0...30] {
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt
  }
`;
