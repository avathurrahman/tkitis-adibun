# KilatKoding Boilerplate — Implementation Plan

> Created: 2026-03-16
> Status: Phases 1, 2, 3, MDX Blog Complete ✅

---

## Phase 1 — Foundation ✅

Goal: Clean up starter noise, restructure routes, add missing auth providers, define database schema.

### 1a. Route Groups & Structure Cleanup ✅

- [x] Create `app/(marketing)/` route group with layout + page
- [x] Create `app/(dashboard)/dashboard/` with layout + page (renamed from `/protected`)
- [x] Delete `components/tutorial/`
- [x] Delete starter-only components: `deploy-button.tsx`, `env-var-warning.tsx`, `hero.tsx`, `next-logo.tsx`, `supabase-logo.tsx`
- [x] Create `components/layout/header.tsx`
- [x] Create `components/layout/footer.tsx`
- [x] Create `config/site.ts`
- [x] Create `config/navigation.ts`

### 1b. Auth Enhancements ✅

- [x] Add Google OAuth button to `login-form.tsx`
- [x] Add Magic Link (passwordless) tab/option to `login-form.tsx`
- [x] Add Google OAuth button to `sign-up-form.tsx`
- [ ] Document required Supabase dashboard config (in `docs/en/supabase-auth.md`) ← next session

### 1c. Database Schema ✅

- [x] SQL migration: `profiles` table with trigger (auto-create on signup)
- [x] SQL migration: `subscriptions` table with trigger (auto-create FREE tier on signup)
- [x] SQL migration: `payments` table with enums (plan, status, provider)
- [x] RLS policies for all 3 tables
- [ ] Generate TypeScript types from Supabase schema ← needs live Supabase project connected

---

## Phase 2 — Core Integrations ✅

### 2a. Midtrans Payment ✅

- [x] Install `midtrans-client`
- [x] Create `lib/payments/midtrans.ts` (Snap client, `createSnapTransaction`, `verifyMidtransSignature`, `isMidtransPaymentSuccess`)
- [x] Create `app/api/payments/route.ts` (POST — creates Snap transaction, inserts pending payment record)
- [x] Create `app/api/webhooks/midtrans/route.ts` (POST — verifies signature, updates payment + subscription status)
- [ ] Add `.env.example` entries ← blocked by hook; add manually (see below)

### 2b. Email (Resend) ✅

- [x] Install `resend` + `@react-email/components`
- [x] Create `lib/email.ts` (`sendEmail` wrapper using Resend)
- [x] Create `emails/welcome.tsx` (selamat datang, link ke dashboard)
- [x] Create `emails/invoice.tsx` (invoice dengan format Rupiah)
- [ ] Add `.env.example` entries ← blocked by hook; add manually (see below)

