"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cldSized } from "@/data/media";
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
  /** Max Cloudinary width for the main stage */
  stageWidth?: number;
};

/**
 * Fast gallery slider — stacked slides (no wait-mode flash),
 * Cloudinary-sized URLs, adjacent preload.
 */
export function MediaSlider({
  slides,
  className = "",
  aspectClassName = "aspect-[16/10] min-[480px]:aspect-[21/9]",
  autoPlayMs = 5500,
  showCaptions = true,
  rounded = false,
  stageWidth = 1400,
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

  // Preload current ± 2 with sized URLs
  const preloadIndexes = [index, index + 1, index - 1, index + 2]
    .map((i) => ((i % count) + count) % count)
    .filter((v, i, arr) => arr.indexOf(v) === i);

  return (
    <div
      className={`relative overflow-hidden slider-frame ${rounded ? "rounded-lg" : ""} ${className}`}
    >
      <div className={`relative w-full overflow-hidden bg-obsidian ${aspectClassName}`}>
        {slides.map((slide, i) => {
          const showPlaceholder = slide.placeholder || !slide.src;
          const visible = i === index;
          const shouldMount = preloadIndexes.includes(i);
          if (!shouldMount) return null;

          const src = slide.src
            ? cldSized(slide.src, stageWidth, "good")
            : undefined;

          return (
            <motion.div
              key={`${slide.alt}-${i}`}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : reduceMotion ? 1 : 1.04,
                zIndex: visible ? 2 : 1,
              }}
              transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: easeOut }}
              aria-hidden={!visible}
            >
              {showPlaceholder || !src ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-obsidian-deep px-4 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center border border-gold/35 text-gold">
                    <ImageIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    Image slot ready
                  </p>
                </div>
              ) : (
                <Image
                  src={src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 90vw, 896px"
                  className="object-cover"
                  priority={i === 0 || i === index}
                  loading={i === index || i === (index + 1) % count ? "eager" : "lazy"}
                  quality={78}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090a0b]/85 via-transparent to-[#090a0b]/25" />
            </motion.div>
          );
        })}

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

          <div className="absolute bottom-3 right-3 z-20 flex max-w-[70%] flex-wrap justify-end gap-1 sm:bottom-5 sm:right-5">
            {slides.map((slide, i) => (
              <button
                key={`${slide.alt}-dot-${i}`}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-gold"
                    : "w-2.5 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Tiny filmstrip thumbs for faster scrubbing */}
          <div className="absolute bottom-3 left-3 z-20 hidden max-w-[45%] gap-1 overflow-x-auto scrollbar-none sm:flex">
            {slides.map((slide, i) => {
              if (!slide.src) return null;
              return (
                <button
                  key={`thumb-${i}`}
                  type="button"
                  aria-label={`Photo ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`relative h-10 w-14 shrink-0 overflow-hidden border transition-opacity ${
                    i === index
                      ? "border-gold opacity-100"
                      : "border-white/20 opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={cldSized(slide.src, 160, "eco")}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
