"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  showArrow?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-obsidian hover:bg-gold-bright focus-visible:outline-gold-bright shadow-[0_0_0_0_rgba(214,173,89,0.35)] hover:shadow-[0_10px_30px_-12px_rgba(214,173,89,0.55)]",
  secondary:
    "border border-gold/60 text-ivory hover:border-gold-bright hover:text-gold-bright bg-transparent hover:bg-gold/5",
  ghost:
    "text-ivory/90 hover:text-gold-bright underline-offset-4 hover:underline bg-transparent",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-sm tracking-[0.14em]",
  sm: "min-h-10 px-4 text-xs tracking-[0.12em]",
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    icon: Icon,
    iconPosition = "left",
    showArrow = false,
    ...rest
  } = props;
  const reduceMotion = useReducedMotion();

  const classes = [
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden uppercase font-medium",
    "transition-all duration-300 ease-out will-change-transform",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        aria-hidden="true"
      />
      {Icon && iconPosition === "left" ? (
        <Icon
          className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-px"
          aria-hidden="true"
          strokeWidth={1.75}
        />
      ) : null}
      <span className="relative">{children}</span>
      {Icon && iconPosition === "right" ? (
        <Icon
          className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
          strokeWidth={1.75}
        />
      ) : null}
      {showArrow ? (
        <ArrowRight
          className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <motion.div
        className="inline-flex"
        whileHover={reduceMotion ? undefined : { y: -1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      >
        <Link href={href} className={classes} {...linkRest}>
          {content}
        </Link>
      </motion.div>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <motion.div
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
    >
      <button className={classes} {...buttonRest}>
        {content}
      </button>
    </motion.div>
  );
}
