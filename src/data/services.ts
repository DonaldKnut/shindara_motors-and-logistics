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

/**
 * Services mirror the company’s registered scope of business,
 * written in plain language.
 */
export const services: Service[] = [
  {
    id: "automobile-sales",
    title: "Vehicle Sales",
    summary:
      "Buy and sell new and used cars, including luxury and premium models.",
    description:
      "We help you purchase or sell motor vehicles — new or used. This includes everyday cars as well as luxury and premium brands. We handle local sales and can also support import and export, subject to applicable laws.",
    image: {
      src: img("lexus.jpg", "v1792400602"),
      alt: "Luxury sedan available for sale",
    },
    href: "/services/automobile-sales",
    enquireHref: "/enquire?type=Vehicle%20Sales%20(New%20%26%20Used)",
  },
  {
    id: "vehicle-sourcing",
    title: "Sourcing & Instalments",
    summary:
      "Find the right vehicle and buy on an instalment payment plan when it suits you.",
    description:
      "Tell us the make, model, or budget you need. We source suitable options and can arrange sales on instalment payment plans so you can own a vehicle with a payment structure that works for you.",
    image: {
      src: img("prado.jpg", "v1792400606"),
      alt: "SUV available through sourcing and instalment sales",
    },
    href: "/services/vehicle-sourcing",
    enquireHref: "/enquire?type=Sourcing%20%26%20Instalment%20Plans",
  },
  {
    id: "automotive-support",
    title: "Automotive Training",
    summary:
      "Practical automotive education and training for individuals and teams.",
    description:
      "We provide automotive education and training to help people learn vehicle-related skills with clear, practical teaching. Training can be tailored to private learners or organisational needs.",
    image: {
      src: img("erdftu.jpg", "v1792400601"),
      alt: "Automotive training and education",
    },
    href: "/services/automotive-support",
    enquireHref: "/enquire?type=Automotive%20Training",
  },
  {
    id: "business-transport",
    title: "Driver Placement",
    summary:
      "Recruitment and placement of professional drivers for private and business use.",
    description:
      "Need a reliable professional driver? We recruit and place drivers who meet your standards — for individuals, families, and organisations — with a focus on safety, professionalism, and clear communication.",
    image: {
      src: img("mercedes.jpg", "v1792400602"),
      alt: "Professional driver and vehicle support",
    },
    href: "/services/business-transport",
    enquireHref: "/enquire?type=Driver%20Placement",
  },
  {
    id: "logistics-solutions",
    title: "Delivery & Fleet Support",
    summary:
      "Vehicle delivery coordination, fleet management, and related support services.",
    description:
      "We coordinate vehicle delivery and help manage fleets. Our support covers practical vehicle-related needs so your cars stay organised, on schedule, and properly looked after — always within applicable laws.",
    image: {
      src: img("tototot.jpg", "v1792400607"),
      alt: "Vehicle delivery and fleet coordination",
    },
    href: "/services/logistics-solutions",
    enquireHref: "/enquire?type=Delivery%20%26%20Fleet%20Support",
  },
];
