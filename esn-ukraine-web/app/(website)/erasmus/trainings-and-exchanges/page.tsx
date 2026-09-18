import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Globe2,
  Clock,
  Wallet,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  Handshake,
  Megaphone,
  CalendarDays,
  MapPin,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Erasmus Trainings and Exchanges — Youth Mobility Opportunities | ESN Ukraine',
  description:
    'Discover Erasmus+ youth exchanges, training courses, and capacity-building activities for young people and youth workers. Fully-funded opportunities for Ukrainian participants.',
  alternates: {
    canonical: 'https://esnukraine.org/erasmus/trainings-and-exchanges',
  },
  openGraph: {
    title: 'Erasmus Trainings and Exchanges — Youth Mobility Opportunities',
    description:
      'Discover Erasmus+ youth exchanges, training courses, and capacity-building activities for young people and youth workers. Fully-funded opportunities.',
    url: 'https://esnukraine.org/erasmus/trainings-and-exchanges',
    siteName: 'ESN Ukraine',
    type: 'website',
  },
};

const activityTypes = [
  {
    icon: Users,
    color: 'bg-esn-green',
    accent: 'text-esn-green',
    title: 'Youth Exchanges',
    ageRange: '13–30 years',
    duration: '5–21 days',
    description: 'Groups of young people from different countries come together to live, learn, and work on a shared topic. Activities include workshops, debates, role-playing, outdoor activities, and more.',
    highlights: [
      'Non-formal education methods',
      'Intercultural learning',
      'Group of 16–60 participants from 2+ countries',
      'Led by experienced youth workers',
    ],
  },
  {
    icon: Lightbulb,
    color: 'bg-esn-cyan',
    accent: 'text-esn-cyan',
    title: 'Training Courses',
    ageRange: '18+ (youth workers)',
    duration: '2–10 days',
    description: 'Professional development activities for youth workers, trainers, and educators. Focused on improving skills, sharing best practices, and developing innovative methods for working with young people.',
    highlights: [
      'Skill development for youth workers',
      'Networking with peers from 20+ countries',
      'Methods and tools for youth work',
      'Youthpass certificate for competence recognition',
    ],
  },
  {
    icon: Handshake,
    color: 'bg-esn-magenta',
    accent: 'text-esn-magenta',
    title: 'Capacity Building in Youth',
    ageRange: 'Organisations',
    duration: '12–36 months (projects)',
    description: 'Cooperation projects between organisations from EU and partner countries. These projects aim to improve the quality of youth work, develop innovative practices, and foster cooperation.',
    highlights: [
      'Institutional development for youth organisations',
      'Knowledge exchange and networking',
      'Innovation in youth work methods',
      'Long-term partnership building',
    ],
  },
  {
    icon: Megaphone,
    color: 'bg-esn-dark',
    accent: 'text-esn-dark',
    title: 'European Youth Together',
    ageRange: '18–30 years',
    duration: 'Various',
    description: 'Large-scale projects that create networks of young people across Europe, promote civic participation, and support the development of European identity and shared values.',
    highlights: [
      'Cross-border partnerships',
      'Youth-led initiatives',
      'Focus on democratic participation',
      'Connections with EU institutions',
    ],
  },
];

const participationSteps = [
  {
    number: '01',
    title: 'Find an Activity',
    description: 'Browse project databases such as SALTO-YOUTH, Eurodesk, and the European Youth Portal to find youth exchanges and training courses. Follow local and international youth organisations on social media for open calls.',
  },
  {
    number: '02',
    title: 'Apply Through a Sending Organisation',
    description: 'You need a sending organisation (NGO, youth group, association) in your country to participate. Contact the organising team or apply through your local ESN section or another youth organisation in Ukraine.',
  },
  {
    number: '03',
    title: 'Get Selected',
    description: 'Selection is usually based on your motivation letter and profile fit. Organisers look for curiosity, openness to intercultural learning, and relevance to the project topic. No formal academic requirements.',
  },
  {
    number: '04',
    title: 'Prepare & Travel',
    description: 'Once selected, you\'ll receive a detailed infopack with logistics, travel info, and preparation tasks. All costs (travel, accommodation, food, activities, insurance) are covered by the Erasmus+ grant.',
  },
  {
    number: '05',
    title: 'Participate & Get Certified',
    description: 'Engage fully in the programme, share your culture and ideas, learn from others, and build new friendships. After the activity, you receive a Youthpass certificate recognising the competences you developed.',
  },
];

