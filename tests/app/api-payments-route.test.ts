const createClientMock = vi.fn();
const createSnapTransactionMock = vi.fn();
const createDokuPaymentMock = vi.fn();

vi.mock("crypto", async (importOriginal) => {
  const actual = await importOriginal<typeof import("crypto")>();

  return {
    ...actual,
    randomUUID: () => "deadbeef-dead-beef-dead-beefdeadbeef",
  };
});

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

vi.mock("@/lib/payments/midtrans", () => ({
  createSnapTransaction: createSnapTransactionMock,
}));

vi.mock("@/lib/payments/doku", () => ({
  createDokuPayment: createDokuPaymentMock,
}));

describe("app/api/payments/route", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.spyOn(Date, "now").mockReturnValue(1_710_547_200_000);
    createClientMock.mockReset();
    createSnapTransactionMock.mockReset();
    createDokuPaymentMock.mockReset();
    delete process.env.NEXT_PUBLIC_APP_URL;
    delete process.env.PAYMENT_PROVIDER;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("requires an authenticated user", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getClaims: vi.fn().mockResolvedValue({
          data: null,
          error: { message: "No session" },
        }),
      },
    });

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({}),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "Unauthorized",
    });
  });

  it("validates required fields", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getClaims: vi.fn().mockResolvedValue({
          data: {
            claims: {
              email: "member@example.com",
              sub: "user-1",
            },
          },
          error: null,
        }),
      },
    });

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({
          amount: 100_000,
          plan: "PRO",
        }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing required fields: plan, amount, items",
    });
  });

  it("returns 500 when the payment record cannot be created", async () => {
    const insertMock = vi.fn().mockResolvedValue({
      error: {
        message: "insert failed",
      },
    });

    createClientMock.mockResolvedValue({
      auth: {
        getClaims: vi.fn().mockResolvedValue({
          data: {
            claims: {
              email: "member@example.com",
              sub: "user-1",
            },
          },
          error: null,
        }),
      },
      from: vi.fn(() => ({
        insert: insertMock,
      })),
    });

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({
          amount: 100_000,
          items: [
            {
              id: "starter-pro",
              name: "Starter Pro",
              price: 100_000,
              quantity: 1,
            },
          ],
          plan: "PRO",
        }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to create payment record",
    });
  });

  it("creates Midtrans payments when configured", async () => {
    process.env.PAYMENT_PROVIDER = "midtrans";
    createSnapTransactionMock.mockResolvedValue("snap-token");

    const insertMock = vi.fn().mockResolvedValue({
      error: null,
    });

    createClientMock.mockResolvedValue({
      auth: {
        getClaims: vi.fn().mockResolvedValue({
          data: {
            claims: {
              email: "member@example.com",
              sub: "user-1",
            },
          },
          error: null,
        }),
      },
      from: vi.fn(() => ({
        insert: insertMock,
      })),
    });

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({
          amount: 100_000,
          items: [
            {
              id: "starter-pro",
              name: "Starter Pro",
              price: 100_000,
              quantity: 1,
            },
          ],
          plan: "PRO",
        }),
        headers: {
          origin: "https://kilatkoding.com",
        },
        method: "POST",
      }) as never
    );

    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 100_000,
        currency: "IDR",
        external_id: "KK-1710547200000-DEADBEEF",
        provider: "MIDTRANS",
        status: "PENDING",
        user_id: "user-1",
      })
    );
    expect(createSnapTransactionMock).toHaveBeenCalledWith({
      amount: 100_000,
      callbackUrl: "https://kilatkoding.com/payment/callback",
      customerEmail: "member@example.com",
      customerName: "member",
      items: [
        {
          id: "starter-pro",
          name: "Starter Pro",
          price: 100_000,
          quantity: 1,
        },
      ],
      orderId: "KK-1710547200000-DEADBEEF",
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      orderId: "KK-1710547200000-DEADBEEF",
      provider: "midtrans",
      token: "snap-token",
    });
  });

  it("creates DOKU payments by default", async () => {
    createDokuPaymentMock.mockResolvedValue({
      payment: {
        url: "https://sandbox.doku.com/checkout/KK-1710547200000-DEADBEEF",
      },
    });

    const insertMock = vi.fn().mockResolvedValue({
      error: null,
    });

    createClientMock.mockResolvedValue({
      auth: {
        getClaims: vi.fn().mockResolvedValue({
          data: {
            claims: {
              email: "member@example.com",
              sub: "user-1",
            },
          },
          error: null,
        }),
      },
      from: vi.fn(() => ({
        insert: insertMock,
      })),
    });

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({
          amount: 100_000,
          items: [
            {
              id: "starter-pro",
              name: "Starter Pro",
              price: 100_000,
              quantity: 1,
            },
          ],
          plan: "PRO",
        }),
        method: "POST",
      }) as never
    );

    expect(createDokuPaymentMock).toHaveBeenCalledWith({
      amount: 100_000,
      callbackUrl: "/payment/callback",
      customerEmail: "member@example.com",
      customerName: "member",
      items: [
        {
          name: "Starter Pro",
          price: 100_000,
          quantity: 1,
        },
      ],
      orderId: "KK-1710547200000-DEADBEEF",
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      orderId: "KK-1710547200000-DEADBEEF",
      payment_url: "https://sandbox.doku.com/checkout/KK-1710547200000-DEADBEEF",
      provider: "doku",
    });
  });
});
