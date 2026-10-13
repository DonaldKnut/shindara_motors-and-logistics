export type MailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
  to?: string | string[];
  tags?: string[];
};

export type MailResult =
  | { ok: true; provider: "resend" | "formspree" }
  | { ok: false; reason: "unconfigured" | "provider_error"; detail?: string };

function getToAddresses(explicit?: string | string[]) {
  if (explicit) return Array.isArray(explicit) ? explicit : [explicit];
  const envTo = process.env.CONTACT_TO_EMAIL || "hello@shindaraautos.com";
  return [envTo];
}

export async function sendTransactionalMail(
  payload: MailPayload,
): Promise<MailResult> {
  const resendKey = process.env.RESEND_API_KEY;
  const formspree = process.env.FORMSPREE_ENDPOINT;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    "Shindara Contact <onboarding@resend.dev>";
  const to = getToAddresses(payload.to);

  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to,
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
        tags: payload.tags?.map((name) => ({ name })),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error:", detail);
      return { ok: false, reason: "provider_error", detail };
    }

    return { ok: true, provider: "resend" };
  }

  if (formspree) {
    const response = await fetch(formspree, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: payload.subject,
        message: payload.text,
        email: payload.replyTo,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Formspree error:", detail);
      return { ok: false, reason: "provider_error", detail };
    }

    return { ok: true, provider: "formspree" };
  }

  return { ok: false, reason: "unconfigured" };
}

export const mailUnavailableMessage =
  "The email service is not configured yet. Please email hello@shindaraautos.com or call +234 911 005 6935 / +27 77 389 6008.";
