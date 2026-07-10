import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/fetch';
import { groq } from 'next-sanity';
import BoardSection, { BoardMemberItem } from '@/components/sections/BoardSection.client';

// ==========================================
// DATA FETCHING FROM SANITY CMS
// ==========================================
async function getBoardMembers(): Promise<BoardMemberItem[]> {
    const query = groq`*[_type == "boardMember"] | order(order asc, name asc) {
        _id,
        name,
        position,
        category,
        order,
        description,
        section,
        email,
        linkedin,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt
    }`;
    return await sanityFetch<BoardMemberItem[]>({ query, tags: ['boardMember'] });
}

export default async function BoardPage() {
    const members = await getBoardMembers();

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-cyan/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-esn-magenta/10 rounded-full blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            National Board
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Meet the passionate volunteers who lead ESN Ukraine. Our board members
                            work tirelessly to support student mobility and create unforgettable experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Board Members Grid Section */}
            <BoardSection members={members} />
        </main>
    );
}
