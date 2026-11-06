/**
 * Chữ giao diện tiếng Anh (bản gốc). Thêm khoá ở đây thì phải thêm cả ở vi.ts, nếu không TypeScript báo lỗi.
 * Nội dung cá nhân (giới thiệu, dự án...) KHÔNG nằm ở đây mà ở src/content/.
 * Tiêu đề section chia { lead, accent }: accent là cụm chữ nghiêng serif (text-serif-accent).
 */
export const en = {
  meta: {
    title: "Ngo Chi Vy · Frontend Developer",
    description:
      "Frontend developer working with React, Next.js and Three.js. Selected projects, experience and contact.",
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
  hero: {
    scroll: "Scroll to explore",
    portraitAlt: "Portrait of {name}",
  },
  bento: {
    about: { label: "About" },
    achievements: { label: "Achievements" },
    stack: { label: "Tech stack" },
    education: {
      label: "Education",
      gpa: "GPA",
      graduation: "Expected graduation",
      languages: "Languages",
    },
    now: { label: "Currently", since: "Since" },
  },
  sections: {
    about: { lead: "A little", accent: "about me" },
    work: { lead: "My", accent: "projects" },
    experience: { lead: "Where I've", accent: "worked" },
    contact: { lead: "Let's build something", accent: "together" },
    placeholder: "Coming soon",
  },
  projects: {
    kind: {
      product: "Product",
      academic: "Academic project",
      internship: "Internship",
      personal: "Personal project",
    },
    role: "Role",
    period: "Period",
    team: "Team",
    highlights: "Highlights",
    browserLabel: "Project preview",
    placeholder: "Placeholder",
    waitingFor: "Waiting for",
    loadLive: "Load live preview",
    openLive: "Open in a new tab",
    closeLive: "Back to preview",
    previewAlt: "Preview of {title}",
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

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};
export type Dictionary = DeepString<typeof en>;
