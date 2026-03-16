import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name } = body as { email: string; name?: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase.from("waitlist").insert({ email, name: name || null });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal mendaftar. Coba lagi." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
