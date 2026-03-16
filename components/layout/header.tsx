import Link from "next/link";
import { Suspense } from "react";
import { Menu } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/config/site";
import { marketingNav, dashboardNav, isNavGroup, type NavEntry } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DesktopNav } from "@/components/layout/desktop-nav";

type HeaderVariant = "marketing" | "dashboard";

const navEntries: Record<HeaderVariant, NavEntry[]> = {
  marketing: marketingNav,
  dashboard: dashboardNav,
};

export function Header({ variant = "marketing" }: { variant?: HeaderVariant }) {
  const entries = navEntries[variant];

  return (
    <header className="w-full border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-sm mr-2">
            {siteConfig.name}
          </Link>
          <div className="hidden md:flex">
            <DesktopNav entries={entries} />
          </div>
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
            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="px-4 pt-4 pb-2">
                <SheetTitle className="text-left">{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)]">
                <div className="px-2 pb-6 space-y-1">
                  {entries.map((entry) => {
                    if (isNavGroup(entry)) {
                      return (
                        <div key={entry.label} className="space-y-1 pt-2">
                          {entry.children.map((group) => (
                            <div key={group.group} className="space-y-0.5">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-3 pt-3 pb-1">
                                {group.group}
                              </p>
                              {group.items.map((item) => (
                                <Button
                                  key={item.href}
                                  variant="ghost"
                                  className="w-full justify-start h-auto py-2 px-3"
                                  asChild
                                >
                                  <Link href={item.href}>
                                    <span className="text-sm">{item.label}</span>
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <Button
                        key={entry.href}
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href={entry.href}>{entry.label}</Link>
                      </Button>
                    );
                  })}
                  <Separator className="my-3" />
                  <div className="px-1">
                    <Suspense>
                      <AuthButton />
                    </Suspense>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
