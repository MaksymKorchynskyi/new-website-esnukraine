'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export interface FormerBoardMember {
    _key: string;
    name: string;
    position: string;
    imageUrl: string;
    imageAlt?: string;
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

    const toggleBoard = (id: string) => {
        setOpenBoards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-5xl px-6 sm:px-12 lg:px-24">
                <div className="flex flex-col gap-8">
                    {boards.map((board) => {
                        const isOpen = openBoards[board._id] || false;
                        
                        return (
                            <div key={board._id} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50">
                                <button
                                    onClick={() => toggleBoard(board._id)}
                                    className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <h2 className="text-2xl font-bold text-esn-dark">{board.title}</h2>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-esn-dark"
                                    >
                                        <ChevronDown className="w-6 h-6" />
                                    </motion.div>
                                </button>
                                
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        >
                                            <div className="px-8 pb-12 pt-6">
                                                {/* Board Members Grid */}
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                                                    {board.members?.map((member, index) => (
                                                        <div key={member._key || index} className="flex flex-col items-center text-center">
                                                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 shadow-md bg-gray-200">
                                                                {member.imageUrl ? (
                                                                    <Image
                                                                        src={member.imageUrl}
                                                                        alt={member.imageAlt || member.name}
                                                                        fill
                                                                        className="object-cover"
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
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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
    );
}
