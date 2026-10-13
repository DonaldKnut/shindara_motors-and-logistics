"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { hasLiveInventory, vehicles } from "@/data/vehicles";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function VehicleShowcase({ limit }: { limit?: number }) {
  const reduceMotion = useReducedMotion();
  const items = typeof limit === "number" ? vehicles.slice(0, limit) : vehicles;

  return (
    <section id="vehicles" className="section-pad bg-charcoal">
      <div className="container-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Vehicle Showcase"
            title="Selected vehicles, ready for enquiry."
            description={
              hasLiveInventory
                ? "Browse current availability and enquire about the vehicle that fits your requirements."
                : "Sample showcase for development. These vehicles, prices, and availability are illustrative only — not live inventory."
            }
          />
          <Button href="/vehicles" variant="secondary" className="self-start lg:self-auto">
            View All
          </Button>
        </div>

        {!hasLiveInventory ? (
          <p
            className="mt-6 border border-gold/30 bg-obsidian/50 px-4 py-3 text-sm text-gold-bright"
            role="status"
          >
            Sample content — replace entries in <code className="text-ivory">src/data/vehicles.ts</code>{" "}
            with verified listings before publishing as live inventory.
          </p>
        ) : null}

        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          {items.map((vehicle) => (
            <motion.article
              key={vehicle.id}
              variants={fadeUp}
              className="group flex flex-col border border-white/8 bg-obsidian/70"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={vehicle.image.src}
                  alt={vehicle.image.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {vehicle.isSample ? (
                  <span className="absolute left-3 top-3 bg-obsidian/85 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-gold-bright">
                    Sample
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="display-title text-xl text-ivory">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="mt-1 text-sm text-silver">
                    {vehicle.year} · {vehicle.mileage}
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.12em] text-silver/90">
                  <div>
                    <dt className="text-ivory/50">Transmission</dt>
                    <dd className="mt-1 normal-case tracking-normal text-silver">
                      {vehicle.transmission}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ivory/50">Fuel</dt>
                    <dd className="mt-1 normal-case tracking-normal text-silver">
                      {vehicle.fuel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ivory/50">Price</dt>
                    <dd className="mt-1 normal-case tracking-normal text-silver">
                      {vehicle.priceLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ivory/50">Status</dt>
                    <dd className="mt-1 normal-case tracking-normal text-silver">
                      {vehicle.status}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/enquire?type=Automobile%20Sales&vehicle=${encodeURIComponent(
                    `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
                  )}`}
                  className="mt-auto inline-flex min-h-11 items-center justify-center border border-gold/50 px-4 text-[0.68rem] uppercase tracking-[0.16em] text-gold-bright transition-colors hover:border-gold-bright hover:text-ivory"
                >
                  Enquire About This Vehicle
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
