import type { Metadata } from "next";
import { FleetSlider } from "@/components/home/FleetSlider";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Browse new and used vehicles for sale from Shindara — including luxury and premium cars — and send an enquiry.",
  alternates: { canonical: "/vehicles" },
};

export default function VehiclesPage() {
  return (
    <div className="bg-obsidian pt-[4.5rem]">
      <FleetSlider />
      <VehicleShowcase />
    </div>
  );
}
