import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Erasmus Mundus | Erasmus+ | ESN Ukraine',
  description: 'Discover Erasmus Mundus Joint Master Programmes for Ukrainian students.',
};

export default function ErasmusMundusPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-esn-dark via-esn-dark to-esn-magenta/20 text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Erasmus Mundus</h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Joint Master programmes offered by consortia of top European universities with full scholarships.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-gray-500 text-center">Content coming soon.</p>
      </section>
    </main>
  );
}
