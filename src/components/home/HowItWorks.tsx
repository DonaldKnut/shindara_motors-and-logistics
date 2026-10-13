"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/values";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="section-pad bg-obsidian">
      <div className="container-shell">
        <SectionHeading
          eyebrow="How It Works"
          title="A clear path from enquiry to delivery."
          description="A straightforward process designed to keep communication clear and progress confident at every stage."
        />

        <motion.ol
          className="relative mt-12 grid gap-8 lg:grid-cols-4 lg:gap-6"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block"
            aria-hidden="true"
          />
          {processSteps.map((step) => (
            <motion.li key={step.number} variants={fadeUp} className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center border border-gold/45 bg-charcoal text-sm tracking-[0.16em] text-gold">
                {step.number}
              </div>
              <h3 className="display-title text-xl text-ivory">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
