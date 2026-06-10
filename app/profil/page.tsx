// Lokasi file: app/profil/page.tsx
import Link from "next/link";
import { students } from "../../data/adibun";

export default function ProfilList() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      {/* Kepala halaman */}
      <header className="text-center">
        <Link
          href="/"
          className="reveal inline-block text-xs font-semibold uppercase tracking-[0.3em] text-brand-emerald transition-colors hover:text-brand-gold"
        >
          &larr; Beranda
        </Link>
        <h1
          className="reveal mt-6 font-display text-5xl font-light tracking-tight text-brand-ink md:text-6xl"
          style={{ animationDelay: "100ms" }}
        >
          Keluarga <span className="italic text-brand-emerald">Adibun</span>
        </h1>
        <div
          className="reveal gold-rule mx-auto mt-6 w-32"
          style={{ animationDelay: "180ms" }}
        />
        <p
          className="reveal mx-auto mt-6 max-w-xl text-brand-muted"
          style={{ animationDelay: "240ms" }}
        >
          Dua belas anak yang bersinar dengan adab dan ilmu. Pilih satu untuk
          membaca jejak kenangannya.
        </p>
      </header>

      {/* Grid profil */}
      <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {students.map((student, i) => {
          const isBoy = student.gender === "L";
          return (
            <Link
              key={student.id}
              href={`/profil/${student.id}`}
              className="reveal group outline-none"
              style={{ animationDelay: `${120 + i * 45}ms` }}
            >
              <article className="illuminated flex flex-col items-center rounded-3xl p-6 transition-all duration-300 group-hover:-translate-y-1.5 group-focus-visible:ring-4 group-focus-visible:ring-brand-gold/30">
                {/* Monogram geometris (tanpa makhluk bernyawa) */}
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
                  <span
                    className={`absolute inset-0 rotate-45 rounded-[14px] border ${
                      isBoy ? "border-brand-emerald/40" : "border-brand-terra/40"
                    }`}
                  />
                  <span
                    className={`absolute inset-2 rotate-45 rounded-[12px] transition-transform duration-500 group-hover:rotate-[135deg] ${
                      isBoy
                        ? "bg-gradient-to-br from-brand-emerald to-brand-emerald-deep"
                        : "bg-gradient-to-br from-brand-terra to-[#8f3f27]"
                    }`}
                  />
                  <span className="relative font-display text-2xl font-medium text-brand-parchment">
                    {student.namaPanggilan.charAt(0)}
                  </span>
                </div>

                <h2 className="font-display text-xl text-brand-ink transition-colors group-hover:text-brand-emerald">
                  {student.namaPanggilan}
                </h2>
                <span
                  className={`mt-3 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-14 ${
                    isBoy ? "bg-brand-emerald/60" : "bg-brand-terra/60"
                  }`}
                />
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
