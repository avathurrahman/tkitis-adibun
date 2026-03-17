export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavSection = {
  group: string;
  items: NavItem[];
};

export type NavGroup = {
  label: string;
  children: NavSection[];
};

export type NavEntry = NavItem | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

const exploreSections: NavSection[] = [
  {
    group: "Produk & Demo",
    items: [
      {
        label: "Use Cases",
        href: "/use-cases",
        description: "Galeri ide produk yang cocok memakai starter ini",
      },
      {
        label: "Perbandingan",
        href: "/compare",
        description: "Bandingkan KilatKoding dengan setup manual dan alternatif",
      },
      {
        label: "Komponen UI",
        href: "/docs/components",
        description: "Lihat semua komponen UI yang sudah siap dipakai",
      },
      {
        label: "Checkout",
        href: "/checkout",
        description: "Contoh halaman pembelian dengan Midtrans dan Doku",
      },
    ],
  },
  {
    group: "Growth & Launch",
    items: [
      {
        label: "Waitlist",
        href: "/waitlist",
        description: "Kumpulkan pendaftar sebelum produk resmi diluncurkan",
      },
      {
        label: "Afiliasi",
        href: "/affiliates",
        description: "Template halaman program referral dan partner",
      },
    ],
  },
];

const updateSections: NavSection[] = [
  {
    group: "Konten & Update",
    items: [
      {
        label: "Blog",
        href: "/blog",
        description: "Artikel, tutorial, dan insight untuk developer",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "Riwayat pembaruan produk dan starter kit",
      },
      {
        label: "Roadmap",
        href: "/roadmap",
        description: "Fitur yang sedang dibangun dan direncanakan",
      },
    ],
  },
  {
    group: "Transparansi & Support",
    items: [
      {
        label: "Open Startup",
        href: "/open",
        description: "Tampilkan metrik dan performa bisnis secara terbuka",
      },
      {
        label: "Status",
        href: "/status",
        description: "Halaman status layanan dan riwayat insiden",
      },
      {
        label: "Kontak",
        href: "/contact",
        description: "Hubungi tim untuk pertanyaan, demo, atau kerja sama",
      },
    ],
  },
  {
    group: "Perusahaan & Legal",
    items: [
      {
        label: "Tentang",
        href: "/about",
        description: "Cerita produk, stack, dan siapa di balik KilatKoding",
      },
      {
        label: "Privasi",
        href: "/privacy",
        description: "Kebijakan privasi penggunaan produk dan data",
      },
      {
        label: "Syarat",
        href: "/terms",
        description: "Syarat dan ketentuan penggunaan layanan",
      },
    ],
  },
];

const authSections: NavSection[] = [
  {
    group: "Masuk & Daftar",
    items: [
      {
        label: "Masuk",
        href: "/auth/login",
        description: "Halaman login email, Google OAuth, dan Magic Link",
      },
      {
        label: "Daftar",
        href: "/auth/sign-up",
        description: "Template registrasi akun baru",
      },
      {
        label: "Daftar Berhasil",
        href: "/auth/sign-up-success",
        description: "Konfirmasi setelah pendaftaran berhasil dikirim",
      },
    ],
  },
  {
    group: "Verifikasi & Recovery",
    items: [
      {
        label: "Verifikasi Email",
        href: "/auth/verify-email",
        description: "Instruksi verifikasi email setelah registrasi",
      },
      {
        label: "Lupa Password",
        href: "/auth/forgot-password",
        description: "Minta link reset password",
      },
      {
        label: "Ubah Password",
        href: "/auth/update-password",
        description: "Halaman setel ulang password baru",
      },
      {
        label: "Auth Error",
        href: "/auth/error",
        description: "Tampilan fallback ketika proses auth gagal",
      },
    ],
  },
];

const workspaceSections: NavSection[] = [
  {
    group: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        description: "Ringkasan akun, aktivitas, dan penggunaan produk",
      },
      {
        label: "Billing",
        href: "/dashboard/billing",
        description: "Pilih paket dan mulai alur pembayaran",
      },
      {
        label: "Pengaturan",
        href: "/dashboard/settings",
        description: "Kelola profil akun dan password",
      },
      {
        label: "Component Showcase",
        href: "/dashboard/components",
        description: "Showcase halaman dashboard dan admin yang lengkap",
      },
    ],
  },
  {
    group: "Admin",
    items: [
      {
        label: "Admin Dashboard",
        href: "/admin",
        description: "Statistik pembayaran dan langganan untuk admin",
      },
    ],
  },
];

export const marketingNav: NavEntry[] = [
  {
    label: "Fitur",
    href: "/#features",
    description: "Lompat ke section fitur utama di landing page",
  },
  {
    label: "Harga",
    href: "/#pricing",
    description: "Lompat ke section pricing di landing page",
  },
  {
    label: "Jelajahi",
    children: exploreSections,
  },
  {
    label: "Update",
    children: updateSections,
  },
  {
    label: "Akun",
    children: [...authSections, ...workspaceSections],
  },
];

export const dashboardNav: NavEntry[] = [
  {
    label: "Workspace",
    children: workspaceSections,
  },
  {
    label: "Jelajahi",
    children: exploreSections,
  },
  {
    label: "Update",
    children: updateSections,
  },
  {
    label: "Akun",
    children: authSections,
  },
];
