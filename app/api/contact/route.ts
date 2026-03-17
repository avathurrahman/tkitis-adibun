import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  applyRateLimitHeaders,
  createRateLimitResponse,
  getPublicRateLimitConfig,
  takeRateLimit,
} from "@/lib/rate-limit";
import { contactRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const rateLimit = takeRateLimit(getPublicRateLimitConfig("contact", req));
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit, "Terlalu banyak pesan. Coba lagi nanti.");
  }

  const resendKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM ?? "KilatKoding <noreply@kilatkoding.com>";
  const emailTo = process.env.CONTACT_EMAIL ?? process.env.EMAIL_FROM ?? "hello@kilatkoding.com";

  if (!resendKey) {
    return applyRateLimitHeaders(
      NextResponse.json({ error: "Email service not configured." }, { status: 503 }),
      rateLimit,
    );
  }

  const parsed = contactRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return applyRateLimitHeaders(
      NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 }),
      rateLimit,
    );
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
    return applyRateLimitHeaders(
      NextResponse.json({ error: "Gagal mengirim pesan." }, { status: 500 }),
      rateLimit,
    );
  }

  return applyRateLimitHeaders(NextResponse.json({ success: true }), rateLimit);
}
