import type { SlideItem } from "@/components/ui/MediaSlider";
import { vehicles } from "@/data/vehicles";
import { img } from "@/data/media";

/** Homepage hero — real fleet photography */
export const heroSlides: SlideItem[] = [
  {
    src: img("lexus.jpg", "v1792400602"),
    alt: "Lexus ES on the Shindara lot",
    caption: "Lexus ES — executive saloon",
    tag: "Automobile Sales",
  },
  {
    src: img("prado.jpg", "v1792400606"),
    alt: "Toyota Land Cruiser Prado front",
    caption: "Land Cruiser Prado — prestige SUV",
    tag: "Curated Fleet",
  },
  {
    src: img("mercedes.jpg", "v1792400602"),
    alt: "Mercedes-Benz GLA three-quarter",
    caption: "Mercedes-Benz GLA",
    tag: "Crossovers",
  },
  {
    src: img("bmw.jpg", "v1792400600"),
    alt: "BMW X1 front grille",
    caption: "BMW X1 xDrive",
    tag: "Premium Imports",
  },
];

/** Full-bleed fleet gallery built from live inventory */
export const fleetGallerySlides: SlideItem[] = vehicles.flatMap((vehicle) =>
  vehicle.gallery.slice(0, 2).map((frame, index) => ({
    src: frame.src,
    alt: frame.alt,
    caption: `${vehicle.make} ${vehicle.model}`,
    tag: index === 0 ? vehicle.category : "Gallery",
  })),
);

/** Services lifestyle — mix fleet + logistics mood */
export const servicesLifestyleSlides: SlideItem[] = [
  {
    src: img("pen_prado.jpg", "v1792400602"),
    alt: "Prado ready for dispatch",
    caption: "Vehicle sourcing & sales",
    tag: "Automotive",
  },
  {
    src: img("tototot.jpg", "v1792400607"),
    alt: "Land Cruiser Prado rear",
    caption: "Cross-border ready SUVs",
    tag: "Logistics",
  },
  {
    src: img("biqfnl.jpg", "v1792400600"),
    alt: "BMW cabin detail",
    caption: "Verified interiors, transparent specs",
    tag: "Support",
  },
  {
    src: img("tit_e.jpg", "v1792400607"),
    alt: "Camry SE rear",
    caption: "Executive saloons in stock",
    tag: "Sales",
  },
];
