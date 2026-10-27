import type { Metadata } from 'next';
import { buildMetadata, SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'About Us',
    description:
      'ESN Ukraine is a youth non-governmental organisation and part of the Erasmus Student Network. Our mission, history, activities and how to join us.',
    path: '/about-us',
  }),
  // A string title in a layout resets the root template for nested routes (e.g. /about-us/former-boards),
  // so the template is redeclared here.
  title: {
    default: 'About Us',
    template: `%s | ${SITE_NAME}`,
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
