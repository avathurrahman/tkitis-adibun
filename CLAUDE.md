# CLAUDE.md

Guidance for Claude or other AI coding assistants working in this repository.

## Repository At A Glance

This is a Next.js + Supabase starter-based application with:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase SSR auth
- `next-themes`

The app already includes authentication screens and a protected route, but it is still mostly starter content rather than a product-specific application.

## Read These First

- [`AGENTS.md`](./AGENTS.md)
- [`docs/README.md`](./docs/README.md)
- [`docs/en/README.md`](./docs/en/README.md)

If you need project details in Indonesian:

- [`docs/id/README.md`](./docs/id/README.md)

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Environment Variables

Expected variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Reference:

- [`.env.example`](./.env.example)

## Important Files

- `app/layout.tsx`: root layout, metadata, theme provider
- `app/page.tsx`: starter landing page
- `app/protected/page.tsx`: protected example page
- `app/auth/confirm/route.ts`: OTP verification route
- `lib/supabase/server.ts`: server Supabase client
- `lib/supabase/client.ts`: browser Supabase client
- `lib/supabase/proxy.ts`: auth/session synchronization
- `proxy.ts`: route matcher and request-time proxy entrypoint
- `components/ui/`: installed shadcn/ui primitives

## Working Rules

- Prefer server components by default.
- Use client components only when state, effects, browser APIs, or direct user interaction require them.
- Preserve Supabase auth/session cookie handling unless the task explicitly changes auth architecture.
- Reuse shadcn/ui primitives before adding new base-level UI abstractions.
- Keep changes consistent with the existing Tailwind and CSS variable system.
- Keep TypeScript strictness intact.
- Avoid unnecessary broad refactors in this still-young codebase.

## Documentation Rules

- English docs live in `docs/en`.
- Indonesian docs live in `docs/id`.
- If behavior or structure changes, update both documentation sets when practical.
- Keep both language trees aligned in structure.

## Verification

After meaningful changes, prefer to run:

```bash
npm run lint
```

Also run this when the change can affect app structure, routes, config, or production behavior:

```bash
npm run build
```

## Current Reality

This repository is still in the "foundation setup" stage. Good changes are usually the ones that:

- move the app away from template content toward real product behavior
- preserve the starter's working auth base
- document architectural changes clearly
