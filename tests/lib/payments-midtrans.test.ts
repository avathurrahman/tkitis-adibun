import crypto from "crypto";

const createTransactionTokenMock = vi.fn();
const SnapMock = vi.fn(function SnapMock() {
  return {
    createTransactionToken: createTransactionTokenMock,
  };
});

vi.mock("midtrans-client", () => ({
  default: {
    Snap: SnapMock,
  },
}));

describe("lib/payments/midtrans", () => {
  beforeEach(() => {
    vi.resetModules();
    SnapMock.mockClear();
    createTransactionTokenMock.mockReset();
    process.env.MIDTRANS_SERVER_KEY = "server-key";
    process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY = "client-key";
  });

  it("creates a snap transaction token with optional callbacks", async () => {
    createTransactionTokenMock.mockResolvedValue("snap-token");

    const { createSnapTransaction } = await import("@/lib/payments/midtrans");
    const token = await createSnapTransaction({
      amount: 150_000,
      callbackUrl: "https://kilatkoding.com/payment/callback",
      customerEmail: "member@example.com",
      customerName: "member",
      enabledPayments: ["gopay"],
      items: [
        {
          id: "starter-pro",
          name: "Starter Pro",
          price: 150_000,
          quantity: 1,
        },
      ],
      orderId: "KK-ORDER-1",
    });

    expect(token).toBe("snap-token");
    expect(SnapMock).toHaveBeenCalledWith({
      clientKey: "client-key",
      isProduction: false,
      serverKey: "server-key",
    });
    expect(createTransactionTokenMock).toHaveBeenCalledWith({
      callbacks: {
        finish: "https://kilatkoding.com/payment/callback",
      },
      customer_details: {
        email: "member@example.com",
        first_name: "member",
      },
      enabled_payments: ["gopay"],
      item_details: [
        {
          id: "starter-pro",
          name: "Starter Pro",
          price: 150_000,
          quantity: 1,
        },
      ],
      transaction_details: {
        gross_amount: 150_000,
        order_id: "KK-ORDER-1",
      },
    });
  });

  it("verifies Midtrans signatures", async () => {
    const { verifyMidtransSignature } = await import("@/lib/payments/midtrans");
    const signature = crypto
      .createHash("sha512")
      .update("KK-ORDER-1200000server-key")
      .digest("hex");

    expect(
      verifyMidtransSignature("KK-ORDER-1", "200", "000", signature)
    ).toBe(true);
    expect(
      verifyMidtransSignature("KK-ORDER-1", "200", "000", "invalid")
    ).toBe(false);
  });

  it("maps successful Midtrans statuses", async () => {
    const { isMidtransPaymentSuccess } = await import("@/lib/payments/midtrans");

    expect(
      isMidtransPaymentSuccess({
        gross_amount: "150000",
        order_id: "KK-ORDER-1",
        payment_type: "bank_transfer",
        signature_key: "signature",
        status_code: "200",
        transaction_status: "capture",
      })
    ).toBe(true);
    expect(
      isMidtransPaymentSuccess({
        fraud_status: "accept",
        gross_amount: "150000",
        order_id: "KK-ORDER-1",
        payment_type: "bank_transfer",
        signature_key: "signature",
        status_code: "200",
        transaction_status: "settlement",
      })
    ).toBe(true);
    expect(
      isMidtransPaymentSuccess({
        gross_amount: "150000",
        order_id: "KK-ORDER-1",
        payment_type: "bank_transfer",
        signature_key: "signature",
        status_code: "200",
        transaction_status: "pending",
      })
    ).toBe(false);
  });
});
