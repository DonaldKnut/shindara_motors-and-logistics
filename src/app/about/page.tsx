import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { values } from "@/data/values";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Shindara Motors & Logistics Limited — a purpose-driven automotive and logistics partner built around trust, clarity, and professional delivery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">About the Company</p>
            <h1 className="display-title mt-4 text-[clamp(2.1rem,5.5vw,4rem)] text-ivory">
              Built around trust. Driven by purpose.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-silver">
              {company.legalName} provides premium automotive solutions and
              dependable logistics support for clients who value clarity,
              professionalism, and careful execution.
            </p>
            <p className="mt-4 text-base leading-relaxed text-silver">
              We approach every engagement with the same standard: understand the
              requirement thoroughly, communicate with transparency, and deliver
              with integrity. Our work spans vehicle-related needs and logistics
              coordination for private clients and organisations.
            </p>
            <div className="mt-8">
              <Button href="/contact">Contact Our Team</Button>
            </div>
          </div>

          <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[24rem] lg:col-span-6">
            <Image
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80"
              alt="Precision automotive environment reflecting operational care"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 section-pad bg-charcoal">
        <div className="container-shell">
          <p className="eyebrow">Mission & Values</p>
          <h2 className="display-title mt-4 max-w-3xl text-[clamp(1.8rem,4vw,3rem)] text-ivory">
            How we work with clients.
          </h2>
          <p className="mt-5 max-w-2xl text-silver">
            Our mission is to deliver automotive and logistics solutions that
            feel considered, dependable, and professionally managed from first
            enquiry through completion.
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
