"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { localeLabels, localizedPath, locales, type Locale } from "@/i18n/config";

/**
 * Nút EN / VI. Chuyển sang cùng trang ở ngôn ngữ kia, giữ nguyên vị trí cuộn.
 * Ngôn ngữ hiện tại do Server Component truyền vào (không đoán từ URL để tránh lệch khi proxy rewrite).
 */
export function LanguageSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      aria-label={label}
      className={cn(
        "inline-flex h-10 items-center rounded-full border border-border bg-card p-1 font-mono text-xs",
        className,
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={localizedPath(l, pathname)}
            hrefLang={l}
            lang={l}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex h-full items-center rounded-full px-3 transition-colors duration-300 ease-out-expo",
              active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {localeLabels[l].short}
            <span className="sr-only"> ({localeLabels[l].name})</span>
          </Link>
        );
      })}
    </nav>
  );
}
