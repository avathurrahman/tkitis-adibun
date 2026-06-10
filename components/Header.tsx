// Lokasi file: components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Identitas Kiri (Brand) */}
        <Link href="/" className="font-extrabold text-lg tracking-tight text-slate-800 hover:scale-105 transition-transform">
          Kelas <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">Adibun</span>
        </Link>

        {/* Navigasi Utama Kanan */}
        <nav className="flex gap-6 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-teal-600 transition-colors">
            Beranda
          </Link>
          <Link href="/profil" className="hover:text-teal-600 transition-colors">
            Profil 12 Anak
          </Link>
        </nav>
        
      </div>
    </header>
  );
}