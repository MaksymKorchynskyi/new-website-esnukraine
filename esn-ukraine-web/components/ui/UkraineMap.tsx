import React from 'react';
import Image from 'next/image';

export default function UkraineMap() {
    return (
        <div className="w-full max-w-5xl mx-auto overflow-hidden select-none">
            <Image
                src="/ESN Ukraine section map.webp"
                alt="ESN Ukraine Section Map"
                width={1536}
                height={1024}
                className="w-full h-auto object-contain pointer-events-none select-none"
                draggable={false}
                priority
            />
        </div>
    );
}
