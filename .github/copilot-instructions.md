# GitHub Copilot Instructions

This is **KilatKoding** — a Next.js SaaS boilerplate for Indonesian developers.

## Stack

- Next.js App Router, TypeScript strict mode
- Tailwind CSS + shadcn/ui (44 components, new-york style, neutral base)
- Supabase SSR auth: email/password, Google OAuth, Magic Link
- Midtrans (Snap) + Doku (JOKUL) — Indonesian payment gateways
- Resend + React Email — templates in Bahasa Indonesia
- MDX blog system (`lib/mdx.ts`, `content/blog/`)
- Database: `profiles`, `subscriptions`, `payments` + `waitlist` tables (all with RLS)

## Key Conventions

- **Server components by default.** Only add `"use client"` for interactivity, effects, or browser APIs.
- **Auth**: Use `lib/supabase/server.ts` server-side, `lib/supabase/client.ts` browser-side. Never bypass `proxy.ts`.
- **Styling**: Tailwind utility classes + `cn()` from `lib/utils.ts`. CSS variables in `app/globals.css`.
- **UI**: Reuse `components/ui/` primitives before creating custom base components.
- **Config**: Site metadata in `config/site.ts`, navigation in `config/navigation.ts`.
- **Payments**: IDR amounts (Rupiah). Midtrans = Snap for web, Doku = JOKUL redirect.

## Route Groups

- `app/(marketing)/` — public pages, uses `MarketingLayout` (Header + Footer)
- `app/(dashboard)/` — auth-gated, uses `DashboardLayout`
- `app/auth/` — auth flow pages, no shared layout

## Do Not

- Move Supabase clients into global mutable state
- Break `proxy.ts` cookie synchronization
- Add `"use client"` to components that don't need it
- Hardcode API keys or secrets
- Create new base UI components when a shadcn/ui primitive already exists
