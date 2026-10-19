"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Calculator, 
  Plane, 
  Ship, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  MessageSquare
} from "lucide-react";
import { company } from "@/data/company";

type ServiceType = "sourcing" | "freight" | "armoured" | "fleet";

interface RouteOption {
  id: string;
  label: string;
  origin: string;
  destination: string;
  oceanDays: string;
  airDays: string;
  customsNote: string;
}

const routes: RouteOption[] = [
  {
    id: "za-ng",
    label: "South Africa to Nigeria",
    origin: "Johannesburg / Durban Port",
    destination: "Lagos (Tin Can / Apapa / Murtala Muhammed)",
    oceanDays: "18 – 24 Days",
    airDays: "4 – 6 Days",
    customsNote: "Automated Nigerian Customs single-window pre-clearance with zero hidden demurrage.",
  },
  {
    id: "uk-ng",
    label: "United Kingdom & Europe to Nigeria",
    origin: "London Heathrow / Tilbury Port",
    destination: "Lagos, Nigeria",
    oceanDays: "14 – 20 Days",
    airDays: "3 – 5 Days",
    customsNote: "Export certificate validation & fast-track duty assessment.",
  },
  {
    id: "uae-ng",
    label: "United Arab Emirates to Nigeria",
    origin: "Dubai / Jebel Ali Port",
    destination: "Lagos, Nigeria",
    oceanDays: "21 – 28 Days",
    airDays: "4 – 7 Days",
    customsNote: "Gulf specification compliance verification & expedited inspection.",
  },
  {
    id: "domestic-ng",
    label: "Nigeria Interstate Escort",
    origin: "Lagos Hub",
    destination: "Abuja, Port Harcourt, Kano & Nationwide",
    oceanDays: "N/A (Interstate)",
    airDays: "24 – 48 Hours",
    customsNote: "Fully tracked GPS carrier with optional armed executive escort.",
  },
];

