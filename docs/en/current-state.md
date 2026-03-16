# Current State

## Summary

KilatKoding is a Next.js boilerplate built specifically for Indonesian developers. Phases 1–4 are complete. The repository now includes:

- Next.js App Router with route groups `(marketing)`, `(dashboard)`, and `auth`
- TypeScript
- Tailwind CSS + shadcn/ui
- Supabase browser and server clients
- Cookie-based auth/session refresh
- Email/password login, Google OAuth, and Magic Link (passwordless)
- Dashboard at `/dashboard` (auth-gated)
- Centralized site config (`config/site.ts`)
- Database migrations for `profiles`, `subscriptions`, and `payments`
- Midtrans payment integration (Snap token creation + webhook handler)
- Doku payment integration (JOKUL Checkout + webhook handler)
- Resend email integration with React Email templates (welcome, invoice)
- Client-side auth and subscription hooks (`use-auth`, `use-subscription`)
- AI integration layer: Vercel AI SDK with OpenAI and Anthropic support, usage tracking, and plan-based gating
- Admin dashboard at `/admin` with payment stats and subscription overview
- GitHub Actions CI workflow (lint + build on push/PR)
- MDX blog system at `/blog` with frontmatter, reading time, and tag support
- 43 shadcn/ui components installed (full component library)
- Landing page with Hero, Features, Testimonials, Pricing, FAQ, and CTA sections
- Sticky header with desktop nav, mobile Sheet drawer, Avatar + DropdownMenu auth button
- Dashboard with subscription card, payments table, breadcrumb nav
- Admin dashboard with recharts revenue chart, sortable payments table, pagination
- Settings page at `/dashboard/settings` with profile display and password change
- Billing page at `/dashboard/billing` with plan display and payment flow (Midtrans/Doku)
- Sonner toast notifications wired globally
- Automated tests via Vitest + Testing Library covering API routes, payment providers/webhooks, AI guards, MDX helpers, auth/client hooks, and key forms

## Current Installed Baseline

| Package | Version |
| --- | --- |
| `next` | `16.1.6` |
| `react` | `19.2.4` |
| `react-dom` | `19.2.4` |
| `typescript` | `5.9.3` |
| `tailwindcss` | `3.4.19` |
| `tailwindcss-animate` | `1.0.7` |
| `@supabase/ssr` | `0.9.0` |
| `@supabase/supabase-js` | `2.99.1` |
| `next-themes` | `0.4.6` |
| `lucide-react` | `0.511.0` |
| `midtrans-client` | `1.4.3` |
| `resend` | `6.9.3` |
| `@react-email/components` | `1.0.9` |
| `next-mdx-remote` | `5.x` |
| `gray-matter` | `4.x` |
| `@tailwindcss/typography` | `0.5.x` |
| `ai` | `6` |
| `@ai-sdk/openai` | `3` |
| `@ai-sdk/anthropic` | `3` |
| `@ai-sdk/react` | `3` |

## What Works Today

- The app runs with `npm run dev`
- Linting passes with `npm run lint`
- Landing page at `/` with KilatKoding branding, shared `Header` and `Footer`
- Auth flows: sign up, sign in (password + Google OAuth + Magic Link), forgot password, update password
- Dashboard at `/dashboard` — auth-gated, shows authenticated user info
- Session refresh and auth gating run through `proxy.ts`
- shadcn/ui base components under `components/ui`
- `config/site.ts` and `config/navigation.ts` for centralized site metadata
- `POST /api/payments` — creates a Midtrans Snap transaction, inserts a pending payment record
- `POST /api/webhooks/midtrans` — verifies signature, updates payment + subscription status
- `POST /api/payments/doku` (via `lib/payments/doku.ts`) — creates Doku JOKUL payment URL
- `POST /api/webhooks/doku` — verifies Doku notification, updates payment + subscription status
- `sendEmail()` in `lib/email.ts` — sends React Email templates via Resend
- `emails/welcome.tsx` and `emails/invoice.tsx` — ready-to-use email templates in Bahasa Indonesia
- `useAuth()` in `hooks/use-auth.ts` — client-side user session state with `onAuthStateChange`
- `useSubscription()` in `hooks/use-subscription.ts` — client-side subscription state with `isPro` / `isActive` helpers
- `useAIChat()` in `hooks/use-ai-chat.ts` — client-side AI chat hook wrapping Vercel AI SDK's `useChat`
- `POST /api/ai/chat` — streaming chat endpoint (plan-gated, uses `streamText()`)
- `POST /api/ai/generate` — one-shot text generation endpoint (plan-gated, uses `generateText()`)
- `getModel()` in `lib/ai/provider.ts` — provider-agnostic model factory supporting OpenAI and Anthropic
- `authorizeAIRequest()` in `lib/ai/middleware.ts` — auth + config + usage gate for AI routes
- `trackUsage()` / `getMonthlyUsage()` / `checkUsageLimit()` in `lib/ai/usage.ts` — token usage tracking against plan limits
- Admin dashboard at `/admin` — payment stats, subscription counts, recent payments table (gated by `ADMIN_EMAILS`)
- Blog listing at `/blog` — lists all published MDX posts with date, reading time, and tags
- Blog post detail at `/blog/[slug]` — renders MDX content with Tailwind Typography prose styles
- `getAllPosts()` and `getPostBySlug()` in `lib/mdx.ts` — file-system MDX helpers
- Two sample posts in `content/blog/` (in Bahasa Indonesia)
- `npm run test` — runs 72 automated tests across server-side and client-side feature coverage

## Database Migrations Ready To Apply

Five migration files exist under `supabase/migrations/`:

| File | Creates |
| --- | --- |
| `20260316000001_create_profiles.sql` | `profiles` table + auto-create trigger |
| `20260316000002_create_subscriptions.sql` | `subscriptions` table + auto-create FREE tier trigger |
| `20260316000003_create_payments.sql` | `payments` table + enums (plan, status, provider) |
| `20260316000004_create_waitlist.sql` | `waitlist` table |
| `20260316000005_create_ai_usage.sql` | `ai_usage` table + RLS + index on (user_id, created_at) |

All tables include Row Level Security policies. They have not been applied to a live Supabase project yet.

## What Is Still Missing

- Apply migrations to Supabase and generate TypeScript types
- Sumopod / Mailketing email provider options (future)

## Next Immediate Steps

1. Apply the five SQL migrations to your Supabase project
2. Run `npx supabase gen types typescript --project-id YOUR_ID > types/database.ts`
3. Enable Google OAuth in Supabase dashboard (Authentication > Providers)
4. Add all required keys to `.env.local` (Supabase, Midtrans, Resend, Doku)
5. Add your email to `ADMIN_EMAILS` env var to access `/admin`
