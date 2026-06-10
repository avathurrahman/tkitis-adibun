// Lokasi file: app/profil/page.tsx
import Link from "next/link";
import { students } from "../../data/adibun";

export default function ProfilList() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 relative overflow-hidden">
      {/* Ornamen Latar */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Link href="/" className="inline-block text-sm font-bold text-teal-600 hover:text-teal-700 mb-4 transition-colors">
            &larr; Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Keluarga <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">Adibun</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            12 bintang yang bersinar dengan adab dan ilmu. Pilih salah satu untuk membaca jejak kenangan mereka.
          </p>
        </div>

        {/* Grid Kartu Profil */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.map((student) => (
            <Link href={`/profil/${student.id}`} key={student.id} className="group outline-none">
              <div className="relative flex flex-col items-center p-6 rounded-3xl bg-white shadow-sm border border-slate-100 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl group-focus:ring-4 group-focus:ring-slate-200">
                
                {/* Avatar Visual (Tanpa Makhluk Bernyawa) */}
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-serif font-bold text-white mb-4 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${student.gender === 'L' ? 'bg-gradient-to-br from-teal-400 to-emerald-600' : 'bg-gradient-to-br from-amber-300 to-orange-400'}`}>
                  {student.namaPanggilan.charAt(0)}
                </div>

                {/* Informasi Nama */}
                <h2 className="text-xl font-bold text-slate-800 text-center mb-1 group-hover:text-teal-600 transition-colors">
                  {student.namaPanggilan}
                </h2>
                
                {/* Ornamen Garis */}
                <div className={`w-8 h-1 rounded-full mt-3 opacity-50 group-hover:w-16 transition-all duration-300 ${student.gender === 'L' ? 'bg-teal-500' : 'bg-orange-400'}`}></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}