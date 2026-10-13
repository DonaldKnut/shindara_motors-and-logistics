import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/Icons";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Shindara Motors & Logistics services spanning automobile sales, vehicle sourcing, automotive support, logistics, and business transport.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad">
        <div className="container-shell">
          <p className="eyebrow">What We Offer</p>
          <h1 className="display-title mt-4 max-w-4xl text-[clamp(2.1rem,5.5vw,4rem)] text-ivory">
            Services shaped for clarity and delivery.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver">
            Premium automotive solutions and dependable logistics support —
            coordinated with professionalism from first enquiry through completion.
          </p>
          <div className="mt-8">
            <Button href="/enquire" showArrow>
              Start a Major Enquiry
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 pb-[clamp(4rem,8vw,7rem)]">
        <div className="container-shell grid gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="grid overflow-hidden border border-white/8 bg-charcoal/50 lg:grid-cols-12"
            >
              <div
                className={`relative min-h-[14rem] sm:min-h-[18rem] lg:col-span-5 lg:min-h-[22rem] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div
                className={`flex flex-col justify-center gap-4 p-6 sm:p-8 lg:col-span-7 lg:p-12 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center border border-gold/40 text-gold">
                  <ServiceIcon id={service.id} />
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="display-title text-[clamp(1.5rem,3vw,2.2rem)] text-ivory">
                  {service.title}
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-silver sm:text-base">
                  {service.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex min-h-11 items-center gap-2 border border-gold/50 px-4 text-[0.68rem] uppercase tracking-[0.16em] text-gold-bright transition-colors hover:border-gold-bright hover:text-ivory"
                  >
                    View details
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Button
                    href={service.enquireHref}
                    size="sm"
                    variant="secondary"
                    showArrow
                  >
                    Enquire
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
