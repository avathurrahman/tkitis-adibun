# AGENTS.md

Repository guidance for coding agents working in `/Users/galpratama/Development/galpratama/kilatkoding-src`.

## Project Summary

KilatKoding is a production-ready Next.js SaaS boilerplate for Indonesian developers, built on:

- Next.js App Router
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui (44 components)
- Supabase SSR auth (email/password, Google OAuth, Magic Link)
- Midtrans (Snap) + Doku (JOKUL) payment gateway integration
- Resend + React Email (welcome and invoice templates in Bahasa Indonesia)
- MDX blog system with frontmatter, reading time, and tag support
- Database: `profiles`, `subscriptions`, `payments` tables with Row Level Security
- Admin dashboard at `/admin` gated by `ADMIN_EMAILS` env var
- GitHub Actions CI (lint + build on push/PR)

## Documentation

Use the project docs before making broad changes:

- English docs: [`docs/en/README.md`](./docs/en/README.md)
- Indonesian docs: [`docs/id/README.md`](./docs/id/README.md)
- Language index: [`docs/README.md`](./docs/README.md)

Key references:

- Current state: [`docs/en/current-state.md`](./docs/en/current-state.md)
- Architecture: [`docs/en/architecture.md`](./docs/en/architecture.md)
- Supabase/auth: [`docs/en/supabase-auth.md`](./docs/en/supabase-auth.md)
- Source inventory: [`docs/en/inventory.md`](./docs/en/inventory.md)

## Commands

Run commands from the repo root.

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Validation expectations:

- Run `npm run lint` after code changes when practical.
- Run `npm run build` for changes that affect routing, config, fonts, or app structure.

## Environment Variables

Expected local environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Source of truth:

- [`.env.example`](./.env.example)

If env vars are missing, the starter intentionally renders warning/placeholder behavior instead of full auth flows.

## Current Architecture

Important paths:

- `app/`: App Router pages, layouts, route handlers, and global CSS
- `components/`: reusable UI, auth, and starter tutorial components
- `components/ui/`: installed shadcn/ui primitives
- `lib/supabase/`: Supabase browser/server/proxy helpers
- `proxy.ts`: request-time auth/session update logic
- `docs/`: English and Indonesian repository documentation
- `config/`: centralized site config and navigation
- `supabase/migrations/`: SQL migrations
- `emails/`: React Email templates
- `hooks/`: client-side React hooks
- `content/blog/`: MDX blog posts

Important current routes:

Marketing (public, `(marketing)` group):
- `/` — KilatKoding landing page
- `/about` — About page
- `/affiliates` — Affiliates program page
- `/blog` — MDX blog listing
- `/blog/[slug]` — MDX blog post detail
- `/changelog` — Product changelog
- `/checkout` — Checkout / purchase flow
- `/compare` — Plan comparison page
- `/contact` — Contact form page
- `/open` — Open startup metrics / stats
- `/privacy` — Privacy policy
- `/roadmap` — Public product roadmap
- `/status` — Service status page
- `/terms` — Terms of service
- `/use-cases` — Use cases gallery
- `/waitlist` — Waitlist sign-up
- `/order/[id]` — Order confirmation / post-purchase page

Dashboard (auth-gated, `(dashboard)` group):
- `/dashboard` — Main user dashboard
- `/dashboard/settings` — Profile + password change
- `/dashboard/billing` — Plan display + payment flow
- `/admin` — Admin dashboard (gated by ADMIN_EMAILS env var)

Auth:
- `/auth/login`
- `/auth/sign-up`
- `/auth/sign-up-success`
- `/auth/verify-email`
- `/auth/forgot-password`
- `/auth/update-password`
- `/auth/error`
- `/auth/confirm` — OTP/OAuth callback route handler

API:
- `POST /api/payments` — Creates a payment session (Midtrans Snap token or Doku checkout URL), inserts pending payment record
- `POST /api/webhooks/midtrans` — Verifies signature, updates payment + subscription
- `POST /api/webhooks/doku` — Verifies notification, updates payment + subscription
- `POST /api/contact` — Contact form submission handler
- `POST /api/waitlist` — Waitlist sign-up handler

## Development Guidelines

### Preserve What Already Works

- Keep the Supabase SSR auth flow intact unless the task explicitly changes auth architecture.
- Do not break `proxy.ts` and `lib/supabase/proxy.ts` cookie synchronization.
- Do not move Supabase clients into global mutable state.
- Preserve strict TypeScript.

### UI Conventions

- Prefer existing shadcn/ui primitives before creating custom base components.
- Use the `cn()` helper from `lib/utils.ts` for conditional class composition.
- Keep styling aligned with the existing Tailwind + CSS variable system in `app/globals.css`.
- Respect the existing theme setup via `next-themes`.

### Next.js Conventions

- Default to server components unless interactivity or browser-only APIs are required.
- Use `Suspense` intentionally for async server UI that benefits from streaming or deferred loading.
- Prefer direct imports over barrel files.
- Keep client-side bundles lean; avoid moving server-safe logic into client components unnecessarily.

### Supabase Conventions

- Use `lib/supabase/server.ts` for server-side access.
- Use `lib/supabase/client.ts` for browser-side access.
- For auth-aware request handling, work through `proxy.ts` and `lib/supabase/proxy.ts`.
- If adding new database access patterns, document them in `docs/en` and `docs/id`.

## When Editing Documentation

- Keep English docs in `docs/en`.
- Keep Indonesian docs in `docs/id`.
- When documentation changes materially, update both languages unless the user asks for one language only.
- Keep structure parallel between `en` and `id` folders when possible.

## Git Notes

- Current remote: `git@github.com:galpratama/kilatkoding-src.git`
- Default branch: `main`

Do not rewrite history unless explicitly asked.

## Preferred Workflow

1. Read the relevant docs first.
2. Inspect the exact files involved.
3. Make the minimal safe change.
4. Verify with `npm run lint` and/or `npm run build` when appropriate.
5. Update `docs/en` and `docs/id` if the project behavior or structure changes.
