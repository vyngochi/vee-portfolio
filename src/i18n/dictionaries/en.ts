/**
 * Chữ giao diện tiếng Anh (bản gốc). Thêm khoá ở đây thì phải thêm cả ở vi.ts, nếu không TypeScript báo lỗi.
 * Nội dung cá nhân (giới thiệu, dự án...) KHÔNG nằm ở đây mà ở src/content/.
 * Tiêu đề section chia { lead, accent }: accent là cụm chữ nghiêng serif (text-serif-accent).
 */
export const en = {
  meta: {
    title: "Ngo Chi Vy · Frontend Developer",
    description: "Frontend developer working with React, Next.js and Three.js. Selected projects, experience and contact.",
  },
  nav: {
    label: "Main navigation",
    home: "Home",
    about: "About",
    work: "Work",
    experience: "Experience",
    contact: "Contact",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
  },
  theme: {
    toggle: "Toggle light / dark theme",
  },
  language: {
    label: "Language",
  },
  sections: {
    about: { lead: "A little", accent: "about me" },
    work: { lead: "Selected", accent: "work" },
    experience: { lead: "Where I've", accent: "worked" },
    contact: { lead: "Let's build something", accent: "together" },
    placeholder: "Coming soon",
  },
  footer: {
    getInTouch: "Get in touch",
    elsewhere: "Elsewhere",
    backToTop: "Back to top",
    rights: "All rights reserved.",
    builtWith: "Built with Next.js, Tailwind CSS and a bit of WebGL.",
  },
  notFound: {
    title: "Page not found",
    accent: "lost",
    lead: "Looks like this page got",
    description: "The page you are looking for doesn't exist or has moved.",
    backHome: "Back to home",
  },
  common: {
    present: "Present",
    viewProject: "View project",
    sourceCode: "Source code",
    liveSite: "Live site",
    confidential: "Internal project",
    downloadCv: "Download CV",
    opensInNewTab: "(opens in a new tab)",
  },
} as const;

type DeepString<T> = { [K in keyof T]: T[K] extends string ? string : DeepString<T[K]> };
export type Dictionary = DeepString<typeof en>;
