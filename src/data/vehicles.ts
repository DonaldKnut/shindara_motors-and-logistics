import { img } from "@/data/media";

/**
 * Live vehicle inventory — photography hosted on Cloudinary.
 */
export type VehicleCategory =
  | "All"
  | "Prestige SUVs"
  | "Executive Saloons"
  | "Crossovers";

export type Vehicle = {
  id: string;
  /** Curated unit name shown on cards & enquiries */
  name: string;
  make: string;
  model: string;
  year: number;
  category: Exclude<VehicleCategory, "All">;
  mileage: string;
  transmission: string;
  fuel: string;
  engine: string;
  color: string;
  location: string;
  priceLabel: string;
  status: "Available" | "Reserved" | "In Transit";
  isSample: boolean;
  features: string[];
  image: {
    src: string;
    alt: string;
  };
  gallery: Array<{ src: string; alt: string }>;
};

const lexusGallery = [
  {
    src: img("lexus.jpg", "v1792400602"),
    alt: "Lexus ES — front grille and spindle design",
  },
  {
    src: img("WhatsApp_Image_2026-10-16_at_PM.jpg", "v1792400613"),
    alt: "Lexus ES — front view on concrete lot",
  },
  {
    src: img("WhatsApp_Image_2026-10-16_at.jpg", "v1792400613"),
    alt: "Lexus ES — three-quarter front under canopy",
  },
  {
    src: img("WhatsApp_Image_2026-10-16_at_7.25.11_PM.jpg", "v1792400613"),
    alt: "Lexus ES 350 — rear three-quarter with custom diffuser",
  },
  {
    src: img("WhatsApp_Image_2026-10-16_at_7.25.20_PM.jpg", "v1792400613"),
    alt: "Lexus ES — exterior detail",
  },
  {
    src: img("WhatsApp_Image_2026-10-16_at_7.25.10_PM.jpg", "v1792400612"),
    alt: "Lexus ES — side and wheel detail",
  },
  {
    src: img("WhatsApp_Image_2026-10-16_at_7.25.09_PM.jpg", "v1792400612"),
    alt: "Lexus ES — additional exterior frame",
  },
  {
    src: img("WhatsApp_Image_2026-10-1PM.jpg", "v1792400611"),
    alt: "Lexus ES — portfolio frame",
  },
  {
    src: img("kenny.jpg", "v1792400602"),
    alt: "Lexus ES — exterior showcase",
  },
  {
    src: img("carrs.jpg", "v1792400601"),
    alt: "Lexus ES — fleet photography",
  },
  {
    src: img("interior.jpg", "v1792400601"),
    alt: "Lexus — rear cabin black leather",
  },
  {
    src: img("interrr.jpg", "v1792400601"),
    alt: "Lexus — driver's cockpit and wood trim",
  },
  {
    src: img("ftg.jpg", "v1792400601"),
    alt: "Lexus — detail photography",
  },
  {
    src: img("ibha.jpg", "v1792400601"),
    alt: "Lexus — cabin detail",
  },
  {
    src: img("hggs.jpg", "v1792400601"),
    alt: "Lexus — interior highlight",
  },
  {
    src: img("erdftu.jpg", "v1792400601"),
    alt: "Lexus V6 engine bay",
  },
];

const pradoGallery = [
  {
    src: img("prado.jpg", "v1792400606"),
    alt: "Toyota Land Cruiser Prado — front face",
  },
  {
    src: img("praddo.jpg", "v1792400604"),
    alt: "Toyota Land Cruiser Prado — front three-quarter",
  },
  {
    src: img("pen_prado.jpg", "v1792400602"),
    alt: "Toyota Land Cruiser Prado — front grille with TOYOTA lettering",
  },
  {
    src: img("tototot.jpg", "v1792400607"),
    alt: "Toyota Land Cruiser Prado — rear with spare tyre cover",
  },
  {
    src: img("teoe.jpg", "v1792400606"),
    alt: "Toyota Land Cruiser Prado — rear portrait under blue sky",
  },
  {
    src: img("toyta.jpg", "v1792400610"),
    alt: "Toyota Land Cruiser Prado — exterior",
  },
  {
    src: img("toyt.jpg", "v1792400607"),
    alt: "Toyota Land Cruiser Prado — profile",
  },
  {
    src: img("newtyt.jpg", "v1792400602"),
    alt: "Toyota Land Cruiser Prado — additional exterior",
  },
];

const bmwGallery = [
  {
    src: img("bmw.jpg", "v1792400600"),
    alt: "BMW X1 — front kidney grille",
  },
  {
    src: img("bmw_.jpg", "v1792400601"),
    alt: "BMW X1 — front view",
  },
  {
    src: img("bm.jpg", "v1792400600"),
    alt: "BMW X1 xDrive — rear view",
  },
  {
    src: img("biqfnl.jpg", "v1792400600"),
    alt: "BMW — cockpit and iDrive console",
  },
  {
    src: img("hehehe.jpg", "v1792400600"),
    alt: "BMW X1 — exterior detail",
  },
  {
    src: img("gw.jpg", "v1792400600"),
    alt: "BMW — portfolio frame",
  },
];

const mercedesGallery = [
  {
    src: img("mercedes.jpg", "v1792400602"),
    alt: "Mercedes-Benz GLA — three-quarter front",
  },
  {
    src: img("merced.jpg", "v1792400602"),
    alt: "Mercedes-Benz GLA — exterior",
  },
  {
    src: img("benxa.jpg", "v1792400600"),
    alt: "Mercedes-Benz — portfolio frame",
  },
];

