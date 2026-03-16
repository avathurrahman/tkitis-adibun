"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TemplateBanner } from "@/components/ui/template-banner";
import { Loader2, Users, Clock, Zap } from "lucide-react";

const LAUNCH_DATE = new Date("2026-04-01T00:00:00+07:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function update() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{label}</div>
    </div>
  );
}

export default function WaitlistPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const countdown = useCountdown(LAUNCH_DATE);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Gagal mendaftar.");
        return;
      }

      setDone(true);
      toast.success("Berhasil! Kami akan kabari kamu saat launch.");
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TemplateBanner description="Kumpulkan early access user sebelum produkmu launch — kustomisasi teks dan tanggal sesuai produkmu" />
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-lg w-full space-y-8">
        <div className="space-y-3">
          <Badge variant="outline" className="text-primary border-primary/30">
            <Clock className="h-3 w-3 mr-1" />
            Segera Hadir
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            KilatKoding sedang disiapkan.
          </h1>
          <p className="text-muted-foreground text-lg">
            Daftar sekarang dan dapatkan <span className="text-primary font-medium">diskon 30% early bird</span> saat launch.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 py-4">
          <CountdownUnit value={countdown.days} label="Hari" />
          <span className="text-2xl font-bold text-muted-foreground pb-4">:</span>
          <CountdownUnit value={countdown.hours} label="Jam" />
          <span className="text-2xl font-bold text-muted-foreground pb-4">:</span>
          <CountdownUnit value={countdown.minutes} label="Menit" />
          <span className="text-2xl font-bold text-muted-foreground pb-4">:</span>
          <CountdownUnit value={countdown.seconds} label="Detik" />
        </div>

        <Separator />

        {done ? (
          <div className="rounded-lg border bg-muted/30 p-6 space-y-2">
            <div className="text-2xl">🎉</div>
            <p className="font-semibold">Kamu sudah terdaftar!</p>
            <p className="text-sm text-muted-foreground">
              Kami akan kirim email saat KilatKoding resmi launch. Stay tuned!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nama (opsional)</Label>
              <Input id="name" name="name" placeholder="Nama kamu" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="nama@domain.com" required />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Daftar Waitlist — Gratis
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Tidak ada spam. Hanya email launch dan promo early bird.
            </p>
          </form>
        )}

        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            247 developer sudah daftar
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            Diskon 30% untuk early bird
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
