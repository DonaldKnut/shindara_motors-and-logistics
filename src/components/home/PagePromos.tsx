"use client";

import { PromoBanner } from "@/components/home/PromoBanner";
import { driverStill, trainingStills } from "@/data/media";
import { vehicles } from "@/data/vehicles";

const noir = vehicles[0];
const monarch = vehicles[1] ?? vehicles[0];
const solstice = vehicles[3] ?? vehicles[0];

type PagePromosProps = {
  /** Which promo set to render */
  variant?: "home" | "services" | "vehicles" | "about" | "process";
};

/**
 * Curated advertisement bands for key pages — photo-led, enquiry CTAs.
 */
export function PagePromos({ variant = "home" }: PagePromosProps) {
  if (variant === "home") {
    return (
      <>
        <PromoBanner
          eyebrow="On the lot now"
          title="Named units. Real photos. Ready to enquire."
          body="From Noir to Monarch — browse cars that are actually in our inventory, then open a form without leaving the page."
          imageSrc={noir.image.src}
          imageAlt={noir.image.alt}
          enquireType="Vehicle Sales (New & Used)"
          cta="Enquire on a car"
          secondaryHref="/vehicles"
          secondaryLabel="Browse fleet"
        />
        <PromoBanner
          eyebrow="Pay your way"
          title="Instalments that fit how you buy."
          body="Agree a clear plan on a vehicle you want — structure first, paperwork that makes sense, no jargon."
          imageSrc={monarch.image.src}
          imageAlt={monarch.image.alt}
          enquireType="Sourcing & Instalment Plans"
          cta="Ask about instalments"
          secondaryHref="/services/vehicle-sourcing"
          reverse
          tone="soft"
        />
      </>
    );
  }

  if (variant === "services") {
    return (
      <>
        <PromoBanner
          eyebrow="Hands-on training"
          title="Learn the craft on real cars."
          body="Cabin controls to open hoods — practical sessions for individuals and teams who want skills that stick."
          imageSrc={trainingStills.engine.src}
          imageAlt={trainingStills.engine.alt}
          enquireType="Automotive Training"
          cta="Enquire about training"
          secondaryHref="/services/automotive-support"
        />
        <PromoBanner
          eyebrow="Drivers"
          title="Professional drivers, placed with care."
          body="Screened, reliable placement for homes and businesses — people who drive well and show up ready."
          imageSrc={driverStill.src}
          imageAlt={driverStill.alt}
          enquireType="Driver Placement"
          cta="Request a driver"
          secondaryHref="/services/business-transport"
          reverse
          tone="soft"
        />
      </>
    );
  }

  if (variant === "vehicles") {
    return (
      <PromoBanner
        eyebrow="Import · Export"
        title="Move a vehicle across borders, cleanly."
        body="Clear steps, lawful processes, and steady updates — whether you’re bringing a unit in or sending one out."
        imageSrc={solstice.image.src}
        imageAlt={solstice.image.alt}
        enquireType="Import / Export"
        cta="Talk import / export"
        secondaryHref="/enquire"
        tone="soft"
      />
    );
  }

  if (variant === "about") {
    return (
      <PromoBanner
        eyebrow="Why Shindara"
        title="Clear service. Real inventory. Direct replies."
        body="Lagos base, South Africa line, and a team that answers hello@shindaraautos.com — cars, training, drivers, and fleet support without the noise."
        imageSrc={noir.image.src}
        imageAlt={noir.image.alt}
        enquireType="General Enquiry"
        cta="Start a conversation"
        secondaryHref="/contact"
        secondaryLabel="Contact details"
      />
    );
  }

  // process
  return (
    <PromoBanner
      eyebrow="Next step"
      title="Tell us what you need — we reply clearly."
      body="Sales, instalments, training, drivers, or delivery. Open a short form and we’ll come back with options."
      imageSrc={monarch.image.src}
      imageAlt={monarch.image.alt}
      enquireType="General Enquiry"
      cta="Send an enquiry"
      secondaryHref="/services"
      secondaryLabel="See services"
      reverse
      tone="soft"
    />
  );
}
