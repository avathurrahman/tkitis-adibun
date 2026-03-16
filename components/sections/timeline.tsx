import { Badge } from "@/components/ui/badge";

const steps = [
  { day: "Hari 1", title: "Clone & Deploy", desc: "Landing page live di Vercel. Supabase dan auth sudah jalan.", active: true },
  { day: "Hari 2–3", title: "Build Fitur", desc: "Fokus bikin fitur utama produk kamu. Boilerplate udah out of the way.", active: false },
  { day: "Hari 4–5", title: "Setup Payment", desc: "Midtrans atau Doku siap terima pembayaran dari customer pertama.", active: false },
  { day: "Hari 6", title: "Testing & Polish", desc: "QA, perbaikan kecil, dan final polish sebelum launch.", active: false },
  { day: "Hari 7", title: "Launch! 🚀", desc: "Produk live dan siap dapat customer. Beneran.", active: false },
];

export function TimelineSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Badge variant="secondary">Timeline Realistis</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dari nol sampai launch dalam 7 hari.
          </h2>
          <p className="text-muted-foreground text-lg">
            Kamu fokus bikin produk. Boilerplate ngurus yang boring.
          </p>
        </div>

        <div>
          {steps.map((step, i) => (
            <div key={step.day} className="flex gap-4">
              {/* Dot + line column */}
              <div className="flex flex-col items-center flex-shrink-0 w-8">
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 z-10 ${
                  step.active
                    ? "bg-primary border-primary"
                    : "bg-background border-border"
                }`} />
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border my-1" />
                )}
              </div>

              {/* Content */}
              <div className={`pb-8 flex-1 min-w-0 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                <p className="text-xs font-medium text-muted-foreground mb-1">{step.day}</p>
                <p className={`font-semibold text-base ${step.active ? "" : "text-muted-foreground"}`}>
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</p>
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
