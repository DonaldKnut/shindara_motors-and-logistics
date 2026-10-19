"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Award, Lock, Sparkles } from "lucide-react";
import { company } from "@/data/company";
import { easeOut, viewportOnce } from "@/lib/motion";

const pillars = [
  {
    icon: Lock,
    title: "Discretion & Title Escrow",
    description: "All client transactions, diplomatic movements, and financial settlements are executed under rigorous confidentiality and verifiable escrow frameworks.",
  },
  {
    icon: ShieldCheck,
    title: "150-Point Technical Certification",
    description: "Every procured vehicle undergoes exhaustive diagnostic, chassis geometry, structural integrity, and electronic auditing prior to dispatch.",
  },
  {
    icon: Award,
    title: "Zero-Demurrage Customs Mastery",
    description: "Direct administrative integration at Lagos & Durban ports ensures expedited documentation, compliant duty payments, and seamless release.",
  },
  {
    icon: Sparkles,
    title: "White-Glove Life-Cycle Concierge",
    description: "From scheduled servicing and spare parts procurement to future trade-in or fleet upgrades, your dedicated logistics partner remains at your side.",
  },
];

export function BrandStatement() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-[clamp(6rem,12vw,9.5rem)] bg-obsidian-deep">
      {/* Background imagery with dramatic moody vignette */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2200&q=80"
          alt="Luxury vehicle driving along open highway at dusk"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/90 to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
      </div>

      <div className="relative container-shell">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.p
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            The Shindara Standard
          </motion.p>

          <motion.h2
            className="display-title mt-4 text-[clamp(2.2rem,6vw,4.4rem)] text-ivory leading-tight"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, delay: 0.1, ease: easeOut }}
          >
            <span className="text-gold-gradient block">{company.tagline}</span>
            A commitment etched in every delivery.
          </motion.h2>

          <motion.p
            className="mt-6 text-silver-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          >
            We do not simply ship cargo or sell motor vehicles. We engineer uncompromised
            operational certainty for discerning individuals, corporations, and institutions.
          </motion.p>

          <motion.div
            className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
          />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: index * 0.12, ease: easeOut }}
                className="glass-card rounded-xl p-6 border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-obsidian border border-gold/30 flex items-center justify-center text-gold mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(207,168,81,0.15)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="display-title text-lg text-ivory mb-2 group-hover:text-gold-bright transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-silver leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[0.68rem] uppercase tracking-widest text-gold/80">
                  <span>Standard {String(index + 1).padStart(2, "0")}</span>
                  <span className="h-1 w-1 rounded-full bg-gold" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

