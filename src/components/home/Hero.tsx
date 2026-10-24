"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useFormModal } from "@/components/forms/FormModalContext";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cldSized } from "@/data/media";
import { vehicles } from "@/data/vehicles";
import { easeOut } from "@/lib/motion";

const AUTO_MS = 7500;
const DRAG_THRESHOLD = 56;

/**
 * Cinematic fleet hero — full-bleed stage, Ken Burns, stacked preload,
 * typographic unit mark, and a film-reel conductor.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const { openEnquire } = useFormModal();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const stageRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  const count = vehicles.length;
  const active = vehicles[index] ?? vehicles[0];
  const prev = vehicles[(index - 1 + count) % count];
  const next = vehicles[(index + 1) % count];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 55, damping: 20 });
  const springY = useSpring(my, { stiffness: 55, damping: 20 });
  const imgX = useTransform(springX, [-0.5, 0.5], reduceMotion ? [0, 0] : [22, -22]);
  const imgY = useTransform(springY, [-0.5, 0.5], reduceMotion ? [0, 0] : [12, -12]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setDirection(dir);
      setIndex((current) => (current + dir + count) % count);
    },
    [count],
  );

  const jump = useCallback(
    (nextIndex: number) => {
      if (nextIndex === index) return;
      setDirection(nextIndex > index ? 1 : -1);
      setIndex(nextIndex);
    },
    [index],
  );

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [count, go, paused, reduceMotion, index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Keep active thumb visible inside the reel only — never scroll the page
  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const thumb = reel.querySelector<HTMLElement>(`[data-reel-index="${index}"]`);
    if (!thumb) return;
    const target =
      thumb.offsetLeft - reel.clientWidth / 2 + thumb.clientWidth / 2;
    reel.scrollTo({
      left: Math.max(0, target),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [index, reduceMotion]);

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
    dragStartX.current = null;
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    dragStartX.current = event.clientX;
    setPaused(true);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragStartX.current == null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    setPaused(false);
    if (Math.abs(delta) < DRAG_THRESHOLD) return;
    go(delta < 0 ? 1 : -1);
  };

  if (!active) return null;

  const mountIds = new Set([active.id, prev?.id, next?.id]);

  return (
    <section
      ref={stageRef}
      className={`relative flex min-h-[100svh] flex-col overflow-hidden select-none ${
        isLight ? "bg-white text-[#121417]" : "bg-[#070809] text-[#f6f3ec]"
      }`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-roledescription="carousel"
      aria-label="Shindara fleet hero"
    >
      {/* Cinematic stage — stacked for instant swaps */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-[-5%]"
          style={{ x: imgX, y: imgY }}
        >
          {vehicles.map((vehicle, i) => {
            if (!mountIds.has(vehicle.id) && Math.abs(i - index) > 1) return null;
            const visible = i === index;
            return (
              <motion.div
                key={vehicle.id}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: visible ? 1 : 0,
                  scale: visible ? 1 : 1.06,
                  x: visible
                    ? 0
                    : reduceMotion
                      ? 0
                      : direction > 0
                        ? "-4%"
                        : "4%",
                  zIndex: visible ? 2 : 1,
                }}
                transition={{
                  duration: reduceMotion ? 0.2 : 0.85,
                  ease: easeOut,
                }}
                aria-hidden={!visible}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={
                    visible && !reduceMotion
                      ? { scale: [1.04, 1.1] }
                      : { scale: 1.04 }
                  }
                  transition={
                    visible && !reduceMotion
                      ? { duration: AUTO_MS / 1000, ease: "linear" }
                      : { duration: 0.4 }
                  }
                >
                  <Image
                    src={cldSized(vehicle.image.src, 1920, "good")}
                    alt={vehicle.image.alt}
                    fill
                    priority={i === 0 || visible}
                    sizes="100vw"
                    quality={80}
                    className="object-cover object-[center_42%]"
                    draggable={false}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Vignette + directional wash */}
        {isLight ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/75 to-white/20" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/15 to-white/45" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,8,9,0.35)_55%,rgba(7,8,9,0.88)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070809] via-[#070809]/72 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070809] via-transparent to-[#070809]/50" />
            {/* Soft film grain */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
              aria-hidden
            />
          </>
        )}

        {/* Illustrative frame corners */}
        <div className="pointer-events-none absolute inset-4 z-[1] sm:inset-6 lg:inset-8" aria-hidden>
          <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/45 sm:h-12 sm:w-12" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-gold/45 sm:h-12 sm:w-12" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-gold/45 sm:h-12 sm:w-12" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/45 sm:h-12 sm:w-12" />
        </div>
      </div>

      {/* Giant unit watermark */}
      <div className="pointer-events-none absolute inset-x-0 top-[12%] z-[1] overflow-hidden sm:top-[10%]">
        <AnimatePresence mode="wait">
          <motion.p
            key={`ghost-${active.name}`}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }
            }
            animate={{
              opacity: isLight ? 0.06 : 0.1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -24, clipPath: "inset(100% 0 0 0)" }
            }
            transition={{ duration: 0.7, ease: easeOut }}
            className="display-title whitespace-nowrap text-center text-[clamp(5rem,24vw,17rem)] leading-[0.85] tracking-tight text-ivory"
            aria-hidden="true"
          >
            {active.name}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Index mark — typographic, not a sticker */}
      <div
        className="pointer-events-none absolute right-[max(1rem,calc((100%-76rem)/2+1rem))] top-28 z-[2] hidden text-right sm:block"
        aria-hidden
      >
        <motion.p
          key={`idx-${index}`}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-gold"
        >
          Unit
        </motion.p>
        <p className="display-title mt-1 text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-ivory/90">
          {String(index + 1).padStart(2, "0")}
          <span className="text-lg text-silver/40">/{String(count).padStart(2, "0")}</span>
        </p>
      </div>

      {/* Brand + copy */}
      <div className="container-shell relative z-10 flex flex-1 flex-col justify-end pb-5 pt-28 sm:justify-center sm:pb-10 sm:pt-36">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <span className="h-px w-8 bg-gold sm:w-12" aria-hidden />
            <p className="eyebrow">Shindara Motors & Logistics</p>
          </motion.div>

          <motion.h1
            className="display-title text-balance text-[clamp(2.15rem,6.8vw,4.6rem)]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.04, ease: easeOut }}
          >
            Driving value.
            <span className="mt-1 block text-gold-gradient">Delivering more.</span>
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${active.id}`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: easeOut }}
              className="mt-5"
            >
              <p
                className={`max-w-md text-[clamp(0.95rem,2.2vw,1.15rem)] leading-relaxed ${
                  isLight ? "text-[#3d4248]" : "text-silver-light"
                }`}
              >
                <span className="font-medium text-gold">{active.name}</span>
                {" — "}
                {active.year} {active.make} {active.model}. Buy, sell, instalments,
                training, drivers, delivery.
              </p>

              {/* Spec strip — illustrative type, not badges on the photo */}
              <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-4">
                {[
                  { label: "Status", value: active.status },
                  { label: "Fuel", value: active.fuel },
                  { label: "Gear", value: active.transmission },
                  { label: "Lot", value: active.location },
                ].map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-[0.55rem] uppercase tracking-[0.2em] text-silver/55">
                      {spec.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-ivory">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: easeOut }}
          >
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
              className={`inline-flex items-center gap-2 border px-5 py-3 text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${
                isLight
                  ? "border-[#121417]/20 text-[#121417] hover:border-gold hover:text-gold"
                  : "border-white/25 text-ivory hover:border-gold/50 hover:text-gold"
              }`}
            >
              Full inventory
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Film-reel conductor */}
      <div
        className={`relative z-10 border-t backdrop-blur-2xl ${
          isLight
            ? "border-[var(--color-border)] bg-white/92"
            : "border-white/10 bg-[#070809]/88"
        }`}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Progress beam */}
        {!reduceMotion ? (
          <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-white/5">
            <motion.div
              key={`beam-${active.id}-${paused}`}
              className="h-full origin-left bg-gradient-to-r from-gold via-gold-bright to-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: paused ? 0 : 1 }}
              transition={{
                duration: paused ? 0 : AUTO_MS / 1000,
                ease: "linear",
              }}
            />
          </div>
        ) : null}

        <div className="container-shell py-4 sm:py-5">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous vehicle"
                onClick={() => go(-1)}
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next vehicle"
                onClick={() => go(1)}
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="ml-2 hidden sm:block">
                <p className="text-[0.58rem] uppercase tracking-[0.22em] text-gold">
                  Fleet reel
                </p>
                <p className="text-[0.65rem] text-silver">
                  Drag the stage · scroll the reel · arrow keys
                </p>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={active.name}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                className="display-title text-right text-lg text-ivory sm:text-xl"
              >
                {active.name}
              </motion.p>
            </AnimatePresence>
          </div>

          <div
            ref={reelRef}
            className="-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-1 scrollbar-none sm:gap-3"
            role="tablist"
            aria-label="Select vehicle"
            onWheel={(event) => {
              if (Math.abs(event.deltaY) < 12 && Math.abs(event.deltaX) < 12) return;
              const delta =
                Math.abs(event.deltaX) > Math.abs(event.deltaY)
                  ? event.deltaX
                  : event.deltaY;
              go(delta > 0 ? 1 : -1);
            }}
          >
            {vehicles.map((vehicle, i) => {
              const selected = i === index;
              return (
                <button
                  key={vehicle.id}
                  type="button"
                  role="tab"
                  data-reel-index={i}
                  aria-selected={selected}
                  onClick={() => jump(i)}
                  className={`group relative h-[5.25rem] w-[7.25rem] shrink-0 snap-center overflow-hidden text-left transition-all duration-500 sm:h-[6.25rem] sm:w-[9rem] ${
                    selected
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-90"
                  }`}
                >
                  {/* Film sprocket edge */}
                  <span
                    className="absolute inset-y-0 left-0 z-[2] flex w-2 flex-col justify-between py-1"
                    aria-hidden
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="mx-auto h-1.5 w-1.5 rounded-[1px] bg-obsidian/80 ring-1 ring-white/20"
                      />
                    ))}
                  </span>

                  <div
                    className={`absolute inset-0 border transition-colors duration-400 ${
                      selected
                        ? "border-gold shadow-[0_0_0_1px_rgba(214,173,89,0.35)]"
                        : "border-white/15"
                    }`}
                  >
                    <Image
                      src={cldSized(vehicle.image.src, 400, "eco")}
                      alt=""
                      fill
                      sizes="144px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                  </div>

                  <span className="absolute inset-x-0 bottom-0 z-[1] px-2.5 pb-2 pl-3.5">
                    <span
                      className={`block text-[0.58rem] uppercase tracking-[0.16em] ${
                        selected ? "text-gold-bright" : "text-ivory/85"
                      }`}
                    >
                      {vehicle.name}
                    </span>
                    <span className="block truncate text-[0.62rem] text-silver">
                      {vehicle.year} · {vehicle.make}
                    </span>
                  </span>

                  {selected ? (
                    <motion.span
                      layoutId="hero-reel-glow"
                      className="absolute inset-x-0 bottom-0 z-[2] h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
