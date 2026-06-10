// Lokasi file: app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Amiri, Mulish } from "next/font/google";
import "@/app/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Sistem tipografi "Lentera Adibun"
// - Fraunces : display serif berkarakter (judul Latin)
// - Amiri    : serif Arab klasik (teks hijaiyah & ornamen)
// - Mulish   : sans hangat untuk teks tubuh
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const arabic = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const body = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kelas Adibun B4 — TK IT Imam Syafi'i",
  description:
    "Monumen digital kenangan & perpisahan Kelas Adibun B4, TK IT Imam Syafi'i. Merangkai kenangan, merajut ukhuwah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${arabic.variable} ${body.variable}`}
    >
      <body className="flex flex-col min-h-screen font-sans antialiased text-brand-ink selection:bg-brand-emerald/15">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
