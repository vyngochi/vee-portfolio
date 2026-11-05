/**
 * Kiểu dữ liệu cho nội dung portfolio.
 * - Text cần dịch dùng Localized: { en: "...", vi: "..." }. Thiếu một ngôn ngữ là lỗi TypeScript.
 * - Tên riêng, link, ngày, tech stack: viết một lần, không dịch.
 * - Ngày tháng dạng "YYYY-MM" (ví dụ "2026-01"); end = null nghĩa là "đến nay".
 * Mọi thứ trong src/content/ đều hiển thị CÔNG KHAI trên website.
 */
import type { Localized } from "@/i18n/config";

export type { Localized };

export type YearMonth = `${number}-${string}`;

export interface SocialLink {
  label: string;
  href: string;
  /** Text hiển thị ngắn, ví dụ "github.com/vyngochi" */
  handle: string;
}

export interface Profile {
  name: string;
  /** Vai trò hiển thị ở hero, ví dụ "Frontend Developer" */
  role: Localized;
  /** Các mảng chuyên môn, hiển thị dạng nhãn nhỏ ở hero */
  focus: string[];
  summary: Localized;
  location?: Localized;
  /** Trạng thái nhận việc, hiển thị ở hero và footer */
  availability: Localized;
  email: string;
  socials: SocialLink[];
  /** Đường dẫn file CV công khai trong public/, ví dụ "/cv/ngo-chi-vy-cv.pdf" */
  cvUrl?: string;
}

export interface Experience {
  company: string;
  role: Localized;
  kind: "internship" | "startup" | "full-time" | "freelance";
  start: YearMonth;
  end: YearMonth | null;
  /** Tên dự án làm trong thời gian này */
  project?: string;
  summary: Localized;
  highlights: Localized[];
  stack: string[];
  /** Slug của dự án tương ứng trong projects.ts (nếu có) */
  projectSlug?: string;
}

export interface Education {
  school: string;
  degree: Localized;
  gpa?: Localized;
  expectedGraduation?: string;
}

export interface Activity {
  title: string;
  organizer?: string;
  date?: YearMonth;
  description: Localized;
}

export interface SkillGroup {
  label: Localized;
  items: string[];
}

export interface Project {
  /** Dùng cho URL và tên thư mục ảnh: public/images/projects/<slug>/ */
  slug: string;
  title: string;
  /** Một dòng mô tả ngắn, hiển thị dưới tên dự án */
  tagline: Localized;
  kind: "product" | "academic" | "internship" | "personal";
  start: YearMonth;
  end: YearMonth | null;
  role: Localized;
  team?: Localized;
  description: Localized;
  highlights: Localized[];
  stack: string[];
  links?: {
    github?: string;
    live?: string;
  };
  /** Ảnh cover, mặc định /images/projects/<slug>/cover.jpg khi đã có ảnh */
  cover?: string;
  /** Dự án nội bộ / NDA: không đưa screenshot hay link */
  confidential?: boolean;
  /** Hiện ở trang chủ */
  featured: boolean;
}
