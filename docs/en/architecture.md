# Architecture

## Top-Level Structure

| Path | Purpose |
| --- | --- |
| `app/` | App Router routes, layouts, route handlers, and global styles |
| `components/` | Reusable UI and auth-related React components |
| `components/ui/` | shadcn/ui primitives installed in the project |
| `components/tutorial/` | Starter tutorial components from the Supabase template |
| `lib/` | Shared utilities and Supabase client factories |
| `docs/` | Project documentation for the current repository state |
| `proxy.ts` | Request-time session refresh and basic auth gating |
| `tailwind.config.ts` | Tailwind content scanning, theme extensions, and plugin setup |
| `components.json` | shadcn/ui project configuration |

## Rendering Model

The project uses a mixed server/client model:

- Server components are the default for route files in `app/`
- Client components are used for interactive forms and theme switching
- Supabase server access is done through `lib/supabase/server.ts`
- Supabase browser access is done through `lib/supabase/client.ts`
- `Suspense` is used around async auth-aware UI such as `AuthButton` and protected user details

## Route Map

| Route | Type | Purpose |
| --- | --- | --- |
| `/` | Page | Starter landing page with auth-aware header and next-step content |
| `/protected` | Page | Protected example page that reads the authenticated user's claims |
| `/auth/login` | Page | Email/password sign-in screen |
| `/auth/sign-up` | Page | Email/password sign-up screen |
| `/auth/sign-up-success` | Page | Confirmation notice after sign-up submission |
| `/auth/forgot-password` | Page | Password reset request screen |
| `/auth/update-password` | Page | New password form after reset flow |
| `/auth/error` | Page | Error display for auth-related failures |
| `/auth/confirm` | Route handler | OTP verification route that redirects on success or failure |

## Layouts

### Root Layout

`app/layout.tsx` is responsible for:

- Loading the Geist font from Google Fonts
- Defining metadata
- Injecting the global CSS file
- Wrapping the application in `ThemeProvider` from `next-themes`

### Protected Layout

`app/protected/layout.tsx` reuses the same starter shell pattern as the landing page:

- Header with brand link and auth-aware navigation
- Footer with theme switcher
- Centered content container for authenticated pages

## Styling System

The UI system is based on:

- Tailwind CSS utility classes
- CSS custom properties in `app/globals.css`
- shadcn/ui components configured through `components.json`
- `tailwindcss-animate` for animation helpers

Important details:

- Theme switching uses the `class` strategy through `next-themes`
- The project uses the `new-york` shadcn/ui style
- Base color is `neutral`
- Aliases map `@/components`, `@/components/ui`, `@/lib`, and `@/lib/utils`

## Component Layers

### App-Level Components

These shape the current starter experience:

- `auth-button.tsx`
- `hero.tsx`
- `theme-switcher.tsx`
- `deploy-button.tsx`
- `env-var-warning.tsx`

### Auth Components

These are the main interactive flows already implemented:

- `login-form.tsx`
- `sign-up-form.tsx`
- `forgot-password-form.tsx`
- `update-password-form.tsx`
- `logout-button.tsx`

### Tutorial Components

These exist to guide initial starter usage and can be removed or replaced once product-specific features are added:

- `tutorial/connect-supabase-steps.tsx`
- `tutorial/fetch-data-steps.tsx`
- `tutorial/sign-up-user-steps.tsx`
- `tutorial/tutorial-step.tsx`
- `tutorial/code-block.tsx`

### UI Primitives

Currently installed shadcn/ui primitives:

- `badge`
- `button`
- `card`
- `checkbox`
- `dropdown-menu`
- `input`
- `label`

## Important Config Choices

### Next.js

`next.config.ts` currently enables:

- `cacheComponents: true`

### TypeScript

`tsconfig.json` currently enables:

- `strict: true`
- Path alias `@/*`
- Bundler module resolution

### ESLint

`eslint.config.mjs` extends:

- `next/core-web-vitals`
- `next/typescript`

It also ignores generated `.next/**` files to avoid linting route-generated type artifacts.

## Architectural Limits Right Now

The structure is clean, but it is still starter-oriented:

- Landing page content is template content, not product content
- Protected page shows user claims rather than application data
- There is no domain layer, service layer, or database query abstraction yet
- There are no tests or feature modules
