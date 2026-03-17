"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type MidtransSnap = {
  pay: (
    token: string,
    options?: {
      onSuccess?: (result: unknown) => void;
      onPending?: (result: unknown) => void;
      onError?: (result: unknown) => void;
      onClose?: () => void;
    }
  ) => void;
};

type PlanConfig = {
  plan: string;
  amount: number;
  label: string;
  items: { id: string; price: number; quantity: number; name: string }[];
};

export function PaymentButton({ config }: { config: PlanConfig }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    if (!clientKey) return;

    const script = document.createElement("script");
    script.src =
      process.env.NODE_ENV === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: config.plan,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error ?? "Gagal membuat pembayaran");
        return;
      }

      const data = await res.json();

      if (data.provider === "midtrans") {
        const snapObj = (window as unknown as { snap?: MidtransSnap }).snap;
        if (snapObj) {
          snapObj.pay(data.token, {
            onSuccess: () => {
              toast.success("Pembayaran berhasil!");
              window.location.href = `/order/${data.orderId}`;
            },
            onPending: () => {
              toast.info("Pembayaran sedang diproses.");
              window.location.href = `/order/${data.orderId}?status=pending`;
            },
            onError: () => toast.error("Pembayaran gagal. Silakan coba lagi."),
            onClose: () => toast("Pembayaran dibatalkan."),
          });
        }
      } else if (data.provider === "doku" && data.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className="w-full">
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {config.label}
    </Button>
  );
}
