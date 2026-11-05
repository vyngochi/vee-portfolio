"use client";

import { useLayoutEffect } from "react";
import { readStoredTheme, setThemeClass } from "./theme-script";

/**
 * Gắn lại class theme sau khi React dựng cây phía client.
 * Bình thường script trong <head> đã làm việc này trước khi trang hiện. Nhưng có trường hợp
 * (ví dụ trang 404) React dựng lại <html> phía client và ghi đè className, làm mất class "dark".
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    setThemeClass(readStoredTheme());
  }, []);
  return null;
}
