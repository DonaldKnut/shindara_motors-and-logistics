import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { OpenFormButton } from "@/components/forms/OpenFormButton";
import { OpenFormOnMount } from "@/components/forms/OpenFormOnMount";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Enquire about vehicle sales, import or export, instalment plans, automotive training, driver placement, or fleet support with Shindara.",
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <div className="relative overflow-hidden bg-obsidian pt-[5.5rem]">
      <Suspense fallback={null}>
        <OpenFormOnMount kind="enquire" />
      </Suspense>

      <div className="pointer-events-none absolute right-10 top-20 h-96 w-96 bg-glow-gold opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-40 left-0 h-80 w-80 bg-glow-gold opacity-20 blur-3xl" />

      <section className="section-pad relative z-10">
        <div className="container-shell max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 border border-gold/40 bg-charcoal/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Form opens as a modal</span>
          </div>
          <h1 className="display-title text-[clamp(2.3rem,5.5vw,4rem)] text-ivory">
            Tell us what you need.{" "}
            <span className="text-gold-gradient">We reply clearly.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-silver sm:text-lg">
            Buy or sell a car, import or export, pay in instalments, book
            training, hire a driver, or ask about delivery and fleet support.
            Your message goes to hello@shindaraautos.com.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <OpenFormButton showArrow>Open enquiry form</OpenFormButton>
            <a
              href={company.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-emerald-500/40 bg-emerald-950/40 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-emerald-300 transition-colors hover:bg-emerald-900/50"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <p className="mt-6 text-xs text-silver">
            Closed the modal by accident? Use the button above to open it again.
          </p>
        </div>
      </section>
    </div>
  );
}
