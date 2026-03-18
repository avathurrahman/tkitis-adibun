import { resetRateLimitStore } from "@/lib/rate-limit";

const createClientMock = vi.fn();
const createPaymentRecordMock = vi.fn();
const createSnapTransactionMock = vi.fn();
const createDokuPaymentMock = vi.fn();
const syncExpiredSubscriptionMock = vi.fn();

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

vi.mock("@/lib/data/payments", () => ({
  createPaymentRecord: createPaymentRecordMock,
}));

vi.mock("@/lib/data/subscriptions", () => ({
  syncExpiredSubscription: syncExpiredSubscriptionMock,
}));

vi.mock("@/lib/payments/midtrans", () => ({
  createSnapTransaction: createSnapTransactionMock,
}));

vi.mock("@/lib/payments/doku", () => ({
  createDokuPayment: createDokuPaymentMock,
}));

function mockAuthenticatedClient() {
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
    from: vi.fn((table: string) =>
      table === "subscriptions"
        ? {
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                maybeSingle: vi.fn().mockResolvedValue({
                  data: {
                    id: "sub-1",
                  },
                }),
              })),
            })),
          }
        : {}
    ),
  });
}

describe("app/api/payments/route", () => {
  beforeEach(() => {
    resetRateLimitStore();
    vi.resetModules();
    vi.spyOn(Date, "now").mockReturnValue(1_710_547_200_000);
    createClientMock.mockReset();
    createPaymentRecordMock.mockReset();
    createSnapTransactionMock.mockReset();
    createDokuPaymentMock.mockReset();
    syncExpiredSubscriptionMock.mockReset();
    syncExpiredSubscriptionMock.mockResolvedValue(null);
    createPaymentRecordMock.mockResolvedValue({ error: null });
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "anon-key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
    process.env.DOKU_CLIENT_ID = "mall-123";
    process.env.DOKU_SECRET_KEY = "secret-key";
    process.env.MIDTRANS_SERVER_KEY = "server-key";
    process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY = "client-key";
    delete process.env.NEXT_PUBLIC_APP_URL;
    delete process.env.PAYMENT_PROVIDER;
  });

  afterEach(() => {
    resetRateLimitStore();
    vi.restoreAllMocks();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.DOKU_CLIENT_ID;
    delete process.env.DOKU_SECRET_KEY;
    delete process.env.MIDTRANS_SERVER_KEY;
    delete process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  });

  it("returns 503 when the configured payment stack is incomplete", async () => {
    delete process.env.DOKU_CLIENT_ID;
    delete process.env.DOKU_SECRET_KEY;

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({ plan: "PRO" }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error:
        "Checkout DOKU belum aktif. Isi DOKU_CLIENT_ID, DOKU_SECRET_KEY untuk mengaktifkan alur pembayaran end-to-end. Kalau app kamu belum butuh pembayaran, set NEXT_PUBLIC_ENABLE_PAYMENTS=false.",
    });
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
    mockAuthenticatedClient();

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({ amount: 100_000 }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing or invalid required field: plan",
    });
  });

  it("returns 500 when the payment record cannot be created", async () => {
    mockAuthenticatedClient();
    createPaymentRecordMock.mockResolvedValue({
      error: {
        message: "insert failed",
      },
    });

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({
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
    process.env.NEXT_PUBLIC_APP_URL = "https://kilatkoding.com";
    process.env.PAYMENT_PROVIDER = "midtrans";
    createSnapTransactionMock.mockResolvedValue("snap-token");
    mockAuthenticatedClient();

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({
          plan: "PRO",
        }),
        method: "POST",
      }) as never
    );

    expect(createPaymentRecordMock).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 99_000,
        currency: "IDR",
        external_id: "KK-1710547200000-DEADBEEF",
        items: [
          {
            id: "pro-monthly",
            name: "KilatKoding Pro - 1 Bulan",
            price: 99_000,
            quantity: 1,
          },
        ],
        plan: "PRO",
        provider: "MIDTRANS",
        status: "PENDING",
        subscription_id: "sub-1",
        user_id: "user-1",
      })
    );
    expect(syncExpiredSubscriptionMock).toHaveBeenCalledWith("user-1");
    expect(createSnapTransactionMock).toHaveBeenCalledWith({
      amount: 99_000,
      callbackUrl: "https://kilatkoding.com/order/KK-1710547200000-DEADBEEF",
      customerEmail: "member@example.com",
      customerName: "member",
      items: [
        {
          id: "pro-monthly",
          name: "KilatKoding Pro - 1 Bulan",
          price: 99_000,
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
    mockAuthenticatedClient();

    const { POST } = await import("@/app/api/payments/route");
    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({
          plan: "PRO",
        }),
        method: "POST",
      }) as never
    );

    expect(createDokuPaymentMock).toHaveBeenCalledWith({
      amount: 99_000,
      backUrl: "http://localhost/order/KK-1710547200000-DEADBEEF",
      callbackUrl: "http://localhost/order/KK-1710547200000-DEADBEEF",
      customerEmail: "member@example.com",
      customerName: "member",
      items: [
        {
          name: "KilatKoding Pro - 1 Bulan",
          price: 99_000,
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

  it("rate limits repeated payment session creation for the same user", async () => {
    createDokuPaymentMock.mockResolvedValue({
      payment: {
        url: "https://sandbox.doku.com/checkout/KK-1710547200000-DEADBEEF",
      },
    });
    mockAuthenticatedClient();

    const { POST } = await import("@/app/api/payments/route");

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(
        new Request("http://localhost/api/payments", {
          body: JSON.stringify({
            plan: "PRO",
          }),
          method: "POST",
        }) as never
      );

      expect(response.status).toBe(200);
    }

    const response = await POST(
      new Request("http://localhost/api/payments", {
        body: JSON.stringify({
          plan: "PRO",
        }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      error: "Terlalu banyak percobaan pembayaran. Coba lagi nanti.",
    });
  });
});
