import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Blog | ESN Ukraine',
  description: 'Stories, insights, and updates from the ESN Ukraine community.',
};

export default function BlogPage() {
  return (
    <main className="min-h-dvh bg-white">
      <section className="relative bg-gradient-to-br from-esn-dark via-esn-dark to-esn-magenta/20 text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-esn-magenta" />
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Blog</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Stories, insights, and updates from the ESN Ukraine community.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-gray-500 text-center">Content coming soon.</p>
      </section>
    </main>
  );
}
