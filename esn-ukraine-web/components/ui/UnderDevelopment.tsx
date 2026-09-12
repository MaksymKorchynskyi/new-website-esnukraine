import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function UnderDevelopment() {
    return (
        <main className="min-h-svh bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Very light subtle background effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-esn-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-esn-magenta/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-10">
                
                {/* Mascot Image */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 -mb-8 sm:-mb-14">
                    <Image
                        src="/images/mascot-builder.png"
                        alt="ESN Mascot Building"
                        fill={true}
                        priority
                        className="object-contain drop-shadow-sm animate-fade-in-up"
                    />
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-esn-dark mb-3 tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Under Construction
                </h1>
                
                <p className="text-sm md:text-base text-gray-500 mb-10 leading-relaxed max-w-sm mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    Still hammering out the last few pixels. Check back later!
                </p>

                {/* Button matching ESN light theme style */}
                <Link
                    href="/"
                    className="group inline-flex items-center gap-3 bg-esn-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-cyan transition-colors duration-300 rounded-full animate-fade-in-up"
                    style={{ animationDelay: '300ms' }}
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
