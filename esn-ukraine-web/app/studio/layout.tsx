import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | ESN Ukraine",
  description: "Content Management System for ESN Ukraine",
  robots: { index: false, follow: false },
};

export default function StudioRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, height: "100vh", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
