import React from 'react';
import Image from 'next/image';

export default function UkraineMap() {
    return (
        <div className="w-full max-w-5xl mx-auto overflow-hidden select-none">
            <Image
                src="/ESN Ukraine Section Map.webp"
                alt="ESN Ukraine Section Map"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain pointer-events-none select-none"
                draggable={false}
                priority
            />
        </div>
    );
}
