import { createHash } from "crypto";

describe("lib/payments/doku", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-16T12:00:00.000Z"));
    process.env.DOKU_CLIENT_ID = "mall-123";
    process.env.DOKU_SECRET_KEY = "secret-key";
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("creates a DOKU payment request with signed headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        order: {
          amount: 200_000,
          invoice_number: "KK-ORDER-1",
        },
        payment: {
          url: "https://sandbox.doku.com/checkout/KK-ORDER-1",
        },
      }),
      ok: true,
    });
    vi.stubGlobal("fetch", fetchMock);

    const { createDokuPayment } = await import("@/lib/payments/doku");
    const result = await createDokuPayment({
      amount: 200_000,
      callbackUrl: "https://kilatkoding.com/payment/callback",
      customerEmail: "member@example.com",
      customerName: "Member",
      items: [
        {
          name: "Starter Pro",
          price: 200_000,
          quantity: 1,
        },
      ],
      orderId: "KK-ORDER-1",
      paymentMethodTypes: ["VIRTUAL_ACCOUNT_BCA"],
    });

    expect(result.payment.url).toBe(
      "https://sandbox.doku.com/checkout/KK-ORDER-1"
    );
    const [requestUrl, requestOptions] = fetchMock.mock.calls[0];

    expect(requestUrl).toBe("https://sandbox.doku.com/checkout/v1/payment");
    expect(requestOptions).toEqual(
      expect.objectContaining({
        headers: expect.objectContaining({
          "Client-Id": "mall-123",
          "Request-Id": "KK-ORDER-1",
          "Request-Timestamp": "2026-03-16T12:00:00Z",
          Signature: expect.stringMatching(/^HMACSHA256=/),
        }),
        method: "POST",
      })
    );
    expect(JSON.parse(requestOptions.body as string)).toEqual({
      basket: [
        {
          name: "Starter Pro",
          price: 200_000,
          quantity: 1,
          subtotal: 200_000,
        },
      ],
      client: {
        id: "mall-123",
      },
      customer: {
        email: "member@example.com",
        name: "Member",
      },
      order: {
        amount: 200_000,
        callback_url: "https://kilatkoding.com/payment/callback",
        currency: "IDR",
        invoice_number: "KK-ORDER-1",
      },
      payment: {
        payment_due_date: 60,
        payment_method_types: ["VIRTUAL_ACCOUNT_BCA"],
      },
    });
  });

  it("throws the provider error response when payment creation fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        text: vi.fn().mockResolvedValue("invalid signature"),
      })
    );

    const { createDokuPayment } = await import("@/lib/payments/doku");

    await expect(
      createDokuPayment({
        amount: 100_000,
        callbackUrl: "https://kilatkoding.com/payment/callback",
        customerEmail: "member@example.com",
        customerName: "Member",
        orderId: "KK-ORDER-1",
      })
    ).rejects.toThrow("Doku payment creation failed: invalid signature");
  });

  it("verifies DOKU notifications and success status", async () => {
    const { isDokuPaymentSuccess, verifyDokuNotification } = await import(
      "@/lib/payments/doku"
    );
    const checkWord = createHash("sha1")
      .update("mall-123KK-ORDER-1200000SUCCESSsecret-key")
      .digest("hex")
      .toUpperCase();

    const notification = {
      channel: {
        id: "VIRTUAL_ACCOUNT_BCA",
      },
      order: {
        amount: 200_000,
        invoice_number: "KK-ORDER-1",
      },
      security: {
        check_word: checkWord,
      },
      transaction: {
        date: "2026-03-16T12:00:00Z",
        original_request_id: "KK-ORDER-1",
        status: "SUCCESS",
      },
    };

    expect(verifyDokuNotification(notification, "mall-123")).toBe(true);
    expect(isDokuPaymentSuccess(notification)).toBe(true);
    expect(
      verifyDokuNotification(
        {
          ...notification,
          security: {
            check_word: "WRONG",
          },
        },
        "mall-123"
      )
    ).toBe(false);
  });
});
