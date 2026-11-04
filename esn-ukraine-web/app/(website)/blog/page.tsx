import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, PenLine } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Blog',
    description:
      'Personal stories from ESN Ukraine volunteers about their experiences of studying abroad, along with their best tips.',
    path: '/blog',
  }),
  // Placeholder page: keep it out of the index until real content ships.
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <main className="min-h-svh bg-white">
      <PageHero
        title="Blog"
        lead={
          <>
            <span className="font-black text-esn-dark">Personal stories</span> from our volunteers about
            their experiences of studying abroad, along with their best tips.
          </>
        }
      />

      <section className="pt-10 pb-24 sm:pt-14 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center rounded-3xl bg-gray-50 px-6 py-16 sm:py-20">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <PenLine className="h-6 w-6 text-esn-dark" />
            </div>
            <h2 className="mb-3 text-xl sm:text-2xl font-black text-esn-dark">
              The first stories are on their way
            </h2>
            <p className="mb-8 max-w-md text-gray-600">
              Have an Erasmus or volunteering experience worth sharing? Get in touch and your story
              could be one of the first on our blog.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-esn-dark px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-esn-dark/20 hover:bg-esn-magenta hover:shadow-esn-magenta/30 transition-colors"
            >
              Share your story
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
