import type { Metadata } from "next";
import Image from "next/image";
import { BrandStatement } from "@/components/home/BrandStatement";
import { GlobalNetwork } from "@/components/home/GlobalNetwork";
import { WhyChoose } from "@/components/home/WhyChoose";
import { OpenFormButton } from "@/components/forms/OpenFormButton";
import { NamedFleetStrip } from "@/components/fleet/NamedFleetStrip";
import { PagePromos } from "@/components/home/PagePromos";
import Link from "next/link";
import { values } from "@/data/values";
import { company } from "@/data/company";
import { namedAlt, vehicles } from "@/data/vehicles";

const aboutHero = vehicles[0];

export const metadata: Metadata = {
  title: "About",
  description: company.about,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">About us</p>
            <h1 className="display-title mt-4 text-[clamp(2.1rem,5.5vw,4rem)] text-ivory">
              A motor company built on clear service.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-silver">
              {company.about}
            </p>
            <p className="mt-4 text-base leading-relaxed text-silver">
              Based in Lagos, with a South Africa line for clients who need
              cross-border help. We keep communication simple and work within
              applicable laws.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OpenFormButton kind="contact">Contact us</OpenFormButton>
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center border border-gold/60 bg-transparent px-6 text-sm font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:border-gold-bright hover:bg-gold/5 hover:text-gold-bright"
              >
                See our services
              </Link>
            </div>
          </div>

          <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[24rem] lg:col-span-6">
            <Image
              src={aboutHero.image.src}
              alt={namedAlt(aboutHero)}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian to-transparent p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                {aboutHero.name}
              </p>
              <p className="text-sm text-ivory">
                {aboutHero.make} {aboutHero.model}
              </p>
            </div>
          </div>
        </div>
      </section>

      <NamedFleetStrip title="Our named fleet" />
      <PagePromos variant="about" />
      <BrandStatement />
      <WhyChoose />
      <GlobalNetwork />

      <section className="border-t border-white/5 section-pad bg-charcoal">
        <div className="container-shell">
          <p className="eyebrow">How we work</p>
          <h2 className="display-title mt-4 max-w-3xl text-[clamp(1.8rem,4vw,3rem)] text-ivory">
            Values you can feel in every enquiry.
          </h2>
          <p className="mt-5 max-w-2xl text-silver">
            We aim to make buying, selling, training, and support feel
            straightforward — from the first message to the final handover.
          </p>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="border-t border-gold/25 pt-5">
                <h3 className="display-title text-xl text-ivory">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
