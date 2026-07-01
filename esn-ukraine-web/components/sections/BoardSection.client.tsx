'use client';

import { useState, useEffect } from 'react';
import { Maximize2, X } from 'lucide-react';

export interface BoardMemberItem {
    _id: string;
    name: string;
    position: string;
    category: string;
    order?: number;
    description?: string;
    section?: string;
    email?: string;
    linkedin?: string;
    imageUrl: string;
    imageAlt?: string;
}

// Fallback mock data when no items are added via Sanity admin yet
const FALLBACK_BOARD_MEMBERS: BoardMemberItem[] = [
    // The Board 2025-26
    {
        _id: 'mock-1',
        name: 'Dariia Beliaieva',
        position: 'President',
        category: 'board',
        order: 1,
        section: 'ESN Kyiv',
        description: '20 y. o. | Kyiv\nMajor: International Relations\nFavourite quote: "What we give doesn\'t always return, but what we give is always what we are."\nFun fact about me: Turned out to be the youngest National President in the network!',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Dariia Beliaieva - President',
        email: 'president@esn.org.ua',
        linkedin: 'https://linkedin.com',
    },
    {
        _id: 'mock-2',
        name: 'Danylo Ivanchyshyn',
        position: 'Vice-President for Development',
        category: 'board',
        order: 2,
        section: 'ESN Kyiv',
        description: '24 y. o. | Lviv\nMajor: IT & Economics\nFavourite quote: "Great changes begin with smallest steps."\nFun fact about me: I have visited over 20 countries with ESN.',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Danylo Ivanchyshyn - Vice-President for Development',
        email: 'vprd@esn.org.ua',
    },
    {
        _id: 'mock-3',
        name: 'Anastasiia Pasheshniak',
        position: 'Vice-President for Governance',
        category: 'board',
        order: 3,
        section: 'ESN Chernivtsi',
        description: '19 y. o. | Chernivtsi\nMajor: Law & Foreign Languages\nFavourite quote: "Fortuna favors the brave."\nFun fact about me: Passionate about international student rights and diplomacy.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Anastasiia Pasheshniak - Vice-President for Governance',
        email: 'vprg@esn.org.ua',
    },
    {
        _id: 'mock-4',
        name: 'Daryna Chernenko',
        position: 'Treasurer',
        category: 'board',
        order: 4,
        section: 'ESN Kamianets-Podilskyi',
        description: '19 y. o. | Kamianets-Podilskyi\nMajor: Economics & Finance\nFavourite quote: "Transparency is key to sustainable progress."\nFun fact about me: Ex-professional cheerleader and cheerleading national team member.',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Daryna Chernenko - Treasurer',
        email: 'treasurer@esn.org.ua',
    },

    // The Board Support 2025-26
    {
        _id: 'mock-5',
        name: 'Anastasiia Yevsikova',
        position: 'National Representative',
        category: 'support',
        order: 1,
        section: 'ESN Toretsk',
        description: '21 y. o. | Toretsk\nRepresenting ESN Ukraine on the international level at Council of National Representatives.',
        imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Anastasiia Yevsikova - National Representative',
        email: 'nr@esn.org.ua',
    },
    {
        _id: 'mock-6',
        name: 'Zoriana Hryza',
        position: 'Communication Manager',
        category: 'support',
        order: 2,
        section: 'ESN Lviv',
        description: '20 y. o. | Lviv\nMajor: International Relations\nFavourite quote: "Everything in its own time."\nFun fact about me: Passionate graphic designer and social media strategist.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Zoriana Hryza - Communication Manager',
        email: 'communication@esn.org.ua',
    },
    {
        _id: 'mock-7',
        name: 'Oleksandra Olkhovska',
        position: 'Secretary',
        category: 'support',
        order: 3,
        section: 'ESN Pavlohrad',
        description: '22 y. o. | Pavlohrad\nKeeping administration smooth and organized across all national working groups.',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Oleksandra Olkhovska - Secretary',
    },
    {
        _id: 'mock-8',
        name: 'Viktoriia Kharkhardina',
        position: 'HR Manager',
        category: 'support',
        order: 4,
        section: 'ESN Kyiv',
        description: '20 y. o. | Kyiv\nManaging recruitment, engagement, and team culture within ESN Ukraine.',
        imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Viktoriia Kharkhardina - HR Manager',
    },
    {
        _id: 'mock-9',
        name: 'Veronika Yashnova',
        position: 'Project Manager',
        category: 'support',
        order: 5,
        section: 'ESN Chernivtsi',
        description: '22 y. o. | Chernivtsi\nLeading national initiatives and collaborative international projects.',
        imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Veronika Yashnova - Project Manager',
    },
    {
        _id: 'mock-10',
        name: 'Daryna Aihars',
        position: 'National Event Coordinator',
        category: 'support',
        order: 6,
        section: 'ESN Kryvyi Rih',
        description: '20 y. o. | Kryvyi Rih\nOrganizing impactful national platforms, training events, and community gatherings.',
        imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Daryna Aihars - National Event Coordinator',
    },
    {
        _id: 'mock-11',
        name: 'Kateryna Plokhotniuk',
        position: 'Partnership Manager',
        category: 'support',
        order: 7,
        section: 'ESN Odesa',
        description: '21 y. o. | Odesa\nBuilding sustainable partnerships with sponsors, universities, and youth organizations.',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Kateryna Plokhotniuk - Partnership Manager',
    },
    {
        _id: 'mock-12',
        name: 'Anna Melekh',
        position: 'Education Officer',
        category: 'support',
        order: 8,
        section: 'ESN Sambir',
        description: '22 y. o. | Sambir\nAdvocating for educational reforms and quality student mobility experiences.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Anna Melekh - Education Officer',
    },
    {
        _id: 'mock-13',
        name: 'Maxym Korchynskyi',
        position: 'Web Master',
        category: 'support',
        order: 9,
        section: 'ESN Lviv',
        description: '19 y. o. | Lviv\nMajor: Computer Science\nFavourite quote: "Borders exist only to show how small our world was yesterday."\nFun fact about me: I can play 5 wind instruments.',
        imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Maxym Korchynskyi - Web Master',
        email: 'webmaster@esn.org.ua',
    },

    // The Audit Board & Advisory Council
    {
        _id: 'mock-14',
        name: 'Pavlo Garadzhii',
        position: 'Advisory Council Member',
        category: 'audit',
        order: 1,
        section: 'ESN Chernivtsi',
        description: '24 y. o. | Chernivtsi\nProviding institutional knowledge and strategic advice to the National Board.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Pavlo Garadzhii - Advisory Council Member',
    },
    {
        _id: 'mock-15',
        name: 'Valerii Kholoimov',
        position: 'Advisory Council Member',
        category: 'audit',
        order: 2,
        section: 'ESN Kyiv',
        description: 'Former National Board member mentoring current leadership and supporting network growth.',
        imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Valerii Kholoimov - Advisory Council Member',
    },
    {
        _id: 'mock-16',
        name: 'Olha Pukalska',
        position: 'Main Auditor',
        category: 'audit',
        order: 3,
        section: 'ESN Ternopil',
        description: '20 y. o. | Ternopil\nEnsuring compliance with statutory rules and monitoring national decisions.',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Olha Pukalska - Main Auditor',
    },
    {
        _id: 'mock-17',
        name: 'Kyrylo Peletskyi',
        position: 'Financial Auditor',
        category: 'audit',
        order: 4,
        section: 'ESN Lviv',
        description: 'Monitoring national budget performance and inspecting financial transactions.',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=750',
        imageAlt: 'Kyrylo Peletskyi - Financial Auditor',
    },
];

