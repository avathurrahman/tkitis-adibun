import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SupabaseEnvNoticeProps = {
  compact?: boolean;
};

export function SupabaseEnvNotice({
  compact = false,
}: SupabaseEnvNoticeProps) {
  if (compact) {
    return (
      <p className="text-sm text-muted-foreground">
        Setel env Supabase untuk mengaktifkan auth.
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Supabase belum dikonfigurasi</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Tambahkan <code>NEXT_PUBLIC_SUPABASE_URL</code> dan{" "}
          <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> di environment
          lokal untuk mengaktifkan login, pendaftaran, dan session auth.
        </p>
      </CardContent>
    </Card>
  );
}
