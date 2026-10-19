"use client";

import { MediaSlider } from "@/components/ui/MediaSlider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fleetGallerySlides } from "@/data/slides";

export function FleetSlider() {
  return (
    <section className="section-pad bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 bg-subtle-grid opacity-40 pointer-events-none" />
      <div className="container-shell relative z-10">
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Fleet Gallery"
            title="A cinematic look at the portfolio."
            description="Animated slides from our live Cloudinary inventory — Lexus, Prado, BMW, Mercedes, Highlander, RAV4, and Camry."
          />
          <Button href="/vehicles" variant="secondary" showArrow className="self-start">
            Browse Vehicles
          </Button>
        </div>
        <MediaSlider
          slides={fleetGallerySlides}
          aspectClassName="aspect-[4/5] min-[360px]:aspect-[16/11] min-[768px]:aspect-[21/9]"
          autoPlayMs={6000}
        />
      </div>
    </section>
  );
}
