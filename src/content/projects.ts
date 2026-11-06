import type { Project } from "./types";

// Nguồn: docs/private/cv.pdf. Thứ tự trong mảng = thứ tự hiển thị.
// Ảnh: public/images/projects/<slug>/cover.jpg (xem docs/IMAGES.md). Thêm "cover" khi đã có ảnh.

export const projects: Project[] = [
  {
    slug: "beewise",
    title: "BeeWise",
    tagline: {
      en: "AI tutor matching and learning management platform",
      vi: "Nền tảng kết nối gia sư bằng AI và quản lý học tập",
    },
    kind: "product",
    start: "2026-06",
    end: null,
    role: {
      en: "Frontend Developer (frontend owner)",
      vi: "Frontend Developer (phụ trách chính frontend)",
    },
    description: {
      en: "BeeWise helps learners find tutors through AI matching. Its SuperLMS portal gives tutors and students AI tools to manage schedules, generate assignments and learn with the Feynman method.",
      vi: "BeeWise giúp học viên tìm gia sư phù hợp bằng AI. Cổng SuperLMS cung cấp cho gia sư và học viên các công cụ AI để quản lý lịch, tạo bài tập và học theo phương pháp Feynman.",
    },
    highlights: [
      {
        en: "Owned the frontend and worked directly with founders, back-end and design.",
        vi: "Phụ trách frontend, làm việc trực tiếp với founder, back-end và designer.",
      },
      {
        en: "Shipped on Vercel with a custom domain and improved SEO with Google Search Console and Bing Webmaster Tools.",
        vi: "Deploy trên Vercel với tên miền riêng, cải thiện SEO bằng Google Search Console và Bing Webmaster Tools.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Vercel"],
    // links: { live: "" }, // thêm link sản phẩm nếu được công khai
    featured: true,
  },
  {
    slug: "evcare",
    title: "EVCare",
    tagline: {
      en: "Electric vehicle service management with 3D vehicle status",
      vi: "Quản lý bảo dưỡng xe điện, hiển thị trạng thái xe bằng 3D",
    },
    kind: "academic",
    start: "2025-09",
    end: "2025-11",
    role: { en: "Frontend Lead", vi: "Trưởng nhóm Frontend" },
    team: { en: "Team of 4, 9 weeks", vi: "Nhóm 4 người, 9 tuần" },
    description: {
      en: "A maintenance management system for EV owners and service centers: booking appointments, tracking service progress and assigning tasks.",
      vi: "Hệ thống quản lý bảo dưỡng cho chủ xe điện và trung tâm dịch vụ: đặt lịch, theo dõi tiến độ và phân công công việc.",
    },
    highlights: [
      {
        en: "Led the frontend: defined project structure, development workflow and coding conventions with the back-end team and mentor.",
        vi: "Dẫn dắt frontend: cùng đội back-end và mentor xác định cấu trúc dự án, quy trình phát triển và quy ước code.",
      },
      {
        en: "Built a 3D vehicle status visualization with Three.js.",
        vi: "Xây dựng tính năng hiển thị trạng thái xe bằng mô hình 3D với Three.js.",
      },
      {
        en: "Designed and implemented the UI and core features, integrated with RESTful APIs documented in Swagger.",
        vi: "Thiết kế và hiện thực giao diện cùng các tính năng chính, tích hợp RESTful API có tài liệu Swagger.",
      },
    ],
    stack: ["React", "TypeScript", "Three.js", "REST API", "Swagger"],
    links: { github: "https://github.com/vyngochi/EVCare-SWP-Project" },
    featured: true,
  },
  {
    slug: "hito-compass",
    title: "Casio Hito Compass",
    tagline: {
      en: "HR management system for the Japanese market",
      vi: "Hệ thống quản lý nhân sự cho thị trường Nhật Bản",
    },
    kind: "internship",
    start: "2026-01",
    end: "2026-04",
    role: {
      en: "Frontend Intern Developer at FPT Software",
      vi: "Thực tập sinh Frontend tại FPT Software",
    },
    description: {
      en: "An internal HR management system. During my internship I maintained the UI, fixed bugs and improved small features.",
      vi: "Hệ thống quản lý nhân sự nội bộ. Trong thời gian thực tập, mình bảo trì giao diện, sửa lỗi và cải thiện các tính năng nhỏ.",
    },
    highlights: [
      {
        en: "Table formatting, clipboard support and CSV upload notifications.",
        vi: "Định dạng bảng, sao chép vào clipboard và thông báo khi tải lên CSV.",
      },
      {
        en: "Worked from Functional Design documents in a real team using Jira and GitLab.",
        vi: "Làm việc theo tài liệu Functional Design trong đội thực tế, dùng Jira và GitLab.",
      },
    ],
    stack: ["React", "TypeScript", "GitLab", "Jira"],
    confidential: true,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
