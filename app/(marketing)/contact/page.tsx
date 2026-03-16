import { ContactForm } from "@/components/contact-form";
import { Separator } from "@/components/ui/separator";
import { Mail, MessageCircle } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Kontak — KilatKoding",
  description:
    "Ada pertanyaan atau butuh bantuan? Hubungi kami dan kami akan balas secepatnya.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Hubungi Kami</h1>
        <p className="text-muted-foreground">
          Ada pertanyaan, masalah teknis, atau mau ngobrol soal KilatKoding? Kirim pesan dan kami
          akan balas dalam 1–2 hari kerja.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-xs text-muted-foreground mt-0.5">hello@kilatkoding.com</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Discord Community</p>
            <p className="text-xs text-muted-foreground mt-0.5">Respon lebih cepat via Discord</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Kirim Pesan</h2>
        <ContactForm />
      </div>
    </div>
  );
}
