import { Badge } from "@/components/ui/badge";

const stack = [
  { name: "Next.js 16", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "shadcn/ui", category: "UI" },
  { name: "Supabase", category: "Database & Auth" },
  { name: "Midtrans", category: "Payment" },
  { name: "Doku", category: "Payment" },
  { name: "Resend", category: "Email" },
  { name: "Vercel", category: "Hosting" },
  { name: "React Email", category: "Email" },
  { name: "Claude Code", category: "AI" },
  { name: "GitHub Actions", category: "CI/CD" },
];

export function TechStackSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-10 space-y-3">
          <Badge variant="secondary">Tech Stack</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dibangun pakai teknologi yang udah kamu kenal.
          </h2>
          <p className="text-muted-foreground text-lg">
            Nggak perlu belajar hal baru. Stack-nya familiar, teruji, dan siap production.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {stack.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border bg-background p-3 space-y-1 text-left hover:border-primary/50 transition-colors"
            >
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
