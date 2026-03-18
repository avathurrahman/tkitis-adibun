import type { Metadata } from "next";
import {
  Geist,
  IBM_Plex_Sans,
  JetBrains_Mono,
  Manrope,
  Playfair_Display,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { MarketingDesignProvider } from "@/components/marketing/design-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "./marketing.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  }),
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={[
          geistSans.className,
          geistSans.variable,
          ibmPlexSans.variable,
          jetBrainsMono.variable,
          manrope.variable,
          playfairDisplay.variable,
          sourceSerif.variable,
          spaceGrotesk.variable,
          "antialiased",
        ].join(" ")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MarketingDesignProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors closeButton />
          </MarketingDesignProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
