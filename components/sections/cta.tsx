import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CtaSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto text-center">
        <Separator className="mb-12" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Siap bangun produkmu?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Mulai dari fondasi yang kuat. Setup dalam hitungan menit, bukan
          minggu.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
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
