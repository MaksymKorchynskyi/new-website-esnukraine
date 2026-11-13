'use client';

import { useEffect } from 'react';

/** Rendered inside the site layout (header and footer stay), so no <html>/<body> here. */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-svh bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center">
      <h1 className="text-3xl sm:text-4xl font-black text-esn-dark mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-500 mb-8 max-w-md">
        A system error occurred. Please try refreshing the page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-full bg-esn-dark px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-cyan transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
