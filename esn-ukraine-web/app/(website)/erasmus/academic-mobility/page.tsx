import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Globe2,
  Clock,
  Wallet,
  FileText,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Mobility — Erasmus+ Study & Internship Abroad | ESN Ukraine',
  description:
    'Learn about Erasmus+ academic mobility for Ukrainian students: study or intern abroad for 3–12 months at partner universities across Europe with EU grants.',
  alternates: {
    canonical: 'https://esnukraine.org/erasmus/academic-mobility',
  },
  openGraph: {
    title: 'Academic Mobility — Erasmus+ Study & Internship Abroad',
    description:
      'Learn about Erasmus+ academic mobility for Ukrainian students: study or intern abroad for 3–12 months at partner universities across Europe with EU grants.',
    url: 'https://esnukraine.org/erasmus/academic-mobility',
    siteName: 'ESN Ukraine',
    type: 'website',
  },
};

const mobilityTypes = [
  {
    icon: BookOpen,
    color: 'bg-esn-cyan',
    title: 'Study Mobility',
    description: 'Spend 3–12 months studying at a partner university abroad. All ECTS credits earned are fully recognised by your home institution.',
    details: ['Duration: 3–12 months', 'Level: Bachelor, Master, Doctoral', 'ECTS credits fully recognised'],
  },
  {
    icon: Briefcase,
    color: 'bg-esn-magenta',
    title: 'Traineeship Mobility',
    description: 'Complete a work placement or internship at a company, research lab, or organisation abroad.',
    details: ['Duration: 2–12 months', 'Available for students & recent graduates', 'Practical work experience'],
  },
];

const steps = [
  {
    number: '01',
    title: 'Check Eligibility & Opportunities',
    description: 'Find current opportunities on the international relations office website of your university. Selections are usually held twice a year: in autumn and spring.',
  },
  {
    number: '02',
    title: 'Prepare Your Application (Phase 1)',
    description: 'Gather required documents: CV, motivation letter, language certificate (international or signed by a teacher), transcript of records, and sometimes a passport or recommendation letter.',
  },
  {
    number: '03',
    title: 'Interview (Phase 2)',
    description: 'If your application is successful, you will be invited to an interview where you can demonstrate your motivation and language skills.',
  },
  {
    number: '04',
    title: 'Get Selected & Prepare',
    description: 'Once nominated and accepted by the host university, sign the grant agreement and finalise your Learning Agreement. Arrange accommodation, health insurance, visa (if needed), and attend the pre-departure briefing organised by your university.',
  },
  {
    number: '05',
    title: 'Study or Intern Abroad',
    description: 'Embark on your Erasmus+ adventure! Study at your host university, earn ECTS credits, experience a new culture, and make lifelong friends. Make sure to complete all academic and administrative requirements.',
  },
];

