'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Users, Megaphone, Heart, Building2, GraduationCap, Globe2, ImageIcon, Mail } from 'lucide-react';

/* ── Scroll reveal ── */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
        );
        el.querySelectorAll('.reveal').forEach((child) => observer.observe(child));
        return () => observer.disconnect();
    }, []);
    return ref;
}

/* ── Animated Counter ── */
function AnimatedCounter({ value, duration = 2000 }: { value: string, duration?: number }) {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);
    
    const numMatch = value.match(/[\d,.]+/);
    const num = numMatch ? parseFloat(numMatch[0].replace(/,/g, '')) : 0;
    const prefix = numMatch ? value.substring(0, numMatch.index) : '';
    const suffix = numMatch ? value.substring(numMatch.index! + numMatch[0].length) : value;

    const startAnimation = () => {
        setIsAnimating(true);
        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // easeOutExpo
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(num * easeOut);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(num);
                setIsAnimating(false);
            }
        };
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    startAnimation();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [num, duration]);

    const isFloat = num % 1 !== 0;
    const displayCount = isFloat ? count.toFixed(1) : Math.floor(count);

    return (
        <span 
            ref={ref} 
            className={`inline-block transition-transform duration-300 ${isAnimating ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
            onClick={(e) => {
                e.stopPropagation();
                if (!isAnimating) startAnimation();
            }}
            title="Click to recount!"
        >
            {prefix}{displayCount}{suffix}
        </span>
    );
}

/* ── History Slider ── */
function HistorySlider() {
    const [current, setCurrent] = useState(0);
    const images = ['/history_1.png', '/history_2.png', '/history_3.jpg'];

    return (
        <div className="relative group rounded-3xl overflow-hidden aspect-[4/3] bg-[#F8F9FA] shadow-sm border border-[#F3F4F6]">
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((src, i) => (
                    <img key={i} src={src} alt={`ESN History ${i + 1}`} className="min-w-full h-full object-cover" />
                ))}
            </div>
            {/* Arrows */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => setCurrent(prev => Math.max(0, prev - 1))}
                    disabled={current === 0}
                    className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm backdrop-blur disabled:opacity-0 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => setCurrent(prev => Math.min(images.length - 1, prev + 1))}
                    disabled={current === images.length - 1}
                    className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm backdrop-blur disabled:opacity-0 transition-all"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => setCurrent(i)}
                        className={`transition-all rounded-full ${current === i ? 'w-6 bg-white scale-100' : 'w-2 bg-white/60 hover:bg-white/80'} h-2`}
                    />
                ))}
            </div>
        </div>
    );
}

/* ── Photo placeholder ── */
function PhotoSlot({ className = '', aspect = 'aspect-[4/3]' }: { className?: string; aspect?: string }) {
    return (
        <div className={`${aspect} rounded-3xl bg-[#F8F9FA] flex items-center justify-center overflow-hidden ${className} border border-[#F3F4F6]`}>
            <div className="flex flex-col items-center gap-2 text-gray-300">
                <ImageIcon className="w-10 h-10" strokeWidth={1} />
                <span className="text-[10px] font-bold tracking-widest uppercase">Photo</span>
            </div>
        </div>
    );
}

export default function AboutPage() {
    const scrollRef = useScrollReveal();

    return (
        <main className="min-h-screen bg-white" ref={scrollRef}>
            <style jsx global>{`
                .reveal {
                    opacity: 0;
                    transform: translateY(28px);
                    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal.revealed {
                    opacity: 1;
                    transform: translateY(0);
                }
                .reveal-d1 { transition-delay: 0.1s; }
                .reveal-d2 { transition-delay: 0.2s; }
                .reveal-d3 { transition-delay: 0.3s; }
            `}</style>

            {/* ═══════ HERO & INTRO ═══════ */}
            <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 md:pb-20 bg-white">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-esn-dark transition-colors mb-6 sm:mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-esn-dark leading-[1.08] tracking-tight reveal mb-10 sm:mb-12">
                        About Us
                    </h1>
                    
                    <div className="reveal reveal-d1">
                        <p className="text-xl sm:text-2xl md:text-3xl leading-[1.6] text-gray-900 font-medium tracking-tight max-w-5xl">
                            <span className="font-black text-esn-dark">ESN Ukraine</span> is a youth non-governmental organisation and part of the <span className="font-bold text-esn-cyan">Erasmus Student Network</span>, one of the largest student networks in Europe, bringing together 44 countries.
                        </p>
                        <div className="my-8 sm:my-10 w-full max-w-4xl h-px bg-gray-200"></div>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 sm:text-gray-700 font-medium leading-[1.6] max-w-4xl">
                            We work to ensure Ukrainian youth have access to quality education, international mobility, and development opportunities within the common European space.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════ MISSION & VISION (Blue tinted) ═══════ */}
            <section className="py-10 sm:py-14 md:py-20 bg-[#F4F8FA]">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1 reveal">
                            <div className="aspect-square rounded-3xl overflow-hidden bg-[#F8F9FA] border border-[#F3F4F6] shadow-sm relative">
                                <video 
                                    src="/This%20is%20ESN%20Ukraine.mp4" 
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 reveal reveal-d1">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-8 sm:mb-10">
                                Our Mission & Vision
                            </h2>
                            <div className="space-y-8">
                                <div className="pl-6 border-l-[3px] border-esn-cyan">
                                    <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-esn-cyan mb-1.5">Mission</p>
                                    <p className="text-base sm:text-lg text-gray-800 leading-[1.8]">
                                        To facilitate the development of the Ukrainian youth sector on its path to the EU, implementing the best international educational practices and representing the interests of our youth on the international stage.
                                    </p>
                                </div>
                                <div className="pl-6 border-l-[3px] border-esn-magenta">
                                    <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-esn-magenta mb-1.5">Vision</p>
                                    <p className="text-base sm:text-lg text-gray-800 leading-[1.8]">
                                        Ukraine as a popular destination for international mobility, and Ukrainian youth as an active, conscious, and integrated part of the European community.
                                    </p>
                                </div>
                                <p className="text-base sm:text-lg text-gray-800 leading-[1.8] pt-2">
                                    Our core principle is <span className="font-black text-esn-magenta whitespace-nowrap">Students Helping Students</span>. It is not just a slogan. It is what every ESN Ukraine volunteer practices every single day.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ STATS ═══════ */}
            <section className="py-10 sm:py-14 md:py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <div className="reveal text-center mb-10 sm:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-esn-dark mb-3 sm:mb-4">
                            ESN Ukraine in Numbers
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                            The scale of our impact and the strength of our community.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                        {[
                            { value: '200+', label: 'Active Volunteers', color: 'text-esn-cyan' },
                            { value: '5', label: 'Local Sections', color: 'text-esn-magenta' },
                            { value: '50+', label: 'Events Per Year', color: 'text-esn-green' },
                            { value: '€70k+', label: 'EU Grants Managed', color: 'text-esn-dark' },
                            { value: '6+', label: 'Years of Impact', color: 'text-[#F47B20]' },
                        ].map((stat, i) => (
                            <div 
                                key={stat.label} 
                                className={`reveal reveal-d${Math.min(i + 1, 3)} text-center py-8 px-4 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 cursor-pointer group`}
                                onClick={(e) => {
                                    const span = e.currentTarget.querySelector('span');
                                    if (span) span.click();
                                }}
                            >
                                <div className={`text-4xl sm:text-5xl font-black mb-3 ${stat.color}`}>
                                    <AnimatedCounter value={stat.value} />
                                </div>
                                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ HISTORY ═══════ */}
            <section className="py-10 sm:py-14 md:py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-8 sm:mb-12 reveal">
                        Our History
                    </h2>

                    <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-start">
                        <div className="space-y-5 sm:space-y-6 text-base sm:text-lg leading-[1.8] text-gray-800 reveal">
                            <p>
                                It all started in <span className="font-bold text-gray-900">2018</span>, when a group of students at Taras Shevchenko National University of Kyiv created an initiative to support international students. On <span className="font-bold text-gray-900">September 23, 2018</span>, ESN Kyiv received candidate status within the Erasmus Student Network. On <span className="font-bold text-gray-900">June 2, 2019</span>, at the Council of National Representatives in Palermo, Ukraine became a full member of the network.
                            </p>
                            <p>
                                The network grew fast. In <span className="font-bold text-gray-900">2021</span>, during the Mid-term General Assembly of ESN International, ESN Chernivtsi joined, initiated by students of Yuriy Fedkovych Chernivtsi National University and Bukovinian State Medical University.
                            </p>
                        </div>
                        <div className="reveal reveal-d2">
                            <HistorySlider />
                        </div>
                    </div>

                    {/* Turning point */}
                    <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-200">
                        <div className="max-w-5xl reveal">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-esn-dark mb-5 sm:mb-6">
                                A Turning Point
                            </h3>
                            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg leading-[1.8] text-gray-800">
                                <p>
                                    <span className="font-bold text-gray-900">February 2022</span> changed everything. After the start of the full-scale russian invasion, the organisation adapted to the new reality. While remaining an active part of the international network, ESN Ukraine significantly expanded its focus to support Ukrainian youth: informing about Erasmus+ programmes, facilitating mobility for our students, advocating their interests at the European level, and sharing stories of resilience.
                                </p>
                                <p>
                                    Despite the war, the network continued to expand. In <span className="font-bold text-gray-900">November 2024</span>, at the Autumn National Assembly in Lviv, the candidate section ESN IFNUL was officially launched at Ivan Franko National University of Lviv. In <span className="font-bold text-gray-900">May 2025</span>, at the Spring National Assembly hosted by Lviv Polytechnic National University, both Lviv sections, ESN IFNUL and ESN LPNU, received full membership. In <span className="font-bold text-gray-900">November 2025</span>, at the Autumn National Assembly in Chernivtsi, ESN Odesa at Odesa National University also gained official status.
                                </p>
                                <p>
                                    Today ESN Ukraine brings together five full-member sections in four cities. On the international level, ESN Ukraine is a full member of the Erasmus Student Network, uniting 500+ sections in 44 European countries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ WHAT WE DO ═══════ */}
            <section className="py-10 sm:py-14 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <div className="mb-8 sm:mb-12 reveal text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-esn-dark mb-3 sm:mb-4">
                            What We Do
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                            Our work focuses on several key directions
                        </p>
                    </div>

                    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
                        {[
                            {
                                icon: GraduationCap,
                                color: 'bg-esn-cyan',
                                title: 'Academic mobility & Erasmus+ programme support for Ukrainian students',
                                text: 'We inform Ukrainian students about exchange opportunities, scholarships, and Erasmus+ programmes, and help them prepare for participation.',
                            },
                            {
                                icon: Users,
                                color: 'bg-esn-magenta',
                                title: 'Leadership development, civic activism & youth governance',
                                text: 'Through national assemblies, workshops, and trainings we build a community of young leaders capable of influencing youth policy.',
                            },
                            {
                                icon: Globe2,
                                color: 'bg-esn-green',
                                title: 'Intercultural dialogue & EU–Ukraine integration advocacy',
                                text: 'We build bridges between Ukrainian and European youth, promoting values of solidarity and mutual understanding.',
                            },
                            {
                                icon: Megaphone,
                                color: 'bg-esn-dark',
                                title: 'Research, digital campaigns & policy engagement',
                                text: 'We bring the voice of Ukrainian students to EU institutions and take part in shaping youth policy at the European level.',
                            },
                        ].map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    className={`reveal reveal-d${Math.min(i + 1, 3)} bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300`}
                                >
                                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] ${card.color} flex items-center justify-center mb-6`}>
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-esn-dark mb-3">{card.title}</h3>
                                    <p className="text-gray-600 leading-[1.6] text-sm sm:text-base">{card.text}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Projects Link */}
                    <div className="mt-8 sm:mt-12 bg-esn-cyan/5 border border-esn-cyan/10 rounded-2xl p-5 sm:p-8 text-center reveal">
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                            We turn these core directions into <span className="font-black text-gray-900">real action</span> through impactful projects that empower students and drive positive change across Ukraine.
                        </p>
                        <div className="mt-4 sm:mt-5">
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-1.5 text-esn-cyan font-bold text-sm sm:text-base hover:text-esn-magenta"
                            >
                                <span className="border-b border-transparent group-hover:border-current pb-px">
                                    See our projects
                                </span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ PARTNERS ═══════ */}
            <section className="py-10 sm:py-14 md:py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <div className="reveal max-w-3xl mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4">
                            Partners & Cooperation
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 font-medium">
                            ESN Ukraine collaborates with:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 reveal reveal-d1">
                        {[
                            { name: 'National Erasmus+ Office in Ukraine', desc: 'Joint initiatives, trainings, and information campaigns (including #ErasmusDays).' },
                            { name: 'Eurodesk', desc: 'ESN Ukraine has been an official Eurodesk multiplier in Ukraine since 2026.' },
                            { name: 'DG EAC, European Commission', desc: 'As an Erasmus+ beneficiary and advocacy event partner in Brussels.' },
                            { name: 'European Parliament', desc: 'Participation in the European Youth Event, hosting sessions and Living Library at EP venues.' },
                        ].map((partner) => (
                            <div key={partner.name} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-md transition-all">
                                <p className="font-bold text-gray-900 text-lg sm:text-xl mb-2">{partner.name}</p>
                                <p className="text-gray-600 font-medium text-base leading-[1.6]">{partner.desc}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 reveal reveal-d2">
                        <p className="text-gray-700 font-medium text-base sm:text-lg max-w-4xl leading-relaxed">
                            <span className="font-bold text-gray-900">ESN Ukraine is a registered non-profit public organisation in Ukraine.</span> We proudly collaborate with numerous local and international partners, and we are always actively open to new meaningful connections and opportunities to support youth.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════ GET INVOLVED (Horizontal List Style) ═══════ */}
            <section className="py-10 sm:py-14 md:py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
                    <div className="reveal mb-10 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-esn-dark mb-4 sm:mb-5">
                            Get Involved
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
                            Want to be part of ESN Ukraine? Here is how:
                        </p>
                    </div>
                    
                    <div className="space-y-8 sm:space-y-10 max-w-3xl mb-12 sm:mb-16">
                        {[
                            {
                                icon: Heart,
                                iconBg: 'bg-[#EAF6FB]',
                                iconColor: 'text-[#00AEEF]',
                                title: 'Become a Volunteer',
                                desc: 'Join one of our five sections in Kyiv, Lviv, Chernivtsi, or Odesa.',
                            },
                            {
                                icon: Building2,
                                iconBg: 'bg-[#FDF0F6]',
                                iconColor: 'text-[#EC008C]',
                                title: 'Open a New Section',
                                desc: 'No ESN in your city yet? Get in touch and we will walk you through the process.',
                            },
                            {
                                icon: Users,
                                iconBg: 'bg-[#F2F8EE]',
                                iconColor: 'text-[#7AC143]',
                                title: 'Become a Partner',
                                desc: 'We welcome collaboration with universities, businesses, NGOs, and international organisations.',
                            },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className={`reveal reveal-d${i + 1} flex items-start gap-5 sm:gap-6`}>
                                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-1.5">{item.title}</h3>
                                        <p className="text-gray-600 font-medium text-base sm:text-lg leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="reveal reveal-d3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-esn-dark flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Mail className="w-4 h-4 text-white" />
                        </div>
                        <a href="mailto:ukraine-nr@esn.org" className="text-esn-cyan font-bold hover:text-esn-magenta transition-colors text-lg sm:text-xl border-b-2 border-esn-cyan hover:border-esn-magenta">
                            ukraine-nr@esn.org
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════ CTA ═══════ */}
            <section className="py-14 sm:py-20 md:py-24 bg-esn-dark">
                <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6">
                        How to join ESN Ukraine or its local sections?
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 font-medium mb-8 sm:mb-10 leading-relaxed">
                        From time to time, we announce calls for new volunteers. Follow us on social media to hear about our recruitment first.
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
                            href="https://www.instagram.com/esn.ukraine?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
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
