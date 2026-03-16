# Project Documentation

This folder documents the current state of the repository as it exists today: a freshly scaffolded Next.js + Supabase application with Tailwind CSS, TypeScript, and shadcn/ui already wired together.

The repository is currently based on Supabase's `with-supabase` Next.js starter, with a small amount of local cleanup applied for linting and Tailwind config compatibility.

## Start Here

- [Current State](./current-state.md): High-level snapshot of what is in the repo right now.
- [Setup and Development](./setup-and-development.md): Local setup, environment variables, commands, and verification steps.
- [Architecture](./architecture.md): App structure, route map, rendering model, and styling system.
- [Supabase and Auth](./supabase-auth.md): How Supabase clients, session refresh, and auth flows currently work.
- [Inventory](./inventory.md): File-by-file reference for the important source files in the project.

## Quick Snapshot

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS + CSS variables
- UI system: shadcn/ui with the `new-york` style
- Auth and backend integration: Supabase SSR + browser client
- Theme support: `next-themes`
- AI integration: Vercel AI SDK (OpenAI + Anthropic)
- Git remote: `git@github.com:galpratama/kilatkoding-src.git`

## Scope Of The Current App

The app currently provides:

- A landing page with starter guidance
- Sign up, sign in, forgot password, and update password screens
- A protected page that reads the authenticated user's claims
- A shared theme switcher with light, dark, and system modes
- shadcn/ui primitives already installed and ready to extend

The app does not yet include product-specific features, custom database tables, tests, CI workflows, or deployment-specific customization beyond the starter defaults.
