"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  DriverArt,
  FleetArt,
  InstalmentArt,
  TradeArt,
  TrainingArt,
} from "@/components/home/illustrations/AdvertArt";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import type { ReactNode } from "react";

type Advert = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  art: ReactNode;
  tone: "deep" | "soft";
};

const adverts: Advert[] = [
  {
    id: "instalments",
    eyebrow: "Pay your way",
    title: "Own a car on instalments.",
    body: "Choose a vehicle, agree a clear payment plan, and drive with a structure that fits your budget.",
    cta: "Ask about instalments",
    href: "/enquire?type=Sourcing%20%26%20Instalment%20Plans",
    art: <InstalmentArt className="h-auto w-full max-w-[16rem] text-gold" />,
    tone: "deep",
  },
  {
    id: "training",
    eyebrow: "Learn the craft",
    title: "Automotive training, made practical.",
    body: "Clear lessons for individuals and teams who want real skills — not jargon.",
    cta: "Enquire about training",
    href: "/enquire?type=Automotive%20Training",
    art: <TrainingArt className="h-auto w-full max-w-[16rem] text-gold" />,
    tone: "soft",
  },
  {
    id: "drivers",
    eyebrow: "People who drive well",
    title: "Professional drivers, placed with care.",
    body: "We recruit and place drivers for homes and businesses — screened, reliable, and ready.",
    cta: "Request a driver",
    href: "/enquire?type=Driver%20Placement",
    art: <DriverArt className="h-auto w-full max-w-[16rem] text-gold" />,
    tone: "deep",
  },
  {
    id: "trade",
    eyebrow: "Across borders",
    title: "Import and export, handled cleanly.",
    body: "Move vehicles in or out with clear steps and lawful processes — we keep you informed.",
    cta: "Talk import / export",
    href: "/enquire?type=Import%20%2F%20Export",
    art: <TradeArt className="h-auto w-full max-w-[16rem] text-gold" />,
    tone: "soft",
  },
  {
    id: "fleet",
    eyebrow: "Keep moving",
    title: "Delivery and fleet support.",
    body: "From handing over a single car to keeping a small fleet organised — simple coordination, steady follow-through.",
    cta: "Get fleet support",
    href: "/enquire?type=Delivery%20%26%20Fleet%20Support",
    art: <FleetArt className="h-auto w-full max-w-[16rem] text-gold" />,
    tone: "deep",
  },
];

export function HomeAdverts() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Featured offers" className="relative">
      {/* Intro ribbon */}
      <div className="border-y border-[var(--color-border)] bg-obsidian">
        <div className="container-shell flex flex-col gap-3 py-8 sm:flex-row sm:items-end sm:justify-between sm:py-10">
          <div>
            <p className="eyebrow">What we can help with</p>
            <h2 className="display-title mt-2 text-[clamp(1.75rem,4vw,2.75rem)] text-ivory">
              Clean offers. Clear next steps.
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-bright"
          >
            All services
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={viewportOnce}
      >
        {adverts.map((ad, index) => {
          const reverse = index % 2 === 1;
          return (
            <motion.article
              key={ad.id}
              variants={fadeUp}
              className={`relative overflow-hidden border-b border-[var(--color-border)] ${
                ad.tone === "deep" ? "bg-obsidian-deep" : "bg-charcoal"
              }`}
            >
              {/* Soft ambient mark */}
              <div
                className={`pointer-events-none absolute h-64 w-64 rounded-full bg-glow-gold opacity-40 ${
                  reverse ? "-left-16 top-1/2 -translate-y-1/2" : "-right-16 top-1/2 -translate-y-1/2"
                }`}
              />

              <div className="container-shell relative grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
                <div
                  className={`flex justify-center lg:col-span-5 ${
                    reverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <motion.div
                    className="relative flex aspect-square w-full max-w-[18rem] items-center justify-center border border-gold/20 bg-obsidian/40"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: easeOut }}
                  >
                    <div className="pointer-events-none absolute inset-3 border border-dashed border-gold/15" />
                    {ad.art}
                  </motion.div>
                </div>

                <div
                  className={`max-w-xl lg:col-span-7 ${
                    reverse ? "lg:order-1 lg:justify-self-end lg:text-right" : "lg:order-2"
                  }`}
                >
                  <p className="eyebrow">{ad.eyebrow}</p>
                  <h3 className="display-title mt-3 text-[clamp(1.6rem,3.5vw,2.4rem)] text-ivory">
                    {ad.title}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-relaxed text-silver sm:text-base ${
                      reverse ? "lg:ml-auto" : ""
                    } max-w-md`}
                  >
                    {ad.body}
                  </p>
                  <div className={`mt-7 ${reverse ? "lg:flex lg:justify-end" : ""}`}>
                    <Link
                      href={ad.href}
                      className="group inline-flex items-center gap-2 border border-gold/50 bg-transparent px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-bright transition-colors hover:border-gold hover:bg-gold/10"
                    >
                      {ad.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
