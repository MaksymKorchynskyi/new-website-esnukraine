'use client';

import { useState } from 'react';
import { Rocket, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
    const [isLaunched, setIsLaunched] = useState(false);

    const handleLaunch = () => {
        if (!isLaunched) {
            setIsLaunched(true);
            setTimeout(() => setIsLaunched(false), 700);
        }
    };

    return (
        <main className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Very light subtle background effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-esn-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-esn-magenta/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-10">
                
                {/* Interactive Rocket Container */}
                <button 
                    onClick={handleLaunch}
                    className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center mb-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow cursor-pointer group"
                    aria-label="Launch Rocket"
                >
                    <Rocket 
                        className={`w-10 h-10 text-esn-dark transition-all z-10 ${
                            isLaunched 
                                ? 'duration-500 ease-in translate-x-[150px] -translate-y-[150px] opacity-0 scale-50' 
                                : 'duration-300 ease-out translate-x-0 translate-y-0 opacity-100 scale-100'
                        }`} 
                    />
                </button>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-esn-dark mb-6 tracking-tight">
                    Under Development
                </h1>
                
                <p className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed max-w-lg mx-auto">
                    We're working hard to bring you something amazing. <br className="hidden md:block" />
                    This page is currently under construction.
                </p>

                {/* Button matching ESN light theme style */}
                <Link
                    href="/"
                    className="group inline-flex items-center gap-3 bg-esn-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-cyan transition-colors duration-300 rounded-full"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
