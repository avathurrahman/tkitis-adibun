import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TemplateBanner } from "@/components/ui/template-banner";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { serviceStatusPageConfig, type ServiceStatus } from "@/config/status-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Status — KilatKoding",
  description:
    "Status operasional layanan KilatKoding — website, auth, database, email, dan payment.",
  path: "/status",
});

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

const allOperational = serviceStatusPageConfig.services.every((service) => service.status === "operational");

export default function StatusPage() {
  return (
    <>
      <TemplateBanner description="Halaman status untuk produkmu — tambahkan layananmu dan hubungkan ke monitoring system" />
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
          Terakhir diperbarui: {serviceStatusPageConfig.lastUpdated}
        </p>
      </div>

      <div className="space-y-2">
        {serviceStatusPageConfig.services.map((service) => {
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
        {serviceStatusPageConfig.incidents.length === 0 ? (
          <p className="text-sm text-muted-foreground">Tidak ada insiden dalam 90 hari terakhir.</p>
        ) : (
          <div className="space-y-4">
            {serviceStatusPageConfig.incidents.map((incident) => (
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
    </>
  );
}
