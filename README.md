# Patchwork

A niche job board for remote dev jobs. Companies pay $199 to post a 30-day listing, payments processed via Stripe Checkout, listings auto-published on webhook confirmation.

🌐 **Live:** [patchwork-ochre.vercel.app](https://patchwork-ochre.vercel.app)

---

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database + Auth:** Supabase (Postgres + password auth)
- **Payments:** Stripe Checkout + webhook auto-publish
- **Email:** Resend
- **Hosting:** Vercel

## Features

- Public jobs board with listings and detail pages
- "Post a job" form (company + role + description + salary range + tags)
- Stripe Checkout — $199 per 30-day listing
- Webhook handler at `/api/webhook` auto-publishes on `checkout.session.completed`
- Admin panel at `/admin` for listing review + status changes
- Success page post-payment

## Schema

```
companies   — id, name, website, logo_url
jobs        — id, company_id, title, description, location,
              salary_min, salary_max, tags[], apply_url,
              status, stripe_session_id
```

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Stripe keys
npm run dev
```

### Required env vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
```

## Roadmap

- [ ] Switch Stripe to live mode for launch
- [ ] Employer confirmation email post-payment (Resend)
- [ ] Job expiry after 30 days (cron / Supabase scheduled function)
- [ ] Search + tag filtering on the board
- [ ] RSS feed for listings
- [ ] Pick a tighter niche (currently broad "remote dev" — narrowing to Rust / AI / etc.)

## License

MIT
