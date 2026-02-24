'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Send, CheckCircle, ExternalLink } from 'lucide-react';

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual form submission
        setIsSubmitted(true);
    };

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://instagram.com/esnukraine',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/company/esnukraine',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: 'X (Twitter)',
            href: 'https://x.com/esnukraine',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: 'YouTube',
            href: 'https://youtube.com/@esnukraine',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            ),
        },
        {
            name: 'Linktree',
            href: 'https://linktr.ee/esnukraine',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.953 15.066l-.038-4.086 4.078-.036-.038 13.056h4.086l-.036-13.056 4.078-.036-.036-4.086 4.078.036L12.078 0 0 6.858l4.078.036-.036 4.086z" />
                </svg>
            ),
        },
    ];

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
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Have questions? Want to collaborate? Looking to start a new section?
                            We'd love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Contact Info Side */}
                        <div>
                            <h2 className="text-2xl font-black text-esn-dark mb-8">
                                Contact Information
                            </h2>

                            <div className="space-y-6 mb-12">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-esn-cyan/10 text-esn-cyan flex-shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <a
                                            href="mailto:contact@esn.org.ua"
                                            className="text-lg font-bold text-esn-dark hover:text-esn-cyan transition-colors"
                                        >
                                            contact@esn.org.ua
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-esn-cyan/10 text-esn-cyan flex-shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Address</p>
                                        <p className="text-lg font-bold text-esn-dark">58 Volodymyrska str., r. 45a</p>
                                        <p className="text-sm text-gray-500">01601 Kyiv, Ukraine</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links - Prominent */}
                            <div>
                                <h3 className="text-2xl font-black text-esn-dark mb-6">
                                    Follow Us
                                </h3>
                                <div className="space-y-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-esn-dark hover:border-esn-cyan hover:text-esn-cyan transition-colors duration-200"
                                        >
                                            <span className="flex-shrink-0">{social.icon}</span>
                                            <span className="font-bold">{social.name}</span>
                                            <ExternalLink className="w-4 h-4 ml-auto text-gray-400" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
                            {isSubmitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-esn-green/10 flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-esn-green" />
                                    </div>
                                    <h3 className="text-2xl font-black text-esn-dark mb-4">
                                        Message Sent!
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Thank you for reaching out. We'll get back to you as soon as possible.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormState({ name: '', email: '', subject: '', message: '' });
                                        }}
                                        className="text-esn-cyan font-bold hover:text-esn-dark transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-black text-esn-dark mb-2">
                                        Send a Message
                                    </h2>
                                    <p className="text-gray-500 mb-8">
                                        Fill out the form below and we'll respond within 48 hours.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    value={formState.name}
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject
                                            </label>
                                            <select
                                                id="subject"
                                                required
                                                value={formState.subject}
                                                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none transition-all bg-white"
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="buddy">Buddy System</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="new-section">Start a New Section</option>
                                                <option value="media">Media Request</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={5}
                                                value={formState.message}
                                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none transition-all resize-none"
                                                placeholder="Tell us how we can help..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center gap-2 bg-esn-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-cyan transition-colors rounded-xl"
                                        >
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
