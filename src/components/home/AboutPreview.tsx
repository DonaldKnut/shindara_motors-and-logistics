"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function AboutPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="section-pad bg-charcoal">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <motion.div
          className="relative min-h-[18rem] overflow-hidden sm:min-h-[22rem] lg:col-span-6 lg:min-h-[28rem]"
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <Image
            src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=1600&q=80"
            alt="Architectural corridor suggesting precision and modern infrastructure"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="lg:col-span-6"
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <p className="eyebrow">About Shindara</p>
          <h2 className="display-title mt-4 text-[clamp(1.9rem,4.5vw,3.2rem)] text-ivory">
            Built around trust. Driven by purpose.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-silver sm:text-base">
            Shindara Motors & Logistics Limited exists to help clients move with
            confidence — whether that means sourcing the right vehicle,
            coordinating logistics, or structuring dependable transport
            solutions.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-silver sm:text-base">
            Our approach is deliberate: listen carefully, communicate clearly,
            and deliver with professionalism. We serve private clients and
            organisations seeking a partner that treats every engagement with
            integrity and operational care.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
            <Button href="/about">About the Company</Button>
            <Button href="/contact" variant="secondary">
              Speak With Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
