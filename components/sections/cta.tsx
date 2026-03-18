import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CtaSection() {
  return (
    <section className="marketing-section marketing-section--muted px-4">
      <div className="marketing-section__inner max-w-2xl text-center">
        <Separator className="mb-12" />
        <h2 className="marketing-heading">
          Siap bangun produkmu?
        </h2>
        <p className="marketing-copy mt-4 text-lg">
          Mulai dari fondasi yang kuat. Setup dalam hitungan menit, bukan
          minggu.
        </p>
        <div className="marketing-hero__actions mt-8 justify-center">
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">Mulai Gratis Sekarang</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">Baca Dokumentasi</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
