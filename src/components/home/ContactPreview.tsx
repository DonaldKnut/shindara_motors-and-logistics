"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { OpenFormButton } from "@/components/forms/OpenFormButton";
import { company } from "@/data/company";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function ContactPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="section-pad bg-obsidian">
      <div className="container-shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <motion.div
          className="lg:col-span-5"
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <p className="eyebrow">Contact</p>
          <h2 className="display-title mt-4 text-[clamp(1.9rem,4.5vw,3.1rem)] text-ivory">
            Start a conversation.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-silver sm:text-base">
            Looking to buy or sell a car, set up instalments, train, hire a
            driver, or manage a fleet? Open a form — we will respond clearly.
          </p>

          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-gold">Nigeria</dt>
              <dd className="mt-2">
                <a
                  href={company.phones.nigeria.href}
                  className="safe-break text-ivory hover:text-gold-bright"
                >
                  {company.phones.nigeria.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-gold">
                South Africa
              </dt>
              <dd className="mt-2">
                <a
                  href={company.phones.southAfrica.href}
                  className="safe-break text-ivory hover:text-gold-bright"
                >
                  {company.phones.southAfrica.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-gold">Email</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${company.email}`}
                  className="safe-break text-ivory hover:text-gold-bright"
                >
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-gold">Address</dt>
              <dd className="mt-2 safe-break leading-relaxed text-silver">
                {company.address.full}
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          className="relative overflow-hidden border border-gold/25 bg-charcoal/50 p-6 sm:p-8 lg:col-span-7"
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 bg-glow-gold opacity-40" />
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-gold">
            Forms · In-page modal
          </p>
          <h3 className="display-title mt-3 text-[clamp(1.5rem,3vw,2.1rem)] text-ivory">
            Write to us without leaving the page.
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-silver">
            Enquiry for cars and services, or a shorter contact note — both open
            in a smooth modal and email hello@shindaraautos.com.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <OpenFormButton showArrow>
              Open enquiry form
            </OpenFormButton>
            <OpenFormButton kind="contact" variant="secondary" icon={MessageSquare}>
              Open contact form
            </OpenFormButton>
          </div>

          <p className="mt-6 flex items-start gap-2 text-xs text-silver">
            <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
            Prefer email?{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-ivory underline-offset-2 hover:text-gold-bright hover:underline"
            >
              {company.email}
            </a>
          </p>

          <p className="mt-4 inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
            Esc to close · tap outside to dismiss
            <ArrowRight className="h-3 w-3" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
