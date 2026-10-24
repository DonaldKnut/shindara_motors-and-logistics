"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cinemaReels } from "@/data/media";
import { easeOut } from "@/lib/motion";

/**
 * Cinematic looping video strip under the hero —
 * muted autoplay only while in view (so it never steals page scroll).
 */
export function CinemaShowcase() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { root: null, threshold: 0.15, rootMargin: "0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const syncPlayback = useCallback(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.muted = muted;
      // Only play while the section is on screen — browsers scroll to playing media
      if (inView && i === active && !paused) {
        const play = video.play();
        if (play) void play.catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [active, muted, paused, inView]);

  useEffect(() => {
    syncPlayback();
  }, [syncPlayback]);

  useEffect(() => {
    if (!inView || reduceMotion || paused || cinemaReels.length < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % cinemaReels.length);
    }, 9000);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, active, inView]);

  const reel = cinemaReels[active] ?? cinemaReels[0];

  return (
    <section
      ref={sectionRef}
      aria-label="Fleet cinema"
      className="relative overflow-hidden border-b border-[var(--color-border)] bg-obsidian-deep"
    >
      <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-25" />
      <div className="pointer-events-none absolute -right-1/4 top-0 h-[60%] w-1/2 bg-glow-gold opacity-30" />

      <div className="container-shell relative z-10 py-10 sm:py-14 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Cinema · Live from the lot</p>
            <h2 className="display-title mt-3 text-[clamp(1.85rem,4.5vw,3rem)] text-ivory">
              Watch the fleet{" "}
              <span className="text-gold-gradient">before you enquire.</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-silver sm:text-base">
              Short looping reels shot for Shindara — pick a story, mute or unmute,
              then enquire when something clicks.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="inline-flex h-10 items-center gap-2 border border-white/15 px-3 text-[0.65rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              aria-pressed={paused}
            >
              {paused ? (
                <Play className="h-3.5 w-3.5 text-gold" />
              ) : (
                <Pause className="h-3.5 w-3.5 text-gold" />
              )}
              {paused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              onClick={() => setMuted((value) => !value)}
              className="inline-flex h-10 items-center gap-2 border border-white/15 px-3 text-[0.65rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              aria-pressed={!muted}
            >
              {muted ? (
                <VolumeX className="h-3.5 w-3.5 text-gold" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-gold" />
              )}
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="relative lg:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden border border-gold/25 bg-obsidian shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:aspect-[16/9]">
              {cinemaReels.map((item, i) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === active ? "z-[1] opacity-100" : "z-0 opacity-0"
                  }`}
                  aria-hidden={i !== active}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={item.src}
                    className="h-full w-full object-cover"
                    loop
                    playsInline
                    muted={muted}
                    preload="metadata"
                    tabIndex={-1}
                    disablePictureInPicture
                    aria-label={item.title}
                  />
                </div>
              ))}

              <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-obsidian via-transparent to-obsidian/35" />
              <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-obsidian/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
                <motion.div
                  key={reel.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(cinemaReels.length).padStart(2, "0")} · {reel.tag}
                  </p>
                  <h3 className="display-title mt-2 text-[clamp(1.4rem,3.5vw,2.2rem)] text-ivory">
                    {reel.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-silver">{reel.blurb}</p>
                </motion.div>
              </div>

              {!reduceMotion && !paused && inView ? (
                <div className="absolute left-0 right-0 top-0 z-10 h-0.5 overflow-hidden bg-white/10">
                  <motion.div
                    key={`bar-${reel.id}`}
                    className="h-full origin-left bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 9, ease: "linear" }}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-4">
            {cinemaReels.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPaused(false);
                  }}
                  className={`group relative flex min-h-[5.5rem] overflow-hidden border text-left transition-all ${
                    selected
                      ? "border-gold shadow-[0_0_0_1px_rgba(214,173,89,0.35)]"
                      : "border-white/12 opacity-75 hover:opacity-100"
                  }`}
                  aria-current={selected}
                >
                  <div className="relative w-[38%] shrink-0 self-stretch bg-obsidian">
                    <video
                      src={item.src}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      muted
                      playsInline
                      loop
                      preload="none"
                      tabIndex={-1}
                      aria-hidden="true"
                      onMouseEnter={(e) => {
                        if (!reduceMotion)
                          void e.currentTarget.play().catch(() => undefined);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-3 sm:px-4">
                    <p className="text-[0.58rem] uppercase tracking-[0.18em] text-gold">
                      {item.tag}
                    </p>
                    <p className="display-title text-base text-ivory sm:text-lg">
                      {item.title}
                    </p>
                    <p className="line-clamp-2 text-[0.72rem] leading-relaxed text-silver">
                      {item.blurb}
                    </p>
                  </div>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 w-0.5 bg-gold" />
                  ) : null}
                </button>
              );
            })}

            <Link
              href="/vehicles"
              className="group mt-1 inline-flex items-center justify-between border border-gold/40 px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-gold-bright transition-colors hover:bg-gold/10"
            >
              Browse named fleet
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
