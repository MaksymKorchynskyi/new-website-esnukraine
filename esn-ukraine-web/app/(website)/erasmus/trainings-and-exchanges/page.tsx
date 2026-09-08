import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Trainings & Exchanges | Erasmus+ | ESN Ukraine',
  description: 'Participate in Erasmus+ youth exchanges, training courses, and capacity-building activities.',
};

export default function TrainingsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-esn-dark via-esn-dark to-esn-green/20 text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Trainings & Exchanges</h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Youth exchanges, training courses, and capacity-building activities funded by Erasmus+.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-gray-500 text-center">Content coming soon.</p>
      </section>
    </main>
  );
}
