import Link from 'next/link';

/** Rendered inside the site layout (header and footer stay), so no <html>/<body> here. */
export default function NotFoundPage() {
  return (
    <main className="min-h-svh bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center">
      <p className="text-6xl sm:text-7xl font-black text-esn-dark mb-4" aria-hidden="true">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-esn-dark mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-500 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-esn-dark px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-cyan transition-colors"
      >
        Return Home
      </Link>
    </main>
  );
}
