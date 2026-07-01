import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    MapPin,
    Instagram,
    Mail,
    Facebook,
    Send,
    Twitter,
    Youtube,
    Linkedin,
    ExternalLink,
} from "lucide-react";
import { PortableText, PortableTextComponents } from "@portabletext/react";

// ==========================================
// INTERFACES
// ==========================================
interface SectionPageProps {
    params: Promise<{ slug: string }>;
}

interface Section {
    _id: string;
    name: string;
    city: string;
    summary: string;
    imageUrl: string | null;
    instagram: string;
    email: string;
    facebook?: string;
    telegram?: string;
    twitter?: string;
    linktree?: string;
    youtube?: string;
    linkedin?: string;
    body?: any[];
}

// ==========================================
// SOCIAL LINKS CONFIG
// ==========================================
interface SocialLinkConfig {
    key: keyof Section;
    label: string;
    icon: React.ReactNode;
    isEmail?: boolean;
}

const SOCIAL_LINKS: SocialLinkConfig[] = [
    { key: 'instagram', label: 'Instagram', icon: <Instagram className="w-5 h-5" /> },
    { key: 'email', label: 'Email', icon: <Mail className="w-5 h-5" />, isEmail: true },
    { key: 'facebook', label: 'Facebook', icon: <Facebook className="w-5 h-5" /> },
    { key: 'telegram', label: 'Telegram', icon: <Send className="w-5 h-5" /> },
    { key: 'twitter', label: 'X', icon: <Twitter className="w-5 h-5" /> },
    { key: 'linktree', label: 'Linktree', icon: <ExternalLink className="w-5 h-5" /> },
    { key: 'youtube', label: 'YouTube', icon: <Youtube className="w-5 h-5" /> },
    { key: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-5 h-5" /> },
];

// ==========================================
// PORTABLE TEXT COMPONENTS (same as news)
// ==========================================
interface SanityImage {
    _type: "image";
    asset: { _ref: string; _type: "reference"; url?: string };
    caption?: string;
    alt?: string;
    width?: string;
    alignment?: string;
    rounded?: boolean;
}

const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }: { value: SanityImage & { asset: any } }) => {
            if (!value?.asset) return null;
            const imageUrl = value.asset?.url || urlFor(value).width(1200).url();
            const width = value.width || "100";
            const alignment = value.alignment || "center";
            const isRounded = value.rounded !== false;

            const floatStyles: Record<string, string> = {
                left: "float-left mr-8 mb-4",
                right: "float-right ml-8 mb-4",
                center: "mx-auto",
            };

            const isFullWidth = width === "100";
            const containerClass = isFullWidth
                ? "my-10 -mx-4 sm:mx-0 w-full"
                : `my-6 ${floatStyles[alignment]}`;

            return (
                <figure
                    className={containerClass}
                    style={!isFullWidth ? { maxWidth: `${width}%` } : undefined}
                >
                    <div className={`relative w-full overflow-hidden ${isRounded ? "rounded-2xl" : ""}`}>
                        <Image
                            src={imageUrl}
                            alt={value.alt || value.caption || "Фото"}
                            width={1200}
                            height={675}
                            className="w-full h-auto object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="mt-3 text-center text-sm text-gray-400 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
        imageGallery: ({ value }: { value: { images?: any[]; columns?: number; gap?: string; rounded?: boolean } }) => {
            if (!value?.images || value.images.length === 0) return null;
            const cols = value.columns || 2;
            const isRounded = value.rounded === true;
            const gridClass =
                cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4";
            const gapClass: Record<string, string> = {
                none: "gap-0",
                small: "gap-2",
                medium: "gap-4",
                large: "gap-8",
            };
            const gap = gapClass[value.gap || "medium"] || "gap-4";
            return (
                <div className={`my-10 grid ${gridClass} ${gap}`}>
                    {value.images.map((img: any, idx: number) => {
                        if (!img?.asset) return null;
                        const imageUrl = img.asset?.url || urlFor(img).width(800).url();
                        return (
                            <figure key={img._key || idx} className={`group relative overflow-hidden aspect-[4/3] ${isRounded ? "rounded-xl" : ""}`}>
                                <Image
                                    src={imageUrl}
                                    alt={img.alt || img.caption || `Фото ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes={`(max-width: 768px) 50vw, ${Math.round(100 / cols)}vw`}
                                />
                                {img.caption && (
                                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 opacity-100">
                                        <p className="text-white text-xs font-medium">{img.caption}</p>
                                    </figcaption>
                                )}
                            </figure>
                        );
                    })}
                </div>
            );
        },
    },
    block: {
        h2: ({ children }) => (
            <h2 className="text-3xl md:text-4xl font-black text-esn-dark mt-14 mb-5 leading-tight">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-2xl md:text-3xl font-bold text-esn-dark mt-10 mb-4 leading-tight">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-xl md:text-2xl font-bold text-esn-dark mt-8 mb-3">{children}</h4>
        ),
        normal: ({ children }) => (
            <p className="text-lg leading-[1.85] text-gray-700 mb-6">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-4 border-esn-cyan pl-6 py-2 bg-esn-cyan/5 rounded-r-xl">
                <p className="text-lg italic text-gray-600 leading-relaxed">{children}</p>
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-esn-dark">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }) => {
            const href = value?.href || "#";
            const isExternal = href.startsWith("http");
            return (
                <a
                    href={href}
                    className="text-esn-cyan font-medium underline decoration-esn-cyan/30 underline-offset-2 hover:decoration-esn-cyan transition-colors"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                >
                    {children}
                </a>
            );
        },
    },
    list: {
        bullet: ({ children }) => <ul className="my-6 space-y-3 list-none pl-0">{children}</ul>,
        number: ({ children }) => <ol className="my-6 space-y-3 list-none pl-0 counter-reset-item">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="flex items-start gap-3 text-lg text-gray-700 leading-relaxed">
                <span className="mt-2 w-2 h-2 rounded-full bg-esn-cyan flex-shrink-0" />
                <span>{children}</span>
            </li>
        ),
        number: ({ children }) => (
            <li className="flex items-start gap-3 text-lg text-gray-700 leading-relaxed">
                <span>{children}</span>
            </li>
        ),
    },
};

// ==========================================
// DATA FETCHING
// ==========================================
async function getSection(slug: string): Promise<Section | null> {
    const query = `*[_type == "section" && slug.current == $slug][0] {
    _id,
    name,
    city,
    summary,
    instagram,
    email,
    facebook,
    telegram,
    twitter,
    linktree,
    youtube,
    linkedin,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->,
        "caption": caption,
        "alt": alt
      }
    },
    "imageUrl": mainImage.asset->url
  }`;
    return await client.fetch(query, { slug });
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function SectionPage({ params }: SectionPageProps) {
    const { slug } = await params;
    const section = await getSection(slug);

    if (!section) {
        notFound();
    }

    // Collect all filled social links
    const activeSocials = SOCIAL_LINKS.filter((s) => {
        const val = section[s.key] as string | undefined;
        return !!val;
    });

    return (
        <main className="min-h-screen bg-white">
            {/* ─── Hero Section (same layout as news) ─── */}
            <section className="relative bg-esn-dark pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d5e] via-esn-dark to-[#141B41]" />
                <div className="absolute top-10 right-10 w-80 h-80 bg-esn-cyan/8 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-10 w-60 h-60 bg-esn-magenta/8 rounded-full blur-3xl" />

                <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-12 lg:px-24 grid lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column — Text */}
                    <div className="lg:col-span-7">
                        <div className="flex flex-col items-start justify-center h-full -mt-12">
                            <Link
                                href="/sections"
                                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                <span className="text-sm font-medium">All Sections</span>
                            </Link>

                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="w-5 h-5 text-esn-cyan" />
                                <span className="text-esn-cyan font-bold">{section.city}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                                {section.name}
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
                                {section.summary}
                            </p>
                        </div>
                    </div>

                    {/* Right Column — Section Logo */}
                    {section.imageUrl && (
                        <div className="lg:col-span-5 max-w-md w-full flex items-center justify-center">
                            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-white p-6 flex items-center justify-center">
                                <Image
                                    src={section.imageUrl}
                                    alt={section.name}
                                    width={400}
                                    height={300}
                                    className="object-contain max-h-[240px] w-auto"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── Body Content ─── */}
            <section className="py-16 md:py-20 px-6 sm:px-12">
                <div className="mx-auto max-w-3xl">
                    {section.body ? (
                        <div className="prose prose-lg max-w-none">
                            <PortableText value={section.body} components={portableTextComponents} />
                        </div>
                    ) : (
                        <div className="text-gray-600 leading-relaxed text-lg">
                            <p>
                                {section.name} is part of the ESN Ukraine network. We&apos;re dedicated to
                                helping international students make the most of their exchange experience
                                in {section.city}.
                            </p>
                            <p className="mt-4">
                                Join us for city tours, cultural events, parties, and trips! Follow our
                                social media for updates on upcoming activities.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── Social Links — horizontal row after content ─── */}
            {activeSocials.length > 0 && (
                <section className="pb-20 px-6 sm:px-12">
                    <div className="mx-auto max-w-3xl border-t border-gray-200 pt-8">
                        <div className="flex items-center justify-start gap-4 flex-wrap">
                            {activeSocials.map((social) => {
                                const value = section[social.key] as string;
                                const href = social.isEmail ? `mailto:${value}` : value;

                                return (
                                    <a
                                        key={social.key}
                                        href={href}
                                        target={social.isEmail ? undefined : "_blank"}
                                        rel={social.isEmail ? undefined : "noopener noreferrer"}
                                        className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-esn-dark/15 text-esn-dark hover:bg-esn-dark hover:text-white hover:border-esn-dark transition-all duration-300"
                                        title={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
