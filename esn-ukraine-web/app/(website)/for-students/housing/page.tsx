import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import UnderDevelopment from '@/components/ui/UnderDevelopment';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Housing for International Students',
    description:
      'Find housing resources and tips for international students coming to Ukraine.',
    path: '/for-students/housing',
  }),
  // Placeholder page: keep it out of the index until real content ships.
  robots: { index: false, follow: true },
};

export default function HousingPage() {
    return <UnderDevelopment />;
}
