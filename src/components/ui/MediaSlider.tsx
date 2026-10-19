"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { easeOut } from "@/lib/motion";

export type SlideItem = {
  src?: string;
  alt: string;
  caption?: string;
  tag?: string;
  /** When true (or src missing), shows an elegant placeholder ready for drop-in assets */
  placeholder?: boolean;
};

type MediaSliderProps = {
  slides: SlideItem[];
  className?: string;
  aspectClassName?: string;
  autoPlayMs?: number;
  showCaptions?: boolean;
  rounded?: boolean;
};

export function MediaSlider({
  slides,
  className = "",
  aspectClassName = "aspect-[16/10] min-[480px]:aspect-[21/9]",
  autoPlayMs = 5500,
  showCaptions = true,
  rounded = false,
}: MediaSliderProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const active = slides[index] ?? slides[0];

  const go = useCallback(
    (direction: -1 | 1) => {
      if (!count) return;
      setIndex((current) => (current + direction + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (reduceMotion || count < 2 || autoPlayMs <= 0) return;
    const id = window.setInterval(() => go(1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, count, go, reduceMotion, index]);

  if (!active) return null;

  const showPlaceholder = active.placeholder || !active.src;

  return (
    <div className={`relative overflow-hidden slider-frame ${rounded ? "rounded-lg" : ""} ${className}`}>
      <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${index}-${active.src ?? "placeholder"}`}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0.35, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            {showPlaceholder ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-obsidian-deep px-4 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center border border-gold/35 text-gold">
                  <ImageIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  Image slot ready
                </p>
                <p className="max-w-xs text-sm text-silver">
                  Drop your asset into <code className="text-ivory">public/</code> and
                  update the slide path — layout stays locked.
                </p>
              </div>
            ) : (
              <Image
                src={active.src!}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090a0b]/85 via-transparent to-[#090a0b]/25" />
          </motion.div>
        </AnimatePresence>

        {showCaptions && (active.caption || active.tag) ? (
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
            {active.tag ? (
              <p className="eyebrow mb-2 text-gold-bright">{active.tag}</p>
            ) : null}
            {active.caption ? (
              <p className="display-title max-w-2xl text-[clamp(1.1rem,3.5vw,2rem)] text-white drop-shadow">
                {active.caption}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {count > 1 ? (
        <>
          <div className="absolute inset-y-0 left-0 z-20 flex items-center p-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] bg-obsidian/70 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold-bright"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 z-20 flex items-center p-2">
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] bg-obsidian/70 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold-bright"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 z-20 flex max-w-[60%] flex-wrap justify-end gap-1.5 sm:bottom-5 sm:right-5">
            {slides.map((slide, i) => (
              <button
                key={`${slide.alt}-${i}`}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-gold"
                    : "w-3 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
