import Link from 'next/link';

export default function NotFoundRoot() {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#ffffff', color: '#111827' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: '0 0 1rem 0', color: '#2E3192' }}>
            404
          </h1>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
            Page Not Found
          </h2>
          <p style={{ color: '#6B7280', margin: '0 0 2rem 0', fontSize: '1.125rem' }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link 
            href="/"
            style={{ display: 'inline-block', padding: '0.875rem 2rem', backgroundColor: '#2E3192', color: '#ffffff', textDecoration: 'none', borderRadius: '9999px', fontWeight: 500 }}
          >
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
