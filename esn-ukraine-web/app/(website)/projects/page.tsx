import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Users, ExternalLink } from 'lucide-react';

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface Project {
    id: string;
    slug: string;
    title: string;
    category: 'social' | 'education' | 'culture' | 'environment';
    status: 'active' | 'completed';
    year: string;
    description: string;
    image: string;
    participants?: number;
    externalLink?: string;
}

// ==========================================
// MOCK DATA (Replace with Sanity fetch)
// ==========================================
const PROJECTS: Project[] = [
    {
        id: '1',
        slug: 'social-inclusion-days',
        title: 'Social Inclusion Days',
        category: 'social',
        status: 'active',
        year: '2025',
        description: 'A week dedicated to raising awareness about social inclusion, accessibility, and diversity in student communities.',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
        participants: 200,
    },
    {
        id: '2',
        slug: 'erasmus-in-schools',
        title: 'Erasmus in Schools',
        category: 'education',
        status: 'active',
        year: '2025',
        description: 'Bringing international students to Ukrainian schools to share their cultures and inspire pupils about studying abroad.',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
        participants: 150,
    },
    {
        id: '3',
        slug: 'cultural-cafe',
        title: 'Cultural Café',
        category: 'culture',
        status: 'completed',
        year: '2024',
        description: 'Monthly gatherings where international students present their home countries through food, music, and traditions.',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
        participants: 300,
    },
    {
        id: '4',
        slug: 'green-erasmus',
        title: 'Green Erasmus',
        category: 'environment',
        status: 'active',
        year: '2025',
        description: 'Promoting sustainable mobility and eco-friendly practices among exchange students.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
        externalLink: 'https://esn.org/greenerfuture',
    },
    {
        id: '5',
        slug: 'mov-ability',
        title: 'MOV\'Ability',
        category: 'social',
        status: 'active',
        year: '2025',
        description: 'Making student mobility accessible for everyone, regardless of physical or mental abilities.',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: '6',
        slug: 'city-trips',
        title: 'Discover Ukraine Trips',
        category: 'culture',
        status: 'completed',
        year: '2024',
        description: 'Weekend trips to explore the most beautiful cities and nature spots in Ukraine with international students.',
        image: 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?auto=format&fit=crop&q=80&w=800',
        participants: 500,
    },
];

const CATEGORY_COLORS = {
    social: 'bg-esn-magenta text-white',
    education: 'bg-esn-cyan text-white',
    culture: 'bg-esn-green text-white',
    environment: 'bg-green-600 text-white',
};

const CATEGORY_LABELS = {
    social: 'Social Impact',
    education: 'Education',
    culture: 'Culture',
    environment: 'Environment',
};

export default function ProjectsPage() {
    const activeProjects = PROJECTS.filter((p) => p.status === 'active');
    const completedProjects = PROJECTS.filter((p) => p.status === 'completed');

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-esn-cyan/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-esn-green/10 rounded-full blur-3xl" />

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
                            Our Projects
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            From social impact initiatives to cultural exchange programs.
                            Discover how ESN Ukraine is making a difference.
                        </p>
                    </div>
                </div>
            </section>

            {/* Active Projects */}
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center gap-3 mb-12">
                        <span className="w-3 h-3 bg-esn-green rounded-full animate-pulse" />
                        <h2 className="text-2xl font-black text-esn-dark">Active Projects</h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {activeProjects.map((project) => (
                            <article
                                key={project.id}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${CATEGORY_COLORS[project.category]}`}>
                                            {CATEGORY_LABELS[project.category]}
                                        </span>
                                    </div>

                                    {/* Year */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium">
                                            <Calendar className="w-4 h-4" />
                                            {project.year}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-esn-dark mb-3 group-hover:text-esn-cyan transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        {project.participants && (
                                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                                <Users className="w-4 h-4" />
                                                {project.participants} participants
                                            </span>
                                        )}
                                        {project.externalLink && (
                                            <a
                                                href={project.externalLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-sm font-bold text-esn-cyan hover:text-esn-dark transition-colors"
                                            >
                                                Learn More
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Completed Projects */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gray-50">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-2xl font-black text-gray-400 mb-12">Past Projects</h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {completedProjects.map((project) => (
                            <article
                                key={project.id}
                                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm opacity-80 hover:opacity-100 transition-opacity"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="p-5">
                                    <span className="text-xs text-gray-400 font-medium">{project.year}</span>
                                    <h3 className="text-lg font-bold text-esn-dark mt-1">{project.title}</h3>
                                    {project.participants && (
                                        <span className="inline-flex items-center gap-1 text-sm text-gray-500 mt-2">
                                            <Users className="w-3 h-3" />
                                            {project.participants} participants
                                        </span>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 sm:px-12 lg:px-24 bg-esn-dark">
                <div className="mx-auto max-w-4xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">
                        Want to Get Involved?
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Join one of our local sections and become part of these amazing projects!
                    </p>
                    <Link
                        href="/sections"
                        className="inline-flex items-center gap-2 bg-esn-cyan px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-esn-dark transition-colors"
                    >
                        Find Your Section
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
