# AI-Optimized Boilerplate Audit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the KilatKoding boilerplate fully deliver on its "AI-Optimized" promise by fixing stale documentation and adding missing AI tool config files.

**Architecture:** Three layers of work — (1) fix the README, (2) sync all AI context docs (CLAUDE.md, AGENTS.md, docs/en/, docs/id/) to match the actual codebase, (3) add missing AI tool config files for Copilot, Cursor, and Windsurf.

**Tech Stack:** Markdown only. No code changes needed — this is entirely a documentation and config-file task.

---

## Audit Summary

### What Was Promised vs What Exists

| Promise | Status | Gap |
| --- | --- | --- |
| Claude Code rules included | ✅ `CLAUDE.md` exists | Minor staleness |
| CLAUDE.md file set up | ✅ Exists | `Important Files` section slightly outdated |
| AI-friendly code structure | ✅ Passes lint, strict TS | No code changes needed |
| Clear documentation for AI context | ❌ Stale | 15+ routes and 20+ components missing from docs |
| GitHub Copilot compatible | ❌ Missing | No `.github/copilot-instructions.md` |
| Cursor compatible | ❌ Missing | No `.cursorrules` |
| Windsurf compatible | ❌ Missing | No `.windsurfrules` |
| KilatKoding README | ❌ Wrong | README.md is still the Supabase starter README |

### New Routes Added But Not Documented

These exist in `app/` but are absent from `AGENTS.md` and `docs/en/architecture.md`:

- `/about` → `app/(marketing)/about/page.tsx`
- `/affiliates` → `app/(marketing)/affiliates/page.tsx`
- `/blog` → `app/(marketing)/blog/page.tsx` (already in inventory but not route map)
- `/changelog` → `app/(marketing)/changelog/page.tsx`
- `/checkout` → `app/(marketing)/checkout/page.tsx`
- `/compare` → `app/(marketing)/compare/page.tsx`
- `/contact` → `app/(marketing)/contact/page.tsx`
- `/open` → `app/(marketing)/open/page.tsx`
- `/roadmap` → `app/(marketing)/roadmap/page.tsx`
- `/status` → `app/(marketing)/status/page.tsx`
- `/use-cases` → `app/(marketing)/use-cases/page.tsx`
- `/waitlist` → `app/(marketing)/waitlist/page.tsx`
- `app/(marketing)/loading.tsx` (marketing skeleton loading state)
- `app/auth/verify-email/page.tsx`
- `app/error.tsx` (root error boundary)
- `app/not-found.tsx` (global 404)
- `app/robots.ts` (SEO)
- `app/sitemap.ts` (SEO)

### New API Routes Not Documented

- `app/api/contact/route.ts` — POST, handles contact form submissions
- `app/api/waitlist/route.ts` — POST, handles waitlist sign-ups

### New Components Not in inventory.md

- `components/auth/supabase-env-notice.tsx`
- `components/contact-form.tsx`
- `components/docs/component-demo.tsx`
- `components/docs/tab-controls.tsx`
- `components/docs/tab-data.tsx`
- `components/docs/tab-forms.tsx`
- `components/docs/tab-foundations.tsx`
- `components/docs/tab-navigation.tsx`
- `components/docs/tab-overlays.tsx`
- `components/layout/current-year.tsx`
- `components/layout/desktop-nav.tsx`
- `components/sections/ai-optimized.tsx`
- `components/sections/pain-points.tsx`
- `components/sections/tech-stack.tsx`
- `components/sections/timeline.tsx`
- `components/ui/template-banner.tsx`

### New Hooks Not Documented

- `hooks/use-payment.ts`

---

## Task 1: Rewrite README.md

**Files:**
- Modify: `README.md`

This is the first file any AI tool reads when cloning the repo. Currently it's the upstream Supabase starter README — completely wrong context for KilatKoding.

**Step 1: Read all current docs for reference**

Read these files to gather facts before writing:
- `docs/en/current-state.md`
- `docs/en/architecture.md`
- `docs/en/setup-and-development.md`
- `.env.example`

**Step 2: Write the new README.md**

Replace the entire contents with a KilatKoding-branded README. Must include:

