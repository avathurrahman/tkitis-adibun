import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";
import { SupabaseEnvNotice } from "@/components/auth/supabase-env-notice";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { PaymentButton } from "@/components/dashboard/payment-button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Billing — KilatKoding",
  description: "Kelola paket aktif dan mulai pembayaran KilatKoding kamu.",
  path: "/dashboard/billing",
  noIndex: true,
});

const PRO_PLAN = {
  plan: "PRO",
  amount: 99000,
  label: "Upgrade ke Pro — Rp 99.000/bulan",
  items: [
    {
      id: "pro-monthly",
      price: 99000,
      quantity: 1,
      name: "KilatKoding Pro — 1 Bulan",
    },
  ],
};

const proFeatures = [
  "Semua fitur Gratis",
  "Proyek tidak terbatas",
  "Pembayaran Midtrans & Doku",
  "Email transaksional (Resend)",
  "Admin dashboard",
  "Prioritas support",
];

type Subscription = {
  plan: string;
  status: string;
  current_period_end: string | null;
};

async function BillingContent() {
  if (!hasEnvVars) return <SupabaseEnvNotice />;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) redirect("/auth/login");

  const userId = data.claims.sub as string;

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan, status, current_period_end")
    .eq("user_id", userId)
    .single<Subscription>();

  const isPro = sub?.plan === "PRO" || sub?.plan === "ULTIMATE";
  const isActive = sub?.status === "ACTIVE";

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Billing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola subscription dan pembayaran kamu.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Plan Saat Ini</CardTitle>
            <div className="flex gap-2">
              <Badge variant={isPro ? "default" : "secondary"}>
                {sub?.plan ?? "FREE"}
              </Badge>
              {sub?.status && (
                <Badge variant={isActive ? "outline" : "destructive"}>
                  {sub.status}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sub?.current_period_end && (
            <p className="text-sm text-muted-foreground mb-4">
              Periode berakhir:{" "}
              {new Intl.DateTimeFormat("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(sub.current_period_end))}
            </p>
          )}

          {isPro ? (
            <p className="text-sm text-muted-foreground">
              Kamu sudah di plan Pro. Terima kasih telah mendukung KilatKoding!
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Upgrade ke Pro untuk akses semua fitur.
            </p>
          )}
        </CardContent>
      </Card>

      {!isPro && (
        <Card className="border-primary/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Pro</CardTitle>
              <div>
                <span className="text-2xl font-bold">Rp 99.000</span>
                <span className="text-muted-foreground text-sm">/bulan</span>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <ul className="space-y-2 mb-6">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <PaymentButton config={PRO_PLAN} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense>
      <BillingContent />
    </Suspense>
  );
}
