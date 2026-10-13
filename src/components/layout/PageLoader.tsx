"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const done = () => {
      window.setTimeout(() => setVisible(false), reduceMotion ? 0 : 450);
    };

    if (document.readyState === "complete") {
      done();
      return;
    }

    window.addEventListener("load", done, { once: true });
    const fallback = window.setTimeout(done, 2200);
    return () => {
      window.removeEventListener("load", done);
      window.clearTimeout(fallback);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-obsidian"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading Shindara"
        >
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative">
              <motion.div
                className="absolute inset-[-0.85rem] rounded-full border border-gold/25"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: 360, scale: [1, 1.04, 1] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 2.4, repeat: Infinity, ease: "linear" }
                }
              />
              <motion.div
                className="absolute inset-[-0.35rem] rounded-full border-t border-gold"
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 1.1, repeat: Infinity, ease: "linear" }
                }
              />
              <Image
                src="/brand/shindara-logo.png"
                alt=""
                width={88}
                height={88}
                priority
                className="relative h-16 w-16 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
              />
            </div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold">
              Shindara
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
