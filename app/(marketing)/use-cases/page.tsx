import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Use Cases — KilatKoding",
  description:
    "KilatKoding cocok untuk SaaS, marketplace, agency, dan startup. Lihat use case dan contoh nyatanya.",
  path: "/use-cases",
});

const useCases = [
  {
    badge: "SaaS Product",
    title: "Bikin SaaS dari nol",
    description:
      "Punya ide SaaS tapi males setup auth, payment, dan email dari scratch? KilatKoding udah nyiapain semua itu. Tinggal fokus bikin fitur utama yang bikin produk kamu beda.",
    example: "tools produktivitas, project management, analytics dashboard",
    features: [
      "Auth lengkap (email, Google, Magic Link)",
      "Subscription billing via Midtrans/Doku",
      "Admin dashboard bawaan",
      "Email transaksional (Resend)",
      "Protected routes & RLS siap pakai",
    ],
    cta: "Mulai Bikin SaaS",
    href: "/auth/sign-up",
    accent: "border-blue-500",
    badgeColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
    checkColor: "text-blue-500",
  },
  {
    badge: "Marketplace",
    title: "Platform multi-seller",
    description:
      "Bangun marketplace dengan sistem pembayaran dan manajemen user yang solid. Infrastructure untuk escrow, split payment, dan vendor management sudah bisa dikembangkan dari boilerplate ini.",
    example: "platform freelance, digital marketplace, B2B procurement",
    features: [
      "Auth bisa di-extend untuk buyer, seller, dan admin",
      "Payment gateway lokal (Midtrans + Doku)",
      "Webhook untuk konfirmasi pembayaran",
      "Admin monitoring semua transaksi",
      "Database schema yang bisa di-extend",
    ],
    cta: "Lihat Harga",
    href: "/#pricing",
    accent: "border-green-500",
    badgeColor: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
    checkColor: "text-green-500",
  },
  {
    badge: "Agency",
    title: "Deliver proyek klien lebih cepat",
    description:
      "Setiap proyek klien butuh landing page, auth, dan payment. Dengan KilatKoding, kamu punya starting point yang solid untuk setiap proyek baru — tanpa ngulang setup yang sama.",
    example: "company profile dengan payment, membership site, subscription service",
    features: [
      "Unlimited client projects (paket Pro+)",
      "Customizable untuk setiap brand klien",
      "Deploy ke Vercel dalam hitungan menit",
      "Dark mode + responsive out of the box",
      "MDX blog untuk content marketing klien",
    ],
    cta: "Mulai Sekarang",
    href: "/auth/sign-up",
    accent: "border-purple-500",
    badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
    checkColor: "text-purple-500",
  },
  {
    badge: "Startup",
    title: "Validasi ide dengan cepat",
    description:
      "Startup butuh ship cepat, pivot cepat, dan belajar dari user nyata. KilatKoding bikin kamu bisa launch MVP dalam seminggu — bukan sebulan — dan mulai kumpulkan feedback lebih awal.",
    example: "MVP B2C/B2B, waitlist product, micro-SaaS niche market",
    features: [
      "Dari nol ke live dalam 7 hari",
      "Waitlist page untuk pre-launch",
      "Blog untuk content + SEO dari hari pertama",
      "Analytics-ready structure",
      "AI-friendly codebase untuk iterasi cepat",
    ],
    cta: "Ship Sekarang",
    href: "/auth/sign-up",
    accent: "border-orange-500",
    badgeColor: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800",
    checkColor: "text-orange-500",
  },
];

export default function UseCasesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-3">
        <Badge variant="secondary">Use Cases</Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Cocok untuk berbagai jenis produk digital.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Apapun yang kamu bikin — SaaS, marketplace, atau project klien — KilatKoding punya
          fondasi yang kamu butuhkan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {useCases.map((uc) => (
          <div
            key={uc.badge}
            className={`rounded-lg border bg-card border-l-4 ${uc.accent} p-6 flex flex-col gap-5`}
          >
            {/* Header */}
            <div className="space-y-3">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${uc.badgeColor}`}>
                {uc.badge}
              </span>
              <h2 className="text-xl font-bold leading-tight">{uc.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{uc.description}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Contoh:</span> {uc.example}
              </p>
            </div>

            <Separator />

            {/* Features */}
            <ul className="space-y-2 flex-1">
              {uc.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${uc.checkColor}`} />
                  {f}
                </li>
              ))}
            </ul>

            <Button variant="outline" className="w-full mt-auto" asChild>
              <Link href={uc.href}>{uc.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center py-8 space-y-4 border rounded-lg bg-muted/30">
        <p className="font-semibold">Tidak yakin mana yang cocok untuk kamu?</p>
        <p className="text-sm text-muted-foreground">
          Semua paket include fondasi yang sama — bedanya hanya di jumlah gateway, template, dan support.
        </p>
        <Button asChild>
          <Link href="/#pricing">Lihat Semua Paket</Link>
        </Button>
      </div>
    </div>
  );
}
