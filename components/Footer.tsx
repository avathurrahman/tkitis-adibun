// Lokasi file: components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 px-6 mt-auto relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
        
        {/* Bagian Kiri: Identitas Sekolah & Link GMaps */}
        <div className="text-center md:text-left space-y-1">
          <p className="font-semibold text-slate-700">TK IT Imam Syafi&apos;i</p>
          <p className="text-xs">
            <a 
              href="https://share.google/cBjNTUIaE07XPY7zH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline transition-all"
            >
              Lihat Lokasi di Google Maps &rarr;
            </a>
          </p>
        </div>

        {/* Bagian Tengah: Hak Cipta */}
        <div className="text-xs text-slate-400 font-medium tracking-wide">
          &copy; 2026 Kelas Adibun B4
        </div>

        {/* Bagian Kanan: Atribusi Premium Anda */}
        <div className="flex items-center gap-1 text-xs tracking-wide text-slate-400">
          <span>Made with a cup of</span>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700 inline mx-0.5 animate-pulse">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" x2="6" y1="2" y2="4" />
            <line x1="10" x2="10" y1="2" y2="4" />
            <line x1="14" x2="14" y1="2" y2="4" />
          </svg>
          
          <span>&amp;</span>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 inline mx-0.5 transform hover:scale-125 transition-transform">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          
          <span>by</span>
          
          <a 
            href="https://instagram.com/avathurrahman" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold text-slate-700 hover:text-teal-600 transition-colors underline decoration-dotted decoration-teal-500 underline-offset-4"
          >
            Avathur Rahman
          </a>
        </div>

      </div>
    </footer>
  );
}