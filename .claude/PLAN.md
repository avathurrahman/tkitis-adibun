# KilatKoding Boilerplate — Implementation Plan

> Created: 2026-03-16
> Status: Phase 1 Complete ✅

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

## Phase 3 — Polish

- [ ] Doku integration
- [ ] Sumopod / Mailketing email options
- [ ] MDX blog system
- [ ] Admin dashboard template (`app/(dashboard)/admin/`)
- [ ] `hooks/use-auth.ts`
- [ ] `hooks/use-subscription.ts`
- [ ] CI workflow (`.github/workflows/ci.yml`)

---

## Notes

- Skip `src/` folder migration — not necessary, adds churn without benefit
- Keep `app/auth/` routes as-is (URL prefix `/auth/` must stay — Supabase callback references it)
- Route groups `(marketing)` and `(dashboard)` don't affect URLs