```markdown
# KilatKoding

Next.js boilerplate untuk Indonesian developers yang mau build SaaS cepat.
Dioptimalkan untuk AI tools — Claude Code, GitHub Copilot, Cursor, dan Windsurf.

## Tech Stack

- Next.js 16 App Router + TypeScript (strict)
- Tailwind CSS + shadcn/ui (43 components)
- Supabase SSR auth (email/password, Google OAuth, Magic Link)
- Midtrans + Doku payment integration
- Resend + React Email
- MDX blog system

## Quick Start

\`\`\`bash
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
npm run dev
\`\`\`

## Environment Variables

See `.env.example` for all required variables.

## Docs

- [English docs](./docs/en/README.md)
- [Dokumentasi Bahasa Indonesia](./docs/id/README.md)
- [Architecture](./docs/en/architecture.md)
- [Setup guide](./docs/en/setup-and-development.md)

## AI Tools

- **Claude Code** — `CLAUDE.md` and `AGENTS.md` provide full project context
- **GitHub Copilot** — `.github/copilot-instructions.md`
- **Cursor** — `.cursorrules`
- **Windsurf** — `.windsurfrules`
```

**Step 3: Verify**

```bash
npm run lint
```
Expected: no errors (README is not linted but confirms nothing is broken).

---

## Task 2: Update AGENTS.md Route Map

**Files:**
- Modify: `AGENTS.md` (lines 67–91, the route list section)

**Step 1: Read current AGENTS.md**

The current route list (lines ~67–91) only has the original 9 auth/dashboard routes. It is missing all marketing funnel pages.

**Step 2: Replace the route list section**

Find the `## Current Architecture` → `Important current routes:` block and replace the route list with:

```markdown
Important current routes:

Marketing (public):
- `/` — KilatKoding landing page
- `/about` — About page
- `/affiliates` — Affiliates program page
- `/blog` — MDX blog listing
- `/blog/[slug]` — MDX blog post detail
- `/changelog` — Product changelog
- `/checkout` — Checkout / purchase flow
- `/compare` — Comparison page
- `/contact` — Contact form page
- `/open` — Open metrics / startup stats
- `/privacy` — Privacy policy
- `/roadmap` — Public product roadmap
- `/status` — Service status page
- `/terms` — Terms of service
- `/use-cases` — Use cases gallery
- `/waitlist` — Waitlist sign-up

Dashboard (auth-gated):
- `/dashboard` — Main user dashboard
- `/dashboard/settings` — Profile + password change
- `/dashboard/billing` — Plan display + payment flow
- `/admin` — Admin dashboard (gated by ADMIN_EMAILS env var)

Auth:
- `/auth/login`
- `/auth/sign-up`
- `/auth/sign-up-success`
- `/auth/verify-email`
- `/auth/forgot-password`
- `/auth/update-password`
- `/auth/error`
- `/auth/confirm` — OTP/OAuth callback route handler

API:
- `POST /api/payments` — Creates Midtrans Snap token, inserts pending payment record
- `POST /api/webhooks/midtrans` — Verifies signature, updates payment + subscription
- `POST /api/webhooks/doku` — Verifies notification, updates payment + subscription
- `POST /api/contact` — Contact form handler
- `POST /api/waitlist` — Waitlist sign-up handler
```

**Step 3: Verify the file is valid Markdown**

```bash
npm run lint
```

---

## Task 3: Update docs/en/architecture.md Route Map

**Files:**
- Modify: `docs/en/architecture.md`

**Step 1: Read current architecture.md**

The route map table (lines ~36–51) is missing all marketing funnel pages.

**Step 2: Replace the route map table**

Find the `## Route Map` section and replace the table with:

```markdown
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
| `/admin` | `app/(dashboard)/admin/page.tsx` | Admin dashboard (gated by ADMIN_EMAILS) |

### Auth Routes

| Route | Type | Purpose |
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
| `/api/payments` | POST | Creates Midtrans Snap token, inserts pending payment |
| `/api/webhooks/midtrans` | POST | Verifies signature, updates payment + subscription |
| `/api/webhooks/doku` | POST | Verifies notification, updates payment + subscription |
| `/api/contact` | POST | Contact form submission handler |
| `/api/waitlist` | POST | Waitlist sign-up handler |

### App-Level Files

| File | Purpose |
| --- | --- |
| `app/error.tsx` | Root error boundary |
| `app/not-found.tsx` | Global 404 page |
| `app/robots.ts` | Robots.txt generation |
| `app/sitemap.ts` | XML sitemap generation |
| `app/(marketing)/loading.tsx` | Marketing section skeleton loading state |
```

