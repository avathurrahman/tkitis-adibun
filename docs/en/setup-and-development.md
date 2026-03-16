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

## Environment Variables

```bash
cp .env.example .env.local
```

Set the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000

MIDTRANS_SERVER_KEY=your-midtrans-server-key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your-midtrans-client-key

RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=KilatKoding <noreply@yourdomain.com>

DOKU_CLIENT_ID=your-doku-client-id
DOKU_SECRET_KEY=your-doku-secret-key

ADMIN_EMAILS=you@example.com,colleague@example.com
```

Notes:

- `NEXT_PUBLIC_APP_URL` is used by `config/site.ts` to build the site base URL
- If Supabase vars are missing, auth-aware areas will not function but the app still renders
- `MIDTRANS_SERVER_KEY` is server-only; never prefix it with `NEXT_PUBLIC_`
- `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` is the publishable key used to open the Snap popup on the frontend
- `EMAIL_FROM` defaults to `KilatKoding <noreply@kilatkoding.com>` if not set; set it to match your verified Resend sender domain
- `DOKU_CLIENT_ID` and `DOKU_SECRET_KEY` are server-only; never prefix them with `NEXT_PUBLIC_`
- `ADMIN_EMAILS` is a comma-separated list of emails allowed to access `/admin`; if empty, all authenticated users can access it

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
```

### 4. Generate TypeScript Types

After applying migrations:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
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
- Last 20 payments table

Access is controlled by `ADMIN_EMAILS`. If the env var is not set, any authenticated user can access `/admin`. Set it to a comma-separated list to restrict access.

## Common Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after build |
| `npm run lint` | Run ESLint across the repo |

## Local Development Flow

1. Copy `.env.example` to `.env.local` and fill in Supabase values
2. Run `npm run dev`
3. Open `http://localhost:3000`
4. Test: landing page, sign up (email + Google), sign in (password + Magic Link), dashboard

## Deployment Notes

- `app/layout.tsx` builds `metadataBase` from `VERCEL_URL` when available, otherwise falls back to `http://localhost:3000`
- The app uses `next/font/google` for Geist — production build requires network access the first time
- No project-specific deployment config has been added yet; Vercel defaults work out of the box
