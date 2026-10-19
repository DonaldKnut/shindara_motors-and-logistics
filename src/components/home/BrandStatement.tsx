"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Car, Truck, Users } from "lucide-react";
import { company } from "@/data/company";
import { namedAlt, vehicles } from "@/data/vehicles";
import { easeOut, viewportOnce } from "@/lib/motion";

const backdrop = vehicles[1];

const pillars = [
  {
    icon: Car,
    title: "Buy, sell, import & export",
    description:
      "New and used motor vehicles, including luxury and premium cars, handled with clear steps.",
  },
  {
    icon: BookOpen,
    title: "Training that makes sense",
    description:
      "Automotive education and practical training for people who want useful, real-world skills.",
  },
  {
    icon: Users,
    title: "Professional drivers",
    description:
      "We recruit and place drivers for private homes and businesses who need reliable help.",
  },
  {
    icon: Truck,
    title: "Delivery & fleet support",
    description:
      "Vehicle delivery coordination and fleet management so your cars stay organised and on track.",
  },
];

export function BrandStatement() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-[clamp(5rem,10vw,8rem)] bg-obsidian-deep">
      <div className="absolute inset-0">
        <Image
          src={backdrop.image.src}
          alt={namedAlt(backdrop)}
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/92 to-obsidian" />
      </div>

      <div className="relative container-shell">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.p
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            What we do
          </motion.p>

          <motion.h2
            className="display-title mt-4 text-[clamp(2rem,5.5vw,3.6rem)] leading-tight text-ivory"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, delay: 0.1, ease: easeOut }}
          >
            <span className="text-gold-gradient block">{company.tagline}</span>
            Simple help for real vehicle needs.
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver-light sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          >
            {company.about}
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.55, delay: index * 0.08, ease: easeOut }}
                className="border border-white/10 bg-obsidian/50 p-5 transition-colors hover:border-gold/40"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-gold/30 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="display-title text-lg text-ivory">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
