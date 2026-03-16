import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-24 text-center px-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        KilatKoding
      </h1>
      <p className="max-w-xl text-muted-foreground text-lg">
        Boilerplate Next.js untuk developer Indonesia. Midtrans, Supabase,
        Resend — siap pakai.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/auth/sign-up">Mulai Sekarang</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/login">Masuk</Link>
        </Button>
      </div>
    </section>
  );
}
