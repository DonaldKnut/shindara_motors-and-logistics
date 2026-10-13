"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <motion.div
      className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={viewportOnce}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="display-title text-[clamp(1.85rem,4.6vw,3.4rem)] text-ivory">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-[clamp(0.95rem,2.2vw,1.1rem)] leading-relaxed text-silver">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
