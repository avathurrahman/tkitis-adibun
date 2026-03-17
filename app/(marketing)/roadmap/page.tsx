import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateBanner } from "@/components/ui/template-banner";
import { roadmapPageConfig, type RoadmapStatus } from "@/config/roadmap";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Roadmap — KilatKoding",
  description:
    "Rencana pengembangan KilatKoding ke depan. Lihat fitur yang sedang dibangun dan yang akan datang.",
  path: "/roadmap",
});

const columns: { status: RoadmapStatus; label: string; badgeVariant: "default" | "secondary" | "outline" }[] = [
  { status: "shipped", label: "✅ Shipped", badgeVariant: "default" },
  { status: "in-progress", label: "🔨 Sedang Dibangun", badgeVariant: "secondary" },
  { status: "planned", label: "📋 Direncanakan", badgeVariant: "outline" },
];

export default function RoadmapPage() {
  return (
    <>
      <TemplateBanner description="Halaman roadmap untuk produkmu — isi dengan fitur yang sedang dan akan kamu bangun" />
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
          const colItems = roadmapPageConfig.items.filter((item) => item.status === col.status);
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
        Terakhir diperbarui: {roadmapPageConfig.lastUpdated}
      </div>
    </div>
    </>
  );
}
