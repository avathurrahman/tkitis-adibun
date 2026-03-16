import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { waitlistRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const parsed = waitlistRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
  }
  const { email, name } = parsed.data;

  const supabase = await createClient();

  const normalizedName = name && name.length > 0 ? name : null;
  const { error } = await supabase.from("waitlist").insert({ email, name: normalizedName });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal mendaftar. Coba lagi." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
