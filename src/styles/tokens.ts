/**
 * Bản JS của design token, cho những chỗ không đọc được CSS variable:
 * uniform của shader Three.js, easing của GSAP / Framer Motion.
 * Giữ đồng bộ với src/styles/tokens.css.
 */

export type ThemeName = "light" | "dark";

export const themeColors = {
  light: {
    background: "#f5f6fa",
    surface: "#ffffff",
    border: "#dfe3ec",
    foreground: "#0e1220",
    muted: "#5b6480",
    primary: "#ffa800",
    emphasis: "#e85d04",
    highlight: "#00796b",
    glow: "#1a5fe0",
    heroFrom: "#8fb4ff",
    heroVia: "#dce6fb",
    heroTo: "#f5f6fa",
  },
  dark: {
    background: "#0b0e17",
    surface: "#121725",
    border: "#222a3d",
    foreground: "#eef1f8",
    muted: "#8790a8",
    primary: "#ffa800",
    emphasis: "#ffa800",
    highlight: "#00ffe0",
    glow: "#1f6fff",
    heroFrom: "#0a3d8f",
    heroVia: "#06122e",
    heroTo: "#000000",
  },
} as const satisfies Record<ThemeName, Record<string, string>>;

/**
 * Bảng màu cho shader gradient ở hero, từ "nền" (c0) tới "điểm sáng nhất" (c3).
 * Light: sương trắng → xanh đậm dần; dark: đen → xanh phát sáng.
 * c0 trùng với --hero-to để mép shader hoà vào fallback CSS.
 */
export const heroShaderPalette = {
  light: { c0: "#f5f6fa", c1: "#c8d8fb", c2: "#7aa5f5", c3: "#2f66e0", grain: 0.05 },
  dark: { c0: "#000000", c1: "#061e57", c2: "#1a7af2", c3: "#6b94d1", grain: 0.09 },
} as const satisfies Record<ThemeName, { c0: string; c1: string; c2: string; c3: string; grain: number }>;

/** Bộ màu accent cho người xem tự đổi (widget design token trong bento). */
export const accentPresets = [
  { name: "Cam", value: "#ffa800" },
  { name: "Ngọc", value: "#00ffe0" },
  { name: "Hồng", value: "#ff5c7a" },
  { name: "Tím", value: "#b69cff" },
] as const;

/** Easing dạng mảng cubic-bezier, dùng trực tiếp với Framer Motion: transition={{ ease: ease.outExpo }} */
export const ease = {
  outExpo: [0.22, 1, 0.36, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

/** Easing dạng chuỗi cho GSAP: gsap.to(el, { ease: gsapEase.outExpo }) */
export const gsapEase = {
  outExpo: "expo.out",
  spring: "back.out(1.7)",
} as const;

/** Thời lượng chuẩn, đơn vị giây */
export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 1.1,
} as const;
