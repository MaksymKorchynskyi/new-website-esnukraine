import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Globe2,
  Clock,
  Wallet,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  MapPin,
  Users,
  Award,
  CalendarDays,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Erasmus Mundus Master Programmes — Full Scholarships for Master\'s Degrees | ESN Ukraine',
  description:
    'Explore Erasmus Mundus Joint Master Programmes: fully-funded Master\'s degrees at top European universities. Study in 2+ countries with a full EU scholarship covering tuition, travel, and living costs.',
  alternates: {
    canonical: 'https://esnukraine.org/erasmus/erasmus-mundus',
  },
  openGraph: {
    title: 'Erasmus Mundus Master Programmes — Full Scholarships for Master\'s Degrees',
    description:
      'Explore Erasmus Mundus Joint Master Programmes: fully-funded Master\'s degrees at top European universities. Study in 2+ countries with a full EU scholarship.',
    url: 'https://esnukraine.org/erasmus/erasmus-mundus',
    siteName: 'ESN Ukraine',
    type: 'website',
  },
};

const scholarshipDetails = [
  {
    title: 'Tuition Fees',
    amount: 'Fully Covered',
    description: 'All participation costs, including tuition, library fees, laboratory fees, and insurance are covered in full.',
    color: 'text-esn-cyan',
  },
  {
    title: 'Monthly Living Allowance',
    amount: '~€1,400/month',
    description: 'A contribution to living expenses for the entire duration of the Master programme.',
    color: 'text-esn-green',
  },
  {
    title: 'Travel Costs',
    amount: 'Up to €3,000/year',
    description: 'Contribution to travel and installation costs, including travel for the mandatory mobility between countries.',
    color: 'text-esn-magenta',
  },
  {
    title: 'Installation Costs',
    amount: '€1,000',
    description: 'One-time contribution to cover installation expenses upon arrival.',
    color: 'text-esn-dark',
  },
];

const applicationSteps = [
  {
    number: '01',
    title: 'Find Your Programme',
    description: 'Browse the official Erasmus Mundus Catalogue to find joint Master programmes matching your interests and academic background. There are around 200 programmes covering a wide range of fields, from engineering and science to arts and social sciences.',
  },
  {
    number: '02',
    title: 'Check Requirements',
    description: 'Each programme has its own eligibility criteria, including academic qualifications, language proficiency (usually English B2/C1), and sometimes work experience. Review requirements carefully on the programme\'s official website.',
  },
  {
    number: '03',
    title: 'Prepare Your Application',
    description: 'Typical documents include: certified copies of diplomas and transcripts, language certificates (IELTS, TOEFL, or equivalent), motivation letter, CV, recommendation letters (usually 2–3), and a valid passport/ID. Start preparing well in advance.',
  },
  {
    number: '04',
    title: 'Apply Before the Deadline',
    description: 'Most programmes have application deadlines between October and January for the following academic year. Apply directly through the programme\'s website. You can apply to multiple EMJM programmes simultaneously.',
  },
  {
    number: '05',
    title: 'Selection & Enrolment',
    description: 'Selection is highly competitive. Results are typically announced in March–April. If selected, you\'ll receive a scholarship offer and must confirm your acceptance, arrange visa and accommodation, and prepare for your international Master\'s journey.',
  },
];

