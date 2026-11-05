import { notFound } from "next/navigation";

// Bắt mọi đường dẫn không khớp route nào để hiện trang 404 song ngữ ([lang]/not-found.tsx)
// thay cho trang 404 mặc định của Next (vốn không có Nav, Footer, theme).

// Route này chỉ dùng để báo 404, không có giao diện riêng để kiểm tra "instant navigation".
// Tắt kiểm tra để dev overlay không báo lỗi "Could not validate instant".
export const instant = false;

export default function CatchAll() {
  notFound();
}
