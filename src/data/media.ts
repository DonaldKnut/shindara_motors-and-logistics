/** Cloudinary CDN base for Shindara inventory photography */
export const CLOUDINARY =
  "https://res.cloudinary.com/hupa4xqf/image/upload" as const;

/** Secondary Cloudinary cloud — cinema + training assets */
export const CLOUDINARY_CINEMA =
  "https://res.cloudinary.com/ls40ecmc" as const;

/** Delivery transforms — auto format/quality + width cap (much faster galleries). */
const delivery = (width: number, quality: "good" | "eco" = "good") =>
  `f_auto,q_auto:${quality},c_limit,w_${width},dpr_auto`;

export const img = (id: string, version = "v1792400600", width = 1600) =>
  `${CLOUDINARY}/${delivery(width)}/${version}/${id}`;

/** Smaller frame for dials / cards / strip thumbs */
export const imgThumb = (id: string, version = "v1792400600", width = 480) =>
  `${CLOUDINARY}/${delivery(width, "eco")}/${version}/${id}`;

export const cinemaImg = (id: string, version = "v1792796507", width = 1400) =>
  `${CLOUDINARY_CINEMA}/image/upload/${delivery(width)}/${version}/${id}`;

export const cinemaVideo = (id: string, version = "v1792796338") =>
  `${CLOUDINARY_CINEMA}/video/upload/${version}/${id}`;

/** Official Shindara lockup (transparent) — header, footer, loader */
export const BRAND_LOGO =
  `${CLOUDINARY_CINEMA}/image/upload/${delivery(720)}/v1792828179/Shindara_Automotive_Logistics_Emblem__1_-removebg-preview.png` as const;

export const BRAND_LOGO_MARK =
  `${CLOUDINARY_CINEMA}/image/upload/${delivery(256, "eco")}/v1792828179/Shindara_Automotive_Logistics_Emblem__1_-removebg-preview.png` as const;

/**
 * Re-apply a width transform on an existing Cloudinary upload URL
 * (works whether transforms are already present or not).
 */
export function cldSized(
  src: string,
  width: number,
  quality: "good" | "eco" = "good",
) {
  if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) {
    return src;
  }
  const transform = delivery(width, quality);
  return src.replace(
    /\/upload\/(?:.*?\/)?(v\d+)\//,
    `/upload/${transform}/$1/`,
  );
}

/** Looping cinema reels for the homepage showcase */
export const cinemaReels = [
  {
    id: "fv",
    src: cinemaVideo("fv.mp4", "v1792796338"),
    title: "Lot walkthrough",
    tag: "On the ground",
    blurb: "Real inventory, filmed where the cars sit — no stock footage.",
  },
  {
    id: "ryhkj",
    src: cinemaVideo("ryhkj.mp4", "v1792796338"),
    title: "Detail & presence",
    tag: "Craft",
    blurb: "Close looks at finish, stance, and the details buyers care about.",
  },
  {
    id: "xfcgjvh",
    src: cinemaVideo("xfcgjvh.mp4", "v1792796337"),
    title: "Cabin & control",
    tag: "Inside",
    blurb: "Interiors and driving feel — the part you live with every day.",
  },
] as const;

/** Automotive training stills */
export const trainingStills = {
  cabin: {
    src: cinemaImg("interior.jpg", "v1792796508"),
    alt: "Lexus cabin — black leather, wood trim, and driver controls",
    caption: "Cabin mastery",
  },
  engine: {
    src: cinemaImg("hehehe.jpg", "v1792796507"),
    alt: "Lexus V6 engine bay under open hood",
    caption: "Under the hood",
  },
} as const;

/** Professional driver placement still */
export const driverStill = {
  src: cinemaImg("detail_fleet.jpg", "v1792826879"),
  alt: "Professional driver at the wheel — leather jacket, watch, dusk city ahead",
  caption: "Screened · Ready",
} as const;

/** All uploaded assets (deduped) — used as fallback gallery / sitewide embeds */
export const allFleetAssets = [
  img("WhatsApp_Image_2026-10-16_at_PM.jpg", "v1792400613"),
  img("WhatsApp_Image_2026-10-16_at.jpg", "v1792400613"),
  img("WhatsApp_Image_2026-10-16_at_7.25.11_PM.jpg", "v1792400613"),
  img("WhatsApp_Image_2026-10-16_at_7.25.20_PM.jpg", "v1792400613"),
  img("WhatsApp_Image_2026-10-16_at_7.25.10_PM.jpg", "v1792400612"),
  img("WhatsApp_Image_2026-10-16_at_7.25.09_PM.jpg", "v1792400612"),
  img("WhatsApp_Image_2026-10-1PM.jpg", "v1792400611"),
  img("uyrqhbw.jpg", "v1792400611"),
  img("uvbkx.jpg", "v1792400610"),
  img("toyta.jpg", "v1792400610"),
  img("toyt.jpg", "v1792400607"),
  img("tototot.jpg", "v1792400607"),
  img("tit_e.jpg", "v1792400607"),
  img("prado.jpg", "v1792400606"),
  img("teoe.jpg", "v1792400606"),
  img("rrav.jpg", "v1792400606"),
  img("rdxftc.jpg", "v1792400606"),
  img("praddo.jpg", "v1792400604"),
  img("pen_prado.jpg", "v1792400602"),
  img("mercedes.jpg", "v1792400602"),
  img("merced.jpg", "v1792400602"),
  img("newtyt.jpg", "v1792400602"),
  img("lexus.jpg", "v1792400602"),
  img("kenny.jpg", "v1792400602"),
  img("ftg.jpg", "v1792400601"),
  img("ibha.jpg", "v1792400601"),
  img("interrr.jpg", "v1792400601"),
  img("interior.jpg", "v1792400601"),
  img("carrs.jpg", "v1792400601"),
  img("hggs.jpg", "v1792400601"),
  img("erdftu.jpg", "v1792400601"),
  img("bmw_.jpg", "v1792400601"),
  img("hehehe.jpg", "v1792400600"),
  img("bmw.jpg", "v1792400600"),
  img("bm.jpg", "v1792400600"),
  img("biqfnl.jpg", "v1792400600"),
  img("gw.jpg", "v1792400600"),
  img("benxa.jpg", "v1792400600"),
] as const;
