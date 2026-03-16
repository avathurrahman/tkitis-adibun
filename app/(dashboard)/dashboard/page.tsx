import { redirect } from "next/navigation";
import { SupabaseEnvNotice } from "@/components/auth/supabase-env-notice";
import { hasEnvVars } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function DashboardContent() {
  if (!hasEnvVars) {
    return <SupabaseEnvNotice />;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Selamat datang, {data.claims.email}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
