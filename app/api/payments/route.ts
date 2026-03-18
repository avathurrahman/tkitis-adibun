import { NextRequest, NextResponse } from "next/server";
import { getFeatureAvailability, resolvePaymentProvider } from "@/lib/config/features";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";
import { getPaidPlan } from "@/config/subscriptions";
import { createPaymentRecord } from "@/lib/data/payments";
import { syncExpiredSubscription } from "@/lib/data/subscriptions";
import {
  applyRateLimitHeaders,
  createRateLimitResponse,
  getPaymentRateLimitConfig,
  takeRateLimit,
} from "@/lib/rate-limit";
import { paymentRequestSchema } from "@/lib/validations";

type PaymentProvider = "midtrans" | "doku";

export async function POST(request: NextRequest) {
  const paymentsFeature = getFeatureAvailability("payments");
  if (!paymentsFeature.enabled) {
    return NextResponse.json({ error: paymentsFeature.message }, { status: 503 });
  }

  const PROVIDER = resolvePaymentProvider() as PaymentProvider;
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getClaims();

  if (authError || !authData?.claims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = authData.claims.sub as string;
  const userEmail = authData.claims.email as string;
  const rateLimit = await takeRateLimit(getPaymentRateLimitConfig(userId));

  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit, "Terlalu banyak percobaan pembayaran. Coba lagi nanti.");
  }

  const parsed = paymentRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return applyRateLimitHeaders(
      NextResponse.json(
        { error: "Missing or invalid required field: plan" },
        { status: 400 }
      ),
      rateLimit,
    );
  }

  const planConfig = getPaidPlan(parsed.data.plan);
  if (!planConfig) {
    return applyRateLimitHeaders(
      NextResponse.json({ error: "Plan tidak tersedia." }, { status: 400 }),
      rateLimit,
    );
  }

  await syncExpiredSubscription(userId);

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  const orderId = `KK-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;

  let insertError: { message?: string } | null = null;

  try {
    ({ error: insertError } = await createPaymentRecord({
      amount: planConfig.price,
      currency: "IDR",
      external_id: orderId,
      items: planConfig.items,
      plan: planConfig.plan,
      provider: PROVIDER.toUpperCase() as "MIDTRANS" | "DOKU",
      status: "PENDING",
      subscription_id: subscription?.id ?? null,
      user_id: userId,
    }));
  } catch (error) {
    console.error("Payment service is not configured:", error);
    return applyRateLimitHeaders(
      NextResponse.json(
        { error: "Payment service not configured" },
        { status: 503 },
      ),
      rateLimit,
    );
  }

  if (insertError) {
    console.error("Failed to create payment record:", insertError);
    return applyRateLimitHeaders(
      NextResponse.json(
        { error: "Failed to create payment record" },
        { status: 500 }
      ),
      rateLimit,
    );
  }

  const customerName = userEmail.split("@")[0];

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const orderUrl = `${appUrl}/order/${orderId}`;

  if (PROVIDER === "midtrans") {
    const { createSnapTransaction } = await import("@/lib/payments/midtrans");
    const token = await createSnapTransaction({
      orderId,
      amount: planConfig.price,
      customerName,
      customerEmail: userEmail,
      items: planConfig.items,
      callbackUrl: orderUrl,
    });
    return applyRateLimitHeaders(
      NextResponse.json({ provider: "midtrans", token, orderId }),
      rateLimit,
    );
  }

  const { createDokuPayment } = await import("@/lib/payments/doku");

  const result = await createDokuPayment({
    orderId,
    amount: planConfig.price,
    customerName,
    customerEmail: userEmail,
    backUrl: orderUrl,
    callbackUrl: orderUrl,
    items: planConfig.items.map(({ name, price, quantity }) => ({ name, price, quantity })),
  });

  return applyRateLimitHeaders(
    NextResponse.json({ provider: "doku", payment_url: result.payment.url, orderId }),
    rateLimit,
  );
}
