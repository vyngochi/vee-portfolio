import type { Dictionary } from "./en";

/** Chữ giao diện tiếng Việt. Cấu trúc phải giống hệt en.ts. */
export const vi: Dictionary = {
  meta: {
    title: "Ngo Chi Vy · Frontend Developer",
    description: "Lập trình viên frontend làm việc với React, Next.js và Three.js. Dự án tiêu biểu, kinh nghiệm và liên hệ.",
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
  sections: {
    about: { lead: "Một chút", accent: "về mình" },
    work: { lead: "Dự án", accent: "chọn lọc" },
    experience: { lead: "Hành trình", accent: "làm việc" },
    contact: { lead: "Cùng làm gì đó", accent: "nhé?" },
    placeholder: "Sắp ra mắt",
  },
  footer: {
    getInTouch: "Liên hệ",
    elsewhere: "Mạng xã hội",
    backToTop: "Lên đầu trang",
    rights: "Đã đăng ký bản quyền.",
    builtWith: "Làm bằng Next.js, Tailwind CSS và một chút WebGL.",
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
