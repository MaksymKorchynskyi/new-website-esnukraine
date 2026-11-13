import React from 'react';
import Image from 'next/image';

export default function UkraineMap() {
    return (
        <div className="w-full max-w-5xl mx-auto overflow-hidden select-none">
            <Image
                src="/esn-ukraine-section-map.webp"
                alt="ESN Ukraine Section Map"
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="w-full h-auto object-contain pointer-events-none select-none"
                draggable={false}
                priority
            />
        </div>
    );
}
