# Source Inventory

This file is a practical reference for the important source files currently in the repository.

## Root Files

| File | Purpose |
| --- | --- |
| `package.json` | Scripts and dependency declarations |
| `next.config.ts` | Next.js config with `cacheComponents: true` |
| `tsconfig.json` | Strict TypeScript config and `@/*` path alias |
| `tailwind.config.ts` | Tailwind theme extensions and plugin registration |
| `components.json` | shadcn/ui project configuration |
| `proxy.ts` | Request-time Supabase session update and auth gating |
| `.env.example` | Required environment variable references |

## Config Files

| File | Purpose |
| --- | --- |
| `config/site.ts` | `siteConfig` — site name, description, base URL |
| `config/navigation.ts` | `marketingNav` and `dashboardNav` link arrays |

## App Router Files

| File | Purpose |
| --- | --- |
| `app/layout.tsx` | Root layout: Geist font, metadata, `lang="id"`, theme provider |
| `app/globals.css` | Tailwind layers and design tokens |
| `app/(marketing)/layout.tsx` | Marketing layout: `Header` + `Footer` wrapper |
| `app/(marketing)/page.tsx` | Landing page — `/` |
| `app/(dashboard)/layout.tsx` | Dashboard layout: `Header` + max-width container |
| `app/(dashboard)/dashboard/page.tsx` | Authenticated dashboard — `/dashboard` |
| `app/auth/login/page.tsx` | Login screen |
| `app/auth/sign-up/page.tsx` | Sign-up screen |
| `app/auth/sign-up-success/page.tsx` | Post-registration instructions |
| `app/auth/forgot-password/page.tsx` | Password reset request screen |
| `app/auth/update-password/page.tsx` | Password update screen |
| `app/auth/error/page.tsx` | Auth error display |
| `app/auth/confirm/route.ts` | Supabase OTP/OAuth verification handler |

## Layout Components

| File | Purpose |
| --- | --- |
| `components/layout/header.tsx` | Site header: logo, `AuthButton`, `ThemeSwitcher` |
| `components/layout/footer.tsx` | Site footer: copyright, `ThemeSwitcher` |

## Auth And Shell Components

| File | Purpose |
| --- | --- |
| `components/auth-button.tsx` | Server-side auth-aware header actions |
| `components/logout-button.tsx` | Sign-out action |
| `components/login-form.tsx` | Sign-in: email/password tab, Magic Link tab, Google OAuth button |
| `components/sign-up-form.tsx` | Registration: Google OAuth button + email/password form |
| `components/forgot-password-form.tsx` | Password reset request form |
| `components/update-password-form.tsx` | Password update form |
| `components/theme-switcher.tsx` | Light/dark/system mode switcher |

## Shared Utility Files

| File | Purpose |
| --- | --- |
| `lib/utils.ts` | `cn()` helper and env-var presence check |
| `lib/supabase/client.ts` | Browser Supabase client factory |
| `lib/supabase/server.ts` | Server Supabase client factory |
| `lib/supabase/proxy.ts` | Session refresh and redirect logic used by `proxy.ts` |
| `lib/email.ts` | `sendEmail()` — Resend wrapper that renders React Email templates and sends via API |

## Payment Library

| File | Purpose |
| --- | --- |
| `lib/payments/midtrans.ts` | Snap + CoreAPI client init, `createSnapTransaction()`, `verifyMidtransSignature()`, `isMidtransPaymentSuccess()` |

## API Routes

| File | Method | Purpose |
| --- | --- | --- |
| `app/api/payments/route.ts` | POST | Auth-gated — creates Midtrans Snap token, inserts pending `payments` record |
| `app/api/webhooks/midtrans/route.ts` | POST | Verifies Midtrans signature, updates `payments.status`, activates subscription on success |

## Email Templates

| File | Purpose |
| --- | --- |
| `emails/welcome.tsx` | Onboarding email — greeting + link to dashboard, in Bahasa Indonesia |
| `emails/invoice.tsx` | Payment confirmation — order ID, plan, itemised amount in Rupiah |

## Database Migrations

| File | Creates |
| --- | --- |
| `supabase/migrations/20260316000001_create_profiles.sql` | `profiles` table + auto-create trigger on signup |
| `supabase/migrations/20260316000002_create_subscriptions.sql` | `subscriptions` table + auto-create FREE trigger on signup |
| `supabase/migrations/20260316000003_create_payments.sql` | `payments` table + enums (plan, payment_status, payment_provider) |

## Installed shadcn/ui Primitives

| File | Purpose |
| --- | --- |
| `components/ui/badge.tsx` | Badge |
| `components/ui/button.tsx` | Button |
| `components/ui/card.tsx` | Card |
| `components/ui/checkbox.tsx` | Checkbox |
| `components/ui/dropdown-menu.tsx` | Dropdown menu |
| `components/ui/input.tsx` | Input |
| `components/ui/label.tsx` | Label |

## Files Pending Creation (Phase 3+)

| File | Phase | Purpose |
| --- | --- | --- |
| `types/database.ts` | After migrations applied | Generated Supabase TypeScript types |
| `lib/payments/doku.ts` | Phase 3 | Doku payment client and helpers |
| `app/api/webhooks/doku/route.ts` | Phase 3 | Doku webhook handler |
| `hooks/use-auth.ts` | Phase 3 | Client-side auth state hook |
| `hooks/use-subscription.ts` | Phase 3 | Client-side subscription state hook |
| `app/(dashboard)/admin/page.tsx` | Phase 3 | Admin dashboard |
| `content/blog/` | Phase 3 | MDX blog content directory |
