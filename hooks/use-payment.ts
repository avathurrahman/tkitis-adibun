"use client";

import { useState } from "react";

declare global {
  function loadJokulCheckout(paymentUrl: string): void;
  interface Window {
    snap: {
      pay: (token: string, options?: SnapPayOptions) => void;
    };
  }
}

type SnapPayOptions = {
  onSuccess?: (result: Record<string, unknown>) => void;
  onPending?: (result: Record<string, unknown>) => void;
  onError?: (result: Record<string, unknown>) => void;
  onClose?: () => void;
};

type PaymentCallbacks = {
  onSuccess?: (result: Record<string, unknown>) => void;
  onPending?: (result: Record<string, unknown>) => void;
  onError?: (result: Record<string, unknown>) => void;
  onClose?: () => void;
};

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const DOKU_JS_URL = IS_PRODUCTION
  ? "https://jokul.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js"
  : "https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js";

const MIDTRANS_SNAP_BASE_URL = IS_PRODUCTION
  ? "https://app.midtrans.com/snap/snap.js"
  : "https://app.sandbox.midtrans.com/snap/snap.js";

type PaymentItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type InitiatePaymentParams = {
  plan: string;
  amount: number;
  items: PaymentItem[];
  mode?: "popup" | "redirect";
  callbacks?: PaymentCallbacks;
};

function loadDokuScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof loadJokulCheckout === "function") {
      resolve();
      return;
    }
    if (document.querySelector(`script[src="${DOKU_JS_URL}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = DOKU_JS_URL;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function loadSnapScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve();
      return;
    }
    if (document.querySelector(`script[src="${MIDTRANS_SNAP_BASE_URL}"]`)) {
      resolve();
      return;
    }
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "";
    const script = document.createElement("script");
    script.src = MIDTRANS_SNAP_BASE_URL;
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function initiatePayment({ plan, mode = "popup", callbacks }: InitiatePaymentParams) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Payment initiation failed");
      }

      const data = await response.json();

      if (data.provider === "midtrans") {
        await loadSnapScript();
        window.snap.pay(data.token, {
          onSuccess: callbacks?.onSuccess,
          onPending: callbacks?.onPending,
          onError: (result) => {
            setError("Payment failed");
            callbacks?.onError?.(result);
          },
          onClose: callbacks?.onClose,
        });
        return data;
      }

      if (mode === "redirect") {
        window.location.href = data.payment_url;
        return data;
      }

      await loadDokuScript();
      loadJokulCheckout(data.payment_url);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return { initiatePayment, loading, error };
}
