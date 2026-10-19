"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/data/values";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function WhyChoose() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="why-shindara" className="section-pad bg-obsidian">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Why Shindara"
          title="Easy to understand. Careful to deliver."
          description="We keep promises clear, language simple, and every service within applicable laws."
        />

        <motion.ul
          className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          {values.map((value, index) => (
            <motion.li key={value.title} variants={fadeUp} className="min-w-0">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
              </div>
              <h3 className="display-title text-xl text-ivory sm:text-2xl">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-silver">
                {value.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
