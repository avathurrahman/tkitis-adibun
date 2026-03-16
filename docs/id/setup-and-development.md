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

## Environment Variable

```bash
cp .env.example .env.local
```

Isi dengan nilai-nilai berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=url-project-kamu
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=publishable-atau-anon-key-kamu
NEXT_PUBLIC_APP_URL=http://localhost:3000

MIDTRANS_SERVER_KEY=server-key-midtrans-kamu
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=client-key-midtrans-kamu

RESEND_API_KEY=api-key-resend-kamu
EMAIL_FROM=KilatKoding <noreply@domainmu.com>
```

Catatan:

- `NEXT_PUBLIC_APP_URL` dipakai oleh `config/site.ts` untuk membangun base URL site
- Kalau Supabase vars belum diset, area yang membutuhkan auth tidak akan berfungsi, tapi app tetap bisa dirender
- `MIDTRANS_SERVER_KEY` hanya untuk server; jangan pakai prefix `NEXT_PUBLIC_`
- `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` adalah publishable key untuk membuka Snap popup di frontend
- `EMAIL_FROM` defaultnya `KilatKoding <noreply@kilatkoding.com>` kalau tidak diset; sesuaikan dengan domain pengirim yang sudah diverifikasi di Resend

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
```

### 4. Generate TypeScript Types

Setelah migrasi diaplikasikan:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
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

## Perintah Umum

| Perintah | Tujuan |
| --- | --- |
| `npm run dev` | Jalankan development server lokal |
| `npm run build` | Buat production build |
| `npm run start` | Jalankan production server setelah build |
| `npm run lint` | Jalankan ESLint di seluruh repo |

## Alur Development Lokal

1. Salin `.env.example` ke `.env.local` dan isi nilai Supabase
2. Jalankan `npm run dev`
3. Buka `http://localhost:3000`
4. Test: landing page, sign up (email + Google), sign in (password + Magic Link), dashboard

## Catatan Deployment

- `app/layout.tsx` membangun `metadataBase` dari `VERCEL_URL` kalau tersedia, kalau tidak fallback ke `http://localhost:3000`
- App menggunakan `next/font/google` untuk Geist — production build butuh akses jaringan saat pertama kali
- Belum ada konfigurasi deployment spesifik yang ditambahkan; default Vercel langsung bisa dipakai
