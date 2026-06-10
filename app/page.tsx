// Lokasi file: app/page.tsx
import Link from "next/link";
import MemoryGame from "@/components/MemoryGame";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
        {/* ===== HERO ===== */}
        <section className="relative text-center">
          {/* Watermark Arab yang mengambang di belakang */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-[55%] select-none font-arabic text-[14rem] leading-none text-brand-gold/10 animate-float-slow md:text-[20rem]"
          >
            أَدِيْب
          </span>

          {/* Kicker */}
          <p
            className="reveal text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-brand-emerald/80"
            style={{ animationDelay: "60ms" }}
          >
            TK IT Imam Syafi&apos;i &middot; Angkatan B4
          </p>

          {/* Judul */}
          <h1
            className="reveal mt-6 font-display text-6xl font-light leading-[0.95] tracking-tight text-brand-ink md:text-8xl"
            style={{ animationDelay: "140ms" }}
          >
            Kelas
            <br />
            <span className="italic text-brand-emerald">Adibun</span>
          </h1>

          {/* Aturan emas */}
          <div
            className="reveal gold-rule mx-auto mt-8 w-40 animate-shimmer"
            style={{ animationDelay: "260ms" }}
          />

          <p
            className="reveal mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-brand-muted md:text-xl"
            style={{ animationDelay: "340ms" }}
          >
            Sebuah monumen kenangan — merangkai memori, merajut ukhuwah dua
            belas anak yang tumbuh bersama dalam adab dan ilmu.
          </p>
        </section>

        {/* ===== FILOSOFI / MAKNA ===== */}
        <section
          className="reveal illuminated mt-20 rounded-[2rem] p-9 md:p-12"
          style={{ animationDelay: "120ms" }}
        >
          <div className="relative text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 right-0 select-none font-arabic text-7xl text-brand-gold/15 md:text-8xl"
            >
              أ
            </span>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-brand-gold">
              Makna di Balik Nama
            </p>
            <h2 className="mt-4 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 font-display text-3xl text-brand-ink md:text-4xl">
              <span>Adibun</span>
              <span className="font-arabic text-4xl text-brand-emerald md:text-5xl">
                أَدِيْبٌ
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brand-muted">
              Berakar dari kata <span className="text-brand-ink">&ldquo;Adab&rdquo;</span> —
              pribadi berpengetahuan luas, berakhlak mulia, santun, dan jujur.
              Sebuah harapan agar anak-anak tumbuh menjadi generasi sholeh dan
              sholehah yang berpegang teguh pada Al-Qur&apos;an dan Sunnah.
            </p>
          </div>
        </section>

        {/* ===== PERMAINAN HIJAIYAH (BLOK 4) ===== */}
        <section className="reveal mt-20" style={{ animationDelay: "120ms" }}>
          <MemoryGame />
        </section>

        {/* ===== PESAN PEMBIMBING ===== */}
        <section className="reveal relative mt-24 text-center" style={{ animationDelay: "120ms" }}>
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[10rem] leading-none text-brand-gold/15"
          >
            &ldquo;
          </span>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-brand-emerald/80">
            Pesan Pembimbing
          </p>
          <blockquote className="mx-auto mt-6 max-w-2xl font-display text-2xl font-light italic leading-snug text-brand-ink md:text-3xl">
            &ldquo;Semoga Allah Ta&apos;ala memberi kita kemudahan dalam mendidik
            anak menjadi sholeh dan sholehah, berakhlak dan beradab dengan ajaran
            salafus shaleh.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm font-medium text-brand-muted">
            <span>Ustadzah Nabiilah Husniyyah</span>
            <span className="h-1 w-1 rounded-full bg-brand-gold" />
            <span>Ustadzah Dian Ariestya</span>
          </div>
        </section>

        {/* ===== AJAKAN ===== */}
        <section className="reveal mt-20 text-center" style={{ animationDelay: "120ms" }}>
          <Link
            href="/profil"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-emerald px-9 py-4 font-semibold text-brand-parchment shadow-[0_18px_40px_-20px_rgba(20,59,46,0.8)] transition-all hover:bg-brand-emerald-deep hover:shadow-[0_22px_48px_-18px_rgba(20,59,46,0.9)] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-gold/40"
          >
            <span>Jumpai 12 Anak Adibun</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
