# Setup And Development

## Prerequisites

The project was initialized and verified with:

- Node.js `v24.4.1`
- npm `11.4.2`

Any modern Node.js version compatible with Next.js 16 should work, but matching the baseline above will minimize surprises.

## Install Dependencies

Dependencies are already installed in this repository. If you need to reinstall them:

```bash
npm install
```

## Environment Variables

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Set the following values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
```

Notes:

- The project currently expects the public Supabase URL and a publishable key.
- Supabase's legacy anon key also works with the current variable name during the transition period.
- If these variables are not set, the app will still render, but auth-aware areas will show the starter warning state instead of a working session-aware UI.

## Supabase Dashboard Setup

Before the auth flows work end to end, make sure your Supabase project is configured with the correct redirect URLs.

Recommended local redirect URLs:

- `http://localhost:3000/protected`
- `http://localhost:3000/auth/update-password`
- `http://localhost:3000/auth/confirm`

Recommended production equivalents:

- `https://your-domain.com/protected`
- `https://your-domain.com/auth/update-password`
- `https://your-domain.com/auth/confirm`

Why these matter:

- The sign-up flow currently asks Supabase to return the user to `/protected`
- The forgot-password flow sends users to `/auth/update-password`
- The confirm route exists for OTP verification flows that route through `/auth/confirm`

## Common Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after build |
| `npm run lint` | Run ESLint across the repo |

## Local Development Flow

1. Add your Supabase environment variables to `.env.local`.
2. Start the app with `npm run dev`.
3. Open `http://localhost:3000`.
4. Test sign up, sign in, password reset, and the protected page.

## Verification Performed

The current codebase has already been verified with:

- `npm run lint`
- `npm run build`

Both commands passed successfully after the small post-scaffold config fixes described in [Current State](./current-state.md).

## Deployment Notes

- `app/layout.tsx` builds `metadataBase` from `VERCEL_URL` when available, otherwise it falls back to `http://localhost:3000`.
- The app uses `next/font/google` for Geist. In restricted environments, production build may require network access to fetch the font the first time.
- The app is already compatible with Vercel-style deployment assumptions, but no project-specific deployment config has been added yet.

## Suggested Next Setup Tasks

- Replace the example metadata title and description
- Create the first real Supabase tables
- Add typed database helpers if you plan to query application data heavily
- Decide whether auth logic should stay in client components or move partially into server actions later
