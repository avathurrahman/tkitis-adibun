# Inventaris Source

File ini adalah referensi praktis untuk source file penting yang saat ini ada di repository.

## File Root

| File | Tujuan |
| --- | --- |
| `package.json` | Script dan deklarasi dependency |
| `next.config.ts` | Konfigurasi Next.js dengan `cacheComponents: true` |
| `tsconfig.json` | Konfigurasi TypeScript strict dan path alias `@/*` |
| `tailwind.config.ts` | Ekstensi tema Tailwind dan registrasi plugin |
| `components.json` | Konfigurasi proyek shadcn/ui |
| `proxy.ts` | Update session Supabase dan gating auth saat request masuk |
| `.env.example` | Referensi environment variable yang diperlukan |

## File Config

| File | Tujuan |
| --- | --- |
| `config/site.ts` | `siteConfig` — nama site, deskripsi, base URL |
| `config/navigation.ts` | Array link `marketingNav` dan `dashboardNav` |

## File App Router

| File | Tujuan |
| --- | --- |
| `app/layout.tsx` | Root layout: font Geist, metadata, `lang="id"`, theme provider |
| `app/globals.css` | Layer Tailwind dan design token |
| `app/(marketing)/layout.tsx` | Layout marketing: wrapper `Header` + `Footer` |
| `app/(marketing)/page.tsx` | Landing page — `/` |
| `app/(dashboard)/layout.tsx` | Layout dashboard: `Header` + container max-width |
| `app/(dashboard)/dashboard/page.tsx` | Dashboard terautentikasi — `/dashboard` |
| `app/auth/login/page.tsx` | Layar login |
| `app/auth/sign-up/page.tsx` | Layar registrasi |
| `app/auth/sign-up-success/page.tsx` | Instruksi pasca-registrasi |
| `app/auth/forgot-password/page.tsx` | Layar request reset password |
| `app/auth/update-password/page.tsx` | Layar update password |
| `app/auth/error/page.tsx` | Tampilan error auth |
| `app/auth/confirm/route.ts` | Handler verifikasi OTP/OAuth Supabase |

## Komponen Layout

| File | Tujuan |
| --- | --- |
| `components/layout/header.tsx` | Header site: logo, `AuthButton`, `ThemeSwitcher` |
| `components/layout/footer.tsx` | Footer site: copyright, `ThemeSwitcher` |

## Komponen Auth Dan Shell

| File | Tujuan |
| --- | --- |
| `components/auth-button.tsx` | Aksi header yang sadar auth (server component) |
| `components/logout-button.tsx` | Aksi sign out |
| `components/login-form.tsx` | Login: tab email/password, tab Magic Link, tombol Google OAuth |
| `components/sign-up-form.tsx` | Registrasi: tombol Google OAuth + form email/password |
| `components/forgot-password-form.tsx` | Form request reset password |
| `components/update-password-form.tsx` | Form update password |
| `components/theme-switcher.tsx` | Switcher mode light/dark/system |

## File Utility Bersama

| File | Tujuan |
| --- | --- |
| `lib/utils.ts` | Helper `cn()` dan pengecekan env var |
| `lib/supabase/client.ts` | Factory browser Supabase client |
| `lib/supabase/server.ts` | Factory server Supabase client |
| `lib/supabase/proxy.ts` | Logika refresh session dan redirect yang dipakai `proxy.ts` |
| `lib/email.ts` | `sendEmail()` — wrapper Resend yang merender template React Email dan mengirimnya via API |

## Library Payment

| File | Tujuan |
| --- | --- |
| `lib/payments/midtrans.ts` | Inisialisasi Snap + CoreAPI client, `createSnapTransaction()`, `verifyMidtransSignature()`, `isMidtransPaymentSuccess()` |

## API Route

| File | Method | Tujuan |
| --- | --- | --- |
| `app/api/payments/route.ts` | POST | Dilindungi auth — membuat Snap token Midtrans, menyimpan record `payments` pending |
| `app/api/webhooks/midtrans/route.ts` | POST | Verifikasi signature Midtrans, update `payments.status`, aktifkan subscription jika berhasil |

## Template Email

| File | Tujuan |
| --- | --- |
| `emails/welcome.tsx` | Email onboarding — sapaan + link ke dashboard, dalam Bahasa Indonesia |
| `emails/invoice.tsx` | Konfirmasi pembayaran — order ID, paket, jumlah dalam Rupiah |

## Migrasi Database

| File | Membuat |
| --- | --- |
| `supabase/migrations/20260316000001_create_profiles.sql` | Tabel `profiles` + trigger auto-create saat signup |
| `supabase/migrations/20260316000002_create_subscriptions.sql` | Tabel `subscriptions` + trigger auto-create FREE saat signup |
| `supabase/migrations/20260316000003_create_payments.sql` | Tabel `payments` + enum (plan, payment_status, payment_provider) |

## Primitive shadcn/ui Yang Terpasang

| File | Tujuan |
| --- | --- |
| `components/ui/badge.tsx` | Badge |
| `components/ui/button.tsx` | Button |
| `components/ui/card.tsx` | Card |
| `components/ui/checkbox.tsx` | Checkbox |
| `components/ui/dropdown-menu.tsx` | Dropdown menu |
| `components/ui/input.tsx` | Input |
| `components/ui/label.tsx` | Label |

## File Yang Belum Dibuat (Phase 3+)

| File | Phase | Tujuan |
| --- | --- | --- |
| `types/database.ts` | Setelah migrasi diaplikasikan | TypeScript types yang di-generate dari Supabase |
| `lib/payments/doku.ts` | Phase 3 | Client dan helper Doku |
| `app/api/webhooks/doku/route.ts` | Phase 3 | Handler webhook Doku |
| `hooks/use-auth.ts` | Phase 3 | Hook client-side state auth |
| `hooks/use-subscription.ts` | Phase 3 | Hook client-side state subscription |
| `app/(dashboard)/admin/page.tsx` | Phase 3 | Admin dashboard |
| `content/blog/` | Phase 3 | Direktori konten blog MDX |
