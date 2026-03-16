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
    name: "Gratis",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Untuk eksplor dan belajar.",
    badge: null,
    cta: "Mulai Gratis",
    ctaHref: "/auth/sign-up",
    variant: "outline" as const,
    features: [
      "Akses dashboard dasar",
      "1 proyek aktif",
      "Auth lengkap (email, Google, Magic Link)",
      "Blog MDX",
      "Dark mode",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 99000,
    yearlyPrice: 79000,
    description: "Untuk produk yang serius.",
    badge: "Paling Populer",
    cta: "Mulai Pro",
    ctaHref: "/auth/sign-up",
    variant: "default" as const,
    features: [
      "Semua fitur Gratis",
      "Proyek tidak terbatas",
      "Pembayaran Midtrans & Doku",
      "Email transaksional (Resend)",
      "Admin dashboard",
      "Prioritas support",
    ],
  },
];

function formatRupiah(amount: number) {
  if (amount === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Harga Transparan
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Mulai gratis, upgrade kapan saja.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Label htmlFor="billing-toggle" className="text-sm">
              Bulanan
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className="text-sm">
              Tahunan{" "}
              <span className="text-primary font-medium">(hemat 20%)</span>
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.badge
                  ? "border-primary shadow-lg relative"
                  : "border-border/50"
              }
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>{plan.badge}</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    {formatRupiah(
                      isYearly ? plan.yearlyPrice : plan.monthlyPrice
                    )}
                  </span>
                  {(isYearly ? plan.yearlyPrice : plan.monthlyPrice) > 0 && (
                    <span className="text-muted-foreground text-sm ml-1">
                      /bulan
                    </span>
                  )}
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
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
      </div>
    </section>
  );
}
