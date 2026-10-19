"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/Icons";
import { services } from "@/data/services";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function ServicesTeaser() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="section-pad bg-charcoal">
      <div className="container-shell">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="What we do."
            description="Sales, instalments, training, drivers, and fleet support — see each service for details."
          />
          <Button href="/services" variant="secondary" showArrow className="self-start shrink-0">
            All services
          </Button>
        </div>

        <motion.ul
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          {services.map((service) => (
            <motion.li key={service.id} variants={fadeUp}>
              <Link
                href={`/services/${service.id}`}
                className="group flex h-full items-start gap-3 border border-[var(--color-border)] bg-obsidian/40 p-4 transition-colors hover:border-gold/45 sm:p-5"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-gold/35 text-gold">
                  <ServiceIcon id={service.id} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="display-title flex items-center justify-between gap-2 text-lg text-ivory group-hover:text-gold-bright">
                    {service.title}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-silver line-clamp-2">
                    {service.summary}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
