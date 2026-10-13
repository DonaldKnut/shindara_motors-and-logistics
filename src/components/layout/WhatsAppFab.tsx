"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { company } from "@/data/company";
import { easeOut } from "@/lib/motion";

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="w-[min(18.5rem,calc(100vw-2rem))] border border-white/10 bg-charcoal/95 p-4 shadow-2xl backdrop-blur-md"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-gold">
              Chat with us
            </p>
            <p className="mt-2 text-sm leading-relaxed text-silver">
              Message the Shindara team on WhatsApp for a fast response.
            </p>
            <p className="mt-2 text-sm text-ivory">{company.whatsapp.display}</p>
            <a
              href={company.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#25D366] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-obsidian transition-transform hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Open WhatsApp
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-obsidian shadow-[0_12px_40px_-10px_rgba(37,211,102,0.7)]"
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      >
        {!reduceMotion ? (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/35" />
        ) : null}
        {open ? (
          <X className="relative h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
}
