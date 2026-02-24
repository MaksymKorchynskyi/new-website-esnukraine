import Link from 'next/link';
import { ArrowLeft, Users, Heart, Globe, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface Testimonial {
    id: string;
    name: string;
    role: 'buddy' | 'student';
    country: string;
    quote: string;
    image: string;
}

// ==========================================
// MOCK DATA (Replace with Sanity fetch)
// ==========================================
const TESTIMONIALS: Testimonial[] = [
    {
        id: '1',
        name: 'Marie',
        role: 'student',
        country: 'France',
        quote: 'My buddy helped me with everything from finding an apartment to navigating the metro. We became great friends!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: '2',
        name: 'Oleksandr',
        role: 'buddy',
        country: 'Ukraine',
        quote: 'Being a buddy changed my perspective. I learned so much about different cultures while helping others.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: '3',
        name: 'Carlos',
        role: 'student',
        country: 'Spain',
        quote: 'Without my buddy, I would have been lost in the first week. The support was invaluable.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    },
];

const BENEFITS_STUDENT = [
    { icon: MessageCircle, text: 'Personal guide before & during your exchange' },
    { icon: Globe, text: 'Cultural insights from a local perspective' },
    { icon: Calendar, text: 'Help with admin, housing, and daily life' },
    { icon: Heart, text: 'Instant friend to explore the city with' },
];

const BENEFITS_BUDDY = [
    { icon: Globe, text: 'Meet students from all over the world' },
    { icon: Heart, text: 'Develop intercultural skills' },
    { icon: Users, text: 'Join the ESN volunteer community' },
    { icon: Calendar, text: 'Access to exclusive ESN events' },
];

export default function BuddyPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-magenta/10 rounded-full blur-3xl" />
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
                            Buddy System
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Connecting international students with local buddies.
                            Making your exchange experience unforgettable, one friendship at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Two Options */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Get a Buddy */}
                        <div className="relative bg-gradient-to-br from-esn-cyan/5 to-esn-cyan/10 rounded-3xl p-8 lg:p-12 border border-esn-cyan/20">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-esn-cyan/10 rounded-full blur-2xl" />

                            <span className="inline-block bg-esn-cyan px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white mb-6">
                                International Student
                            </span>

                            <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-6">
                                Get a Buddy
                            </h2>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Coming to Ukraine for your exchange? Get matched with a local student
                                who will help you settle in and make the most of your experience.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {BENEFITS_STUDENT.map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-esn-cyan/20 text-esn-cyan">
                                            <benefit.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-gray-700">{benefit.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-esn-cyan px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-dark transition-colors"
                            >
                                Request a Buddy
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Become a Buddy */}
                        <div className="relative bg-gradient-to-br from-esn-magenta/5 to-esn-magenta/10 rounded-3xl p-8 lg:p-12 border border-esn-magenta/20">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-esn-magenta/10 rounded-full blur-2xl" />

                            <span className="inline-block bg-esn-magenta px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white mb-6">
                                Local Student
                            </span>

                            <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-6">
                                Become a Buddy
                            </h2>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Want to meet international students and share your love for Ukraine?
                                Join our buddy program and become part of the ESN family.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {BENEFITS_BUDDY.map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-esn-magenta/20 text-esn-magenta">
                                            <benefit.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-gray-700">{benefit.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-esn-magenta px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-dark transition-colors"
                            >
                                Apply Now
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-gray-50 py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our buddy matching process is simple and designed to create meaningful connections.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            { step: '01', title: 'Apply', desc: 'Fill out the form with your interests and preferences.' },
                            { step: '02', title: 'Match', desc: 'We pair you based on language, interests, and university.' },
                            { step: '03', title: 'Connect', desc: 'Start chatting before arrival and meet in person!' },
                        ].map((item, idx) => (
                            <div key={idx} className="relative text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-esn-dark text-white text-2xl font-black mb-6">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-esn-dark mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                                {idx < 2 && (
                                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-12 text-center">
                        What They Say
                    </h2>

                    <div className="grid gap-8 md:grid-cols-3">
                        {TESTIMONIALS.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-esn-dark">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.role === 'buddy' ? 'Buddy' : 'Exchange Student'} · {testimonial.country}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
