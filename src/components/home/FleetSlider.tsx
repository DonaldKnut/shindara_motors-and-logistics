"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useFormModal } from "@/components/forms/FormModalContext";
import { vehicles } from "@/data/vehicles";
import { easeOut } from "@/lib/motion";

const AUTO_MS = 6500;

export function FleetSlider() {
  const reduceMotion = useReducedMotion();
  const { openEnquire } = useFormModal();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = vehicles.length;
  const active = vehicles[index] ?? vehicles[0];

  const go = useCallback(
    (dir: -1 | 1) => {
      setDirection(dir);
      setIndex((current) => (current + dir + count) % count);
    },
    [count],
  );

  const jump = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [count, go, paused, reduceMotion, index]);

  if (!active) return null;

  const slideVariants = {
    enter: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir > 0 ? 48 : -48, scale: 1.04 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir > 0 ? -36 : 36, scale: 1.02 },
  };

  return (
    <section
      className="relative overflow-hidden bg-obsidian-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured fleet"
    >
      {/* Atmospheric wash */}
      <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-30" />
      <div className="pointer-events-none absolute -left-1/4 top-0 h-[70%] w-1/2 bg-glow-gold opacity-40" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-[50%] w-1/2 bg-glow-gold opacity-25" />

      <div className="relative min-h-[min(92svh,52rem)]">
        {/* Full-bleed stage */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={active.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduceMotion ? 0.2 : 0.75, ease: easeOut }}
              className="absolute inset-0"
            >
              <Image
                src={active.image.src}
                alt={active.image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/75 to-obsidian/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content overlay */}
        <div className="container-shell relative z-10 flex min-h-[min(92svh,52rem)] flex-col justify-end pb-8 pt-28 sm:pb-10 sm:pt-32 lg:justify-center lg:pb-16 lg:pt-24">
          <div className="grid max-w-xl gap-6 lg:max-w-2xl">
            <div>
              <motion.p
                key={`tag-${active.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
                className="eyebrow mb-3"
              >
                {active.category} · {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </motion.p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${active.id}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: easeOut }}
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold-bright">
                    {active.name}
                  </p>
                  <h2 className="display-title mt-2 text-[clamp(2.4rem,8vw,4.75rem)] text-ivory">
                    {active.make}
                    <br />
                    <span className="text-gold-gradient">{active.model}</span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-silver sm:text-base">
                    {active.year} · {active.color} · {active.engine}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-silver/80">
                    <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    {active.location} · {active.status}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openEnquire({ vehicle: active })}
                className="group inline-flex items-center gap-2 bg-gold px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-obsidian transition-opacity hover:opacity-90"
              >
                Enquire on {active.name}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-[0.7rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              >
                Full fleet
              </Link>
            </div>

            {/* Specs strip */}
            <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-5 sm:grid-cols-4">
              {[
                { label: "Year", value: String(active.year) },
                { label: "Fuel", value: active.fuel },
                { label: "Gearbox", value: active.transmission },
                { label: "Price", value: active.priceLabel },
              ].map((spec) => (
                <div key={spec.label}>
                  <dt className="text-[0.58rem] uppercase tracking-[0.18em] text-silver/60">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 truncate text-sm text-ivory">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Controls + filmstrip */}
          <div className="mt-10 flex flex-col gap-5 lg:mt-14">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous vehicle"
                  onClick={() => go(-1)}
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-obsidian/50 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next vehicle"
                  onClick={() => go(1)}
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-obsidian/50 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Autoplay progress */}
              {!reduceMotion ? (
                <div className="hidden h-px flex-1 max-w-xs overflow-hidden bg-white/10 sm:block">
                  <motion.div
                    key={`progress-${active.id}-${paused}`}
                    className="h-full bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{
                      duration: paused ? 0 : AUTO_MS / 1000,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              ) : null}
            </div>

            <div
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none"
              role="tablist"
              aria-label="Select vehicle"
            >
              {vehicles.map((vehicle, i) => {
                const selected = i === index;
                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`Show ${vehicle.name}`}
                    onClick={() => jump(i)}
                    className={`group relative h-16 w-[4.75rem] shrink-0 overflow-hidden border transition-all duration-300 sm:h-[4.5rem] sm:w-24 ${
                      selected
                        ? "border-gold shadow-[0_0_0_1px_rgba(214,173,89,0.35)]"
                        : "border-white/15 opacity-55 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={vehicle.image.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian to-transparent px-1 pb-1 pt-4 text-center text-[0.55rem] uppercase tracking-[0.12em] text-ivory">
                      {vehicle.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
