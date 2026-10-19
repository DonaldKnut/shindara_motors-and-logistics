import { ContactPreview } from "@/components/home/ContactPreview";
import { Hero } from "@/components/home/Hero";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesTeaser />
      <VehicleShowcase limit={3} />
      <ContactPreview />
    </>
  );
}
