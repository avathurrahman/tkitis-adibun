# Arsitektur

## Struktur Tingkat Atas

| Path | Tujuan |
| --- | --- |
| `app/` | Route, layout, route handler, dan global style App Router |
| `app/(marketing)/` | Halaman publik (landing page) |
| `app/(dashboard)/` | Halaman dashboard yang dilindungi auth |
| `app/auth/` | Halaman alur autentikasi dan OTP route handler |
| `components/` | Komponen UI dan auth yang reusable |
| `components/layout/` | Komponen `Header` dan `Footer` yang dipakai bersama |
| `components/ui/` | Primitive shadcn/ui |
| `config/` | Config site dan definisi navigasi terpusat |
| `lib/` | Utility bersama, factory Supabase client, dan helper payment |
| `lib/payments/` | Client payment gateway dan helper functions |
| `app/api/` | API route handler (payment, webhook) |
| `emails/` | Template React Email |
| `hooks/` | Hook React client-side untuk state auth dan subscription |
| `supabase/migrations/` | File migrasi SQL untuk schema database |
| `.github/workflows/` | Workflow CI GitHub Actions |
| `docs/` | Dokumentasi project (Bahasa Indonesia dan Inggris) |
| `proxy.ts` | Refresh session dan gating auth saat request masuk |
| `tailwind.config.ts` | Konfigurasi Tailwind dan plugin |
| `components.json` | Konfigurasi shadcn/ui |

## Model Rendering

- Server component adalah default untuk file route di `app/`
- Client component digunakan untuk form auth interaktif dan theme switcher
- Akses Supabase di server menggunakan `lib/supabase/server.ts`
- Akses Supabase di browser menggunakan `lib/supabase/client.ts`
- `Suspense` digunakan di sekitar UI async yang sadar auth (`AuthButton`, `DashboardContent`)

## Peta Route

| Route | Group | Tipe | Tujuan |
| --- | --- | --- | --- |
| `/` | `(marketing)` | Page | Landing page KilatKoding |
| `/dashboard` | `(dashboard)` | Page | Dashboard user yang sudah login |
| `/auth/login` | — | Page | Layar login (password, Google OAuth, Magic Link) |
| `/auth/sign-up` | — | Page | Layar registrasi (email/password + Google OAuth) |
| `/auth/sign-up-success` | — | Page | Pemberitahuan setelah submit registrasi |
| `/auth/forgot-password` | — | Page | Layar request reset password |
| `/auth/update-password` | — | Page | Form password baru setelah reset |
| `/auth/error` | — | Page | Tampilan error terkait auth |
| `/auth/confirm` | — | Route handler | Callback OTP/OAuth — verifikasi token, redirect setelah berhasil atau gagal |
| `/api/payments` | — | Route handler | Membuat Snap token Midtrans, menyimpan record payment pending |
| `/api/webhooks/midtrans` | — | Route handler | Verifikasi signature Midtrans, update status payment dan subscription |
| `/api/webhooks/doku` | — | Route handler | Verifikasi notifikasi Doku, update status payment dan subscription |
| `/admin` | `(dashboard)` | Page | Admin dashboard — statistik payment dan ringkasan subscription |

## Penjelasan Route Groups

Route group menggunakan tanda kurung di nama folder dan tidak mempengaruhi URL. Fungsinya hanya untuk menerapkan layout yang berbeda pada bagian aplikasi yang berbeda.

- `app/(marketing)/` — menggunakan `MarketingLayout` (full-width, `Header` + `Footer`)
- `app/(dashboard)/` — menggunakan `DashboardLayout` (container max-width, `Header` dengan aksi auth)
- `app/auth/` — tidak ada layout bersama; setiap halaman auth punya struktur centering dan card sendiri

## Layout

### Root Layout

`app/layout.tsx` bertugas:

- Memuat font Geist dari Google Fonts
- Mendefinisikan metadata global (title: "KilatKoding", `lang="id"`)
- Menyuntikkan `app/globals.css`
- Membungkus app dalam `ThemeProvider` dari `next-themes`

### Marketing Layout

`app/(marketing)/layout.tsx`:

- Merender `Header` (nama site + aksi auth + theme switcher)
- Merender `Footer` (copyright + theme switcher)
- Membungkus `children` dalam container `flex-col min-h-screen`

### Dashboard Layout

