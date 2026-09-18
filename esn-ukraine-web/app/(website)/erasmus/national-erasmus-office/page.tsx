import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Globe2,
  Users,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Megaphone,
  BarChart3,
  Handshake,
  GraduationCap,
  CalendarDays,
  Lightbulb,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'National Erasmus+ Office in Ukraine — Support & Information | ESN Ukraine',
  description:
    'Learn about the National Erasmus+ Office (NEO) in Ukraine: its role in supporting Erasmus+ programme implementation, services for universities and students, and contact information.',
  alternates: {
    canonical: 'https://esnukraine.org/erasmus/national-erasmus-office',
  },
  openGraph: {
    title: 'National Erasmus+ Office in Ukraine — Support & Information',
    description:
      'Learn about the National Erasmus+ Office (NEO) in Ukraine: its role in supporting Erasmus+ programme implementation, services for universities and students.',
    url: 'https://esnukraine.org/erasmus/national-erasmus-office',
    siteName: 'ESN Ukraine',
    type: 'website',
  },
};

const keyFunctions = [
  {
    icon: Megaphone,
    color: 'bg-esn-cyan',
    title: 'Information & Promotion',
    description: 'Raising awareness about Erasmus+ opportunities among higher education institutions, students, and academic staff. Organising information campaigns, webinars, and #ErasmusDays events.',
  },
  {
    icon: Handshake,
    color: 'bg-esn-magenta',
    title: 'Technical Assistance',
    description: 'Providing guidance and technical support to Ukrainian universities in preparing Erasmus+ project proposals, understanding programme rules, and implementing funded projects.',
  },
  {
    icon: BarChart3,
    color: 'bg-esn-green',
    title: 'Monitoring & Quality Assurance',
    description: 'Monitoring the implementation of Erasmus+ projects in Ukraine, ensuring quality standards, and providing feedback to improve programme delivery.',
  },
  {
    icon: Globe2,
    color: 'bg-esn-dark',
    title: 'Policy Dialogue',
    description: 'Facilitating policy dialogue between Ukrainian authorities, the European Commission, and EACEA on higher education reform and internationalisation.',
  },
];

const servicesForStudents = [
  'Information about Erasmus+ mobility opportunities (study and traineeship abroad)',
  'Guidance on International Credit Mobility (KA171) projects available at Ukrainian universities',
  'Information about Erasmus Mundus Joint Master Programmes and scholarships',
  'Support with understanding application procedures and eligibility criteria',
  'Resources and publications about Erasmus+ in Ukraine',
  'Promotion of #ErasmusDays events and activities',
];

const servicesForUniversities = [
  'Training workshops on Erasmus+ project proposal writing',
  'Technical assistance for International Credit Mobility (KA171) projects',
  'Support for Capacity Building in Higher Education (CBHE) project applications',
  'Guidance on Erasmus Charter for Higher Education (ECHE) application',
  'Information about Jean Monnet activities and other Erasmus+ actions',
  'Networking opportunities with European partner institutions',
  'Monitoring visits and quality assurance support',
];

const initiatives = [
  {
    title: '#ErasmusDays',
    description: 'Annual celebration of the Erasmus+ programme held every October. NEO Ukraine coordinates a nationwide campaign with events at universities, info sessions, and social media activities.',
    color: 'border-esn-cyan',
  },
  {
    title: 'Higher Education Reform',
    description: 'NEO contributes to Ukraine\'s higher education reform agenda by facilitating international cooperation, promoting Bologna Process values, and supporting quality assurance improvements.',
    color: 'border-esn-magenta',
  },
  {
    title: 'NEO HERE Project',
    description: 'The Higher Education Reform Experts (HERE) team, coordinated by NEO, consists of experienced academics who provide expertise on higher education modernisation and reform.',
    color: 'border-esn-green',
  },
  {
    title: 'International Conferences',
    description: 'NEO Ukraine organises and participates in national and international conferences on higher education internationalisation, academic mobility, and programme impact assessment.',
    color: 'border-esn-dark',
  },
];