export default function AcademicMobilityPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Academic Mobility — Erasmus+ Study & Internship Abroad',
    description:
      'Learn about Erasmus+ academic mobility for Ukrainian students: study or intern abroad for 3–12 months at partner universities across Europe with EU grants.',
    url: 'https://esnukraine.org/erasmus/academic-mobility',
    publisher: {
      '@type': 'Organization',
      name: 'ESN Ukraine',
      url: 'https://esnukraine.org',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esnukraine.org' },
        { '@type': 'ListItem', position: 2, name: 'Erasmus+', item: 'https://esnukraine.org/erasmus' },
        { '@type': 'ListItem', position: 3, name: 'Academic Mobility', item: 'https://esnukraine.org/erasmus/academic-mobility' },
      ],
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
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-esn-cyan/20" />
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-esn-cyan/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 sm:w-80 sm:h-80 bg-esn-green/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
          <Link
            href="/erasmus"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Erasmus+</span>
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
              Academic Mobility
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Study or complete an internship abroad at one of thousands of Erasmus+ partner universities across Europe and beyond — with EU financial support.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ KEY FACTS ═══════ */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4">
            {[
              { icon: Clock, value: '3–12 months', label: 'Study Duration', color: 'text-esn-cyan', bg: 'bg-esn-cyan/10' },
              { icon: Wallet, value: '€800–1500', label: 'Monthly Grant*', color: 'text-esn-green', bg: 'bg-esn-green/10' },
              { icon: Globe2, value: '5000+', label: 'Partner Universities', color: 'text-esn-magenta', bg: 'bg-esn-magenta/10' },
              { icon: GraduationCap, value: '100%', label: 'ECTS Recognition', color: 'text-esn-dark', bg: 'bg-esn-dark/10' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center py-6 sm:py-8 px-4 rounded-2xl bg-gray-50">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className={`text-2xl sm:text-3xl font-black mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            * Grant amount varies by country and mobility type. Figures represent typical range for Ukrainian students under KA171.
          </p>
        </div>
      </section>

      {/* ═══════ WHAT IS ACADEMIC MOBILITY ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
                What is Erasmus+ Academic Mobility?
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
                <p>
                  <strong className="text-gray-900">Erasmus+ Academic Mobility</strong> (Key Action 1) enables students to spend a period of study or traineeship at a higher education institution or organisation in another country. It is the most popular activity under the Erasmus+ programme.
                </p>
                <p>
                  For <strong className="text-gray-900">Ukrainian students</strong>, mobility is primarily available through <strong className="text-esn-cyan">International Credit Mobility (KA171)</strong> — projects managed by EU universities that include partnerships with Ukrainian institutions. Since 2024, new pathways are also opening under KA131 as Ukraine becomes more integrated into the programme.
                </p>
                <p>
                  Participants receive a <strong className="text-gray-900">monthly EU grant</strong> to help cover travel and living costs, and all academic credits (ECTS) earned abroad are fully recognised by the home university through a Learning Agreement.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {mobilityTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.title} className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] ${type.color} flex items-center justify-center mb-5`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-esn-dark mb-3">{type.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{type.description}</p>
                    <ul className="space-y-1.5">
                      {type.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-esn-green flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHO CAN PARTICIPATE ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
            Who Can Participate?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-esn-cyan/5 border border-esn-cyan/10 rounded-2xl p-6 sm:p-8">
              <h3 className="font-bold text-esn-dark text-lg sm:text-xl mb-4">Study Mobility</h3>
              <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
                {[
                  'Students enrolled in a higher education institution: 2nd-4th year Bachelor (except 2nd semester of 4th year) or 1st-2nd year Master (except 2nd semester of 2nd year)',
                  'Your home university must have an inter-institutional agreement with the host university',
                  'Language proficiency in the language of instruction (usually B1–B2 level, certificate or teacher signature)',
                  'Your chosen study programme abroad must match your home university specialty',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-cyan mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-esn-magenta/5 border border-esn-magenta/10 rounded-2xl p-6 sm:p-8">
              <h3 className="font-bold text-esn-dark text-lg sm:text-xl mb-4">Traineeship Mobility</h3>
              <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
                {[
                  'Students enrolled in higher education or recent graduates (within 12 months of graduation)',
                  'The traineeship must be relevant to your field of study',
                  'Host organisation can be a company, research centre, NGO, or other organisation',
                  'Language requirements depend on the host organisation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-magenta mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FINANCIAL SUPPORT ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
            Financial Support
          </h2>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
              <p>
                Erasmus+ participants receive a <strong className="text-gray-900">monthly grant</strong> from the EU to help cover the additional costs of living abroad. The grant is not intended to cover all expenses but to supplement them.
              </p>
              <p>
                For Ukrainian students participating through <strong className="text-esn-cyan">KA171 International Credit Mobility</strong>, the grant typically includes:
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Monthly Allowance', amount: '€800–1500/month', desc: 'Varies by host country and mobility type (study vs. traineeship).' },
                { title: 'Travel Support', amount: 'Up to €1500', desc: 'Contribution towards round-trip travel costs based on distance.' },
                { title: 'Insurance', amount: 'Included', desc: 'Health insurance coverage for the duration of mobility.' },
                { title: 'Visa & Residence Permit', amount: 'Reimbursed', desc: 'Costs related to visa and residence permits are covered.' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="w-16 sm:w-20 flex-shrink-0">
                    <span className="text-sm sm:text-base font-black text-esn-green">{item.amount}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-esn-dark text-sm sm:text-base mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOW TO APPLY ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
              How to Apply
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              The application process varies by university, but here is the general roadmap for Erasmus+ academic mobility.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-5 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-esn-dark text-white text-xl font-black">
                    {step.number}
                  </div>
                </div>
                <div className="pt-1 sm:pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-esn-dark mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ USEFUL RESOURCES ═══════ */}
      <section className="py-12 sm:py-16 md:py-20 px-6 sm:px-12 lg:px-24 bg-esn-dark">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            Useful Resources
          </h2>
          <p className="text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Official links and tools for Erasmus+ academic mobility.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'EC — Erasmus+ Student Mobility', href: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students' },
              { title: 'Learning Agreement Online', href: 'https://learning-agreement.eu/' },
              { title: 'Erasmus+ App', href: 'https://erasmusapp.eu/' },
              { title: 'NEO Ukraine', href: 'https://erasmusplus.org.ua/' },
              { title: 'Online Linguistic Support', href: 'https://academy.europa.eu/courses/online-language-support' },
              { title: 'ESN International', href: 'https://esn.org/' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl transition-colors font-bold text-sm sm:text-base"
              >
                {link.title}
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-r from-esn-cyan to-esn-green">
        <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
            Ready to Study Abroad?
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start by contacting your university&apos;s International Relations Office and explore available Erasmus+ partnerships. ESN Ukraine is here to support you on your journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark hover:bg-esn-dark hover:text-white transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://erasmus-plus.ec.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-esn-dark transition-colors"
            >
              Official Erasmus+ Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
