import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Playfair_Display } from "next/font/google";
import { themeScript } from "@/components/layout/theme-script";
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
  return (
    // suppressHydrationWarning: themeScript gắn class "dark" lên <html> trước khi React hydrate
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${manrope.variable} ${playfair.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
