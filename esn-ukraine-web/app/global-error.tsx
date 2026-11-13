'use client';

import { useEffect } from 'react';

/**
 * Last-resort error boundary: replaces the root layout, so it must render its
 * own <html> and <body>. Plain inline styles (no Tailwind) because the layout's
 * stylesheet may not be available.
 */
export default function GlobalError({
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
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#ffffff', color: '#111827' }}>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100svh', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Something went wrong</h1>
          <p style={{ color: '#6B7280', margin: '0 0 2rem 0', fontSize: '1.125rem' }}>
            A system error occurred. Please try refreshing the page.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ display: 'inline-block', padding: '0.875rem 2rem', backgroundColor: '#2E3192', color: '#ffffff', border: 'none', borderRadius: '9999px', fontWeight: 600, cursor: 'pointer' }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
