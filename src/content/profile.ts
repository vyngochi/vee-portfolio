import type { Activity, Education, Profile } from "./types";

// Nguồn: docs/private/cv.pdf. Số điện thoại cố ý KHÔNG đưa vào đây.
// Bản tiếng Việt do agent dịch từ CV: chủ dự án cần đọc lại cho đúng giọng.

export const profile: Profile = {
  name: { en: "Ngo Chi Vy", vi: "Ngô Chí Vỹ" },
  role: { en: "Frontend Developer", vi: "Frontend Developer" },
  focus: ["React & Next.js", "Three.js", "UI/UX"],
  tagline: {
    en: {
      lead: "Frontend developer building interfaces",
      accent: "in motion",
      tail: ".",
    },
    vi: {
      lead: "Lập trình viên frontend, làm giao diện",
      accent: "có chuyển động",
      tail: ".",
    },
  },
  heroWord: "Portfolio",
  summary: {
    en: "A frontend developer with a passion for full-stack development, working mainly with React, Next.js and Node.js. I enjoy turning product ideas into real products, working closely with founders, designers and back-end teams, and I am always looking to learn from experienced teams.",
    vi: "Mình là lập trình viên frontend, đam mê phát triển full-stack, làm việc chủ yếu với React, Next.js và Node.js. Mình thích biến ý tưởng sản phẩm thành sản phẩm thật, làm việc sát với founder, designer và đội back-end, và luôn muốn học hỏi từ những đội ngũ giàu kinh nghiệm.",
  },
  // location: chưa có trong CV
  email: "ncv.ngovy@gmail.com",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/vyngochi",
      handle: "github.com/vyngochi",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vyngochi",
      handle: "linkedin.com/in/vyngochi",
    },
  ],
  // cvUrl: "/cv/ngo-chi-vy-cv.pdf", // bật khi đã có bản CV công khai (không có số điện thoại) trong public/cv/
};

export const education: Education = {
  school: "FPT University",
  degree: {
    en: "Bachelor of Software Engineering",
    vi: "Cử nhân Kỹ thuật phần mềm",
  },
  gpa: {
    en: "8.5/10 (as of November 2025)",
    vi: "8.5/10 (tính đến tháng 11/2025)",
  },
  expectedGraduation: "2027",
};

export const activities: Activity[] = [
  {
    title: {
      en: "Global Hackathon: A New Era of Education, Driving the Future of Learning with AI",
      vi: "Global Hackathon: A New Era of Education, Driving the Future of Learning with AI",
    },
    organizer:
      "FPT University, Lead The Change, InnoLab Asia Talent and Republic Polytechnic",
    date: "2026-09",
    description: {
      en: "A 3-day international hackathon on technology, innovation and entrepreneurship.",
      vi: "Hackathon quốc tế 3 ngày về công nghệ, đổi mới sáng tạo và khởi nghiệp.",
    },
  },
  {
    title: { en: "Tuoi Tre Start-up Award 2026", vi: "Tuổi Trẻ Start-up Award 2026" },
    // date: CV không ghi tháng
    description: {
      en: "Took part with BeeWise, an EdTech startup project.",
      vi: "Tham gia cùng BeeWise, một dự án khởi nghiệp EdTech.",
    },
  },
  {
    title: { en: "Startup support scholarship", vi: "Học bổng hỗ trợ khởi nghiệp" },
    organizer: "FPT University",
    // date: CV không ghi tháng
    description: {
      en: "Awarded for the BeeWise startup project.",
      vi: "Học bổng hỗ trợ khởi nghiệp cho dự án BeeWise.",
    },
  },
];
