'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const QUICK_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'News', href: '/news' },
    { label: 'Our Sections', href: '/sections' },
];

const POLICY_LINKS = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Code of Conduct', href: '/code-of-conduct' },
    { label: 'Cookie Policy', href: '/cookies' },
];

const SOCIALS = [
    { Icon: Instagram, href: 'https://instagram.com/esn.ukraine', label: 'Instagram' },
    { Icon: Linkedin, href: 'https://linkedin.com/company/esn-ukraine', label: 'LinkedIn' },
    { Icon: Twitter, href: 'https://x.com/esnukraine', label: 'X / Twitter' },
    { Icon: Youtube, href: 'https://youtube.com/@esnukraine', label: 'YouTube' },
];

export default function Footer() {
    return (
        <footer className="bg-[#17194A] text-white">
            <div className="mx-auto max-w-5xl px-6 sm:px-10 pt-16 pb-8">
                {/* 4-Column Grid — centred with tighter max-width */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.7fr_0.7fr] gap-x-8 gap-y-10 pb-14">

                    {/* Column 1 — Brand, Mission & Socials */}
                    <div className="flex flex-col">
                        <img
                            src="/logo-esn-ukraine-white.png"
                            alt="ESN Ukraine"
                            className="h-[100px] w-auto object-contain self-start mb-5 select-none"
                            draggable={false}
                            onError={(e) => {
                                const el = e.currentTarget;
                                el.style.display = 'none';
                                const fb = el.nextElementSibling as HTMLElement;
                                if (fb) fb.style.display = 'block';
                            }}
                        />
                        <span className="hidden text-xl font-black tracking-tight mb-5">
                            ESN Ukraine
                        </span>

                        <p className="text-[13px] text-gray-400 leading-[1.7] mb-6">
                            Erasmus Student Network (ESN) is a non-profit
                            international student organisation. Our mission is to
                            represent international students, thus provide
                            opportunities for cultural understanding and
                            self-development under the principle of Students
                            Helping Students.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-auto">
                            {SOCIALS.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-gray-400 hover:bg-white hover:text-[#17194A] hover:border-white transition-all duration-300"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 — Address & Contacts */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
                            Address & Contacts
                        </h4>

                        <address className="not-italic text-[13px] text-gray-400 leading-relaxed mb-5">
                            Erasmus Student Network Ukraine<br />
                            58 Volodymyrska str., r. 45a<br />
                            01601 Kyiv<br />
                            Ukraine
                        </address>

                        <a
                            href="mailto:ukraine-nr@esn.org"
                            className="inline-block text-[13px] text-gray-400 hover:text-white transition-colors duration-300"
                        >
                            ukraine-nr@esn.org
                        </a>
                    </div>

                    {/* Column 3 — Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 — Policies */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
                            Policies
                        </h4>
                        <ul className="space-y-3">
                            {POLICY_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar — Copyright Only */}
                <div className="border-t border-white/10 pt-8">
                    <p className="text-center text-xs text-gray-500 tracking-wide">
                        © 2026 Erasmus Student Network Ukraine. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
