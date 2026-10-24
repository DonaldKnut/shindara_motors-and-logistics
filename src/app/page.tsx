import { NamedFleetStrip } from "@/components/fleet/NamedFleetStrip";
import { CinemaShowcase } from "@/components/home/CinemaShowcase";
import { ContactPreview } from "@/components/home/ContactPreview";
import { Hero } from "@/components/home/Hero";
import { HomeAdverts } from "@/components/home/HomeAdverts";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CinemaShowcase />
      <ServicesTeaser />
      <HomeAdverts />
      <VehicleShowcase limit={3} />
      <NamedFleetStrip title="All named units" />
      <ContactPreview />
    </>
  );
}
