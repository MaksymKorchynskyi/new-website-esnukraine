import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Globe2,
  Clock,
  Wallet,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Users,
  Shield,
  Handshake,
  MapPin,
  Award,
  CalendarDays,
  Languages,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'European Solidarity Corps — Volunteering & Solidarity Projects in Europe | ESN Ukraine',
  description:
    'Discover the European Solidarity Corps: volunteer, work, or run solidarity projects across Europe. Open to young people aged 18–30 with all costs covered by the EU.',
  alternates: {
    canonical: 'https://esnukraine.org/erasmus/european-solidarity-corps',
  },
  openGraph: {
    title: 'European Solidarity Corps — Volunteering & Solidarity Projects in Europe',
    description:
      'Volunteer, work, or run solidarity projects across Europe. Open to young people aged 18–30 with all costs covered by the EU.',
    url: 'https://esnukraine.org/erasmus/european-solidarity-corps',
    siteName: 'ESN Ukraine',
    type: 'website',
  },
};

const activityTypes = [
  {
    icon: Heart,
    color: 'bg-yellow-500',
    accent: 'text-yellow-600',
    title: 'Volunteering Activities',
    subtitle: 'Individual & Team Volunteering',
    duration: '2–12 months',
    ageRange: '18–30 years',
    description: 'Work as a volunteer in a host organisation abroad, contributing to community projects in areas like education, environment, culture, health, and social inclusion. You can volunteer individually or as part of a team.',
    highlights: [
      'Full-time commitment (30–38 hours/week)',
      'Pocket money, accommodation & food provided',
      'Language courses and mentoring included',
      'No work experience required',
    ],
  },
  {
    icon: Handshake,
    color: 'bg-orange-500',
    accent: 'text-orange-500',
    title: 'Solidarity Projects',
    subtitle: 'Youth-Led Local Initiatives',
    duration: '2–12 months',
    ageRange: '18–30 years',
    description: 'Initiate and run your own solidarity project in your local community. Groups of at least 5 young people can receive funding to address local challenges and make a positive impact — without going abroad.',
    highlights: [
      'Youth-led from start to finish',
      'Funding of up to €500 per participant',
      'No need to travel abroad',
      'Address real local needs',
    ],
  },
  {
    icon: Globe2,
    color: 'bg-esn-dark',
    accent: 'text-esn-dark',
    title: 'Humanitarian Aid Volunteering',
    subtitle: 'For Experienced Volunteers',
    duration: '2–12 months',
    ageRange: '18–35 years',
    description: 'Support humanitarian aid operations in third countries. This strand is designed for volunteers with relevant experience and requires specific preparation, including online training and pre-deployment preparation.',
    highlights: [
      'Extended age limit: up to 35 years',
      'Requires prior volunteering experience',
      'Includes specialised training programme',
      'Focus on humanitarian contexts',
    ],
  },
];

const coverageItems = [
  { icon: MapPin, title: 'Travel', desc: 'Round-trip travel costs covered based on distance (up to €1,500).' },
  { icon: Wallet, title: 'Pocket Money', desc: 'Monthly pocket money of €5–6 per day depending on the host country.' },
  { icon: CalendarDays, title: 'Accommodation & Food', desc: 'Accommodation and meals are fully provided by the host organisation.' },
  { icon: Shield, title: 'Insurance', desc: 'Comprehensive health, accident, and liability insurance throughout the activity.' },
  { icon: Languages, title: 'Language Support', desc: 'Online Linguistic Support and, in some cases, local language courses.' },
  { icon: Award, title: 'Youthpass Certificate', desc: 'Official EU certificate recognising the skills and competences you develop.' },
];

const participationSteps = [
  {
    number: '01',
    title: 'Register on the European Youth Portal',
    description: 'Create your profile on the European Solidarity Corps Portal (europa.eu). Fill in your personal details, interests, skills, and the type of activity you\'re looking for (volunteering, solidarity projects, or humanitarian aid).',
  },
  {
    number: '02',
    title: 'Search for Opportunities',
    description: 'Browse available volunteering positions on the portal or connect with accredited organisations directly. Look for projects that match your interests and skills. You can also contact ESN Ukraine for guidance.',
  },
  {
    number: '03',
    title: 'Apply & Get Selected',
    description: 'Apply to one or more projects through the portal. Organisations will review your profile and motivation. If selected, you\'ll receive a volunteering agreement outlining your tasks, schedule, and support.',
  },
  {
    number: '04',
    title: 'Prepare for Departure',
    description: 'Complete any required pre-departure training, arrange your visa (if needed), and prepare for your volunteering experience. The sending and hosting organisations will guide you through all logistics.',
  },
  {
    number: '05',
    title: 'Volunteer & Grow',
    description: 'Immerse yourself in the experience! Contribute to the project, learn new skills, meet people from all over Europe, and make a real difference. You\'ll have a mentor and regular support throughout your stay.',
  },
];

