import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — KilatKoding",
  description: "Riwayat pembaruan dan fitur baru di KilatKoding.",
};

type ChangeEntry = {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  changes: { category: "Baru" | "Perbaikan" | "Perubahan"; items: string[] }[];
};

const changelog: ChangeEntry[] = [
  {
    version: "0.5.0",
    date: "16 Maret 2026",
    type: "major",
    changes: [
      {
        category: "Baru",
        items: [
          "Halaman /docs/components — showcase interaktif 43 komponen shadcn/ui",
          "Halaman /about, /contact, /privacy, /terms, /changelog",
          "Sitemap.xml dan robots.txt otomatis via Next.js",
          "Halaman error 404 dan error boundary global",
          "4 seksi landing page baru: Pain Point, Tech Stack, AI-Optimized, Timeline 7 hari",
          "Pricing 3 tier: Basic, Pro, Ultimate",
          "Footer 4-kolom dengan semua link lengkap",
          "Form kontak dengan Resend integration",
        ],
      },
    ],
  },
  {
    version: "0.4.0",
    date: "16 Maret 2026",
    type: "major",
    changes: [
      {
        category: "Baru",
        items: [
          "43 komponen shadcn/ui terinstal penuh",
          "Landing page lengkap: Hero, Features, Testimonials, Pricing, FAQ, CTA",
          "Header responsif dengan mobile Sheet drawer dan Avatar dropdown",
          "Dashboard dengan SubscriptionCard, PaymentsTable, dan Breadcrumb",
          "Admin dashboard dengan revenue chart (recharts) dan pagination",
          "Halaman Settings (/dashboard/settings) dan Billing (/dashboard/billing)",
          "Sonner toast notifications terintegrasi global",
          "Blog listing dan detail dengan Badge dan Avatar",
        ],
      },
      {
        category: "Perbaikan",
        items: [
          "Fix Tailwind v4 syntax di toggle-group.tsx dan calendar.tsx",
          "Fix module-level throw di doku.ts dan midtrans.ts",
          "Fix TypeScript type conflict di payment-button.tsx",
        ],
      },
    ],
  },
  {
    version: "0.3.0",
    date: "16 Maret 2026",
    type: "major",
    changes: [
      {
        category: "Baru",
        items: [
          "Doku JOKUL payment integration + webhook handler",
          "MDX blog system (/blog) dengan frontmatter dan reading time",
          "Admin dashboard (/admin) dengan stats dan payment overview",
          "Hooks: useAuth() dan useSubscription()",
          "GitHub Actions CI workflow (lint + build)",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "16 Maret 2026",
    type: "major",
    changes: [
      {
        category: "Baru",
        items: [
          "Midtrans Snap payment integration + webhook handler",
          "Resend email integration dengan React Email templates",
          "Email templates: welcome dan invoice (Bahasa Indonesia)",
          "Database migrations: profiles, subscriptions, payments dengan RLS",
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "16 Maret 2026",
    type: "major",
    changes: [
      {
        category: "Baru",
        items: [
          "Initial release — Next.js 16 + Supabase SSR starter",
          "Route groups (marketing) dan (dashboard)",
          "Auth lengkap: email/password, Google OAuth, Magic Link",
          "config/site.ts dan config/navigation.ts terpusat",
          "Header, Footer, ThemeSwitcher dengan dark mode",
        ],
      },
    ],
  },
];

const typeBadge: Record<ChangeEntry["type"], "default" | "secondary" | "outline"> = {
  major: "default",
  minor: "secondary",
  patch: "outline",
};

const categoryColor: Record<string, string> = {
  Baru: "text-green-600 dark:text-green-400",
  Perbaikan: "text-blue-600 dark:text-blue-400",
  Perubahan: "text-orange-600 dark:text-orange-400",
};

export default function ChangelogPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-muted-foreground">
          Riwayat pembaruan dan fitur baru di KilatKoding.
        </p>
      </div>

      <div className="space-y-10">
        {changelog.map((entry, i) => (
          <div key={entry.version}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold">v{entry.version}</h2>
              <Badge variant={typeBadge[entry.type]}>{entry.type}</Badge>
              <span className="text-sm text-muted-foreground ml-auto">{entry.date}</span>
            </div>
            <div className="space-y-4">
              {entry.changes.map((group) => (
                <div key={group.category}>
                  <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${categoryColor[group.category]}`}>
                    {group.category}
                  </p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {i < changelog.length - 1 && <Separator className="mt-8" />}
          </div>
        ))}
      </div>
    </div>
  );
}
