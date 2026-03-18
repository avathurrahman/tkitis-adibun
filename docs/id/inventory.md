# Inventaris Source

File ini adalah referensi praktis untuk source file penting yang saat ini ada di repository.

## File Root

| File | Tujuan |
| --- | --- |
| `package.json` | Script dan deklarasi dependency |
| `next.config.ts` | Konfigurasi Next.js dengan `cacheComponents: true` |
| `tsconfig.json` | Konfigurasi TypeScript strict dan path alias `@/*` |
| `tailwind.config.ts` | Ekstensi tema Tailwind dan registrasi plugin |
| `components.json` | Konfigurasi proyek shadcn/ui |
| `proxy.ts` | Update session Supabase dan gating auth saat request masuk |
| `.env.example` | Referensi environment variable yang diperlukan |

## File Config

| File | Tujuan |
| --- | --- |
| `config/site.ts` | `siteConfig` — nama site, deskripsi, base URL |
| `config/navigation.ts` | Array link `marketingNav` dan `dashboardNav` |
| `lib/seo.ts` | Helper SEO bersama untuk metadata, canonical URL, absolute URL, dan serialisasi JSON-LD |
| `lib/validations.ts` | Schema Zod bersama untuk validasi request API |

## File App Router

| File | Tujuan |
| --- | --- |
| `app/layout.tsx` | Root layout: font Geist, metadata, `lang="id"`, ThemeProvider, TooltipProvider, Toaster |
| `app/globals.css` | Layer Tailwind dan design token |
| `app/(marketing)/layout.tsx` | Layout marketing: wrapper `Header` + `Footer` |
| `app/(marketing)/page.tsx` | Landing page — `/` |
| `app/(dashboard)/layout.tsx` | Layout dashboard: `Header` + container max-width |
| `app/(dashboard)/dashboard/page.tsx` | Dashboard terautentikasi — `/dashboard` |
| `app/(dashboard)/dashboard/settings/page.tsx` | Settings — `/dashboard/settings` (profil + ganti password) |
| `app/(dashboard)/dashboard/billing/page.tsx` | Billing — `/dashboard/billing` (paket + alur pembayaran) |
| `app/(dashboard)/admin/page.tsx` | Admin dashboard — `/admin` (dibatasi oleh `ADMIN_EMAILS`) |
| `app/(marketing)/about/page.tsx` | Halaman about — `/about` |
| `app/(marketing)/affiliates/page.tsx` | Program afiliasi — `/affiliates` |
| `app/(marketing)/changelog/page.tsx` | Changelog produk — `/changelog` |
| `app/(marketing)/checkout/page.tsx` | Alur checkout / pembelian — `/checkout` |
| `app/(marketing)/compare/page.tsx` | Perbandingan paket — `/compare` |
| `app/(marketing)/contact/page.tsx` | Halaman formulir kontak — `/contact` |
| `app/(marketing)/loading.tsx` | State loading skeleton seksi marketing |
| `app/(marketing)/open/page.tsx` | Metrik startup terbuka — `/open` |
| `app/(marketing)/order/[id]/page.tsx` | Konfirmasi pesanan / pasca-pembelian — `/order/[id]` |
| `app/(marketing)/roadmap/page.tsx` | Roadmap produk publik — `/roadmap` |
| `app/(marketing)/status/page.tsx` | Status layanan — `/status` |
| `app/(marketing)/use-cases/page.tsx` | Galeri use case — `/use-cases` |
| `app/(marketing)/waitlist/page.tsx` | Pendaftaran waitlist — `/waitlist` |
| `app/(marketing)/waitlist/waitlist-page.tsx` | UI countdown dan submit waitlist di sisi klien |
| `app/auth/login/page.tsx` | Layar masuk |
| `app/auth/sign-up/page.tsx` | Layar registrasi |
| `app/auth/sign-up-success/page.tsx` | Instruksi pasca-registrasi |
| `app/auth/forgot-password/page.tsx` | Layar permintaan reset password |
| `app/auth/update-password/page.tsx` | Layar update password |
| `app/auth/error/page.tsx` | Tampilan error auth |
| `app/auth/verify-email/page.tsx` | Instruksi verifikasi email |
| `app/auth/verify-email/verify-email-client.tsx` | Alur kirim ulang email verifikasi di sisi klien |
| `app/auth/confirm/route.ts` | Handler verifikasi OTP/OAuth Supabase |
| `app/error.tsx` | Error boundary root |
| `app/not-found.tsx` | Halaman 404 global |
| `app/robots.ts` | Generasi robots.txt dinamis |
| `app/sitemap.ts` | Generasi sitemap XML dinamis |

