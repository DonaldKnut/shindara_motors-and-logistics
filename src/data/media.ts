/** Cloudinary CDN base for Shindara inventory photography */
export const CLOUDINARY =
  "https://res.cloudinary.com/hupa4xqf/image/upload" as const;

export const img = (id: string, version = "v1792400600") =>
  `${CLOUDINARY}/${version}/${id}`;

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