interface BoardSectionProps {
    members: BoardMemberItem[];
}

interface GroupConfig {
    key: string;
    title: string;
}

const GROUPS: GroupConfig[] = [
    { key: 'board', title: 'The Board 2025-26' },
    { key: 'support', title: 'The Board Support 2025-26' },
    { key: 'audit', title: 'The Audit Board & Advisory Council' },
];

export default function BoardSection({ members }: BoardSectionProps) {
    const [selectedMember, setSelectedMember] = useState<BoardMemberItem | null>(null);

    // Use CMS members if uploaded, otherwise use fallback mock data so page is never empty
    const displayMembers = members && members.length > 0 ? members : FALLBACK_BOARD_MEMBERS;

    // Handle ESC key and scroll locking when modal is open
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedMember(null);
        };
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedMember]);

    // Helper to group members
    const getMembersForGroup = (groupKey: string) => {
        return displayMembers.filter((m) => {
            if (groupKey === 'board') return m.category === 'board' || !m.category;
            return m.category === groupKey;
        });
    };

    return (
        <section className="py-20 px-6 sm:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl space-y-20">
                {GROUPS.map((group) => {
                    const groupMembers = getMembersForGroup(group.key);
                    if (groupMembers.length === 0) return null;

                    return (
                        <div key={group.key} className="space-y-8">
                            {/* Section Header styled as vertical line with title */}
                            <div className="flex items-center gap-3.5">
                                <div className="w-1.5 h-8 bg-esn-cyan rounded-full shadow-sm" />
                                <h2 className="text-2xl sm:text-3xl font-black text-esn-dark tracking-tight">
                                    {group.title}
                                </h2>
                            </div>

                            {/* Portrait / Oblong Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                                {groupMembers.map((member) => (
                                    <button
                                        key={member._id}
                                        onClick={() => setSelectedMember(member)}
                                        className="group relative bg-gray-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-esn-cyan text-left cursor-pointer hover:-translate-y-1"
                                    >
                                        {/* Portrait / Oblong Image Container (4:5 ratio) */}
                                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                                            <img
                                                src={member.imageUrl}
                                                alt={member.imageAlt || `${member.name} - ${member.position}`}
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                            />

                                            {/* Compact zoom icon at the corner of the photo on hover */}
                                            <div className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 text-esn-dark flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-md hover:bg-esn-cyan hover:text-white">
                                                <Maximize2 className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox / Modal View */}
            {selectedMember && (
                <div
                    className="fixed inset-0 z-50 bg-esn-dark/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
                    onClick={() => setSelectedMember(null)}
                >
                    {/* Inline-block wrapper fitting exact image dimensions without black bars */}
                    <div
                        className="relative inline-block w-auto max-w-[90vw] max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-transparent shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-esn-magenta text-white transition-colors flex items-center justify-center backdrop-blur-md shadow-lg"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Enlarged Photo fitting perfectly without side bars */}
                        <div className="group relative flex items-center justify-center bg-transparent overflow-hidden rounded-2xl sm:rounded-3xl">
                            <img
                                src={selectedMember.imageUrl}
                                alt={selectedMember.imageAlt || `${selectedMember.name} - ${selectedMember.position}`}
                                className="block w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain rounded-2xl sm:rounded-3xl"
                            />

                            {/* Description slides up only on hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-b-2xl sm:rounded-b-3xl pointer-events-none">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                                    {selectedMember.name} <span className="font-normal text-white/80 text-base sm:text-lg lg:text-xl ml-1">({selectedMember.position})</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
