import MidtransClient from "midtrans-client";
import crypto from "crypto";

if (!process.env.MIDTRANS_SERVER_KEY) {
  throw new Error("MIDTRANS_SERVER_KEY is not set");
}
if (!process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY) {
  throw new Error("NEXT_PUBLIC_MIDTRANS_CLIENT_KEY is not set");
}

const isProduction = process.env.NODE_ENV === "production";

export const snap = new MidtransClient.Snap({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export const coreApi = new MidtransClient.CoreApi({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export type MidtransItem = {
  id: string;
  price: number;
  quantity: number;
  name: string;
};

export type CreateTransactionParams = {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  items: MidtransItem[];
  callbackUrl?: string;
  enabledPayments?: string[];
};

export async function createSnapTransaction(params: CreateTransactionParams) {
  const { orderId, amount, customerName, customerEmail, items, callbackUrl, enabledPayments } = params;

  const token = await snap.createTransactionToken({
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    customer_details: {
      first_name: customerName,
      email: customerEmail,
    },
    item_details: items,
    ...(callbackUrl && { callbacks: { finish: callbackUrl } }),
    ...(enabledPayments && { enabled_payments: enabledPayments }),
  });

  return token as string;
}

export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  receivedSignature: string
): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY!;
  const payload = orderId + statusCode + grossAmount + serverKey;
  const expectedSignature = crypto
    .createHash("sha512")
    .update(payload)
    .digest("hex");

  return expectedSignature === receivedSignature;
}

export type MidtransNotification = {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
  fraud_status?: string;
  payment_type: string;
};

export function isMidtransPaymentSuccess(
  notification: MidtransNotification
): boolean {
  const { transaction_status, fraud_status } = notification;
  return (
    transaction_status === "capture" ||
    (transaction_status === "settlement" &&
      (fraud_status === undefined || fraud_status === "accept"))
  );
}
