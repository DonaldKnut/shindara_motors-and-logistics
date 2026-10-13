"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="section-pad bg-obsidian">
      <div className="container-shell">
        <SectionHeading
          eyebrow="What We Offer"
          title="Services shaped for clarity and delivery."
          description="Automotive and logistics support designed around precise requirements, careful coordination, and a premium client experience."
        />

        <motion.div
          className="mt-12 space-y-8 lg:mt-16 lg:space-y-10"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          {services.map((service, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.article
                key={service.id}
                variants={fadeUp}
                className={`grid overflow-hidden border border-white/8 bg-charcoal/60 lg:grid-cols-12 ${
                  reverse ? "" : ""
                }`}
              >
                <div
                  className={`relative min-h-[14rem] overflow-hidden sm:min-h-[18rem] lg:col-span-5 lg:min-h-[22rem] ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 hover:scale-[1.04]"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center gap-4 p-6 sm:p-8 lg:col-span-7 lg:p-12 ${
                    reverse ? "lg:order-1" : ""
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display-title text-[clamp(1.45rem,3vw,2.1rem)] text-ivory">
                    {service.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-silver sm:text-base">
                    {service.summary}
                  </p>
                  <p className="max-w-xl text-sm leading-relaxed text-silver/80">
                    {service.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <Link
                      href={service.href}
                      className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold-bright transition-colors hover:text-ivory"
                    >
                      View service
                      <span aria-hidden="true">→</span>
                    </Link>
                    <Link
                      href={service.enquireHref}
                      className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.18em] text-silver transition-colors hover:text-gold-bright"
                    >
                      Enquire
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
