# Architecture

## Top-Level Structure

| Path | Purpose |
| --- | --- |
| `app/` | App Router routes, layouts, route handlers, and global styles |
| `app/(marketing)/` | Public-facing pages (landing page) |
| `app/(dashboard)/` | Auth-gated dashboard pages |
| `app/auth/` | Authentication flow pages and OTP route handler |
| `components/` | Reusable UI and auth components |
| `components/layout/` | Shared `Header` and `Footer` components |
| `components/ui/` | shadcn/ui primitives |
| `config/` | Centralized site config and navigation definitions |
| `lib/` | Shared utilities, Supabase client factories, and payment helpers |
| `lib/payments/` | Payment gateway client and helper functions |
| `lib/ai/` | AI provider factory, usage tracking, and middleware |
| `lib/rate-limit.ts` | Shared in-memory rate limiting and response header helpers |
| `app/api/` | API route handlers (payments, webhooks) |
| `emails/` | React Email templates |
| `hooks/` | Client-side React hooks for auth and subscription state |
| `supabase/migrations/` | SQL migration files for database schema |
| `.github/workflows/` | GitHub Actions CI workflows |
| `docs/` | Project documentation (English and Indonesian) |
| `proxy.ts` | Request-time session refresh and auth gating |
| `tailwind.config.ts` | Tailwind content scanning, theme extensions, and plugin setup |
| `components.json` | shadcn/ui project configuration |

## Rendering Model

- Server components are the default for route files in `app/`
- Client components are used for interactive auth forms and theme switching
- Supabase server access is done through `lib/supabase/server.ts`
- Supabase browser access is done through `lib/supabase/client.ts`
- `Suspense` is used around async auth-aware UI (`AuthButton`, `DashboardContent`)

## Route Map

### Marketing Routes (public, `(marketing)` group)

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `app/(marketing)/page.tsx` | KilatKoding landing page |
| `/about` | `app/(marketing)/about/page.tsx` | About KilatKoding |
| `/affiliates` | `app/(marketing)/affiliates/page.tsx` | Affiliates program |
| `/blog` | `app/(marketing)/blog/page.tsx` | MDX blog listing |
| `/blog/[slug]` | `app/(marketing)/blog/[slug]/page.tsx` | MDX blog post detail |
| `/changelog` | `app/(marketing)/changelog/page.tsx` | Product changelog |
| `/checkout` | `app/(marketing)/checkout/page.tsx` | Purchase / checkout flow |
| `/compare` | `app/(marketing)/compare/page.tsx` | Plan comparison |
| `/contact` | `app/(marketing)/contact/page.tsx` | Contact form |
| `/open` | `app/(marketing)/open/page.tsx` | Open startup metrics |
| `/order/[id]` | `app/(marketing)/order/[id]/page.tsx` | Order confirmation / post-purchase |
| `/payment/callback` | `app/payment/callback/route.ts` | Compatibility redirect for payment provider return URLs |
| `/privacy` | `app/(marketing)/privacy/page.tsx` | Privacy policy |
| `/roadmap` | `app/(marketing)/roadmap/page.tsx` | Public product roadmap |
| `/status` | `app/(marketing)/status/page.tsx` | Service status |
| `/terms` | `app/(marketing)/terms/page.tsx` | Terms of service |
| `/use-cases` | `app/(marketing)/use-cases/page.tsx` | Use cases gallery |
| `/waitlist` | `app/(marketing)/waitlist/page.tsx` | Waitlist sign-up |

### Dashboard Routes (auth-gated, `(dashboard)` group)

| Route | File | Purpose |
| --- | --- | --- |
| `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | Main user dashboard |
| `/dashboard/settings` | `app/(dashboard)/dashboard/settings/page.tsx` | Profile + password change |
| `/dashboard/billing` | `app/(dashboard)/dashboard/billing/page.tsx` | Plan display + payment flow |
| `/dashboard/components` | `app/(dashboard)/dashboard/components/page.tsx` | Component showcase for dashboard and admin UI |
| `/admin` | `app/(dashboard)/admin/page.tsx` | Admin dashboard (gated by `user_roles`) |

### Auth Routes

| Route | File / Type | Purpose |
| --- | --- | --- |
| `/auth/login` | Page | Sign-in screen |
| `/auth/sign-up` | Page | Registration screen |
| `/auth/sign-up-success` | Page | Post-registration confirmation |
| `/auth/verify-email` | Page | Email verification instructions |
| `/auth/forgot-password` | Page | Password reset request |
| `/auth/update-password` | Page | New password form |
| `/auth/error` | Page | Auth error display |
| `/auth/confirm` | Route handler | OTP/OAuth callback |

### API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/payments` | POST | Creates a payment session (Midtrans Snap token or Doku checkout URL), inserts pending payment |
| `/api/profile` | POST | Updates the authenticated user's profile fields |
| `/api/subscription` | POST | Handles self-serve cancel/resume subscription actions |
| `/api/webhooks/midtrans` | POST | Verifies signature, updates payment + subscription |
| `/api/webhooks/doku` | POST | Verifies notification, updates payment + subscription |
| `/api/contact` | POST | Contact form submission handler |
| `/api/waitlist` | POST | Waitlist sign-up handler |
| `/api/ai/chat` | POST | Streaming chat (auth + plan-gated) |
| `/api/ai/generate` | POST | One-shot text generation (auth + plan-gated) |

