import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // ISR + tag-based revalidation: the Next.js Data Cache is the CDN layer
  // Stega (invisible edit markers in strings) is only switched on per request in
  // Draft Mode by sanityFetch(). Enabled here it would leak into metadata and JSON-LD.
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})
