import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Minus } from "lucide-react";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Perbandingan — KilatKoding",
  description:
    "Bandingkan KilatKoding dengan setup manual, laravel boilerplate, dan alternatif lainnya.",
  path: "/compare",
});

type CellValue = true | false | null | string;

const features: { category: string; rows: { label: string; kilatkoding: CellValue; manual: CellValue; laravelBoilerplate: CellValue }[] }[] = [
  {
    category: "Setup & Developer Experience",
    rows: [
      { label: "Siap deploy dalam 1 hari", kilatkoding: true, manual: false, laravelBoilerplate: false },
      { label: "TypeScript end-to-end", kilatkoding: true, manual: "Tergantung", laravelBoilerplate: false },
      { label: "AI-friendly codebase (CLAUDE.md)", kilatkoding: true, manual: false, laravelBoilerplate: false },
      { label: "Dokumentasi Bahasa Indonesia", kilatkoding: true, manual: false, laravelBoilerplate: false },
      { label: "Hot reload & Turbopack", kilatkoding: true, manual: "Tergantung", laravelBoilerplate: false },
    ],
  },
  {
    category: "Autentikasi",
    rows: [
      { label: "Email & Password", kilatkoding: true, manual: "Manual", laravelBoilerplate: true },
      { label: "Google OAuth", kilatkoding: true, manual: "Manual", laravelBoilerplate: "Plugin" },
      { label: "Magic Link", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
      { label: "OTP verification", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
      { label: "Row Level Security (RLS)", kilatkoding: true, manual: false, laravelBoilerplate: false },
    ],
  },
  {
    category: "Pembayaran Indonesia",
    rows: [
      { label: "Midtrans Snap", kilatkoding: true, manual: "8+ jam setup", laravelBoilerplate: false },
      { label: "Doku JOKUL", kilatkoding: true, manual: "8+ jam setup", laravelBoilerplate: false },
      { label: "Webhook verification", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
      { label: "Subscription management", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
      { label: "Invoice & payment history", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
    ],
  },
  {
    category: "UI & Frontend",
    rows: [
      { label: "44 UI Components", kilatkoding: true, manual: false, laravelBoilerplate: "Bootstrap" },
      { label: "Dark mode bawaan", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
      { label: "Responsive landing page", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
      { label: "Admin dashboard", kilatkoding: true, manual: false, laravelBoilerplate: "Terbatas" },
      { label: "Blog (MDX)", kilatkoding: true, manual: false, laravelBoilerplate: "Terbatas" },
    ],
  },
  {
    category: "Email & Notifikasi",
    rows: [
      { label: "Resend integration", kilatkoding: true, manual: false, laravelBoilerplate: false },
      { label: "React Email templates", kilatkoding: true, manual: false, laravelBoilerplate: false },
      { label: "Welcome & invoice email", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
    ],
  },
  {
    category: "SEO & Production",
    rows: [
      { label: "Sitemap & robots.txt", kilatkoding: true, manual: "Manual", laravelBoilerplate: "Plugin" },
      { label: "OpenGraph tags", kilatkoding: true, manual: "Manual", laravelBoilerplate: "Terbatas" },
      { label: "CI/CD (GitHub Actions)", kilatkoding: true, manual: false, laravelBoilerplate: false },
      { label: "Vercel-ready config", kilatkoding: true, manual: "Manual", laravelBoilerplate: false },
    ],
  },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <Check className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto" />;
  if (value === false) return <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
  if (value === null) return <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="secondary">Perbandingan</Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          KilatKoding vs Alternatif Lain
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Kenapa harus pakai KilatKoding? Ini perbandingan jujurnya vs setup manual dan boilerplate lain.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40%] font-semibold">Fitur</TableHead>
              <TableHead className="text-center font-semibold text-primary">
                KilatKoding ✓
              </TableHead>
              <TableHead className="text-center font-semibold text-muted-foreground">
                Setup Manual
              </TableHead>
              <TableHead className="text-center font-semibold text-muted-foreground">
                Laravel Boilerplate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((category) => (
              <>
                <TableRow key={category.category} className="bg-muted/30">
                  <TableCell colSpan={4} className="py-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {category.category}
                    </span>
                  </TableCell>
                </TableRow>
                {category.rows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="text-sm">{row.label}</TableCell>
                    <TableCell className="text-center">
                      <Cell value={row.kilatkoding} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Cell value={row.manual} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Cell value={row.laravelBoilerplate} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-center space-y-4 py-6 border rounded-lg bg-muted/20">
        <p className="font-semibold">Siap ship lebih cepat?</p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/#pricing">Lihat Harga</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/components">Lihat Komponen</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
