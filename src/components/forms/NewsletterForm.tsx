"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setStatus({ type: "loading" });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.message ?? "Subscription failed. Please try again.",
        });
        return;
      }
      setStatus({
        type: "success",
        message: data.message ?? "Thank you for subscribing.",
      });
      setEmail("");
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again or email us directly.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 min-[420px]:flex-row">
        <div className="relative min-w-0 flex-1">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/80"
            aria-hidden="true"
          />
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/12 bg-obsidian/60 py-3 pl-10 pr-4 text-sm text-ivory placeholder:text-silver/50 focus:border-gold/60 focus:outline-none"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          disabled={status.type === "loading"}
          icon={Send}
          iconPosition="right"
        >
          {status.type === "loading" ? "Joining…" : "Subscribe"}
        </Button>
      </div>
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
      <p className="text-xs text-silver" role="status" aria-live="polite">
        {status.type === "success" || status.type === "error" ? status.message : null}
      </p>
    </form>
  );
}
