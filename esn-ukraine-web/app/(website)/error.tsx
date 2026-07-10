'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логуємо помилку для аналітики або моніторингу
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center px-4 w-full min-h-screen py-20 font-sans bg-white">
      <div className="flex flex-col items-center text-center w-full max-w-2xl mx-auto">
        <div className="mb-6 text-esn-magenta">
          <AlertTriangle className="w-16 h-16 opacity-90" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Something went wrong
        </h2>
        
        <p className="text-gray-500 mb-10 text-lg">
          An unexpected system error occurred. We are working to resolve it.
        </p>

        <button
          onClick={() => reset()}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-esn-cyan hover:bg-[#0095cc] text-white text-lg font-medium rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-esn-cyan/50 shadow-lg shadow-esn-cyan/20 cursor-pointer"
        >
          <RefreshCcw className="w-5 h-5" />
          <span>Try again</span>
        </button>
      </div>
    </div>
  );
}
