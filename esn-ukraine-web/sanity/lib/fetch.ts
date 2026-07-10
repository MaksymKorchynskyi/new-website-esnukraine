import { client } from "./client";
import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
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
        perspective: "previewDrafts" as const,
        stega: true,
        token: process.env.SANITY_API_READ_TOKEN,
        useCdn: false,
      }
    : {
        perspective: "published" as const,
        stega: false,
        useCdn: !isDev,
      };

  return client.fetch<QueryResponse>(query, params, {
    ...queryOptions,
    next: isDraftMode || isDev
      ? { revalidate: 0 }
      : {
          revalidate: 3600,
          tags: ['sanity', ...tags], // Базовий тег 'sanity' для всіх запитів + специфічні теги
        },
  });
}
