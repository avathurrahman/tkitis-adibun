import { CurrentYear } from "@/components/layout/current-year";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-16 px-4 text-sm text-muted-foreground">
        <p>
          &copy; <CurrentYear /> {siteConfig.name}
        </p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
