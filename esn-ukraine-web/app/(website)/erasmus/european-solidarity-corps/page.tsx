import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'European Solidarity Corps | Erasmus+ | ESN Ukraine',
  description: 'Volunteer, work, or run a solidarity project across Europe through European Solidarity Corps.',
};

export default function SolidarityCorpsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-esn-dark via-esn-dark to-yellow-400/20 text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">European Solidarity Corps</h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Volunteer, work, or run a solidarity project across Europe. Open to young people aged 18-30.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-gray-500 text-center">Content coming soon.</p>
      </section>
    </main>
  );
}
