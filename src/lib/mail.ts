export type MailPayload = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  to?: string | string[];
  tags?: string[];
};

export type MailResult =
  | { ok: true; provider: "resend" | "formspree" }
  | { ok: false; reason: "unconfigured" | "provider_error"; detail?: string };

/** CEO inbox + operations — every enquiry / newsletter lands on both */
export const DEFAULT_INBOX = [
  "hello@shindaraautos.com",
  "oluwasina@shindaraautos.com",
] as const;

function getToAddresses(explicit?: string | string[]) {
  if (explicit) {
    return Array.isArray(explicit) ? explicit : [explicit];
  }
  const envTo = process.env.CONTACT_TO_EMAIL?.trim();
  if (envTo) {
    const parsed = envTo
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);
    if (parsed.length > 0) return parsed;
  }
  return [...DEFAULT_INBOX];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Premium HTML wrapper for Resend deliveries */
export function buildBrandedEmailHtml(options: {
  title: string;
  intro?: string;
  rows: Array<{ label: string; value: string }>;
  body?: string;
  footerNote?: string;
}) {
  const rowsHtml = options.rows
    .map(
      (row) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #2a2e33;color:#a9acb1;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;width:34%;vertical-align:top;">${escapeHtml(row.label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #2a2e33;color:#f6f3ec;font-size:14px;vertical-align:top;">${escapeHtml(row.value)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#090a0b;font-family:Manrope,Segoe UI,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#090a0b;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:640px;background:#141618;border:1px solid rgba(214,173,89,0.28);">
            <tr>
              <td style="padding:28px 28px 12px 28px;">
                <p style="margin:0;color:#d6ad59;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;">Shindara Motors &amp; Logistics</p>
                <h1 style="margin:12px 0 0;color:#f6f3ec;font-size:24px;line-height:1.2;">${escapeHtml(options.title)}</h1>
                ${
                  options.intro
                    ? `<p style="margin:14px 0 0;color:#b7babd;font-size:14px;line-height:1.6;">${escapeHtml(options.intro)}</p>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 20px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
                ${
                  options.body
                    ? `<div style="margin-top:18px;padding:16px;background:#090a0b;border:1px solid rgba(255,255,255,0.08);color:#f6f3ec;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(options.body)}</div>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px 28px;">
                <p style="margin:0;color:#7d8187;font-size:12px;line-height:1.5;">
                  ${escapeHtml(options.footerNote || "Driving value. Delivering more. — shindaraautos.com")}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendTransactionalMail(
  payload: MailPayload,
): Promise<MailResult> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const formspree = process.env.FORMSPREE_ENDPOINT?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
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
        html: payload.html || undefined,
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

export function isMailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() || process.env.FORMSPREE_ENDPOINT?.trim(),
  );
}

export const mailUnavailableMessage =
  "The email service is not configured yet. Please email hello@shindaraautos.com or oluwasina@shindaraautos.com, or call +234 911 005 6935 / +27 77 389 6008.";
