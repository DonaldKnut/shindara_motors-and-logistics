import type { Metadata } from "next";
import { NamedFleetStrip } from "@/components/fleet/NamedFleetStrip";
import { Button } from "@/components/ui/Button";
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
            <Button href="/enquire" showArrow>
              Send an enquiry
            </Button>
            <Button href="/process" variant="secondary">
              How it works
            </Button>
          </div>
        </div>
      </section>

      <ServicesGallery />
      <NamedFleetStrip title="Fleet behind our services" />
      <Services />
    </div>
  );
}
