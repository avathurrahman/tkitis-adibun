import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, DollarSign, Link2, BarChart2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Afiliasi — KilatKoding",
  description: "Bergabung jadi afiliasi KilatKoding dan dapatkan komisi 30% untuk setiap referral.",
};

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Daftar & Dapat Link",
    desc: "Daftar program afiliasi lewat dashboard. Kamu langsung dapat link unik dan materi promosi.",
  },
  {
    icon: BarChart2,
    step: "02",
    title: "Bagikan ke Audience",
    desc: "Share link ke blog, YouTube, Twitter, atau grup developer Indonesia kamu. Semua konversi ter-track otomatis.",
  },
  {
    icon: DollarSign,
    step: "03",
    title: "Terima Komisi",
    desc: "Dapat 30% dari setiap penjualan yang datang dari link kamu. Dibayar tiap bulan via transfer bank.",
  },
];

const tiers = [
  {
    name: "Starter",
    requirement: "0–5 referral/bulan",
    commission: "20%",
    perks: ["Link afiliasi unik", "Dashboard tracking", "Materi promosi"],
    highlight: false,
  },
  {
    name: "Partner",
    requirement: "6–20 referral/bulan",
    commission: "30%",
    perks: ["Semua di Starter", "Komisi lebih tinggi", "Priority support", "Co-marketing opportunities"],
    highlight: true,
  },
  {
    name: "Ambassador",
    requirement: "21+ referral/bulan",
    commission: "40%",
    perks: ["Semua di Partner", "Komisi tertinggi", "Akses beta fitur baru", "1:1 strategy call"],
    highlight: false,
  },
];

const faqs = [
  {
    q: "Berapa lama cookie tracking-nya?",
    a: "Cookie afiliasi berlaku selama 60 hari. Jadi kalau seseorang klik link kamu dan beli dalam 60 hari, kamu tetap dapat komisi.",
  },
  {
    q: "Kapan komisi dibayarkan?",
    a: "Komisi dibayarkan setiap tanggal 10 bulan berikutnya via transfer bank BCA/Mandiri/BRI, minimal Rp 100.000.",
  },
  {
    q: "Apakah ada batasan berapa banyak yang bisa direferral?",
    a: "Tidak ada batasan. Semakin banyak referral, semakin tinggi tier komisi kamu.",
  },
  {
    q: "Bisa afiliasi kalau belum beli KilatKoding?",
    a: "Bisa, tapi kami sarankan beli dulu supaya bisa review dan rekomendasikan dengan jujur. Kredibilitas kamu lebih terjaga.",
  },
];

export default function AffiliatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <Badge variant="secondary">Program Afiliasi</Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Rekomendasikan KilatKoding. Dapat komisi 30%.
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Bergabung dengan puluhan afiliasi yang sudah menghasilkan passive income dengan
          merekomendasikan KilatKoding ke komunitas developer Indonesia.
        </p>
        <Button size="lg" asChild>
          <Link href="/auth/sign-up">Daftar Jadi Afiliasi — Gratis</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div key={s.step} className="space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Langkah {s.step}
            </p>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Tier Komisi</h2>
          <p className="text-muted-foreground">Semakin banyak referral, semakin besar komisi.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.highlight ? "border-primary shadow-md" : "border-border/50"}
            >
              {tier.highlight && (
                <div className="text-center py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-t-lg">
                  Paling Banyak Dipilih
                </div>
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{tier.requirement}</p>
                <div className="text-3xl font-bold text-primary">{tier.commission}</div>
                <p className="text-xs text-muted-foreground">komisi per penjualan</p>
              </CardHeader>
              <Separator />
              <CardContent className="pt-3">
                <ul className="space-y-2">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {faqs.map((faq) => (
            <div key={faq.q} className="space-y-1.5">
              <p className="font-medium text-sm">{faq.q}</p>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-8 rounded-lg border bg-muted/20 space-y-4">
        <h3 className="text-xl font-bold">Siap mulai menghasilkan?</h3>
        <p className="text-sm text-muted-foreground">
          Daftar gratis, mulai share, dan terima komisi bulan ini.
        </p>
        <Button asChild>
          <Link href="/auth/sign-up">Daftar Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}
