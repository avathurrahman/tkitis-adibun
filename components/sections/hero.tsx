import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="marketing-hero px-4">
      <div className="marketing-hero__content text-center">
        <Badge
          variant="secondary"
          className="marketing-eyebrow marketing-hero__badge mx-auto"
        >
          Next.js 16 + Supabase + Midtrans
        </Badge>
        <h1 className="marketing-hero__title max-w-4xl mx-auto">
          Boilerplate SaaS untuk{" "}
          <span className="marketing-hero__accent">Developer Indonesia</span>
        </h1>
        <p className="marketing-copy max-w-2xl mx-auto text-lg sm:text-xl">
          Auth, pembayaran Midtrans & Doku, email Resend, blog MDX, dan admin
          dashboard — semua sudah terintegrasi. Fokus bangun produk, bukan
          infrastruktur.
        </p>
        <div className="marketing-hero__actions justify-center">
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">Mulai Gratis</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">Lihat Dokumentasi</Link>
          </Button>
        </div>
        <p className="marketing-hero__meta">
          Tidak perlu kartu kredit · Deploy dalam hitungan menit
        </p>
      </div>
    </section>
  );
}
