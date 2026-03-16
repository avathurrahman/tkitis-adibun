# Dokumentasi Proyek

Folder ini mendokumentasikan kondisi repository saat ini: sebuah aplikasi Next.js + Supabase yang baru diinisialisasi dan sudah terhubung dengan Tailwind CSS, TypeScript, dan shadcn/ui.

Repository ini saat ini masih berbasis starter resmi Supabase `with-supabase`, dengan sedikit penyesuaian lokal untuk linting dan kompatibilitas konfigurasi Tailwind.

## Mulai Dari Sini

- [Kondisi Saat Ini](./current-state.md): Ringkasan tingkat tinggi tentang isi repo saat ini.
- [Setup dan Pengembangan](./setup-and-development.md): Setup lokal, environment variable, command, dan langkah verifikasi.
- [Arsitektur](./architecture.md): Struktur aplikasi, peta route, model render, dan sistem styling.
- [Supabase dan Auth](./supabase-auth.md): Cara kerja client Supabase, refresh session, dan alur autentikasi saat ini.
- [Inventaris Source](./inventory.md): Referensi file-file penting yang saat ini ada di project.

## Snapshot Singkat

- Framework: Next.js App Router
- Bahasa: TypeScript
- Styling: Tailwind CSS + CSS variables
- UI system: shadcn/ui dengan style `new-york`
- Integrasi auth dan backend: Supabase SSR + browser client
- Dukungan tema: `next-themes`
- Git remote: `git@github.com:galpratama/kilatkoding-src.git`

## Cakupan Aplikasi Saat Ini

Aplikasi saat ini sudah memiliki:

- Landing page dengan panduan starter
- Halaman sign up, sign in, forgot password, dan update password
- Halaman protected yang membaca claims user yang sedang login
- Theme switcher untuk light, dark, dan system mode
- Primitive shadcn/ui yang siap dipakai dan dikembangkan

Aplikasi ini belum memiliki fitur bisnis spesifik, tabel database kustom, test, workflow CI, atau konfigurasi deployment yang spesifik ke produk.
