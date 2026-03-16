# Changelog

## 2026-03-16 — AI Integration Foundation + Documentation

### AI SDK Setup
- Installed `ai@6`, `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/react`
- Created `lib/ai/provider.ts` — model factory supporting OpenAI and Anthropic via Vercel AI SDK
- Created `lib/ai/usage.ts` — token tracking, monthly usage queries, plan-based limit checks
- Created `lib/ai/middleware.ts` — auth + provider config + usage gating for AI API routes
- Created `app/api/ai/chat/route.ts` — streaming chat endpoint with `streamText()` + `toUIMessageStreamResponse()`
- Created `app/api/ai/generate/route.ts` — one-shot text generation with `generateText()`
- Created `hooks/use-ai-chat.ts` — client hook wrapping `useChat` with `DefaultChatTransport`
- Created `supabase/migrations/20260316000005_create_ai_usage.sql` — usage tracking table with RLS + index
- Updated `CLAUDE.md` with AI integration rules and file references

### Architecture Notes
- AI features gated by subscription plan: FREE=0, BASIC=10k, PRO=100k, ULTIMATE=unlimited tokens/month
- Provider-agnostic via `getModel()` factory — same pattern as payment provider abstraction
- All routes use `authorizeAIRequest()` for consistent auth + usage enforcement

### Documentation Updated (both EN and ID)
- `docs/en/current-state.md`, `docs/id/current-state.md` — AI packages, working features, migration table
- `docs/en/inventory.md`, `docs/id/inventory.md` — AI library section, hooks, API routes, migration row
- `docs/en/architecture.md`, `docs/id/architecture.md` — AI layer section, API routes, hooks, DB schema
- `docs/en/setup-and-development.md`, `docs/id/setup-and-development.md` — AI env vars, notes, migration list
- `docs/en/README.md`, `docs/id/README.md` — AI integration in Quick Snapshot

## 2026-03-16 — Phase 1 & 2 Complete, Docs Updated

### Phase 1: Route Groups, Auth Enhancements, Database Schema

- Added `config/site.ts` and `config/navigation.ts`
- Created `(marketing)` and `(dashboard)` route groups with layouts
- Rewrote `components/login-form.tsx` — Google OAuth, email/password, Magic Link tabs
- Rewrote `components/sign-up-form.tsx` — Google OAuth + email/password
- Created `app/(dashboard)/dashboard/page.tsx` — auth-gated dashboard
- Added DB migrations: `profiles`, `subscriptions`, `payments` tables with RLS + auto-triggers
- Removed template/demo components and replaced `/protected` with `/dashboard`
- Updated `app/layout.tsx` metadata to KilatKoding, `lang="id"`

### Phase 2: Midtrans Payment + Resend Email

- Added `lib/payments/midtrans.ts` — Snap + CoreAPI client, transaction creation, signature verification
- Added `app/api/payments/route.ts` — auth-gated Snap token endpoint
- Added `app/api/webhooks/midtrans/route.ts` — webhook handler with HMAC-SHA512 verification
- Added `lib/email.ts` — Resend wrapper using React Email's `render()`
- Added `emails/welcome.tsx` — onboarding email template in Bahasa Indonesia
- Added `emails/invoice.tsx` — payment confirmation email with Rupiah formatting
- Installed: `midtrans-client`, `resend`, `@react-email/components`

### Docs Updated (both EN and ID)

- `docs/en/current-state.md`, `docs/id/current-state.md`
- `docs/en/inventory.md`, `docs/id/inventory.md`
- `docs/en/setup-and-development.md`, `docs/id/setup-and-development.md`
- `docs/en/architecture.md`, `docs/id/architecture.md`
