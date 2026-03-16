# Changelog

## 2026-03-16 — Phase 1 & 2 Complete, Docs Updated

### Phase 1: Route Groups, Auth Enhancements, Database Schema

- Added `config/site.ts` and `config/navigation.ts`
- Created `(marketing)` and `(dashboard)` route groups with layouts
- Rewrote `components/login-form.tsx` — Google OAuth, email/password, Magic Link tabs
- Rewrote `components/sign-up-form.tsx` — Google OAuth + email/password
- Created `app/(dashboard)/dashboard/page.tsx` — auth-gated dashboard
- Added DB migrations: `profiles`, `subscriptions`, `payments` tables with RLS + auto-triggers
- Removed template/demo components and replaced `/protected` with `/dashboard`
- Updated `app/layout.tsx` metadata to KilatKoding, `lang="id"`

### Phase 2: Midtrans Payment + Resend Email

- Added `lib/payments/midtrans.ts` — Snap + CoreAPI client, transaction creation, signature verification
- Added `app/api/payments/route.ts` — auth-gated Snap token endpoint
- Added `app/api/webhooks/midtrans/route.ts` — webhook handler with HMAC-SHA512 verification
- Added `lib/email.ts` — Resend wrapper using React Email's `render()`
- Added `emails/welcome.tsx` — onboarding email template in Bahasa Indonesia
- Added `emails/invoice.tsx` — payment confirmation email with Rupiah formatting
- Installed: `midtrans-client`, `resend`, `@react-email/components`

### Docs Updated (both EN and ID)

- `docs/en/current-state.md`, `docs/id/current-state.md`
- `docs/en/inventory.md`, `docs/id/inventory.md`
- `docs/en/setup-and-development.md`, `docs/id/setup-and-development.md`
- `docs/en/architecture.md`, `docs/id/architecture.md`
