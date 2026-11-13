'use client';

import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { stegaClean } from 'next-sanity';
import SanityImage from '@/components/ui/SanityImage';
import { useDialog } from '@/lib/useDialog';

export interface BoardMemberItem {
    _id: string;
    name: string;
    position: string;
    category: string;
    order?: number;
    section?: string;
    /** 4:5 card crop, built on the server with urlFor */
    imageUrl: string;
    /** Larger version for the modal (max 1200px) */
    imageFullUrl: string;
    imageLqip?: string | null;
    imageAlt?: string | null;
}

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

function MemberDialog({ member, onClose }: { member: BoardMemberItem; onClose: () => void }) {
    // Scroll lock, focus trap, Escape and focus restore
    const dialogRef = useDialog<HTMLDivElement>({ open: true, onClose });

    return (
        <div
            className="fixed inset-0 z-50 bg-esn-dark/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in duration-200"
            onClick={onClose}
        >
            {/* Inline-block wrapper fitting exact image dimensions without black bars */}
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={`${member.name}, ${member.position}`}
                className="relative inline-block w-auto max-w-[90vw] max-h-[90dvh] rounded-2xl sm:rounded-3xl overflow-hidden bg-transparent shadow-2xl duration-200 outline-none"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-esn-magenta text-white transition-colors flex items-center justify-center backdrop-blur-md shadow-lg"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Enlarged Photo fitting perfectly without side bars */}
                <div className="group relative flex items-center justify-center bg-transparent overflow-hidden rounded-2xl sm:rounded-3xl">
                    {/* Native img keeps the photo's own aspect ratio; the URL is already a resized Sanity CDN image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={member.imageFullUrl}
                        alt={member.imageAlt || `${member.name} - ${member.position}`}
                        decoding="async"
                        className="block w-auto h-auto max-w-[90vw] max-h-[85dvh] object-contain rounded-2xl sm:rounded-3xl"
                    />

                    {/* Description slides up only on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/60 to-black/0 text-white z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-b-2xl sm:rounded-b-3xl pointer-events-none">
                        <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                            {member.name} <span className="font-normal text-white/80 text-base sm:text-lg lg:text-xl ml-1">({member.position})</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BoardSection({ members }: BoardSectionProps) {
    const [selectedMember, setSelectedMember] = useState<BoardMemberItem | null>(null);

    // Helper to group members (stegaClean: Draft Mode adds invisible markers to strings)
    const getMembersForGroup = (groupKey: string) => {
        return members.filter((m) => {
            const category = stegaClean(m.category);
            if (groupKey === 'board') return category === 'board' || !category;
            return category === groupKey;
        });
    };

    return (
        <section className="py-10 sm:py-20 px-6 sm:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl space-y-10 sm:space-y-20">
                {members.length === 0 && (
                    <p className="text-gray-500 text-center py-12">The board members will appear here soon.</p>
                )}

                {GROUPS.map((group) => {
                    const groupMembers = getMembersForGroup(group.key);
                    if (groupMembers.length === 0) return null;

                    return (
                        <div key={group.key} className="space-y-4 sm:space-y-8">
                            {/* Section Header styled as vertical line with title */}
                            <div className="flex items-center gap-3.5">
                                <div className="w-1.5 h-8 bg-esn-cyan rounded-full shadow-sm" aria-hidden="true" />
                                <h2 className="text-2xl sm:text-3xl font-black text-esn-dark tracking-tight">
                                    {group.title}
                                </h2>
                            </div>

                            {/* Portrait / Oblong Cards Grid */}
                            <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 list-none p-0 m-0">
                                {groupMembers.map((member) => (
                                    <li key={member._id}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedMember(member)}
                                            className="group relative block w-full bg-gray-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-esn-dark focus-visible:ring-offset-2 text-left cursor-pointer hover:-translate-y-1"
                                        >
                                            {/* Portrait / Oblong Image Container (4:5 ratio) */}
                                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                                                <SanityImage
                                                    src={member.imageUrl}
                                                    alt={member.imageAlt || `${member.name} - ${member.position}`}
                                                    fill
                                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                    placeholder={member.imageLqip ? 'blur' : 'empty'}
                                                    blurDataURL={member.imageLqip ?? undefined}
                                                />

                                                {/* Compact zoom icon at the corner of the photo on hover */}
                                                <div className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 text-esn-dark flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-md hover:bg-esn-cyan hover:text-white" aria-hidden="true">
                                                    <Maximize2 className="w-4 h-4" />
                                                </div>
                                            </div>
                                            {/* Name and role for screen readers and search engines (visually the photo carries them) */}
                                            <span className="sr-only">{member.name}, {member.position}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox / Modal View */}
            {selectedMember && <MemberDialog member={selectedMember} onClose={() => setSelectedMember(null)} />}
        </section>
    );
}
