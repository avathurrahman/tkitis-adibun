import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="font-semibold text-sm">
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
