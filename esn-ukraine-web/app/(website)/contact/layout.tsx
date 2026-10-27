import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Questions, collaboration ideas or want to start a new ESN section? Get in touch with the ESN Ukraine National Board by email, social media or our contact form.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