const rav4Gallery = [
  {
    src: img("rrav.jpg", "v1792400606"),
    alt: "Toyota RAV4 — front view",
  },
  {
    src: img("rdxftc.jpg", "v1792400606"),
    alt: "Toyota RAV4 — exterior",
  },
];

const highlanderGallery = [
  {
    src: img("uvbkx.jpg", "v1792400610"),
    alt: "Toyota Highlander — front three-quarter",
  },
  {
    src: img("uyrqhbw.jpg", "v1792400611"),
    alt: "Toyota Highlander — exterior",
  },
];

const camryGallery = [
  {
    src: img("tit_e.jpg", "v1792400607"),
    alt: "Toyota Camry SE — rear three-quarter in cherry red",
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "lexus-es-350",
    name: "Noir",
    make: "Lexus",
    model: "ES 350",
    year: 2019,
    category: "Executive Saloons",
    mileage: "On request",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "3.5L V6",
    color: "Charcoal Metallic",
    location: "Lagos Hub",
    priceLabel: "Price on Application",
    status: "Available",
    isSample: false,
    features: [
      "Spindle grille",
      "Black leather cabin",
      "Custom turbine wheels",
      "Verified title ready",
    ],
    image: lexusGallery[0],
    gallery: lexusGallery,
  },
  {
    id: "toyota-land-cruiser-prado",
    name: "Monarch",
    make: "Toyota",
    model: "Land Cruiser Prado",
    year: 2021,
    category: "Prestige SUVs",
    mileage: "On request",
    transmission: "Automatic",
    fuel: "Petrol / Diesel options",
    engine: "Multi-terrain capable",
    color: "Gloss Black",
    location: "Lagos Hub",
    priceLabel: "Price on Application",
    status: "Available",
    isSample: false,
    features: [
      "Spare tyre cover",
      "Quad exhaust tips",
      "Blacked-out grille",
      "Side steps",
    ],
    image: pradoGallery[0],
    gallery: pradoGallery,
  },
  {
    id: "bmw-x1-xdrive",
    name: "Argent",
    make: "BMW",
    model: "X1 xDrive",
    year: 2020,
    category: "Crossovers",
    mileage: "On request",
    transmission: "Automatic Steptronic",
    fuel: "Petrol",
    engine: "xDrive AWD",
    color: "Metallic Silver",
    location: "Lagos Hub",
    priceLabel: "Price on Application",
    status: "Available",
    isSample: false,
    features: [
      "Kidney grille",
      "LED wraparound lights",
      "iDrive cockpit",
      "Dual exhaust",
    ],
    image: bmwGallery[0],
    gallery: bmwGallery,
  },
  {
    id: "mercedes-gla",
    name: "Solstice",
    make: "Mercedes-Benz",
    model: "GLA",
    year: 2020,
    category: "Crossovers",
    mileage: "On request",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "Turbocharged",
    color: "Metallic Silver / Contrast roof",
    location: "Lagos Hub",
    priceLabel: "Price on Application",
    status: "Available",
    isSample: false,
    features: [
      "Panoramic contrast roof",
      "LED headlights",
      "Star grille",
      "Roof rails",
    ],
    image: mercedesGallery[0],
    gallery: mercedesGallery,
  },
  {
    id: "toyota-highlander",
    name: "Atlas",
    make: "Toyota",
    model: "Highlander",
    year: 2013,
    category: "Prestige SUVs",
    mileage: "On request",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    color: "Metallic Charcoal",
    location: "Lagos Hub",
    priceLabel: "Price on Application",
    status: "Available",
    isSample: false,
    features: [
      "Roof rails",
      "Fog lights",
      "Family-ready SUV",
      "Verified documentation",
    ],
    image: highlanderGallery[0],
    gallery: highlanderGallery,
  },
  {
    id: "toyota-rav4",
    name: "Ember",
    make: "Toyota",
    model: "RAV4",
    year: 2008,
    category: "Crossovers",
    mileage: "On request",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "Inline-4",
    color: "Red",
    location: "Lagos Hub",
    priceLabel: "Price on Application",
    status: "Available",
    isSample: false,
    features: ["Sunroof", "Roof rails", "Compact SUV", "Ready for inspection"],
    image: rav4Gallery[0],
    gallery: rav4Gallery,
  },
  {
    id: "toyota-camry-se",
    name: "Scarlet",
    make: "Toyota",
    model: "Camry SE",
    year: 2015,
    category: "Executive Saloons",
    mileage: "On request",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L / V6 options",
    color: "Cherry Red Metallic",
    location: "Lagos Hub",
    priceLabel: "Price on Application",
    status: "Available",
    isSample: false,
    features: [
      "SE sport trim",
      "Alloy wheels",
      "Integrated spoiler",
      "Chrome accents",
    ],
    image: camryGallery[0],
    gallery: camryGallery,
  },
];

export const hasLiveInventory = vehicles.some((vehicle) => !vehicle.isSample);

export function getVehicleById(id: string) {
  return vehicles.find((v) => v.id === id);
}

export function vehicleLabel(vehicle: Vehicle) {
  return `${vehicle.name} · ${vehicle.year} ${vehicle.make} ${vehicle.model}`;
}

export function vehicleSpecLabel(vehicle: Vehicle) {
  return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
}
