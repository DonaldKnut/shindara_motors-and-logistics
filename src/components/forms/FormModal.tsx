"use client";

import { Suspense, useEffect, useId, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, MessageSquare, X } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { useFormModal } from "@/components/forms/FormModalContext";
import { vehicleLabel } from "@/data/vehicles";
import { easeOut } from "@/lib/motion";

const panelSpring = { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.85 };
const softTween = { duration: 0.38, ease: easeOut };

/**
 * Global enquire / contact modal — spring sheet on mobile, scale+blur on desktop.
 */
export function FormModal() {
  const { state, close } = useFormModal();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = state.open;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, close]);

  const kind = open ? state.kind : null;
  const vehicle = open && state.kind === "enquire" ? state.vehicle : null;
  const heading =
    kind === "contact"
      ? "Contact Shindara"
      : vehicle
        ? `Enquire · ${vehicleLabel(vehicle)}`
        : "Send an enquiry";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.28 }}
          role="presentation"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close form"
            className="absolute inset-0 bg-obsidian/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Ambient glow */}
          {!reduceMotion ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-gold opacity-40"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={softTween}
            />
          ) : null}

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden border border-gold/30 bg-charcoal shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)] sm:max-h-[88dvh]"
            initial={
              reduceMotion
                ? false
                : { y: 56, opacity: 0, scale: 0.94, filter: "blur(8px)" }
            }
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { y: 32, opacity: 0, scale: 0.97, filter: "blur(6px)" }
            }
            transition={reduceMotion ? { duration: 0.15 } : panelSpring}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold sweep accent */}
            <motion.div
              aria-hidden
              className="absolute inset-x-0 top-0 z-20 h-px origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ ...softTween, delay: 0.12 }}
            />

            {/* Header */}
            <div className="relative shrink-0">
              {vehicle ? (
                <div className="relative h-28 overflow-hidden sm:h-36">
                  <Image
                    src={vehicle.image.src}
                    alt={vehicle.image.alt}
                    fill
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-obsidian/30" />
                </div>
              ) : (
                <div className="relative h-20 overflow-hidden border-b border-white/8 bg-obsidian-deep sm:h-24">
                  <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-40" />
                  <div className="pointer-events-none absolute -right-8 top-0 h-full w-1/2 bg-glow-gold opacity-50" />
                </div>
              )}

              <button
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={close}
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center border border-white/20 bg-obsidian/75 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>

              <div
                className={`absolute inset-x-0 bottom-0 px-4 pb-3 sm:px-5 ${
                  vehicle ? "" : "flex h-full flex-col justify-end"
                }`}
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...softTween, delay: 0.08 }}
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">
                    {kind === "contact" ? "Contact" : "Enquiry"} · No new page
                  </p>
                  <h2
                    id={titleId}
                    className="display-title mt-1 text-xl text-ivory sm:text-2xl"
                  >
                    {heading}
                  </h2>
                  {vehicle ? (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-silver">
                      <MapPin className="h-3 w-3 text-gold" />
                      {vehicle.location} · {vehicle.color} · {vehicle.status}
                    </p>
                  ) : (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-silver">
                      {kind === "contact" ? (
                        <MessageSquare className="h-3 w-3 text-gold" />
                      ) : (
                        <Mail className="h-3 w-3 text-gold" />
                      )}
                      Replies go to hello@shindaraautos.com
                    </p>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Body */}
            <motion.div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5 sm:py-6"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...softTween, delay: 0.14 }}
            >
              <Suspense
                fallback={
                  <p className="text-sm text-silver">Loading form…</p>
                }
              >
                {state.open && state.kind === "enquire" ? (
                  <EnquiryForm
                    key={`enquire-${state.vehicle?.id ?? "general"}-${state.type ?? ""}`}
                    initialVehicleId={state.vehicle?.id}
                    initialVehicleLabel={
                      state.vehicle
                        ? vehicleLabel(state.vehicle)
                        : state.vehicleLabel
                    }
                    initialEnquiryType={state.type}
                    initialMessage={state.message}
                    compact
                  />
                ) : null}
                {state.open && state.kind === "contact" ? (
                  <ContactForm
                    key={`contact-${state.type ?? ""}`}
                    initialEnquiryType={state.type}
                    initialMessage={state.message}
                    compact
                  />
                ) : null}
              </Suspense>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
