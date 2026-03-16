export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  children: { group: string; items: NavItem[] }[];
};

export type NavEntry = NavItem | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

export const marketingNav: NavEntry[] = [
  { label: "Fitur", href: "/#features" },
  { label: "Harga", href: "/#pricing" },
  {
    label: "Halaman",
    children: [
      {
        group: "Produk",
        items: [
          { label: "Use Cases", href: "/use-cases", description: "SaaS, marketplace, agency, startup" },
          { label: "Perbandingan", href: "/compare", description: "KilatKoding vs alternatif lain" },
          { label: "Komponen UI", href: "/docs/components", description: "43 komponen shadcn/ui siap pakai" },
          { label: "Roadmap", href: "/roadmap", description: "Apa yang sedang & akan kami bangun" },
          { label: "Status", href: "/status", description: "Uptime dan insiden layanan" },
          { label: "Changelog", href: "/changelog", description: "Riwayat pembaruan" },
        ],
      },
      {
        group: "Sumber",
        items: [
          { label: "Blog", href: "/blog", description: "Tutorial dan artikel developer" },
          { label: "Open Startup", href: "/open", description: "Metrik bisnis secara transparan" },
          { label: "Afiliasi", href: "/affiliates", description: "Komisi 30% untuk setiap referral" },
          { label: "Tentang Kami", href: "/about", description: "Siapa kami dan stack yang dipakai" },
          { label: "Kontak", href: "/contact", description: "Hubungi tim kami" },
        ],
      },
      {
        group: "Mulai",
        items: [
          { label: "Waitlist", href: "/waitlist", description: "Daftar dan dapat early bird 30%" },
          { label: "Checkout", href: "/checkout", description: "Beli KilatKoding sekarang" },
        ],
      },
    ],
  },
];

export const dashboardNav: NavEntry[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Pengaturan", href: "/dashboard/settings" },
  { label: "Billing", href: "/dashboard/billing" },
];
