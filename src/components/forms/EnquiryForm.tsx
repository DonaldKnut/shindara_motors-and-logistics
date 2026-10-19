"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { enquiryTypes } from "@/data/company";
import { vehicles, vehicleLabel, getVehicleById } from "@/data/vehicles";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  enquiryType: (typeof enquiryTypes)[number];
  budget: string;
  timeline: string;
  preferredContact: "Email" | "Phone" | "WhatsApp";
  vehicleInterest: string;
  message: string;
  consent: boolean;
  website: string;
};

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string; reference?: string }
  | { type: "error"; message: string };

const fieldClass =
  "w-full min-w-0 border border-white/12 bg-obsidian/60 px-4 py-3 text-sm text-ivory placeholder:text-silver/50 transition-colors focus:border-gold/60 focus:outline-none";

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(() => {
    const type = searchParams.get("type");
    const vehicleParam = searchParams.get("vehicle");
    const vehicleId = searchParams.get("vehicleId");
    const fromId = vehicleId ? getVehicleById(vehicleId) : undefined;
    const vehicle =
      (fromId ? vehicleLabel(fromId) : null) || vehicleParam || "";
    const matched =
      type && enquiryTypes.includes(type as (typeof enquiryTypes)[number])
        ? (type as (typeof enquiryTypes)[number])
        : vehicle
          ? "Vehicle Sales (New & Used)"
          : "General Enquiry";

    return {
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      enquiryType: matched,
      budget: "",
      timeline: "",
      preferredContact: "Email",
      vehicleInterest: vehicle,
      message: vehicle
        ? `I would like to enquire about: ${vehicle}\n\n`
        : "",
      consent: false,
      website: "",
    };
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const canSubmit = useMemo(() => status.type !== "loading", [status.type]);

  function validate(values: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (values.phone.trim().length < 7) next.phone = "Enter a reachable phone number.";
    if (values.country.trim().length < 2) next.country = "Enter your country.";
    if (values.message.trim().length < 20) {
      next.message = "Please share a fuller brief (at least 20 characters).";
    }
    if (!values.consent) next.consent = "Consent is required to proceed.";
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
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        message?: string;
        reference?: string;
      };

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            data.message ??
            "We could not send your enquiry. Please email or WhatsApp us.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: data.message ?? "Enquiry received.",
        reference: data.reference,
      });
      setForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        budget: "",
        timeline: "",
        vehicleInterest: "",
        message: "",
        consent: false,
        website: "",
      }));
      setErrors({});
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again or contact us directly.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="enq-name"
          label="Full name"
          error={errors.name}
          value={form.name}
          onChange={(value) => setForm((p) => ({ ...p, name: value }))}
        />
        <Field
          id="enq-email"
          label="Email"
          type="email"
          error={errors.email}
          value={form.email}
          onChange={(value) => setForm((p) => ({ ...p, email: value }))}
        />
        <Field
          id="enq-phone"
          label="Phone"
          type="tel"
          error={errors.phone}
          value={form.phone}
          onChange={(value) => setForm((p) => ({ ...p, phone: value }))}
        />
        <Field
          id="enq-company"
          label="Company (optional)"
          value={form.company}
          onChange={(value) => setForm((p) => ({ ...p, company: value }))}
        />
        <Field
          id="enq-country"
          label="Country"
          error={errors.country}
          value={form.country}
          onChange={(value) => setForm((p) => ({ ...p, country: value }))}
        />
        <div>
          <label
            htmlFor="enq-type"
            className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver"
          >
            Enquiry type
          </label>
          <select
            id="enq-type"
            className={fieldClass}
            value={form.enquiryType}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                enquiryType: e.target.value as FormState["enquiryType"],
              }))
            }
          >
            {enquiryTypes.map((type) => (
              <option key={type} value={type} className="bg-obsidian">
                {type}
              </option>
            ))}
          </select>
        </div>
        <Field
          id="enq-budget"
          label="Budget range (optional)"
          value={form.budget}
          onChange={(value) => setForm((p) => ({ ...p, budget: value }))}
        />
        <Field
          id="enq-timeline"
          label="Timeline (optional)"
          value={form.timeline}
          onChange={(value) => setForm((p) => ({ ...p, timeline: value }))}
        />
        <div>
          <label
            htmlFor="enq-preferred"
            className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver"
          >
            Preferred contact
          </label>
          <select
            id="enq-preferred"
            className={fieldClass}
            value={form.preferredContact}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                preferredContact: e.target.value as FormState["preferredContact"],
              }))
            }
          >
            <option value="Email" className="bg-obsidian">
              Email
            </option>
            <option value="Phone" className="bg-obsidian">
              Phone
            </option>
            <option value="WhatsApp" className="bg-obsidian">
              WhatsApp
            </option>
          </select>
        </div>
        <div>
          <label
            htmlFor="enq-vehicle"
            className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver"
          >
            Vehicle of interest
          </label>
          <select
            id="enq-vehicle"
            className={fieldClass}
            value={form.vehicleInterest}
            onChange={(e) => {
              const value = e.target.value;
              setForm((p) => ({
                ...p,
                vehicleInterest: value,
                enquiryType: value ? "Vehicle Sales (New & Used)" : p.enquiryType,
                message:
                  value && !p.message.trim()
                    ? `I would like to enquire about: ${value}\n\n`
                    : p.message,
              }));
            }}
          >
            <option value="" className="bg-obsidian">
              Select a vehicle (or leave blank)
            </option>
            {vehicles.map((v) => {
              const label = vehicleLabel(v);
              return (
                <option key={v.id} value={label} className="bg-obsidian">
                  {v.name} — {v.make} {v.model} ({v.color})
                </option>
              );
            })}
            <option value="Other / sourcing request" className="bg-obsidian">
              Other / sourcing request
            </option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="enq-message"
          className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver"
        >
          Project brief
        </label>
        <textarea
          id="enq-message"
          rows={7}
          className={`${fieldClass} resize-y`}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? (
          <p className="mt-2 text-sm text-red-300">{errors.message}</p>
        ) : null}
      </div>

      <label className="flex items-start gap-3 text-sm text-silver">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
          className="mt-1 h-4 w-4 accent-[#d6ad59]"
        />
        <span>
          I consent to Shindara contacting me about this enquiry using the details
          provided.
          {errors.consent ? (
            <span className="mt-1 block text-red-300">{errors.consent}</span>
          ) : null}
        </span>
      </label>

      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={!canSubmit} icon={Send} iconPosition="right">
          {status.type === "loading" ? "Submitting…" : "Submit Enquiry"}
        </Button>
        <p className="text-sm text-silver" role="status" aria-live="polite">
          {status.type === "success" || status.type === "error" ? (
            <>
              {status.message}
              {status.type === "success" && status.reference
                ? ` Reference: ${status.reference}`
                : null}
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs uppercase tracking-[0.16em] text-silver"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={fieldClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
      />
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
