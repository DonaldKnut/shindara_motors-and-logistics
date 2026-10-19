import { NamedFleetStrip } from "@/components/fleet/NamedFleetStrip";
import { ContactPreview } from "@/components/home/ContactPreview";
import { Hero } from "@/components/home/Hero";
import { HomeAdverts } from "@/components/home/HomeAdverts";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesTeaser />
      <HomeAdverts />
      <VehicleShowcase limit={3} />
      <NamedFleetStrip title="All named units" />
      <ContactPreview />
    </>
  );
}
