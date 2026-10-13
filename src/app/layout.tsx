import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageLoader } from "@/components/layout/PageLoader";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { company } from "@/data/company";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || company.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.shortName} Motors & Logistics | ${company.tagline}`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "Premium automotive solutions and dependable logistics from Shindara Motors & Logistics Limited — delivered with precision, integrity, and purpose.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${company.legalName} | ${company.tagline}`,
    description:
      "Premium automotive solutions and dependable logistics, delivered with precision, integrity, and purpose.",
    siteName: company.legalName,
    images: [
      {
        url: "/brand/shindara-logo.png",
        width: 1200,
        height: 1200,
        alt: "Shindara Motors & Logistics Limited logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.legalName}`,
    description:
      "Premium automotive solutions and dependable logistics. Driving value. Delivering more.",
    images: ["/brand/shindara-logo.png"],
  },
  icons: {
    icon: [{ url: "/brand/shindara-logo.png", type: "image/png" }],
    apple: [{ url: "/brand/shindara-logo.png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: company.legalName,
    url: company.url,
    email: company.email,
    telephone: [company.phones.nigeria.display, company.phones.southAfrica.display],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.line1}, ${company.address.line2}`,
      addressLocality: company.address.city,
      addressCountry: "NG",
    },
    slogan: company.tagline,
    image: `${siteUrl}/brand/shindara-logo.png`,
  };

  return (
    <html lang="en">
      <body className={`${syne.variable} ${manrope.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-obsidian"
        >
          Skip to content
        </a>
        <PageLoader />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
