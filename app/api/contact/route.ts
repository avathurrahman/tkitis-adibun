import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const resendKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM ?? "KilatKoding <noreply@kilatkoding.com>";
  const emailTo = process.env.CONTACT_EMAIL ?? process.env.EMAIL_FROM ?? "hello@kilatkoding.com";

  if (!resendKey) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const parsed = contactRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }
  const { name, email, message } = parsed.data;

  const resend = new Resend(resendKey);

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: emailTo,
    replyTo: email,
    subject: `Pesan baru dari ${name} — KilatKoding`,
    text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Gagal mengirim pesan." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
