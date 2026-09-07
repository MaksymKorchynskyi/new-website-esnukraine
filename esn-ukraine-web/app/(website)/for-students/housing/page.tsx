import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export const metadata = {
  title: 'Housing | For Students | ESN Ukraine',
  description: 'Find housing resources and tips for international students coming to Ukraine.',
};

export default function HousingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-esn-dark via-esn-dark to-esn-green/20 text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-8 h-8 text-esn-green" />
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Housing</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Find housing resources, tips, and support for international students coming to Ukraine.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-gray-500 text-center">Content coming soon.</p>
      </section>
    </main>
  );
}
