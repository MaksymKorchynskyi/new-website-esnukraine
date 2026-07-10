'use client';

import { useEffect } from 'react';

export default function ErrorRoot({
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#6B7280', margin: '0 0 2rem 0', fontSize: '1.125rem' }}>
            A system error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            style={{ display: 'inline-block', padding: '0.875rem 2rem', backgroundColor: '#00AEEF', color: '#ffffff', border: 'none', borderRadius: '9999px', fontWeight: 500, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
