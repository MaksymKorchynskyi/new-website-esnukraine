import React from 'react';

export default function UkraineMap() {
    return (
        <div className="w-full max-w-5xl mx-auto overflow-hidden select-none" style={{ aspectRatio: '1.85/1' }}>
            <img 
                src="/ESN_Ukraine_Map.svg" 
                alt="ESN Ukraine Map" 
                draggable={false}
                className="w-full h-full object-cover pointer-events-none select-none scale-105"
            />
        </div>
    );
}