**Step 3: Update the Component Layers section**

After the route map, find `### Layout Components` and add the missing components:

Under **Layout Components** add:
```markdown
| `components/layout/desktop-nav.tsx` | Desktop navigation bar links |
| `components/layout/current-year.tsx` | Dynamic copyright year (client) |
```

Add a new **Auth Components** sub-section:
```markdown
| `components/auth/supabase-env-notice.tsx` | Warning banner when Supabase env vars are missing |
```

Add new section **Docs/Components Page Components**:
```markdown
| `components/docs/component-demo.tsx` | Renders live shadcn/ui component previews |
| `components/docs/tab-controls.tsx` | Controls tab for component docs page |
| `components/docs/tab-data.tsx` | Data display tab |
| `components/docs/tab-forms.tsx` | Form components tab |
| `components/docs/tab-foundations.tsx` | Foundation primitives tab |
| `components/docs/tab-navigation.tsx` | Navigation components tab |
| `components/docs/tab-overlays.tsx` | Overlay components tab |
```

Under **Landing Page Sections**, add:
```markdown
| `components/sections/ai-optimized.tsx` | AI-Optimized feature section |
| `components/sections/pain-points.tsx` | Pain points section |
| `components/sections/tech-stack.tsx` | Tech stack showcase section |
| `components/sections/timeline.tsx` | Product timeline / roadmap section |
```

Under **Hooks Layer** add:
```markdown
| `hooks/use-payment.ts` | Client-side payment state and Midtrans/Doku flow helpers |
```

---

## Task 4: Update docs/en/inventory.md

**Files:**
- Modify: `docs/en/inventory.md`

**Step 1: Read current inventory.md**

The file needs new entries for all the undocumented files found in the audit.

**Step 2: Add missing App Router entries**

In the `## App Router Files` table, add after the existing marketing entries:

```markdown
| `app/(marketing)/about/page.tsx` | About page — `/about` |
| `app/(marketing)/affiliates/page.tsx` | Affiliates program — `/affiliates` |
| `app/(marketing)/changelog/page.tsx` | Changelog — `/changelog` |
| `app/(marketing)/checkout/page.tsx` | Checkout flow — `/checkout` |
| `app/(marketing)/compare/page.tsx` | Plan comparison — `/compare` |
| `app/(marketing)/contact/page.tsx` | Contact form page — `/contact` |
| `app/(marketing)/loading.tsx` | Marketing skeleton loading state |
| `app/(marketing)/open/page.tsx` | Open metrics — `/open` |
| `app/(marketing)/roadmap/page.tsx` | Product roadmap — `/roadmap` |
| `app/(marketing)/status/page.tsx` | Service status — `/status` |
| `app/(marketing)/use-cases/page.tsx` | Use cases gallery — `/use-cases` |
| `app/(marketing)/waitlist/page.tsx` | Waitlist sign-up — `/waitlist` |
| `app/auth/verify-email/page.tsx` | Email verification instructions |
| `app/error.tsx` | Root error boundary |
| `app/not-found.tsx` | Global 404 page |
| `app/robots.ts` | Robots.txt dynamic generation |
| `app/sitemap.ts` | XML sitemap dynamic generation |
```

**Step 3: Add missing API route entries**

In the `## API Routes` table, add:

```markdown
| `app/api/contact/route.ts` | POST | Contact form — saves submission, sends notification email |
| `app/api/waitlist/route.ts` | POST | Waitlist — saves email to waitlist table |
```

**Step 4: Add missing component entries**

Add new sections or add to existing sections for:
- `components/auth/supabase-env-notice.tsx`
- `components/contact-form.tsx`
- `components/docs/` (all 6 tab files + component-demo)
- `components/layout/desktop-nav.tsx`
- `components/layout/current-year.tsx`
- `components/sections/ai-optimized.tsx`, `pain-points.tsx`, `tech-stack.tsx`, `timeline.tsx`
- `components/ui/template-banner.tsx`
- `hooks/use-payment.ts`

**Step 5: Remove stale entry**

Remove the `## Files Pending Creation (Future)` section entry for `types/database.ts` only if that file was created. Check:
```bash
ls /path/to/types/
```

---

## Task 5: Update CLAUDE.md Important Files Section

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Read current CLAUDE.md**

The `## Important Files` section (lines 53–62) references the old protected page and old Supabase clients but is missing the config layer, hooks, and payment files that are now important.

