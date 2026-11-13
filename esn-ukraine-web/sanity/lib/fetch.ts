import { client } from "./client";
import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

/**
 * Time-based revalidation is only a safety net: the Sanity webhook
 * (`/api/revalidate`) expires the affected tags the moment content is published.
 */
export const REVALIDATE_SECONDS = 86400; // 24 hours

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  /** Every document type the query reads (plus optional `type:slug` tags). */
  tags?: string[];
}): Promise<QueryResponse> {
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch {
    // draftMode throws outside of a request scope (e.g. inside generateStaticParams)
  }

  if (isDraftMode && !process.env.SANITY_API_READ_TOKEN) {
    console.warn("The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.");
  }

  const isDev = process.env.NODE_ENV === 'development';
  const queryOptions = isDraftMode
    ? {
        perspective: "drafts" as const,
        stega: true,
        token: process.env.SANITY_API_READ_TOKEN,
        useCdn: false,
      }
    : {
        perspective: "published" as const,
        stega: false,
        useCdn: false,
      };

  // Cache tags may only contain a limited character set
  const safeTags = tags.map(tag => tag.replace(/[^a-zA-Z0-9_\-:]/g, '-'));

  return client.fetch<QueryResponse>(query, params, {
    ...queryOptions,
    next: isDraftMode || isDev
      ? { revalidate: 0 }
      : {
          revalidate: REVALIDATE_SECONDS,
          tags: safeTags,
        },
  });
}
