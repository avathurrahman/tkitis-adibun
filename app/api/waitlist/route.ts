import { NextResponse } from "next/server";
import {
  applyRateLimitHeaders,
  createRateLimitResponse,
  getPublicRateLimitConfig,
  takeRateLimit,
} from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { waitlistRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const rateLimit = await takeRateLimit(getPublicRateLimitConfig("waitlist", req));
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit, "Terlalu banyak pendaftaran. Coba lagi nanti.");
  }

  const parsed = waitlistRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return applyRateLimitHeaders(
      NextResponse.json({ error: "Email tidak valid." }, { status: 400 }),
      rateLimit,
    );
  }
  const { email, name } = parsed.data;

  const supabase = await createClient();

  const normalizedName = name && name.length > 0 ? name : null;
  const { error } = await supabase.from("waitlist").insert({ email, name: normalizedName });

  if (error) {
    if (error.code === "23505") {
      return applyRateLimitHeaders(
        NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 }),
        rateLimit,
      );
    }
    return applyRateLimitHeaders(
      NextResponse.json({ error: "Gagal mendaftar. Coba lagi." }, { status: 500 }),
      rateLimit,
    );
  }

  return applyRateLimitHeaders(NextResponse.json({ success: true }), rateLimit);
}