`app/(dashboard)/layout.tsx`:

- Struktur `Header` yang sama dengan marketing
- Membungkus `children` dalam container `max-w-5xl` terpusat dengan padding

## Sistem Styling

- Utility class Tailwind CSS
- CSS custom property di `app/globals.css`
- shadcn/ui dengan style `new-york`, warna dasar `neutral`
- `tailwindcss-animate` untuk helper animasi
- Theme switching menggunakan strategi `class` melalui `next-themes`
- Path alias: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/config`

## Layer Komponen

### Komponen Layout

| File | Tujuan |
| --- | --- |
| `components/layout/header.tsx` | Header site: logo, `AuthButton`, `ThemeSwitcher` |
| `components/layout/footer.tsx` | Footer site: copyright, `ThemeSwitcher` |

### Komponen App-Level

| File | Tujuan |
| --- | --- |
| `components/auth-button.tsx` | Aksi header yang sadar auth (server component) |
| `components/theme-switcher.tsx` | Switcher mode light/dark/system |

### Komponen Auth

| File | Tujuan |
| --- | --- |
| `components/login-form.tsx` | Form login: tab password, tab Magic Link, tombol Google OAuth |
| `components/sign-up-form.tsx` | Form registrasi: tombol Google OAuth + email/password |
| `components/forgot-password-form.tsx` | Form request reset password |
| `components/update-password-form.tsx` | Form update password |
| `components/logout-button.tsx` | Tombol sign out |

### Primitive shadcn/ui

Yang sudah terpasang: `badge`, `button`, `card`, `checkbox`, `dropdown-menu`, `input`, `label`

## Layer Hooks

| File | Tujuan |
| --- | --- |
| `hooks/use-auth.ts` | Subscribe ke `onAuthStateChange`; mengembalikan `{ user, loading }` |
| `hooks/use-subscription.ts` | Mengambil baris subscription untuk user saat ini; mengembalikan `{ subscription, loading, isPro, isActive }` |

## Layer Payment

| File | Tujuan |
| --- | --- |
| `lib/payments/midtrans.ts` | Inisialisasi Snap + CoreAPI client, `createSnapTransaction()`, `verifyMidtransSignature()`, `isMidtransPaymentSuccess()` |
| `lib/payments/doku.ts` | HTTP client Doku JOKUL, `createDokuPayment()`, `verifyDokuNotification()`, `isDokuPaymentSuccess()` |

## Layer Email

| File | Tujuan |
| --- | --- |
| `lib/email.ts` | `sendEmail()` — merender template React Email ke HTML, mengirim via Resend |
| `emails/welcome.tsx` | Template email onboarding dalam Bahasa Indonesia |
| `emails/invoice.tsx` | Email konfirmasi pembayaran dengan jumlah Rupiah |

## Layer Config

| File | Tujuan |
| --- | --- |
| `config/site.ts` | `siteConfig` — nama site, deskripsi, base URL |
| `config/navigation.ts` | Array link `marketingNav` dan `dashboardNav` |

## Schema Database

Migrasi ada di `supabase/migrations/`. Tiga tabel sudah didefinisikan:

| Tabel | Kolom Penting | Catatan |
| --- | --- | --- |
| `profiles` | `id` (FK → `auth.users`), `full_name`, `avatar_url` | Auto-dibuat saat user signup via trigger |
| `subscriptions` | `user_id`, `plan` (enum), `status` (enum) | Mulai sebagai FREE; auto-dibuat saat signup via trigger |
| `payments` | `user_id`, `amount` (IDR), `provider` (MIDTRANS/DOKU), `external_id` | Mendukung Midtrans dan Doku |

Semua tabel sudah mengaktifkan Row Level Security dengan policy read berbasis user.

## Konfigurasi Penting

### Next.js

`next.config.ts` mengaktifkan `cacheComponents: true`.

### TypeScript

`tsconfig.json` mengaktifkan `strict: true`, path alias `@/*`, bundler module resolution.

### ESLint

`eslint.config.mjs` extends `next/core-web-vitals` dan `next/typescript`, mengabaikan `.next/**`.

## Gaps Arsitektur Saat Ini

- TypeScript types dari schema Supabase belum di-generate (butuh project yang sudah terhubung dengan migrasi diaplikasikan)
- Belum ada domain/service layer (query langsung ada di page component untuk sekarang)
- Belum ada test
