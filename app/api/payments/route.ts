import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createSnapTransaction } from "@/lib/payments/midtrans";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: authData, error: authError } =
    await supabase.auth.getClaims();

  if (authError || !authData?.claims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = authData.claims.sub as string;
  const userEmail = authData.claims.email as string;

  const body = await request.json();
  const { plan, amount, items } = body as {
    plan: string;
    amount: number;
    items: { id: string; price: number; quantity: number; name: string }[];
  };

  if (!plan || !amount || !items?.length) {
    return NextResponse.json(
      { error: "Missing required fields: plan, amount, items" },
      { status: 400 }
    );
  }

  const orderId = `KK-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;

  const { error: insertError } = await supabase.from("payments").insert({
    user_id: userId,
    amount,
    currency: "IDR",
    status: "PENDING",
    provider: "MIDTRANS",
    external_id: orderId,
  });

  if (insertError) {
    console.error("Failed to create payment record:", insertError);
    return NextResponse.json(
      { error: "Failed to create payment record" },
      { status: 500 }
    );
  }

  const snapToken = await createSnapTransaction({
    orderId,
    amount,
    customerName: userEmail.split("@")[0],
    customerEmail: userEmail,
    items,
  });

  return NextResponse.json({ snapToken, orderId });
}
