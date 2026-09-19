import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Globe2,
  Users,
  Briefcase,
  Heart,
  Languages,
  Sparkles,
  BookOpen,
  Handshake,
  Building2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Erasmus+ Programme — Opportunities for Ukrainian Students | ESN Ukraine',
  description:
    'Discover Erasmus+ programmes and opportunities for Ukrainian students — academic mobility, Erasmus Mundus Master Programmes, trainings, exchanges, volunteering, and more.',
  alternates: {
    canonical: 'https://esnukraine.org/erasmus',
  },
  openGraph: {
    title: 'Erasmus+ Programme — Opportunities for Ukrainian Students',
    description:
      'Discover Erasmus+ programmes and opportunities for Ukrainian students — academic mobility, Erasmus Mundus Master Programmes, trainings, exchanges, volunteering, and more.',
    url: 'https://esnukraine.org/erasmus',
    siteName: 'ESN Ukraine',
    type: 'website',
  },
};

const programmes = [
  {
    title: 'Academic Mobility',
    description:
      'Study or complete an internship abroad at one of thousands of Erasmus+ partner universities across Europe and beyond.',
    href: '/erasmus/academic-mobility',
    icon: GraduationCap,
    color: 'bg-esn-cyan',
    accent: 'text-esn-cyan',
    hoverBorder: 'hover:border-esn-cyan/40',
  },
  {
    title: 'Erasmus Mundus Master Programmes',
    description:
      'Joint Master degrees offered by consortia of top European universities with full Erasmus Mundus scholarships.',
    href: '/erasmus/erasmus-mundus',
    icon: BookOpen,
    color: 'bg-esn-magenta',
    accent: 'text-esn-magenta',
    hoverBorder: 'hover:border-esn-magenta/40',
  },
  {
    title: 'Erasmus Trainings and Exchanges',
    description:
      'Youth exchanges, training courses, and capacity-building activities funded by the Erasmus+ programme.',
    href: '/erasmus/trainings-and-exchanges',
    icon: Users,
    color: 'bg-esn-green',
    accent: 'text-esn-green',
    hoverBorder: 'hover:border-esn-green/40',
  },
  {
    title: 'European Solidarity Corps',
    description:
      'Volunteer, work, or run a solidarity project across Europe. Open to young people aged 18–30.',
    href: '/erasmus/european-solidarity-corps',
    icon: Heart,
    color: 'bg-yellow-500',
    accent: 'text-yellow-600',
    hoverBorder: 'hover:border-yellow-400/40',
  },
  {
    title: 'National Erasmus+ Office',
    description:
      'The National Erasmus+ Office in Ukraine supports and promotes Erasmus+ programme activities across the country.',
    href: '/erasmus/national-erasmus-office',
    icon: Building2,
    color: 'bg-orange-500',
    accent: 'text-orange-500',
    hoverBorder: 'hover:border-orange-400/40',
  },
];

const benefits = [
  {
    icon: GraduationCap,
    title: 'Academic Growth',
    description: 'Access world-class education and diverse teaching methodologies at leading European universities.',
  },
  {
    icon: Globe2,
    title: 'Cultural Exchange',
    description: 'Immerse yourself in new cultures, traditions, and perspectives that broaden your worldview.',
  },
  {
    icon: Briefcase,
    title: 'Career Boost',
    description: 'Enhance your CV with international experience valued by employers worldwide.',
  },
  {
    icon: Handshake,
    title: 'Professional Network',
    description: 'Build lifelong connections with students, academics, and professionals from 33+ countries.',
  },
  {
    icon: Languages,
    title: 'Language Skills',
    description: 'Develop fluency in foreign languages through daily immersion and Online Linguistic Support.',
  },
  {
    icon: Sparkles,
    title: 'Personal Growth',
    description: 'Gain independence, resilience, and confidence by navigating life in a new country.',
  },
];

