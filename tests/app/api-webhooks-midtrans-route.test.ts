const createClientMock = vi.fn();
const verifyMidtransSignatureMock = vi.fn();
const isMidtransPaymentSuccessMock = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

vi.mock("@/lib/payments/midtrans", () => ({
  isMidtransPaymentSuccess: isMidtransPaymentSuccessMock,
  verifyMidtransSignature: verifyMidtransSignatureMock,
}));

describe("app/api/webhooks/midtrans/route", () => {
  beforeEach(() => {
    createClientMock.mockReset();
    verifyMidtransSignatureMock.mockReset();
    isMidtransPaymentSuccessMock.mockReset();
  });

  it("rejects invalid webhook signatures", async () => {
    verifyMidtransSignatureMock.mockReturnValue(false);

    const { POST } = await import("@/app/api/webhooks/midtrans/route");
    const response = await POST(
      new Request("http://localhost/api/webhooks/midtrans", {
        body: JSON.stringify({
          gross_amount: "100000",
          order_id: "KK-ORDER-1",
          signature_key: "invalid",
          status_code: "200",
          transaction_status: "settlement",
        }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid signature",
    });
  });

  it("returns 404 when the payment does not exist", async () => {
    verifyMidtransSignatureMock.mockReturnValue(true);
    isMidtransPaymentSuccessMock.mockReturnValue(false);

    const singleMock = vi.fn().mockResolvedValue({
      data: null,
      error: {
        message: "missing",
      },
    });

    createClientMock.mockResolvedValue({
      from: vi.fn(() => ({
        update: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => ({
              single: singleMock,
            })),
          })),
        })),
      })),
    });

    const { POST } = await import("@/app/api/webhooks/midtrans/route");
    const response = await POST(
      new Request("http://localhost/api/webhooks/midtrans", {
        body: JSON.stringify({
          gross_amount: "100000",
          order_id: "KK-ORDER-1",
          payment_type: "bank_transfer",
          signature_key: "valid",
          status_code: "200",
          transaction_status: "expire",
        }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      error: "Payment record not found",
    });
  });

  it("marks paid payments and activates the subscription", async () => {
    verifyMidtransSignatureMock.mockReturnValue(true);
    isMidtransPaymentSuccessMock.mockReturnValue(true);

    const paymentsUpdateMock = vi.fn(() => ({
      eq: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: {
              subscription_id: "sub-1",
              user_id: "user-1",
            },
            error: null,
          }),
        })),
      })),
    }));
    const subscriptionEqMock = vi.fn().mockResolvedValue({
      error: null,
    });
    const subscriptionsUpdateMock = vi.fn(() => ({
      eq: subscriptionEqMock,
    }));

    createClientMock.mockResolvedValue({
      from: vi.fn((table: string) =>
        table === "payments"
          ? {
              update: paymentsUpdateMock,
            }
          : {
              update: subscriptionsUpdateMock,
            }
      ),
    });

    const { POST } = await import("@/app/api/webhooks/midtrans/route");
    const response = await POST(
      new Request("http://localhost/api/webhooks/midtrans", {
        body: JSON.stringify({
          gross_amount: "100000",
          order_id: "KK-ORDER-1",
          payment_type: "bank_transfer",
          signature_key: "valid",
          status_code: "200",
          transaction_status: "settlement",
        }),
        method: "POST",
      }) as never
    );

    expect(paymentsUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.objectContaining({
          order_id: "KK-ORDER-1",
        }),
        paid_at: expect.any(String),
        payment_type: "bank_transfer",
        status: "PAID",
        updated_at: expect.any(String),
      })
    );
    expect(subscriptionEqMock).toHaveBeenCalledWith("user_id", "user-1");
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      received: true,
    });
  });

  it("maps unsuccessful transaction statuses without activating subscriptions", async () => {
    verifyMidtransSignatureMock.mockReturnValue(true);
    isMidtransPaymentSuccessMock.mockReturnValue(false);

    const paymentsUpdateMock = vi.fn(() => ({
      eq: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: {
              subscription_id: "sub-1",
              user_id: "user-1",
            },
            error: null,
          }),
        })),
      })),
    }));
    const subscriptionsUpdateMock = vi.fn();

    createClientMock.mockResolvedValue({
      from: vi.fn((table: string) =>
        table === "payments"
          ? {
              update: paymentsUpdateMock,
            }
          : {
              update: subscriptionsUpdateMock,
            }
      ),
    });

    const { POST } = await import("@/app/api/webhooks/midtrans/route");
    const response = await POST(
      new Request("http://localhost/api/webhooks/midtrans", {
        body: JSON.stringify({
          gross_amount: "100000",
          order_id: "KK-ORDER-1",
          payment_type: "bank_transfer",
          signature_key: "valid",
          status_code: "200",
          transaction_status: "expire",
        }),
        method: "POST",
      }) as never
    );

    expect(paymentsUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        paid_at: null,
        status: "EXPIRED",
      })
    );
    expect(subscriptionsUpdateMock).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });
});
