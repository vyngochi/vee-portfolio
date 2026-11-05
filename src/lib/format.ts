import type { Locale } from "@/i18n/config";
import type { YearMonth } from "@/content/types";

/** "2026-06" → "Jun 2026" (en) hoặc "06/2026" (vi) */
export function formatYearMonth(value: YearMonth, locale: Locale): string {
  const [year, month] = value.split("-");
  if (locale === "vi") return `${month}/${year}`;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

/** Khoảng thời gian: "Jun 2026 – Present" / "06/2026 – Hiện tại" */
export function formatPeriod(
  start: YearMonth,
  end: YearMonth | null,
  locale: Locale,
  presentLabel: string,
): string {
  return `${formatYearMonth(start, locale)} – ${end ? formatYearMonth(end, locale) : presentLabel}`;
}
