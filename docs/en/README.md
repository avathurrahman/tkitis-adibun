# Project Documentation

This folder documents the current state of the repository as it exists today: a production-ready Next.js SaaS boilerplate for Indonesian developers with auth, payments, email, AI, blog, tests, and CI already wired together.

The repository originally started from Supabase's `with-supabase` Next.js starter, but it has since been expanded into KilatKoding's app, docs, integrations, and workflow conventions.

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

- A full marketing funnel, auth flows, dashboard, billing, and admin pages
- Supabase SSR auth with email/password, Google OAuth, and Magic Link
- Midtrans and Doku payment flows with verified webhooks
- Resend + React Email templates in Bahasa Indonesia
- MDX blog support, AI routes, automated tests, and GitHub Actions CI
- SEO foundations including per-page metadata, canonical URLs, Open Graph/Twitter cards, JSON-LD, sitemap, and robots

The app still does not include every roadmap item. Live Supabase deployment setup, generated database types, extra email providers (Sumopod/Mailketing), self-serve subscription management, file uploads, and other future roadmap features remain pending.
