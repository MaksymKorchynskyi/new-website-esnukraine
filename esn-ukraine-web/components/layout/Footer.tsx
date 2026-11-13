'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_LINKS, FOOTER_QUICK_LINKS, FOOTER_POLICY_LINKS } from '@/lib/navigation';

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
                                    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                                    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
                                }
                            }}
                            className="inline-block self-start mb-5 hover:opacity-90 transition-opacity cursor-pointer group"
                            aria-label="ESN Ukraine — Scroll to top"
                        >
                            <Image
                                src="/logo-esn-ukraine-white.png"
                                alt="ESN Ukraine"
                                width={200}
                                height={80}
                                sizes="240px"
                                className="h-20 sm:h-24 lg:h-[90px] w-auto object-contain select-none"
                                draggable={false}
                            />
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
                        <div className="flex items-center gap-3 pt-1 sm:mt-auto flex-wrap">
                            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto:') ? undefined : "_blank"}
                                    rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
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
                        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white mb-5 sm:mb-6">
                            Address & Contacts
                        </h2>

                        <address className="not-italic text-sm text-gray-400 leading-relaxed mb-5">
                            <a
                                href="https://maps.app.goo.gl/cMbvbYobajVy4uEm8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors duration-300 block"
                            >
                                Erasmus Student Network Ukraine<br />
                                Kyiv, Ukraine
                            </a>
                        </address>

                        <div className="space-y-3">
                            <div>
                                <a
                                    href="mailto:ukraine-nr@esn.org"
                                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                    ukraine-nr@esn.org
                                </a>
                                <p className="text-xs text-gray-500 mt-0.5">General inquiries</p>
                            </div>
                            <div>
                                <a
                                    href="mailto:web-master@esnukraine.org"
                                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                    web-master@esnukraine.org
                                </a>
                                <p className="text-xs text-gray-500 mt-0.5">Technical issues</p>
                            </div>
                        </div>
                    </div>

                    {/* Columns 3 & 4 — Quick Links & Policies (Side-by-side on mobile & tablet) */}
                    <nav aria-label="Footer" className="grid grid-cols-2 gap-6 sm:col-span-1 lg:col-span-5 lg:grid-cols-2 lg:gap-8">
                        {/* Quick Links */}
                        <div>
                            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white mb-5 sm:mb-6">
                                Quick Links
                            </h2>
                            <ul className="space-y-3">
                                {FOOTER_QUICK_LINKS.map((link) => (
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
                            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white mb-5 sm:mb-6">
                                Policies
                            </h2>
                            <ul className="space-y-3">
                                {FOOTER_POLICY_LINKS.map((link) => {
                                    const isExternal = link.href.startsWith('http');
                                    return (
                                    <li key={link.href}>
                                        {isExternal ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-400 hover:text-white transition-colors duration-300 block"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-sm text-gray-400 hover:text-white transition-colors duration-300 block"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Bottom Bar — Copyright */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex items-center justify-center">
                        <p className="text-xs text-gray-500 tracking-wide text-center">
                            © {new Date().getFullYear()} Erasmus Student Network Ukraine. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
