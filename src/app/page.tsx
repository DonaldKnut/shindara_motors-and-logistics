import { AboutPreview } from "@/components/home/AboutPreview";
import { BrandStatement } from "@/components/home/BrandStatement";
import { ConciergeEstimator } from "@/components/home/ConciergeEstimator";
import { ContactPreview } from "@/components/home/ContactPreview";
import { FleetSlider } from "@/components/home/FleetSlider";
import { GlobalNetwork } from "@/components/home/GlobalNetwork";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Services } from "@/components/home/Services";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";
import { WhyChoose } from "@/components/home/WhyChoose";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ConciergeEstimator />
      <Services />
      <FleetSlider />
      <VehicleShowcase limit={7} />
      <GlobalNetwork />
      <BrandStatement />
      <WhyChoose />
      <HowItWorks />
      <AboutPreview />
      <ContactPreview />
    </>
  );
}

