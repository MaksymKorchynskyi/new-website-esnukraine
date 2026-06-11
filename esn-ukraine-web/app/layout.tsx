import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esnukraine.org"),
  title: "ESN Ukraine",
  description: "Erasmus Student Network Ukraine - Students Helping Students",
  openGraph: {
    title: "ESN Ukraine",
    description: "Erasmus Student Network Ukraine - Students Helping Students",
    url: "https://esnukraine.org",
    siteName: "ESN Ukraine",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ESN Ukraine Default Image",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESN Ukraine",
    description: "Erasmus Student Network Ukraine - Students Helping Students",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={manrope.variable}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}