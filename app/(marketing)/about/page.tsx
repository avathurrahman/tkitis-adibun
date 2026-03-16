import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Twitter, Zap, Shield, Globe, Code2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami — KilatKoding",
  description: "KilatKoding dibikin untuk developer Indonesia yang mau ship SaaS lebih cepat tanpa setup dari nol.",
};

const stack = [
  { name: "Next.js 16", desc: "App Router, RSC, Turbopack" },
  { name: "TypeScript", desc: "Type-safe dari ujung ke ujung" },
  { name: "Tailwind CSS", desc: "Styling yang cepat dan konsisten" },
  { name: "shadcn/ui", desc: "43 komponen siap pakai" },
  { name: "Supabase", desc: "Auth + Postgres + RLS" },
  { name: "Midtrans & Doku", desc: "Payment gateway lokal Indonesia" },
  { name: "Resend", desc: "Email transaksional yang andal" },
  { name: "Vercel", desc: "Deploy dalam hitungan menit" },
];

const values = [
  {
    icon: Zap,
    title: "Ship Cepat",
    desc: "Semua setup boring udah diselesaikan. Kamu tinggal fokus bikin fitur yang bikin produk kamu beda.",
  },
  {
    icon: Globe,
    title: "Indonesia-First",
    desc: "Midtrans, Doku, Rupiah, Bahasa Indonesia — semua dipikirkan dari awal, bukan ditambahkan belakangan.",
  },
  {
    icon: Code2,
    title: "AI-Friendly",
    desc: "Struktur kode yang bersih dan terorganisir bikin Claude, Copilot, atau AI tools lain bisa bantu lebih efektif.",
  },
  {
    icon: Shield,
    title: "Production-Ready",
    desc: "RLS, webhook verification, env var guards, CI/CD — bukan sekadar demo, tapi siap masuk production.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">
      <div className="space-y-4">
        <Badge variant="outline">Tentang KilatKoding</Badge>
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          Dibikin untuk developer Indonesia yang mau ship lebih cepat.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          KilatKoding adalah boilerplate Next.js yang didesain khusus untuk ekosistem Indonesia.
          Bukan cuma template biasa — ini adalah fondasi production-ready yang sudah menyelesaikan
          semua setup yang biasanya bikin molor.
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Kenapa KilatKoding?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <Card key={v.title} className="border-border/50">
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <v.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-sm">{v.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Tech Stack</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Dipilih karena sudah terbukti, bukan karena hype.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stack.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border bg-muted/30 p-3 space-y-1"
            >
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Dibikin oleh Galih Pratama</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Developer dan builder yang udah terlalu sering stuck di setup payment gateway, konfigurasi
          email, dan bikin landing page dari nol. KilatKoding adalah solusi yang pengen gue kasih ke
          developer Indonesia lainnya supaya nggak ngulang masalah yang sama.
        </p>
        <div className="flex gap-3">
          <Link
            href="https://twitter.com/galpratama"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="h-4 w-4" />
            @galpratama
          </Link>
          <Link
            href="https://github.com/galpratama"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            galpratama
          </Link>
        </div>
      </div>
    </div>
  );
}
