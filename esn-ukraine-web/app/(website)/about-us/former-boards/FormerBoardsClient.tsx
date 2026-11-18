'use client';

import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SanityImage from '@/components/ui/SanityImage';

export interface FormerBoardMember {
    _key: string;
    name: string;
    position: string;
    imageUrl: string | null;
    imageLqip?: string | null;
    imageAlt?: string | null;
}

export interface FormerBoardItem {
    _id: string;
    title: string;
    order: number;
    members: FormerBoardMember[];
}

interface FormerBoardsClientProps {
    boards: FormerBoardItem[];
}

export default function FormerBoardsClient({ boards }: FormerBoardsClientProps) {
    // Keep track of which boards are open. By default, none are open.
    const [openBoards, setOpenBoards] = useState<Record<string, boolean>>({});
    // Photos are mounted only after a board has been opened once, so collapsed
    // boards never download their photos (names stay in the HTML for search engines).
    const [loadedBoards, setLoadedBoards] = useState<Record<string, boolean>>({});

    const toggleBoard = (id: string) => {
        setOpenBoards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        setLoadedBoards((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
    };

    return (
        <MotionConfig reducedMotion="user">
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-5xl px-6 sm:px-12 lg:px-24">
                <div className="flex flex-col gap-8">
                    {boards.map((board) => {
                        const isOpen = openBoards[board._id] || false;
                        const showPhotos = loadedBoards[board._id] || false;
                        
                        return (
                            <div key={board._id} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50">
                                {/* The heading wraps the button (a heading inside a button is invalid HTML) */}
                                <h2 className="text-2xl font-bold text-esn-dark">
                                    <button
                                        type="button"
                                        onClick={() => toggleBoard(board._id)}
                                        aria-expanded={isOpen}
                                        aria-controls={`former-board-${board._id}`}
                                        className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <span>{board.title}</span>
                                        <motion.span
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-esn-dark inline-flex"
                                            aria-hidden="true"
                                        >
                                            <ChevronDown className="w-6 h-6" />
                                        </motion.span>
                                    </button>
                                </h2>

                                {/* Members stay in the HTML while collapsed (search engines see the names);
                                    only the height animates */}
                                <motion.div
                                    id={`former-board-${board._id}`}
                                    initial={false}
                                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    style={{ overflow: 'hidden' }}
                                    aria-hidden={!isOpen}
                                    inert={!isOpen}
                                >
                                    {(
                                        <div>
                                            <div className="px-8 pb-12 pt-6">
                                                {/* Board Members Grid */}
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                                                    {board.members?.map((member, index) => (
                                                        <div key={member._key || index} className="flex flex-col items-center text-center">
                                                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 shadow-md bg-gray-200">
                                                                {member.imageUrl ? (
                                                                    showPhotos && <SanityImage
                                                                        src={member.imageUrl}
                                                                        alt={member.imageAlt || member.name}
                                                                        fill
                                                                        className="object-cover"
                                                                        placeholder={member.imageLqip ? 'blur' : 'empty'}
                                                                        blurDataURL={member.imageLqip ?? undefined}
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                        No Image
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <h3 className="text-lg font-bold text-esn-dark leading-tight mb-1">
                                                                {member.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 italic">
                                                                {member.position}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        );
                    })}

                    {boards.length === 0 && (
                        <div className="text-center text-gray-500 py-12">
                            No former boards found.
                        </div>
                    )}
                </div>
            </div>
        </section>
        </MotionConfig>
    );
}
