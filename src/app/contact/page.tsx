import type { Metadata } from "next";
import { Suspense } from "react";
import { OpenFormButton } from "@/components/forms/OpenFormButton";
import { OpenFormOnMount } from "@/components/forms/OpenFormOnMount";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shindara about vehicle sales, instalments, training, drivers, or fleet support. Call, email, or write online.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <Suspense fallback={null}>
        <OpenFormOnMount kind="contact" />
      </Suspense>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">Get in Touch</p>
            <h1 className="display-title mt-4 text-[clamp(2.1rem,5.5vw,3.8rem)] text-ivory">
              Contact our team.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-silver">
              Share your requirements in a modal form — or call and email
              directly using the details below.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OpenFormButton kind="contact" showArrow>
                Open contact form
              </OpenFormButton>
              <OpenFormButton variant="secondary">
                Full enquiry instead
              </OpenFormButton>
            </div>

            <dl className="mt-10 space-y-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-gold">
                  Nigeria
                </dt>
                <dd className="mt-2">
                  <a
                    href={company.phones.nigeria.href}
                    className="safe-break text-lg text-ivory hover:text-gold-bright"
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
                    className="safe-break text-lg text-ivory hover:text-gold-bright"
                  >
                    {company.phones.southAfrica.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-gold">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${company.email}`}
                    className="safe-break text-lg text-ivory hover:text-gold-bright"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-gold">
                  Address
                </dt>
                <dd className="mt-2 safe-break leading-relaxed text-silver">
                  {company.address.full}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative overflow-hidden border border-gold/25 bg-charcoal/50 p-6 sm:p-8 lg:col-span-6">
            <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 bg-glow-gold opacity-40" />
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-gold">
              In-page modal
            </p>
            <h2 className="display-title mt-3 text-2xl text-ivory">
              No full-page form needed.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-silver">
              The contact form opens over this page with a spring transition.
              Close anytime with Escape or by tapping outside.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
