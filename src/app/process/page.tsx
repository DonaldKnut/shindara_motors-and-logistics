import type { Metadata } from "next";
import { NamedFleetStrip } from "@/components/fleet/NamedFleetStrip";
import { PageFormActions } from "@/components/forms/PageFormActions";
import { ConciergeEstimator } from "@/components/home/ConciergeEstimator";
import { HowItWorks } from "@/components/home/HowItWorks";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How Shindara helps you buy, sell, train, hire drivers, or manage vehicles — step by step, in plain language.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad pb-0">
        <div className="container-shell">
          <p className="eyebrow">How it works</p>
          <h1 className="display-title mt-4 max-w-4xl text-[clamp(2.1rem,5.5vw,4rem)] text-ivory">
            Four simple steps from first message to finish.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver">
            Tell us what you need. We show clear options. You agree the details.
            We handle the next steps — sales, training, drivers, or delivery.
          </p>
          <PageFormActions />
        </div>
      </section>

      <HowItWorks />
      <NamedFleetStrip title="Cars we can help you with" />
      <ConciergeEstimator />
    </div>
  );
}
