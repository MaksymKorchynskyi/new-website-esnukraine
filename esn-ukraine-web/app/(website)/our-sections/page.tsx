import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/fetch';
import { groq } from 'next-sanity';

// ==========================================
// INTERFACES
// ==========================================
interface SectionCard {
    _id: string;
    name: string;
    city: string;
    summary: string;
    imageUrl: string | null;
    instagram: string;
}

// ==========================================
// DATA FETCHING
// ==========================================
async function getSections(): Promise<SectionCard[]> {
    const query = groq`*[_type == "section"] | order(order asc, name asc) {
    _id,
    name,
    city,
    summary,
    instagram,
    "imageUrl": mainImage.asset->url
  }`;
    return await sanityFetch<SectionCard[]>({ query, tags: ['section'] });
}

import UkraineMap from '@/components/ui/UkraineMap';

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function SectionsPage() {
    const sections = await getSections();

    return (
        <main className="min-h-svh bg-white">
            {/* ═══════ HERO ═══════ */}
            <section className="pt-28 sm:pt-32 pb-4 bg-white">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-esn-dark transition-colors mb-6 sm:mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-esn-dark leading-[1.08] tracking-tight mb-10 sm:mb-12">
                        Our Sections
                    </h1>
                    
                    <div>
                        <p className="text-xl sm:text-2xl md:text-3xl leading-[1.6] text-gray-900 font-medium tracking-tight max-w-5xl">
                            Discover <span className="font-black text-esn-dark">ESN sections</span> across Ukraine. Find your local community and join the international student family.
                        </p>
                        <div className="my-8 sm:my-10 w-full max-w-4xl h-px bg-gray-200"></div>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 sm:text-gray-700 font-medium leading-[1.6] max-w-4xl">
                            We are constantly growing to support students everywhere. Check out the map below to see where we operate.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════ INTERACTIVE MAP ═══════ */}
            <section className="pb-0 bg-white relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-0 sm:px-12 lg:px-24">
                    <div className="px-2 sm:px-10 lg:px-14">
                        <UkraineMap />
                    </div>
                </div>
            </section>

            {/* ═══════ SECTIONS GRID ═══════ */}
            <section className="pt-4 pb-14 sm:pt-8 sm:pb-24 px-6 sm:px-12 lg:px-24 bg-white">
                <div className="mx-auto max-w-7xl">
                    {sections.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl">
                            <p className="text-gray-500 text-lg">No sections available yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {sections.map((section) => (
                                <article
                                    key={section._id}
                                    id={section.city.toLowerCase()}
                                    className="group relative bg-white rounded-3xl overflow-hidden flex flex-col border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-esn-cyan/15 hover:-translate-y-2 transition-all duration-500"
                                >
                                    {/* Section Image Header */}
                                    <div className="relative w-full h-56 bg-gray-50/50 flex items-center justify-center p-8 overflow-hidden">
                                        {section.imageUrl ? (
                                            <div className="relative z-10 flex items-center justify-center w-full h-full">
                                                <Image
                                                    src={section.imageUrl}
                                                    alt={section.name}
                                                    width={360}
                                                    height={240}
                                                    className="object-contain max-h-full w-auto max-w-[85%] group-hover:scale-110 transition-transform duration-700 ease-out"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-esn-cyan/10 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-700 ease-out">
                                                <span className="text-esn-cyan font-black text-3xl">
                                                    {section.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-1 justify-between bg-white relative z-20">
                                        {/* Animated top border */}
                                        <div className="absolute top-0 left-0 right-0 h-px bg-transparent">
                                            <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-esn-cyan via-esn-magenta to-esn-green transition-all duration-700 group-hover:w-full"></div>
                                        </div>

                                        <div className="flex-1 mb-8">
                                            <h3 className="text-2xl font-black text-esn-dark mb-4 group-hover:text-esn-dark transition-colors duration-300">
                                                {section.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">
                                                {section.summary}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <div>
                                            <a
                                                href={section.instagram || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-esn-dark text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-esn-magenta transition-colors duration-300 shadow-lg shadow-esn-dark/20 hover:shadow-esn-magenta/30"
                                            >
                                                Instagram
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-esn-cyan to-esn-dark py-20 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-4xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">
                        Don&apos;t See Your City?
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        We&apos;re always looking to expand! If you want to start an ESN section
                        at your university, reach out and we&apos;ll help you get started.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark hover:bg-esn-magenta hover:text-white transition-colors"
                    >
                        Start a Section
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
