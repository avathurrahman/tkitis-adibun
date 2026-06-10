// file: data/adibun.ts
// Lokasi: Letakan di folder root proyek (sejajar dengan folder 'app')

export type Student = {
  id: string; // Digunakan untuk URL dinamis: /profil/nama-anak
  namaPanggilan: string;
  namaLengkap: string;
  gender: "L" | "P";
  citaCita: string;
  kutipan: string; // Kutipan unik atau pesan kenangan singkat
  isAnakUser?: boolean; // Tanda khusus untuk Hilma
};

// Data ke-12 anak yang diekstraksi dari image_0.png
// Tolong lengkapi ... dengan detail masing-masing anak
export const students: Student[] = [
  // --- ANAK LAKI-LAKI (Sholeh) ---
  {
    id: "abbas",
    namaPanggilan: "Abbas",
    namaLengkap: "Abbas ...",
    gender: "L",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "syafiq",
    namaPanggilan: "Syafiq",
    namaLengkap: "Syafiq ...",
    gender: "L",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "dirandra",
    namaPanggilan: "Dirandra",
    namaLengkap: "Dirandra ...",
    gender: "L",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "emir",
    namaPanggilan: "Emir",
    namaLengkap: "Emir ...",
    gender: "L",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "adzriel",
    namaPanggilan: "Adzriel",
    namaLengkap: "Adzriel ...",
    gender: "L",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "haidar",
    namaPanggilan: "Haidar",
    namaLengkap: "Haidar ...",
    gender: "L",
    citaCita: "...",
    kutipan: "..."
  },

  // --- ANAK PEREMPUAN (Sholehah) ---
  {
    id: "farisha",
    namaPanggilan: "Farisha",
    namaLengkap: "Farisha ...",
    gender: "P",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "nisa",
    namaPanggilan: "Nisa",
    namaLengkap: "Nisa ...",
    gender: "P",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "hafsah",
    namaPanggilan: "Hafsah",
    namaLengkap: "Hafsah ...",
    gender: "P",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "audy",
    namaPanggilan: "Audy",
    namaLengkap: "Audy ...",
    gender: "P",
    citaCita: "...",
    kutipan: "..."
  },
  {
    id: "hilma",
    namaPanggilan: "Hilma",
    namaLengkap: "Hilma ...", // LENGKAPI DETAIL HILMA DENGAN SEGERA
    gender: "P",
    citaCita: "...",
    kutipan: "...",
    isAnakUser: true // Tanda anak pengguna
  },
  {
    id: "fidzah",
    namaPanggilan: "Fidzah",
    namaLengkap: "Fidzah ...",
    gender: "P",
    citaCita: "...",
    kutipan: "..."
  }
];