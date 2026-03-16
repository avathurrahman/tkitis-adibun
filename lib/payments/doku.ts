import crypto from "crypto";

if (!process.env.DOKU_CLIENT_ID) {
  throw new Error("DOKU_CLIENT_ID is not set");
}
if (!process.env.DOKU_SECRET_KEY) {
  throw new Error("DOKU_SECRET_KEY is not set");
}

const isProduction = process.env.NODE_ENV === "production";
const BASE_URL = isProduction ? "https://api.doku.com" : "https://sandbox.doku.com";

const CLIENT_ID = process.env.DOKU_CLIENT_ID!;
const SECRET_KEY = process.env.DOKU_SECRET_KEY!;

function hashBody(body: object): string {
  return crypto.createHash("sha256").update(JSON.stringify(body)).digest("base64");
}

function buildSignature(
  requestId: string,
  timestamp: string,
  target: string,
  bodyHash: string
): string {
  const components = [
    `Client-Id:${CLIENT_ID}`,
    `Request-Id:${requestId}`,
    `Request-Timestamp:${timestamp}`,
    `Request-Target:${target}`,
    `Digest:SHA-256=${bodyHash}`,
  ].join("\n");

  return crypto.createHmac("sha256", SECRET_KEY).update(components).digest("base64");
}

export type DokuBasketItem = {
  name: string;
  price: number;
  quantity: number;
};

export type CreateDokuPaymentParams = {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  callbackUrl: string;
  backUrl?: string;
  items?: DokuBasketItem[];
  expiryMinutes?: number;
};

export type DokuPaymentResult = {
  payment_url: string;
  order: {
    invoice_number: string;
    amount: number;
  };
};

export type DokuNotification = {
  order: {
    invoice_number: string;
    amount: number;
  };
  transaction: {
    status: string;
    date: string;
    original_request_id: string;
  };
  channel: { id: string };
  security: { check_word: string };
};

export async function createDokuPayment(
  params: CreateDokuPaymentParams
): Promise<DokuPaymentResult> {
  const target = "/checkout/v1/payment";
  const requestId = params.orderId;
  const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

  const body = {
    client: { id: CLIENT_ID },
    order: {
      invoice_number: params.orderId,
      amount: params.amount,
      currency: "IDR",
      callback_url: params.callbackUrl,
      ...(params.backUrl && { back_url: params.backUrl }),
    },
    payment: {
      payment_due_date: params.expiryMinutes ?? 60,
    },
    customer: {
      name: params.customerName,
      email: params.customerEmail,
    },
    ...(params.items && {
      basket: params.items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
    }),
  };

  const bodyHash = hashBody(body);
  const signature = buildSignature(requestId, timestamp, target, bodyHash);

  const response = await fetch(`${BASE_URL}${target}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": CLIENT_ID,
      "Request-Id": requestId,
      "Request-Timestamp": timestamp,
      Signature: `HMACSHA256=${signature}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Doku payment creation failed: ${errorText}`);
  }

  return response.json() as Promise<DokuPaymentResult>;
}

export function verifyDokuNotification(
  notification: DokuNotification,
  mallId: string
): boolean {
  const { order, transaction, security } = notification;
  const checkString = `${mallId}${order.invoice_number}${order.amount}${transaction.status}${SECRET_KEY}`;
  const expected = crypto.createHash("sha1").update(checkString).digest("hex").toUpperCase();
  return expected === security.check_word;
}

export function isDokuPaymentSuccess(notification: DokuNotification): boolean {
  return notification.transaction.status === "SUCCESS";
}
