"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { enquiryTypes } from "@/data/company";

type FormState = {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
  website: string;
};

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  enquiryType: "General Enquiry",
  message: "",
  website: "",
};

type ContactFormProps = {
  initialEnquiryType?: string;
  initialMessage?: string;
  compact?: boolean;
};

export function ContactForm({
  initialEnquiryType,
  initialMessage,
  compact = false,
}: ContactFormProps = {}) {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(() => {
    const type = initialEnquiryType ?? searchParams.get("type");
    const vehicle = searchParams.get("vehicle");
    const matchedType =
      type && enquiryTypes.includes(type as (typeof enquiryTypes)[number])
        ? type
        : "General Enquiry";

    return {
      ...initial,
      enquiryType: matchedType,
      message:
        initialMessage ||
        (vehicle ? `I would like to enquire about: ${vehicle}\n\n` : ""),
    };
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const fieldClass =
    "w-full min-w-0 border border-white/12 bg-obsidian/60 px-4 py-3 text-sm text-ivory placeholder:text-silver/50 transition-colors focus:border-gold/60 focus:outline-none";

  const canSubmit = useMemo(() => status.type !== "loading", [status.type]);

  function validate(values: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.phone.trim() || values.phone.trim().length < 7) {
      next.phone = "Please enter a reachable phone number.";
    }
    if (!values.enquiryType) {
      next.enquiryType = "Please select an enquiry type.";
    }
    if (!values.message.trim() || values.message.trim().length < 12) {
      next.message = "Please share a little more detail about your enquiry.";
    }
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            data.message ??
            "We could not send your enquiry right now. Please email or call us directly.",
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          data.message ??
          "Thank you. Your enquiry has been received. Our team will respond shortly.",
      });
      setForm({
        ...initial,
        enquiryType: "General Enquiry",
      });
      setErrors({});
    } catch {
      setStatus({
        type: "error",
        message:
          "A network error occurred. Please try again or contact us by phone or email.",
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={compact ? "space-y-4" : "space-y-5"}
      noValidate
      aria-describedby="form-status"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver">
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-sm text-red-300">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-red-300">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-2 text-sm text-red-300">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="enquiryType"
            className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver"
          >
            Enquiry type
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            className={fieldClass}
            value={form.enquiryType}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, enquiryType: e.target.value }))
            }
          >
            {enquiryTypes.map((type) => (
              <option key={type} value={type} className="bg-obsidian text-ivory">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`${fieldClass} resize-y`}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-red-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — leave empty; visually and accessibly hidden from users */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={!canSubmit}
          icon={Send}
          iconPosition="right"
        >
          {status.type === "loading" ? "Sending…" : "Send Enquiry"}
        </Button>
        <p id="form-status" className="text-sm text-silver" role="status" aria-live="polite">
          {status.type === "success" || status.type === "error" ? status.message : null}
        </p>
      </div>
    </form>
  );
}
