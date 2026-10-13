import type { Metadata } from "next";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Explore the Shindara vehicle showcase and enquire about automotive options suited to your requirements.",
  alternates: { canonical: "/vehicles" },
};

export default function VehiclesPage() {
  return (
    <div className="bg-obsidian pt-[4.5rem]">
      <VehicleShowcase />
    </div>
  );
}
