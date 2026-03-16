# Supabase Dan Auth

## Ringkasan

Aplikasi saat ini menggunakan Supabase untuk autentikasi dan penanganan session. Setup yang ada sudah mendukung:

- Akses server-side melalui `@supabase/ssr`
- Akses browser-side untuk form auth yang interaktif

Implementasi ini berpusat pada cookie-based auth sehingga state autentikasi tersedia di seluruh App Router.

## Environment Variable Yang Dipakai

Aplikasi saat ini membaca:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Nilai ini dipakai baik di browser client maupun server client factory.

## Factory Client Supabase

### Browser Client

File: `lib/supabase/client.ts`

Fungsi:

- Membuat Supabase browser client dengan `createBrowserClient`
- Dipakai oleh form auth interaktif seperti login, sign up, dan reset password

### Server Client

File: `lib/supabase/server.ts`

Fungsi:

- Membuat Supabase server client yang terikat pada request dengan `createServerClient`
- Membaca dan menulis cookie melalui `next/headers`
- Menghindari reuse client global, yang penting terutama di environment server

### Proxy Session Updater

File: `lib/supabase/proxy.ts`

Fungsi:

- Melakukan refresh atau pembacaan auth session saat request
- Menyinkronkan cookie antara request dan response
- Mengalihkan user yang belum login dari route yang protected

## Alur Request

1. `proxy.ts` berjalan untuk request yang cocok dengan matcher.
2. `updateSession()` membuat Supabase server client yang terikat ke request cookies.
3. `supabase.auth.getClaims()` dipanggil agar session tersedia dan tetap up to date.
4. Jika request bukan untuk `/` atau `/auth/*` dan tidak ada user yang login, request diarahkan ke `/auth/login`.
5. Response dari Supabase tetap dipertahankan agar auth cookie tetap sinkron.

Jika environment variable belum tersedia, proxy akan return lebih awal dan melewati perilaku auth/session.

## Flow Auth Yang Tersedia Saat Ini

### Sign Up

Komponen: `components/sign-up-form.tsx`

Perilaku:

- Mengambil input email, password, dan repeat-password
- Melakukan pengecekan kecocokan password di client
- Memanggil `supabase.auth.signUp()`
- Mengatur `emailRedirectTo` ke `${window.location.origin}/protected`
- Mengarahkan user ke `/auth/sign-up-success` setelah submit berhasil

Implikasi saat ini:

- UI mengasumsikan konfirmasi email terjadi di luar form lalu user kembali ke aplikasi.
- Halaman success hanya bersifat informasional.

### Sign In

Komponen: `components/login-form.tsx`

Perilaku:

- Mengambil email dan password
- Memanggil `supabase.auth.signInWithPassword()`
- Mengarahkan ke `/protected` setelah berhasil

### Forgot Password

Komponen: `components/forgot-password-form.tsx`

Perilaku:

- Mengambil email
- Memanggil `supabase.auth.resetPasswordForEmail()`
- Mengatur `redirectTo` ke `${window.location.origin}/auth/update-password`
- Menampilkan state sukses secara inline setelah email dikirim

### Update Password

Komponen: `components/update-password-form.tsx`

Perilaku:

- Mengambil password baru
- Memanggil `supabase.auth.updateUser({ password })`
- Mengarahkan ke `/protected` setelah berhasil

### Logout

Komponen: `components/logout-button.tsx`

Perilaku:

- Melakukan sign out melalui Supabase
- Mengembalikan aplikasi ke state tidak terautentikasi

### Status Auth Di Header

Komponen: `components/auth-button.tsx`

Perilaku:

- Berjalan di server
- Memanggil `supabase.auth.getClaims()`
- Jika user ada, menampilkan email user dan tombol logout
- Jika tidak ada user, menampilkan tombol sign in dan sign up

## Route Konfirmasi

File: `app/auth/confirm/route.ts`

Route ini:

- Membaca `token_hash`, `type`, dan `next` opsional dari query string
- Memanggil `supabase.auth.verifyOtp()`
- Melakukan redirect ke `next` jika berhasil
- Melakukan redirect ke `/auth/error` jika gagal

Dengan ini project memiliki endpoint verifikasi OTP yang terpisah, meskipun UI starter juga memakai target redirect langsung untuk flow auth lain.

## Perilaku Protected Route

File: `app/protected/page.tsx`

Halaman ini:

- Membuat server-side Supabase client
- Memanggil `supabase.auth.getClaims()`
- Redirect ke `/auth/login` jika claims tidak ada atau terjadi error
- Merender claims user saat ini sebagai JSON yang diformat

Saat ini halaman tersebut masih berfungsi sebagai bukti bahwa setup sudah benar. Tempat ini kemungkinan besar akan menjadi lokasi pertama untuk data aplikasi yang sebenarnya pada area authenticated.

## Batasan Integrasi Supabase Saat Ini

Integrasi saat ini sudah kuat untuk ukuran starter, tetapi masih ada beberapa keputusan lanjutan:

- Belum ada typed database schema generation
- Belum ada query tabel di luar contoh auth/session
- Belum ada panduan Row Level Security untuk tabel aplikasi di masa depan
- Belum ada workflow admin-only atau service-role di server

## Saran Peningkatan Berikutnya

- Definisikan tabel pertama yang benar-benar dibutuhkan aplikasi
- Tambahkan database type generation jika ingin query yang strongly typed
- Ganti tampilan claims di protected page dengan data aplikasi yang sebenarnya
- Putuskan apakah mutasi berikutnya lebih cocok memakai client call, server actions, atau route handlers
