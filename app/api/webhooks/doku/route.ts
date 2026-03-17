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
  verifyDokuNotification,
  isDokuPaymentSuccess,
  type DokuNotification,
} from "@/lib/payments/doku";
import { dokuNotificationSchema } from "@/lib/validations";

const MALL_ID = process.env.DOKU_CLIENT_ID ?? "";

export async function POST(request: NextRequest) {
  const parsed = dokuNotificationSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const body = parsed.data as DokuNotification;

  if (!verifyDokuNotification(body, MALL_ID)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const invoiceNumber = body.order.invoice_number;
  const event = await claimWebhookEvent({
    eventKey: buildDokuEventKey(body),
    eventType: body.transaction.status,
    externalId: invoiceNumber,
    payload: body,
    provider: "DOKU",
  });

  if (!event.should_process) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    const existingPayment = await getPaymentByExternalId(invoiceNumber);
    if (!existingPayment) {
      await markWebhookEventFailed(event.id, "Payment record not found");
      await createAuditLog({
        actorEmail: "doku@system.local",
        description: `Webhook Doku gagal: payment ${invoiceNumber} tidak ditemukan`,
        metadata: {
          event_id: event.id,
          event_type: body.transaction.status,
          order_id: invoiceNumber,
        },
        type: "payment.failed",
      });
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    const nextStatus = resolveFinalStatus(
      existingPayment.status,
      isDokuPaymentSuccess(body) ? "PAID" : getPaymentStatus(body.transaction.status),
    );
    const paidAt =
      nextStatus === "PAID"
        ? existingPayment.paid_at ?? new Date().toISOString()
        : null;

    const { data: payment, error: paymentError } = await updatePaymentByExternalId(invoiceNumber, {
      metadata: body,
      paid_at: paidAt,
      payment_type: body.channel.id,
      status: nextStatus,
      updated_at: new Date().toISOString(),
    });

    if (paymentError || !payment) {
      console.error("Failed to update payment:", paymentError);
      await markWebhookEventFailed(event.id, "Payment record not found");
      await createAuditLog({
        actorEmail: "doku@system.local",
        description: `Webhook Doku gagal memperbarui payment ${invoiceNumber}`,
        metadata: {
          event_id: event.id,
          event_type: body.transaction.status,
          order_id: invoiceNumber,
        },
        type: "payment.failed",
      });
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
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
      actorEmail: "doku@system.local",
      description: `Webhook Doku memproses payment ${invoiceNumber} dengan status ${nextStatus}`,
      metadata: {
        event_id: event.id,
        event_type: body.transaction.status,
        order_id: invoiceNumber,
        status: nextStatus,
      },
      type: nextStatus === "PAID" ? "payment.success" : "payment.failed",
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to process Doku webhook";
    console.error("Failed to process Doku webhook:", error);
    await markWebhookEventFailed(event.id, message);
    await createAuditLog({
      actorEmail: "doku@system.local",
      description: `Webhook Doku error untuk payment ${invoiceNumber}`,
      metadata: {
        event_id: event.id,
        event_type: body.transaction.status,
        message,
        order_id: invoiceNumber,
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

function getPaymentStatus(status: string): PaymentRecord["status"] {
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

function buildDokuEventKey(body: DokuNotification) {
  return [
    body.order.invoice_number,
    body.transaction.original_request_id,
    body.transaction.status,
    body.channel.id,
  ].join(":");
}