## Komponen Layout

| File | Tujuan |
| --- | --- |
| `components/layout/header.tsx` | Header site: logo, `AuthButton`, `ThemeSwitcher` |
| `components/layout/footer.tsx` | Footer site: copyright, `ThemeSwitcher` |
| `components/layout/desktop-nav.tsx` | Link navigasi bar desktop |
| `components/layout/current-year.tsx` | Tahun copyright dinamis (komponen klien) |

## Komponen Auth Dan Shell

| File | Tujuan |
| --- | --- |
| `components/auth/supabase-env-notice.tsx` | Banner peringatan saat env var Supabase tidak ada |
| `components/config/feature-notice.tsx` | Notice bersama untuk fitur yang dimatikan atau belum lengkap konfigurasinya |
| `components/auth-button.tsx` | Aksi header yang sadar auth (server component) |
| `components/logout-button.tsx` | Aksi sign out |
| `components/login-form.tsx` | Login: tab email/password, tab Magic Link, tombol Google OAuth |
| `components/sign-up-form.tsx` | Registrasi: tombol Google OAuth + form email/password |
| `components/forgot-password-form.tsx` | Form request reset password |
| `components/update-password-form.tsx` | Form update password |
| `components/theme-switcher.tsx` | Switcher mode light/dark/system |
| `components/contact-form.tsx` | Formulir kontak dengan field dan penanganan pengiriman |

## File Utility Bersama

| File | Tujuan |
| --- | --- |
| `lib/utils.ts` | Helper `cn()` dan pengecekan auth aktif berbasis env |
| `lib/config/public-features.ts` | Toggle fitur publik bersama dan helper env yang aman untuk client |
| `lib/config/features.ts` | Peta kesiapan fitur di server untuk UI, route, dan health check |
| `lib/supabase/client.ts` | Factory browser Supabase client |
| `lib/supabase/server.ts` | Factory server Supabase client |
| `lib/supabase/proxy.ts` | Logika refresh session dan redirect yang dipakai `proxy.ts` |
| `lib/email.ts` | `sendEmail()` — wrapper Resend yang merender template React Email dan mengirimnya via API |

## Hooks

| File | Tujuan |
| --- | --- |
| `hooks/use-auth.ts` | State session user di client-side dengan listener `onAuthStateChange` |
| `hooks/use-payment.ts` | State pembayaran sisi klien dan helper alur Midtrans/Doku |
| `hooks/use-subscription.ts` | State subscription di client-side; mengekspos helper `isPro` dan `isActive` |
| `hooks/use-ai-chat.ts` | Hook AI chat client-side yang membungkus `useChat` dengan `DefaultChatTransport` |

## Library Payment

| File | Tujuan |
| --- | --- |
| `lib/payments/midtrans.ts` | Inisialisasi Snap + CoreAPI client, `createSnapTransaction()`, `verifyMidtransSignature()`, `isMidtransPaymentSuccess()` |
| `lib/payments/doku.ts` | HTTP client Doku JOKUL, `createDokuPayment()`, `verifyDokuNotification()`, `isDokuPaymentSuccess()` |

## Library AI

| File | Tujuan |
| --- | --- |
| `lib/ai/provider.ts` | `getModel()` — factory model provider-agnostic untuk OpenAI dan Anthropic via Vercel AI SDK |
| `lib/ai/usage.ts` | `trackUsage()`, `getMonthlyUsage()`, `checkUsageLimit()` — tracking token bulanan per-user |
| `lib/ai/middleware.ts` | `authorizeAIRequest()` — auth + pengecekan config provider + gating usage untuk AI API route |

## API Route

| File | Method | Tujuan |
| --- | --- | --- |
| `app/api/payments/route.ts` | POST | Dilindungi auth — membuat payment session (Midtrans atau Doku), menyimpan catatan pembayaran pending |
| `app/api/webhooks/midtrans/route.ts` | POST | Memverifikasi tanda tangan Midtrans, update `payments.status`, aktifkan subscription jika berhasil |
| `app/api/webhooks/doku/route.ts` | POST | Memverifikasi notifikasi Doku, update `payments.status`, aktifkan subscription jika berhasil |
| `app/api/contact/route.ts` | POST | Formulir kontak — validasi input dan kirim pesan via Resend |
| `app/api/waitlist/route.ts` | POST | Waitlist — validasi input dan simpan pendaftaran ke Supabase |
| `app/api/ai/chat/route.ts` | POST | Streaming chat dilindungi auth + usage tracking |
| `app/api/ai/generate/route.ts` | POST | One-shot generation dilindungi auth + usage tracking |

