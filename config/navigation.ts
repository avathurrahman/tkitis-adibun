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
  { label: "Komponen UI", href: "/docs/components" },
  {
    label: "Halaman",
    children: [
      {
        group: "Tentang Starter Kit",
        items: [
          { label: "Use Cases", href: "/use-cases", description: "Cocok untuk SaaS, marketplace, agency, startup" },
          { label: "Perbandingan", href: "/compare", description: "KilatKoding vs setup manual & alternatif lain" },
          { label: "Blog", href: "/blog", description: "Tutorial dan artikel developer" },
          { label: "Changelog", href: "/changelog", description: "Riwayat pembaruan starter kit" },
          { label: "Tentang Kami", href: "/about", description: "Siapa kami dan stack yang dipakai" },
          { label: "Kontak", href: "/contact", description: "Hubungi tim kami" },
        ],
      },
      {
        group: "Template Termasuk",
        items: [
          { label: "Waitlist Page", href: "/waitlist", description: "Kumpulkan early access sebelum launch" },
          { label: "Checkout Page", href: "/checkout", description: "Halaman pembelian dengan Midtrans/Doku" },
          { label: "Afiliasi", href: "/affiliates", description: "Halaman program afiliasi untuk produkmu" },
          { label: "Open Startup", href: "/open", description: "Tampilkan metrik bisnis secara transparan" },
          { label: "Status Page", href: "/status", description: "Halaman uptime & insiden layanan" },
          { label: "Roadmap", href: "/roadmap", description: "Rencana pengembangan produkmu" },
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
