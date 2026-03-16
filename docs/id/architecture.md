# Arsitektur

## Struktur Tingkat Atas

| Path | Fungsi |
| --- | --- |
| `app/` | Route App Router, layout, route handler, dan global styles |
| `components/` | Komponen React yang reusable, termasuk UI dan auth |
| `components/ui/` | Primitive shadcn/ui yang sudah terpasang |
| `components/tutorial/` | Komponen tutorial bawaan dari template Supabase |
| `lib/` | Utility bersama dan factory client Supabase |
| `docs/` | Dokumentasi project untuk kondisi repository saat ini |
| `proxy.ts` | Refresh session saat request dan auth gating dasar |
| `tailwind.config.ts` | Content scanning Tailwind, extension theme, dan plugin |
| `components.json` | Konfigurasi project shadcn/ui |

## Model Rendering

Project ini menggunakan model campuran server/client:

- Server component menjadi default untuk file route di `app/`
- Client component dipakai untuk form interaktif dan theme switcher
- Akses Supabase di server dilakukan lewat `lib/supabase/server.ts`
- Akses Supabase di browser dilakukan lewat `lib/supabase/client.ts`
- `Suspense` dipakai untuk UI async yang auth-aware seperti `AuthButton` dan detail user di protected page

## Peta Route

| Route | Tipe | Fungsi |
| --- | --- | --- |
| `/` | Page | Landing page starter dengan header auth-aware dan konten langkah berikutnya |
| `/protected` | Page | Halaman protected contoh yang membaca claims user yang sedang login |
| `/auth/login` | Page | Halaman sign-in email/password |
| `/auth/sign-up` | Page | Halaman sign-up email/password |
| `/auth/sign-up-success` | Page | Notifikasi setelah submit registrasi |
| `/auth/forgot-password` | Page | Halaman permintaan reset password |
| `/auth/update-password` | Page | Form password baru setelah flow reset |
| `/auth/error` | Page | Halaman error untuk kegagalan auth |
| `/auth/confirm` | Route handler | Route verifikasi OTP yang melakukan redirect saat sukses atau gagal |

## Layout

### Root Layout

`app/layout.tsx` bertanggung jawab untuk:

- Memuat font Geist dari Google Fonts
- Mendefinisikan metadata
- Menyisipkan file CSS global
- Membungkus aplikasi dengan `ThemeProvider` dari `next-themes`

### Protected Layout

`app/protected/layout.tsx` menggunakan shell yang mirip dengan landing page starter:

- Header dengan link brand dan navigasi auth-aware
- Footer dengan theme switcher
- Container konten terpusat untuk area authenticated

## Sistem Styling

Sistem UI dibangun di atas:

- Utility class Tailwind CSS
- CSS custom properties di `app/globals.css`
- Komponen shadcn/ui yang dikonfigurasi lewat `components.json`
- `tailwindcss-animate` untuk helper animasi

Detail penting:

- Theme switching memakai strategi `class` melalui `next-themes`
- Project menggunakan style shadcn/ui `new-york`
- Base color yang dipakai adalah `neutral`
- Alias project memetakan `@/components`, `@/components/ui`, `@/lib`, dan `@/lib/utils`

## Lapisan Komponen

### Komponen Level Aplikasi

Komponen berikut membentuk pengalaman starter saat ini:

- `auth-button.tsx`
- `hero.tsx`
- `theme-switcher.tsx`
- `deploy-button.tsx`
- `env-var-warning.tsx`

### Komponen Auth

Ini adalah flow interaktif utama yang sudah tersedia:

- `login-form.tsx`
- `sign-up-form.tsx`
- `forgot-password-form.tsx`
- `update-password-form.tsx`
- `logout-button.tsx`

### Komponen Tutorial

Komponen ini ada untuk memandu penggunaan awal starter, dan nantinya bisa dihapus atau diganti ketika fitur produk sudah ditambahkan:

- `tutorial/connect-supabase-steps.tsx`
- `tutorial/fetch-data-steps.tsx`
- `tutorial/sign-up-user-steps.tsx`
- `tutorial/tutorial-step.tsx`
- `tutorial/code-block.tsx`

### Primitive UI

Primitive shadcn/ui yang saat ini sudah terpasang:

- `badge`
- `button`
- `card`
- `checkbox`
- `dropdown-menu`
- `input`
- `label`

## Pilihan Konfigurasi Penting

### Next.js

`next.config.ts` saat ini mengaktifkan:

- `cacheComponents: true`

### TypeScript

`tsconfig.json` saat ini mengaktifkan:

- `strict: true`
- Path alias `@/*`
- Bundler module resolution

### ESLint

`eslint.config.mjs` meng-extend:

- `next/core-web-vitals`
- `next/typescript`

Konfigurasi ini juga mengabaikan file hasil generate `.next/**` agar artefak type route tidak ikut dilint.

## Batasan Arsitektur Saat Ini

Strukturnya sudah rapi, tetapi masih sangat berorientasi starter:

- Konten landing page masih konten template, belum konten produk
- Protected page masih menampilkan claims user, belum data aplikasi
- Belum ada domain layer, service layer, atau abstraksi query database
- Belum ada test ataupun feature module
