'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, BookOpen, MapPin, Phone, Landmark, Heart, Coffee } from 'lucide-react';

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: 'arrival' | 'housing' | 'documents' | 'lifestyle' | 'emergency';
}

interface QuickLink {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: 'map' | 'phone' | 'landmark' | 'heart' | 'coffee' | 'book';
}

// ==========================================
// MOCK DATA (Replace with Sanity fetch)
// ==========================================
const FAQ_ITEMS: FAQItem[] = [
    {
        id: '1',
        question: 'How do I get from the airport to the city center?',
        answer: 'In Kyiv, the easiest way is the Sky Bus or Uber. In Lviv, take a taxi or bus #48. Your ESN buddy can help arrange a pickup if you contact them in advance!',
        category: 'arrival',
    },
    {
        id: '2',
        question: 'What documents do I need to register at the university?',
        answer: 'You\'ll typically need: passport, visa, invitation letter, insurance, and passport-sized photos. Check with your university\'s international office for the complete list.',
        category: 'documents',
    },
    {
        id: '3',
        question: 'How do I find accommodation?',
        answer: 'Most exchange students stay in university dormitories. Contact your host university\'s international office early. We can also connect you with students who rent private apartments.',
        category: 'housing',
    },
    {
        id: '4',
        question: 'Is it safe to travel around Ukraine?',
        answer: 'Large cities like Kyiv, Lviv, and Odesa are generally safe. Always check official travel advisories and stay connected with your ESN section for local updates.',
        category: 'lifestyle',
    },
    {
        id: '5',
        question: 'What should I do in an emergency?',
        answer: 'Emergency number: 112 (works for police, ambulance, fire). Save your embassy\'s contact. ESN Ukraine also has a support hotline for exchange students.',
        category: 'emergency',
    },
    {
        id: '6',
        question: 'Can I open a bank account?',
        answer: 'Yes! PrivatBank and Monobank offer accounts for foreigners. You\'ll need your passport and residence registration. Monobank has a great English app.',
        category: 'documents',
    },
    {
        id: '7',
        question: 'What\'s the best way to get around the city?',
        answer: 'Public transport is very affordable (metro, buses, trams). Get a transport card for convenience. Bolt and Uber are popular for taxis.',
        category: 'lifestyle',
    },
    {
        id: '8',
        question: 'Where can I meet other international students?',
        answer: 'Join ESN events! We organize Welcome Week, parties, trips, and cultural activities. Follow your local section on Instagram to stay updated.',
        category: 'lifestyle',
    },
];

const QUICK_LINKS: QuickLink[] = [
    {
        id: '1',
        title: 'City Maps',
        description: 'Offline maps for all major Ukrainian cities',
        href: '#',
        icon: 'map',
    },
    {
        id: '2',
        title: 'Emergency Contacts',
        description: 'Police, ambulance, embassy numbers',
        href: '#',
        icon: 'phone',
    },
    {
        id: '3',
        title: 'University Offices',
        description: 'International relations contacts',
        href: '#',
        icon: 'landmark',
    },
    {
        id: '4',
        title: 'Healthcare',
        description: 'Clinics that serve international students',
        href: '#',
        icon: 'heart',
    },
    {
        id: '5',
        title: 'Student Discounts',
        description: 'Where your ESNcard works',
        href: '/students/esncard',
        icon: 'coffee',
    },
    {
        id: '6',
        title: 'Language Resources',
        description: 'Learn basic Ukrainian phrases',
        href: '#',
        icon: 'book',
    },
];

const CATEGORY_LABELS = {
    arrival: 'Arrival',
    housing: 'Housing',
    documents: 'Documents',
    lifestyle: 'Lifestyle',
    emergency: 'Emergency',
};

const ICON_MAP = {
    map: MapPin,
    phone: Phone,
    landmark: Landmark,
    heart: Heart,
    coffee: Coffee,
    book: BookOpen,
};

export default function SurvivalGuidePage() {
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredFAQs = activeCategory
        ? FAQ_ITEMS.filter((item) => item.category === activeCategory)
        : FAQ_ITEMS;

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-cyan/10 rounded-full blur-3xl" />
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
                            Survival Guide
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Everything you need to know before and during your exchange in Ukraine.
                            From arrival tips to local life hacks.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Links Grid */}
            <section className="py-16 px-6 sm:px-12 lg:px-24 bg-gray-50">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-2xl font-black text-esn-dark mb-8">Quick Resources</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {QUICK_LINKS.map((link) => {
                            const IconComponent = ICON_MAP[link.icon];
                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    className="group flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-100 hover:border-esn-cyan hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-esn-cyan/10 text-esn-cyan group-hover:bg-esn-cyan group-hover:text-white transition-colors">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-esn-dark group-hover:text-esn-cyan transition-colors">
                                            {link.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{link.description}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600">
                            Can't find what you're looking for? Contact your local section!
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeCategory === null
                                ? 'bg-esn-dark text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeCategory === key
                                    ? 'bg-esn-dark text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Accordions */}
                    <div className="space-y-4">
                        {filteredFAQs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="font-bold text-esn-dark pr-4">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-esn-cyan flex-shrink-0 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {openFAQ === faq.id && (
                                    <div className="px-6 pb-6 animate-fade-in">
                                        <div className="pt-4 border-t border-gray-100">
                                            <span className="inline-block px-2 py-0.5 bg-esn-cyan/10 text-esn-cyan text-xs font-bold rounded mb-3">
                                                {CATEGORY_LABELS[faq.category]}
                                            </span>
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-esn-dark py-20 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-4xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">
                        Need Personal Guidance?
                    </h2>
                    <p className="text-lg text-white/80 mb-8">
                        Get matched with a local student who will help you navigate your exchange.
                    </p>
                    <Link
                        href="/students/buddy"
                        className="inline-flex items-center gap-2 bg-esn-cyan px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-esn-dark transition-colors"
                    >
                        Get a Buddy
                    </Link>
                </div>
            </section>
        </main>
    );
}
