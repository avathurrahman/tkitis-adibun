import { NextRequest, NextResponse } from "next/server";
import {
  getPaymentByExternalId,
  type PaymentRecord,
  updatePaymentByExternalId,
} from "@/lib/data/payments";
import { activateSubscriptionForPayment } from "@/lib/data/subscriptions";
import {
  verifyMidtransSignature,
  isMidtransPaymentSuccess,
  type MidtransNotification,
} from "@/lib/payments/midtrans";
import { midtransNotificationSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const parsed = midtransNotificationSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const body = parsed.data as MidtransNotification;

  const { order_id, status_code, gross_amount, signature_key } = body;

  if (!verifyMidtransSignature(order_id, status_code, gross_amount, signature_key)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const existingPayment = await getPaymentByExternalId(order_id);
  if (!existingPayment) {
    return NextResponse.json(
      { error: "Payment record not found" },
      { status: 404 }
    );
  }

  const nextStatus = resolveFinalStatus(
    existingPayment.status,
    isMidtransPaymentSuccess(body) ? "PAID" : getPaymentStatus(body.transaction_status),
  );
  const paidAt =
    nextStatus === "PAID"
      ? existingPayment.paid_at ?? new Date().toISOString()
      : null;

  const { data: payment, error: paymentError } = await updatePaymentByExternalId(order_id, {
    metadata: body,
    paid_at: paidAt,
    payment_type: body.payment_type ?? null,
    status: nextStatus,
    updated_at: new Date().toISOString(),
  });

  if (paymentError || !payment) {
    console.error("Failed to update payment:", paymentError);
    return NextResponse.json(
      { error: "Payment record not found" },
      { status: 404 }
    );
  }

  if (nextStatus === "PAID" && existingPayment.status !== "PAID") {
    await activateSubscriptionForPayment(
      payment.user_id,
      payment.plan,
      paidAt ? new Date(paidAt) : new Date(),
    );
  }

  return NextResponse.json({ received: true });
}

function resolveFinalStatus(
  currentStatus: PaymentRecord["status"],
  incomingStatus: PaymentRecord["status"],
): PaymentRecord["status"] {
  if (currentStatus === "PAID" && incomingStatus !== "REFUNDED") {
    return "PAID";
  }

  return incomingStatus;
}

function getPaymentStatus(transactionStatus: string): PaymentRecord["status"] {
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
