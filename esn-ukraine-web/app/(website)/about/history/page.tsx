'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, Award, Flag, Rocket } from 'lucide-react';

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface TimelineItem {
    id: string;
    year: string;
    title: string;
    description: string;
    location?: string;
    icon: 'founding' | 'growth' | 'award' | 'expansion' | 'milestone';
    highlight?: boolean;
}

// ==========================================
// MOCK DATA (Replace with Sanity fetch)
// ==========================================
const TIMELINE_ITEMS: TimelineItem[] = [
    {
        id: '1',
        year: '2019',
        title: 'ESN Ukraine Founded',
        description: 'The Erasmus Student Network Ukraine was officially established, uniting the first local sections in Kyiv and Lviv.',
        location: 'Kyiv',
        icon: 'founding',
        highlight: true,
    },
    {
        id: '2',
        year: '2020',
        title: 'First National Platform',
        description: 'Despite the pandemic, we organized our first national gathering online, connecting volunteers from across Ukraine.',
        icon: 'milestone',
    },
    {
        id: '3',
        year: '2021',
        title: 'Lviv Section Grows',
        description: 'ESN Lviv expanded its activities, hosting the first Welcome Week for international students in Western Ukraine.',
        location: 'Lviv',
        icon: 'growth',
    },
    {
        id: '4',
        year: '2022',
        title: 'Resilience in Crisis',
        description: 'Our volunteers showed incredible strength, continuing to support international students and organizing evacuation assistance.',
        icon: 'award',
        highlight: true,
    },
    {
        id: '5',
        year: '2023',
        title: 'New Sections Join',
        description: 'ESN Odesa and ESN Chernivtsi officially joined the network, expanding our reach to 4 cities.',
        location: 'Odesa & Chernivtsi',
        icon: 'expansion',
    },
    {
        id: '6',
        year: '2024',
        title: 'International Recognition',
        description: 'ESN Ukraine delegation represented at the General Assembly in Seville, strengthening our ties with the European network.',
        location: 'Seville, Spain',
        icon: 'award',
    },
    {
        id: '7',
        year: '2025',
        title: 'Looking Forward',
        description: 'With 500+ active volunteers and growing international partnerships, we continue to build the future of student mobility in Ukraine.',
        icon: 'milestone',
        highlight: true,
    },
];

const ICON_MAP = {
    founding: Flag,
    growth: Users,
    award: Award,
    expansion: MapPin,
    milestone: Rocket,
};

export default function HistoryPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-green/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-esn-cyan/10 rounded-full blur-3xl" />

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
                            History
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            From a small group of passionate students to a nationwide network.
                            Discover how ESN Ukraine has grown over the years.
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-4xl">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-esn-cyan via-esn-magenta to-esn-green md:left-1/2 md:-translate-x-1/2" />

                        {/* Timeline Items */}
                        <div className="space-y-12">
                            {TIMELINE_ITEMS.map((item, index) => {
                                const IconComponent = ICON_MAP[item.icon];
                                const isEven = index % 2 === 0;

                                return (
                                    <div
                                        key={item.id}
                                        className={`relative flex items-start gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className="absolute left-0 z-10 md:left-1/2 md:-translate-x-1/2">
                                            <div
                                                className={`flex items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg ${item.highlight
                                                    ? 'bg-esn-magenta text-white'
                                                    : 'bg-white text-esn-dark'
                                                    }`}
                                            >
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <div
                                            className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'
                                                }`}
                                        >
                                            <div
                                                className={`bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-shadow ${item.highlight
                                                    ? 'border-esn-magenta/30 bg-gradient-to-br from-white to-esn-magenta/5'
                                                    : 'border-gray-100'
                                                    }`}
                                            >
                                                {/* Year Badge */}
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${item.highlight
                                                            ? 'bg-esn-magenta text-white'
                                                            : 'bg-esn-dark/10 text-esn-dark'
                                                            }`}
                                                    >
                                                        <Calendar className="w-3 h-3" />
                                                        {item.year}
                                                    </span>
                                                    {item.location && (
                                                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                                            <MapPin className="w-3 h-3" />
                                                            {item.location}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-xl font-bold text-esn-dark mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-esn-dark py-20 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-4 text-center">
                        {[
                            { value: '6+', label: 'Years of Impact' },
                            { value: '4', label: 'Active Sections' },
                            { value: '500+', label: 'Volunteers' },
                            { value: '1000+', label: 'Students Helped' },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-white">
                                <div className="text-5xl font-black text-esn-cyan mb-2">{stat.value}</div>
                                <div className="text-sm font-medium uppercase tracking-widest text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
