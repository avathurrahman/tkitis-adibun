# Kondisi Saat Ini

## Ringkasan

KilatKoding adalah boilerplate Next.js yang dibikin khusus untuk developer Indonesia. Repository ini sudah melewati fase starter baseline dan sekarang sudah mencakup:

- Next.js App Router dengan route groups `(marketing)`, `(dashboard)`, dan `auth`
- TypeScript
- Tailwind CSS + shadcn/ui
- Supabase browser client dan server client
- Cookie-based auth dan refresh session
- Login email/password, Google OAuth, dan Magic Link (passwordless)
- Dashboard nyata di `/dashboard` (dilindungi auth)
- Config terpusat di `config/site.ts`
- File migrasi database untuk tabel `profiles`, `subscriptions`, dan `payments`
- Integrasi payment Midtrans (Snap token creation + webhook handler)
- Integrasi email Resend dengan template React Email (welcome, invoice)

## Baseline Paket Yang Terpasang

| Package | Version |
| --- | --- |
| `next` | `16.1.6` |
| `react` | `19.2.4` |
| `react-dom` | `19.2.4` |
| `typescript` | `5.9.3` |
| `tailwindcss` | `3.4.19` |
| `tailwindcss-animate` | `1.0.7` |
| `@supabase/ssr` | `0.9.0` |
| `@supabase/supabase-js` | `2.99.1` |
| `next-themes` | `0.4.6` |
| `lucide-react` | `0.511.0` |
| `midtrans-client` | `1.4.3` |
| `resend` | `6.9.3` |
| `@react-email/components` | `1.0.9` |

## Yang Sudah Berfungsi Saat Ini

- Aplikasi bisa dijalankan dengan `npm run dev`
- Linting lolos dengan `npm run lint`
- Landing page di `/` dengan branding KilatKoding, `Header`, dan `Footer`
- Alur auth: sign up, sign in (password + Google OAuth + Magic Link), forgot password, update password
- Dashboard di `/dashboard` — dilindungi auth, menampilkan info user yang sedang login
- Refresh session dan gating auth berjalan melalui `proxy.ts`
- Komponen dasar shadcn/ui tersedia di `components/ui`
- `config/site.ts` dan `config/navigation.ts` untuk metadata dan navigasi terpusat
- `POST /api/payments` — membuat Midtrans Snap transaction, menyimpan record payment pending
- `POST /api/webhooks/midtrans` — verifikasi signature, update status payment + subscription
- `sendEmail()` di `lib/email.ts` — mengirim template React Email via Resend
- `emails/welcome.tsx` dan `emails/invoice.tsx` — template email siap pakai dalam Bahasa Indonesia

## Migrasi Database Siap Diaplikasikan

Tiga file migrasi tersedia di `supabase/migrations/`:

| File | Membuat |
| --- | --- |
| `20260316000001_create_profiles.sql` | Tabel `profiles` + trigger auto-create saat signup |
| `20260316000002_create_subscriptions.sql` | Tabel `subscriptions` + trigger auto-create tier FREE saat signup |
| `20260316000003_create_payments.sql` | Tabel `payments` + enum (plan, status, provider) |

Ketiga tabel sudah dilengkapi RLS. Migrasi belum diaplikasikan ke project Supabase manapun.

## Yang Masih Belum Ada

- Aplikasikan migrasi ke Supabase dan generate TypeScript types
- Automated test
- Workflow CI/CD
- Integrasi Doku (Phase 3)
- Sistem blog MDX (Phase 3)
- Admin dashboard (Phase 3)
- `hooks/use-auth.ts`, `hooks/use-subscription.ts` (Phase 3)

## Langkah Berikutnya

1. Aplikasikan tiga migrasi SQL ke project Supabase kamu
2. Jalankan `npx supabase gen types typescript --project-id YOUR_ID > types/database.ts`
3. Aktifkan Google OAuth di Supabase dashboard (Authentication > Providers)
4. Tambahkan Midtrans sandbox keys dan Resend API key ke `.env.local`
5. Mulai Phase 3 kalau sudah siap
