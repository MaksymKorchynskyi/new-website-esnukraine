export interface ESNImage {
  src: string;
  alt: string;
}

export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  coverImage: ESNImage;
  category: string;
}

export interface EventItem {
  _id: string;
  title: string;
  date: string; // ISO string
  location: string;
  coverImage: ESNImage;
}

export const MOCK_NEWS: NewsItem[] = [
  {
    _id: '1',
    title: 'ESN Ukraine joins the largest student assembly in Europe',
    slug: 'agm-assembly',
    publishedAt: '2025-11-20',
    category: 'International',
    excerpt: 'Our delegation represented Ukrainian students ensuring our voice is heard on the global level.',
    coverImage: { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80', alt: 'Students assembly' }
  },
  {
    _id: '2',
    title: 'New partnership with Erasmus+ National Office',
    slug: 'partnership-announcement',
    publishedAt: '2025-11-15',
    category: 'Partnership',
    excerpt: 'Strengthening cooperation to provide more mobility opportunities for Ukrainian youth.',
    coverImage: { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80', alt: 'Meeting room' }
  },
  {
    _id: '3',
    title: 'Charity Week: Raising funds for local shelters',
    slug: 'charity-week-2025',
    publishedAt: '2025-11-01',
    category: 'Social Impact',
    excerpt: 'ESN sections across Ukraine united to support animal shelters in Lviv and Kyiv.',
    coverImage: { src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80', alt: 'Volunteers helping' }
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    _id: 'e1',
    title: 'Cultural Night: Taste of Ukraine',
    date: '2025-10-15',
    location: 'Lviv, LNU Main Hall',
    coverImage: { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80', alt: 'Food party' }
  },
  {
    _id: 'e2',
    title: 'Trip to Carpathians',
    date: '2025-09-20',
    location: 'Yaremche',
    coverImage: { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80', alt: 'Mountains' }
  },
  {
    _id: 'e3',
    title: 'Welcome Week Party',
    date: '2025-09-01',
    location: 'Kyiv',
    coverImage: { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80', alt: 'Party crowd' }
  },
    {
    _id: 'e4',
    title: 'National Platform',
    date: '2025-08-15',
    location: 'Odesa',
    coverImage: { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80', alt: 'Conference' }
  }
];