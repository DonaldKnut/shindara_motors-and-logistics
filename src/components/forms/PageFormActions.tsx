"use client";

import { OpenFormButton } from "@/components/forms/OpenFormButton";

type PageFormActionsProps = {
  enquireLabel?: string;
  contactLabel?: string;
  enquireType?: string;
  showContact?: boolean;
  className?: string;
};

/** CTA pair for server pages — opens enquire/contact modals. */
export function PageFormActions({
  enquireLabel = "Send an enquiry",
  contactLabel = "Contact us",
  enquireType,
  showContact = true,
  className = "mt-8 flex flex-col gap-3 min-[420px]:flex-row",
}: PageFormActionsProps) {
  return (
    <div className={className}>
      <OpenFormButton
        showArrow
        options={enquireType ? { type: enquireType } : undefined}
      >
        {enquireLabel}
      </OpenFormButton>
      {showContact ? (
        <OpenFormButton kind="contact" variant="secondary">
          {contactLabel}
        </OpenFormButton>
      ) : null}
    </div>
  );
}
