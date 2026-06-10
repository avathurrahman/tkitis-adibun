// Lokasi file: components/MemoryGame.tsx
// BLOK 4 — Permainan "Memory Match" Huruf Hijaiyah.
// Aturan visual BLOK 2 dipatuhi: tanpa wajah/makhluk hidup, hanya huruf & bentuk geometris.
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// Kumpulan huruf hijaiyah beserta nama bacaannya.
// Tiap permainan mengambil 6 huruf acak dari kolam ini agar selalu terasa baru.
type Hijaiyah = { id: string; char: string; nama: string };

const HIJAIYAH: Hijaiyah[] = [
  { id: "alif", char: "ا", nama: "Alif" },
  { id: "ba", char: "ب", nama: "Ba" },
  { id: "ta", char: "ت", nama: "Ta" },
  { id: "tsa", char: "ث", nama: "Tsa" },
  { id: "jim", char: "ج", nama: "Jim" },
  { id: "ha", char: "ح", nama: "Ha" },
  { id: "kha", char: "خ", nama: "Kha" },
  { id: "dal", char: "د", nama: "Dal" },
  { id: "ra", char: "ر", nama: "Ra" },
  { id: "zay", char: "ز", nama: "Zay" },
  { id: "sin", char: "س", nama: "Sin" },
  { id: "syin", char: "ش", nama: "Syin" },
  { id: "shad", char: "ص", nama: "Shad" },
  { id: "ain", char: "ع", nama: "'Ain" },
  { id: "mim", char: "م", nama: "Mim" },
  { id: "nun", char: "ن", nama: "Nun" },
  { id: "wau", char: "و", nama: "Wau" },
  { id: "ya", char: "ي", nama: "Ya" },
];

const PAIR_COUNT = 6; // 6 pasang = 12 kartu (selaras dengan 12 anak Adibun)

type Card = {
  uid: number; // unik per kartu
  letterId: string; // sama untuk sepasang kartu
  char: string;
  nama: string;
};

// Acak urutan array (Fisher-Yates) tanpa mengubah array asli.
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Bangun satu set kartu baru: pilih huruf acak, gandakan, lalu kocok.
function buildDeck(): Card[] {
  const picked = shuffle(HIJAIYAH).slice(0, PAIR_COUNT);
  const deck = picked.flatMap((h, index) => [
    { uid: index * 2, letterId: h.id, char: h.char, nama: h.nama },
    { uid: index * 2 + 1, letterId: h.id, char: h.char, nama: h.nama },
  ]);
  return shuffle(deck);
}

export default function MemoryGame() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]); // uid kartu yang sedang terbuka
  const [matched, setMatched] = useState<string[]>([]); // letterId yang sudah cocok
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false); // kunci klik saat dua kartu sedang dibandingkan

  // Bangun dek pertama kali di klien (hindari mismatch hydrasi karena pengacakan).
  useEffect(() => {
    setDeck(buildDeck());
  }, []);

  const resetGame = useCallback(() => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLocked(false);
  }, []);

  const isWon = deck.length > 0 && matched.length === PAIR_COUNT;

  const handleFlip = useCallback(
    (card: Card) => {
      if (locked) return;
      if (flipped.includes(card.uid)) return;
      if (matched.includes(card.letterId)) return;
      if (flipped.length === 2) return;

      const next = [...flipped, card.uid];
      setFlipped(next);

      if (next.length === 2) {
        setMoves((m) => m + 1);
        setLocked(true);

        const [a, b] = next.map((uid) => deck.find((c) => c.uid === uid)!);
        if (a.letterId === b.letterId) {
          // Cocok — tandai sebagai matched lalu buka lagi untuk giliran berikutnya.
          setMatched((prev) => [...prev, a.letterId]);
          window.setTimeout(() => {
            setFlipped([]);
            setLocked(false);
          }, 450);
        } else {
          // Tidak cocok — tutup kembali setelah jeda agar anak sempat mengingat.
          window.setTimeout(() => {
            setFlipped([]);
            setLocked(false);
          }, 900);
        }
      }
    },
    [deck, flipped, locked, matched]
  );

  const progress = useMemo(
    () => Math.round((matched.length / PAIR_COUNT) * 100),
    [matched.length]
  );

  return (
    <section className="illuminated rounded-[2rem] p-6 md:p-10">
      {/* Judul & info */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-left">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-brand-gold">
            Permainan Kenangan
          </p>
          <h3 className="mt-2 font-display text-2xl text-brand-ink md:text-3xl">
            Tebak Pasangan Hijaiyah
          </h3>
          <p className="mt-1 text-brand-muted">
            Buka dua kartu, temukan huruf yang sama. Yuk asah ingatan!
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <span className="rounded-full border border-brand-line bg-brand-canvas/60 px-3 py-1.5 text-brand-muted">
            Langkah <span className="text-brand-emerald">{moves}</span>
          </span>
          <span className="rounded-full border border-brand-line bg-brand-canvas/60 px-3 py-1.5 text-brand-muted">
            Cocok{" "}
            <span className="text-brand-emerald">
              {matched.length}/{PAIR_COUNT}
            </span>
          </span>
        </div>
      </div>

      {/* Bar progres */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-brand-line/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-emerald to-brand-gold transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Papan kartu */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
        {deck.map((card) => {
          const isFaceUp =
            flipped.includes(card.uid) || matched.includes(card.letterId);
          const isMatched = matched.includes(card.letterId);

          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => handleFlip(card)}
              aria-label={isFaceUp ? `Huruf ${card.nama}` : "Kartu tertutup"}
              disabled={isFaceUp || locked}
              className={cn(
                "perspective aspect-square w-full rounded-2xl transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-gold/40",
                !isFaceUp && "cursor-pointer hover:scale-[1.03]",
                isMatched && "animate-card-pop"
              )}
            >
              <div
                className={cn(
                  "preserve-3d relative h-full w-full transition-transform duration-500",
                  isFaceUp && "rotate-y-180"
                )}
              >
                {/* Sisi belakang (tertutup) — ornamen geometris, sesuai BLOK 2 */}
                <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-emerald to-brand-emerald-deep shadow-sm">
                  <div className="flex h-1/2 w-1/2 rotate-45 items-center justify-center rounded-lg border border-brand-gold/50">
                    <span className="-rotate-45 font-arabic text-2xl text-brand-gold/80">
                      ✦
                    </span>
                  </div>
                </div>

                {/* Sisi depan (terbuka) — huruf hijaiyah + nama */}
                <div
                  className={cn(
                    "backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border shadow-sm",
                    isMatched
                      ? "border-brand-emerald/40 bg-brand-emerald/10"
                      : "border-brand-line bg-brand-parchment"
                  )}
                >
                  <span
                    className={cn(
                      "font-arabic text-4xl leading-none sm:text-5xl",
                      isMatched ? "text-brand-emerald" : "text-brand-ink"
                    )}
                  >
                    {card.char}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-muted/70 sm:text-xs">
                    {card.nama}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pesan menang & tombol main lagi */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        {isWon ? (
          <p className="animate-card-pop font-display text-lg italic text-brand-emerald">
            Masya Allah — selesai dalam {moves} langkah!
          </p>
        ) : (
          <p className="text-sm text-brand-muted/80">
            Klik kartu untuk mulai bermain.
          </p>
        )}
        <button
          type="button"
          onClick={resetGame}
          className="inline-flex items-center justify-center rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold text-brand-parchment transition-all hover:bg-brand-emerald-deep hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-gold/40"
        >
          {isWon ? "Main Lagi" : "Acak Ulang Kartu"}
        </button>
      </div>
    </section>
  );
}
