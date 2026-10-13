import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${company.legalName}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="bg-obsidian pt-[5.5rem]">
      <section className="section-pad">
        <div className="container-shell max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display-title mt-4 text-[clamp(2rem,5vw,3.4rem)] text-ivory">
            Terms of Use
          </h1>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-silver sm:text-base">
            <p>
              By using {company.domain}, you agree to these terms. The website
              provides general information about {company.legalName} and a channel
              to submit enquiries.
            </p>
            <h2 className="display-title pt-4 text-xl text-ivory">No reliance on sample content</h2>
            <p>
              Any sample vehicle listings, illustrative imagery, or temporary
              development content are not offers for sale unless expressly stated
              as verified inventory.
            </p>
            <h2 className="display-title pt-4 text-xl text-ivory">Enquiries</h2>
            <p>
              Submitting an enquiry does not create a contract. Commercial terms
              are confirmed separately between the parties when an engagement is
              agreed.
            </p>
            <h2 className="display-title pt-4 text-xl text-ivory">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
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
