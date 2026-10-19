import type { SlideItem } from "@/components/ui/MediaSlider";
import { fleetHeroFrames, vehicles, namedAlt } from "@/data/vehicles";

/** Hero / marketing slides — every frame is a named Cloudinary unit */
export const heroSlides: SlideItem[] = fleetHeroFrames.map((frame) => ({
  src: frame.src,
  alt: frame.alt,
  caption: `${frame.name} — ${frame.make} ${frame.model}`,
  tag: frame.category,
}));

/** Full fleet gallery — primary + second shot per named unit */
export const fleetGallerySlides: SlideItem[] = vehicles.flatMap((vehicle) =>
  vehicle.gallery.slice(0, 3).map((frame, index) => ({
    src: frame.src,
    alt: namedAlt(vehicle, frame.alt.replace(/^.*?—\s*/, "")),
    caption: `${vehicle.name} — ${vehicle.make} ${vehicle.model}`,
    tag: index === 0 ? vehicle.category : vehicle.name,
  })),
);

/** Services gallery — named inventory tied to each offering mood */
export const servicesLifestyleSlides: SlideItem[] = [
  {
    src: vehicles[0].image.src,
    alt: namedAlt(vehicles[0], "sales"),
    caption: `${vehicles[0].name} — vehicle sales`,
    tag: vehicles[0].name,
  },
  {
    src: vehicles[1].gallery[2]?.src ?? vehicles[1].image.src,
    alt: namedAlt(vehicles[1], "sourcing"),
    caption: `${vehicles[1].name} — sourcing & instalments`,
    tag: vehicles[1].name,
  },
  {
    src: vehicles[2].gallery[3]?.src ?? vehicles[2].image.src,
    alt: namedAlt(vehicles[2], "cabin"),
    caption: `${vehicles[2].name} — training & care`,
    tag: vehicles[2].name,
  },
  {
    src: vehicles[3].image.src,
    alt: namedAlt(vehicles[3], "drivers"),
    caption: `${vehicles[3].name} — driver placement`,
    tag: vehicles[3].name,
  },
  {
    src: vehicles[6].image.src,
    alt: namedAlt(vehicles[6], "fleet"),
    caption: `${vehicles[6].name} — delivery & fleet`,
    tag: vehicles[6].name,
  },
];
