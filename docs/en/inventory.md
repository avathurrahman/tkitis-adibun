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
| `app/(dashboard)/admin/page.tsx` | Admin dashboard — `/admin` (gated by `ADMIN_EMAILS`) |
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

## Hooks

| File | Purpose |
| --- | --- |
| `hooks/use-auth.ts` | Client-side user session state with `onAuthStateChange` listener |
| `hooks/use-subscription.ts` | Client-side subscription state; exposes `isPro` and `isActive` helpers |

## Payment Library

| File | Purpose |
| --- | --- |
| `lib/payments/midtrans.ts` | Snap + CoreAPI client init, `createSnapTransaction()`, `verifyMidtransSignature()`, `isMidtransPaymentSuccess()` |
| `lib/payments/doku.ts` | Doku JOKUL client, `createDokuPayment()`, `verifyDokuNotification()`, `isDokuPaymentSuccess()` |

## API Routes

| File | Method | Purpose |
| --- | --- | --- |
| `app/api/payments/route.ts` | POST | Auth-gated — creates Midtrans Snap token, inserts pending `payments` record |
| `app/api/webhooks/midtrans/route.ts` | POST | Verifies Midtrans signature, updates `payments.status`, activates subscription on success |
| `app/api/webhooks/doku/route.ts` | POST | Verifies Doku notification, updates `payments.status`, activates subscription on success |

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

## CI / Infrastructure

| File | Purpose |
| --- | --- |
| `.github/workflows/ci.yml` | GitHub Actions: lint + build on push and PR to `main` |

## Blog

| File | Purpose |
| --- | --- |
| `lib/mdx.ts` | `getAllPosts()` and `getPostBySlug()` — file-system MDX helpers with frontmatter and reading time |
| `app/(marketing)/blog/page.tsx` | Blog listing — `/blog` |
| `app/(marketing)/blog/[slug]/page.tsx` | Blog post detail — `/blog/[slug]` |
| `content/blog/memulai-dengan-kilatkoding.mdx` | Sample post: getting started guide |
| `content/blog/integrasi-midtrans-nextjs.mdx` | Sample post: Midtrans integration tutorial |

## Files Pending Creation (Future)

| File | Purpose |
| --- | --- |
| `types/database.ts` | Generated Supabase TypeScript types (run after migrations are applied) |
