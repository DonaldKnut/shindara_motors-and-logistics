"use client";

import Image from "next/image";
import { driverStill } from "@/data/media";

/** Photo frame for the professional drivers advert */
export function DriverMedia() {
  return (
    <div className="relative w-full max-w-[22rem]">
      <figure className="relative aspect-[4/5] overflow-hidden border border-gold/25 sm:aspect-[5/6]">
        <Image
          src={driverStill.src}
          alt={driverStill.alt}
          fill
          sizes="(max-width: 768px) 90vw, 352px"
          className="object-cover object-[center_20%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10 sm:px-4 sm:pb-4">
          <p className="text-[0.58rem] uppercase tracking-[0.18em] text-gold">
            {driverStill.caption}
          </p>
          <p className="display-title mt-1 text-base text-ivory sm:text-lg">
            Hands on the wheel
          </p>
        </figcaption>
      </figure>
      <div className="pointer-events-none absolute -inset-3 border border-dashed border-gold/15" />
    </div>
  );
}
