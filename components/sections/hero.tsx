import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-24 text-center px-4">
      <Badge variant="secondary">Next.js 16 + Supabase + Midtrans</Badge>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl">
        Boilerplate SaaS untuk{" "}
        <span className="text-primary">Developer Indonesia</span>
      </h1>
      <p className="max-w-2xl text-muted-foreground text-lg sm:text-xl">
        Auth, pembayaran Midtrans & Doku, email Resend, blog MDX, dan admin
        dashboard — semua sudah terintegrasi. Fokus bangun produk, bukan
        infrastruktur.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button size="lg" asChild>
          <Link href="/auth/sign-up">Mulai Gratis</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/blog">Lihat Dokumentasi</Link>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Tidak perlu kartu kredit · Deploy dalam hitungan menit
      </p>
    </section>
  );
}
