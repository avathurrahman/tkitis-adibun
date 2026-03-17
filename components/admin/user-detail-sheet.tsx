"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaymentStatusBadge } from "@/components/dashboard/payment-status-badge";

type UserDetail = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  plan: string;
  status: string;
  created_at: string;
  current_period_end: string | null;
  payments: {
    id: string;
    amount: number;
    status: string;
    provider: string;
    created_at: string;
  }[];
};

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

const planVariant: Record<string, "default" | "secondary" | "outline"> = {
  FREE: "outline",
  BASIC: "secondary",
  PRO: "default",
  ULTIMATE: "default",
};

export function UserDetailSheet({
  user,
  open,
  onOpenChange,
}: {
  user: UserDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!user) return null;

  const initials = (
    user.full_name?.slice(0, 2) ?? user.email.slice(0, 2)
  ).toUpperCase();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detail Pengguna</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              {user.avatar_url && (
                <AvatarImage src={user.avatar_url} alt={initials} />
              )}
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                {user.full_name ?? "Tanpa Nama"}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Plan</p>
              <Badge
                variant={planVariant[user.plan] ?? "outline"}
                className="mt-1"
              >
                {user.plan}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Status</p>
              <Badge
                variant={
                  user.status === "ACTIVE" ? "default" : "secondary"
                }
                className="mt-1"
              >
                {user.status}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Terdaftar</p>
              <p className="font-medium mt-1">{formatDate(user.created_at)}</p>
            </div>
            {user.current_period_end && (
              <div>
                <p className="text-muted-foreground text-xs">
                  Periode Berakhir
                </p>
                <p className="font-medium mt-1">
                  {formatDate(user.current_period_end)}
                </p>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3">
              Riwayat Pembayaran
            </h4>
            {user.payments.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Belum ada pembayaran.
              </p>
            ) : (
              <div className="space-y-2">
                {user.payments.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border p-2.5"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {formatRupiah(p.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(p.created_at)} · {p.provider}
                      </p>
                    </div>
                    <PaymentStatusBadge status={p.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
