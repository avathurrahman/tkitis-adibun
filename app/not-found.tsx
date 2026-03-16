import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-muted-foreground mb-2">404</p>
      <h1 className="text-3xl font-bold tracking-tight mb-3">
        Halaman tidak ditemukan
      </h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Halaman yang kamu cari nggak ada atau sudah dipindahkan.
      </p>
      <Button asChild>
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
