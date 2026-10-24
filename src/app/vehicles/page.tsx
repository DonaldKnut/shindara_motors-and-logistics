import type { Metadata } from "next";
import { NamedFleetStrip } from "@/components/fleet/NamedFleetStrip";
import { FleetSlider } from "@/components/home/FleetSlider";
import { PagePromos } from "@/components/home/PagePromos";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Browse named fleet units from Shindara — Noir, Monarch, Argent, Solstice, Atlas, Ember, Scarlet — and send an enquiry.",
  alternates: { canonical: "/vehicles" },
};

export default function VehiclesPage() {
  return (
    <div className="bg-obsidian pt-[4.5rem]">
      <FleetSlider />
      <NamedFleetStrip title="Jump to a named unit" />
      <PagePromos variant="vehicles" />
      <VehicleShowcase />
    </div>
  );
}
