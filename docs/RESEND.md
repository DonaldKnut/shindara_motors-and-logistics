# Resend mail setup (Shindara)

All form endpoints share one mail layer:

- `POST /api/contact`
- `POST /api/enquiry`
- `POST /api/newsletter`

## 1. Create a Resend account

1. Sign up at [resend.com](https://resend.com)
2. Verify your sending domain (recommended: `shindaraautos.com`) **or** use the sandbox sender temporarily
3. Create an API key

## 2. Local / production env

Copy `.env.example` → `.env.local` (never commit secrets):

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_FROM_EMAIL=Shindara Contact <hello@shindaraautos.com>
CONTACT_TO_EMAIL=hello@shindaraautos.com,oluwasina@shindaraautos.com
NEXT_PUBLIC_SITE_URL=https://shindaraautos.com
```

### Notes

- Until the domain is verified, Resend allows `onboarding@resend.dev` as `from` for testing.
- `CONTACT_TO_EMAIL` accepts a comma-separated list. Default (when unset) is both `hello@shindaraautos.com` and `oluwasina@shindaraautos.com` — every contact, enquiry, and newsletter goes to both inboxes.
- Without `RESEND_API_KEY`, APIs return **503** with phone/email fallbacks (no fake success).

## 3. Deploy (Vercel / host)

Add the same variables in the host dashboard. Redeploy after saving.

## 4. Optional Formspree fallback

If Resend is unset but `FORMSPREE_ENDPOINT` is set, mail routes through Formspree instead.

## 5. What gets emailed

| Form | Subject pattern | HTML |
| --- | --- | --- |
| Contact | `Shindara contact — {type}` | Branded table |
| Enquiry | `Shindara major enquiry [SHN-…] — {type}` | Branded table + reference |
| Newsletter | `Shindara newsletter signup — {email}` | Text (compact) |