## Template Email

| File | Tujuan |
| --- | --- |
| `emails/welcome.tsx` | Email onboarding — sapaan + link ke dashboard, dalam Bahasa Indonesia |
| `emails/invoice.tsx` | Konfirmasi pembayaran — order ID, paket, jumlah dalam Rupiah |

## Migrasi Database

| File | Membuat |
| --- | --- |
| `supabase/migrations/20260316000001_create_profiles.sql` | Tabel `profiles` + trigger auto-create saat signup |
| `supabase/migrations/20260316000002_create_subscriptions.sql` | Tabel `subscriptions` + trigger auto-create FREE saat signup |
| `supabase/migrations/20260316000003_create_payments.sql` | Tabel `payments` + enum (plan, payment_status, payment_provider) |
| `supabase/migrations/20260316000004_create_waitlist.sql` | Tabel `waitlist` |
| `supabase/migrations/20260316000005_create_ai_usage.sql` | Tabel `ai_usage` + RLS + index untuk query usage bulanan |

## Primitive shadcn/ui Yang Terpasang (44 total)

accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, label, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, template-banner, textarea, toggle, toggle-group, tooltip

## Seksi Landing Page

| File | Tujuan |
| --- | --- |
| `components/sections/hero.tsx` | Hero — headline, badge, CTA |
| `components/sections/features.tsx` | Grid fitur — 6 kartu dengan ikon |
| `components/sections/pricing.tsx` | Harga — kartu FREE/PRO dengan toggle bulanan/tahunan |
| `components/sections/testimonials.tsx` | Testimoni — Avatar + Carousel |
| `components/sections/faq.tsx` | FAQ — Accordion |
| `components/sections/cta.tsx` | Banner CTA |
| `components/sections/ai-optimized.tsx` | Seksi fitur AI-Optimized |
| `components/sections/pain-points.tsx` | Seksi pain point |
| `components/sections/tech-stack.tsx` | Seksi showcase tech stack |
| `components/sections/timeline.tsx` | Seksi timeline / roadmap produk |

## Komponen Halaman Docs

| File | Tujuan |
| --- | --- |
| `components/docs/component-demo.tsx` | Menampilkan preview komponen shadcn/ui secara langsung |
| `components/docs/tab-controls.tsx` | Tab controls untuk halaman docs komponen |
| `components/docs/tab-data.tsx` | Tab tampilan data |
| `components/docs/tab-forms.tsx` | Tab komponen form |
| `components/docs/tab-foundations.tsx` | Tab primitif fondasi |
| `components/docs/tab-navigation.tsx` | Tab komponen navigasi |
| `components/docs/tab-overlays.tsx` | Tab komponen overlay |

## Komponen Dashboard

| File | Tujuan |
| --- | --- |
| `components/dashboard/subscription-card.tsx` | Status langganan dengan Badge, Progress, Skeleton |
| `components/dashboard/payments-table.tsx` | Pembayaran terbaru — Table + Badge, query Supabase sisi klien |
| `components/dashboard/admin-revenue-chart.tsx` | Grafik revenue batang (recharts, komponen klien) |
| `components/dashboard/payment-button.tsx` | Tombol upgrade — memanggil /api/payments, menangani Midtrans Snap + Doku redirect |

## CI / Infrastruktur

| File | Tujuan |
| --- | --- |
| `.github/workflows/ci.yml` | GitHub Actions: lint + build di push dan PR ke `main` |

## Blog

| File | Tujuan |
| --- | --- |
| `lib/mdx.ts` | `getAllPosts()` dan `getPostBySlug()` — helper MDX berbasis file system dengan frontmatter dan estimasi baca |
| `app/(marketing)/blog/page.tsx` | Daftar blog — `/blog` |
| `app/(marketing)/blog/[slug]/page.tsx` | Detail post blog — `/blog/[slug]` |
| `content/blog/memulai-dengan-kilatkoding.mdx` | Post contoh: panduan memulai |
| `content/blog/integrasi-midtrans-nextjs.mdx` | Post contoh: tutorial integrasi Midtrans |

## File Yang Belum Dibuat (Ke Depannya)

| File | Tujuan |
| --- | --- |
| `types/database.ts` | TypeScript types yang di-generate dari Supabase (jalankan setelah migrasi diaplikasikan) |
