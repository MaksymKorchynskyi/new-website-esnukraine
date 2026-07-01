import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { client } from '@/sanity/client';

// ==========================================
// INTERFACES
// ==========================================
interface SectionCard {
    _id: string;
    name: string;
    slug: string;
    city: string;
    summary: string;
    imageUrl: string | null;
    instagram: string;
    email: string;
}

// ==========================================
// DATA FETCHING
// ==========================================
async function getSections(): Promise<SectionCard[]> {
    const query = `*[_type == "section"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    city,
    summary,
    instagram,
    email,
    "imageUrl": mainImage.asset->url
  }`;
    return await client.fetch(query);
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function SectionsPage() {
    const sections = await getSections();

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-magenta/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-esn-green/10 rounded-full blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                            Our Sections
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Discover ESN sections across Ukraine. Find your local community
                            and join the international student family.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sections Grid */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-5xl">
                    {sections.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No sections available yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2">
                            {sections.map((section) => (
                                <article
                                    key={section._id}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                                >
                                    {/* Section Logo / Image */}
                                    <div className="relative w-full bg-gray-50 flex items-center justify-center p-8"
                                        style={{ minHeight: '220px' }}
                                    >
                                        {section.imageUrl ? (
                                            <Image
                                                src={section.imageUrl}
                                                alt={section.name}
                                                width={280}
                                                height={180}
                                                className="object-contain max-h-[180px] w-auto"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 rounded-full bg-esn-dark/10 flex items-center justify-center">
                                                <span className="text-esn-dark font-black text-2xl">
                                                    {section.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-2xl font-black text-esn-dark mb-2 group-hover:text-esn-cyan transition-colors text-center">
                                            {section.name}
                                        </h3>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1 line-clamp-3 text-center">
                                            {section.summary}
                                        </p>

                                        {/* Divider */}
                                        <hr className="border-gray-100 mb-4" />

                                        {/* Read More */}
                                        <Link
                                            href={`/sections/${section.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-esn-dark hover:text-esn-cyan transition-all group-hover:gap-3"
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
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
