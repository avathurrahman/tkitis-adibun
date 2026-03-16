import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap — KilatKoding",
  description: "Rencana pengembangan KilatKoding ke depan. Lihat fitur yang sedang dibangun dan yang akan datang.",
};

type RoadmapStatus = "shipped" | "in-progress" | "planned";

type RoadmapItem = {
  title: string;
  description: string;
  status: RoadmapStatus;
  quarter?: string;
};

const items: RoadmapItem[] = [
  // Shipped
  { title: "Supabase Auth lengkap", description: "Email, Google OAuth, Magic Link, OTP verification", status: "shipped" },
  { title: "Midtrans Snap integration", description: "Payment gateway Indonesia #1 dengan webhook verification", status: "shipped" },
  { title: "Doku JOKUL integration", description: "Alternative payment gateway untuk jangkauan lebih luas", status: "shipped" },
  { title: "Resend + React Email", description: "Email transaksional dengan template Bahasa Indonesia", status: "shipped" },
  { title: "Admin dashboard", description: "Revenue chart, user stats, payment overview", status: "shipped" },
  { title: "MDX Blog system", description: "Blog dengan frontmatter, reading time, tags", status: "shipped" },
  { title: "50+ UI Components", description: "shadcn/ui lengkap dengan dark mode", status: "shipped" },
  { title: "Marketing funnel pages", description: "Landing page 10 seksi + waitlist, compare, roadmap, status", status: "shipped" },

  // In Progress
  { title: "Subscription management UI", description: "Upgrade/downgrade plan, cancel subscription flow", status: "in-progress", quarter: "Q2 2026" },
  { title: "Team / multi-tenant", description: "Invite anggota tim, role-based access (owner, member, viewer)", status: "in-progress", quarter: "Q2 2026" },
  { title: "API keys management", description: "Create, revoke, scope API keys untuk produk kamu", status: "in-progress", quarter: "Q2 2026" },

  // Planned
  { title: "Onboarding wizard", description: "Multi-step welcome flow untuk increase activation", status: "planned", quarter: "Q2 2026" },
  { title: "Notification system", description: "In-app notification center + real-time dengan Supabase Realtime", status: "planned", quarter: "Q3 2026" },
  { title: "Usage metering", description: "Track dan tampilkan usage per-feature dengan limit indicator", status: "planned", quarter: "Q3 2026" },
  { title: "Referral program", description: "Referral link, earnings tracker, automatic discount", status: "planned", quarter: "Q3 2026" },
  { title: "WhatsApp OTP integration", description: "Verifikasi via WhatsApp untuk pasar Indonesia", status: "planned", quarter: "Q4 2026" },
  { title: "Expo React Native starter", description: "Companion mobile app template dengan shared auth", status: "planned", quarter: "Q4 2026" },
];

const columns: { status: RoadmapStatus; label: string; badgeVariant: "default" | "secondary" | "outline" }[] = [
  { status: "shipped", label: "✅ Shipped", badgeVariant: "default" },
  { status: "in-progress", label: "🔨 Sedang Dibangun", badgeVariant: "secondary" },
  { status: "planned", label: "📋 Direncanakan", badgeVariant: "outline" },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-10">
      <div className="space-y-3">
        <Badge variant="secondary">Roadmap</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          Apa yang sedang dan akan kami bangun.
        </h1>
        <p className="text-muted-foreground">
          Roadmap ini diperbarui setiap sprint. Punya ide atau request fitur?{" "}
          <a href="/contact" className="text-primary underline underline-offset-4">
            Beritahu kami.
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {columns.map((col) => {
          const colItems = items.filter((i) => i.status === col.status);
          return (
            <div key={col.status} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant={col.badgeVariant}>{col.label}</Badge>
                <span className="text-xs text-muted-foreground">({colItems.length})</span>
              </div>
              <div className="space-y-2">
                {colItems.map((item) => (
                  <Card key={item.title} className="border-border/50">
                    <CardHeader className="pb-1 pt-3 px-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-medium leading-tight">
                          {item.title}
                        </CardTitle>
                        {item.quarter && (
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {item.quarter}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3 px-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-sm text-muted-foreground pt-4">
        Terakhir diperbarui: 16 Maret 2026
      </div>
    </div>
  );
}
