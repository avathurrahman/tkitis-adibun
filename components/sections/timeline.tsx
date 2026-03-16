import { Badge } from "@/components/ui/badge";

const steps = [
  { day: "Hari 1", title: "Clone & Deploy", desc: "Landing page live di Vercel. Supabase dan auth sudah jalan.", done: true },
  { day: "Hari 2–3", title: "Build Fitur", desc: "Fokus bikin fitur utama produk kamu. Boilerplate udah out of the way.", done: true },
  { day: "Hari 4–5", title: "Setup Payment", desc: "Midtrans atau Doku siap terima pembayaran dari customer pertama.", done: false },
  { day: "Hari 6", title: "Testing & Polish", desc: "QA, perbaikan kecil, dan final polish sebelum launch.", done: false },
  { day: "Hari 7", title: "Launch! 🚀", desc: "Produk live dan siap dapat customer. Beneran.", done: false },
];

export function TimelineSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Badge variant="secondary">Timeline Realistis</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dari nol sampai launch dalam 7 hari.
          </h2>
          <p className="text-muted-foreground text-lg">
            Kamu fokus bikin produk. Boilerplate ngurus yang boring.
          </p>
        </div>

        <div className="relative space-y-0">
          <div className="absolute left-[calc(theme(spacing.12)-1px)] top-6 bottom-6 w-0.5 bg-border hidden sm:block" />
          {steps.map((step, i) => (
            <div key={step.day} className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0">
              <div className="flex-shrink-0 w-24 text-right hidden sm:block pt-0.5">
                <span className="text-xs font-medium text-muted-foreground">{step.day}</span>
              </div>
              <div className="relative flex-shrink-0 w-6 hidden sm:flex items-start justify-center">
                <div className={`w-3 h-3 rounded-full border-2 mt-1.5 z-10 ${
                  i === 0 ? "bg-primary border-primary" : "bg-background border-border"
                }`} />
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <div className="sm:hidden text-xs font-medium text-muted-foreground mb-1">{step.day}</div>
                <p className="font-semibold text-sm">{step.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground italic">
          Intinya: kamu bisa launch minggu ini. Kalau mau.
        </p>
      </div>
    </section>
  );
}
