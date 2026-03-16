# KilatKoding

Boilerplate Next.js untuk developer Indonesia yang mau build SaaS dengan cepat — lengkap dengan auth, payment gateway lokal, email, blog, dan dashboard.

> **AI-Optimized:** Dikonfigurasi untuk Claude Code (`CLAUDE.md`, `AGENTS.md`), GitHub Copilot (`.github/copilot-instructions.md`), Cursor (`.cursorrules`), dan Windsurf (`.windsurfrules`).

---

## Tech Stack

- **Framework:** Next.js (App Router), React 19, TypeScript 5 (strict)
- **Styling:** Tailwind CSS 3, shadcn/ui (44 components, new-york style)
- **Auth:** Supabase SSR — email/password, Google OAuth, Magic Link
- **Payments:** Midtrans (Snap) + Doku (JOKUL) — keduanya payment gateway Indonesia
- **Email:** Resend + React Email — template welcome & invoice dalam Bahasa Indonesia
- **Blog:** MDX dengan frontmatter, reading time, dan tag support
- **Database:** Supabase PostgreSQL — migrations untuk `profiles`, `subscriptions`, `payments` (semua dengan RLS)
- **CI:** GitHub Actions (lint + build on push/PR)

---

## Quick Start

```bash
npm install
cp .env.example .env.local
# isi variabel di .env.local (lihat bagian Environment Variables)
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Salin `.env.example` ke `.env.local` dan isi nilai berikut:

```env
# Supabase — dari Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# URL aplikasi
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Payment provider aktif: "midtrans" atau "doku"
PAYMENT_PROVIDER=doku

# Doku (jika PAYMENT_PROVIDER=doku)
DOKU_CLIENT_ID=
DOKU_SECRET_KEY=

# Midtrans (jika PAYMENT_PROVIDER=midtrans)
MIDTRANS_SERVER_KEY=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=

# Email — dari Resend dashboard
RESEND_API_KEY=
EMAIL_FROM=KilatKoding <noreply@yourdomain.com>

# Admin — email yang boleh akses /admin (comma-separated)
ADMIN_EMAILS=you@example.com
```

Catatan penting:
- `MIDTRANS_SERVER_KEY`, `DOKU_CLIENT_ID`, dan `DOKU_SECRET_KEY` adalah server-only — jangan beri prefix `NEXT_PUBLIC_`
- `ADMIN_EMAILS` kosong = semua user authenticated bisa akses `/admin`
- `EMAIL_FROM` default ke `KilatKoding <noreply@kilatkoding.com>` jika tidak diset

---

## Commands

| Command | Fungsi |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Jalankan dev server |
| `npm run lint` | Jalankan ESLint |
| `npm run build` | Build production |
| `npm run start` | Jalankan production server |

---

## Documentation

- English: [`docs/en/README.md`](./docs/en/README.md)
- Bahasa Indonesia: [`docs/id/README.md`](./docs/id/README.md)

Dokumentasi lengkap mencakup arsitektur, setup Supabase, Midtrans, Doku, Resend, auth flow, dan inventory file.

---

## Database

Migrations tersedia di `supabase/migrations/`:

| File | Membuat |
| --- | --- |
| `20260316000001_create_profiles.sql` | Tabel `profiles` + auto-create trigger |
| `20260316000002_create_subscriptions.sql` | Tabel `subscriptions` + FREE tier trigger |
| `20260316000003_create_payments.sql` | Tabel `payments` + enums (plan, status, provider) |
| `20260316000004_create_waitlist.sql` | Tabel `waitlist` |

Cara apply:

```bash
# Opsi A: Supabase CLI
npx supabase db push

# Opsi B: Paste manual di Supabase dashboard SQL editor (urut sesuai nama file)
```

Generate TypeScript types setelah migrations di-apply:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
```

---

## AI Tools

Repo ini menyertakan konfigurasi untuk beberapa AI coding tools:

| File | Tool | Isi |
| --- | --- | --- |
| `CLAUDE.md` | Claude Code | Panduan project, commands, working rules, dokumentasi |
| `AGENTS.md` | Claude Code / agent umum | Ringkasan arsitektur, konvensi, environment vars, workflow |
| `.github/copilot-instructions.md` | GitHub Copilot | Instruksi konteks project untuk Copilot |
| `.cursorrules` | Cursor | Rules untuk Cursor AI editor |
| `.windsurfrules` | Windsurf | Rules untuk Windsurf AI editor |

Semua config file ini dirancang untuk memberikan konteks yang akurat tentang stack, konvensi, dan struktur project — supaya AI suggestions lebih relevan dan tidak menyarankan pola yang tidak sesuai.
