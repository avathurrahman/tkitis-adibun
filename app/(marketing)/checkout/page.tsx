import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureNotice } from "@/components/config/feature-notice";
import { Separator } from "@/components/ui/separator";
import { TemplateBanner } from "@/components/ui/template-banner";
import { Check, Lock } from "lucide-react";
import Link from "next/link";
import {
  getFeatureAvailability,
  resolvePaymentProvider,
} from "@/lib/config/features";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Checkout — KilatKoding",
  description:
    "Lihat paket KilatKoding dan lanjutkan ke alur pembelian boilerplate untuk developer Indonesia.",
  path: "/checkout",
});

const plans: Record<string, {
  name: string;
  price: number;
  description: string;
  features: string[];
}> = {
  basic: {
    name: "Basic",
    price: 299000,
    description: "Untuk mulai ship lebih cepat.",
    features: [
      "Next.js 16 boilerplate lengkap",
      "Supabase Auth",
      "1 payment gateway (Midtrans)",
      "MDX blog + SEO ready",
      "Discord community + lifetime updates",
    ],
  },
  pro: {
    name: "Pro",
    price: 799000,
    description: "Untuk produk yang serius.",
    features: [
      "Semua di Basic",
      "Midtrans + Doku",
      "44 UI components",
      "Admin dashboard template",
      "Unlimited client projects",
      "1× konsultasi 30 menit",
    ],
  },
  ultimate: {
    name: "Ultimate",
    price: 2999000,
    description: "Untuk yang mau ship dan belajar sekaligus.",
    features: [
      "Semua di Pro",
      "Bootcamp Vibe Coding (4 sesi)",
      "Ebook Vibe Coding",
      "15 template di JualanKoding.com",
      "2× konsultasi 1-1",
    ],
  },
};

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planKey = "pro" } = await searchParams;
  const plan = plans[planKey] ?? plans.pro;
  const paymentsFeature = getFeatureAvailability("payments");
  const paymentProvider = resolvePaymentProvider();
  const providerLabel = paymentProvider === "midtrans" ? "Midtrans" : "DOKU";

  return (
    <>
      <TemplateBanner description="Halaman checkout untuk produkmu — hubungkan ke Midtrans/Doku dan sesuaikan paket hargamu" />
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-muted-foreground text-sm">Selesaikan pembelian untuk mulai ship lebih cepat.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Ringkasan Pesanan
            </h2>
            <Card className="border-primary/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">KilatKoding {plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">{plan.description}</p>
                  </div>
                  <Badge>Lifetime</Badge>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-3">
                <ul className="space-y-2 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-2xl font-bold">{formatRupiah(plan.price)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pembayaran satu kali. Tidak ada biaya tambahan.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 flex-shrink-0" />
            {paymentsFeature.enabled
              ? `Pembayaran aman diproses oleh ${providerLabel}. Data kamu tidak disimpan di server kami.`
              : "Checkout online belum tersedia untuk app ini saat ini."}
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Pilih paket lain?</p>
            <div className="flex gap-2">
              {Object.entries(plans).map(([key, p]) => (
                <Link
                  key={key}
                  href={`/checkout?plan=${key}`}
                  className={`text-xs px-2 py-1 rounded border transition-colors ${
                    key === planKey
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Cara Pembayaran
          </h2>
          {!paymentsFeature.enabled ? (
            <FeatureNotice
              description={paymentsFeature.message}
              missingEnv={paymentsFeature.missingEnv}
              title={paymentsFeature.title}
              toggleEnv={paymentsFeature.toggleEnv}
            />
          ) : (
            <>
              <div className="rounded-lg border bg-muted/20 p-4 space-y-3">
                <p className="text-sm">
                  Klik tombol di bawah untuk melanjutkan ke {providerLabel}. Kamu bisa bayar via:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Transfer bank (BCA, Mandiri, BNI, BRI, CIMB)</li>
                  <li>Virtual Account</li>
                  <li>GoPay, OVO, DANA, ShopeePay</li>
                  <li>Kartu kredit / debit Visa & Mastercard</li>
                  <li>Indomaret & Alfamart</li>
                </ul>
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link href="/auth/sign-up">
                  Daftar & Bayar {formatRupiah(plan.price)}
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Kamu perlu akun untuk melanjutkan pembayaran.{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  Sudah punya akun? Masuk.
                </Link>
              </p>
            </>
          )}

          <div className="grid grid-cols-3 gap-2 pt-2">
            {["Lifetime Access", "Refund Policy", "Discord Support"].map((item) => (
              <div
                key={item}
                className="text-center text-xs text-muted-foreground border rounded p-2"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