### New env vars to add to .env.example manually

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx
RESEND_API_KEY=re_xxxx
EMAIL_FROM=KilatKoding <noreply@kilatkoding.com>
```

---

## Phase 3 — Polish ✅

- [x] Doku integration (`lib/payments/doku.ts` + `app/api/webhooks/doku/route.ts`)
- [ ] Sumopod / Mailketing email options (future)
- [x] MDX blog system (`lib/mdx.ts`, `app/(marketing)/blog/`, `content/blog/`)
- [x] Admin dashboard template (`app/(dashboard)/admin/`)
- [x] `hooks/use-auth.ts`
- [x] `hooks/use-subscription.ts`
- [x] CI workflow (`.github/workflows/ci.yml`)

---

---

## Phase 4 — UI Component Library (50+ Components) ✅

> Completed: 2026-03-16
> Final count: 43 shadcn components installed + page-level composites (landing sections, dashboard widgets, admin charts)

### 4a. Core Shared Components ✅

- [x] `separator`, `avatar`, `skeleton`, `alert`, `dialog`, `sheet`, `tooltip`, `sonner`
- [x] `select`, `textarea`, `form`, `switch`, `radio-group`, `tabs`, `progress`
- [x] `TooltipProvider` added to `app/layout.tsx`

### 4b. Landing Page (`/`) ✅

- [x] `accordion`, `navigation-menu`, `carousel` installed
- [x] `components/sections/hero.tsx` — badge + headline + CTA
- [x] `components/sections/features.tsx` — 6-feature grid with icons
- [x] `components/sections/pricing.tsx` — FREE/PRO cards with monthly/annual Switch toggle
- [x] `components/sections/testimonials.tsx` — Avatar + Carousel
- [x] `components/sections/faq.tsx` — Accordion
- [x] `components/sections/cta.tsx` — CTA banner

### 4c. Dashboard (`/dashboard`) ✅

- [x] `table`, `hover-card`, `breadcrumb`, `scroll-area` installed
- [x] `components/dashboard/subscription-card.tsx` — Badge + Progress + Skeleton
- [x] `components/dashboard/payments-table.tsx` — Table + Badge + Skeleton, client-side Supabase query

### 4d. Admin Dashboard (`/admin`) ✅

- [x] `chart`, `popover`, `pagination`, `command` installed
- [x] `components/dashboard/admin-revenue-chart.tsx` — recharts BarChart (client component)
- [x] Admin page upgraded: Table + Badge + Pagination + Breadcrumb + 4 stat cards
- [x] Fixed pre-existing bugs: `doku.ts` and `midtrans.ts` module-level throws → request-time guards
- [x] Added `types/midtrans-client.d.ts` type declaration

### 4e. Blog Enhancements (`/blog`) ✅

- [x] Blog listing: Card + Badge for post cards
- [x] Blog detail: Avatar for author, Badge for tags, Separator

### 4f. Remaining shadcn Components ✅

- [x] `alert-dialog`, `aspect-ratio`, `calendar`, `collapsible`, `context-menu`
- [x] `drawer`, `resizable`, `slider`, `toggle`, `toggle-group`
- [x] Fixed Tailwind v4 incompatibilities: `toggle-group.tsx` and `calendar.tsx`

**Final total: 43 shadcn components installed · Build passes ✓**

---

### Phase 4 Execution Order

```
4a (core) → 4b (landing) → 4c (dashboard) → 4d (admin) → 4e (blog) → 4f (remainder)
```

Each phase is independently shippable. Phase 4a must complete before any other.

---

## Phase 5 — Missing Pages & Polish

> Started: 2026-03-16
> Source: internal-docs/KilatKoding Landing Page - Comprehensive Plan.md

### 5a. SEO Infrastructure ✅
- [ ] `app/sitemap.ts` — dynamic, includes blog posts
- [ ] `app/robots.ts`
- [ ] Per-page metadata for all new pages
- [ ] JSON-LD for Organization

### 5b. Error & Loading Pages ✅
- [ ] `app/not-found.tsx`
- [ ] `app/error.tsx`
- [ ] `app/(marketing)/loading.tsx`

### 5c. Legal Pages ✅
- [ ] `/privacy` — Privacy Policy (Bahasa Indonesia)
- [ ] `/terms` — Terms of Service (Bahasa Indonesia)

### 5d. About & Contact ✅
- [ ] `/about` — mission, stack, who built it
- [ ] `/contact` — form via Resend

### 5e. Changelog ✅
- [ ] `/changelog` — static version history

### 5f. Landing Page — 4 Missing Sections + 3-tier Pricing ✅
- [ ] Pain point section ("Tanpa KilatKoding, ini yang bakal kamu hadapi...")
- [ ] Tech stack logo grid
- [ ] AI-optimized section (Claude/Copilot/Antigravity)
- [ ] 7-day timeline section
- [ ] Update pricing to Basic/Pro/Ultimate

### 5g. Footer Upgrade ✅
- [ ] 4-column layout: Product, Resources, Legal, Social
- [ ] Links to all new pages + Discord/Twitter/GitHub

---

## Notes

- Skip `src/` folder migration — not necessary, adds churn without benefit
- Keep `app/auth/` routes as-is (URL prefix `/auth/` must stay — Supabase callback references it)
- Route groups `(marketing)` and `(dashboard)` don't affect URLs
- Phase 4 installs via `npx shadcn@latest add <component>` — no manual file creation needed for primitives
- Custom page sections live in `components/sections/` (marketing) and `components/dashboard/` (app)
