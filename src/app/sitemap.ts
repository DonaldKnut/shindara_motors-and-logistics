import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || company.url;
  const routes = [
    "",
    "/about",
    "/contact",
    "/enquire",
    "/process",
    "/services",
    "/vehicles",
    "/privacy",
    "/terms",
    ...services.map((service) => `/services/${service.id}`),
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.8 : 0.7,
  }));
}
