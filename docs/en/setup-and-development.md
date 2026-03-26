# Setup And Development

## Prerequisites

The project was initialized and verified with:

- Node.js `v24.4.1`
- npm `11.4.2`

Any modern Node.js version compatible with Next.js 16 should work.

## Install Dependencies

```bash
npm install
```

## Automated Tests

The repository now includes a Vitest-based test suite with:

- Node-side unit and route handler tests
- JSDOM component and hook tests via Testing Library
- Playwright smoke tests for public routes
- Mocked integrations for Supabase, AI providers, Midtrans, Doku, and Resend

## Environment Variables

```bash
cp .env.example .env.local
```

Next.js reads both `.env` and `.env.local`, but `.env.local` is the recommended place for local secrets.

Set the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_WAITLIST=true
NEXT_PUBLIC_ENABLE_CONTACT=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_ADMIN=true
NEXT_PUBLIC_ENABLE_AI=true

MIDTRANS_SERVER_KEY=your-midtrans-server-key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your-midtrans-client-key

RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=KilatKoding <noreply@yourdomain.com>

DOKU_CLIENT_ID=your-doku-client-id
DOKU_SECRET_KEY=your-doku-secret-key

ADMIN_EMAILS=you@example.com,colleague@example.com

# AI (optional)
AI_DEFAULT_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

Notes:

- `NEXT_PUBLIC_APP_URL` is used by `config/site.ts` to build the site base URL
- The starter now degrades gracefully: missing config disables the affected feature instead of crashing the whole app
- If a feature is not relevant to your app, set its `NEXT_PUBLIC_ENABLE_*` toggle to `false` so the UI shows it as intentionally disabled instead of “not configured”
- `npm run env:check` now loads the same `.env` and `.env.local` files that Next.js uses, then reports which enabled features are ready, which are in fallback mode, and which are disabled by toggle
- `/api/health` now includes a feature-by-feature readiness summary
- If Supabase vars are missing, auth-aware areas will not function but the app still renders
- `SUPABASE_SERVICE_ROLE_KEY` is required for webhook writes, profile updates, order lookups, and admin reporting
- `MIDTRANS_SERVER_KEY` is server-only; never prefix it with `NEXT_PUBLIC_`
- `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` is the publishable key used to open the Snap popup on the frontend
- `EMAIL_FROM` defaults to `KilatKoding <noreply@kilatkoding.com>` if not set; set it to match your verified Resend sender domain
- `DOKU_CLIENT_ID` and `DOKU_SECRET_KEY` are server-only; never prefix them with `NEXT_PUBLIC_`
- `ADMIN_EMAILS` is now a bootstrap list: matching users are upserted into `user_roles` as `admin` on first login
- AI vars are optional; AI features are disabled when keys are not set
- `AI_DEFAULT_PROVIDER` defaults to `openai`; set to `anthropic` to use Claude
- Restart `npm run dev` after changing env files so the running dev server picks up the new values

## Supabase Dashboard Setup

### 1. Redirect URLs

Add these under **Authentication > URL Configuration**:

```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/update-password
```

Production equivalents:

```
https://your-domain.com/auth/confirm
https://your-domain.com/auth/update-password
```

Why `/auth/confirm` is the central callback:
- Email verification links land here
- Magic Link emails land here
- OAuth (Google) redirects here
- Password reset still uses `/auth/update-password` directly

### 2. Google OAuth

1. Enable Google provider under **Authentication > Providers > Google**
2. Add Google Client ID and Secret (from [Google Cloud Console](https://console.cloud.google.com))
3. Copy the Supabase callback URL and add it to your Google OAuth app's **Authorized redirect URIs**

### 3. Apply Database Migrations

```bash
# Option A: Supabase CLI
npx supabase db push

# Option B: Paste each file manually in Supabase dashboard SQL editor (in order)
# supabase/migrations/20260316000001_create_profiles.sql
# supabase/migrations/20260316000002_create_subscriptions.sql
# supabase/migrations/20260316000003_create_payments.sql
# supabase/migrations/20260316000004_create_waitlist.sql
# supabase/migrations/20260316000005_create_ai_usage.sql
# supabase/migrations/20260317000006_add_admin_roles_and_billing_hardening.sql
```

## Midtrans Setup

1. Create a Midtrans account at [midtrans.com](https://midtrans.com)
2. Under **Settings > Access Keys**, copy your **Server Key** and **Client Key**
3. Use **Sandbox** keys for development; **Production** keys for live
4. The app auto-switches based on `NODE_ENV`: `production` uses live, everything else uses sandbox
5. Add your server's webhook URL under **Settings > Configuration > Payment Notification URL**:

```
https://your-domain.com/api/webhooks/midtrans
```

The webhook handler at `app/api/webhooks/midtrans/route.ts` verifies the Midtrans HMAC-SHA512 signature before processing any status update.

## Resend Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Add and verify your sending domain under **Domains**
3. Generate an API key under **API Keys**
4. Set `RESEND_API_KEY` and `EMAIL_FROM` in `.env.local`

Email templates live in `emails/`. Currently two templates are available:
- `emails/welcome.tsx` — sent on new user signup
- `emails/invoice.tsx` — sent after a successful payment

Call `sendEmail()` from `lib/email.ts` to send any React Email template.

## Doku Setup

1. Create a Doku account at [doku.com](https://doku.com)
2. Under your merchant dashboard, retrieve your **Client ID** and **Secret Key**
3. Use **Sandbox** credentials for development; **Production** credentials for live
4. The app auto-switches based on `NODE_ENV`: `production` uses `api.doku.com`, everything else uses `sandbox.doku.com`
5. Register your webhook URL under your Doku merchant settings:

```
https://your-domain.com/api/webhooks/doku
```

The webhook handler at `app/api/webhooks/doku/route.ts` verifies the Doku check-word signature before processing.

## Admin Dashboard

The admin page at `/admin` shows:
- Total revenue from `PAID` payments
- Active subscription count
- Paid plan count
- Paginated payments table

Access is controlled by `user_roles`. `ADMIN_EMAILS` is only used to bootstrap initial admin role assignments.

## Common Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run env:check` | Validate required and optional environment variables |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after build |
| `npm run lint` | Run ESLint across the repo |
| `npm run typecheck` | Run TypeScript checks without emitting output |
| `npm run test` | Run the full automated test suite once |
| `npm run test:watch` | Run the test suite in watch mode |
| `npm run e2e` | Run Playwright smoke tests |

## Local Development Flow

1. Copy `.env.example` to `.env.local`
2. Turn off any unused features by setting the related `NEXT_PUBLIC_ENABLE_*` flags to `false`
3. Fill in the env vars required by the features you kept enabled
4. Run `npm run env:check` to confirm which enabled features are ready vs still in fallback mode
5. Run `npm run dev`
6. Open `http://localhost:3000`
7. Test the routes you actually kept enabled

## Deployment Notes

- `app/layout.tsx` builds `metadataBase` from `VERCEL_URL` when available, otherwise falls back to `http://localhost:3000`
- The app uses `next/font/google` for Geist — production build requires network access the first time
- Run `npx playwright install chromium` once before the first local `npm run e2e`
- No project-specific deployment config has been added yet; Vercel defaults work out of the box
