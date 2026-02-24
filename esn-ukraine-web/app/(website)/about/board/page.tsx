'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Linkedin, Mail, ChevronDown } from 'lucide-react';

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface BoardMember {
    id: string;
    name: string;
    position: string;
    section: string;
    bio: string;
    image: string;
    linkedin?: string;
    email?: string;
}

// ==========================================
// MOCK DATA (Replace with Sanity fetch)
// ==========================================
const BOARD_MEMBERS: BoardMember[] = [
    {
        id: '1',
        name: 'Olena Kovalenko',
        position: 'President',
        section: 'ESN Kyiv',
        bio: 'Leading ESN Ukraine since 2024. Passionate about student mobility and international cooperation.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
        linkedin: 'https://linkedin.com',
        email: 'president@esn.org.ua',
    },
    {
        id: '2',
        name: 'Maksym Shevchenko',
        position: 'Vice President',
        section: 'ESN Lviv',
        bio: 'Coordinating internal affairs and supporting local sections across Ukraine.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        linkedin: 'https://linkedin.com',
        email: 'vp@esn.org.ua',
    },
    {
        id: '3',
        name: 'Anna Bondarenko',
        position: 'Treasurer',
        section: 'ESN Odesa',
        bio: 'Managing finances and ensuring transparency in all ESN Ukraine operations.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
        linkedin: 'https://linkedin.com',
    },
    {
        id: '4',
        name: 'Dmytro Petrenko',
        position: 'Communication Manager',
        section: 'ESN Kyiv',
        bio: 'Building the ESN Ukraine brand and managing all communication channels.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        email: 'communication@esn.org.ua',
    },
    {
        id: '5',
        name: 'Sofia Melnyk',
        position: 'Events Coordinator',
        section: 'ESN Chernivtsi',
        bio: 'Organizing national events and supporting local sections with their activities.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        linkedin: 'https://linkedin.com',
    },
    {
        id: '6',
        name: 'Ivan Tkachenko',
        position: 'IT Coordinator',
        section: 'ESN Lviv',
        bio: 'Maintaining digital infrastructure and developing new tech solutions for the network.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
        linkedin: 'https://linkedin.com',
        email: 'it@esn.org.ua',
    },
];

export default function BoardPage() {
    const [expandedMember, setExpandedMember] = useState<string | null>(null);

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
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                            National Board
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Meet the passionate volunteers who lead ESN Ukraine. Our board members
                            work tirelessly to support student mobility and create unforgettable experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Board Members Grid */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {BOARD_MEMBERS.map((member) => (
                            <article
                                key={member.id}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-esn-dark/80 via-transparent to-transparent" />

                                    {/* Position Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-esn-cyan px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                                            {member.position}
                                        </span>
                                    </div>

                                    {/* Name Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                        <p className="text-sm text-esn-cyan font-medium">{member.section}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <button
                                        onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                                        className="w-full flex items-center justify-between text-left"
                                    >
                                        <span className="text-sm font-bold text-esn-dark">
                                            {expandedMember === member.id ? 'Hide Bio' : 'Read Bio'}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-esn-dark transition-transform duration-300 ${expandedMember === member.id ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {expandedMember === member.id && (
                                        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                {member.bio}
                                            </p>
                                            <div className="flex gap-3">
                                                {member.linkedin && (
                                                    <a
                                                        href={member.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-esn-cyan hover:text-white transition-colors"
                                                    >
                                                        <Linkedin className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {member.email && (
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-esn-magenta hover:text-white transition-colors"
                                                    >
                                                        <Mail className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join CTA */}
            <section className="bg-gray-50 py-20 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-6">
                        Want to Join the Team?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        We're always looking for passionate volunteers to join our national board.
                        Elections happen annually at the National Platform.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-esn-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-cyan transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    );
}
