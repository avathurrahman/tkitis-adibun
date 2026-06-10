// Lokasi file: app/layout.tsx

import type { Metadata } from "next";
// ... (Biarkan impor font bawaan boilerplate Anda tetap di sini, jangan dihapus) ...
import "@/app/globals.css"; // Pastikan impor CSS ini tetap ada

// 1. Impor komponen yang baru saja kita buat
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 2. Anda bisa menyesuaikan metadata judul website di sini
export const metadata: Metadata = {
  title: "Kelas Adibun - TK IT Imam Syafi'i",
  description: "Website kenangan dan perpisahan Kelas Adibun B4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* 3. Tambahkan kelas flex, flex-col, dan min-h-screen di body bawaan */}
      <body className="flex flex-col min-h-screen bg-slate-50 antialiased">
        
        {/* 4. Pasang Header di atas */}
        <Header />
        
        {/* 5. Bungkus children dengan tag main yang fleksibel agar footer terdorong ke bawah */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* 6. Pasang Footer di bawah */}
        <Footer />
        
      </body>
    </html>
  );
}