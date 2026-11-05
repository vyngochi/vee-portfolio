import type { Experience } from "./types";

// Nguồn: docs/private/cv.pdf. Sắp xếp mới nhất trước.

export const experience: Experience[] = [
  {
    company: "BeeWise",
    role: { en: "Frontend Developer", vi: "Frontend Developer" },
    kind: "startup",
    start: "2026-06",
    end: null,
    project: "Tutor Connection & Learning Management Platform",
    summary: {
      en: "EdTech startup and interdisciplinary project at FPT University. I took main ownership of the frontend and worked closely with the founders, back-end team and designers to turn product ideas into a real product.",
      vi: "Startup EdTech và dự án liên ngành tại Đại học FPT. Mình phụ trách chính phần frontend, làm việc sát với founder, đội back-end và designer để biến ý tưởng thành sản phẩm thật.",
    },
    highlights: [
      {
        en: "Owned the frontend of a platform that matches learners with tutors using AI, plus the SuperLMS portal with AI tools for scheduling, AI-generated assignments and Feynman-method learning.",
        vi: "Phụ trách frontend của nền tảng kết nối học viên với gia sư bằng AI, cùng cổng SuperLMS có công cụ AI để quản lý lịch, tạo bài tập và học theo phương pháp Feynman.",
      },
      {
        en: "Took part in UI/UX design and helped write BRDs for platform features.",
        vi: "Tham gia thiết kế UI/UX và hỗ trợ viết BRD cho các tính năng.",
      },
      {
        en: "Deployed the product on Vercel and connected a custom domain.",
        vi: "Deploy sản phẩm lên Vercel và kết nối tên miền riêng.",
      },
      {
        en: "Improved SEO using Google Search Console and Bing Webmaster Tools.",
        vi: "Cải thiện SEO bằng Google Search Console và Bing Webmaster Tools.",
      },
      {
        en: "Contributed to market and target-customer research and used the insights to shape the UX.",
        vi: "Tham gia nghiên cứu thị trường và khách hàng mục tiêu, dùng kết quả để định hình UX.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Vercel"],
    projectSlug: "beewise",
  },
  {
    company: "FPT Software",
    role: { en: "Frontend Intern Developer", vi: "Thực tập sinh Frontend" },
    kind: "internship",
    start: "2026-01",
    end: "2026-04",
    project: "Casio Hito Compass: HR Management System",
    summary: {
      en: "Internal human resource management system for the Japanese market. I worked on UI maintenance, minor bug fixes and small feature improvements requested by the Project Manager and Technical Leader.",
      vi: "Hệ thống quản lý nhân sự nội bộ cho thị trường Nhật Bản. Mình bảo trì giao diện, sửa lỗi nhỏ và cải thiện tính năng theo yêu cầu của Project Manager và Technical Leader.",
    },
    highlights: [
      {
        en: "Fixed front-end bugs and shipped small UI improvements: table formatting, clipboard support and CSV upload notifications.",
        vi: "Sửa lỗi frontend và cải thiện giao diện: định dạng bảng, sao chép vào clipboard và thông báo khi tải lên CSV.",
      },
      {
        en: "Analyzed Functional Design documents from Business Analysts to understand business requirements.",
        vi: "Phân tích tài liệu Functional Design của Business Analyst để nắm yêu cầu nghiệp vụ.",
      },
      {
        en: "Learned the software development lifecycle with the Project Manager and tracked tasks in Jira.",
        vi: "Tìm hiểu quy trình phát triển phần mềm cùng Project Manager và quản lý công việc trên Jira.",
      },
      {
        en: "Used GitLab for version control and collaboration in a real-world team.",
        vi: "Dùng GitLab để quản lý mã nguồn và phối hợp trong một đội phát triển thực tế.",
      },
    ],
    stack: ["React", "TypeScript", "GitLab", "Jira"],
    projectSlug: "hito-compass",
  },
];
