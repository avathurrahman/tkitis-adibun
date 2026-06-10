// Lokasi file: app/profil/[id]/page.tsx
import { students } from "../../../data/adibun";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProfilDetail({ params }: { params: { id: string } }) {
  // Sistemasi pencarian data anak berdasarkan URL
  const student = students.find((s) => s.id === params.id);

  // Jika ID tidak ditemukan di database, alihkan ke halaman 404
  if (!student) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden pb-20">
      
      {/* Banner Geometris Atas */}
      <div className={`absolute top-0 left-0 w-full h-72 rounded-b-[4rem] shadow-sm z-0 ${student.gender === 'L' ? 'bg-teal-600' : 'bg-orange-400'}`}></div>

      <div className="max-w-3xl mx-auto relative z-10 px-6 pt-12">
        {/* Tombol Kembali */}
        <Link href="/profil" className="inline-block text-sm font-bold text-white hover:text-slate-200 mb-8 transition-colors drop-shadow-md">
          &larr; Kembali ke Keluarga Adibun
        </Link>

        {/* Kartu Profil Utama */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12 text-center relative mt-16 transform transition-all duration-500 hover:shadow-2xl">
          
          {/* Avatar Artistik (Tanpa Makhluk Bernyawa) */}
          <div className={`absolute -top-24 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full flex items-center justify-center text-7xl font-serif font-bold text-white shadow-2xl border-8 border-white transition-transform duration-500 hover:scale-105 hover:rotate-6 ${student.gender === 'L' ? 'bg-gradient-to-br from-teal-400 to-emerald-600' : 'bg-gradient-to-br from-amber-300 to-orange-400'}`}>
            {student.namaPanggilan.charAt(0)}
          </div>

          <div className="mt-28 space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              {student.namaPanggilan}
            </h1>
            <p className="text-lg font-medium text-slate-500">
              {student.namaLengkap}
            </p>
          </div>

          {/* Grid Informasi Spesifik */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-t border-slate-100 pt-10 mt-10">
            
            {/* Box Cita-cita */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-teal-200 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${student.gender === 'L' ? 'bg-teal-500' : 'bg-orange-400'}`}>
                  ★
                </div>
                <p className="text-sm text-slate-400 uppercase tracking-widest font-bold group-hover:text-teal-600 transition-colors">Harapan</p>
              </div>
              <p className="text-xl font-semibold text-slate-700">{student.citaCita}</p>
            </div>

            {/* Box Kesan / Pesan */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-teal-200 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${student.gender === 'L' ? 'bg-teal-500' : 'bg-orange-400'}`}>
                  ❝
                </div>
                <p className="text-sm text-slate-400 uppercase tracking-widest font-bold group-hover:text-teal-600 transition-colors">Kenangan</p>
              </div>
              <p className="text-lg font-medium text-slate-700 italic leading-relaxed">
                {student.kutipan}
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

// ARSITEKTUR KUNCI: Menghasilkan rute statis di saat proses Build (CF Pages)
export function generateStaticParams() {
  return students.map((student) => ({
    id: student.id,
  }));
}