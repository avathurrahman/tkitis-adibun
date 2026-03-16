"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { isNavGroup, type NavEntry } from "@/config/navigation";

export function DesktopNav({ entries }: { entries: NavEntry[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {entries.map((entry) => {
          if (isNavGroup(entry)) {
            return (
              <NavigationMenuItem key={entry.label}>
                <NavigationMenuTrigger className="text-sm text-muted-foreground">
                  {entry.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[580px] grid grid-cols-3 gap-6">
                    {entry.children.map((group) => (
                      <div key={group.group} className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-1">
                          {group.group}
                        </p>
                        <ul className="space-y-1">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    "block rounded-md p-2 text-sm leading-tight transition-colors",
                                    "hover:bg-accent hover:text-accent-foreground"
                                  )}
                                >
                                  <span className="font-medium block">{item.label}</span>
                                  {item.description && (
                                    <span className="text-xs text-muted-foreground line-clamp-1">
                                      {item.description}
                                    </span>
                                  )}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={entry.href}>
              <NavigationMenuLink asChild>
                <Link href={entry.href} className={navigationMenuTriggerStyle()}>
                  <span className="text-sm text-muted-foreground">{entry.label}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