export default function ErasmusPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Erasmus+ Programme — Opportunities for Ukrainian Students',
    description:
      'Discover Erasmus+ programmes and opportunities for Ukrainian students — academic mobility, Erasmus Mundus Master Programmes, trainings, exchanges, volunteering, and more.',
    url: 'https://esnukraine.org/erasmus',
    publisher: {
      '@type': 'Organization',
      name: 'ESN Ukraine',
      url: 'https://esnukraine.org',
    },
  };

  return (
    <main className="min-h-svh bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-24 md:pb-32 bg-esn-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-esn-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-esn-magenta/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-esn-green/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
                Erasmus+
              </h1>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              The EU&apos;s flagship programme for education, training, youth, and sport. Your gateway to studying, volunteering, and growing abroad.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-4">
            {[
              { value: '€26.2B', label: 'Budget 2021–2027', color: 'text-esn-cyan' },
              { value: '33+', label: 'Programme Countries', color: 'text-esn-magenta' },
              { value: '14M+', label: 'Participants Since 1987', color: 'text-esn-green' },
              { value: '5000+', label: 'Partner Universities', color: 'text-esn-dark' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-6 sm:py-8 rounded-2xl bg-gray-50">
                <div className={`text-3xl sm:text-4xl md:text-5xl font-black mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHAT IS ERASMUS+ ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
                What is Erasmus+?
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
                <p>
                  <strong className="text-gray-900">Erasmus+</strong> is the European Union&apos;s programme for education, training, youth, and sport. With a budget of <strong className="text-esn-cyan">€26.2 billion</strong> for 2021–2027, it is one of the most impactful programmes in the world.
                </p>
                <p>
                  Since its launch in 1987, Erasmus has enabled over <strong className="text-gray-900">14 million people</strong> to study, train, volunteer, and gain experience abroad. It supports student and staff mobility, cooperation between organisations, and policy reform.
                </p>
                <p>
                  <strong className="text-gray-900">Ukraine participates in Erasmus+</strong> as a partner country associated to the programme since 2024, which means Ukrainian students and institutions have access to a wide range of mobility and cooperation opportunities.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Key Action 1', title: 'Learning Mobility', desc: 'Student and staff mobility for studying, teaching, training, and volunteering abroad.' },
                { label: 'Key Action 2', title: 'Cooperation & Partnerships', desc: 'Strategic partnerships, capacity building, and knowledge exchange between organisations.' },
                { label: 'Key Action 3', title: 'Policy Reform', desc: 'Support for policy dialogue, evidence-based reform, and innovative approaches in education and youth.' },
              ].map((ka) => (
                <div key={ka.label} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-esn-cyan mb-1.5">
                    {ka.label}
                  </p>
                  <h3 className="font-bold text-esn-dark text-lg sm:text-xl mb-2">{ka.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{ka.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROGRAMMES & OPPORTUNITIES ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
              Programmes & Opportunities
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl">
              Explore the key Erasmus+ programmes and opportunities available for Ukrainian students and young people.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((prog) => {
              const Icon = prog.icon;
              return (
                <Link
                  key={prog.href}
                  href={prog.href}
                  className={`group block p-6 sm:p-8 rounded-[24px] border border-gray-100 ${prog.hoverBorder} hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1`}
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] ${prog.color} flex items-center justify-center mb-5 sm:mb-6`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold text-esn-dark group-hover:${prog.accent} transition-colors mb-3`}>
                    {prog.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-4">
                    {prog.description}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${prog.accent} group-hover:gap-2.5 transition-all`}>
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ WHY ERASMUS+ ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
              Why Erasmus+?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
              More than just a programme — Erasmus+ is a transformative experience that shapes your future.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-esn-cyan/10 text-esn-cyan flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-esn-dark text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ ERASMUS+ IN UKRAINE ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
                Erasmus+ in Ukraine
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
                <p>
                  Ukraine has been actively participating in the Erasmus+ programme since 2014. In 2024, Ukraine became an <strong className="text-gray-900">associated partner country</strong>, significantly expanding access to programme opportunities for Ukrainian students and institutions.
                </p>
                <p>
                  The <strong className="text-gray-900">National Erasmus+ Office (NEO) in Ukraine</strong> serves as the main point of contact for Erasmus+ in the country, providing information, support, and guidance to universities and students.
                </p>
                <p>
                  <strong className="text-esn-magenta">ESN Ukraine</strong> actively supports the Erasmus+ programme by informing students about mobility opportunities, assisting with the integration of exchange students, and advocating for expanded access to European education programmes.
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-esn-cyan/5 border border-esn-cyan/10 rounded-2xl p-6 sm:p-8">
                <h3 className="font-bold text-esn-dark text-lg sm:text-xl mb-3">For Ukrainian Students</h3>
                <ul className="space-y-2.5 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-cyan mt-1 flex-shrink-0" />
                    <span>Study or intern at European universities for 3–12 months</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-cyan mt-1 flex-shrink-0" />
                    <span>Apply for fully-funded Erasmus Mundus Master Programmes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-cyan mt-1 flex-shrink-0" />
                    <span>Participate in youth exchanges and training courses</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-cyan mt-1 flex-shrink-0" />
                    <span>Volunteer across Europe through the European Solidarity Corps</span>
                  </li>
                </ul>
              </div>

              <div className="bg-esn-magenta/5 border border-esn-magenta/10 rounded-2xl p-6 sm:p-8">
                <h3 className="font-bold text-esn-dark text-lg sm:text-xl mb-3">For Ukrainian Universities</h3>
                <ul className="space-y-2.5 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-magenta mt-1 flex-shrink-0" />
                    <span>Join international credit mobility partnerships (KA171)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-magenta mt-1 flex-shrink-0" />
                    <span>Participate in Capacity Building in Higher Education projects</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-magenta mt-1 flex-shrink-0" />
                    <span>Apply for Jean Monnet activities</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-magenta mt-1 flex-shrink-0" />
                    <span>Access support from the National Erasmus+ Office</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ USEFUL RESOURCES ═══════ */}
      <section className="py-12 sm:py-16 md:py-20 px-6 sm:px-12 lg:px-24 bg-gray-50">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-esn-dark mb-4">
            Useful Resources
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Official information and tools to help you explore Erasmus+ opportunities.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'European Commission — Erasmus+', href: 'https://erasmus-plus.ec.europa.eu/' },
              { title: 'Erasmus+ App', href: 'https://erasmusapp.eu/' },
              { title: 'ESN International', href: 'https://esn.org/' },
              { title: 'European Youth Portal', href: 'https://youth.europa.eu/' },
              { title: 'NEO Ukraine', href: 'https://erasmusplus.org.ua/' },
              { title: 'Eurodesk', href: 'https://eurodesk.eu/' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-esn-dark hover:text-white text-esn-dark px-6 py-4 rounded-xl transition-all duration-300 border border-gray-100 hover:border-esn-dark font-bold text-sm sm:text-base shadow-sm hover:shadow-md"
              >
                {link.title}
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-esn-dark">
        <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6">
            Ready to start your Erasmus+ journey?
          </h2>
          <p className="text-base sm:text-lg text-white/80 font-medium mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether you want to study abroad, volunteer in another country, or participate in a youth exchange — ESN Ukraine is here to help you take the first step.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark transition-all hover:bg-esn-cyan hover:text-white group"
            >
              Contact Us
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/for-students/esncard"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10"
            >
              Get ESNcard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
