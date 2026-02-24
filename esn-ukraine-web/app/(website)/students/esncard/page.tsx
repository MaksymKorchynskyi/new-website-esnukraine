import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, MessageCircle, Send } from 'lucide-react';

export default function ESNcardPage() {
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
                            ESNcard
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Your membership card of the Erasmus Student Network.
                        </p>
                    </div>
                </div>
            </section>

            {/* ESNcard Photo + Description */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-16 lg:grid-cols-2 items-center">
                        {/* ESNcard Image */}
                        <div className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                            <Image
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
                                alt="ESNcard"
                                fill
                                className="object-cover"
                            />
                        </div>
                                                       
                        {/* Text Content */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-8">
                                What is the ESNcard?
                            </h2>
                            <div className="space-y-5 text-gray-700 text-lg leading-[1.8]">
                                <p className="text-xl font-semibold text-esn-dark">
                                    The ESNcard is a membership card of the Erasmus Student Network.
                                </p>
                                <p>
                                    The ESNcard is valid for 12 months and only valid with a photo and correct personal data. It gives you access to the services of all partners of ESN around Europe, as well as our local partners.
                                </p>
                                <p>
                                    This means that with your ESNcard, you can access the discounts from all the partners of ESN regardless of the country you reside in.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Can Get an ESNcard */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gray-50">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-8">
                            Who can get the ESNcard?
                        </h2>
                        <p className="text-gray-700 mb-8 text-lg leading-[1.8]">
                            You can get the ESNcard, if you belong to one of the following groups:
                        </p>
                        <ul className="space-y-3 mb-10">
                            {[
                                'Erasmus+ students.',
                                'Erasmus+ trainees.',
                                'Erasmus+ Full International Degree incoming students.',
                                'International incoming students or trainees on a mobility programme, other than Erasmus+.',
                                'International undergraduate or postgraduate full degree students.',
                                'EVS participants.',
                                'ESNers: either active on the Local, National or International Level. They are all members of a section.',
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-esn-magenta flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="text-gray-600 mb-4">
                            Learn more at{' '}
                            <a
                                href="https://esncard.org/FAQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-esn-cyan font-bold hover:underline inline-flex items-center gap-1"
                            >
                                ESNcard.org/FAQ
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Photos - 3 in a row */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-esn-dark mb-4">
                            ESNcard Benefits
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Enjoy exclusive discounts and perks across Europe with your ESNcard.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Travel Discounts',
                                description: 'Save on flights, buses, and trains across Europe with partners like Ryanair and Flixbus.',
                                imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600',
                            },
                            {
                                title: 'Local Partner Deals',
                                description: 'Access exclusive discounts at cafes, restaurants, and services in Ukrainian cities.',
                                imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
                            },
                            {
                                title: 'Events & Entertainment',
                                description: 'Priority access to ESN events, trips, and cultural activities across the network.',
                                imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="group rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={benefit.imageUrl}
                                        alt={benefit.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-esn-dark mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Get - CTA */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 bg-esn-dark text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">
                        How to Get Your ESNcard
                    </h2>
                    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        In order to get your ESNcard, get in touch with us via Messenger or Telegram.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://m.me/esnukraine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-[#0084FF] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-[#0073E6] transition-colors shadow-lg"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Messenger
                        </a>
                        <a
                            href="https://t.me/esnukraine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-[#26A5E4] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-[#1E96D1] transition-colors shadow-lg"
                        >
                            <Send className="w-5 h-5" />
                            Telegram
                        </a>
                    </div>

                    <p className="mt-8 text-gray-400">
                        Or visit{' '}
                        <a
                            href="https://esncard.org/FAQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-esn-cyan hover:underline font-bold"
                        >
                            ESNcard.org/FAQ
                        </a>{' '}
                        for more information.
                    </p>
                </div>
            </section>
        </main>
    );
}
