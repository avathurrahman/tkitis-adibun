import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  verifyDokuNotification,
  isDokuPaymentSuccess,
  type DokuNotification,
} from "@/lib/payments/doku";

const MALL_ID = process.env.DOKU_CLIENT_ID ?? "";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as DokuNotification;

  if (!verifyDokuNotification(body, MALL_ID)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const invoiceNumber = body.order.invoice_number;
  const paymentStatus = isDokuPaymentSuccess(body) ? "PAID" : getPaymentStatus(body.transaction.status);

  const supabase = await createClient();

  const { data: payment, error: paymentError } = await supabase
    .from("payments")
    .update({
      status: paymentStatus,
      payment_type: body.channel.id,
      paid_at: paymentStatus === "PAID" ? new Date().toISOString() : null,
      metadata: body,
      updated_at: new Date().toISOString(),
    })
    .eq("external_id", invoiceNumber)
    .select("user_id")
    .single();

  if (paymentError || !payment) {
    console.error("Failed to update payment:", paymentError);
    return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
  }

  if (paymentStatus === "PAID") {
    await supabase
      .from("subscriptions")
      .update({
        status: "ACTIVE",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", payment.user_id);
  }

  return NextResponse.json({ received: true });
}

function getPaymentStatus(status: string): string {
  switch (status) {
    case "EXPIRED":
      return "EXPIRED";
    case "FAILED":
    case "REVERSED":
      return "FAILED";
    case "REFUND":
      return "REFUNDED";
    default:
      return "PENDING";
  }
}
