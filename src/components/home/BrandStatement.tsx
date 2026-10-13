"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { company } from "@/data/company";
import { easeOut, viewportOnce } from "@/lib/motion";

export function BrandStatement() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-[clamp(5rem,12vw,8.5rem)]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2200&q=80"
          alt="Luxury vehicle on an open road at dusk"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-obsidian/82" />
      </div>

      <div className="relative container-shell text-center">
        <motion.p
          className="eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Our Promise
        </motion.p>
        <motion.h2
          className="display-title mx-auto mt-5 max-w-5xl text-[clamp(2rem,7vw,4.6rem)] text-ivory"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, delay: 0.08, ease: easeOut }}
        >
          {company.tagline}
        </motion.h2>
        <motion.div
          className="mx-auto mt-8 h-px w-24 bg-gold"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
        />
      </div>
    </section>
  );
}
