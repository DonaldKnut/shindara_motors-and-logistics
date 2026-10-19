# Shindara Motors & Logistics Limited

Premium website for [shindaraautos.com](https://shindaraautos.com).

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS (light + dark theme via `data-theme`)
- Framer Motion
- Zod (contact form validation)

## Themes

Toggle light/dark from the header. Preference is stored in `localStorage` (`shindara-theme`).

## Images & sliders

Drop assets into:

- `public/slides/` — hero / lifestyle frames
- `public/vehicles/` — fleet photography

Wire paths in `src/data/slides.ts` and vehicle `gallery` entries in `src/data/vehicles.ts`.  
Use `placeholder: true` until a file exists — the UI shows a premium empty slot.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Mail-backed APIs

All three endpoints share the same mail provider config (Resend or Formspree):

| Endpoint | Purpose |
| --- | --- |
| `POST /api/contact` | Standard contact form |
| `POST /api/enquiry` | Major business enquiry (reference number issued) |
| `POST /api/newsletter` | Newsletter signup |

Copy `.env.example` to `.env.local` and configure **one** delivery method:

### Resend (recommended)

```env
RESEND_API_KEY=re_xxx
CONTACT_FROM_EMAIL=Shindara Contact <onboarding@resend.dev>
CONTACT_TO_EMAIL=hello@shindaraautos.com
NEXT_PUBLIC_SITE_URL=https://shindaraautos.com
```

### Formspree

```env
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
NEXT_PUBLIC_SITE_URL=https://shindaraautos.com
```

Without configuration, APIs return `503` and ask the visitor to email/call/WhatsApp instead of faking success. Rate limiting and honeypot spam protection are enabled on every endpoint.

WhatsApp chat FAB links to `+27 77 389 6008`.

## Updating content

| Content | File |
| --- | --- |
| Company details | `src/data/company.ts` |
| Services | `src/data/services.ts` |
| Vehicles | `src/data/vehicles.ts` |
| Values / process | `src/data/values.ts` |
| Official logo | `public/brand/shindara-logo.jpg` |

Set `isSample: false` on vehicle entries only when listings are verified and ready to publish as live inventory.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
