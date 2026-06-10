// Lokasi file: components/Footer.tsx
export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-brand-line/70 bg-brand-canvas/60 px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-sm text-brand-muted md:flex-row md:justify-between">
        {/* Identitas sekolah */}
        <div className="text-center md:text-left">
          <p className="font-display text-base text-brand-ink">
            TK IT Imam Syafi&apos;i
          </p>
          <a
            href="https://share.google/cBjNTUIaE07XPY7zH"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-emerald underline-offset-4 transition-colors hover:text-brand-gold hover:underline"
          >
            Lihat Lokasi di Google Maps &rarr;
          </a>
        </div>

        {/* Hak cipta */}
        <div className="text-xs tracking-wide text-brand-muted/80">
          &copy; 2026 &middot; Kelas Adibun B4
        </div>

        {/* Atribusi */}
        <div className="flex items-center gap-1.5 text-xs tracking-wide text-brand-muted/80">
          <span>Dirajut dengan</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-brand-terra"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span>oleh</span>
          <a
            href="https://instagram.com/avathurrahman"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-ink underline decoration-brand-gold/60 decoration-dotted underline-offset-4 transition-colors hover:text-brand-emerald"
          >
            Avathur Rahman
          </a>
        </div>
      </div>
    </footer>
  );
}
