"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormModal } from "@/components/forms/FormModalContext";
import { fleetHeroFrames, vehicles } from "@/data/vehicles";

type NamedFleetStripProps = {
  title?: string;
  className?: string;
};

/** Horizontal strip of every named Cloudinary unit — tap to enquire in a modal */
export function NamedFleetStrip({
  title = "Named fleet on the lot",
  className = "",
}: NamedFleetStripProps) {
  const { openEnquire } = useFormModal();

  return (
    <section className={`border-t border-[var(--color-border)] bg-charcoal ${className}`}>
      <div className="container-shell py-8 sm:py-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">{title}</p>
            <p className="mt-2 max-w-xl text-sm text-silver">
              Every photo is from our Cloudinary inventory — tap a car to enquire
              right here, no new page.
            </p>
          </div>
          <Link
            href="/vehicles"
            className="text-[0.65rem] uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-bright"
          >
            Full fleet →
          </Link>
        </div>

        <ul className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 scrollbar-none">
          {fleetHeroFrames.map((car) => {
            const vehicle = vehicles.find((v) => v.id === car.id);
            return (
              <li key={car.id} className="w-[9.5rem] shrink-0 sm:w-40">
                <button
                  type="button"
                  onClick={() => vehicle && openEnquire({ vehicle })}
                  className="group block w-full overflow-hidden border border-white/10 text-left transition-colors hover:border-gold/45"
                  aria-label={`Enquire about ${car.name}`}
                >
                  <div className="relative aspect-[4/5] bg-obsidian">
                    <Image
                      src={car.src}
                      alt={car.alt}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-2.5">
                      <p className="text-[0.62rem] uppercase tracking-[0.16em] text-gold">
                        {car.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-ivory">
                        {car.make} {car.model}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
