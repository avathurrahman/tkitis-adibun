import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Users, CreditCard, Activity } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Startup — KilatKoding",
  description: "KilatKoding adalah open startup. Kami berbagi metrik bisnis secara transparan: MRR, pengguna, pendapatan.",
};

const stats = [
  {
    label: "MRR",
    value: "Rp 3.200.000",
    change: "+12% dari bulan lalu",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Total Pengguna",
    value: "284",
    change: "+31 pengguna baru bulan ini",
    positive: true,
    icon: Users,
  },
  {
    label: "Pelanggan Berbayar",
    value: "38",
    change: "13.4% conversion rate",
    positive: true,
    icon: CreditCard,
  },
  {
    label: "Churn Rate",
    value: "4.2%",
    change: "-0.8% dari bulan lalu",
    positive: true,
    icon: Activity,
  },
];

const monthlyRevenue = [
  { month: "Okt '25", mrr: 0 },
  { month: "Nov '25", mrr: 590000 },
  { month: "Des '25", mrr: 1200000 },
  { month: "Jan '26", mrr: 1850000 },
  { month: "Feb '26", mrr: 2550000 },
  { month: "Mar '26", mrr: 3200000 },
];

const milestones = [
  { date: "Nov 2025", text: "Launch v0.1 — first paying customer 🎉", done: true },
  { date: "Des 2025", text: "Rp 1.000.000 MRR milestone", done: true },
  { date: "Jan 2026", text: "100 registered users", done: true },
  { date: "Feb 2026", text: "Launch v0.4 dengan 43 shadcn components", done: true },
  { date: "Mar 2026", text: "Launch v0.5 — marketing funnel pages", done: true },
  { date: "Apr 2026", text: "Rp 5.000.000 MRR target", done: false },
  { date: "Jun 2026", text: "500 registered users", done: false },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function OpenPage() {
  const maxMrr = Math.max(...monthlyRevenue.map((m) => m.mrr));

  return (
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
          Terakhir diperbarui: 16 Maret 2026
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="pt-4 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <stat.icon className="h-3.5 w-3.5" />
                <span className="text-xs">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-xs ${stat.positive ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Pertumbuhan MRR</h2>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-end gap-2 h-40">
              {monthlyRevenue.map((m) => (
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
          {milestones.map((m) => (
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
          Semua angka adalah perkiraan aktual. MRR dihitung dari subscription aktif + one-time purchase yang disetarakan per bulan.
          Angka akan diperbarui setiap awal bulan.
        </p>
      </div>
    </div>
  );
}
