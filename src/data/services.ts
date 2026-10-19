import { img } from "@/data/media";

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
      src: img("lexus.jpg", "v1792400602"),
      alt: "Lexus ES from the Shindara sales inventory",
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
      src: img("prado.jpg", "v1792400606"),
      alt: "Toyota Land Cruiser Prado available for sourcing",
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
      src: img("erdftu.jpg", "v1792400601"),
      alt: "Verified Lexus V6 engine bay inspection",
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
      src: img("tototot.jpg", "v1792400607"),
      alt: "Land Cruiser Prado ready for logistics dispatch",
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
      src: img("mercedes.jpg", "v1792400602"),
      alt: "Mercedes-Benz GLA for executive transport",
    },
    href: "/services/business-transport",
    enquireHref: "/enquire?type=Business%20Transport",
  },
];
