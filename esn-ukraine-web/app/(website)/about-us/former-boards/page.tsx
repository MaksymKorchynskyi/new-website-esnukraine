import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/fetch';
import { groq } from 'next-sanity';
import FormerBoardsClient, { FormerBoardItem } from './FormerBoardsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Former Boards - ESN Ukraine',
    description: 'Meet the former board members of ESN Ukraine who have shaped our organization over the years.',
};

// ==========================================
// DATA FETCHING FROM SANITY CMS
// ==========================================
async function getFormerBoards(): Promise<FormerBoardItem[]> {
    const query = groq`*[_type == "formerBoard"] | order(order desc) {
        _id,
        title,
        order,
        members[]{
            _key,
            name,
            position,
            "imageUrl": image.asset->url,
            "imageAlt": image.alt
        }
    }`;
    return await sanityFetch<FormerBoardItem[]>({ query, tags: ['formerBoard'] });
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
