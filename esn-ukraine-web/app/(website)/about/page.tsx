import Link from 'next/link';
import { ArrowLeft, ArrowRight, Users, Megaphone, Heart, Building2 } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section - matching other pages style */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-cyan/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-esn-magenta/10 rounded-full blur-3xl" />

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
                            About ESN Ukraine
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Erasmus Student Network Ukraine is a national-level student organization
                            representing local ESN sections across the country.
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-black text-esn-dark mb-6 md:text-4xl">
                                What is ESN Ukraine?
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                ESN Ukraine is a non-profit national-level student organization that represents local Erasmus Student Network sections. Our mission is to represent international students, thus provide opportunities for cultural understanding and self-development under the principle of Students Helping Students. We also share information about opportunities provided by Erasmus+ program and maintain a national-wide alumni network.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-esn-cyan/20 to-esn-magenta/20 flex items-center justify-center">
                                <div className="text-6xl font-black text-esn-dark/20">ESN UA</div>
                            </div>
                            <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-3xl bg-esn-cyan/10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-24 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-esn-magenta/20 to-esn-green/20 flex items-center justify-center">
                                <div className="text-6xl font-black text-esn-dark/20">2019</div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-esn-magenta/10" />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl font-black text-esn-dark mb-6 md:text-4xl">
                                Our History
                            </h2>
                            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                                <p>
                                    At the moment, we have a section in Kyiv and another one in Chernivtsi. The board of ESN Kyiv is the one responsible for ESN Ukraine management.
                                </p>
                                <p>
                                    ESN Kyiv became an official member of Erasmus Student Network June 2nd, 2019. Yet, we celebrate our birthday on September 23rd, as on this day in 2018 we were registered as a candidate section. ESN Kyiv originally started taking care of the international students of Taras Shevchenko National University of Kyiv. Since one of our key priorities is expanding to more universities in Kyiv, we already are cooperating with the National University of Life and Environmental Sciences of Ukraine, Igor Sikorsky Kyiv Polytechnic Institute, Kyiv National Linguistic University and are in touch with others.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24">
                    <h2 className="text-3xl font-black text-esn-dark mb-6 md:text-4xl">
                        Who are ESN Kyiv and ESN Ukraine?
                    </h2>
                    <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                        <p>
                            Currently, we are a section of 40 members. A lot of us are students, some are recent graduates, but we all are active and inspired volunteers. Many of us take part in different international projects, are members of other youth organisations, or even lead our own initiatives. You can learn more about our team{' '}
                            <Link href="/about/board" className="text-esn-cyan hover:text-esn-magenta font-semibold underline decoration-2 underline-offset-4 transition-colors">
                                here
                            </Link>.
                        </p>
                        <p>
                            ESN Kyiv has a certain structure that helps us ensure we cover all the aspects of the international students' stay in the country and spreading awareness about Erasmus+. Our section consists of departments for Communication, Events, Partnerships, and Education.
                        </p>
                    </div>

                    {/* Department Visual List */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Communication', color: 'bg-esn-cyan' },
                            { name: 'Events', color: 'bg-esn-magenta' },
                            { name: 'Partnerships', color: 'bg-esn-green' },
                            { name: 'Education', color: 'bg-esn-dark' },
                        ].map((dept) => (
                            <div key={dept.name} className="text-center">
                                <div className={`w-16 h-16 mx-auto rounded-2xl ${dept.color} flex items-center justify-center mb-4`}>
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                                <span className="font-bold text-esn-dark">{dept.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-24 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <h2 className="text-3xl font-black text-esn-dark mb-4 md:text-4xl text-center">
                        What do we do?
                    </h2>
                    <p className="text-lg text-gray-700 text-center mb-16 max-w-2xl mx-auto">
                        ESN Kyiv has three main areas of work
                    </p>

                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Representation */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 rounded-2xl bg-esn-cyan flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-esn-dark mb-4">
                                Representation
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                We represent the interests of exchange students at all levels, help them adapt to life in Ukraine, as well as arrange their leisure time according to the following causes: culture, ecology, sports, social inclusion, employment, education, and youth.
                            </p>
                        </div>

                        {/* Promotion */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 rounded-2xl bg-esn-magenta flex items-center justify-center mb-6">
                                <Megaphone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-esn-dark mb-4">
                                Promotion
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Every semester we organize Erasmus days in key universities of Kyiv: KNU, KPI, KNLU, NPU, etc. We talk about all the opportunities provided by the program, give advice on application and share the experience of students who have already participated in the program.
                            </p>
                        </div>

                        {/* Support */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 rounded-2xl bg-esn-green flex items-center justify-center mb-6">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-esn-dark mb-4">
                                Support
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                We are creating the Erasmus Alumni community to develop the Erasmus generation in Ukraine, maintain connections between Program participants and facilitate their reintegration into society.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join CTA Section */}
            <section className="py-24 bg-esn-dark">
                <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 text-center">
                    <h2 className="text-3xl font-black text-white mb-6 md:text-4xl">
                        How to join ESN Ukraine or its local sections?
                    </h2>
                    <p className="text-lg text-white/80 mb-10 leading-relaxed">
                        We announce volunteer calls twice a year. Follow us on social media to hear about our recruitment first.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-esn-dark transition-all hover:bg-esn-cyan hover:text-white group"
                        >
                            Contact Us
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="https://instagram.com/esn_ukraine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10"
                        >
                            Follow Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
