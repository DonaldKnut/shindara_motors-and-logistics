export type Service = {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  href: string;
  enquireHref: string;
};

export const services: Service[] = [
  {
    id: "automobile-sales",
    title: "Automobile Sales",
    summary:
      "Curated vehicle sourcing and sales solutions aligned to your requirements, budget, and timeline.",
    description:
      "From private acquisitions to business fleet needs, we help you identify suitable vehicles and move from enquiry to ownership with clarity and care.",
    image: {
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
      alt: "Premium dark sports vehicle in dramatic studio lighting",
    },
    href: "/services/automobile-sales",
    enquireHref: "/enquire?type=Automobile%20Sales",
  },
  {
    id: "vehicle-sourcing",
    title: "Vehicle Sourcing",
    summary:
      "Purpose-built sourcing for clients who need a specific make, model, specification, or market.",
    description:
      "Share your requirements and we coordinate the search, shortlist suitable options, and guide next steps with transparent communication throughout.",
    image: {
      src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
      alt: "Front detail of a luxury vehicle headlight and bodywork",
    },
    href: "/services/vehicle-sourcing",
    enquireHref: "/enquire?type=Vehicle%20Sourcing",
  },
  {
    id: "automotive-support",
    title: "Automotive Support",
    summary:
      "Practical support around vehicle-related needs, coordinated with professionalism and attention to detail.",
    description:
      "Whether you require guidance after purchase or assistance navigating related automotive needs, our team remains available with clear next steps.",
    image: {
      src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80",
      alt: "Automotive workshop detail with precision tooling",
    },
    href: "/services/automotive-support",
    enquireHref: "/enquire?type=Automotive%20Support",
  },
  {
    id: "logistics-solutions",
    title: "Logistics Solutions",
    summary:
      "Dependable logistics coordination designed for careful handling, clear communication, and reliable delivery.",
    description:
      "We support transportation and logistics requirements with a focus on planning, accountability, and a premium client experience from start to finish.",
    image: {
      src: "https://images.unsplash.com/photo-1601584115197-04ecc1da4384?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern logistics fleet trucks parked in formation",
    },
    href: "/services/logistics-solutions",
    enquireHref: "/enquire?type=Logistics%20Solutions",
  },
  {
    id: "business-transport",
    title: "Business Transport Solutions",
    summary:
      "Transport arrangements tailored for organisations that value punctuality, discretion, and operational clarity.",
    description:
      "From scheduled movements to specialised transport needs, we work with businesses to structure reliable, professional transport solutions.",
    image: {
      src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive vehicle on an open coastal road at dusk",
    },
    href: "/services/business-transport",
    enquireHref: "/enquire?type=Business%20Transport",
  },
];
