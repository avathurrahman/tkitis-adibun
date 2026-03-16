import Link from "next/link";
import { CurrentYear } from "@/components/layout/current-year";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/config/site";
import { Github, Twitter } from "lucide-react";

const footerLinks = {
  Produk: [
    { label: "Fitur", href: "/#features" },
    { label: "Harga", href: "/#pricing" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Perbandingan", href: "/compare" },
    { label: "Komponen UI", href: "/docs/components" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Status", href: "/status" },
  ],
  Sumber: [
    { label: "Blog", href: "/blog" },
    { label: "Open Startup", href: "/open" },
    { label: "Afiliasi", href: "/affiliates" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ],
  Legal: [
    { label: "Syarat & Ketentuan", href: "/terms" },
    { label: "Kebijakan Privasi", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <Link href="/" className="font-bold text-base">
              {siteConfig.name}
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Boilerplate Next.js untuk developer Indonesia. Ship lebih cepat.
            </p>
            <div className="flex gap-3 pt-1">
              <Link
                href="https://twitter.com/galpratama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/galpratama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide">
                {category}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            &copy; <CurrentYear /> {siteConfig.name} — Dibangun untuk developer Indonesia
          </p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
