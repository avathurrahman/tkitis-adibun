import { NextResponse } from "next/server";

export function GET(request: Request) {
  const url = new URL(request.url);
  const rawOrderId =
    url.searchParams.get("order_id") ??
    url.searchParams.get("invoice_number") ??
    url.searchParams.get("orderId");
  const status =
    url.searchParams.get("transaction_status") ??
    url.searchParams.get("status_code") ??
    url.searchParams.get("status");

  if (rawOrderId) {
    const nextUrl = status
      ? `/order/${rawOrderId}?status=${encodeURIComponent(status)}`
      : `/order/${rawOrderId}`;
    return NextResponse.redirect(new URL(nextUrl, url));
  }

  return NextResponse.redirect(new URL("/dashboard/billing", url));
}
