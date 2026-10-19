import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageLoader } from "@/components/layout/PageLoader";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { company } from "@/data/company";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
  description: company.about,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${company.legalName} | ${company.tagline}`,
    description: company.focus,
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
    description: company.focus,
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

const themeInitScript = `
(function(){
  try {
    var key = 'shindara-theme';
    var stored = localStorage.getItem(key);
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${sora.variable} ${plusJakarta.variable} antialiased`}>
        <ThemeProvider>
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
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
