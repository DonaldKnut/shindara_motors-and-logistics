"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type ArtProps = { className?: string };

function useFloat(delay = 0) {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    animate: { y: [0, -8, 0] },
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  };
}

/** Clean line illustration — instalment / payment plan */
export function InstalmentArt({ className = "" }: ArtProps) {
  const float = useFloat(0.2);
  return (
    <motion.svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...float}
    >
      <rect x="48" y="36" width="184" height="148" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-gold/50" />
      <rect x="64" y="56" width="152" height="18" rx="2" fill="currentColor" className="text-gold/20" />
      <motion.rect
        x="64"
        y="90"
        width="100"
        height="10"
        rx="2"
        className="text-gold"
        fill="currentColor"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
        style={{ transformOrigin: "left" }}
      />
      <rect x="64" y="112" width="72" height="10" rx="2" fill="currentColor" className="text-gold/25" />
      <rect x="64" y="134" width="120" height="10" rx="2" fill="currentColor" className="text-gold/15" />
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx={80 + i * 36}
          cy={168}
          r="8"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold"
          initial={{ opacity: 0.25 }}
          whileInView={{ opacity: i < 3 ? 1 : 0.35 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 + i * 0.12, duration: 0.4 }}
        />
      ))}
      <path d="M80 168h108" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" className="text-gold/40" />
    </motion.svg>
  );
}

/** Clean line illustration — training */
export function TrainingArt({ className = "" }: ArtProps) {
  const float = useFloat(0.4);
  return (
    <motion.svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...float}
    >
      <path
        d="M40 150 L140 100 L240 150 L140 200 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="text-gold/45"
      />
      <path
        d="M140 100 V180"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-gold"
      />
      <motion.path
        d="M90 125 L140 100 L190 125"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-gold-bright"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: easeOut }}
      />
      <circle cx="140" cy="78" r="14" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
      <path d="M132 78h16M140 70v16" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
      <rect x="108" y="42" width="64" height="8" rx="2" fill="currentColor" className="text-gold/30" />
    </motion.svg>
  );
}

/** Clean line illustration — driver placement */
export function DriverArt({ className = "" }: ArtProps) {
  const float = useFloat(0.1);
  return (
    <motion.svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...float}
    >
      <circle cx="140" cy="110" r="62" stroke="currentColor" strokeWidth="1.5" className="text-gold/35" />
      <circle cx="140" cy="110" r="38" stroke="currentColor" strokeWidth="1.5" className="text-gold/60" />
      <motion.circle
        cx="140"
        cy="110"
        r="12"
        className="text-gold"
        fill="currentColor"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easeOut }}
      />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 140 + Math.cos(rad) * 20;
        const y1 = 110 + Math.sin(rad) * 20;
        const x2 = 140 + Math.cos(rad) * 52;
        const y2 = 110 + Math.sin(rad) * 52;
        return (
          <motion.line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gold/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.06 }}
          />
        );
      })}
      <path
        d="M118 175 Q140 188 162 175"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-gold/40"
      />
    </motion.svg>
  );
}

/** Clean line illustration — import / export */
export function TradeArt({ className = "" }: ArtProps) {
  const float = useFloat(0.35);
  return (
    <motion.svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...float}
    >
      <circle cx="140" cy="110" r="70" stroke="currentColor" strokeWidth="1.25" className="text-gold/30" />
      <ellipse cx="140" cy="110" rx="28" ry="70" stroke="currentColor" strokeWidth="1.25" className="text-gold/25" />
      <path d="M70 110h140" stroke="currentColor" strokeWidth="1.25" className="text-gold/25" />
      <path d="M78 80h124M78 140h124" stroke="currentColor" strokeWidth="1" className="text-gold/20" />
      <motion.path
        d="M55 55 L85 55 L75 45 M85 55 L75 65"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: easeOut }}
      />
      <motion.path
        d="M225 165 L195 165 L205 155 M195 165 L205 175"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold-bright"
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: easeOut, delay: 0.15 }}
      />
    </motion.svg>
  );
}

/** Clean line illustration — fleet / delivery */
export function FleetArt({ className = "" }: ArtProps) {
  const float = useFloat(0.25);
  return (
    <motion.svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...float}
    >
      <path
        d="M40 140 H90 L110 100 H200 L230 140 H250"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="text-gold/55"
      />
      <path d="M110 100 V140 M200 100 V140" stroke="currentColor" strokeWidth="1.5" className="text-gold/40" />
      <rect x="125" y="112" width="50" height="18" rx="2" stroke="currentColor" strokeWidth="1.25" className="text-gold/50" />
      <circle cx="85" cy="158" r="16" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
      <circle cx="215" cy="158" r="16" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
      <motion.circle
        cx="85"
        cy="158"
        r="5"
        fill="currentColor"
        className="text-gold-bright"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "85px 158px" }}
      />
      <motion.circle
        cx="215"
        cy="158"
        r="5"
        fill="currentColor"
        className="text-gold-bright"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "215px 158px" }}
      />
      <path d="M40 170 H250" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" className="text-gold/25" />
    </motion.svg>
  );
}
