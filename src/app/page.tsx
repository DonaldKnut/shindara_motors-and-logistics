import { AboutPreview } from "@/components/home/AboutPreview";
import { BrandStatement } from "@/components/home/BrandStatement";
import { ContactPreview } from "@/components/home/ContactPreview";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Services } from "@/components/home/Services";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";
import { WhyChoose } from "@/components/home/WhyChoose";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <VehicleShowcase limit={4} />
      <WhyChoose />
      <BrandStatement />
      <HowItWorks />
      <AboutPreview />
      <ContactPreview />
    </>
  );
}
