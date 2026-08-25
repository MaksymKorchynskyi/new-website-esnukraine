import Link from 'next/link';
import { ArrowLeft, GraduationCap, Globe, Calendar, Users, FileText, ExternalLink, ArrowRight } from 'lucide-react';

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface ErasmusStat {
    id: string;
    value: string;
    label: string;
}

interface ErasmusStep {
    id: string;
    number: string;
    title: string;
    description: string;
}

// ==========================================
// MOCK DATA (Replace with Sanity fetch)
// ==========================================
const ERASMUS_STATS: ErasmusStat[] = [
    { id: '1', value: '33+', label: 'Years of Erasmus' },
    { id: '2', value: '4000+', label: 'Partner Universities' },
    { id: '3', value: '12M', label: 'Students Participated' },
    { id: '4', value: '33', label: 'Countries' },
];

const ERASMUS_STEPS: ErasmusStep[] = [
    {
        id: '1',
        number: '01',
        title: 'Check Eligibility',
        description: 'Contact your home university\'s international office to see available destinations and requirements.',
    },
    {
        id: '2',
        number: '02',
        title: 'Apply',
        description: 'Submit your application with motivation letter, transcript, and language certificate.',
    },
    {
        id: '3',
        number: '03',
        title: 'Get Selected',
        description: 'Once accepted, receive your grant agreement and start preparing for your adventure.',
    },
    {
        id: '4',
        number: '04',
        title: 'Study Abroad',
        description: 'Spend 3-12 months at a partner university while receiving an EU grant.',
    },
];

export default function ErasmusPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-green/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-esn-cyan/10 rounded-full blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                            Erasmus+
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            The EU's flagship programme for education, training, youth and sport.
                            Your ticket to studying abroad and discovering Europe.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 px-6 sm:px-12 lg:px-24 bg-white">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
                        {ERASMUS_STATS.map((stat) => (
                            <div key={stat.id} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-esn-cyan mb-2">{stat.value}</div>
                                <div className="text-sm font-medium uppercase tracking-widest text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What is Erasmus */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gray-50">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-6">
                                What is Erasmus+?
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Erasmus+ is the European Union's programme for education, training, youth, and sport.
                                    It offers opportunities to study, train, gain experience, and volunteer abroad.
                                </p>
                                <p>
                                    For students, the most popular option is <strong>Erasmus+ Student Mobility</strong>,
                                    which allows you to spend 3-12 months at a partner university in another country
                                    while receiving an EU grant to cover living expenses.
                                </p>
                                <p>
                                    Ukraine participates in Erasmus+ as a partner country, meaning Ukrainian students
                                    can study in EU countries, and EU students can come to Ukraine!
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { icon: GraduationCap, title: 'Study Abroad', desc: 'Spend a semester at a European university' },
                                { icon: FileText, title: 'Traineeships', desc: 'Get work experience at companies abroad' },
                                { icon: Globe, title: 'International Credit', desc: 'ECTS credits recognized at home' },
                                { icon: Users, title: 'Network', desc: 'Meet students from 33+ countries' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-esn-green/10 text-esn-green mb-4">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-esn-dark mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Apply */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-4">
                            How to Apply
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The application process varies by university, but here's the general roadmap.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {ERASMUS_STEPS.map((step, idx) => (
                            <div key={step.id} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-esn-dark text-white text-xl font-black">
                                        {step.number}
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-xl font-bold text-esn-dark mb-2">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 bg-esn-dark">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                        Useful Resources
                    </h2>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                        Official information and tools to help you on your Erasmus journey.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { title: 'European Commission', href: 'https://ec.europa.eu/programmes/erasmus-plus/' },
                            { title: 'Erasmus+ App', href: 'https://erasmusapp.eu/' },
                            { title: 'ESN International', href: 'https://esn.org/' },
                        ].map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl transition-colors"
                            >
                                {link.title}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gradient-to-r from-esn-green to-esn-cyan">
                <div className="mx-auto max-w-4xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">
                        Coming to Ukraine on Erasmus?
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        We're here to help you make the most of your exchange. Check out our resources for incoming students.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/students/survival-guide"
                            className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark hover:bg-esn-dark hover:text-white transition-colors"
                        >
                            Survival Guide
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/students/buddy"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-esn-dark transition-colors"
                        >
                            Get a Buddy
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
