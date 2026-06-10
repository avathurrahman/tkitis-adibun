// Lokasi file: app/profil/[id]/page.tsx
import { students } from "../../../data/adibun";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProfilDetail({ params }: { params: { id: string } }) {
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    return notFound();
  }

  const isBoy = student.gender === "L";
  const accentBg = isBoy
    ? "bg-gradient-to-br from-brand-emerald to-brand-emerald-deep"
    : "bg-gradient-to-br from-brand-terra to-[#8f3f27]";

  return (
    <div className="relative overflow-hidden pb-24">
      {/* Panel geometris atas */}
      <div className={`absolute inset-x-0 top-0 -z-10 h-64 ${accentBg}`}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 47%, rgba(255,255,255,.5) 49%, rgba(255,255,255,.5) 51%, transparent 53%), linear-gradient(-45deg, transparent 47%, rgba(255,255,255,.5) 49%, rgba(255,255,255,.5) 51%, transparent 53%)",
            backgroundSize: "38px 38px",
          }}
        />
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-10">
        <Link
          href="/profil"
          className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-brand-parchment/90 transition-colors hover:text-white"
        >
          &larr; Keluarga Adibun
        </Link>

        {/* Kartu profil */}
        <article className="illuminated reveal mt-20 rounded-[2.5rem] px-7 pb-10 pt-24 text-center md:px-12">
          {/* Monogram */}
          <div className="absolute -top-16 left-1/2 flex h-32 w-32 -translate-x-1/2 items-center justify-center">
            <span
              className={`absolute inset-0 rotate-45 rounded-[26px] border border-brand-parchment shadow-xl ${accentBg}`}
            />
            <span className="relative font-display text-5xl font-medium text-brand-parchment">
              {student.namaPanggilan.charAt(0)}
            </span>
          </div>

          <h1 className="font-display text-4xl font-light tracking-tight text-brand-ink md:text-5xl">
            {student.namaPanggilan}
          </h1>
          <p className="mt-2 text-brand-muted">{student.namaLengkap}</p>

          <div className="gold-rule mx-auto mt-6 w-24" />

          {/* Informasi */}
          <div className="mt-10 grid grid-cols-1 gap-5 text-left md:grid-cols-2">
            <InfoCard label="Cita-cita" accent={isBoy} symbol="✦">
              {student.citaCita}
            </InfoCard>
            <InfoCard label="Kenangan" accent={isBoy} symbol="❝" italic>
              {student.kutipan}
            </InfoCard>
          </div>
        </article>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  symbol,
  accent,
  italic,
  children,
}: {
  label: string;
  symbol: string;
  accent: boolean;
  italic?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-brand-line bg-brand-canvas/50 p-6">
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg font-arabic text-brand-parchment ${
            accent ? "bg-brand-emerald" : "bg-brand-terra"
          }`}
        >
          {symbol}
        </span>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand-gold">
          {label}
        </p>
      </div>
      <p
        className={`leading-relaxed text-brand-ink ${
          italic ? "font-display text-lg italic" : "text-xl font-medium"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

// Menghasilkan rute statis saat build (Cloudflare Pages)
export function generateStaticParams() {
  return students.map((student) => ({
    id: student.id,
  }));
}
