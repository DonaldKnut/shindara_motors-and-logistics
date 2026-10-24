import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageFormActions } from "@/components/forms/PageFormActions";
import { ServiceIcon } from "@/components/ui/Icons";
import { services } from "@/data/services";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.id}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  if (!service) notFound();

  const enquiryTypeMap: Record<string, string> = {
    "automobile-sales": "Vehicle Sales (New & Used)",
    "vehicle-sourcing": "Sourcing & Instalment Plans",
    "automotive-support": "Automotive Training",
    "business-transport": "Driver Placement",
    "logistics-solutions": "Delivery & Fleet Support",
  };

  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold-bright hover:text-ivory"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All services
            </Link>
            <div className="mt-6 inline-flex h-12 w-12 items-center justify-center border border-gold/40 text-gold">
              <ServiceIcon id={service.id} className="h-5 w-5" />
            </div>
            <h1 className="display-title mt-5 text-[clamp(2rem,5vw,3.6rem)] text-ivory">
              {service.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-silver">
              {service.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-silver/90">
              {service.summary} Share your requirements and our team will respond
              with clear options and next steps.
            </p>
            <PageFormActions
              enquireLabel="Enquire about this"
              enquireType={enquiryTypeMap[service.id] ?? "General Enquiry"}
            />
          </div>

          <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[24rem] lg:col-span-6 lg:min-h-[30rem]">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
