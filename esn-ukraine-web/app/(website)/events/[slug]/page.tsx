import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { PortableText } from "@portabletext/react";

// ==========================================
// INTERFACES
// ==========================================
interface EventPageProps {
  params: Promise<{ slug: string }>;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  eventType: 'upcoming' | 'past';
  registrationLink?: string;
  imageUrl: string | null;
  body: any[];
}

// ==========================================
// DATA FETCHING
// ==========================================
async function getEvent(slug: string): Promise<Event | null> {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    date,
    location,
    eventType,
    registrationLink,
    body,
    "imageUrl": mainImage.asset->url
  }`;
  return await client.fetch(query, { slug });
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
        {event.imageUrl && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-12 lg:px-24">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Events</span>
          </Link>

          <span className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 ${event.eventType === 'upcoming' ? 'bg-esn-green text-white' : 'bg-gray-500 text-white'
            }`}>
            {event.eventType === 'upcoming' ? 'Upcoming Event' : 'Past Event'}
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-300">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-5 h-5 text-esn-cyan" />
              {new Date(event.date).toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            {event.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-5 h-5 text-esn-magenta" />
                {event.location}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          {event.registrationLink && event.eventType === 'upcoming' && (
            <div className="mb-12 p-6 bg-esn-cyan/5 border border-esn-cyan/20 rounded-2xl">
              <p className="text-esn-dark font-medium mb-4">
                Registration is open for this event!
              </p>
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-esn-cyan px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-esn-dark transition-colors"
              >
                Register Now
              </a>
            </div>
          )}

          {event.body && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={event.body} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
