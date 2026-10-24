"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cldSized } from "@/data/media";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { easeOut } from "@/lib/motion";

type MegaSlide = {
  id: string;
  title: string;
  tag: string;
  href: string;
  src: string;
  alt: string;
};

const slides: MegaSlide[] = [
  ...services.map((service) => ({
    id: `svc-${service.id}`,
    title: service.title,
    tag: "Service",
    href: service.href,
    src: service.image.src,
    alt: service.image.alt,
  })),
  ...vehicles.slice(0, 4).map((vehicle) => ({
    id: `car-${vehicle.id}`,
    title: vehicle.name,
    tag: `${vehicle.make} ${vehicle.model}`,
    href: "/vehicles",
    src: vehicle.image.src,
    alt: vehicle.image.alt,
  })),
];

type MegaMenuSliderProps = {
  active: boolean;
  onNavigate?: () => void;
};

/**
 * Auto-advancing service + fleet slider for the Services mega menu.
 */
export function MegaMenuSlider({ active, onNavigate }: MegaMenuSliderProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const slide = slides[index] ?? slides[0];

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((current) => (current + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!active) {
      setIndex(0);
      setPaused(false);
    }
  }, [active]);

  useEffect(() => {
    if (!active || paused || reduceMotion || count < 2) return;
    const id = window.setInterval(() => go(1), 4200);
    return () => window.clearInterval(id);
  }, [active, paused, reduceMotion, count, go, index]);

  if (!slide) return null;

  return (
    <div
      className="relative hidden w-full overflow-hidden border border-gold/30 lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link
        href={slide.href}
        onClick={onNavigate}
        className="group relative block aspect-[4/5] w-full text-left"
        aria-label={`${slide.title} — open`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            <Image
              src={cldSized(slide.src, 560, "good")}
              alt={slide.alt}
              fill
              sizes="240px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-[1] p-3.5">
          <p className="text-[0.55rem] uppercase tracking-[0.2em] text-gold">
            {slide.tag}
          </p>
          <p className="display-title mt-1 text-base text-ivory sm:text-lg">
            {slide.title}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[0.62rem] uppercase tracking-[0.14em] text-gold-bright">
            Explore
            <ArrowUpRight className="h-3 w-3" />
          </p>
        </div>
      </Link>

      {!reduceMotion && active && !paused ? (
        <div className="absolute left-0 right-0 top-0 z-[2] h-0.5 overflow-hidden bg-white/10">
          <motion.div
            key={`mega-bar-${slide.id}`}
            className="h-full origin-left bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4.2, ease: "linear" }}
          />
        </div>
      ) : null}

      <div className="absolute inset-x-0 top-0 z-[2] flex items-center justify-between p-2">
        <button
          type="button"
          aria-label="Previous mega slide"
          onClick={(e) => {
            e.preventDefault();
            go(-1);
          }}
          className="inline-flex h-8 w-8 items-center justify-center border border-white/20 bg-obsidian/70 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <p className="font-mono text-[0.58rem] tabular-nums text-gold">
          {String(index + 1).padStart(2, "0")}
          <span className="text-silver/50"> / </span>
          {String(count).padStart(2, "0")}
        </p>
        <button
          type="button"
          aria-label="Next mega slide"
          onClick={(e) => {
            e.preventDefault();
            go(1);
          }}
          className="inline-flex h-8 w-8 items-center justify-center border border-white/20 bg-obsidian/70 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="absolute bottom-[4.75rem] left-0 right-0 z-[2] flex justify-center gap-1 px-3">
        {slides.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to ${item.title}`}
            aria-current={i === index}
            onClick={(e) => {
              e.preventDefault();
              setIndex(i);
            }}
            className={`h-1 transition-all ${
              i === index ? "w-5 bg-gold" : "w-2 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