export default function NationalErasmusOfficePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'National Erasmus+ Office in Ukraine — Support & Information',
    description:
      'Learn about the National Erasmus+ Office (NEO) in Ukraine: its role in supporting Erasmus+ programme implementation, services for universities and students.',
    url: 'https://esnukraine.org/erasmus/national-erasmus-office',
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
        { '@type': 'ListItem', position: 3, name: 'National Erasmus+ Office', item: 'https://esnukraine.org/erasmus/national-erasmus-office' },
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
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-orange-500/20" />
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-orange-500/15 rounded-full blur-3xl" />
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
              National Erasmus+ Office
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              The National Erasmus+ Office in Ukraine supports the implementation and promotion of the Erasmus+ programme across the country.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT IS NEO ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
                What is the National Erasmus+ Office?
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
                <p>
                  The <strong className="text-gray-900">National Erasmus+ Office (NEO)</strong> is an official structure established by the European Commission in partner countries to support the implementation of the Erasmus+ programme. NEOs exist in countries neighbouring the EU, including Ukraine.
                </p>
                <p>
                  <strong className="text-gray-900">NEO Ukraine</strong> serves as the main point of contact for all Erasmus+ higher education activities in the country. It operates under the supervision of the <strong className="text-orange-500">European Education and Culture Executive Agency (EACEA)</strong> and works closely with the Delegation of the European Union to Ukraine.
                </p>
                <p>
                  The office plays a crucial role in <strong className="text-gray-900">bridging Ukrainian higher education institutions with European partners</strong>, facilitating academic mobility, supporting project implementation, and promoting the values and opportunities of the Erasmus+ programme.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 sm:p-8">
                <h3 className="font-bold text-esn-dark text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-orange-500" />
                  At a Glance
                </h3>
                <ul className="space-y-3">
                  {[
                    'Established by the European Commission',
                    'Operating since Erasmus+ programme launch in Ukraine',
                    'Part of a global network of 25+ NEOs',
                    'Funded by the EU through EACEA',
                    'Works with 200+ Ukrainian HEIs',
                    'Coordinates Higher Education Reform Experts (HERE)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ KEY FUNCTIONS ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
              Key Functions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl">
              The NEO performs several essential functions to support Erasmus+ in Ukraine.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {keyFunctions.map((func) => {
              const Icon = func.icon;
              return (
                <div
                  key={func.title}
                  className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] ${func.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-esn-dark mb-3">{func.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{func.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-8 sm:mb-12">
            How NEO Helps
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-esn-cyan/5 border border-esn-cyan/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-esn-cyan/15 text-esn-cyan flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-esn-dark text-lg sm:text-xl">For Students</h3>
              </div>
              <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
                {servicesForStudents.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-esn-cyan mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-esn-dark text-lg sm:text-xl">For Universities</h3>
              </div>
              <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
                {servicesForUniversities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ChevronRight className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ INITIATIVES ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
              Key Initiatives
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl">
              Beyond daily operations, NEO Ukraine drives important initiatives that shape higher education in the country.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {initiatives.map((initiative) => (
              <div key={initiative.title} className={`bg-white rounded-2xl p-6 sm:p-8 border-l-4 ${initiative.color} shadow-sm`}>
                <h3 className="font-bold text-esn-dark text-lg sm:text-xl mb-3">{initiative.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ESN UKRAINE & NEO ═══════ */}
      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-6 sm:mb-8">
                ESN Ukraine & NEO
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-[1.8]">
                <p>
                  <strong className="text-esn-magenta">ESN Ukraine</strong> and the <strong className="text-orange-500">National Erasmus+ Office</strong> have a strong collaborative partnership. Together, we work to promote the Erasmus+ programme and ensure Ukrainian students have access to international mobility opportunities.
                </p>
                <p>
                  Our joint activities include co-organising <strong className="text-gray-900">#ErasmusDays</strong> events, conducting information campaigns about Erasmus+ opportunities, and sharing resources to help students navigate the application process.
                </p>
                <p>
                  This partnership exemplifies how student organisations and official programme structures can work together to maximise the impact of EU education programmes.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: CalendarDays, title: 'Joint #ErasmusDays Events', desc: 'Co-organising nationwide events every October to celebrate Erasmus+ and inform students about opportunities.' },
                { icon: Megaphone, title: 'Information Campaigns', desc: 'Shared social media campaigns, webinars, and publications reaching thousands of Ukrainian students.' },
                { icon: Lightbulb, title: 'Best Practice Exchange', desc: 'Collaborating on improving student mobility experience and sharing insights from ESN\'s European network.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4 sm:gap-5 bg-gray-50 rounded-2xl p-5 sm:p-6">
                    <div className="w-12 h-12 rounded-xl bg-esn-magenta/10 text-esn-magenta flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-esn-dark text-base sm:text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT NEO ═══════ */}
      <section className="py-12 sm:py-16 md:py-20 px-6 sm:px-12 lg:px-24 bg-[#F4F8FA]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-esn-dark mb-4">
            Contact the National Erasmus+ Office
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Reach out to NEO Ukraine for information and support regarding Erasmus+ higher education activities.
          </p>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-left">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Website</p>
                  <a href="https://erasmusplus.org.ua/" target="_blank" rel="noopener noreferrer" className="text-esn-cyan font-bold hover:text-esn-magenta transition-colors">
                    erasmusplus.org.ua
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
                  <a href="mailto:office@erasmusplus.org.ua" className="text-esn-cyan font-bold hover:text-esn-magenta transition-colors">
                    office@erasmusplus.org.ua
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Address</p>
                  <p className="text-gray-700 font-medium">Kyiv, Ukraine</p>
                </div>
              </div>
            </div>
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
            Official links related to Erasmus+ and the National Erasmus+ Office.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'NEO Ukraine Website', href: 'https://erasmusplus.org.ua/' },
              { title: 'EACEA — National Erasmus+ Offices', href: 'https://www.eacea.ec.europa.eu/about-eacea/national-offices_en' },
              { title: 'EC — Erasmus+', href: 'https://erasmus-plus.ec.europa.eu/' },
              { title: 'EU Delegation to Ukraine', href: 'https://www.eeas.europa.eu/delegations/ukraine_en' },
              { title: 'Erasmus+ Programme Guide', href: 'https://erasmus-plus.ec.europa.eu/programme-guide/erasmusplus-programme-guide' },
              { title: 'ESN Ukraine', href: 'https://esnukraine.org' },
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
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-r from-orange-500 to-esn-dark">
        <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
            Explore Erasmus+ Opportunities
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re a student looking to study abroad or a university seeking international partnerships, the NEO and ESN Ukraine are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://erasmus-plus.ec.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark hover:bg-esn-cyan hover:text-white transition-colors"
            >
              Official Erasmus+ Website
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-esn-dark transition-colors"
            >
              Contact ESN Ukraine
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