export function ConciergeEstimator() {
  const reduceMotion = useReducedMotion();
  const [service, setService] = useState<ServiceType>("sourcing");
  const [selectedRoute, setSelectedRoute] = useState<string>("za-ng");
  const [transitMethod, setTransitMethod] = useState<"ocean" | "air">("ocean");

  const currentRoute = routes.find((r) => r.id === selectedRoute) || routes[0];
  const transitTime = transitMethod === "air" ? currentRoute.airDays : currentRoute.oceanDays;

  // Build custom WhatsApp prefilled enquiry
  const waMessage = encodeURIComponent(
    `Hello Shindara, I am requesting a quote for:\n- Service: ${service.toUpperCase()}\n- Route: ${currentRoute.label}\n- Transit Mode: ${transitMethod === "air" ? "Air Cargo Express" : "Ocean Freight"}\nPlease advise on next steps.`
  );
  const waUrl = `https://wa.me/${company.whatsapp.e164}?text=${waMessage}`;

  return (
    <section id="estimator" className="section-pad bg-charcoal relative overflow-hidden">
      {/* Decorative ambient gold lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[26rem] bg-glow-gold opacity-40 blur-3xl pointer-events-none" />

      <div className="container-shell relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-obsidian/60 text-gold text-[0.7rem] uppercase tracking-[0.2em] mb-4">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive Logistics Concierge</span>
          </div>
          <h2 className="display-title text-[clamp(1.9rem,4.5vw,3.4rem)] text-ivory">
            Calculate your <span className="text-gold-gradient">procurement & freight timeline</span>.
          </h2>
          <p className="mt-4 text-silver text-sm sm:text-base leading-relaxed">
            Select your corridor and requirement to view transit specs, customs protocol, and receive priority concierge quotation.
          </p>
        </div>

        {/* Interactive Estimator Panel */}
        <div className="glass-card-gold rounded-xl p-6 sm:p-10 max-w-5xl mx-auto shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Select Service */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-silver mb-3">
                  1. Select Engagement Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "sourcing", label: "Vehicle Sourcing & Acquisition" },
                    { id: "freight", label: "Cross-Border Freight" },
                    { id: "armoured", label: "Diplomatic / Armoured Transport" },
                    { id: "fleet", label: "Commercial Fleet Logistics" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id as ServiceType)}
                      className={`text-left p-3.5 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                        service === s.id
                          ? "border-gold bg-gold/15 text-gold-bright shadow-[0_0_15px_rgba(207,168,81,0.2)]"
                          : "border-white/10 bg-obsidian/60 text-silver hover:border-white/20 hover:text-ivory"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Route Corridor */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-silver mb-3">
                  2. Select Transit Corridor
                </label>
                <div className="space-y-2">
                  {routes.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRoute(r.id)}
                      className={`w-full text-left p-3.5 rounded-lg border flex items-center justify-between transition-all ${
                        selectedRoute === r.id
                          ? "border-gold bg-gold/15 text-gold-bright shadow-[0_0_15px_rgba(207,168,81,0.2)]"
                          : "border-white/10 bg-obsidian/60 text-silver hover:border-white/20 hover:text-ivory"
                      }`}
                    >
                      <div>
                        <span className="block text-sm font-medium text-ivory">{r.label}</span>
                        <span className="text-[0.75rem] text-silver/80">From {r.origin} to {r.destination}</span>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded border ${
                        selectedRoute === r.id ? "border-gold text-gold-bright" : "border-white/10 text-silver/60"
                      }`}>
                        Active Lane
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Transit Mode */}
              {selectedRoute !== "domestic-ng" ? (
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-silver mb-3">
                    3. Transit Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTransitMethod("ocean")}
                      className={`p-3.5 rounded-lg border flex items-center gap-3 transition-all ${
                        transitMethod === "ocean"
                          ? "border-gold bg-gold/15 text-gold-bright shadow-[0_0_15px_rgba(207,168,81,0.2)]"
                          : "border-white/10 bg-obsidian/60 text-silver hover:border-white/20"
                      }`}
                    >
                      <Ship className="h-5 w-5 text-gold shrink-0" />
                      <div className="text-left">
                        <span className="block text-xs sm:text-sm font-medium text-ivory">Ocean Freight (RoRo/Cont.)</span>
                        <span className="text-[0.7rem] text-silver">Secure containerized or RoRo</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTransitMethod("air")}
                      className={`p-3.5 rounded-lg border flex items-center gap-3 transition-all ${
                        transitMethod === "air"
                          ? "border-gold bg-gold/15 text-gold-bright shadow-[0_0_15px_rgba(207,168,81,0.2)]"
                          : "border-white/10 bg-obsidian/60 text-silver hover:border-white/20"
                      }`}
                    >
                      <Plane className="h-5 w-5 text-gold shrink-0" />
                      <div className="text-left">
                        <span className="block text-xs sm:text-sm font-medium text-ivory">Air Cargo Express</span>
                        <span className="text-[0.7rem] text-silver">High-priority expedited airlift</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : null}

            </div>

            {/* Right Result Card (5 cols) */}
            <div className="lg:col-span-5 bg-obsidian/90 border border-gold/30 rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-gold font-semibold">
                    Calculated Summary
                  </span>
                  <span className="text-[0.65rem] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono">
                    LIVE DISPATCH
                  </span>
                </div>

                <div className="my-6">
                  <span className="text-[0.75rem] uppercase tracking-[0.16em] text-silver block">
                    Estimated Transit Window
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <Clock className="h-5 w-5 text-gold" />
                    <span className="display-title text-3xl sm:text-4xl text-gold-bright font-bold">
                      {transitTime}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-silver">
                    Port-to-port or airport-to-door with clearance included.
                  </p>
                </div>

                {/* Protocol Perks */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2.5 text-xs text-silver">
                    <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span><strong>Full Marine Transit Insurance</strong> up to declared value.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-silver">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>{currentRoute.customsNote}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-silver">
                    <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>Dedicated 1-on-1 Logistics Concierge with daily tracking reports.</span>
                  </div>
                </div>
              </div>

              {/* Call to actions */}
              <div className="mt-8 pt-5 border-t border-white/10 space-y-3">
                <Link
                  href={`/enquire?type=Logistics%20Solutions&route=${encodeURIComponent(currentRoute.label)}&mode=${transitMethod}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-obsidian font-semibold text-xs uppercase tracking-[0.14em] py-3.5 px-4 rounded transition-all shadow-[0_0_20px_rgba(207,168,81,0.35)]"
                >
                  <span>Request Official VIP Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 border border-white/15 hover:border-gold/50 bg-charcoal/80 text-ivory text-xs uppercase tracking-[0.14em] py-3 px-4 rounded transition-all hover:text-gold-bright"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-gold" />
                  <span>Instant WhatsApp Confirmation</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
