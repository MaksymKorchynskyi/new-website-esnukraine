import type { PortableTextBlock } from '@portabletext/react';
import type { ProjectedImage } from './image';

export type { ProjectedImage };

export interface AttachmentFile {
  _key: string;
  title?: string;
  description?: string;
  fileUrl: string;
  originalFilename?: string;
  mimeType?: string;
  size?: number;
}

export interface GalleryImage extends ProjectedImage {
  _key: string;
}

/** Rich text as stored in Sanity. Custom blocks are typed where they are rendered. */
export type PortableTextBody = PortableTextBlock[];

// ==========================================
// NEWS TYPES
// ==========================================
export interface NewsArticlePreview {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  image: ProjectedImage | null;
  categoryTitle: string | null;
}

export interface NewsArticleDetail {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  mainImage: ProjectedImage | null;
  bannerImage: ProjectedImage | null;
  body: PortableTextBody | null;
  attachmentFiles?: AttachmentFile[] | null;
  gallery: GalleryImage[] | null;
}

// ==========================================
// EVENTS TYPES
// ==========================================
export interface EventPreview {
  _id: string;
  title: string;
  slug: string;
  date: string;
  location?: string | null;
  excerpt: string;
  image: ProjectedImage | null;
}

export interface EventDetail {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  date: string;
  publishedAt: string;
  excerpt: string;
  location?: string | null;
  categoryTitle?: string | null;
  registrationLink?: string | null;
  mainImage: ProjectedImage | null;
  bannerImage: ProjectedImage | null;
  body: PortableTextBody | null;
  attachmentFiles?: AttachmentFile[] | null;
  gallery: GalleryImage[] | null;
}

// ==========================================
// HOME PAGE TYPES
// ==========================================
export interface SpotlightItem {
  _id: string;
  _type: 'news' | 'event';
  title: string;
  slug: string;
  date?: string | null;
  publishedAt?: string | null;
  excerpt: string;
  banner: ProjectedImage | null;
}

export interface NetworkPhoto {
  id: string;
  title: string;
  slot: 'slotA' | 'slotB' | 'slotC' | string;
  image: ProjectedImage | null;
}

export interface HomePageData {
  spotlight: SpotlightItem[];
  news: NewsArticlePreview[];
  events: EventPreview[];
  photos: NetworkPhoto[];
}