### App-Level Files

| File | Purpose |
| --- | --- |
| `app/error.tsx` | Root error boundary |
| `app/not-found.tsx` | Global 404 page |
| `app/robots.ts` | Robots.txt dynamic generation |
| `app/sitemap.ts` | XML sitemap dynamic generation |
| `app/(marketing)/loading.tsx` | Marketing section skeleton loading state |

## Route Groups Explained

Route groups use parentheses in the folder name and do not affect the URL. They exist purely to apply different layouts to different sections of the app.

- `app/(marketing)/` — uses `MarketingLayout` (full-width, `Header` + `Footer`)
- `app/(dashboard)/` — uses `DashboardLayout` (max-width container, `Header` with auth actions)
- `app/auth/` — no shared layout; each auth page owns its own centering and card structure

## Layouts

### Root Layout

`app/layout.tsx` is responsible for:

- Loading the Geist font from Google Fonts
- Defining global metadata (`lang="id"`, default Open Graph/Twitter, canonical base URL)
- Injecting `app/globals.css`
- Wrapping the app in `ThemeProvider` from `next-themes`

### Marketing Layout

`app/(marketing)/layout.tsx`:

- Renders `Header` (site name + auth actions + theme switcher)
- Renders `Footer` (copyright + theme switcher)
- Wraps `children` in a `flex-col min-h-screen` container

### Dashboard Layout

`app/(dashboard)/layout.tsx`:

- Same `Header` structure as marketing
- Wraps `children` in a `max-w-5xl` centered container with padding

## Styling System

- Tailwind CSS utility classes
- CSS custom properties in `app/globals.css`
- shadcn/ui with the `new-york` style, base color `neutral`
- `tailwindcss-animate` for animation helpers
- Theme switching uses the `class` strategy through `next-themes`
- Path aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/config`

## Component Layers

### Layout Components

| File | Purpose |
| --- | --- |
| `components/layout/header.tsx` | Shared site header with branding, `AuthButton`, and `ThemeSwitcher` |
| `components/layout/footer.tsx` | Shared footer with copyright and `ThemeSwitcher` |
| `components/layout/desktop-nav.tsx` | Desktop navigation bar links |
| `components/layout/current-year.tsx` | Dynamic copyright year (client component) |

### App-Level Components

| File | Purpose |
| --- | --- |
| `components/auth-button.tsx` | Server-side auth-aware nav actions |
| `components/theme-switcher.tsx` | Light/dark/system mode switcher |

### Auth Components

| File | Purpose |
| --- | --- |
| `components/login-form.tsx` | Sign-in form: password tab, Magic Link tab, Google OAuth button |
| `components/sign-up-form.tsx` | Registration form: Google OAuth button + email/password |
| `components/forgot-password-form.tsx` | Password reset request form |
| `components/update-password-form.tsx` | Password update form |
| `components/logout-button.tsx` | Sign-out action button |
| `components/auth/supabase-env-notice.tsx` | Warning banner when Supabase env vars are missing |
| `components/contact-form.tsx` | Contact form with fields and submission handling |

### Landing Page Sections

| File | Purpose |
| --- | --- |
| `components/sections/hero.tsx` | Hero section |
| `components/sections/features.tsx` | Features section |
| `components/sections/pricing.tsx` | Pricing section |
| `components/sections/testimonials.tsx` | Testimonials section |
| `components/sections/faq.tsx` | FAQ section |
| `components/sections/cta.tsx` | Call-to-action section |
| `components/sections/ai-optimized.tsx` | AI-Optimized feature section |
| `components/sections/pain-points.tsx` | Pain points section |
| `components/sections/tech-stack.tsx` | Tech stack showcase section |
| `components/sections/timeline.tsx` | Product timeline / roadmap section |

### Dashboard Components

| File | Purpose |
| --- | --- |
| `components/dashboard/subscription-card.tsx` | Displays current plan and subscription status |
| `components/dashboard/payments-table.tsx` | Table of past payments |
| `components/dashboard/admin-revenue-chart.tsx` | Revenue chart for admin dashboard |
| `components/dashboard/payment-button.tsx` | Triggers payment flow (Midtrans/Doku) |

### Docs Page Components

| File | Purpose |
| --- | --- |
| `components/docs/component-demo.tsx` | Renders live shadcn/ui component previews |
| `components/docs/tab-controls.tsx` | Controls tab for component docs page |
| `components/docs/tab-data.tsx` | Data display tab |
| `components/docs/tab-forms.tsx` | Form components tab |
| `components/docs/tab-foundations.tsx` | Foundation primitives tab |
| `components/docs/tab-navigation.tsx` | Navigation components tab |
| `components/docs/tab-overlays.tsx` | Overlay components tab |

### shadcn/ui Primitives

Currently installed (44 total): `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `label`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `template-banner`, `textarea`, `toggle`, `toggle-group`, `tooltip`

