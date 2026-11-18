import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/fetch';
import { groq } from 'next-sanity';
import FormerBoardsClient, { type FormerBoardItem } from './FormerBoardsClient';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { originalImageUrl, type ProjectedImage } from '@/sanity/lib/image';
import { IMAGE_PROJECTION } from '@/sanity/lib/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Former Boards',
  description:
    'Meet the former board members of ESN Ukraine who have shaped our organization over the years.',
  path: '/about-us/former-boards',
});

// ==========================================
// DATA FETCHING FROM SANITY CMS
// ==========================================
interface FormerBoardDoc {
    _id: string;
    title: string;
    order: number;
    members: { _key: string; name: string; position: string; image: ProjectedImage | null }[] | null;
}

async function getFormerBoards(): Promise<FormerBoardItem[]> {
    const query = groq`*[_type == "formerBoard"] | order(order desc) {
        _id,
        title,
        order,
        members[]{
            _key,
            name,
            position,
            "image": image${IMAGE_PROJECTION}
        }
    }`;
    const boards = await sanityFetch<FormerBoardDoc[]>({ query, tags: ['formerBoard'] });
    return boards.map((board) => ({
        _id: board._id,
        title: board.title,
        order: board.order,
        members: (board.members ?? []).map((m) => ({
            _key: m._key,
            name: m.name,
            position: m.position,
            // Original photo, as on production
            imageUrl: originalImageUrl(m.image),
            imageLqip: m.image?.asset?.lqip ?? null,
            imageAlt: m.image?.alt ?? null,
        })),
    }));
}

export default async function FormerBoardsPage() {
    const boards = await getFormerBoards();

    return (
        <main className="min-h-svh bg-white">
            {/* Hero Section */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-cyan/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-esn-magenta/10 rounded-full blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <Link
                        href="/national-board"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to National Board</span>
                    </Link>

                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Former Boards
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Discover the past leaders of ESN Ukraine. These dedicated individuals have
                            shaped our organization and contributed to our mission over the years.
                        </p>
                    </div>
                </div>
            </section>

            {/* Former Boards Accordion List */}
            <FormerBoardsClient boards={boards} />
        </main>
    );
}
