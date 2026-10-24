"use client";

import Image from "next/image";
import { cinemaVideo, trainingStills } from "@/data/media";

/** Photo + loop collage for the automotive training advert */
export function TrainingMedia() {
  return (
    <div className="relative w-full max-w-[22rem]">
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        <figure className="relative col-span-2 aspect-[16/10] overflow-hidden border border-gold/25">
          <video
            src={cinemaVideo("xfcgjvh.mp4", "v1792796337")}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Training session — cabin and controls"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent px-3 pb-2.5 pt-8">
            <p className="text-[0.58rem] uppercase tracking-[0.18em] text-gold">
              Live lesson
            </p>
            <p className="display-title text-sm text-ivory">Hands on the wheel</p>
          </figcaption>
        </figure>

        <figure className="relative aspect-[4/5] overflow-hidden border border-gold/20">
          <Image
            src={trainingStills.cabin.src}
            alt={trainingStills.cabin.alt}
            fill
            sizes="(max-width: 768px) 45vw, 180px"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/95 to-transparent px-2.5 pb-2 pt-6">
            <p className="text-[0.55rem] uppercase tracking-[0.16em] text-gold">
              {trainingStills.cabin.caption}
            </p>
          </figcaption>
        </figure>

        <figure className="relative aspect-[4/5] overflow-hidden border border-gold/20">
          <Image
            src={trainingStills.engine.src}
            alt={trainingStills.engine.alt}
            fill
            sizes="(max-width: 768px) 45vw, 180px"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/95 to-transparent px-2.5 pb-2 pt-6">
            <p className="text-[0.55rem] uppercase tracking-[0.16em] text-gold">
              {trainingStills.engine.caption}
            </p>
          </figcaption>
        </figure>
      </div>
      <div className="pointer-events-none absolute -inset-3 border border-dashed border-gold/15" />
    </div>
  );
}
