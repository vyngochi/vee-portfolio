import type { Dictionary } from "./en";

/** Chữ giao diện tiếng Việt. Cấu trúc phải giống hệt en.ts. */
export const vi: Dictionary = {
  meta: {
    title: "Ngô Chí Vỹ · Frontend Developer",
    description:
      "Lập trình viên frontend làm việc với React, Next.js và Three.js. Dự án tiêu biểu, kinh nghiệm và liên hệ.",
  },
  nav: {
    label: "Điều hướng chính",
    home: "Trang chủ",
    about: "Giới thiệu",
    work: "Dự án",
    experience: "Kinh nghiệm",
    contact: "Liên hệ",
    skipToContent: "Bỏ qua đến nội dung",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    menu: "Menu",
  },
  theme: {
    toggle: "Đổi giao diện sáng / tối",
  },
  language: {
    label: "Ngôn ngữ",
  },
  hero: {
    scroll: "Cuộn để xem tiếp",
    portraitAlt: "Ảnh chân dung của {name}",
  },
  bento: {
    about: { label: "Giới thiệu" },
    achievements: { label: "Thành tích" },
    stack: { label: "Công nghệ" },
    education: {
      label: "Học vấn",
      gpa: "GPA",
      graduation: "Dự kiến tốt nghiệp",
      languages: "Ngoại ngữ",
    },
  },
  sections: {
    about: { lead: "Một chút", accent: "về Vỹ" },
    work: { lead: "Dự án", accent: "Vỹ đã tham gia" },
    experience: { lead: "Nơi Vỹ đã từng", accent: "làm việc" },
    contact: { lead: "Liên hệ với", accent: "Vỹ nhé?" },
  },
  projects: {
    kind: {
      product: "Sản phẩm",
      academic: "Dự án học thuật",
      internship: "Thực tập",
      personal: "Dự án cá nhân",
    },
    role: "Vai trò",
    period: "Thời gian",
    team: "Nhóm",
    highlights: "Điểm nổi bật",
    browserLabel: "Xem trước dự án",
    placeholder: "Ảnh tạm",
    waitingFor: "Đang chờ",
    openLive: "Mở trong tab mới",
    previewAlt: "Xem trước {title}",
  },
  experience: {
    kind: {
      internship: "Thực tập",
      startup: "Startup",
      "full-time": "Toàn thời gian",
      freelance: "Freelance",
    },
  },
  contact: {
    intro: "Cảm ơn bạn đã xem, liên hệ với Vỹ tại:",
    email: "Email",
    copy: "Sao chép email",
    copied: "Đã sao chép",
    portraitAlt: "{name} cầm laptop",
  },
  footer: {
    backToTop: "Lên đầu trang",
    rights: "",
    builtWith: "",
  },
  notFound: {
    title: "Không tìm thấy trang",
    accent: "lạc mất",
    lead: "Trang này hình như đã",
    description: "Trang bạn tìm không tồn tại hoặc đã được chuyển đi.",
    backHome: "Về trang chủ",
  },
  common: {
    present: "Hiện tại",
    viewProject: "Xem dự án",
    sourceCode: "Mã nguồn",
    liveSite: "Trang web",
    confidential: "Dự án nội bộ",
    downloadCv: "Tải CV",
    opensInNewTab: "(mở trong tab mới)",
  },
};
