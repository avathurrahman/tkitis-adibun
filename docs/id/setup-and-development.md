# Setup Dan Pengembangan

## Prasyarat

Project ini diinisialisasi dan diverifikasi dengan:

- Node.js `v24.4.1`
- npm `11.4.2`

Versi Node.js modern apapun yang kompatibel dengan Next.js 16 seharusnya bisa dipakai.

## Install Dependency

```bash
npm install
```

## Automated Test

Repository ini sekarang sudah punya test suite berbasis Vitest dengan:

- Unit test dan route handler test di environment Node
- Test hook dan komponen di JSDOM lewat Testing Library
- Playwright smoke test untuk route publik
- Integrasi yang dimock untuk Supabase, AI provider, Midtrans, Doku, dan Resend

## Environment Variable

```bash
cp .env.example .env.local
```

Isi dengan nilai-nilai berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=url-project-kamu
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=publishable-atau-anon-key-kamu
SUPABASE_SERVICE_ROLE_KEY=service-role-key-kamu
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_WAITLIST=true
NEXT_PUBLIC_ENABLE_CONTACT=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_ADMIN=true
NEXT_PUBLIC_ENABLE_AI=true

MIDTRANS_SERVER_KEY=server-key-midtrans-kamu
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=client-key-midtrans-kamu

RESEND_API_KEY=api-key-resend-kamu
EMAIL_FROM=KilatKoding <noreply@domainmu.com>

DOKU_CLIENT_ID=client-id-doku-kamu
DOKU_SECRET_KEY=secret-key-doku-kamu

ADMIN_EMAILS=kamu@example.com,rekan@example.com

# AI (opsional)
AI_DEFAULT_PROVIDER=openai
OPENAI_API_KEY=api-key-openai-kamu
ANTHROPIC_API_KEY=api-key-anthropic-kamu
```

Catatan:

- `NEXT_PUBLIC_APP_URL` dipakai oleh `config/site.ts` untuk membangun base URL site
- Starter sekarang degrade dengan aman: config yang belum lengkap hanya mematikan fitur terkait, bukan membuat seluruh app crash
- Kalau ada fitur yang memang tidak dipakai di app kamu, set toggle `NEXT_PUBLIC_ENABLE_*` terkait ke `false` supaya UI menandainya sebagai fitur yang sengaja dimatikan
- `npm run env:check` sekarang menampilkan fitur mana yang sudah siap, mana yang masih fallback mode, dan mana yang dimatikan lewat toggle
- `/api/health` sekarang menyertakan ringkasan kesiapan per fitur
- Kalau Supabase vars belum diset, area yang membutuhkan auth tidak akan berfungsi, tapi app tetap bisa dirender
- `SUPABASE_SERVICE_ROLE_KEY` dibutuhkan untuk write webhook, update profil, lookup order, dan reporting admin
- `MIDTRANS_SERVER_KEY` hanya untuk server; jangan pakai prefix `NEXT_PUBLIC_`
- `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` adalah publishable key untuk membuka Snap popup di frontend
- `EMAIL_FROM` defaultnya `KilatKoding <noreply@kilatkoding.com>` kalau tidak diset; sesuaikan dengan domain pengirim yang sudah diverifikasi di Resend
- `DOKU_CLIENT_ID` dan `DOKU_SECRET_KEY` hanya untuk server; jangan pakai prefix `NEXT_PUBLIC_`
- `ADMIN_EMAILS` sekarang hanya daftar bootstrap; user yang cocok akan di-upsert ke `user_roles` sebagai `admin` saat login pertama
- Variabel AI bersifat opsional; fitur AI nonaktif kalau key belum diset
- `AI_DEFAULT_PROVIDER` defaultnya `openai`; set ke `anthropic` untuk pakai Claude

## Setup Supabase Dashboard

### 1. Redirect URL

Tambahkan di **Authentication > URL Configuration**:

```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/update-password
```

Untuk production:

```
https://domain-kamu.com/auth/confirm
https://domain-kamu.com/auth/update-password
```

Kenapa `/auth/confirm` jadi callback utama:
- Link verifikasi email masuk ke sini
- Email Magic Link masuk ke sini
- Redirect OAuth (Google) masuk ke sini
- Reset password tetap pakai `/auth/update-password` secara langsung

### 2. Google OAuth

1. Aktifkan provider Google di **Authentication > Providers > Google**
2. Masukkan Google Client ID dan Secret (dari [Google Cloud Console](https://console.cloud.google.com))
3. Salin callback URL Supabase yang ditampilkan dan tambahkan ke **Authorized redirect URIs** di Google OAuth app kamu

### 3. Aplikasikan Migrasi Database

```bash
# Opsi A: Supabase CLI
npx supabase db push

