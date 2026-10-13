import Link from "next/link";
import Image from "next/image";
import { company, navLinks } from "@/data/company";
import { services } from "@/data/services";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

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
                src="/brand/shindara-logo.png"
                alt="Shindara Motors & Logistics Limited"
                width={180}
                height={180}
                className="h-auto w-[5rem] object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver">
              Premium automotive solutions and dependable logistics — delivered
              with precision, integrity, and purpose.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">
              {company.tagline}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-ivory">
              Navigate
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-silver">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold-bright">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-ivory">
              Services
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-silver">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="hover:text-gold-bright"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-ivory">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-silver">
              <li>
                <span className="block text-xs uppercase tracking-[0.14em] text-ivory/70">
                  Nigeria
                </span>
                <a
                  href={company.phones.nigeria.href}
                  className="safe-break hover:text-gold-bright"
                >
                  {company.phones.nigeria.display}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-[0.14em] text-ivory/70">
                  South Africa
                </span>
                <a
                  href={company.phones.southAfrica.href}
                  className="safe-break hover:text-gold-bright"
                >
                  {company.phones.southAfrica.display}
                </a>
              </li>
              <li>
                <a
                  href={company.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-bright"
                >
                  WhatsApp {company.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="safe-break hover:text-gold-bright"
                >
                  {company.email}
                </a>
              </li>
              <li className="safe-break leading-relaxed">{company.address.full}</li>
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
            <Link href="/enquire" className="hover:text-gold-bright">
              Major Enquiry
            </Link>
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
