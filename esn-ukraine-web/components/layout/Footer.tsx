'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const XSocialIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

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
    { Icon: XSocialIcon, href: 'https://x.com/esnukraine', label: 'X / Twitter' },
    { Icon: Youtube, href: 'https://youtube.com/@esnukraine', label: 'YouTube' },
];

export default function Footer() {
    return (
        <footer className="bg-[#17194A] text-white">
            <div className="mx-auto max-w-6xl px-6 sm:px-10 pt-12 sm:pt-16 pb-8">
                {/* Main Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 sm:gap-y-12 pb-12 sm:pb-16">

                    {/* Column 1 — Brand, Mission & Socials */}
                    <div className="flex flex-col sm:col-span-2 lg:col-span-4">
                        <Link
                            href="/"
                            onClick={(e) => {
                                if (window.location.pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            className="inline-block self-start mb-5 hover:opacity-90 transition-opacity cursor-pointer group"
                            aria-label="ESN Ukraine — Scroll to top"
                        >
                            <img
                                src="/logo-esn-ukraine-white.png"
                                alt="ESN Ukraine"
                                className="h-20 sm:h-24 lg:h-[90px] w-auto object-contain select-none"
                                draggable={false}
                                onError={(e) => {
                                    const el = e.currentTarget;
                                    el.style.display = 'none';
                                    const fb = el.nextElementSibling as HTMLElement;
                                    if (fb) fb.style.display = 'block';
                                }}
                            />
                            <span className="hidden text-xl font-black tracking-tight group-hover:text-esn-cyan transition-colors">
                                ESN Ukraine
                            </span>
                        </Link>

                        <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-md">
                            Erasmus Student Network (ESN) is a non-profit
                            international student organisation. Our mission is to
                            represent international students, thus provide
                            opportunities for cultural understanding and
                            self-development under the principle of Students
                            Helping Students.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-1 sm:mt-auto">
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
                    <div className="sm:col-span-1 lg:col-span-3">
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white mb-5 sm:mb-6">
                            Address & Contacts
                        </h4>

                        <address className="not-italic text-sm text-gray-400 leading-relaxed mb-5">
                            <a
                                href="https://maps.app.goo.gl/cMbvbYobajVy4uEm8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors duration-300 block"
                            >
                                Erasmus Student Network Ukraine<br />
                                58 Volodymyrska str., r. 45a<br />
                                01601 Kyiv<br />
                                Ukraine
                            </a>
                        </address>

                        <a
                            href="mailto:ukraine-nr@esn.org"
                            className="inline-block text-sm text-gray-400 hover:text-white transition-colors duration-300"
                        >
                            ukraine-nr@esn.org
                        </a>
                    </div>

                    {/* Columns 3 & 4 — Quick Links & Policies (Side-by-side on mobile & tablet) */}
                    <div className="grid grid-cols-2 gap-6 sm:col-span-1 lg:col-span-5 lg:grid-cols-2 lg:gap-8">
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white mb-5 sm:mb-6">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {QUICK_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-white transition-colors duration-300 block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Policies */}
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white mb-5 sm:mb-6">
                                Policies
                            </h4>
                            <ul className="space-y-3">
                                {POLICY_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-white transition-colors duration-300 block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
