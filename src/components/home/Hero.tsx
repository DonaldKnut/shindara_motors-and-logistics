"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Sparkles,
  FileCheck2,
  Clock,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { heroSlides } from "@/data/slides";
import { easeOut } from "@/lib/motion";

const highlights = [
  {
    icon: ShieldCheck,
    title: "100% Escrow & Verification",
    desc: "Every chassis verified, certified & insured",
  },
  {
    icon: Globe2,
    title: "Bi-Continental Corridors",
    desc: "Direct routes: Nigeria, South Africa & UAE",
  },
  {
    icon: Clock,
    title: "Expedited Air & Ocean Freight",
    desc: "Priority port customs clearing protocols",
  },
  {
    icon: FileCheck2,
    title: "Transparent Duty Structure",
    desc: "Zero hidden charges or unexpected delays",
  },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col justify-between overflow-hidden transition-colors duration-300 ${
        isLight ? "bg-white text-[#121417]" : "bg-[#090a0b] text-[#f6f3ec]"
      }`}
    >
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => (
          <motion.div
            key={`${slide.alt}-${idx}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: idx === activeSlide ? 1 : 0,
              scale: idx === activeSlide ? 1 : 1.05,
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 8, ease: "easeOut" },
            }}
          >
            {slide.placeholder || !slide.src ? (
              <div
                className={`flex h-full w-full flex-col items-center justify-center gap-3 ${
                  isLight ? "bg-[#f0f1f4]" : "bg-obsidian-deep"
                }`}
              >
                <ImageIcon className="h-8 w-8 text-gold" aria-hidden="true" />
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  Hero image slot
                </p>
              </div>
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover object-center ${
                  isLight ? "opacity-90" : "opacity-100"
                }`}
              />
            )}
          </motion.div>
        ))}

        {isLight ? (
          <>
            {/* Soft white washes — images stay visible, type stays dark */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/35 to-white/55" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.35)_60%,rgba(255,255,255,0.75)_100%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#090a0b] via-[#090a0b]/85 to-[#090a0b]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0b] via-[#090a0b]/40 to-[#090a0b]/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,10,11,0.55)_55%,#090a0b_100%)]" />
          </>
        )}
      </div>

      <div
        className={`relative z-10 container-shell flex flex-1 flex-col justify-center pb-10 pt-28 min-[360px]:pb-12 min-[360px]:pt-32 sm:pb-16 sm:pt-40 ${
          isLight ? "text-[#121417]" : "text-[#f6f3ec]"
        }`}
      >
        <motion.div
          className={`mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border px-3.5 py-1.5 backdrop-blur-md ${
            isLight
              ? "border-gold/40 bg-white/85 shadow-[0_8px_24px_-12px_rgba(18,20,23,0.25)]"
              : "border-gold/40 bg-charcoal/80 shadow-[0_0_15px_-3px_rgba(207,168,81,0.2)]"
          }`}
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-bright" />
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
            Lagos · Johannesburg · London · Dubai Corridors
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.p
            className="eyebrow mb-3 flex items-center gap-2"
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>World-Class Automotive & Logistics Group</span>
          </motion.p>

          <motion.h1
            className={`display-title text-balance text-[clamp(1.85rem,7.2vw,5.2rem)] font-extrabold tracking-tight ${
              isLight ? "text-[#121417]" : "text-[#f6f3ec]"
            }`}
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          >
            Moving more than vehicles.{" "}
            <span className="text-gold-gradient block sm:inline">
              Delivering uncompromised value.
            </span>
          </motion.h1>

          <motion.p
            className={`mt-5 max-w-2xl text-[clamp(0.92rem,2.4vw,1.25rem)] font-normal leading-relaxed min-[360px]:mt-6 ${
              isLight ? "text-[#3d4248]" : "text-[#d4d7db]"
            }`}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
          >
            From bespoke global vehicle sourcing and prestige acquisitions to specialized
            cross-border freight and rapid customs clearance — engineered with absolute
            precision, discretion, and reliability.
          </motion.p>
        </div>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3 min-[400px]:gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
        >
          <Button href="/vehicles" showArrow size="md">
            Explore Curated Showcase
          </Button>
          <Button href="/enquire" variant="secondary" size="md">
            VIP Logistics & Sourcing Enquiry
          </Button>
          <Link
            href="#estimator"
            className={`group ml-0 inline-flex items-center gap-2 px-2 py-3 text-xs uppercase tracking-[0.16em] transition-colors min-[400px]:ml-2 ${
              isLight
                ? "text-[#5a5f66] hover:text-gold"
                : "text-silver hover:text-gold-bright"
            }`}
          >
            <span>Transit & Sourcing Estimator</span>
            <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.caption ?? slide.alt}
              type="button"
              onClick={() => setActiveSlide(idx)}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === activeSlide
                  ? "w-10 bg-gold"
                  : isLight
                    ? "w-3 bg-[#121417]/20 hover:bg-[#121417]/40"
                    : "w-3 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Switch to slide: ${slide.caption ?? slide.alt}`}
            />
          ))}
          <span
            className={`ml-2 text-[0.65rem] uppercase tracking-[0.2em] ${
              isLight ? "text-[#5a5f66]" : "text-silver/70"
            }`}
          >
            {heroSlides[activeSlide]?.caption}
          </span>
        </div>
      </div>

      <div
        className={`relative z-10 border-t backdrop-blur-xl ${
          isLight
            ? "border-[var(--color-border)] bg-white/92"
            : "border-white/10 bg-charcoal/90"
        }`}
      >
        <div className="container-shell py-5 sm:py-6">
          <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 md:grid-cols-4 lg:gap-8">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border border-gold/30 text-gold ${
                      isLight ? "bg-[#f4f5f7]" : "bg-obsidian/60"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-ivory">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[0.75rem] leading-normal text-silver">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
