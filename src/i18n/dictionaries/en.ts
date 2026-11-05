/**
 * Chữ giao diện tiếng Anh (bản gốc). Thêm khoá ở đây thì phải thêm cả ở vi.ts, nếu không TypeScript báo lỗi.
 * Nội dung cá nhân (giới thiệu, dự án...) KHÔNG nằm ở đây mà ở src/content/.
 */
export const en = {
  meta: {
    title: "Ngo Chi Vy · Frontend Developer",
    description: "Frontend developer working with React, Next.js and Three.js. Selected projects, experience and contact.",
  },
  nav: {
    work: "Work",
    experience: "Experience",
    about: "About",
    contact: "Contact",
    skipToContent: "Skip to content",
  },
  theme: {
    toggle: "Toggle light / dark theme",
  },
  language: {
    label: "Language",
  },
  common: {
    present: "Present",
    viewProject: "View project",
    sourceCode: "Source code",
    liveSite: "Live site",
    confidential: "Internal project",
    downloadCv: "Download CV",
  },
  home: {
    building: "Under construction",
  },
} as const;

type DeepString<T> = { [K in keyof T]: T[K] extends string ? string : DeepString<T[K]> };
export type Dictionary = DeepString<typeof en>;
