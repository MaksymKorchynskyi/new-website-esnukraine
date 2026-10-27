import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import UnderDevelopment from '@/components/ui/UnderDevelopment';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Buddy System',
    description:
      'Learn about the Buddy System for international students in Ukraine.',
    path: '/for-students/buddy',
  }),
  // Placeholder page: keep it out of the index until real content ships.
  robots: { index: false, follow: true },
};

export default function BuddyPage() {
    return <UnderDevelopment />;
}
