import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Globe2, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Clock, 
  Plane, 
  Ship, 
  CheckCircle2, 
  Lock, 
  Award,
  ArrowRight
} from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Enquire about vehicle sales, import or export, instalment plans, automotive training, driver placement, or fleet support with Shindara.",
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <div className="bg-obsidian pt-[5.5rem] relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-glow-gold opacity-25 pointer-events-none blur-3xl" />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-glow-gold opacity-20 pointer-events-none blur-3xl" />

      {/* Hero Header */}
      <section className="pt-12 pb-8 border-b border-white/5 relative z-10">
        <div className="container-shell">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-charcoal/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>We are ready to help</span>
              </div>
              <h1 className="display-title text-[clamp(2.3rem,5.5vw,4.2rem)] text-ivory">
                Tell us what you need.{" "}
                <span className="text-gold-gradient">We will reply clearly.</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-silver sm:text-lg">
                Buy or sell a car, import or export, pay in instalments, book
                training, hire a driver, or ask about delivery and fleet support.
                Your message goes to hello@ and oluwasina@shindaraautos.com.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-xl border border-gold/30 bg-charcoal/90 p-4 shadow-lg sm:p-5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold-bright">
                  Enquiries open
                </span>
                <span className="text-xs text-silver">Lagos · South Africa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form and Advert Layout */}
      <section className="section-pad relative z-10">
        <div className="container-shell grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Form Container (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card-gold rounded-2xl p-6 sm:p-10 shadow-2xl border border-gold/30">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div>
                  <h2 className="display-title text-2xl text-ivory">Engagement Details</h2>
                  <p className="text-xs text-silver mt-1">
                    Complete the structured brief below. A reference number will be issued.
                  </p>
                </div>
                <span className="text-[0.65rem] uppercase tracking-wider text-gold px-2.5 py-1 rounded bg-gold/10 border border-gold/30">
                  CONFIDENTIAL ESCROW
                </span>
              </div>

              <Suspense fallback={<p className="text-sm text-silver">Loading VIP enquiry form…</p>}>
                <EnquiryForm />
              </Suspense>
            </div>
          </div>

          {/* Right Column: Advert Showcase & Concierge Components (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Advert Component 1: Featured Global Corridors */}
            <div className="rounded-2xl border border-gold/40 bg-gradient-to-b from-charcoal-light to-obsidian p-6 sm:p-7 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-glow-gold opacity-25 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-bright px-2.5 py-1 rounded bg-gold/20 border border-gold/40">
                  ★ FEATURED ADVERT
                </span>
                <span className="text-xs text-silver font-mono">LANE ASSURANCE</span>
              </div>

              <h3 className="display-title text-xl text-ivory font-bold">
                Direct UK, UAE & South Africa Vehicle Sourcing
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-silver leading-relaxed">
                Bypass middle-tier brokers. We acquire directly from certified European dealerships, Dubai export terminals, and South African auctions with complete chassis verification and bonded shipping.
              </p>

              {/* Transit Timeline Badges */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 bg-obsidian/70 p-2.5 rounded border border-white/5">
                  <Plane className="h-4 w-4 text-gold shrink-0" />
                  <div>
                    <span className="text-[0.65rem] text-silver block uppercase">Air Cargo</span>
                    <span className="font-semibold text-ivory">4 – 6 Days</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-obsidian/70 p-2.5 rounded border border-white/5">
                  <Ship className="h-4 w-4 text-gold shrink-0" />
                  <div>
                    <span className="text-[0.65rem] text-silver block uppercase">Ocean RoRo</span>
                    <span className="font-semibold text-ivory">14 – 24 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advert Component 2: Diplomatic & Armoured Escort Service */}
            <div className="rounded-2xl border border-white/10 bg-charcoal/80 p-6 sm:p-7 hover:border-gold/40 transition-all duration-300 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-obsidian border border-gold/40 flex items-center justify-center text-gold shrink-0 shadow-[0_0_15px_rgba(207,168,81,0.2)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="display-title text-lg text-ivory">
                    Diplomatic & Armoured Mobility
                  </h4>
                  <p className="mt-1 text-xs text-silver leading-relaxed">
                    Certified B4/B6 ballistics protection sourcing, dedicated security escorts, and confidential inter-state transfers throughout Nigeria.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.68rem] text-silver">
                <span className="px-2.5 py-1 rounded bg-obsidian border border-white/5">
                  GPS Live Monitored
                </span>
                <span className="px-2.5 py-1 rounded bg-obsidian border border-white/5">
                  Armed Escort Available
                </span>
                <span className="px-2.5 py-1 rounded bg-obsidian border border-white/5">
                  Secure Convoy Transit
                </span>
              </div>
            </div>

            {/* Advert Component 3: Live VIP Direct Concierge Hotline Card */}
            <div className="rounded-2xl border border-gold/30 bg-obsidian p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.18em] text-gold font-semibold">
                  Immediate VIP Assistance
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <p className="text-xs text-silver leading-relaxed mb-5">
                Need urgent shipment clearance or priority vehicle acquisition advice? Connect instantly with an executive logistics officer.
              </p>

              <div className="space-y-3">
                <a
                  href={company.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 py-3 px-4 rounded text-xs uppercase tracking-[0.14em] font-semibold transition-all"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span>Connect on WhatsApp VIP Desk</span>
                </a>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={company.phones.nigeria.href}
                    className="p-3 rounded border border-white/10 bg-charcoal hover:border-gold/50 text-center transition-colors"
                  >
                    <span className="text-[0.65rem] text-silver block uppercase">Lagos HQ</span>
                    <span className="text-gold-bright font-mono text-[0.72rem] font-medium">{company.phones.nigeria.display}</span>
                  </a>
                  <a
                    href={company.phones.southAfrica.href}
                    className="p-3 rounded border border-white/10 bg-charcoal hover:border-gold/50 text-center transition-colors"
                  >
                    <span className="text-[0.65rem] text-silver block uppercase">South Africa Hub</span>
                    <span className="text-gold-bright font-mono text-[0.72rem] font-medium">{company.phones.southAfrica.display}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Advert Component 4: 4 Guarantees Checklist */}
            <div className="rounded-2xl border border-white/10 bg-charcoal/60 p-6 space-y-3 text-xs text-silver">
              <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-gold font-semibold mb-3">
                The Shindara Commitment
              </h4>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Zero hidden demurrage or unexpected port clearance surcharges.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Lloyd’s standard comprehensive marine transit cargo insurance.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Full vehicle title verification and tamper-free odometer guarantees.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

