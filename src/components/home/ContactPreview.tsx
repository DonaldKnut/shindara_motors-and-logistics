"use client";

import { Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/contact/ContactForm";
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
            driver, or manage a fleet? Send a message — we will respond clearly.
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
          className="relative border border-white/8 bg-charcoal/50 p-5 sm:p-8 lg:col-span-7"
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          <Suspense fallback={<p className="text-sm text-silver">Loading form…</p>}>
            <ContactForm />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