**Step 2: Replace the Important Files section**

```markdown
## Important Files

- `app/layout.tsx`: root layout, metadata, theme provider
- `app/(marketing)/page.tsx`: KilatKoding landing page
- `app/(dashboard)/dashboard/page.tsx`: authenticated dashboard
- `app/auth/confirm/route.ts`: OTP/OAuth verification route handler
- `lib/supabase/server.ts`: server Supabase client
- `lib/supabase/client.ts`: browser Supabase client
- `lib/supabase/proxy.ts`: auth/session synchronization
- `proxy.ts`: route matcher and request-time proxy entrypoint
- `config/site.ts`: centralized site metadata
- `config/navigation.ts`: nav link definitions
- `lib/payments/midtrans.ts`: Midtrans Snap client and helpers
- `lib/payments/doku.ts`: Doku JOKUL client and helpers
- `lib/email.ts`: Resend + React Email wrapper
- `hooks/use-auth.ts`: client-side auth state hook
- `hooks/use-subscription.ts`: client-side subscription state hook
- `components/ui/`: installed shadcn/ui primitives (43 total)
- `supabase/migrations/`: SQL migration files
```

---

## Task 6: Add .github/copilot-instructions.md

**Files:**
- Create: `.github/copilot-instructions.md`

This file is loaded by GitHub Copilot and Copilot Chat for repository context. It should give Copilot the same level of context that `CLAUDE.md` gives Claude.

**Step 1: Create the file**

```markdown
# GitHub Copilot Instructions

This is **KilatKoding** — a Next.js SaaS boilerplate for Indonesian developers.

## Stack

- Next.js 16 App Router, TypeScript strict mode
- Tailwind CSS + shadcn/ui (new-york style, neutral base)
- Supabase SSR auth (email/password, Google OAuth, Magic Link)
- Midtrans + Doku payment gateways (Indonesian payment providers)
- Resend + React Email (templates in Bahasa Indonesia)
- MDX blog system

## Key Conventions

- **Server components by default.** Only use `"use client"` for interactivity, effects, or browser APIs.
- **Auth**: Use `lib/supabase/server.ts` server-side, `lib/supabase/client.ts` browser-side. Never bypass `proxy.ts`.
- **Styling**: Tailwind utility classes + `cn()` from `lib/utils.ts`. CSS variables in `app/globals.css`.
- **UI**: Reuse `components/ui/` primitives before creating custom base components.
- **Config**: Site metadata in `config/site.ts`, navigation in `config/navigation.ts`.
- **Payments**: IDR amounts (Rupiah). Midtrans = Snap for web, Doku = JOKUL redirect.
- **Database**: Three tables — `profiles`, `subscriptions`, `payments`. All have Row Level Security.

## Route Groups

- `app/(marketing)/` — public pages, uses `MarketingLayout` (Header + Footer)
- `app/(dashboard)/` — auth-gated, uses `DashboardLayout`
- `app/auth/` — auth flow pages, no shared layout

## Do Not

- Move Supabase clients into global mutable state
- Break `proxy.ts` cookie synchronization
- Add `"use client"` to components that don't need it
- Hardcode API keys or secrets
```

**Step 2: Verify**

```bash
npm run lint
```

---

## Task 7: Add .cursorrules

**Files:**
- Create: `.cursorrules`

Cursor reads `.cursorrules` from the project root for project-specific AI rules.

**Step 1: Create the file**

```
# KilatKoding — Cursor Rules

## Project Context
Next.js 16 SaaS boilerplate for Indonesian developers.
Stack: Next.js App Router, TypeScript strict, Tailwind CSS, shadcn/ui, Supabase SSR auth, Midtrans/Doku payments.

## Component Rules
- Default to Server Components. Add "use client" only when using hooks, event handlers, or browser APIs.
- Import from @/components/ui/ before creating new base UI components (43 shadcn/ui components available).
- Use cn() from @/lib/utils for conditional class names.

## Data Access Rules
- Server-side Supabase: import from @/lib/supabase/server
- Client-side Supabase: import from @/lib/supabase/client
- Never import server client in client components.

## Naming Conventions
- Files: kebab-case (e.g., payment-button.tsx)
- Components: PascalCase exports
- Hooks: camelCase with use- prefix (e.g., useAuth)
- Route handlers: route.ts in the route segment folder

## Payments
- All amounts in IDR (Indonesian Rupiah), integer values
- Midtrans Snap: createSnapTransaction() in lib/payments/midtrans.ts
- Doku JOKUL: createDokuPayment() in lib/payments/doku.ts

## Documentation
- Docs in docs/en/ (English) and docs/id/ (Indonesian)
- Both language sets should stay in sync
```

