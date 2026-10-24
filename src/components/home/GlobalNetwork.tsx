"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Phone, 
  ArrowUpRight, 
  ShieldCheck,
  Compass
} from "lucide-react";
import { FormLink } from "@/components/forms/FormLink";
import { company } from "@/data/company";

interface Hub {
  id: string;
  city: string;
  country: string;
  role: string;
  status: "Primary HQ" | "Regional Hub" | "Strategic Corridor";
  address: string;
  phone: string;
  transitCapabilities: string[];
  features: string;
}

const hubs: Hub[] = [
  {
    id: "lagos",
    city: "Lagos",
    country: "Nigeria",
    role: "West Africa Headquarters & Logistics Terminal",
    status: "Primary HQ",
    address: company.address.full,
    phone: company.phones.nigeria.display,
    transitCapabilities: [
      "Customs Fast-Track Assessment (Tin Can & Apapa)",
      "Secure Bonded Warehousing & PDI Facility",
      "Nationwide Armoured & GPS Escort Delivery",
    ],
    features: "Central operations hub managing national fleet distribution, import customs clearance, and executive client deliveries.",
  },
  {
    id: "joburg",
    city: "Johannesburg & Durban",
    country: "South Africa",
    role: "Southern Africa Procurement & Marine Shipping Gateway",
    status: "Regional Hub",
    address: "Sandton City & Durban Port Marine Terminal, South Africa",
    phone: company.phones.southAfrica.display,
    transitCapabilities: [
      "Southern Africa Vehicle Sourcing & Inspection",
      "Direct RoRo & Containerized Sea Freight to Lagos",
      "Cross-Border SADC Transit Operations",
    ],
    features: "Direct sourcing corridors for right-hand and export-ready luxury vehicles, heavy machinery, and maritime logistics.",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    role: "Middle East Vehicle Procurement & Air Freight Link",
    status: "Strategic Corridor",
    address: "Jebel Ali Free Zone & Dubai Airport Cargo Gateway",
    phone: company.phones.southAfrica.display,
    transitCapabilities: [
      "Gulf-Spec Armoured & Luxury SUV Sourcing",
      "Priority 4-Day Air Cargo Dispatch to West Africa",
      "OEM Genuine Spare Parts Airfreight Express",
    ],
    features: "Rapid procurement of Middle East export models, customized VIP conversions, and emergency mechanical spare logistics.",
  },
  {
    id: "london",
    city: "London & Antwerp",
    country: "Europe Corridor",
    role: "European Prestige Automotive Sourcing Network",
    status: "Strategic Corridor",
    address: "London Heathrow Aviation & Port of Antwerp, Belgium",
    phone: company.phones.nigeria.display,
    transitCapabilities: [
      "Certified European Supercar & Saloon Inspections",
      "Direct Ocean Liner Transit (14 Days)",
      "Full EU Export VAT & Clearance Handling",
    ],
    features: "Direct partnerships with certified European luxury marques (Rolls-Royce, Bentley, Mercedes-Maybach, Porsche) for pristine acquisition.",
  },
];

export function GlobalNetwork() {
  const reduceMotion = useReducedMotion();
  const [activeHub, setActiveHub] = useState<string>("lagos");
  const current = hubs.find((h) => h.id === activeHub) || hubs[0];

  return (
    <section className="section-pad bg-obsidian relative overflow-hidden border-t border-white/5">
      <div className="container-shell">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.24em] mb-2 font-semibold">
              <Compass className="h-4 w-4" />
              <span>Where we work</span>
            </div>
            <h2 className="display-title text-[clamp(2rem,4vw,3.2rem)] text-ivory">
              Lagos base.{" "}
              <span className="text-gold-gradient">Wider reach when you need it.</span>
            </h2>
          </div>
          <p className="text-silver max-w-md text-sm leading-relaxed">
            We operate from Lagos with a South Africa line, and can support import,
            export, and delivery across connected markets — subject to applicable laws.
          </p>
        </div>

        {/* Hub Selector Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveHub(hub.id)}
              className={`p-4 rounded-lg border text-left transition-all ${
                activeHub === hub.id
                  ? "border-gold bg-charcoal text-ivory shadow-[0_0_20px_rgba(207,168,81,0.2)]"
                  : "border-white/10 bg-charcoal/40 text-silver hover:border-white/20 hover:text-ivory"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-bright">
                  {hub.country}
                </span>
                <span className={`h-2 w-2 rounded-full ${activeHub === hub.id ? "bg-gold" : "bg-white/20"}`} />
              </div>
              <h3 className="display-title text-lg font-bold">{hub.city}</h3>
              <p className="text-[0.7rem] text-silver/80 mt-1 truncate">{hub.role}</p>
            </button>
          ))}
        </div>

        {/* Active Hub Detail Showcase */}
        <motion.div
          key={current.id}
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card-gold rounded-xl p-6 sm:p-10 border border-gold/30"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded bg-gold/20 border border-gold/40 text-gold-bright text-xs font-medium uppercase tracking-wider">
                  {current.status}
                </span>
                <span className="text-xs text-silver flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                  {current.address}
                </span>
              </div>

              <h3 className="display-title text-2xl sm:text-3xl text-ivory">
                {current.city} Gateway — <span className="text-gold-gradient">{current.role}</span>
              </h3>

              <p className="text-silver text-sm leading-relaxed">
                {current.features}
              </p>

              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs uppercase tracking-[0.16em] text-gold font-semibold">
                  Core Operational Capabilities:
                </h4>
                {current.transitCapabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-silver-light">
                    <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Contact & Action Box (5 cols) */}
            <div className="lg:col-span-5 bg-obsidian/80 border border-white/10 rounded-xl p-6 space-y-5">
              <h4 className="text-xs uppercase tracking-[0.18em] text-gold font-semibold">
                Direct Terminal Contact
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-ivory">
                  <Phone className="h-4 w-4 text-gold shrink-0" />
                  <span>{current.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-silver">
                  <Building2 className="h-4 w-4 text-gold shrink-0" />
                  <span>Licensed Freight Forwarding & Automotive Import Registry</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <FormLink
                  href={`/enquire?type=${encodeURIComponent("Delivery & Fleet Support")}&hub=${current.city}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-obsidian transition-all hover:bg-gold-bright"
                >
                  <span>Route Inquiry via {current.city}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </FormLink>

                <a
                  href={company.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/50 text-ivory text-xs uppercase tracking-[0.14em] py-2.5 px-4 rounded transition-all"
                >
                  <span>Direct WhatsApp Line</span>
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
