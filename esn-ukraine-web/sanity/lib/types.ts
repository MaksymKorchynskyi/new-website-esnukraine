export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
  caption?: string;
  alt?: string;
  hotspot?: { x: number; y: number };
}

export interface GalleryImage {
  _key: string;
  asset: { _ref: string; _type: "reference"; url?: string };
  caption?: string;
  hotspot?: { x: number; y: number };
}

// ==========================================
// NEWS TYPES
// ==========================================
export interface NewsArticlePreview {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  imageUrl: string | null;
  categoryTitle: string | null;
}

export interface NewsArticleDetail {
  _id: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  mainImage: SanityImage | null;
  bannerImage: SanityImage | null;
  body: any[];
  gallery: GalleryImage[] | null;
}

// ==========================================
// EVENTS TYPES
// ==========================================
export interface EventPreview {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  location?: string;
  excerpt: string;
  imageUrl: string | null;
  categoryTitle: string | null;
}

export interface EventDetail {
  _id: string;
  title: string;
  date: string;
  publishedAt: string;
  excerpt: string;
  location?: string;
  categoryTitle?: string;
  registrationLink?: string;
  mainImage: SanityImage | null;
  bannerImage: SanityImage | null;
  body: any[];
  gallery: GalleryImage[] | null;
}

// ==========================================
// SPOTLIGHT TYPES
// ==========================================
export interface SpotlightItem {
  _id: string;
  _type: "news" | "event";
  title: string;
  slug: string;
  date?: string;
  publishedAt?: string;
  excerpt: string;
  bannerUrl: string | null;
}