export default function TrainingsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Erasmus Trainings and Exchanges — Youth Mobility Opportunities',
    description:
      'Discover Erasmus+ youth exchanges, training courses, and capacity-building activities for young people and youth workers.',
    url: 'https://esnukraine.org/erasmus/trainings-and-exchanges',
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
        { '@type': 'ListItem', position: 3, name: 'Erasmus Trainings and Exchanges', item: 'https://esnukraine.org/erasmus/trainings-and-exchanges' },
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
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-esn-green/20" />
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-esn-green/15 rounded-full blur-3xl" />
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
              Erasmus Trainings and Exchanges
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Youth exchanges, training courses, and capacity-building activities that connect young people and youth workers from across Europe and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ KEY FACTS ═══════ */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4">
            {[
              { icon: Users, value: '13–30', label: 'Age Range (Youth)', color: 'text-esn-green', bg: 'bg-esn-green/10' },
              { icon: Clock, value: '5–21 days', label: 'Youth Exchange Duration', color: 'text-esn-cyan', bg: 'bg-esn-cyan/10' },
              { icon: Wallet, value: '100%', label: 'Costs Covered', color: 'text-esn-magenta', bg: 'bg-esn-magenta/10' },
              { icon: Globe2, value: '33+', label: 'Countries', color: 'text-esn-dark', bg: 'bg-esn-dark/10' },
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
        </div>
      </section>

      {/* ═══════ WHAT ARE TRAININGS & EXCHANGES ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
              What Are Erasmus Trainings and Exchanges?
            </h2>
            <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
              <p>
                The <strong className="text-gray-900">Erasmus+ Youth</strong> strand supports non-formal learning mobility for young people and youth workers. Unlike academic mobility, these activities focus on <strong className="text-esn-green">learning by doing</strong> — through intercultural dialogue, teamwork, workshops, and community engagement.
              </p>
              <p>
                These activities are <strong className="text-gray-900">fully funded</strong> by the EU: travel, accommodation, food, insurance, and activity costs are all covered. Participants don&apos;t need any specific academic background — just motivation, curiosity, and a willingness to learn.
              </p>
            </div>
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
              Erasmus+ Youth offers several types of activities for different audiences and goals.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {activityTypes.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.title}
                  className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-gray-50"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] ${activity.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-esn-dark">{activity.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{activity.ageRange}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{activity.duration}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{activity.description}</p>
                  <ul className="space-y-2">
                    {activity.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle2 className={`w-4 h-4 ${activity.accent} mt-0.5 flex-shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
            Youth exchanges and trainings are <strong className="text-gray-900">fully funded</strong> by the Erasmus+ programme. Here&apos;s what the grant covers:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: MapPin, title: 'Travel Costs', desc: 'Round-trip travel to the activity venue, calculated by distance band (typically €180–€1500).' },
              { icon: Wallet, title: 'Accommodation & Food', desc: 'All meals and lodging during the entire activity are covered by the project budget.' },
              { icon: CalendarDays, title: 'Activity Costs', desc: 'Workshops, materials, excursions, cultural activities — everything included in the programme.' },
              { icon: Globe2, title: 'Insurance', desc: 'Health and accident insurance for the duration of the activity abroad.' },
              { icon: Users, title: 'Visa Support', desc: 'Visa costs are reimbursed if applicable. Organisers provide invitation letters and support.' },
              { icon: Search, title: 'Youthpass Certificate', desc: 'Official certificate recognising the competences and skills developed during the activity.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-esn-green/10 text-esn-green flex items-center justify-center mb-3">
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
              Here&apos;s the step-by-step process to join a youth exchange or training course.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {participationSteps.map((step) => (
              <div key={step.number} className="flex gap-5 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-esn-green text-white text-xl font-black">
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

      {/* ═══════ WHERE TO FIND PROJECTS ═══════ */}
      <section className="py-12 sm:py-16 md:py-20 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-esn-dark mb-4 text-center">
            Where to Find Projects
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-center">
            Discover open calls and available projects through these platforms.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'SALTO-YOUTH', desc: 'The main European resource centre for youth work — find training courses, youth exchanges, and seminars.', href: 'https://www.salto-youth.net/' },
              { title: 'European Youth Portal', href: 'https://youth.europa.eu/', desc: 'EU portal with opportunities for young people: volunteering, trainings, exchanges, and more.' },
              { title: 'Telegram Channels', desc: 't.me/tviyspace, t.me/studwaydiem, t.me/Mozhlyvosti, t.me/Yeas_opportunities, t.me/fri_ua, t.me/nonformalO', href: 'https://t.me/tviyspace' },
              { title: 'Facebook Pages', desc: 'facebook.com/uagrant, facebook.com/softskills.ua, facebook.com/UnionForum', href: 'https://www.facebook.com/uagrant' },
            ].map((platform) => (
              <a
                key={platform.href}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-esn-green/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-esn-dark text-lg group-hover:text-esn-green transition-colors">{platform.title}</h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-esn-green transition-colors" />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{platform.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-r from-esn-green to-esn-cyan">
        <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
            Ready for Your First Exchange?
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Youth exchanges and trainings are one of the most accessible ways to gain international experience. No academic requirements, no costs — just your motivation and openness to learn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.salto-youth.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark hover:bg-esn-dark hover:text-white transition-colors"
            >
              Find a Project
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-esn-dark transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
