import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Apakah KilatKoding gratis?",
    a: "Ada tier gratis untuk eksplorasi dan belajar. Untuk fitur lengkap termasuk integrasi pembayaran dan admin dashboard, tersedia paket Pro.",
  },
  {
    q: "Payment gateway apa yang didukung?",
    a: "Midtrans Snap dan Doku JOKUL Checkout. Keduanya sudah terintegrasi dengan webhook handler untuk update status pembayaran dan subscription secara otomatis.",
  },
  {
    q: "Apakah bisa digunakan untuk aplikasi komersial?",
    a: "Ya, KilatKoding adalah boilerplate yang bisa kamu gunakan sebagai fondasi untuk produk komersial. Kamu punya kontrol penuh atas kode yang di-generate.",
  },
  {
    q: "Supabase project saya harus di-setup sendiri?",
    a: "Ya. Kamu perlu membuat Supabase project, menjalankan tiga migration SQL yang sudah tersedia, dan mengisi environment variables. Proses ini biasanya kurang dari 15 menit.",
  },
  {
    q: "Apakah ada dokumentasi?",
    a: "Ada. Dokumentasi tersedia dalam Bahasa Indonesia dan English di folder docs/. Blog bawaan juga sudah ada dua artikel panduan memulai.",
  },
  {
    q: "Tech stack apa yang digunakan?",
    a: "Next.js 16 App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase SSR, Midtrans, Doku, Resend, dan React Email. Semua dependensi stabil dan production-ready.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pertanyaan Umum
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
