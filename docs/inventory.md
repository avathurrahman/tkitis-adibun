# Source Inventory

This file is a practical reference for the important source files currently in the repository.

## Root Files

| File | Purpose |
| --- | --- |
| `README.md` | Upstream starter README from the Supabase template |
| `package.json` | Scripts and dependency declarations |
| `next.config.ts` | Next.js config with `cacheComponents: true` |
| `tsconfig.json` | Strict TypeScript config and `@/*` path alias |
| `tailwind.config.ts` | Tailwind theme extensions and plugin registration |
| `components.json` | shadcn/ui project configuration |
| `proxy.ts` | Request-time Supabase session update and auth gating |
| `.env.example` | Required public Supabase environment variables |

## App Router Files

| File | Purpose |
| --- | --- |
| `app/layout.tsx` | Root layout, metadata, Geist font, and theme provider |
| `app/globals.css` | Tailwind layers and design tokens |
| `app/page.tsx` | Landing page with starter hero and guidance |
| `app/protected/layout.tsx` | Shared shell for authenticated area |
| `app/protected/page.tsx` | Protected page showing current user claims |
| `app/auth/login/page.tsx` | Login screen |
| `app/auth/sign-up/page.tsx` | Sign-up screen |
| `app/auth/sign-up-success/page.tsx` | Post-registration instructions |
| `app/auth/forgot-password/page.tsx` | Password reset request screen |
| `app/auth/update-password/page.tsx` | Password update screen |
| `app/auth/error/page.tsx` | Auth error display |
| `app/auth/confirm/route.ts` | Supabase OTP verification handler |

## Shared Utility Files

| File | Purpose |
| --- | --- |
| `lib/utils.ts` | `cn()` helper and env-var presence check |
| `lib/supabase/client.ts` | Browser Supabase client factory |
| `lib/supabase/server.ts` | Server Supabase client factory |
| `lib/supabase/proxy.ts` | Session refresh and redirect logic used by `proxy.ts` |

## Auth And Shell Components

| File | Purpose |
| --- | --- |
| `components/auth-button.tsx` | Server-side auth-aware header actions |
| `components/logout-button.tsx` | Sign-out action |
| `components/login-form.tsx` | Email/password sign-in form |
| `components/sign-up-form.tsx` | Email/password registration form |
| `components/forgot-password-form.tsx` | Password reset request form |
| `components/update-password-form.tsx` | Password update form |
| `components/env-var-warning.tsx` | Warns when Supabase env vars are missing |
| `components/theme-switcher.tsx` | Light/dark/system mode switcher |
| `components/hero.tsx` | Starter landing-page hero section |
| `components/deploy-button.tsx` | Template deployment CTA |

## Tutorial Components

These are starter-specific and can be removed once real feature onboarding replaces them.

| File | Purpose |
| --- | --- |
| `components/tutorial/connect-supabase-steps.tsx` | Guides initial Supabase connection |
| `components/tutorial/fetch-data-steps.tsx` | Shows next-step data-fetch guidance |
| `components/tutorial/sign-up-user-steps.tsx` | Shows sign-up-related starter guidance |
| `components/tutorial/tutorial-step.tsx` | Shared tutorial presentation component |
| `components/tutorial/code-block.tsx` | Code block formatting helper for tutorial content |

## Installed shadcn/ui Primitives

| File | Purpose |
| --- | --- |
| `components/ui/badge.tsx` | Badge primitive |
| `components/ui/button.tsx` | Button primitive |
| `components/ui/card.tsx` | Card primitive |
| `components/ui/checkbox.tsx` | Checkbox primitive |
| `components/ui/dropdown-menu.tsx` | Dropdown menu primitive |
| `components/ui/input.tsx` | Input primitive |
| `components/ui/label.tsx` | Label primitive |

## Current Cleanup Opportunities

These are not urgent, but they are visible in the repository today:

- The root `README.md` still describes the upstream starter more than this specific app
- Starter tutorial content is still present on the landing and protected pages
- There are no domain-specific folders yet because no application modules have been added
