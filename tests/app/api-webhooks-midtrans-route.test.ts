const getPaymentByExternalIdMock = vi.fn();
const updatePaymentByExternalIdMock = vi.fn();
const activateSubscriptionForPaymentMock = vi.fn();
const verifyMidtransSignatureMock = vi.fn();
const isMidtransPaymentSuccessMock = vi.fn();

vi.mock("@/lib/data/payments", () => ({
  getPaymentByExternalId: getPaymentByExternalIdMock,
  updatePaymentByExternalId: updatePaymentByExternalIdMock,
}));

vi.mock("@/lib/data/subscriptions", () => ({
  activateSubscriptionForPayment: activateSubscriptionForPaymentMock,
}));

vi.mock("@/lib/payments/midtrans", () => ({
  isMidtransPaymentSuccess: isMidtransPaymentSuccessMock,
  verifyMidtransSignature: verifyMidtransSignatureMock,
}));

describe("app/api/webhooks/midtrans/route", () => {
  beforeEach(() => {
    getPaymentByExternalIdMock.mockReset();
    updatePaymentByExternalIdMock.mockReset();
    activateSubscriptionForPaymentMock.mockReset();
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
    getPaymentByExternalIdMock.mockResolvedValue(null);

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
    getPaymentByExternalIdMock.mockResolvedValue({
      paid_at: null,
      plan: "PRO",
      status: "PENDING",
      user_id: "user-1",
    });
    updatePaymentByExternalIdMock.mockResolvedValue({
      data: {
        plan: "PRO",
        user_id: "user-1",
      },
      error: null,
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

    expect(updatePaymentByExternalIdMock).toHaveBeenCalledWith(
      "KK-ORDER-1",
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
    expect(activateSubscriptionForPaymentMock).toHaveBeenCalledWith(
      "user-1",
      "PRO",
      expect.any(Date),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      received: true,
    });
  });

  it("maps unsuccessful transaction statuses without activating subscriptions", async () => {
    verifyMidtransSignatureMock.mockReturnValue(true);
    isMidtransPaymentSuccessMock.mockReturnValue(false);
    getPaymentByExternalIdMock.mockResolvedValue({
      paid_at: null,
      plan: "PRO",
      status: "PENDING",
      user_id: "user-1",
    });
    updatePaymentByExternalIdMock.mockResolvedValue({
      data: {
        plan: "PRO",
        user_id: "user-1",
      },
      error: null,
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

    expect(updatePaymentByExternalIdMock).toHaveBeenCalledWith(
      "KK-ORDER-1",
      expect.objectContaining({
        paid_at: null,
        status: "EXPIRED",
      })
    );
    expect(activateSubscriptionForPaymentMock).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });
});
