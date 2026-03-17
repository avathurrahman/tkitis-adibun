const getPaymentByExternalIdMock = vi.fn();
const updatePaymentByExternalIdMock = vi.fn();
const activateSubscriptionForPaymentMock = vi.fn();
const verifyDokuNotificationMock = vi.fn();
const isDokuPaymentSuccessMock = vi.fn();

vi.mock("@/lib/data/payments", () => ({
  getPaymentByExternalId: getPaymentByExternalIdMock,
  updatePaymentByExternalId: updatePaymentByExternalIdMock,
}));

vi.mock("@/lib/data/subscriptions", () => ({
  activateSubscriptionForPayment: activateSubscriptionForPaymentMock,
}));

vi.mock("@/lib/payments/doku", () => ({
  isDokuPaymentSuccess: isDokuPaymentSuccessMock,
  verifyDokuNotification: verifyDokuNotificationMock,
}));

describe("app/api/webhooks/doku/route", () => {
  beforeEach(() => {
    getPaymentByExternalIdMock.mockReset();
    updatePaymentByExternalIdMock.mockReset();
    activateSubscriptionForPaymentMock.mockReset();
    verifyDokuNotificationMock.mockReset();
    isDokuPaymentSuccessMock.mockReset();
    process.env.DOKU_CLIENT_ID = "mall-123";
  });

  it("rejects invalid webhook signatures", async () => {
    verifyDokuNotificationMock.mockReturnValue(false);

    const { POST } = await import("@/app/api/webhooks/doku/route");
    const response = await POST(
      new Request("http://localhost/api/webhooks/doku", {
        body: JSON.stringify({
          channel: {
            id: "VIRTUAL_ACCOUNT_BCA",
          },
          order: {
            amount: 100_000,
            invoice_number: "KK-ORDER-1",
          },
          security: {
            check_word: "invalid",
          },
          transaction: {
            date: "2026-03-16T12:00:00Z",
            original_request_id: "KK-ORDER-1",
            status: "SUCCESS",
          },
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
    verifyDokuNotificationMock.mockReturnValue(true);
    isDokuPaymentSuccessMock.mockReturnValue(false);
    getPaymentByExternalIdMock.mockResolvedValue(null);

    const { POST } = await import("@/app/api/webhooks/doku/route");
    const response = await POST(
      new Request("http://localhost/api/webhooks/doku", {
        body: JSON.stringify({
          channel: {
            id: "VIRTUAL_ACCOUNT_BCA",
          },
          order: {
            amount: 100_000,
            invoice_number: "KK-ORDER-1",
          },
          security: {
            check_word: "valid",
          },
          transaction: {
            date: "2026-03-16T12:00:00Z",
            original_request_id: "KK-ORDER-1",
            status: "FAILED",
          },
        }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      error: "Payment record not found",
    });
  });

  it("marks paid notifications and activates the subscription", async () => {
    verifyDokuNotificationMock.mockReturnValue(true);
    isDokuPaymentSuccessMock.mockReturnValue(true);
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

    const { POST } = await import("@/app/api/webhooks/doku/route");
    const response = await POST(
      new Request("http://localhost/api/webhooks/doku", {
        body: JSON.stringify({
          channel: {
            id: "VIRTUAL_ACCOUNT_BCA",
          },
          order: {
            amount: 100_000,
            invoice_number: "KK-ORDER-1",
          },
          security: {
            check_word: "valid",
          },
          transaction: {
            date: "2026-03-16T12:00:00Z",
            original_request_id: "KK-ORDER-1",
            status: "SUCCESS",
          },
        }),
        method: "POST",
      }) as never
    );

    expect(updatePaymentByExternalIdMock).toHaveBeenCalledWith(
      "KK-ORDER-1",
      expect.objectContaining({
        paid_at: expect.any(String),
        payment_type: "VIRTUAL_ACCOUNT_BCA",
        status: "PAID",
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

  it("maps unsuccessful statuses without activating subscriptions", async () => {
    verifyDokuNotificationMock.mockReturnValue(true);
    isDokuPaymentSuccessMock.mockReturnValue(false);
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

    const { POST } = await import("@/app/api/webhooks/doku/route");
    const response = await POST(
      new Request("http://localhost/api/webhooks/doku", {
        body: JSON.stringify({
          channel: {
            id: "VIRTUAL_ACCOUNT_BCA",
          },
          order: {
            amount: 100_000,
            invoice_number: "KK-ORDER-1",
          },
          security: {
            check_word: "valid",
          },
          transaction: {
            date: "2026-03-16T12:00:00Z",
            original_request_id: "KK-ORDER-1",
            status: "FAILED",
          },
        }),
        method: "POST",
      }) as never
    );

    expect(updatePaymentByExternalIdMock).toHaveBeenCalledWith(
      "KK-ORDER-1",
      expect.objectContaining({
        paid_at: null,
        status: "FAILED",
      })
    );
    expect(activateSubscriptionForPaymentMock).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });
});
