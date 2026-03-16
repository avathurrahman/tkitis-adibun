# Supabase And Auth

## Overview

The current app uses Supabase for authentication and session handling. It is set up for both:

- Server-side access through `@supabase/ssr`
- Browser-side access for interactive auth forms

The implementation is centered around cookie-based auth so authenticated state is available across the App Router.

## Environment Variables In Use

The app currently reads:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

These values are used in both the browser and server client factories.

## Supabase Client Factories

### Browser Client

File: `lib/supabase/client.ts`

Purpose:

- Creates a Supabase browser client with `createBrowserClient`
- Used by interactive auth forms such as login, sign up, and password reset

### Server Client

File: `lib/supabase/server.ts`

Purpose:

- Creates a request-scoped Supabase server client with `createServerClient`
- Reads and writes cookies via `next/headers`
- Avoids global client reuse, which is especially important for server environments

### Proxy Session Updater

File: `lib/supabase/proxy.ts`

Purpose:

- Refreshes/reads the auth session at request time
- Synchronizes cookies between the request and response
- Redirects unauthenticated users away from protected routes

## Request Flow

1. `proxy.ts` runs for matched requests.
2. `updateSession()` creates a server-side Supabase client bound to the request cookies.
3. `supabase.auth.getClaims()` is called to ensure session state is available and current.
4. If the request is not for `/` or `/auth/*` and no authenticated user exists, the request is redirected to `/auth/login`.
5. The response returned from Supabase is preserved so auth cookies stay in sync.

If environment variables are missing, the proxy returns early and skips auth/session behavior.

## Current Auth Flows

### Sign Up

Component: `components/sign-up-form.tsx`

Behavior:

- Collects email, password, and repeat-password values
- Performs a client-side password match check
- Calls `supabase.auth.signUp()`
- Sets `emailRedirectTo` to `${window.location.origin}/protected`
- Redirects the user to `/auth/sign-up-success` after a successful submission

Current implication:

- The UI assumes email confirmation happens outside the form and then returns the user to the app.
- The success page is informational only.

### Sign In

Component: `components/login-form.tsx`

Behavior:

- Collects email and password
- Calls `supabase.auth.signInWithPassword()`
- Redirects to `/protected` after success

### Forgot Password

Component: `components/forgot-password-form.tsx`

Behavior:

- Collects email
- Calls `supabase.auth.resetPasswordForEmail()`
- Sets `redirectTo` to `${window.location.origin}/auth/update-password`
- Shows an inline success state after email submission

### Update Password

Component: `components/update-password-form.tsx`

Behavior:

- Collects a new password
- Calls `supabase.auth.updateUser({ password })`
- Redirects to `/protected` after success

### Logout

Component: `components/logout-button.tsx`

Behavior:

- Signs the user out through Supabase
- Returns the app to an unauthenticated state

### Auth Status In The Header

Component: `components/auth-button.tsx`

Behavior:

- Runs on the server
- Calls `supabase.auth.getClaims()`
- If a user exists, shows their email and a logout button
- If no user exists, shows sign-in and sign-up buttons

## Confirm Route

File: `app/auth/confirm/route.ts`

This route:

- Reads `token_hash`, `type`, and optional `next` from the query string
- Calls `supabase.auth.verifyOtp()`
- Redirects to `next` on success
- Redirects to `/auth/error` on failure

This gives the project a dedicated OTP verification endpoint even though the starter UI also uses direct redirect targets in other auth flows.

## Protected Route Behavior

File: `app/protected/page.tsx`

The page:

- Creates a server-side Supabase client
- Calls `supabase.auth.getClaims()`
- Redirects to `/auth/login` if claims are missing or an error occurs
- Renders the current user's claims as formatted JSON

Right now this page is mostly a proof-of-setup screen. It is the place where application-specific authenticated data fetching would likely be added next.

## Supabase-Related Limitations

The current integration is solid for a starter, but there are still open decisions:

- No typed database schema generation is set up yet
- No table queries beyond auth/session examples exist yet
- No Row Level Security guidance is documented yet for future tables
- No service-role or admin-only server workflows are implemented

## Suggested Next Improvements

- Define the first real tables in Supabase
- Add database type generation if you want typed queries
- Replace the protected-page claims dump with real application data
- Decide whether future mutations should use client calls, server actions, or route handlers
