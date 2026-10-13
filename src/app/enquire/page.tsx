import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Major Enquiry",
  description:
    "Submit a detailed business enquiry to Shindara Motors & Logistics Limited for automotive sales, sourcing, support, logistics, or transport solutions.",
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Business Enquiries</p>
            <h1 className="display-title mt-4 text-[clamp(2.1rem,5.2vw,3.6rem)] text-ivory">
              Tell us what you need.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-silver">
              Use this form for structured enquiries. Include as much detail as
              you can — requirements, timeline, and preferred contact method —
              so we can respond with precision.
            </p>
            <dl className="mt-8 space-y-4 text-sm text-silver">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-gold">
                  Direct email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${company.email}`}
                    className="text-ivory hover:text-gold-bright"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-gold">
                  WhatsApp
                </dt>
                <dd className="mt-1">
                  <a
                    href={company.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory hover:text-gold-bright"
                  >
                    {company.whatsapp.display}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-white/8 bg-charcoal/50 p-5 sm:p-8 lg:col-span-8">
            <h2 className="display-title text-2xl text-ivory">Major enquiry form</h2>
            <p className="mt-2 mb-8 text-sm text-silver">
              Required fields must be completed. A reference number is issued on
              successful submission when mail delivery is configured.
            </p>
            <Suspense fallback={<p className="text-sm text-silver">Loading form…</p>}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
