# Inventaris Source

File ini adalah referensi praktis untuk source file penting yang saat ini ada di repository.

## File Di Root

| File | Fungsi |
| --- | --- |
| `README.md` | README bawaan starter dari template Supabase |
| `package.json` | Script dan deklarasi dependency |
| `next.config.ts` | Konfigurasi Next.js dengan `cacheComponents: true` |
| `tsconfig.json` | Konfigurasi TypeScript strict dan alias `@/*` |
| `tailwind.config.ts` | Extension theme Tailwind dan registrasi plugin |
| `components.json` | Konfigurasi project shadcn/ui |
| `proxy.ts` | Update session Supabase saat request dan auth gating |
| `.env.example` | Environment variable publik Supabase yang dibutuhkan |

## File App Router

| File | Fungsi |
| --- | --- |
| `app/layout.tsx` | Root layout, metadata, font Geist, dan theme provider |
| `app/globals.css` | Layer Tailwind dan design tokens |
| `app/page.tsx` | Landing page dengan hero starter dan panduan |
| `app/protected/layout.tsx` | Shared shell untuk area authenticated |
| `app/protected/page.tsx` | Protected page yang menampilkan claims user saat ini |
| `app/auth/login/page.tsx` | Halaman login |
| `app/auth/sign-up/page.tsx` | Halaman sign up |
| `app/auth/sign-up-success/page.tsx` | Instruksi setelah registrasi |
| `app/auth/forgot-password/page.tsx` | Halaman permintaan reset password |
| `app/auth/update-password/page.tsx` | Halaman update password |
| `app/auth/error/page.tsx` | Tampilan error auth |
| `app/auth/confirm/route.ts` | Handler verifikasi OTP Supabase |

## File Utility Bersama

| File | Fungsi |
| --- | --- |
| `lib/utils.ts` | Helper `cn()` dan pengecekan keberadaan environment variable |
| `lib/supabase/client.ts` | Factory browser client Supabase |
| `lib/supabase/server.ts` | Factory server client Supabase |
| `lib/supabase/proxy.ts` | Logika refresh session dan redirect yang dipakai oleh `proxy.ts` |

## Komponen Auth Dan Shell

| File | Fungsi |
| --- | --- |
| `components/auth-button.tsx` | Aksi header yang auth-aware di server side |
| `components/logout-button.tsx` | Aksi sign out |
| `components/login-form.tsx` | Form sign in email/password |
| `components/sign-up-form.tsx` | Form registrasi email/password |
| `components/forgot-password-form.tsx` | Form permintaan reset password |
| `components/update-password-form.tsx` | Form update password |
| `components/env-var-warning.tsx` | Warning ketika env Supabase belum diset |
| `components/theme-switcher.tsx` | Switcher light/dark/system mode |
| `components/hero.tsx` | Hero section untuk landing page starter |
| `components/deploy-button.tsx` | CTA deploy bawaan template |

## Komponen Tutorial

Komponen ini bersifat starter-specific dan nantinya bisa dihapus setelah onboarding diganti dengan fitur aplikasi yang sebenarnya.

| File | Fungsi |
| --- | --- |
| `components/tutorial/connect-supabase-steps.tsx` | Panduan koneksi awal ke Supabase |
| `components/tutorial/fetch-data-steps.tsx` | Panduan langkah berikutnya untuk fetch data |
| `components/tutorial/sign-up-user-steps.tsx` | Panduan starter terkait sign up |
| `components/tutorial/tutorial-step.tsx` | Komponen presentasi tutorial bersama |
| `components/tutorial/code-block.tsx` | Helper formatting code block untuk konten tutorial |

## Primitive shadcn/ui Yang Sudah Terpasang

| File | Fungsi |
| --- | --- |
| `components/ui/badge.tsx` | Primitive badge |
| `components/ui/button.tsx` | Primitive button |
| `components/ui/card.tsx` | Primitive card |
| `components/ui/checkbox.tsx` | Primitive checkbox |
| `components/ui/dropdown-menu.tsx` | Primitive dropdown menu |
| `components/ui/input.tsx` | Primitive input |
| `components/ui/label.tsx` | Primitive label |

## Peluang Cleanup Saat Ini

Ini bukan masalah mendesak, tetapi memang terlihat di repository saat ini:

- `README.md` di root masih lebih banyak menjelaskan starter upstream daripada aplikasi ini
- Konten tutorial starter masih tampil di landing page dan protected page
- Belum ada folder domain khusus karena memang belum ada modul aplikasi yang ditambahkan