export default function SolidarityCorpsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'European Solidarity Corps — Volunteering & Solidarity Projects in Europe',
    description:
      'Volunteer, work, or run solidarity projects across Europe. Open to young people aged 18–30 with all costs covered by the EU.',
    url: 'https://esnukraine.org/erasmus/european-solidarity-corps',
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
        { '@type': 'ListItem', position: 3, name: 'European Solidarity Corps', item: 'https://esnukraine.org/erasmus/european-solidarity-corps' },
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
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-yellow-400/20" />
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 sm:w-80 sm:h-80 bg-orange-500/10 rounded-full blur-3xl" />

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
              European Solidarity Corps
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Volunteer, work, or run a solidarity project across Europe. An EU programme empowering young people aged 18–30 to make a real difference.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT IS ESC ═══════ */}
      <section className="py-10 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
                What is the European Solidarity Corps?
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
                <p>
                  The <strong className="text-gray-900">European Solidarity Corps (ESC)</strong> is an EU programme that creates opportunities for young people to volunteer or work on projects that benefit communities across Europe. It is a separate programme from Erasmus+, with its own budget and focus.
                </p>
                <p>
                  Since its launch in 2018, the ESC has enabled <strong className="text-gray-900">over 350,000 young people</strong> to engage in solidarity activities. With a budget of <strong className="text-yellow-600">€1.009 billion</strong> for 2021–2027, it continues to grow and expand.
                </p>
                <p>
                  The ESC is built on the values of <strong className="text-gray-900">solidarity, respect, and inclusiveness</strong>. It offers young people a unique chance to develop personal and professional skills while making a positive impact on the communities around them.
                </p>
                <p>
                  <strong className="text-gray-900">Ukrainian young people</strong> are fully eligible to participate in ESC volunteering activities across EU and partner countries.
                </p>
              </div>
            </div>

            <div className="bg-[#F4F8FA] rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
              <h3 className="text-lg sm:text-xl font-bold text-esn-dark mb-4">
                Quality Label
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                Organisations that host or send volunteers must hold a <strong className="text-gray-900">Quality Label</strong> — an official accreditation from the EU that ensures they meet quality standards for:
              </p>
              <ul className="space-y-2.5">
                {[
                  'Safe and supportive environment for volunteers',
                  'Meaningful tasks aligned with the project goals',
                  'Proper mentoring and learning support',
                  'Respect for the principles of the ESC',
                  'Adequate accommodation and living conditions',
                  'Compliance with EU standards for youth work',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ KEY FACTS ═══════ */}
      <section className="py-10 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4">
            {[
              { icon: Users, value: '18–30', label: 'Age Range', color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
              { icon: Clock, value: '2–12 months', label: 'Duration', color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { icon: Wallet, value: '100%', label: 'Costs Covered', color: 'text-esn-green', bg: 'bg-esn-green/10' },
              { icon: Globe2, value: '35+', label: 'Countries', color: 'text-esn-dark', bg: 'bg-esn-dark/10' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center py-6 sm:py-8 px-4 rounded-2xl bg-white shadow-sm border border-gray-100">
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
        </div>
      </section>

      {/* ═══════ TYPES OF ACTIVITIES ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
              Types of Activities
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl">
              The European Solidarity Corps offers three main types of activities for young people.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {activityTypes.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.title}
                  className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-gray-50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] ${activity.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-esn-dark">{activity.title}</h3>
                        <p className="text-sm text-gray-400 font-medium">{activity.subtitle}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Age: {activity.ageRange}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{activity.duration}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{activity.description}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {activity.highlights.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-sm text-gray-500">
                            <CheckCircle2 className={`w-4 h-4 ${activity.accent} mt-0.5 flex-shrink-0`} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ WHAT IS COVERED ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
            What Is Covered?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 max-w-3xl leading-[1.8]">
            ESC volunteering is <strong className="text-gray-900">fully funded</strong>. You don&apos;t pay anything — the EU covers all essential costs.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coverageItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-esn-dark mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ HOW TO PARTICIPATE ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
              How to Participate
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Follow these steps to start your ESC volunteering journey.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {participationSteps.map((step) => (
              <div key={step.number} className="flex gap-5 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-yellow-500 text-white text-xl font-black">
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
            Official links and tools for the European Solidarity Corps.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'ESC Portal — Register & Search', href: 'https://youth.europa.eu/solidarity_en' },
              { title: 'SALTO-YOUTH', href: 'https://www.salto-youth.net/' },
              { title: 'Quality Label Database', href: 'https://youth.europa.eu/solidarity/organisations/quality-label_en' },
              { title: 'Telegram: Tviy Prostir', href: 'https://t.me/tviyprostir' },
              { title: 'Telegram: Studway Diem', href: 'https://t.me/studwaydiem' },
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
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Register on the European Solidarity Corps Portal today and discover volunteering opportunities across Europe. ESN Ukraine is here to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youth.europa.eu/solidarity_en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-gray-900 hover:bg-esn-dark hover:text-white transition-colors"
            >
              Register Now
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
