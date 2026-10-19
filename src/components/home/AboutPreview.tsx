"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { namedAlt, vehicles } from "@/data/vehicles";
import { fadeUp, viewportOnce } from "@/lib/motion";

const feature = vehicles[0];

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
            src={feature.image.src}
            alt={namedAlt(feature)}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian to-transparent p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">
              {feature.name}
            </p>
            <p className="text-sm text-ivory">
              {feature.make} {feature.model}
            </p>
          </div>
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
            We buy and sell cars, help with instalments, train people, place
            drivers, and support delivery and fleets — with clear, simple
            communication.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
            <Button href="/about">About the company</Button>
            <Button href="/vehicles" variant="secondary">
              Browse the fleet
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
