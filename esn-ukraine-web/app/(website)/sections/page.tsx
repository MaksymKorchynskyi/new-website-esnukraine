import Link from 'next/link';
import { ArrowLeft, MapPin, Users, Instagram, ArrowRight } from 'lucide-react';

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface SectionPreview {
    id: string;
    slug: string;
    name: string;
    city: string;
    university: string;
    volunteersCount: number;
    description: string;
    image: string;
    instagram?: string;
    color: 'cyan' | 'magenta' | 'green' | 'dark';
}

// ==========================================
// MOCK DATA (Replace with Sanity fetch)
// ==========================================
const SECTIONS: SectionPreview[] = [
    {
        id: '1',
        slug: 'kyiv',
        name: 'ESN Kyiv',
        city: 'Kyiv',
        university: 'Taras Shevchenko National University',
        volunteersCount: 150,
        description: 'The largest section in Ukraine, based in the capital. We organize city tours, cultural events, and support hundreds of international students every semester.',
        image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&q=80&w=800',
        instagram: 'https://instagram.com/esnkyiv',
        color: 'cyan',
    },
    {
        id: '2',
        slug: 'lviv',
        name: 'ESN Lviv',
        city: 'Lviv',
        university: 'Ivan Franko National University',
        volunteersCount: 120,
        description: 'The heart of Western Ukraine! Known for the best coffee, historical architecture, and the warmest volunteers you\'ll ever meet.',
        image: 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?auto=format&fit=crop&q=80&w=800',
        instagram: 'https://instagram.com/esnlviv',
        color: 'magenta',
    },
    {
        id: '3',
        slug: 'odesa',
        name: 'ESN Odesa',
        city: 'Odesa',
        university: 'Odesa I.I. Mechnikov National University',
        volunteersCount: 80,
        description: 'The Pearl of the Black Sea! Beach parties, stunning sunsets, and a vibrant international community by the sea.',
        image: 'https://images.unsplash.com/photo-1586944382786-35a385a2dcd1?auto=format&fit=crop&q=80&w=800',
        instagram: 'https://instagram.com/esnodesa',
        color: 'green',
    },
    {
        id: '4',
        slug: 'chernivtsi',
        name: 'ESN Chernivtsi',
        city: 'Chernivtsi',
        university: 'Yuriy Fedkovych Chernivtsi National University',
        volunteersCount: 50,
        description: 'Home to one of the most beautiful university campuses in Europe. A UNESCO World Heritage site awaits you!',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        instagram: 'https://instagram.com/esnchernivtsi',
        color: 'dark',
    },
];

const COLOR_MAP = {
    cyan: 'bg-esn-cyan',
    magenta: 'bg-esn-magenta',
    green: 'bg-esn-green',
    dark: 'bg-esn-dark',
};

export default function SectionsPage() {
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
                            Local Sections
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Four cities, one family. Find your local ESN section and join
                            the international student community in Ukraine.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sections Grid */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-2">
                        {SECTIONS.map((section) => (
                            <article
                                key={section.id}
                                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={section.image}
                                        alt={section.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    {/* Color Bar */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 ${COLOR_MAP[section.color]}`} />

                                    {/* City Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white ${COLOR_MAP[section.color]}`}>
                                            <MapPin className="w-3 h-3" />
                                            {section.city}
                                        </span>
                                    </div>

                                    {/* Instagram Link */}
                                    {section.instagram && (
                                        <a
                                            href={section.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-esn-dark transition-colors"
                                        >
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    )}

                                    {/* Title Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-3xl font-black text-white mb-1">{section.name}</h3>
                                        <p className="text-sm text-gray-300">{section.university}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                            <Users className="w-4 h-4 text-esn-cyan" />
                                            {section.volunteersCount} volunteers
                                        </span>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {section.description}
                                    </p>

                                    <Link
                                        href={`/sections/${section.slug}`}
                                        className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-all group-hover:gap-3 ${section.color === 'cyan' ? 'text-esn-cyan' :
                                            section.color === 'magenta' ? 'text-esn-magenta' :
                                                section.color === 'green' ? 'text-esn-green' :
                                                    'text-esn-dark'
                                            }`}
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-esn-cyan to-esn-dark py-20 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-4xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">
                        Don't See Your City?
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        We're always looking to expand! If you want to start an ESN section
                        at your university, reach out and we'll help you get started.
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
