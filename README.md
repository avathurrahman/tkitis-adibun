# KilatKoding

Boilerplate Next.js untuk developer Indonesia yang mau build SaaS dengan cepat — lengkap dengan auth, payment gateway lokal, email, blog, dan dashboard.

> **AI-Optimized:** Dikonfigurasi untuk Claude Code (`CLAUDE.md`, `AGENTS.md`), GitHub Copilot (`.github/copilot-instructions.md`), Cursor (`.cursorrules`), dan Windsurf (`.windsurfrules`).

---

## Tech Stack

- **Framework:** Next.js (App Router), React 19, TypeScript 5 (strict)
- **Styling:** Tailwind CSS 3, shadcn/ui (44 components, new-york style)
- **Auth:** Supabase SSR — email/password, Google OAuth, Magic Link
- **Access control:** role-based admin access via `user_roles` + legacy `ADMIN_EMAILS` bootstrap
- **Payments:** Midtrans (Snap) + Doku (JOKUL) — keduanya payment gateway Indonesia
- **Email:** Resend + React Email — template welcome & invoice dalam Bahasa Indonesia
- **Blog:** MDX dengan frontmatter, reading time, dan tag support
- **Database:** Supabase PostgreSQL — migrations untuk `profiles`, `subscriptions`, `payments`, `user_roles`, `waitlist`, `ai_usage`, `webhook_events`, `rate_limit_buckets`, dan `audit_logs` (semua dengan RLS)
- **CI:** GitHub Actions (`lint` + `typecheck` + `test` + `build` + Playwright smoke test)

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
SUPABASE_SERVICE_ROLE_KEY=

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

# Admin bootstrap — email di sini akan di-sync ke role admin saat login pertama
ADMIN_EMAILS=you@example.com
```

Catatan penting:
- `MIDTRANS_SERVER_KEY`, `DOKU_CLIENT_ID`, dan `DOKU_SECRET_KEY` adalah server-only — jangan beri prefix `NEXT_PUBLIC_`
- `SUPABASE_SERVICE_ROLE_KEY` dipakai untuk webhook, billing writes, dan reporting admin
- `SUPABASE_SERVICE_ROLE_KEY` juga dipakai untuk signed avatar URLs, persistent rate limiting, audit log, dan health check database
- `ADMIN_EMAILS` sekarang hanya untuk bootstrap awal admin; source of truth akses admin ada di tabel `user_roles`
- `EMAIL_FROM` default ke `KilatKoding <noreply@kilatkoding.com>` jika tidak diset

---

## Commands

| Command | Fungsi |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Jalankan dev server |
| `npm run env:check` | Cek env vars yang wajib dan opsional |
| `npm run lint` | Jalankan ESLint |
| `npm run typecheck` | Jalankan TypeScript tanpa emit |
| `npm test` | Jalankan unit + DOM tests |
| `npm run e2e` | Jalankan Playwright smoke tests |
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
| `20260316000005_create_ai_usage.sql` | Tabel `ai_usage` |
| `20260317000006_add_admin_roles_and_billing_hardening.sql` | Tabel `user_roles`, metadata plan pembayaran, index/reporting admin |
| `20260317000007_add_avatar_storage.sql` | Kolom `profiles.avatar_path` + bucket/policy Supabase Storage untuk avatar |
| `20260317000008_add_webhook_events.sql` | Tabel `webhook_events` + RPC claim idempotent untuk webhook Midtrans/Doku |
| `20260317000009_add_persistent_rate_limits.sql` | Tabel `rate_limit_buckets` + RPC rate limiting persisten |
| `20260317000010_add_audit_logs.sql` | Tabel `audit_logs` untuk jejak aksi admin, profile, dan payment |

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

## Operational Notes

- `POST /api/payments` sekarang memakai katalog plan di server. Client tidak bisa lagi menentukan nominal pembayaran sendiri.
- Billing user mendukung cancel/resume di akhir periode, dan subscription berbayar otomatis turun ke `FREE` setelah periode aktif berakhir bila tidak diperpanjang.
- `/admin` sekarang memerlukan role admin. User yang email-nya ada di `ADMIN_EMAILS` akan otomatis di-bootstrap ke role `admin` saat login pertama.
- Endpoint publik dan endpoint AI/payment sekarang memakai rate limiting persisten berbasis Supabase saat `SUPABASE_SERVICE_ROLE_KEY` tersedia, dengan fallback memori di local/dev dan header `X-RateLimit-*`.
- Avatar profil sekarang bisa di-upload ke Supabase Storage melalui signed upload URL, dan object lama ikut dibersihkan saat avatar diganti/dihapus.
- Webhook Midtrans/Doku sekarang punya event log, duplicate protection, dan retry-safe processing lewat tabel `webhook_events`.
- `/admin` sekarang menampilkan manajemen user, recent webhook events, dan audit trail dari event nyata.
- `GET /api/health` tersedia untuk health check konfigurasi utama dan konektivitas database server-side.
- Payment provider return URL diarahkan ke `/order/[id]`, dan `/payment/callback` disediakan sebagai fallback redirect kompatibilitas.
