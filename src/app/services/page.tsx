import type { Metadata } from "next";
import Link from "next/link";
import { NamedFleetStrip } from "@/components/fleet/NamedFleetStrip";
import { OpenFormButton } from "@/components/forms/OpenFormButton";
import { Services } from "@/components/home/Services";
import { ServicesGallery } from "@/components/services/ServicesGallery";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vehicle sales, import and export, instalment plans, automotive training, driver placement, delivery coordination, and fleet management from Shindara.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad pb-8">
        <div className="container-shell">
          <p className="eyebrow">Services</p>
          <h1 className="display-title mt-4 max-w-4xl text-[clamp(2.1rem,5.5vw,4rem)] text-ivory">
            Everything we offer, explained simply.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver">
            From buying and selling cars to training, drivers, and fleet
            support — choose a service below or send an enquiry.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OpenFormButton showArrow>Send an enquiry</OpenFormButton>
            <Link
              href="/process"
              className="inline-flex min-h-12 items-center justify-center border border-gold/60 bg-transparent px-6 text-sm font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:border-gold-bright hover:bg-gold/5 hover:text-gold-bright"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <ServicesGallery />
      <NamedFleetStrip title="Fleet behind our services" />
      <Services />
    </div>
  );
}
