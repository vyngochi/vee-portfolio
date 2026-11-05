/**
 * Cấu hình ngôn ngữ. File này không phụ thuộc server, dùng được cả ở Client Component và proxy.
 *
 * URL:
 *   /            → tiếng Anh (mặc định, không có tiền tố)
 *   /vi          → tiếng Việt
 *   /en/...      → chuyển hướng về /... (giữ một URL duy nhất cho tiếng Anh)
 * Không tự đoán ngôn ngữ theo trình duyệt: ai mở / cũng thấy tiếng Anh.
 */

export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  vi: { short: "VI", name: "Tiếng Việt" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Bỏ tiền tố ngôn ngữ khỏi đường dẫn: "/vi/projects" → "/projects", "/vi" → "/" */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (hasLocale(segments[1] ?? "")) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname || "/";
}

/** Đường dẫn công khai cho một ngôn ngữ: ("vi", "/projects") → "/vi/projects", ("en", "/projects") → "/projects" */
export function localizedPath(locale: Locale, path: string = "/"): string {
  const clean = stripLocale(path.startsWith("/") ? path : `/${path}`);
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Kiểu cho một chuỗi có bản dịch ở mọi ngôn ngữ. Thiếu một ngôn ngữ là lỗi TypeScript. */
export type Localized<T = string> = Record<Locale, T>;

/** Lấy bản dịch theo ngôn ngữ */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
