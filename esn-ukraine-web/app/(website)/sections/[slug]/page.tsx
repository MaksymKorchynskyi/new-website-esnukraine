import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, Instagram, Send, Globe } from "lucide-react";
import { PortableText } from "@portabletext/react";

// ==========================================
// INTERFACES
// ==========================================
interface SectionPageProps {
    params: Promise<{ slug: string }>;
}

interface Section {
    _id: string;
    name: string;
    city: string;
    description: string;
    imageUrl: string | null;
    instagram?: string;
    telegram?: string;
    website?: string;
    body?: any[];
}

// ==========================================
// DATA FETCHING
// ==========================================
async function getSection(slug: string): Promise<Section | null> {
    const query = `*[_type == "section" && slug.current == $slug][0] {
    _id,
    name,
    city,
    description,
    instagram,
    telegram,
    website,
    body,
    "imageUrl": mainImage.asset->url
  }`;
    return await client.fetch(query, { slug });
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function SectionPage({ params }: SectionPageProps) {
    const { slug } = await params;
    const section = await getSection(slug);

    if (!section) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                {section.imageUrl && (
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src={section.imageUrl}
                            alt={section.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <Link
                        href="/sections"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">All Sections</span>
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-5 h-5 text-esn-cyan" />
                        <span className="text-esn-cyan font-bold">{section.city}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        {section.name}
                    </h1>

                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                        {section.description}
                    </p>
                </div>
            </section>

            {/* Featured Image */}
            {section.imageUrl && (
                <section className="relative -mt-16 z-20 px-6 sm:px-12 lg:px-24">
                    <div className="mx-auto max-w-5xl">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={section.imageUrl}
                                alt={section.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Content & Social Links */}
            <section className="py-16 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-12 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {section.body ? (
                                <div className="prose prose-lg max-w-none prose-headings:text-esn-dark prose-a:text-esn-cyan">
                                    <PortableText value={section.body} />
                                </div>
                            ) : (
                                <div className="text-gray-600 leading-relaxed">
                                    <p>
                                        {section.name} is part of the ESN Ukraine network. We're dedicated to
                                        helping international students make the most of their exchange experience
                                        in {section.city}.
                                    </p>
                                    <p className="mt-4">
                                        Join us for city tours, cultural events, parties, and trips! Follow our
                                        social media for updates on upcoming activities.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-2xl p-6 sticky top-32">
                                <h3 className="font-bold text-esn-dark mb-4">Connect with Us</h3>

                                <div className="space-y-3">
                                    {section.instagram && (
                                        <a
                                            href={section.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                                                <Instagram className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-esn-dark">Instagram</span>
                                        </a>
                                    )}

                                    {section.telegram && (
                                        <a
                                            href={section.telegram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                <Send className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-esn-dark">Telegram</span>
                                        </a>
                                    )}

                                    {section.website && (
                                        <a
                                            href={section.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-esn-cyan flex items-center justify-center text-white">
                                                <Globe className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-esn-dark">Website</span>
                                        </a>
                                    )}
                                </div>

                                <hr className="my-6 border-gray-200" />

                                <Link
                                    href="/students/buddy"
                                    className="block w-full text-center bg-esn-dark text-white font-bold py-3 px-4 rounded-xl hover:bg-esn-cyan transition-colors"
                                >
                                    Get a Buddy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-50">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-6">
                        Explore Other Sections
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        ESN Ukraine has sections in multiple cities. Find one near you!
                    </p>
                    <Link
                        href="/sections"
                        className="inline-flex items-center gap-2 bg-esn-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-cyan transition-colors"
                    >
                        View All Sections
                    </Link>
                </div>
            </section>
        </main>
    );
}
