export const company = {
  legalName: "SHINDARA MOTORS & LOGISTICS LIMITED",
  shortName: "Shindara",
  tagline: "DRIVING VALUE. DELIVERING MORE.",
  domain: "shindaraautos.com",
  url: "https://shindaraautos.com",
  email: "hello@shindaraautos.com",
  /** All form submissions (enquiry, contact, newsletter) deliver here */
  inboxEmails: [
    "hello@shindaraautos.com",
    "oluwasina@shindaraautos.com",
  ] as const,
  phones: {
    nigeria: {
      label: "Nigeria",
      display: "+234 911 005 6935",
      href: "tel:+2349110056935",
      e164: "+2349110056935",
    },
    southAfrica: {
      label: "South Africa",
      display: "+27 77 389 6008",
      href: "tel:+27773896008",
      e164: "+27773896008",
    },
  },
  whatsapp: {
    e164: "27773896008",
    display: "+27 77 389 6008",
    href: "https://wa.me/27773896008?text=Hello%20Shindara%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.",
    label: "Chat on WhatsApp",
  },
  address: {
    line1: "33B, Bashorun Okusanya",
    line2: "Off Admiralty Lane, Lekki Phase 1",
    city: "Lagos",
    country: "Nigeria",
    full: "33B, Bashorun Okusanya, Off Admiralty Lane, Lekki Phase 1, Lagos, Nigeria.",
  },
} as const;

export const enquiryTypes = [
  "Automobile Sales",
  "Vehicle Sourcing",
  "Automotive Support",
  "Logistics Solutions",
  "Business Transport",
  "General Enquiry",
] as const;

export type NavItem = {
  href: string;
  label: string;
  description?: string;
  icon:
    | "services"
    | "vehicles"
    | "process"
    | "about"
    | "contact"
    | "enquire"
    | "home";
  mega?: boolean;
};

export const navLinks: NavItem[] = [
  {
    href: "/services",
    label: "Services",
    description: "Automotive and logistics solutions",
    icon: "services",
    mega: true,
  },
  {
    href: "/vehicles",
    label: "Vehicles",
    description: "Browse the showcase and enquire",
    icon: "vehicles",
  },
  {
    href: "/process",
    label: "Process",
    description: "How engagements move forward",
    icon: "process",
  },
  {
    href: "/about",
    label: "About",
    description: "Purpose, values, and approach",
    icon: "about",
  },
  {
    href: "/enquire",
    label: "Enquire",
    description: "Start a detailed business enquiry",
    icon: "enquire",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Call, email, or message the team",
    icon: "contact",
  },
];
