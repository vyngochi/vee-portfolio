/**
 * cn(): gộp className và xử lý xung đột class Tailwind.
 * Dùng gói "cn" chính chủ của shadcn (thay cho clsx + tailwind-merge).
 * Component do shadcn CLI sinh ra import thẳng từ "cn"; code tự viết có thể import từ đây hoặc từ "cn".
 */
export { cn } from "cn";
