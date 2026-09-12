import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'Erasmus+ | ESN Ukraine',
  description: 'Discover Erasmus+ programmes and opportunities for Ukrainian students — academic mobility, trainings, exchanges, and more.',
};

export default function ErasmusPage() {
  const programmes = [
    {
      title: 'Academic Mobility',
      description: 'Study or do an internship abroad at one of thousands of Erasmus+ partner universities.',
      href: '/erasmus/academic-mobility',
    },
    {
      title: 'Erasmus Mundus',
      description: 'Joint Master programmes offered by consortia of top European universities.',
      href: '/erasmus/erasmus-mundus',
    },
    {
      title: 'Trainings & Exchanges',
      description: 'Participate in youth exchanges, training courses, and capacity-building activities.',
      href: '/erasmus/trainings-and-exchanges',
    },
    {
      title: 'European Solidarity Corps',
      description: 'Volunteer, work, or run a solidarity project across Europe.',
      href: '/erasmus/european-solidarity-corps',
    },
    {
      title: 'National Erasmus+ Office',
      description: 'Learn about the National Erasmus+ Office in Ukraine and its role.',
      href: '/erasmus/national-erasmus-office',
    },
  ];

  return (
    <main className="min-h-dvh bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-esn-dark via-esn-dark to-esn-cyan/20 text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-esn-cyan" />
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Erasmus+</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Erasmus+ is the EU&apos;s programme supporting education, training, youth, and sport in Europe and beyond. Discover the opportunities available for Ukrainian students.
          </p>
        </div>
      </section>

      {/* Programmes Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-esn-dark mb-8">Programmes & Opportunities</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((prog) => (
            <Link
              key={prog.href}
              href={prog.href}
              className="group block p-6 rounded-xl border border-gray-100 hover:border-esn-cyan/30 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <h3 className="text-lg font-bold text-esn-dark group-hover:text-esn-cyan transition-colors mb-2">
                {prog.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {prog.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
