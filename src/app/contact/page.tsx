import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
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
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Get in Touch</p>
            <h1 className="display-title mt-4 text-[clamp(2.1rem,5.5vw,3.8rem)] text-ivory">
              Contact our team.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-silver">
              Share your requirements and we will respond with clear next steps.
              Prefer to speak directly? Use the numbers below.
            </p>

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
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-gold">
                  Website
                </dt>
                <dd className="mt-2">
                  <a
                    href={company.url}
                    className="text-ivory hover:text-gold-bright"
                    rel="noopener noreferrer"
                  >
                    {company.domain}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-white/8 bg-charcoal/50 p-5 sm:p-8 lg:col-span-7">
            <h2 className="display-title text-2xl text-ivory">Send an enquiry</h2>
            <p className="mt-2 mb-8 text-sm text-silver">
              All fields are required. We review every submission carefully.
            </p>
            <Suspense fallback={<p className="text-sm text-silver">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