## Hooks Layer

| File | Purpose |
| --- | --- |
| `hooks/use-auth.ts` | Subscribes to `onAuthStateChange`; returns `{ user, loading }` |
| `hooks/use-subscription.ts` | Fetches subscription row for current user; returns `{ subscription, loading, isPro, isActive }` |
| `hooks/use-payment.ts` | Client-side payment state and Midtrans/Doku flow helpers |
| `hooks/use-ai-chat.ts` | AI chat state via Vercel AI SDK's `useChat` with `DefaultChatTransport` |

## Payment Layer

| File | Purpose |
| --- | --- |
| `lib/payments/midtrans.ts` | Snap + CoreAPI client init, `createSnapTransaction()`, `verifyMidtransSignature()`, `isMidtransPaymentSuccess()` |
| `lib/payments/doku.ts` | Doku JOKUL HTTP client, `createDokuPayment()`, `verifyDokuNotification()`, `isDokuPaymentSuccess()` |

## Email Layer

| File | Purpose |
| --- | --- |
| `lib/email.ts` | `sendEmail()` — renders React Email template to HTML, sends via Resend |
| `emails/welcome.tsx` | Onboarding email template in Bahasa Indonesia |
| `emails/invoice.tsx` | Payment confirmation email with itemised Rupiah amounts |

## AI Layer

| File | Purpose |
| --- | --- |
| `lib/ai/provider.ts` | `getModel()` — resolves the active AI model from `AI_DEFAULT_PROVIDER`; supports OpenAI and Anthropic |
| `lib/ai/usage.ts` | `trackUsage()` — inserts token counts into `ai_usage`; `getMonthlyUsage()` and `checkUsageLimit()` enforce plan caps |
| `lib/ai/middleware.ts` | `authorizeAIRequest()` — verifies auth session, checks provider key is set, and enforces token budget before AI routes run |

## Config Layer

| File | Purpose |
| --- | --- |
| `config/site.ts` | `siteConfig` — site name, description, base URL |
| `config/navigation.ts` | `marketingNav` and `dashboardNav` link arrays |

## Database Schema

Migrations are in `supabase/migrations/`. Five core tables plus one access-control table are defined:

| Table | Key Columns | Notes |
| --- | --- | --- |
| `profiles` | `id` (FK → `auth.users`), `full_name`, `avatar_url` | Auto-created on user signup via trigger |
| `subscriptions` | `user_id`, `plan` (enum), `status` (enum) | Starts as FREE; auto-created on signup via trigger |
| `payments` | `user_id`, `amount` (IDR), `plan`, `provider` (MIDTRANS/DOKU), `external_id` | Supports Midtrans and Doku with server-owned plan metadata |
| `ai_usage` | `user_id`, `provider`, `model`, `prompt_tokens`, `completion_tokens` | Tracks per-user AI token usage; indexed by (user_id, created_at) |
| `user_roles` | `user_id`, `role` (`member`/`admin`) | Source of truth for admin access |

All tables have Row Level Security enabled with user-scoped read policies.

## Important Config Choices

### Next.js

`next.config.ts` enables `cacheComponents: true`.

### TypeScript

`tsconfig.json` enables `strict: true`, path alias `@/*`, bundler module resolution.

### ESLint

`eslint.config.mjs` extends `next/core-web-vitals` and `next/typescript`, and ignores `.next/**`.

## Current Architectural Gaps

- No TypeScript types generated from Supabase schema yet (needs live project with migrations applied)
- No domain/service layer (queries live directly in page components for now)
- No dedicated rate limiting or file upload layer yet
