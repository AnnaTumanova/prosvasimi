import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "./GoogleAnalytics";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.prosvasimi.com";
const DESCRIPTION =
  "Practical AI automation, assistants and analytics for small businesses — and accessible AI training and careers for people with disabilities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prosvasimi — Inclusive AI Studio & Academy",
    template: "%s | Prosvasimi",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Prosvasimi",
    title: "Prosvasimi — Practical AI. Inclusive technology careers.",
    description: DESCRIPTION,
    url: "/",
    images: [{ url: "/images/logo.png" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fundacja Prosvásimi",
  alternateName: "Prosvasimi",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  email: "kontakt@prosvasimi.com",
  address: { "@type": "PostalAddress", addressLocality: "Warsaw", addressCountry: "PL" },
  identifier: [
    { "@type": "PropertyValue", propertyID: "KRS", value: "0001231234" },
    { "@type": "PropertyValue", propertyID: "NIP", value: "5214158994" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <GoogleAnalytics />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
