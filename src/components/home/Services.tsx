"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const serviceCapabilities: Record<string, string[]> = {
  "automobile-sales": [
    "New & used vehicles",
    "Luxury & premium cars",
    "Import and export",
    "Buy and sell support",
  ],
  "vehicle-sourcing": [
    "Find your preferred make",
    "Instalment payment plans",
    "Clear pricing options",
    "Guided purchase steps",
  ],
  "automotive-support": [
    "Automotive education",
    "Practical skills training",
    "Private & group sessions",
    "Clear learning outcomes",
  ],
  "business-transport": [
    "Professional drivers",
    "Private & business placement",
    "Screened candidates",
    "Ongoing coordination",
  ],
  "logistics-solutions": [
    "Vehicle delivery",
    "Fleet management",
    "Related support services",
    "Lawful, organised handling",
  ],
};

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="section-pad bg-obsidian relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-glow-gold opacity-20 pointer-events-none" />

      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Our services"
          title="Cars, training, drivers, and support."
          description="We buy and sell vehicles, help with instalment plans, train people, place professional drivers, and coordinate delivery and fleets — in plain language, within the law."
        />

        <motion.div
          className="mt-14 space-y-8 lg:mt-16 lg:space-y-12"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          {services.map((service, index) => {
            const reverse = index % 2 === 1;
            const capabilities = serviceCapabilities[service.id] || [];

            return (
              <motion.article
                key={service.id}
                variants={fadeUp}
                className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-gold/45 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(207,168,81,0.12)] grid lg:grid-cols-12"
              >
                {/* Image Section */}
                <div
                  className={`relative min-h-[16rem] sm:min-h-[22rem] lg:min-h-[26rem] lg:col-span-5 overflow-hidden bg-charcoal ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content Section */}
                <div
                  className={`flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:p-12 space-y-4 ${
                    reverse ? "lg:order-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-gold px-2.5 py-1 rounded bg-gold/10 border border-gold/30">
                      SERVICE {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                  </div>

                  <h3 className="display-title text-[clamp(1.6rem,3.2vw,2.3rem)] text-ivory group-hover:text-gold-bright transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-silver-light font-medium text-sm sm:text-base leading-relaxed">
                    {service.summary}
                  </p>

                  <p className="text-silver text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Specific capabilities list */}
                  <div className="pt-2">
                    <h4 className="text-[0.68rem] uppercase tracking-[0.18em] text-gold font-semibold mb-2.5">
                      Included In This Discipline:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {capabilities.map((cap, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-silver">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-white/5">
                    <Link
                      href={service.enquireHref}
                      className="inline-flex items-center gap-2 bg-gold hover:bg-gold-bright text-obsidian font-semibold text-xs uppercase tracking-[0.14em] py-2.5 px-4 rounded transition-all shadow-[0_0_15px_rgba(207,168,81,0.25)]"
                    >
                      <span>Initiate Enquiry</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-silver hover:text-gold-bright transition-colors py-2 px-3"
                    >
                      <span>Explore Service Details</span>
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

