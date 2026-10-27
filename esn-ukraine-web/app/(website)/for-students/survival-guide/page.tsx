import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import UnderDevelopment from '@/components/ui/UnderDevelopment';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Survival Guide',
    description:
      'Everything you need to know about surviving and thriving in Ukraine as an international student.',
    path: '/for-students/survival-guide',
  }),
  // Placeholder page: keep it out of the index until real content ships.
  robots: { index: false, follow: true },
};

export default function SurvivalGuidePage() {
    return <UnderDevelopment />;
}
