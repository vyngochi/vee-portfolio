import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { InlineScript } from "@/components/layout/InlineScript";
import { Nav } from "@/components/layout/Nav";
import { themeScript } from "@/components/layout/theme-script";
import { ThemeSync } from "@/components/layout/ThemeSync";
import { MAIN_ID, TOP_ID } from "@/lib/sections";
import { localizedPath, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import "../globals.css";

// Cả ba font đều có subset "vietnamese" để hiển thị đúng dấu tiếng Việt.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  style: ["italic"],
  weight: ["400"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "vietnamese"],
});

// Dựng sẵn trang tĩnh cho mọi ngôn ngữ
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: localizedPath(locale, "/"),
      languages: Object.fromEntries(locales.map((l) => [l, localizedPath(l, "/")])),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();
  return (
    // suppressHydrationWarning: themeScript gắn class "dark" lên <html> trước khi React hydrate
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${manrope.variable} ${playfair.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body id={TOP_ID} className="min-h-full flex flex-col">
        <a
          href={`#${MAIN_ID}`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          {dict.nav.skipToContent}
        </a>
        <ThemeSync />
        <Nav />
        <main id={MAIN_ID} tabIndex={-1} className="flex flex-1 flex-col outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
