"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NavIcon, ServiceIcon } from "@/components/ui/Icons";
import { company, navLinks } from "@/data/company";
import { services } from "@/data/services";
import { easeOut } from "@/lib/motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const megaRef = useRef<HTMLDivElement>(null);

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
      if (!megaRef.current?.contains(event.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setMegaOpen(false);
    setMobileMegaOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled || open || megaOpen
          ? "border-b border-white/5 bg-obsidian/95 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-obsidian/70 to-transparent"
      }`}
    >
      <div className="container-shell flex min-h-[4.25rem] items-center justify-between gap-3 py-2 sm:min-h-[4.75rem]">
        <Logo priority compact />

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 xl:gap-2 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) =>
            link.mega ? (
              <div key={link.href} className="relative" ref={megaRef}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/85 transition-colors hover:text-gold-bright"
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  onClick={() => setMegaOpen((value) => !value)}
                  onMouseEnter={() => setMegaOpen(true)}
                >
                  <NavIcon name={link.icon} className="h-3.5 w-3.5 text-gold" />
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      megaOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {megaOpen ? (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.28, ease: easeOut }}
                      className="absolute left-1/2 top-[calc(100%+0.75rem)] w-[min(46rem,78vw)] -translate-x-1/2 border border-white/10 bg-charcoal/98 p-5 shadow-2xl backdrop-blur-md"
                      onMouseLeave={() => setMegaOpen(false)}
                    >
                      <div className="mb-4 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                            Services
                          </p>
                          <p className="mt-1 text-sm text-silver">
                            Explore how Shindara supports automotive and logistics needs.
                          </p>
                        </div>
                        <Link
                          href="/services"
                          onClick={closeAll}
                          className="text-[0.68rem] uppercase tracking-[0.16em] text-gold-bright hover:text-ivory"
                        >
                          View all →
                        </Link>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.id}`}
                            onClick={closeAll}
                            className="group flex gap-3 border border-white/8 bg-obsidian/50 p-3 transition-colors hover:border-gold/40 hover:bg-obsidian"
                          >
                            <div className="relative h-16 w-20 shrink-0 overflow-hidden">
                              <Image
                                src={service.image.src}
                                alt=""
                                fill
                                sizes="80px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 text-gold">
                                <ServiceIcon id={service.id} className="h-3.5 w-3.5" />
                                <h3 className="truncate text-sm text-ivory group-hover:text-gold-bright">
                                  {service.title}
                                </h3>
                              </div>
                              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-silver">
                                {service.summary}
                              </p>
                            </div>
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
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/85 transition-colors hover:text-gold-bright"
              >
                <NavIcon name={link.icon} className="h-3.5 w-3.5 text-gold/80" />
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/enquire" size="sm" variant="secondary" showArrow>
            Enquire
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/15 text-ivory transition-colors hover:border-gold/50 hover:text-gold-bright lg:hidden"
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

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            className="border-t border-white/5 bg-obsidian lg:hidden"
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
                  <div key={link.href} className="border-b border-white/5">
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
                            className="mb-3 block text-xs uppercase tracking-[0.16em] text-gold-bright"
                          >
                            All services →
                          </Link>
                          <div className="grid gap-2">
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                onClick={closeAll}
                                className="flex items-start gap-3 border border-white/8 bg-charcoal/60 p-3"
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
                    className="flex items-center gap-3 border-b border-white/5 py-4 text-sm uppercase tracking-[0.18em] text-ivory"
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