# Opsi B: Paste setiap file secara manual di SQL editor Supabase dashboard (berurutan)
# supabase/migrations/20260316000001_create_profiles.sql
# supabase/migrations/20260316000002_create_subscriptions.sql
# supabase/migrations/20260316000003_create_payments.sql
# supabase/migrations/20260316000004_create_waitlist.sql
# supabase/migrations/20260316000005_create_ai_usage.sql
# supabase/migrations/20260317000006_add_admin_roles_and_billing_hardening.sql
```

## Setup Midtrans

1. Buat akun Midtrans di [midtrans.com](https://midtrans.com)
2. Di **Settings > Access Keys**, salin **Server Key** dan **Client Key**
3. Pakai kunci **Sandbox** untuk development; kunci **Production** untuk live
4. App otomatis pilih mode berdasarkan `NODE_ENV`: `production` pakai live, selainnya pakai sandbox
5. Daftarkan URL webhook server kamu di **Settings > Configuration > Payment Notification URL**:

```
https://domain-kamu.com/api/webhooks/midtrans
```

Handler webhook di `app/api/webhooks/midtrans/route.ts` memverifikasi signature HMAC-SHA512 dari Midtrans sebelum memproses update status apapun.

## Setup Resend

1. Buat akun Resend di [resend.com](https://resend.com)
2. Tambahkan dan verifikasi domain pengirim kamu di **Domains**
3. Generate API key di **API Keys**
4. Set `RESEND_API_KEY` dan `EMAIL_FROM` di `.env.local`

Template email ada di `emails/`. Saat ini tersedia dua template:
- `emails/welcome.tsx` — dikirim saat user baru signup
- `emails/invoice.tsx` — dikirim setelah pembayaran berhasil

Panggil `sendEmail()` dari `lib/email.ts` untuk mengirim template React Email apapun.

## Setup Doku

1. Buat akun Doku di [doku.com](https://doku.com)
2. Dari merchant dashboard, ambil **Client ID** dan **Secret Key**
3. Pakai kredensial **Sandbox** untuk development; **Production** untuk live
4. App otomatis pilih mode berdasarkan `NODE_ENV`: `production` pakai `api.doku.com`, selainnya pakai `sandbox.doku.com`
5. Daftarkan URL webhook server kamu di pengaturan merchant Doku:

```
https://domain-kamu.com/api/webhooks/doku
```

Handler webhook di `app/api/webhooks/doku/route.ts` memverifikasi tanda tangan check-word Doku sebelum memproses notifikasi.

## Admin Dashboard

Halaman admin di `/admin` menampilkan:
- Total revenue dari payment yang `PAID`
- Jumlah subscription aktif
- Jumlah paket berbayar
- Tabel payment terbaru yang sudah dipaginasi

Akses dikontrol oleh `user_roles`. `ADMIN_EMAILS` hanya dipakai untuk bootstrap role admin pertama.

## Perintah Umum

| Perintah | Tujuan |
| --- | --- |
| `npm run dev` | Jalankan development server lokal |
| `npm run env:check` | Validasi env vars wajib dan opsional |
| `npm run build` | Buat production build |
| `npm run start` | Jalankan production server setelah build |
| `npm run lint` | Jalankan ESLint di seluruh repo |
| `npm run typecheck` | Jalankan pengecekan TypeScript tanpa emit |
| `npm run test` | Jalankan seluruh automated test sekali |
| `npm run test:watch` | Jalankan test suite dalam mode watch |
| `npm run e2e` | Jalankan Playwright smoke tests |

## Alur Development Lokal

1. Salin `.env.example` ke `.env.local`
2. Matikan fitur yang tidak dipakai dengan set `NEXT_PUBLIC_ENABLE_*` terkait ke `false`
3. Isi env var yang dibutuhkan oleh fitur yang tetap aktif
4. Jalankan `npm run env:check` untuk melihat fitur mana yang sudah siap dan mana yang masih fallback mode
5. Jalankan `npm run dev`
6. Buka `http://localhost:3000`
7. Test route yang memang kamu biarkan aktif

## Catatan Deployment

- `app/layout.tsx` membangun `metadataBase` dari `VERCEL_URL` kalau tersedia, kalau tidak fallback ke `http://localhost:3000`
- App menggunakan `next/font/google` untuk Geist — production build butuh akses jaringan saat pertama kali
- Jalankan `npx playwright install chromium` sekali sebelum pertama kali memakai `npm run e2e` di lokal
- Belum ada konfigurasi deployment spesifik yang ditambahkan; default Vercel langsung bisa dipakai
