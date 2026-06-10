// Lokasi file: components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-line/70 bg-brand-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg tracking-tight text-brand-ink"
        >
          {/* Lambang geometris (belah ketupat berlapis) */}
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rotate-45 rounded-[6px] border border-brand-gold/50" />
            <span className="absolute inset-1.5 rotate-45 rounded-[4px] bg-brand-emerald/90 transition-transform duration-500 group-hover:rotate-[135deg]" />
          </span>
          <span>
            Kelas <span className="italic text-brand-emerald">Adibun</span>
          </span>
        </Link>

        {/* Navigasi */}
        <nav className="flex items-center gap-7 text-sm font-medium text-brand-muted">
          <Link
            href="/"
            className="transition-colors hover:text-brand-emerald"
          >
            Beranda
          </Link>
          <Link
            href="/profil"
            className="transition-colors hover:text-brand-emerald"
          >
            Profil
          </Link>
        </nav>
      </div>
    </header>
  );
}
