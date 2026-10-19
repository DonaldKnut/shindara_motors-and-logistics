"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { NavIcon } from "@/components/ui/Icons";
import { company, navLinks } from "@/data/company";
import { services } from "@/data/services";
import { vehicles, vehicleLabel } from "@/data/vehicles";
import { easeOut } from "@/lib/motion";

const featured = vehicles[0];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const menuId = useId();
  const megaRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMegaOpen(false);
        setMobileMegaOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        megaRef.current?.contains(target) ||
        servicesBtnRef.current?.contains(target)
      ) {
        return;
      }
      setMegaOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setMegaOpen(false);
    setMobileMegaOpen(false);
  };

  const solidHeader = scrolled || open || megaOpen || isLight;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 overflow-visible transition-[background,backdrop-filter,border-color,box-shadow] duration-300 ${
        solidHeader
          ? isLight
            ? "border-b border-[var(--color-border)] bg-white/95 shadow-[0_8px_30px_-18px_rgba(18,20,23,0.35)] backdrop-blur-xl"
            : "border-b border-gold/20 bg-obsidian/95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-obsidian/90 via-obsidian/60 to-transparent"
      }`}
    >
      <div
        className={`hidden border-b py-1 px-4 text-center sm:block ${
          isLight
            ? "border-[var(--color-border)] bg-white"
            : "border-white/5 bg-charcoal/80"
        }`}
      >
        <p className="flex flex-wrap items-center justify-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-silver">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          <span className="max-w-full safe-break">
            Nigeria · South Africa · London · Dubai
          </span>
          <span className="font-medium text-gold">
            {company.phones.nigeria.display}
          </span>
        </p>
      </div>

      <div className="container-shell relative flex min-h-[4.25rem] items-center justify-between gap-2 py-2 sm:min-h-[4.75rem] sm:gap-3">
        <Logo priority compact />

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 xl:gap-2 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) =>
            link.mega ? (
              <button
                key={link.href}
                ref={servicesBtnRef}
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/90 transition-colors hover:text-gold-bright xl:px-3"
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onClick={() => setMegaOpen((value) => !value)}
                onMouseEnter={() => setMegaOpen(true)}
              >
                {link.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 text-gold transition-transform duration-300 ${
                    megaOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center px-2.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/90 transition-colors hover:text-gold-bright xl:px-3"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="h-10 w-10 shrink-0" />
          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/enquire" size="sm" variant="secondary" showArrow>
              Enquire
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex min-h-10 min-w-10 items-center justify-center border border-[var(--color-border)] text-ivory transition-colors hover:border-gold/50 hover:text-gold-bright sm:min-h-11 sm:min-w-11 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-px w-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-px w-full bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Compact mega — services list + one featured unit */}
      <AnimatePresence>
        {megaOpen ? (
          <motion.div
            ref={megaRef}
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className={`absolute inset-x-0 top-full z-50 border-b shadow-2xl backdrop-blur-2xl ${
              isLight
                ? "border-[var(--color-border)] bg-white/98"
                : "border-gold/20 bg-charcoal/98"
            }`}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="container-shell py-5 sm:py-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_15rem] lg:items-start lg:gap-10">
                <div>
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold">
                      Services
                    </p>
                    <Link
                      href="/services"
                      onClick={closeAll}
                      className="text-[0.65rem] uppercase tracking-[0.16em] text-silver transition-colors hover:text-gold"
                    >
                      All →
                    </Link>
                  </div>
                  <ul className="grid gap-0 sm:grid-cols-2 sm:gap-x-8">
                    {services.map((service) => (
                      <li key={service.id} className="border-b border-[var(--color-border)]">
                        <Link
                          href={`/services/${service.id}`}
                          onClick={closeAll}
                          className="group flex items-center justify-between gap-3 py-3 transition-colors"
                        >
                          <span className="display-title text-[1.05rem] font-normal tracking-tight text-ivory transition-colors group-hover:text-gold-bright sm:text-[1.1rem]">
                            {service.title}
                          </span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-gold/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/enquire?type=Automobile%20Sales&vehicleId=${featured.id}`}
                  onClick={closeAll}
                  className="group relative hidden overflow-hidden border border-gold/30 lg:block"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={featured.image.src}
                      alt={featured.image.alt}
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[0.58rem] uppercase tracking-[0.2em] text-gold">
                        Featured · {featured.name}
                      </p>
                      <p className="mt-1 text-sm text-ivory">
                        {featured.make} {featured.model}
                      </p>
                      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-gold-bright">
                        Enquire →
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
                <p className="text-[0.7rem] text-silver">
                  <span className="text-gold">{featured.name}</span>
                  {" — "}
                  {vehicleLabel(featured).replace(`${featured.name} · `, "")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/vehicles"
                    onClick={closeAll}
                    className="text-[0.65rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:text-gold"
                  >
                    Fleet
                  </Link>
                  <Link
                    href="/enquire"
                    onClick={closeAll}
                    className="text-[0.65rem] uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-bright"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            className={`border-t lg:hidden ${
              isLight
                ? "border-[var(--color-border)] bg-white"
                : "border-[var(--color-border)] bg-obsidian"
            }`}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <nav
              className="container-shell flex max-h-[calc(100dvh-4.25rem)] flex-col gap-0.5 overflow-y-auto py-5"
              aria-label="Mobile"
            >
              {navLinks.map((link) =>
                link.mega ? (
                  <div key={link.href} className="border-b border-[var(--color-border)]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-3.5 text-left text-[0.75rem] uppercase tracking-[0.18em] text-ivory"
                      aria-expanded={mobileMegaOpen}
                      onClick={() => setMobileMegaOpen((value) => !value)}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center border border-gold/30 text-gold">
                          <NavIcon name={link.icon} />
                        </span>
                        {link.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          mobileMegaOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {mobileMegaOpen ? (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          className="overflow-hidden pb-3"
                        >
                          <div className="flex flex-col">
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                onClick={closeAll}
                                className="border-b border-[var(--color-border)] py-2.5 pl-11 text-sm text-silver transition-colors hover:text-gold"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 border-b border-[var(--color-border)] py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-ivory"
                    onClick={closeAll}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center border border-gold/30 text-gold">
                      <NavIcon name={link.icon} />
                    </span>
                    {link.label}
                  </Link>
                ),
              )}
              <div className="mt-5 flex flex-col gap-3">
                <Button href="/enquire" onClick={closeAll} showArrow>
                  Start an Enquiry
                </Button>
                <a
                  href={company.phones.southAfrica.href}
                  className="inline-flex items-center justify-center gap-2 text-sm text-silver"
                >
                  <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                  {company.phones.southAfrica.display}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
