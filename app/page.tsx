// Lokasi file: app/page.tsx
import Link from "next/link";
import MemoryGame from "@/components/MemoryGame";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-6 md:p-24 overflow-hidden relative">
      
      {/* Latar Belakang Abstrak & Geometris */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Konten Utama */}
      <div className="z-10 max-w-3xl w-full text-center space-y-12">
        
        {/* Header Section */}
        <section className="space-y-6">
          <div className="inline-block p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
            <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase">
              TK IT Imam Syafi&apos;i
            </h2>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            Kelas <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">Adibun</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto">
            Angkatan B4 &bull; Merangkai Kenangan, Merajut Ukhuwah
          </p>
        </section>

        {/* Filosofi Section */}
        <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-serif">أ</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-2">
            <span>Makna Adibun</span>
            <span className="text-teal-600 font-serif text-3xl">(أَدِيْبٌ)</span>
          </h3>
          <p className="text-slate-600 leading-relaxed text-lg">
            Berasal dari kata &quot;Adab&quot;, yang mencerminkan pribadi dengan pengetahuan luas, beradab mulia, berperilaku baik, dan jujur. Sebuah harapan agar anak-anak tumbuh menjadi generasi sholeh dan sholehah yang berpegang teguh pada Al-Qur&apos;an dan Sunnah.
          </p>
        </section>

        {/* Permainan Memori Huruf Hijaiyah (BLOK 4) */}
        <MemoryGame />

        {/* Pesan Guru Section */}
        <section className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-semibold text-slate-500 uppercase tracking-widest">Pesan Pembimbing</h3>
          <blockquote className="text-2xl italic font-medium text-slate-700 leading-snug">
            &quot;Semoga Allah Ta&apos;ala memberi kita kemudahan dalam mendidik anak menjadi anak yang sholeh dan sholehah, berakhlaq dan beradab dengan ajaran salafus shaleh.&quot;
          </blockquote>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500">
            <span>Ustadzah Nabiilah Husniyyah</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span>Ustadzah Dian Ariestya</span>
          </div>
        </section>

        {/* Tombol Navigasi */}
        <div className="pt-10">
          <Link href="/profil" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-teal-600 rounded-full hover:bg-teal-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-200">
            Lihat Profil 12 Anak
          </Link>
        </div>

      </div>
    </main>
  );
}