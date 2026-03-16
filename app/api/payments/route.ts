import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

type PaymentProvider = "midtrans" | "doku";

const PROVIDER = (process.env.PAYMENT_PROVIDER ?? "doku") as PaymentProvider;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getClaims();

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
    provider: PROVIDER.toUpperCase(),
    external_id: orderId,
  });

  if (insertError) {
    console.error("Failed to create payment record:", insertError);
    return NextResponse.json(
      { error: "Failed to create payment record" },
      { status: 500 }
    );
  }

  const customerName = userEmail.split("@")[0];

  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "";

  if (PROVIDER === "midtrans") {
    const { createSnapTransaction } = await import("@/lib/payments/midtrans");
    const token = await createSnapTransaction({
      orderId,
      amount,
      customerName,
      customerEmail: userEmail,
      items,
      callbackUrl: `${origin}/payment/callback`,
    });
    return NextResponse.json({ provider: "midtrans", token, orderId });
  }

  const { createDokuPayment } = await import("@/lib/payments/doku");

  const result = await createDokuPayment({
    orderId,
    amount,
    customerName,
    customerEmail: userEmail,
    callbackUrl: `${origin}/payment/callback`,
    items: items.map(({ name, price, quantity }) => ({ name, price, quantity })),
  });

  return NextResponse.json({ provider: "doku", payment_url: result.payment.url, orderId });
}
