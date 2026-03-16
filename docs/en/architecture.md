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
| `app/api/` | API route handlers (payments, webhooks) |
| `emails/` | React Email templates |
| `supabase/migrations/` | SQL migration files for database schema |
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

| Route | Group | Type | Purpose |
| --- | --- | --- | --- |
| `/` | `(marketing)` | Page | KilatKoding landing page |
| `/dashboard` | `(dashboard)` | Page | Authenticated user dashboard |
| `/auth/login` | — | Page | Sign-in screen (password, Google OAuth, Magic Link) |
| `/auth/sign-up` | — | Page | Registration screen (email/password + Google OAuth) |
| `/auth/sign-up-success` | — | Page | Confirmation notice after sign-up |
| `/auth/forgot-password` | — | Page | Password reset request screen |
| `/auth/update-password` | — | Page | New password form after reset flow |
| `/auth/error` | — | Page | Error display for auth-related failures |
| `/auth/confirm` | — | Route handler | OTP/OAuth callback — verifies token, redirects on success or failure |
| `/api/payments` | — | Route handler | Creates Midtrans Snap token, inserts pending payment record |
| `/api/webhooks/midtrans` | — | Route handler | Verifies Midtrans signature, updates payment and subscription status |

## Route Groups Explained

Route groups use parentheses in the folder name and do not affect the URL. They exist purely to apply different layouts to different sections of the app.

- `app/(marketing)/` — uses `MarketingLayout` (full-width, `Header` + `Footer`)
- `app/(dashboard)/` — uses `DashboardLayout` (max-width container, `Header` with auth actions)
- `app/auth/` — no shared layout; each auth page owns its own centering and card structure

## Layouts

### Root Layout

`app/layout.tsx` is responsible for:

- Loading the Geist font from Google Fonts
- Defining global metadata (title: "KilatKoding", `lang="id"`)
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

### shadcn/ui Primitives

Currently installed: `badge`, `button`, `card`, `checkbox`, `dropdown-menu`, `input`, `label`

## Payment Layer

| File | Purpose |
| --- | --- |
| `lib/payments/midtrans.ts` | Snap + CoreAPI client init, `createSnapTransaction()`, `verifyMidtransSignature()`, `isMidtransPaymentSuccess()` |

## Email Layer

| File | Purpose |
| --- | --- |
| `lib/email.ts` | `sendEmail()` — renders React Email template to HTML, sends via Resend |
| `emails/welcome.tsx` | Onboarding email template in Bahasa Indonesia |
| `emails/invoice.tsx` | Payment confirmation email with itemised Rupiah amounts |

## Config Layer

| File | Purpose |
| --- | --- |
| `config/site.ts` | `siteConfig` — site name, description, base URL |
| `config/navigation.ts` | `marketingNav` and `dashboardNav` link arrays |

## Database Schema

Migrations are in `supabase/migrations/`. Three tables are defined:

| Table | Key Columns | Notes |
| --- | --- | --- |
| `profiles` | `id` (FK → `auth.users`), `full_name`, `avatar_url` | Auto-created on user signup via trigger |
| `subscriptions` | `user_id`, `plan` (enum), `status` (enum) | Starts as FREE; auto-created on signup via trigger |
| `payments` | `user_id`, `amount` (IDR), `provider` (MIDTRANS/DOKU), `external_id` | Supports Midtrans and Doku |

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
- No tests
- Doku payment integration not yet implemented (Phase 3)