---

## Task 8: Add .windsurfrules

**Files:**
- Create: `.windsurfrules`

Windsurf reads `.windsurfrules` from the project root.

**Step 1: Create the file**

Use the same content as `.cursorrules` — Windsurf and Cursor use the same format and level of detail.

```
# KilatKoding — Windsurf Rules

## Project Context
Next.js 16 SaaS boilerplate for Indonesian developers.
Stack: Next.js App Router, TypeScript strict, Tailwind CSS, shadcn/ui, Supabase SSR auth, Midtrans/Doku payments.

## Component Rules
- Default to Server Components. Add "use client" only when using hooks, event handlers, or browser APIs.
- Import from @/components/ui/ before creating new base UI components (43 shadcn/ui components available).
- Use cn() from @/lib/utils for conditional class names.

## Data Access Rules
- Server-side Supabase: import from @/lib/supabase/server
- Client-side Supabase: import from @/lib/supabase/client
- Never import server client in client components.

## Naming Conventions
- Files: kebab-case (e.g., payment-button.tsx)
- Components: PascalCase exports
- Hooks: camelCase with use- prefix (e.g., useAuth)
- Route handlers: route.ts in the route segment folder

## Payments
- All amounts in IDR (Indonesian Rupiah), integer values
- Midtrans Snap: createSnapTransaction() in lib/payments/midtrans.ts
- Doku JOKUL: createDokuPayment() in lib/payments/doku.ts

## Documentation
- Docs in docs/en/ (English) and docs/id/ (Indonesian)
- Both language sets should stay in sync
```

---

## Task 9: Mirror Changes to docs/id/

**Files:**
- Modify: `docs/id/architecture.md`
- Modify: `docs/id/inventory.md`
- Modify: `docs/id/current-state.md`

Indonesian docs must mirror the English docs in structure. Apply the same route map and inventory updates from Tasks 3 and 4, translating headings and descriptions into Bahasa Indonesia.

**Step 1: Read each id/ doc before editing**

```bash
# Read before modifying
docs/id/architecture.md
docs/id/inventory.md
docs/id/current-state.md
```

**Step 2: Apply same structural updates as Tasks 3 and 4**

Mirror every route map addition, component addition, and API route addition — translated into Bahasa Indonesia.

Key translation mappings:
- "Purpose" → "Tujuan"
- "Route" → "Route" (keep)
- "File" → "File" (keep)
- "Marketing Routes" → "Route Marketing"
- "Dashboard Routes" → "Route Dashboard"
- "Auth Routes" → "Route Auth"
- "API Routes" → "Route API"

---

## Task 10: Final Verification

**Step 1: Run lint**

```bash
cd /Users/galpratama/Development/galpratama/kilatkoding-src
npm run lint
```
Expected: exit 0, no errors.

**Step 2: Run build**

```bash
npm run build
```
Expected: successful build (no TypeScript or Next.js errors). This verifies no accidental code changes were introduced.

**Step 3: Spot-check AI context files**

Verify these files exist and have content:
- `README.md` — KilatKoding branding, not Supabase starter
- `CLAUDE.md` — updated Important Files section
- `AGENTS.md` — updated route map with all 16+ marketing routes
- `docs/en/architecture.md` — full route map table
- `docs/en/inventory.md` — all new files listed
- `.github/copilot-instructions.md` — exists with project context
- `.cursorrules` — exists with project rules
- `.windsurfrules` — exists with project rules

---

## Completion Checklist

- [ ] README.md replaced with KilatKoding-branded version
- [ ] AGENTS.md route map updated with all routes
- [ ] CLAUDE.md Important Files section updated
- [ ] docs/en/architecture.md route map + component layers updated
- [ ] docs/en/inventory.md all new files added
- [ ] docs/id/architecture.md mirrored in Bahasa Indonesia
- [ ] docs/id/inventory.md mirrored in Bahasa Indonesia
- [ ] docs/id/current-state.md checked for accuracy
- [ ] .github/copilot-instructions.md created
- [ ] .cursorrules created
- [ ] .windsurfrules created
- [ ] npm run lint passes
- [ ] npm run build passes
