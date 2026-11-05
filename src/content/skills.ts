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
    items: ["Git", "GitLab", "Jira", "Vercel", "Google Search Console"],
  },
];

export const softSkills: Localized[] = [
  { en: "Self-learning and quick to adapt to new technology", vi: "Tự học và thích nghi nhanh với công nghệ mới" },
  { en: "Teamwork", vi: "Làm việc nhóm" },
  { en: "Time management", vi: "Quản lý thời gian" },
];

export const languages: Localized[] = [
  {
    en: "English: good technical reading, basic verbal communication",
    vi: "Tiếng Anh: đọc tài liệu kỹ thuật tốt, giao tiếp cơ bản",
  },
];
