"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  X,
  Images,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MediaSlider } from "@/components/ui/MediaSlider";
import {
  vehicles,
  vehicleLabel,
  type Vehicle,
  type VehicleCategory,
} from "@/data/vehicles";
import { company } from "@/data/company";
import { fadeUp, staggerContainer, viewportOnce, easeOut } from "@/lib/motion";

export function VehicleShowcase({ limit }: { limit?: number }) {
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] =
    useState<VehicleCategory>("All");
  const [galleryVehicle, setGalleryVehicle] = useState<Vehicle | null>(null);

  const categories: VehicleCategory[] = [
    "All",
    "Prestige SUVs",
    "Executive Saloons",
    "Crossovers",
  ];

  const filteredVehicles = vehicles.filter((v) => {
    if (selectedCategory === "All") return true;
    return v.category === selectedCategory;
  });

  const displayItems =
    typeof limit === "number" && selectedCategory === "All"
      ? filteredVehicles.slice(0, limit)
      : filteredVehicles;

  useEffect(() => {
    if (!galleryVehicle) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGalleryVehicle(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [galleryVehicle]);

  return (
    <section id="vehicles" className="section-pad bg-charcoal relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-glow-gold opacity-30 pointer-events-none" />

      <div className="container-shell relative z-10">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Live Inventory"
            title="Cars available to enquire about."
            description="Real photos from our inventory. Open a gallery, then enquire — messages go to hello@ and oluwasina@shindaraautos.com."
          />
          <Button href="/vehicles" variant="secondary" className="self-start shrink-0 lg:self-auto">
            View Complete Fleet
          </Button>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <span className="mr-2 text-xs uppercase tracking-[0.2em] text-silver/60">
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all ${
                selectedCategory === cat
                  ? "bg-gold text-obsidian shadow-[0_0_15px_rgba(207,168,81,0.4)]"
                  : "border border-white/10 bg-obsidian/60 text-silver hover:border-gold/40 hover:text-ivory"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
          key={selectedCategory}
        >
          {displayItems.map((vehicle, index) => {
            const label = vehicleLabel(vehicle);
            const waMsg = encodeURIComponent(
              `Hello Shindara, I am interested in the ${label} (${vehicle.location}). Please share documentation and pricing.`,
            );
            const waLink = `https://wa.me/${company.whatsapp.e164}?text=${waMsg}`;

            return (
              <motion.article
                key={vehicle.id}
                variants={fadeUp}
                layout={!reduceMotion}
                className="group flex flex-col overflow-hidden rounded-xl border border-white/10 glass-card transition-all duration-500 hover:border-gold/50 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(207,168,81,0.15)]"
              >
                <button
                  type="button"
                  onClick={() => setGalleryVehicle(vehicle)}
                  className="relative aspect-[16/10] overflow-hidden bg-obsidian text-left"
                  aria-label={`Open gallery for ${label}`}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={reduceMotion ? false : { scale: 1.08, opacity: 0.7 }}
                    whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.04, ease: easeOut }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src={vehicle.image.src}
                      alt={vehicle.image.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30" />

                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span
                      className={`rounded px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${
                        vehicle.status === "Available"
                          ? "border border-gold/40 bg-obsidian/90 text-gold-bright backdrop-blur-md"
                          : "bg-amber-600/90 text-white backdrop-blur-md"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                    <span className="rounded bg-obsidian/80 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-silver backdrop-blur-md">
                      {vehicle.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-sm border border-white/10 bg-obsidian/85 px-2.5 py-1 text-[0.7rem] text-ivory/90 backdrop-blur-md">
                    <MapPin className="h-3 w-3 text-gold" />
                    <span>{vehicle.location}</span>
                  </div>

                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-sm border border-gold/35 bg-obsidian/85 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-gold-bright opacity-0 transition-opacity group-hover:opacity-100">
                    <Images className="h-3 w-3" />
                    {vehicle.gallery.length} photos
                  </span>
                </button>

                <div className="flex flex-1 flex-col space-y-4 p-6">
                  <div>
                    <div className="flex items-center justify-between text-xs text-silver">
                      <span>{vehicle.year} Specification</span>
                      <span className="font-mono font-medium text-gold-bright">
                        {vehicle.priceLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                      {vehicle.name}
                    </p>
                    <h3 className="display-title mt-0.5 text-xl text-ivory transition-colors group-hover:text-gold-bright">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="mt-0.5 text-xs text-silver/80">{vehicle.color}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 border-y border-white/10 py-3 text-xs">
                    <div>
                      <span className="mb-0.5 block text-[0.68rem] uppercase tracking-wider text-silver/60">
                        Engine
                      </span>
                      <span className="block truncate font-medium text-silver-light">
                        {vehicle.engine}
                      </span>
                    </div>
                    <div>
                      <span className="mb-0.5 block text-[0.68rem] uppercase tracking-wider text-silver/60">
                        Odometer
                      </span>
                      <span className="block font-medium text-silver-light">
                        {vehicle.mileage}
                      </span>
                    </div>
                    <div>
                      <span className="mb-0.5 block text-[0.68rem] uppercase tracking-wider text-silver/60">
                        Transmission
                      </span>
                      <span className="block truncate text-silver-light">
                        {vehicle.transmission}
                      </span>
                    </div>
                    <div>
                      <span className="mb-0.5 block text-[0.68rem] uppercase tracking-wider text-silver/60">
                        Fuel
                      </span>
                      <span className="block text-silver-light">{vehicle.fuel}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {vehicle.features.slice(0, 3).map((feat) => (
                      <span
                        key={feat}
                        className="rounded border border-white/5 bg-obsidian/80 px-2 py-0.5 text-[0.68rem] text-silver"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setGalleryVehicle(vehicle)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded border border-white/15 bg-obsidian/50 py-2 text-xs uppercase tracking-[0.14em] text-silver transition-colors hover:border-gold/40 hover:text-ivory"
                    >
                      <Images className="h-3.5 w-3.5 text-gold" />
                      Open photo gallery
                    </button>
                    <Link
                      href={`/enquire?type=${encodeURIComponent("Vehicle Sales (New & Used)")}&vehicle=${encodeURIComponent(label)}&vehicleId=${vehicle.id}`}
                      className="group/btn inline-flex w-full items-center justify-center gap-2 rounded border border-gold/40 bg-charcoal-light px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-bright transition-all hover:bg-gold hover:text-obsidian"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded border border-emerald-600/30 bg-emerald-950/40 px-3 py-2 text-xs tracking-wider text-emerald-300 transition-all hover:bg-emerald-900/60"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                      WhatsApp us
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 py-4 text-center text-xs text-silver/70">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-gold" />
            Pre-purchase inspection & title verification
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-gold" />
            Enquiries route to hello@ & oluwasina@shindaraautos.com
          </span>
        </div>
      </div>

      <AnimatePresence>
        {galleryVehicle ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/80 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryVehicle(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${vehicleLabel(galleryVehicle)} gallery`}
              className="relative w-full max-w-4xl overflow-hidden border border-gold/25 bg-charcoal shadow-2xl"
              initial={reduceMotion ? false : { y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { y: 24, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOut }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                    {galleryVehicle.category}
                  </p>
                  <h3 className="display-title text-lg text-ivory sm:text-xl">
                    <span className="text-gold">{galleryVehicle.name}</span>
                    <span className="mx-2 text-silver/40">·</span>
                    {galleryVehicle.make} {galleryVehicle.model}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close gallery"
                  onClick={() => setGalleryVehicle(null)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-ivory transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <MediaSlider
                slides={galleryVehicle.gallery.map((frame) => ({
                  src: frame.src,
                  alt: frame.alt,
                  caption: galleryVehicle.model,
                  tag: galleryVehicle.make,
                }))}
                aspectClassName="aspect-[4/5] min-[480px]:aspect-[16/10]"
                autoPlayMs={4500}
                rounded={false}
              />

              <div className="flex flex-col gap-2 border-t border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-xs text-silver">
                  {galleryVehicle.gallery.length} photos · {galleryVehicle.color} ·{" "}
                  {galleryVehicle.status}
                </p>
                <Link
                  href={`/enquire?type=${encodeURIComponent("Vehicle Sales (New & Used)")}&vehicle=${encodeURIComponent(vehicleLabel(galleryVehicle))}&vehicleId=${galleryVehicle.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-obsidian transition-opacity hover:opacity-90"
                  onClick={() => setGalleryVehicle(null)}
                >
                  Enquire about this vehicle
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
