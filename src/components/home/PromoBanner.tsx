"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FormLink } from "@/components/forms/FormLink";
import { OpenFormButton } from "@/components/forms/OpenFormButton";
import { cldSized } from "@/data/media";
import { fadeUp, viewportOnce } from "@/lib/motion";

export type PromoBannerProps = {
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  /** Enquire modal type prefill */
  enquireType?: string;
  cta?: string;
  /** Optional secondary link */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Flip media to the right */
  reverse?: boolean;
  tone?: "deep" | "soft";
};

/**
 * Full-bleed photo advert band — reusable across pages.
 */
export function PromoBanner({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  enquireType,
  cta = "Enquire now",
  secondaryHref,
  secondaryLabel = "Learn more",
  reverse = false,
  tone = "deep",
}: PromoBannerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-label={title}
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={viewportOnce}
      className={`relative overflow-hidden border-y border-[var(--color-border)] ${
        tone === "deep" ? "bg-obsidian-deep" : "bg-charcoal"
      }`}
    >
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-glow-gold opacity-40" />

      <div className="container-shell relative grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
        <div
          className={`relative lg:col-span-6 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="relative aspect-[16/11] overflow-hidden border border-gold/25">
            <Image
              src={cldSized(imageSrc, 1200, "good")}
              alt={imageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
            <span
              className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-gold/50"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-gold/50"
              aria-hidden
            />
          </div>
        </div>

        <div
          className={`max-w-xl lg:col-span-6 ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-title mt-3 text-[clamp(1.65rem,3.8vw,2.6rem)] text-ivory">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-silver sm:text-base">
            {body}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <OpenFormButton
              showArrow
              options={enquireType ? { type: enquireType } : undefined}
            >
              {cta}
            </OpenFormButton>
            {secondaryHref ? (
              <FormLink
                href={secondaryHref}
                className="group inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-[0.7rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              >
                {secondaryLabel}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </FormLink>
            ) : null}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
