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
import { useTheme } from "@/components/theme/ThemeProvider";
import { vehicles, vehicleLabel } from "@/data/vehicles";
import { easeOut } from "@/lib/motion";

const AUTO_MS = 7000;
const DRAG_THRESHOLD = 56;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const stageRef = useRef<HTMLElement>(null);

  const count = vehicles.length;
  const active = vehicles[index] ?? vehicles[0];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18 });
  const springY = useSpring(my, { stiffness: 60, damping: 18 });
  const imgX = useTransform(springX, [-0.5, 0.5], reduceMotion ? [0, 0] : [18, -18]);
  const imgY = useTransform(springY, [-0.5, 0.5], reduceMotion ? [0, 0] : [10, -10]);
  const imgScale = useTransform(springX, [-0.5, 0.5], [1.06, 1.06]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setDirection(dir);
      setIndex((current) => (current + dir + count) % count);
    },
    [count],
  );

  const jump = useCallback(
    (next: number) => {
      if (next === index) return;
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

  const enquireHref = `/enquire?type=${encodeURIComponent("Vehicle Sales (New & Used)")}&vehicle=${encodeURIComponent(vehicleLabel(active))}&vehicleId=${active.id}`;

  return (
    <section
      ref={stageRef}
      className={`relative flex min-h-[100svh] flex-col overflow-hidden select-none ${
        isLight ? "bg-white text-[#121417]" : "bg-[#090a0b] text-[#f6f3ec]"
      }`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-roledescription="carousel"
      aria-label="Shindara fleet hero"
    >
      {/* Parallax fleet stage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div className="absolute inset-[-4%]" style={{ x: imgX, y: imgY, scale: imgScale }}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active.id}
              className="absolute inset-0"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? "7%" : "-7%" }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? "-5%" : "5%" }
              }
              transition={{ duration: 0.65, ease: easeOut }}
            >
              <Image
                src={active.image.src}
                alt={active.image.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_40%]"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {isLight ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/25" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/20 to-white/50" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090a0b] via-[#090a0b]/78 to-[#090a0b]/15" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090a0b] via-[#090a0b]/25 to-[#090a0b]/55" />
          </>
        )}
      </div>

      {/* Giant ghost name */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] z-[1] overflow-hidden sm:top-[14%]">
        <AnimatePresence mode="wait">
          <motion.p
            key={`ghost-${active.name}`}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: isLight ? 0.07 : 0.09, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="display-title whitespace-nowrap text-center text-[clamp(4.5rem,22vw,16rem)] leading-none tracking-tight text-ivory"
            aria-hidden="true"
          >
            {active.name}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Brand + copy */}
      <div className="container-shell relative z-10 flex flex-1 flex-col justify-end pb-4 pt-28 sm:justify-center sm:pb-8 sm:pt-36">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.p
            className="eyebrow mb-3"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            Shindara Motors & Logistics
          </motion.p>

          <motion.h1
            className="display-title text-balance text-[clamp(2rem,6.5vw,4.4rem)]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: easeOut }}
          >
            Driving value.
            <span className="mt-1 block text-gold-gradient">Delivering more.</span>
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={`line-${active.id}`}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className={`mt-4 max-w-md text-[clamp(0.95rem,2.2vw,1.15rem)] leading-relaxed ${
                isLight ? "text-[#3d4248]" : "text-silver-light"
              }`}
            >
              <span className="font-medium text-gold">{active.name}</span>
              {" — "}
              {active.year} {active.make} {active.model}. We buy and sell cars, help with
              instalments, training, drivers, and delivery.
            </motion.p>
          </AnimatePresence>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: easeOut }}
          >
            <Link
              href={enquireHref}
              className="group inline-flex items-center gap-2 bg-gold px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-obsidian transition-opacity hover:opacity-90"
            >
              Enquire on {active.name}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
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

      {/* Interactive conductor dial */}
      <div
        className={`relative z-10 border-t backdrop-blur-xl ${
          isLight
            ? "border-[var(--color-border)] bg-white/90"
            : "border-white/10 bg-[#090a0b]/85"
        }`}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="container-shell py-4 sm:py-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous vehicle"
                onClick={() => go(-1)}
                className="inline-flex h-9 w-9 items-center justify-center border border-[var(--color-border)] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next vehicle"
                onClick={() => go(1)}
                className="inline-flex h-9 w-9 items-center justify-center border border-[var(--color-border)] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <p className="ml-2 hidden text-[0.65rem] uppercase tracking-[0.18em] text-silver sm:block">
                Fleet conductor · drag stage or dial
              </p>
            </div>
            <p className="font-mono text-[0.7rem] tabular-nums text-gold">
              {String(index + 1).padStart(2, "0")}
              <span className="text-silver/50"> / </span>
              {String(count).padStart(2, "0")}
            </p>
          </div>

          {/* Progress */}
          {!reduceMotion ? (
            <div className="mb-4 h-px overflow-hidden bg-white/10">
              <motion.div
                key={`prog-${active.id}-${paused}`}
                className="h-full origin-left bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 0 : 1 }}
                transition={{
                  duration: paused ? 0 : AUTO_MS / 1000,
                  ease: "linear",
                }}
              />
            </div>
          ) : null}

          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 scrollbar-none"
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
                  aria-selected={selected}
                  onClick={() => jump(i)}
                  className={`group relative flex h-[4.25rem] w-[5.5rem] shrink-0 flex-col justify-end overflow-hidden border text-left transition-all duration-400 sm:h-[4.75rem] sm:w-28 ${
                    selected
                      ? "border-gold"
                      : "border-white/12 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={vehicle.image.src}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                  <span className="relative z-[1] px-2 pb-1.5">
                    <span
                      className={`block text-[0.58rem] uppercase tracking-[0.14em] ${
                        selected ? "text-gold-bright" : "text-ivory/80"
                      }`}
                    >
                      {vehicle.name}
                    </span>
                    <span className="block truncate text-[0.6rem] text-silver">
                      {vehicle.make}
                    </span>
                  </span>
                  {selected ? (
                    <motion.span
                      layoutId="hero-dial-glow"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
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
