# Dokumentasi Proyek

Folder ini mendokumentasikan kondisi repository saat ini: sebuah boilerplate SaaS Next.js yang production-ready untuk developer Indonesia dengan auth, payment, email, AI, blog, test, dan CI yang sudah saling terhubung.

Repository ini awalnya memang berasal dari starter resmi Supabase `with-supabase`, tetapi sekarang sudah berkembang menjadi app KilatKoding lengkap beserta docs, integrasi, dan workflow-nya.

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
- Integrasi AI: Vercel AI SDK (OpenAI + Anthropic)
- Git remote: `git@github.com:galpratama/kilatkoding-src.git`

## Cakupan Aplikasi Saat Ini

Aplikasi saat ini sudah memiliki:

- Marketing funnel lengkap, auth flows, dashboard, billing, dan admin
- Supabase SSR auth dengan email/password, Google OAuth, dan Magic Link
- Flow pembayaran Midtrans dan Doku dengan webhook terverifikasi
- Resend + React Email dalam Bahasa Indonesia
- Dukungan blog MDX, route AI, automated test, dan GitHub Actions CI
- Fondasi SEO seperti metadata per-halaman, canonical URL, Open Graph/Twitter card, JSON-LD, sitemap, dan robots

Aplikasi ini masih belum mencakup semua item roadmap. Setup Supabase live, generated database types, provider email tambahan (Sumopod/Mailketing), self-serve subscription management, file upload, dan fitur roadmap lanjutan lainnya masih pending.
