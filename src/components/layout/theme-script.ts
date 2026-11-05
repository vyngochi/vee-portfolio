/**
 * Theme: lần đầu luôn là light; lựa chọn của người xem lưu ở localStorage["theme"].
 * Script này được chèn vào <head> của root layout và chạy đồng bộ TRƯỚC khi trình duyệt vẽ trang,
 * nên không bị chớp sai màu. Theo hướng dẫn "Preventing flash before hydration" của Next.js.
 * (Thay cho next-themes, vốn gây cảnh báo "Encountered a script tag" với React 19.)
 */
export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export const themeScript = `(function(){try{var d=localStorage.getItem("${THEME_STORAGE_KEY}")==="dark";var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

/** Áp theme lên <html> và lưu lựa chọn. Chỉ gọi ở client. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage có thể bị chặn (chế độ riêng tư): theme vẫn đổi, chỉ không được nhớ
  }
}
