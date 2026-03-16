"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const plans = [
  {
    name: "Basic",
    price: 299000,
    earlyBird: 239000,
    description: "Untuk mulai ship lebih cepat.",
    badge: null,
    cta: "Dapatkan Basic",
    ctaHref: "/auth/sign-up",
    variant: "outline" as const,
    features: [
      "Next.js 16 boilerplate lengkap",
      "Supabase Auth (email, Google, Magic Link)",
      "1 payment gateway (Midtrans)",
      "1 email provider (Resend)",
      "30+ UI components (shadcn/ui)",
      "MDX blog system + SEO ready",
      "Dokumentasi Bahasa Indonesia",
      "Discord community + lifetime updates",
    ],
  },
  {
    name: "Pro",
    price: 799000,
    earlyBird: 639000,
    description: "Untuk produk yang serius.",
    badge: "Paling Worth It ⭐",
    cta: "Dapatkan Pro",
    ctaHref: "/auth/sign-up",
    variant: "default" as const,
    features: [
      "Semua di Basic, plus:",
      "Semua payment gateway (Midtrans + Doku)",
      "Semua email provider",
      "50+ UI components lengkap",
      "Admin dashboard template",
      "Unlimited client projects",
      "Priority support",
      "1× konsultasi 30 menit",
    ],
  },
  {
    name: "Ultimate",
    price: 2999000,
    earlyBird: 2399000,
    description: "Untuk yang mau ship dan belajar sekaligus.",
    badge: null,
    cta: "Dapatkan Ultimate",
    ctaHref: "/auth/sign-up",
    variant: "outline" as const,
    features: [
      "Semua di Pro, plus:",
      "Bootcamp Vibe Coding (4 sesi)",
      "Ebook Vibe Coding + lifetime update",
      "4 studi kasus step-by-step",
      "15 template di JualanKoding.com",
      "Akses belajar 12 bulan BelajarKoding.com",
      "Akses selamanya group Discord",
      "2× konsultasi 1-1 (30 menit)",
    ],
  },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PricingSection() {
  const [isEarlyBird, setIsEarlyBird] = useState(false);

  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <Badge variant="secondary">Harga</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Investasi sekali, ship selamanya.
          </h2>
          <p className="text-muted-foreground text-lg">
            Bayar satu kali, pakai untuk semua proyek. No subscription.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Label htmlFor="billing-toggle" className="text-sm">
              Harga Normal
            </Label>
            <Switch
              id="billing-toggle"
              checked={isEarlyBird}
              onCheckedChange={setIsEarlyBird}
            />
            <Label htmlFor="billing-toggle" className="text-sm">
              Early Bird{" "}
              <span className="text-primary font-medium">(hemat 20%)</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.badge ? "border-primary shadow-lg relative" : "border-border/50"}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <Badge>{plan.badge}</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-2 space-y-0.5">
                  <div className="text-3xl font-bold">
                    {formatRupiah(isEarlyBird ? plan.earlyBird : plan.price)}
                  </div>
                  {isEarlyBird && (
                    <p className="text-xs text-muted-foreground line-through">
                      {formatRupiah(plan.price)}
                    </p>
                  )}
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.variant} asChild>
                  <Link href={plan.ctaHref}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Semua harga dalam Rupiah (IDR). Beli sekali, pakai selamanya.
        </p>
      </div>
    </section>
  );
}
