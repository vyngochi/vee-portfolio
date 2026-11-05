/**
 * Theme: lần đầu luôn là light; lựa chọn của người xem lưu ở localStorage["theme"].
 * themeScript được chèn vào <head> của root layout và chạy đồng bộ TRƯỚC khi trình duyệt vẽ trang,
 * nên không bị chớp sai màu. Theo hướng dẫn "Preventing flash before hydration" của Next.js.
 * (Thay cho next-themes, vốn gây cảnh báo "Encountered a script tag" với React 19.)
 */
export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export const themeScript = `(function(){try{var d=localStorage.getItem("${THEME_STORAGE_KEY}")==="dark";var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

/** Đọc lựa chọn đã lưu; không có hoặc không đọc được thì là light. Chỉ gọi ở client. */
export function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

/** Chỉ gắn class lên <html>, không lưu. Chỉ gọi ở client. */
export function setThemeClass(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

/** Áp theme lên <html> và lưu lựa chọn. Chỉ gọi ở client. */
export function applyTheme(theme: Theme) {
  setThemeClass(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage có thể bị chặn (chế độ riêng tư): theme vẫn đổi, chỉ không được nhớ
  }
}
