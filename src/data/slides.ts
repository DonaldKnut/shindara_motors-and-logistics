import type { SlideItem } from "@/components/ui/MediaSlider";
import { vehicles } from "@/data/vehicles";
import { img } from "@/data/media";

/** Homepage hero — real fleet photography */
export const heroSlides: SlideItem[] = [
  {
    src: img("lexus.jpg", "v1792400602"),
    alt: "Noir — Lexus ES on the Shindara lot",
    caption: "Noir — Lexus ES 350",
    tag: "Executive Saloon",
  },
  {
    src: img("prado.jpg", "v1792400606"),
    alt: "Monarch — Toyota Land Cruiser Prado",
    caption: "Monarch — Land Cruiser Prado",
    tag: "Prestige SUV",
  },
  {
    src: img("mercedes.jpg", "v1792400602"),
    alt: "Solstice — Mercedes-Benz GLA",
    caption: "Solstice — Mercedes-Benz GLA",
    tag: "Crossover",
  },
  {
    src: img("bmw.jpg", "v1792400600"),
    alt: "Argent — BMW X1",
    caption: "Argent — BMW X1 xDrive",
    tag: "Premium Import",
  },
];

/** Full-bleed fleet gallery built from live inventory */
export const fleetGallerySlides: SlideItem[] = vehicles.flatMap((vehicle) =>
  vehicle.gallery.slice(0, 2).map((frame, index) => ({
    src: frame.src,
    alt: frame.alt,
    caption: `${vehicle.name} — ${vehicle.make} ${vehicle.model}`,
    tag: index === 0 ? vehicle.category : vehicle.name,
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