export default function ErasmusMundusPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Erasmus Mundus Master Programmes — Full Scholarships for Master\'s Degrees',
    description:
      'Explore Erasmus Mundus Joint Master Programmes: fully-funded Master\'s degrees at top European universities.',
    url: 'https://esnukraine.org/erasmus/erasmus-mundus',
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
        { '@type': 'ListItem', position: 3, name: 'Erasmus Mundus Master Programmes', item: 'https://esnukraine.org/erasmus/erasmus-mundus' },
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
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-esn-magenta/20" />
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-esn-magenta/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 sm:w-80 sm:h-80 bg-esn-cyan/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
          <Link
            href="/erasmus"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Erasmus+</span>
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
              Erasmus Mundus Master Programmes
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Fully-funded joint Master&apos;s degrees at top European universities. Study in at least two countries with a prestigious EU scholarship.
            </p>
          </div>
        </div>
      </section>



      {/* ═══════ WHAT IS EMJM ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
                What is Erasmus Mundus?
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
                <p>
                  <strong className="text-gray-900">Erasmus Mundus Joint Masters (EMJM)</strong> are prestigious, integrated, international study programmes jointly delivered by an international consortium of higher education institutions from different countries.
                </p>
                <p>
                  Each programme involves studying in <strong className="text-gray-900">at least two different European countries</strong>, giving you a truly international academic experience. Upon completion, you receive a <strong className="text-esn-magenta">joint, double, or multiple degree</strong> recognised worldwide.
                </p>
                <p>
                  What makes EMJM unique is the <strong className="text-gray-900">Erasmus Mundus scholarship</strong> — one of the most generous fully-funded scholarships available globally. It covers tuition, travel, living expenses, and insurance for the entire duration of your Master&apos;s programme.
                </p>
                <p>
                  Ukrainian students are eligible to apply as <strong className="text-gray-900">partner country candidates</strong> and receive the full scholarship, which makes EMJM an exceptional opportunity for those seeking a world-class Master&apos;s degree at no personal cost.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                <h3 className="text-lg sm:text-xl font-bold text-esn-dark mb-4">Programme Highlights</h3>
                <ul className="space-y-3">
                  {[
                    'International consortium of 3+ universities from different countries',
                    'Mandatory mobility: study in at least 2 different countries',
                    'Joint, double, or multiple degree upon graduation',
                    'Taught primarily in English (some programmes in other languages)',
                    'Duration: 12–24 months (60–120 ECTS)',
                    'Highly competitive: selected based on academic excellence',
                    'Strong alumni network and career support',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 text-esn-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SCHOLARSHIP ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
              Erasmus Mundus Scholarship
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-3xl">
              One of the most generous fully-funded scholarships in the world. Everything you need to focus on your studies is covered.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {scholarshipDetails.map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-[24px] p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <span className={`text-3xl sm:text-4xl font-black ${item.color} block mb-3`}>
                  {item.amount}
                </span>
                <h3 className="font-bold text-esn-dark text-lg sm:text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-esn-magenta/5 border border-esn-magenta/10 rounded-2xl p-6 sm:p-8">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              <strong className="text-gray-900">Total scholarship value</strong> can range from <strong className="text-esn-magenta">€40,000 to €100,000+</strong> depending on the programme duration and host countries. Self-funded places are also available for students who do not receive the scholarship but are admitted to the programme.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ FIELDS OF STUDY ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
            Fields of Study
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium max-w-3xl mb-8 sm:mb-12">
            Erasmus Mundus programmes cover a wide range of academic disciplines. Here are some of the most popular fields:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Engineering & Technology', examples: 'Robotics, Renewable Energy, Photonics, Computer Science' },
              { title: 'Natural Sciences', examples: 'Environmental Science, Marine Biology, Astrophysics, Chemistry' },
              { title: 'Social Sciences & Law', examples: 'International Relations, Human Rights, Public Policy, Migration Studies' },
              { title: 'Business & Economics', examples: 'International Business, Innovation Management, Finance' },
              { title: 'Arts & Humanities', examples: 'European Literature, Cultural Studies, Digital Humanities, Journalism' },
              { title: 'Health & Medical Sciences', examples: 'Public Health, Biomedical Engineering, Neuroscience, Sports Science' },
            ].map((field) => (
              <div key={field.title} className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-esn-dark mb-2">{field.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{field.examples}</p>
              </div>
            ))}
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
              Follow these steps to apply for an Erasmus Mundus Joint Master Programme.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {applicationSteps.map((step) => (
              <div key={step.number} className="flex gap-5 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-esn-magenta text-white text-xl font-black">
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

          <div className="mt-10 sm:mt-14 bg-gray-50 rounded-2xl p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <CalendarDays className="w-5 h-5 text-esn-magenta" />
              <h3 className="font-bold text-esn-dark text-lg">Application Timeline</h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Most programmes open applications in <strong className="text-gray-900">October–November</strong> with deadlines in <strong className="text-gray-900">January–February</strong>. Results are typically announced in <strong className="text-gray-900">March–April</strong>. Programmes start in <strong className="text-gray-900">September</strong>. Always check the specific programme website for exact dates.
            </p>
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
            Official links and tools for Erasmus Mundus Joint Master Programmes.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'EMJM Programme Catalogue', href: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en' },
              { title: 'EC — Erasmus Mundus', href: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters' },
              { title: 'EACEA — Application Guide', href: 'https://www.eacea.ec.europa.eu/erasmus-mundus_en' },
              { title: 'NEO Ukraine', href: 'https://erasmusplus.org.ua/' },
              { title: 'Study in Europe Portal', href: 'https://education.ec.europa.eu/study-in-europe' },
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
      <section className="py-14 sm:py-20 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 text-center text-esn-dark">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 text-esn-dark">
            Start Your Erasmus Mundus Journey
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Browse the programme catalogue, find a Master that fits your aspirations, and apply. ESN Ukraine is here to help you along the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark border border-gray-200 shadow-sm hover:border-esn-cyan hover:text-esn-cyan transition-colors"
            >
              Browse Programmes
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-esn-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark hover:bg-esn-dark hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
