"use client";

import { MediaSlider } from "@/components/ui/MediaSlider";
import { servicesLifestyleSlides } from "@/data/slides";

export function ServicesGallery() {
  return (
    <div className="container-shell pb-10 pt-2 sm:pb-14">
      <MediaSlider
        slides={servicesLifestyleSlides}
        aspectClassName="aspect-[4/5] min-[360px]:aspect-[16/10] lg:aspect-[21/9]"
        autoPlayMs={6500}
      />
    </div>
  );
}
