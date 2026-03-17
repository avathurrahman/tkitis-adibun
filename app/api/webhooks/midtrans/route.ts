import { NextRequest, NextResponse } from "next/server";
import {
  getPaymentByExternalId,
  type PaymentRecord,
  updatePaymentByExternalId,
} from "@/lib/data/payments";
import { createAuditLog } from "@/lib/data/audit-logs";
import { activateSubscriptionForPayment } from "@/lib/data/subscriptions";
import {
  claimWebhookEvent,
  markWebhookEventFailed,
  markWebhookEventProcessed,
} from "@/lib/data/webhook-events";
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

  const event = await claimWebhookEvent({
    eventKey: buildMidtransEventKey(body),
    eventType: body.transaction_status,
    externalId: order_id,
    payload: body,
    provider: "MIDTRANS",
  });

  if (!event.should_process) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    const existingPayment = await getPaymentByExternalId(order_id);
    if (!existingPayment) {
      await markWebhookEventFailed(event.id, "Payment record not found");
      await createAuditLog({
        actorEmail: "midtrans@system.local",
        description: `Webhook Midtrans gagal: payment ${order_id} tidak ditemukan`,
        metadata: {
          event_id: event.id,
          event_type: body.transaction_status,
          order_id,
        },
        type: "payment.failed",
      });
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
      await markWebhookEventFailed(event.id, "Payment record not found");
      await createAuditLog({
        actorEmail: "midtrans@system.local",
        description: `Webhook Midtrans gagal memperbarui payment ${order_id}`,
        metadata: {
          event_id: event.id,
          event_type: body.transaction_status,
          order_id,
        },
        type: "payment.failed",
      });
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

    await markWebhookEventProcessed(event.id);
    await createAuditLog({
      actorEmail: "midtrans@system.local",
      description: `Webhook Midtrans memproses payment ${order_id} dengan status ${nextStatus}`,
      metadata: {
        event_id: event.id,
        event_type: body.transaction_status,
        order_id,
        status: nextStatus,
      },
      type: nextStatus === "PAID" ? "payment.success" : "payment.failed",
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to process Midtrans webhook";
    console.error("Failed to process Midtrans webhook:", error);
    await markWebhookEventFailed(event.id, message);
    await createAuditLog({
      actorEmail: "midtrans@system.local",
      description: `Webhook Midtrans error untuk payment ${order_id}`,
      metadata: {
        event_id: event.id,
        event_type: body.transaction_status,
        message,
        order_id,
      },
      type: "payment.failed",
    });
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
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

function buildMidtransEventKey(body: MidtransNotification) {
  return [
    body.order_id,
    body.transaction_status,
    body.status_code,
    body.payment_type ?? "unknown",
    body.fraud_status ?? "none",
  ].join(":");
}
