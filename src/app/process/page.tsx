import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { processSteps } from "@/data/values";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "A clear four-step process for Shindara Motors & Logistics engagements — from initial brief through confident delivery.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad">
        <div className="container-shell">
          <p className="eyebrow">How It Works</p>
          <h1 className="display-title mt-4 max-w-4xl text-[clamp(2.1rem,5.5vw,4rem)] text-ivory">
            A clear path from enquiry to delivery.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver">
            Every engagement is structured for transparency: understand the need,
            explore options, confirm details, and move forward with confidence.
          </p>

          <ol className="relative mt-14 grid gap-8 lg:grid-cols-2">
            {processSteps.map((step) => (
              <li
                key={step.number}
                className="border border-white/8 bg-charcoal/50 p-6 sm:p-8"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center border border-gold/45 text-sm tracking-[0.16em] text-gold">
                  {step.number}
                </div>
                <h2 className="display-title text-2xl text-ivory">{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-silver sm:text-base">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col gap-3 min-[420px]:flex-row">
            <Button href="/enquire" showArrow>
              Start an Enquiry
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
