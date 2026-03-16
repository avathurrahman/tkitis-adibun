// @vitest-environment jsdom

import { act, renderHook, waitFor } from "@testing-library/react";

describe("hooks/use-payment", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());

    const originalAppendChild = document.head.appendChild.bind(document.head);
    vi.spyOn(document.head, "appendChild").mockImplementation((node) => {
      const appended = originalAppendChild(node);

      if (node instanceof HTMLScriptElement) {
        queueMicrotask(() => {
          node.onload?.(new Event("load"));
        });
      }

      return appended;
    });

    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        href: "http://localhost/",
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("launches Midtrans popup payments", async () => {
    const payMock = vi.fn();
    Object.assign(window, {
      snap: {
        pay: payMock,
      },
    });
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        provider: "midtrans",
        token: "snap-token",
      }),
      ok: true,
    });

    const { usePayment } = await import("@/hooks/use-payment");
    const { result } = renderHook(() => usePayment());

    await act(async () => {
      await result.current.initiatePayment({
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
      });
    });

    await waitFor(() => expect(payMock).toHaveBeenCalledWith("snap-token", expect.any(Object)));
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("redirects DOKU payments in redirect mode", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        payment_url: "https://sandbox.doku.com/checkout/order-1",
        provider: "doku",
      }),
      ok: true,
    });

    const { usePayment } = await import("@/hooks/use-payment");
    const { result } = renderHook(() => usePayment());

    await act(async () => {
      await result.current.initiatePayment({
        amount: 100_000,
        items: [
          {
            id: "starter-pro",
            name: "Starter Pro",
            price: 100_000,
            quantity: 1,
          },
        ],
        mode: "redirect",
        plan: "PRO",
      });
    });

    expect(window.location.href).toBe(
      "https://sandbox.doku.com/checkout/order-1"
    );
    expect(result.current.error).toBeNull();
  });

  it("surfaces API errors to the hook state", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        error: "Payment initiation failed",
      }),
      ok: false,
    });

    const { usePayment } = await import("@/hooks/use-payment");
    const { result } = renderHook(() => usePayment());

    await act(async () => {
      await result.current.initiatePayment({
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
      });
    });

    expect(result.current.error).toBe("Payment initiation failed");
    expect(result.current.loading).toBe(false);
  });
});
