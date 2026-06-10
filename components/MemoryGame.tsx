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
    <section className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
      {/* Judul & info */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div className="text-left">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Tebak Pasangan Huruf Hijaiyah
          </h3>
          <p className="text-slate-500 mt-1">
            Buka dua kartu, temukan huruf yang sama. Yuk asah ingatan! ✦
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
          <span className="px-3 py-1.5 rounded-full bg-slate-100">
            Langkah: <span className="text-teal-600">{moves}</span>
          </span>
          <span className="px-3 py-1.5 rounded-full bg-slate-100">
            Cocok: <span className="text-emerald-600">{matched.length}/{PAIR_COUNT}</span>
          </span>
        </div>
      </div>

      {/* Bar progres */}
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mb-6">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Papan kartu */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
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
                "perspective aspect-square w-full rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-200 transition-transform",
                !isFaceUp && "hover:scale-[1.03] cursor-pointer",
                isMatched && "animate-card-pop"
              )}
            >
              <div
                className={cn(
                  "relative h-full w-full preserve-3d transition-transform duration-500",
                  isFaceUp && "rotate-y-180"
                )}
              >
                {/* Sisi belakang (tertutup) — bentuk geometris, sesuai BLOK 2 */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm">
                  <div className="w-1/2 h-1/2 rounded-xl border-2 border-white/40 rotate-45 flex items-center justify-center">
                    <span className="-rotate-45 text-white/80 text-2xl font-serif">
                      ✦
                    </span>
                  </div>
                </div>

                {/* Sisi depan (terbuka) — huruf hijaiyah + nama */}
                <div
                  className={cn(
                    "absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 shadow-sm",
                    isMatched
                      ? "bg-emerald-50 border-emerald-300"
                      : "bg-white border-slate-200"
                  )}
                >
                  <span
                    className={cn(
                      "font-serif leading-none text-4xl sm:text-5xl",
                      isMatched ? "text-emerald-700" : "text-slate-800"
                    )}
                  >
                    {card.char}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {card.nama}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pesan menang & tombol main lagi */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {isWon ? (
          <p className="text-lg font-bold text-emerald-600 animate-card-pop">
            🎉 Masya Allah, semua pasangan ketemu dalam {moves} langkah!
          </p>
        ) : (
          <p className="text-sm text-slate-400">
            Klik kartu untuk mulai bermain.
          </p>
        )}
        <button
          type="button"
          onClick={resetGame}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all bg-teal-600 rounded-full hover:bg-teal-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-200"
        >
          {isWon ? "Main Lagi" : "Acak Ulang Kartu"}
        </button>
      </div>
    </section>
  );
}
