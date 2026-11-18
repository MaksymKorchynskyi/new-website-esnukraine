import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import AnalyticsLoader from "@/components/analytics/AnalyticsLoader";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";
import { DEFAULT_OG_IMAGE, SITE_URL, TWITTER_SITE } from "@/lib/seo";

const manrope = Manrope({
  // Content is English: only the Latin subset is preloaded on the critical path.
  // Cyrillic glyphs still load on demand through the font's unicode-range.
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const DESCRIPTION =
  "Erasmus Student Network Ukraine is a national-level student organization that represents local ESN sections. At the moment, we have a growing network of sections across Ukraine.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : SITE_URL
  ),
  title: {
    default: "ESN Ukraine",
    template: "%s | ESN Ukraine",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "ESN Ukraine",
    description: DESCRIPTION,
    siteName: "ESN Ukraine",
    images: [DEFAULT_OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: "ESN Ukraine",
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  verification: {
    google: "JYTE15BVmGcVnPVYysTh8s4X1Q5NPIETvsQb-NG4FY4",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900 w-full max-w-full">
        {/* Keyboard users can jump past the header; visible only while focused */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-esn-dark focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        {/* overflow-x-clip (not hidden) keeps position: sticky working inside */}
        <div className="overflow-x-clip w-full min-h-svh flex flex-col">
          {/* The banner is position: fixed, so rendering it first only changes the tab order:
              its buttons come right after the skip link instead of after the whole page */}
          <CookieBanner />
          <Header />
          <div id="content" className="flex-grow">{children}</div>
          <Footer />
          <AnalyticsLoader />
          <Analytics />
        </div>
        <JsonLd data={organizationJsonLd()} />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
