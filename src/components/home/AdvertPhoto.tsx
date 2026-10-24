"use client";

import Image from "next/image";
import { cldSized } from "@/data/media";

type AdvertPhotoProps = {
  src: string;
  alt: string;
  caption: string;
  label?: string;
};

/** Photo frame for HomeAdverts rows that still used SVG art. */
export function AdvertPhoto({
  src,
  alt,
  caption,
  label = "Featured",
}: AdvertPhotoProps) {
  return (
    <div className="relative w-full max-w-[22rem]">
      <figure className="relative aspect-[5/6] overflow-hidden border border-gold/25">
        <Image
          src={cldSized(src, 720, "good")}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 352px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10 sm:px-4 sm:pb-4">
          <p className="text-[0.55rem] uppercase tracking-[0.18em] text-gold">
            {label}
          </p>
          <p className="display-title mt-1 text-base text-ivory sm:text-lg">
            {caption}
          </p>
        </figcaption>
      </figure>
      <div className="pointer-events-none absolute -inset-3 border border-dashed border-gold/15" />
    </div>
  );
}
