"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Package, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { easeOut } from "@/lib/motion";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-obsidian">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: easeOut }}
        >
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80"
            alt="Premium automotive exterior under cinematic lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-obsidian/60" />
      </div>

      <div className="relative container-shell flex min-h-[100svh] flex-col justify-end pb-[clamp(3.5rem,10vh,6.5rem)] pt-[7.5rem]">
        <motion.p
          className="display-title mb-3 text-[clamp(1.05rem,3.2vw,1.55rem)] tracking-[0.28em] text-gold"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: easeOut }}
        >
          SHINDARA
        </motion.p>

        <motion.h1
          className="display-title max-w-[13ch] text-[clamp(2.35rem,8.4vw,5.6rem)] text-ivory"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.26, ease: easeOut }}
        >
          Moving more than vehicles.
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-[clamp(0.98rem,2.4vw,1.2rem)] leading-relaxed text-silver"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: easeOut }}
        >
          Premium automotive solutions and dependable logistics, delivered with
          precision, integrity, and purpose.
        </motion.p>

        <motion.div
          className="mt-8 flex max-w-xl flex-col gap-3 min-[400px]:flex-row"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease: easeOut }}
        >
          <Button href="/services" icon={Package} showArrow>
            Explore Our Services
          </Button>
          <Button href="/contact" variant="secondary" icon={Phone}>
            Contact Our Team
          </Button>
        </motion.div>

        <motion.p
          className="mt-8 text-[0.68rem] uppercase tracking-[0.22em] text-silver/75"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {company.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-silver/80"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          aria-hidden="true"
        >
          <span className="h-8 w-px bg-gold/70" />
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
