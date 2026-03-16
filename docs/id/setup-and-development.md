# Setup Dan Pengembangan

## Prasyarat

Project ini diinisialisasi dan diverifikasi dengan:

- Node.js `v24.4.1`
- npm `11.4.2`

Versi Node.js modern lain yang kompatibel dengan Next.js 16 kemungkinan juga akan berjalan, tetapi menyamakan baseline di atas akan mengurangi potensi perbedaan perilaku.

## Install Dependency

Dependency saat ini sudah terpasang di repository ini. Jika perlu menginstal ulang:

```bash
npm install
```

## Environment Variable

Buat file environment lokal dari contoh yang tersedia:

```bash
cp .env.example .env.local
```

Isi nilai berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
```

Catatan:

- Project saat ini membutuhkan Supabase public URL dan publishable key.
- Legacy anon key dari Supabase juga masih bisa dipakai dengan nama variable saat ini.
- Jika variable ini belum diset, aplikasi tetap bisa dirender, tetapi area yang bergantung pada auth akan menampilkan warning state starter, bukan session-aware UI yang berfungsi penuh.

## Setup Di Dashboard Supabase

Sebelum alur auth berjalan end to end, pastikan project Supabase Anda sudah dikonfigurasi dengan redirect URL yang benar.

Redirect URL lokal yang direkomendasikan:

- `http://localhost:3000/protected`
- `http://localhost:3000/auth/update-password`
- `http://localhost:3000/auth/confirm`

Padanan production yang direkomendasikan:

- `https://your-domain.com/protected`
- `https://your-domain.com/auth/update-password`
- `https://your-domain.com/auth/confirm`

Kenapa ini penting:

- Flow sign-up saat ini meminta Supabase mengembalikan user ke `/protected`
- Flow forgot-password mengarahkan user ke `/auth/update-password`
- Route konfirmasi tersedia untuk flow OTP yang lewat `/auth/confirm`

## Command Yang Umum Dipakai

| Command | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan development server lokal |
| `npm run build` | Membuat production build |
| `npm run start` | Menjalankan production server setelah build |
| `npm run lint` | Menjalankan ESLint untuk seluruh repo |

## Alur Development Lokal

1. Tambahkan Supabase environment variables ke `.env.local`.
2. Jalankan aplikasi dengan `npm run dev`.
3. Buka `http://localhost:3000`.
4. Uji flow sign up, sign in, reset password, dan protected page.

## Verifikasi Yang Sudah Dilakukan

Codebase saat ini sudah diverifikasi dengan:

- `npm run lint`
- `npm run build`

Keduanya lolos setelah perbaikan kecil pasca-scaffold yang dijelaskan di [Kondisi Saat Ini](./current-state.md).

## Catatan Deployment

- `app/layout.tsx` membangun `metadataBase` dari `VERCEL_URL` jika tersedia, jika tidak akan fallback ke `http://localhost:3000`.
- Aplikasi menggunakan `next/font/google` untuk Geist. Di environment yang sangat dibatasi, production build mungkin membutuhkan akses jaringan untuk mengambil font saat build pertama.
- Aplikasi sudah selaras dengan asumsi deployment model Vercel, tetapi belum ada konfigurasi deployment yang spesifik ke produk.

## Saran Langkah Berikutnya

- Ganti metadata title dan description bawaan starter
- Buat tabel pertama yang benar-benar dibutuhkan di Supabase
- Tambahkan typed database helper jika query aplikasi nanti cukup banyak
- Putuskan apakah mutasi auth/data berikutnya tetap di client component atau sebagian dipindah ke server actions
