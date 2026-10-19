"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { NavIcon, ServiceIcon } from "@/components/ui/Icons";
import { company, navLinks } from "@/data/company";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { easeOut } from "@/lib/motion";

const megaSpotlight = vehicles[0];

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
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="max-w-full safe-break">
            Bi-Continental Corridors Active: Nigeria · South Africa · London · Dubai
          </span>
          <span className="font-medium text-gold">
            VIP Concierge: {company.phones.nigeria.display}
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
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[0.72rem] uppercase tracking-[0.18em] font-medium text-ivory/90 transition-colors hover:text-gold-bright xl:px-3 xl:text-[0.74rem]"
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
                className="inline-flex items-center px-2.5 py-2 text-[0.72rem] uppercase tracking-[0.18em] font-medium text-ivory/90 transition-colors hover:text-gold-bright xl:px-3 xl:text-[0.74rem]"
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

      {/* Full-bleed mega panel — anchored to header, never clipped to nav item */}
      <AnimatePresence>
        {megaOpen ? (
          <motion.div
            ref={megaRef}
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className={`absolute inset-x-0 top-full z-50 border-b shadow-2xl backdrop-blur-2xl ${
              isLight
                ? "border-[var(--color-border)] bg-white/98"
                : "border-gold/25 bg-charcoal/98"
            }`}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="container-shell max-h-[min(72vh,42rem)] overflow-y-auto py-5 sm:py-6 lg:py-7">
              <div className="mb-4 flex flex-col gap-3 border-b border-[var(--color-border)] pb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-gold">
                    Services & Global Corridors
                  </p>
                  <p className="mt-1 max-w-2xl text-sm text-silver">
                    Explore how Shindara engineers end-to-end automotive sourcing and
                    trans-continental logistics.
                  </p>
                </div>
                <Link
                  href="/services"
                  onClick={closeAll}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded border border-gold/30 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-gold transition-colors hover:border-gold-bright hover:text-gold-bright"
                >
                  View All Services →
                </Link>
              </div>

              <div className="grid items-stretch gap-4 lg:grid-cols-12 lg:gap-6">
                <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:col-span-8">
                  {services.map((service, index) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      onClick={closeAll}
                      className={`group flex min-w-0 gap-3 rounded-lg border p-3 transition-all duration-300 ${
                        isLight
                          ? "border-[var(--color-border)] bg-[#f4f5f7] hover:border-gold/50 hover:bg-white"
                          : "border-white/8 bg-obsidian/70 hover:border-gold/50 hover:bg-obsidian"
                      }`}
                    >
                      <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded sm:h-16 sm:w-20">
                        <Image
                          src={service.image.src}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute bottom-1 left-1 font-mono text-[0.6rem] font-bold text-gold-bright">
                          0{index + 1}
                        </span>
                      </div>
                      <div className="min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 text-gold">
                          <ServiceIcon id={service.id} className="h-3.5 w-3.5 shrink-0" />
                          <h3 className="truncate text-xs font-semibold text-ivory transition-colors group-hover:text-gold sm:text-sm">
                            {service.title}
                          </h3>
                        </div>
                        <p className="mt-1 line-clamp-2 text-[0.72rem] leading-relaxed text-silver">
                          {service.summary}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div
                  className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-gold/40 lg:col-span-4 ${
                    isLight
                      ? "bg-gradient-to-b from-white to-[#f4f5f7]"
                      : "bg-gradient-to-b from-charcoal-light to-obsidian"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={megaSpotlight.image.src}
                      alt={megaSpotlight.image.alt}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                    <span className="absolute left-3 top-3 rounded border border-gold/40 bg-obsidian/80 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-md">
                      In stock
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-gold">
                        Live inventory
                      </p>
                      <h4 className="display-title mt-1 text-base font-bold leading-snug text-ivory">
                        {megaSpotlight.make} {megaSpotlight.model}
                      </h4>
                      <p className="mt-2 text-[0.72rem] leading-relaxed text-silver">
                        Browse the full fleet — Lexus, Prado, BMW, Mercedes, and more —
                        then enquire. Every form reaches hello@ and oluwasina@shindaraautos.com.
                      </p>
                    </div>
                    <div className="mt-4 space-y-2 border-t border-[var(--color-border)] pt-3">
                      <Link
                        href="/vehicles"
                        onClick={closeAll}
                        className="inline-flex w-full items-center justify-center gap-1.5 bg-gold px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-obsidian transition-all hover:bg-gold-bright"
                      >
                        View fleet →
                      </Link>
                      <Link
                        href={`/enquire?type=Automobile%20Sales&vehicleId=${megaSpotlight.id}`}
                        onClick={closeAll}
                        className="inline-flex w-full items-center justify-center gap-1.5 border border-[var(--color-border)] px-3 py-1.5 text-[0.65rem] uppercase tracking-wider text-ivory transition-colors hover:border-gold/40 hover:text-gold"
                      >
                        Enquire on this vehicle
                      </Link>
                    </div>
                  </div>
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
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <nav
              className="container-shell flex max-h-[calc(100dvh-4.25rem)] flex-col gap-1 overflow-y-auto py-6"
              aria-label="Mobile"
            >
              {navLinks.map((link) =>
                link.mega ? (
                  <div key={link.href} className="border-b border-[var(--color-border)]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 text-left text-sm uppercase tracking-[0.18em] text-ivory"
                      aria-expanded={mobileMegaOpen}
                      onClick={() => setMobileMegaOpen((value) => !value)}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center border border-gold/30 text-gold">
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
                          className="overflow-hidden pb-4"
                        >
                          <Link
                            href="/services"
                            onClick={closeAll}
                            className="mb-3 block text-xs uppercase tracking-[0.16em] text-gold"
                          >
                            All services →
                          </Link>
                          <div className="grid gap-2">
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                onClick={closeAll}
                                className={`flex items-start gap-3 border p-3 ${
                                  isLight
                                    ? "border-[var(--color-border)] bg-[#f4f5f7]"
                                    : "border-white/8 bg-charcoal/60"
                                }`}
                              >
                                <span className="mt-0.5 text-gold">
                                  <ServiceIcon id={service.id} className="h-4 w-4" />
                                </span>
                                <span>
                                  <span className="block text-sm text-ivory">
                                    {service.title}
                                  </span>
                                  <span className="mt-1 block text-xs leading-relaxed text-silver">
                                    {service.summary}
                                  </span>
                                </span>
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
                    className="flex items-center gap-3 border-b border-[var(--color-border)] py-4 text-sm uppercase tracking-[0.18em] text-ivory"
                    onClick={closeAll}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center border border-gold/30 text-gold">
                      <NavIcon name={link.icon} />
                    </span>
                    <span>
                      <span className="block">{link.label}</span>
                      {link.description ? (
                        <span className="mt-1 block text-[0.7rem] normal-case tracking-normal text-silver">
                          {link.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                ),
              )}
              <div className="mt-6 flex flex-col gap-3">
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
