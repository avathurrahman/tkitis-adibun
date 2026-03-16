import Link from "next/link";
import { Suspense } from "react";
import { Menu } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/config/site";
import { marketingNav, dashboardNav } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type HeaderVariant = "marketing" | "dashboard";

const navLinks: Record<HeaderVariant, { label: string; href: string }[]> = {
  marketing: marketingNav,
  dashboard: dashboardNav,
};

export function Header({ variant = "marketing" }: { variant?: HeaderVariant }) {
  const links = navLinks[variant];

  return (
    <header className="w-full border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-sm">
            {siteConfig.name}
          </Link>
          {links.length > 0 && (
            <nav className="hidden md:flex items-center gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <div className="hidden md:block">
            <Suspense>
              <AuthButton />
            </Suspense>
          </div>

          {/* Mobile nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {links.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="justify-start"
                    asChild
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
                {links.length > 0 && <Separator className="my-3" />}
                <Suspense>
                  <AuthButton />
                </Suspense>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
