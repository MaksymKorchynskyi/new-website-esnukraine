import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

// ==========================================
// INTERFACES (CMS-ready structure)
// ==========================================
interface Event {
  _id: string;
  slug: { current: string };
  title: string;
  date: string;
  location: string;
  description?: string;
  imageUrl: string | null;
}

// ==========================================
// MOCK DATA (Realistic ESN Ukraine events)
// ==========================================
const MOCK_EVENTS: Event[] = [
  {
    _id: 'mock-1',
    slug: { current: 'erasmus-days-2025' },
    title: 'Erasmus Days 2025',
    date: '2025-10-14',
    location: 'Taras Shevchenko National University of Kyiv',
    description: 'Annual celebration of Erasmus+ program with lectures, workshops, and networking opportunities for students interested in international mobility. Join us for inspiring talks by Erasmus alumni and interactive sessions on how to start your exchange journey. This is the perfect event to learn about scholarships and meet like-minded students.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'mock-2',
    slug: { current: 'welcome-week-fall-2025' },
    title: 'Welcome Week Fall 2025',
    date: '2025-09-08',
    location: 'Kyiv',
    description: 'A week full of activities for incoming international students: city tours, cultural events, and opportunities to meet your ESN buddies. Every day brings a new adventure from exploring Kyiv landmarks to themed evening parties. Make unforgettable memories and build friendships that will last a lifetime.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'mock-3',
    slug: { current: 'national-platform-kyiv' },
    title: 'National Platform Kyiv',
    date: '2025-04-18',
    location: 'Kyiv',
    description: 'The largest gathering of ESN volunteers in Ukraine. Three days of workshops, trainings, and strategic planning for the network. Meet passionate ESN members from all over the country and shape the future of student mobility together.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'mock-4',
    slug: { current: 'eurodinner-spring-2025' },
    title: 'EuroDinner: Taste of Europe',
    date: '2025-03-22',
    location: 'Kyiv',
    description: 'A culinary journey through Europe where international students share dishes from their home countries with Ukrainian friends. Taste authentic recipes from over 15 different countries in one evening. A celebration of diversity, culture, and delicious food that brings everyone together.',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'mock-5',
    slug: { current: 'social-inclusion-days-2025' },
    title: 'Social Inclusion Days',
    date: '2025-02-15',
    location: 'Online & Kyiv',
    description: 'A week dedicated to raising awareness about accessibility, diversity, and inclusion in student communities. Participate in workshops, panel discussions, and creative activities that promote equal opportunities for all. Together we can build a more inclusive campus environment.',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'mock-6',
    slug: { current: 'christmas-market-trip' },
    title: 'Christmas Market Trip to Lviv',
    date: '2024-12-14',
    location: 'Lviv',
    description: 'A magical weekend trip to explore the famous Lviv Christmas markets with international and local students. Enjoy traditional Ukrainian treats, handmade crafts, and the enchanting holiday atmosphere of one of Europe\'s most beautiful cities. A perfect way to experience Ukrainian Christmas traditions.',
    imageUrl: 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'mock-7',
    slug: { current: 'tandem-language-exchange' },
    title: 'Tandem Language Exchange',
    date: '2024-11-28',
    location: 'Kyiv National Linguistic University',
    description: 'Practice languages in a fun and relaxed atmosphere. Meet new people and improve your speaking skills. Whether you want to learn Ukrainian, English, or any other language, our tandem sessions pair you with native speakers for engaging conversation.',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'mock-8',
    slug: { current: 'international-food-festival' },
    title: 'International Food Festival',
    date: '2024-10-19',
    location: 'Igor Sikorsky KPI, Kyiv',
    description: 'Students from around the world prepared traditional dishes from their countries for everyone to taste and enjoy. The festival featured live music, cultural performances, and cooking demonstrations. It was a vibrant celebration of global cuisine and intercultural connection.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'mock-9',
    slug: { current: 'city-quest-kyiv' },
    title: 'City Quest: Discover Kyiv',
    date: '2024-09-21',
    location: 'Kyiv City Center',
    description: 'An interactive city quest to explore hidden gems of Kyiv while competing in teams with other students. Solve creative challenges and riddles while discovering the history and culture of Ukraine\'s capital. The winning team received exclusive ESN prizes and bragging rights.',
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800',
  },
];

function truncateToSentences(text: string, maxSentences: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences || sentences.length <= maxSentences) return text;
  return sentences.slice(0, maxSentences).join('').trim() + '...';
}

// ==========================================
// DATA FETCHING
// ==========================================
async function getEvents(): Promise<Event[]> {
  try {
    const query = `*[_type == "event"] | order(date desc) {
      _id, 
      title, 
      date, 
      location, 
      description,
      slug,
      "imageUrl": mainImage.asset->url
    }`;
    const events = await client.fetch(query);

    // If no events from CMS, return mock data
    if (!events || events.length === 0) {
      return MOCK_EVENTS;
    }
    return events;
  } catch {
    return MOCK_EVENTS;
  }
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-esn-dark pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-esn-dark via-esn-dark to-[#141B41]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-esn-green/10 rounded-full blur-3xl" />
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
              Events
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              From national platforms to local meetups. Discover what ESN Ukraine
              has planned and relive our best moments.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No events yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    {event.imageUrl && (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="inline-flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 text-esn-magenta" />
                      {new Date(event.date).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </p>

                    <h3 className="text-xl font-bold text-esn-dark mb-3 group-hover:text-esn-cyan transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {truncateToSentences(event.description, 3)}
                      </p>
                    )}

                    <Link
                      href={`/events/${event.slug.current}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-esn-dark hover:text-esn-cyan transition-colors group/link"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
