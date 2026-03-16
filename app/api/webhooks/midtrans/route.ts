import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  verifyMidtransSignature,
  isMidtransPaymentSuccess,
  type MidtransNotification,
} from "@/lib/payments/midtrans";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as MidtransNotification;

  const { order_id, status_code, gross_amount, signature_key } = body;

  if (!verifyMidtransSignature(order_id, status_code, gross_amount, signature_key)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const supabase = await createClient();

  const paymentStatus = isMidtransPaymentSuccess(body) ? "PAID" : getPaymentStatus(body.transaction_status);

  const { data: payment, error: paymentError } = await supabase
    .from("payments")
    .update({
      status: paymentStatus,
      payment_type: body.payment_type,
      paid_at: paymentStatus === "PAID" ? new Date().toISOString() : null,
      metadata: body,
      updated_at: new Date().toISOString(),
    })
    .eq("external_id", order_id)
    .select("user_id, subscription_id")
    .single();

  if (paymentError || !payment) {
    console.error("Failed to update payment:", paymentError);
    return NextResponse.json(
      { error: "Payment record not found" },
      { status: 404 }
    );
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

function getPaymentStatus(transactionStatus: string): string {
  switch (transactionStatus) {
    case "expire":
      return "EXPIRED";
    case "cancel":
    case "deny":
      return "FAILED";
    case "refund":
    case "partial_refund":
      return "REFUNDED";
    default:
      return "PENDING";
  }
}
