import Link from "next/link";
import Image from "next/image";
import { company, navLinks } from "@/data/company";
import { services } from "@/data/services";
import { FormLink } from "@/components/forms/FormLink";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { BRAND_LOGO } from "@/data/media";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-charcoal">
      <div className="container-shell section-pad !pb-10 !pt-14">
        <div className="mb-12 grid gap-8 border border-white/8 bg-obsidian/40 p-6 sm:p-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Newsletter</p>
            <h2 className="display-title mt-3 text-2xl text-ivory sm:text-3xl">
              Stay informed.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-silver">
              Occasional updates on services and availability. No spam — unsubscribe
              any time by emailing us.
            </p>
          </div>
          <div className="lg:col-span-7">
            <NewsletterForm source="footer" />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex" aria-label="Shindara home">
              <Image
                src={BRAND_LOGO}
                alt="Shindara Automotive & Logistics Limited"
                width={200}
                height={200}
                className="h-auto w-[6.5rem] object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver">
              World-class automotive sourcing, bespoke vehicle sales, and trans-continental logistics — engineered with absolute precision, discretion, and reliability.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              {company.tagline}
            </p>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-2 text-[0.65rem] text-silver/80">
              <span className="px-2.5 py-1 rounded bg-obsidian border border-white/10">
                ✓ RC / CAC Registered
              </span>
              <span className="px-2.5 py-1 rounded bg-obsidian border border-white/10">
                ✓ Full Marine Escrow
              </span>
              <span className="px-2.5 py-1 rounded bg-obsidian border border-white/10">
                ✓ Priority Customs Channel
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Navigate
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-silver">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <FormLink
                    href={link.href}
                    className="transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </FormLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Services
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-silver">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="hover:text-gold-bright transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              International Terminals
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-silver">
              <li>
                <span className="block text-xs uppercase tracking-[0.14em] text-gold-bright">
                  Nigeria (Lagos Headquarters)
                </span>
                <a
                  href={company.phones.nigeria.href}
                  className="safe-break hover:text-gold-bright font-mono text-xs"
                >
                  {company.phones.nigeria.display}
                </a>
                <p className="text-[0.75rem] text-silver/70 mt-0.5 leading-snug">
                  {company.address.line1}, {company.address.line2}, {company.address.city}
                </p>
              </li>
              <li className="pt-2 border-t border-white/5">
                <span className="block text-xs uppercase tracking-[0.14em] text-gold-bright">
                  South Africa (Sandton & Durban Hub)
                </span>
                <a
                  href={company.phones.southAfrica.href}
                  className="safe-break hover:text-gold-bright font-mono text-xs"
                >
                  {company.phones.southAfrica.display}
                </a>
              </li>
              <li className="pt-2 border-t border-white/5">
                <a
                  href={company.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-xs"
                >
                  <span>Chat on WhatsApp →</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="safe-break text-xs hover:text-gold-bright text-silver"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-12" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-silver/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-gold-bright">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-bright">
              Terms of Use
            </Link>
            <FormLink href="/enquire" className="hover:text-gold-bright">
              Major Enquiry
            </FormLink>
            <a
              href={company.url}
              className="hover:text-gold-bright"
              rel="noopener noreferrer"
            >
              {company.domain}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
