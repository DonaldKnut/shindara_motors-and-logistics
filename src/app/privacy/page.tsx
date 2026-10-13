import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${company.legalName}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad">
        <div className="container-shell max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display-title mt-4 text-[clamp(2rem,5vw,3.4rem)] text-ivory">
            Privacy Policy
          </h1>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-silver sm:text-base">
            <p>
              {company.legalName} (“we”, “us”) respects your privacy. This page
              explains how we handle personal information submitted through our
              website.
            </p>
            <h2 className="display-title pt-4 text-xl text-ivory">Information we collect</h2>
            <p>
              When you contact us through our enquiry form, we collect the details
              you provide — typically your name, email address, phone number,
              enquiry type, and message content.
            </p>
            <h2 className="display-title pt-4 text-xl text-ivory">How we use information</h2>
            <p>
              We use enquiry details solely to respond to your request, provide
              relevant services, and maintain appropriate business records.
            </p>
            <h2 className="display-title pt-4 text-xl text-ivory">Sharing</h2>
            <p>
              We do not sell personal information. We may share information with
              trusted service providers who help us operate the website or deliver
              communications, only as needed for those purposes.
            </p>
            <h2 className="display-title pt-4 text-xl text-ivory">Contact</h2>
            <p>
              For privacy-related questions, email{" "}
              <a href={`mailto:${company.email}`} className="text-gold-bright">
                {company.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
