import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status — KilatKoding",
  description: "Status operasional layanan KilatKoding — website, auth, database, email, dan payment.",
};

type ServiceStatus = "operational" | "degraded" | "down";

const services: { name: string; description: string; status: ServiceStatus }[] = [
  { name: "Website", description: "kilatkoding.com", status: "operational" },
  { name: "Autentikasi", description: "Login, register, OAuth", status: "operational" },
  { name: "Database", description: "Supabase Postgres", status: "operational" },
  { name: "Email", description: "Resend transactional email", status: "operational" },
  { name: "Payment — Midtrans", description: "Snap payment gateway", status: "operational" },
  { name: "Payment — Doku", description: "JOKUL payment gateway", status: "operational" },
  { name: "CDN & Hosting", description: "Vercel Edge Network", status: "operational" },
  { name: "API", description: "REST API endpoints", status: "operational" },
];

const incidents: { date: string; title: string; resolved: boolean; detail: string }[] = [
  {
    date: "10 Mar 2026",
    title: "Email pengiriman lambat — diselesaikan",
    resolved: true,
    detail: "Resend mengalami degradasi selama ~45 menit. Semua email terkirim setelah pemulihan.",
  },
  {
    date: "1 Feb 2026",
    title: "Midtrans webhook timeout — diselesaikan",
    resolved: true,
    detail: "Webhook Midtrans mengalami delay 2–5 menit. Tidak ada pembayaran yang hilang.",
  },
];

const statusConfig: Record<ServiceStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  operational: {
    label: "Operational",
    color: "text-green-600 dark:text-green-400",
    icon: CheckCircle2,
  },
  degraded: {
    label: "Degraded",
    color: "text-yellow-600 dark:text-yellow-400",
    icon: AlertCircle,
  },
  down: {
    label: "Down",
    color: "text-red-500",
    icon: XCircle,
  },
};

const allOperational = services.every((s) => s.status === "operational");

export default function StatusPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Status Layanan</h1>
        <div className="flex items-center gap-2">
          {allOperational ? (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Semua sistem beroperasi normal
              </span>
            </>
          ) : (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                Ada gangguan pada beberapa layanan
              </span>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Terakhir diperbarui: 16 Maret 2026, 09:00 WIB
        </p>
      </div>

      <div className="space-y-2">
        {services.map((service) => {
          const config = statusConfig[service.status];
          const Icon = config.icon;
          return (
            <Card key={service.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-medium ${config.color}`}>
                  <Icon className="h-4 w-4" />
                  {config.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Riwayat Insiden</h2>
        {incidents.length === 0 ? (
          <p className="text-sm text-muted-foreground">Tidak ada insiden dalam 90 hari terakhir.</p>
        ) : (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident.title} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={incident.resolved ? "outline" : "destructive"}>
                    {incident.resolved ? "Diselesaikan" : "Berlangsung"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{incident.date}</span>
                </div>
                <p className="text-sm font-medium">{incident.title}</p>
                <p className="text-sm text-muted-foreground">{incident.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Ada masalah yang tidak tercantum?{" "}
        <a href="/contact" className="text-primary underline underline-offset-4">
          Laporkan ke kami.
        </a>
      </div>
    </div>
  );
}
