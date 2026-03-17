import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TemplateBanner } from "@/components/ui/template-banner";
import { TrendingUp, Users, CreditCard, Star } from "lucide-react";
import { openStartupConfig } from "@/config/open-startup";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Open Startup — KilatKoding",
  description:
    "KilatKoding adalah open startup. Kami berbagi metrik bisnis secara transparan: MRR, pengguna, pendapatan.",
  path: "/open",
});

const iconMap = {
  CreditCard,
  Star,
  TrendingUp,
  Users,
};

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function OpenPage() {
  const maxMrr = Math.max(...openStartupConfig.monthlyRevenue.map((item) => item.mrr));

  return (
    <>
      <TemplateBanner description="Halaman Open Startup untuk produkmu — tampilkan metrik bisnis secara transparan, bangun kepercayaan user" />
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="space-y-3">
        <Badge variant="outline" className="border-primary/30 text-primary">
          Open Startup
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          Kami transparan soal angka.
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          KilatKoding adalah open startup. Kami percaya transparansi membangun kepercayaan.
          Semua metrik di sini diperbarui setiap bulan.
        </p>
        <p className="text-xs text-muted-foreground">
          Terakhir diperbarui: {openStartupConfig.lastUpdated}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {openStartupConfig.stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="pt-4 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-xs">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-xs ${stat.positive ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Pendapatan Bulanan</h2>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-end gap-2 h-40">
              {openStartupConfig.monthlyRevenue.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {m.mrr > 0 ? formatRupiah(m.mrr).replace("Rp\xa0", "").replace(".000", "K") : "—"}
                  </span>
                  <div
                    className="w-full rounded-t bg-primary/80"
                    style={{ height: `${maxMrr > 0 ? (m.mrr / maxMrr) * 120 : 0}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Milestone</h2>
        <div className="space-y-3">
          {openStartupConfig.milestones.map((m) => (
            <div
              key={m.text}
              className={`flex items-start gap-3 text-sm ${m.done ? "" : "opacity-50"}`}
            >
              <div
                className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 border-2 ${
                  m.done ? "bg-primary border-primary" : "bg-background border-border"
                }`}
              />
              <div>
                <span className="text-muted-foreground text-xs">{m.date}</span>
                <p className={m.done ? "" : "text-muted-foreground"}>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground space-y-1">
        <p className="font-medium text-foreground">Catatan</p>
        <p>
          Semua angka adalah perkiraan aktual dari penjualan lisensi starter kit (one-time purchase).
          Angka akan diperbarui setiap awal bulan.
        </p>
      </div>
    </div>
    </>
  );
}
