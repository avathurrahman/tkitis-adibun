import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AdminRevenueChart } from "@/components/dashboard/admin-revenue-chart";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Admin — KilatKoding",
  description: "Dashboard admin untuk memantau revenue dan subscription KilatKoding.",
  path: "/admin",
  noIndex: true,
});

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const PAGE_SIZE = 10;

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PAID: "default",
  PENDING: "secondary",
  FAILED: "destructive",
  EXPIRED: "outline",
  REFUNDED: "secondary",
};

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

type Payment = {
  id: string;
  amount: number;
  status: string;
  provider: string;
  external_id: string;
  created_at: string;
};

async function AdminContent({ page }: { page: number }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) redirect("/auth/login");

  const email = data.claims.email as string;
  if (ADMIN_EMAILS.length > 0 && !ADMIN_EMAILS.includes(email)) {
    redirect("/dashboard");
  }

  const offset = (page - 1) * PAGE_SIZE;

  const [paymentsResult, allPaymentsResult, subscriptionsResult] =
    await Promise.all([
      supabase
        .from("payments")
        .select("id, amount, status, provider, external_id, created_at")
        .order("created_at", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase
        .from("payments")
        .select("amount, status, created_at")
        .order("created_at", { ascending: false }),
      supabase.from("subscriptions").select("plan, status"),
    ]);

  const payments: Payment[] = paymentsResult.data ?? [];
  const allPayments = allPaymentsResult.data ?? [];
  const subscriptions = subscriptionsResult.data ?? [];

  const totalRevenue = allPayments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);
  const activeSubs = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const paidSubs = subscriptions.filter((s) => s.plan !== "FREE").length;
  const freeSubs = subscriptions.filter((s) => s.plan === "FREE").length;
  const totalPages = Math.max(1, Math.ceil(allPayments.length / PAGE_SIZE));

  const chartData = buildChartData(allPayments);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Admin</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-muted-foreground text-sm mt-1">{email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Revenue" value={formatRupiah(totalRevenue)} />
        <StatCard label="Active Subs" value={String(activeSubs)} />
        <StatCard label="Paid Plans" value={String(paidSubs)} />
        <StatCard label="Free Plans" value={String(freeSubs)} />
      </div>

      <AdminRevenueChart data={chartData} />

      <Separator />

      <div>
        <h2 className="text-lg font-semibold mb-4">Riwayat Pembayaran</h2>
        {payments.length === 0 ? (
          <p className="text-muted-foreground text-sm">Belum ada pembayaran.</p>
        ) : (
          <>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs">
                        {p.external_id}
                      </TableCell>
                      <TableCell>{formatRupiah(p.amount)}</TableCell>
                      <TableCell className="capitalize text-sm">
                        {p.provider}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[p.status] ?? "secondary"}>
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {formatDate(p.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={page > 1 ? `/admin?page=${page - 1}` : "#"}
                        aria-disabled={page <= 1}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        href={
                          page < totalPages ? `/admin?page=${page + 1}` : "#"
                        }
                        aria-disabled={page >= totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function buildChartData(
  payments: { amount: number; status: string; created_at: string }[]
) {
  const map: Record<string, number> = {};
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().slice(0, 10);
  });
  last14.forEach((d) => (map[d] = 0));

  payments
    .filter((p) => p.status === "PAID")
    .forEach((p) => {
      const day = p.created_at.slice(0, 10);
      if (day in map) map[day] = (map[day] ?? 0) + p.amount;
    });

  return last14.map((date) => ({
    date,
    revenue: map[date] ?? 0,
  }));
}

export default function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <AdminContentWrapper searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminContentWrapper({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  return <AdminContent page={page} />;
}
