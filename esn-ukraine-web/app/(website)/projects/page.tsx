import type { Metadata } from 'next';
import UnderDevelopment from '@/components/ui/UnderDevelopment';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
    ...buildMetadata({
        title: 'Projects',
        description:
            'Projects of ESN Ukraine for international mobility and student development. This page is coming soon.',
        path: '/projects',
    }),
    // Placeholder page: keep it out of the index until real content ships.
    robots: { index: false, follow: true },
};

export default function ProjectsPage() {
    return <UnderDevelopment />;
}
