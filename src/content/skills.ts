import type { Localized, SkillGroup } from "./types";

// Nguồn: mục Skills và các dự án trong docs/private/cv.pdf.
// Chỉ ghi kỹ năng có bằng chứng trong CV hoặc dự án. Thêm mục mới khi có dự án chứng minh.

export const skills: SkillGroup[] = [
  {
    label: { en: "Frontend", vi: "Frontend" },
    items: ["React", "TypeScript", "Next.js", "Three.js"],
  },
  {
    label: { en: "Backend & API", vi: "Backend & API" },
    items: ["Node.js", "RESTful API", "Swagger"],
  },
  {
    label: { en: "Tools & Delivery", vi: "Công cụ & triển khai" },
    items: ["Git", "GitLab", "ClickUp", "Vercel"],
  },
];

export const languages: Localized[] = [
  {
    en: "English: good technical reading, basic verbal communication",
    vi: "Tiếng Anh: đọc tài liệu kỹ thuật tốt, giao tiếp cơ bản",
  },
];
