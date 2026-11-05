"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme của trang: lần đầu luôn là light (không theo hệ điều hành),
 * lựa chọn của người xem được lưu trong localStorage và áp lại trước khi trang hiện, nên không bị chớp màu.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      themes={["light", "dark"]}
      storageKey="theme"
    >
      {children}
    </NextThemesProvider>
  );
}
