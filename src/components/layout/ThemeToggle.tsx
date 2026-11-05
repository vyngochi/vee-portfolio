"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { applyTheme } from "./theme-script";

/**
 * Nút đổi light/dark. Theme mới lan ra thành hình tròn từ vị trí bấm (View Transitions API).
 * Trình duyệt không hỗ trợ hoặc người xem bật giảm chuyển động thì đổi ngay, không hiệu ứng.
 * Theme hiện tại đọc thẳng từ class "dark" trên <html> (do theme-script đặt trước khi trang hiện).
 * Icon được ẩn/hiện bằng class dark: và không render thuộc tính nào phụ thuộc theme,
 * vì server không biết theme của người xem (tránh lỗi hydration).
 */
export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    const apply = () => applyTheme(next);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      apply();
      return;
    }

    const { clientX: x, clientY: y } = event;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)", // ease-out-expo
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground",
        "transition-transform duration-300 ease-spring hover:-translate-y-0.5 hover:rotate-12",
        className,
      )}
    >
      <Sun className="size-[18px] dark:hidden" aria-hidden />
      <Moon className="hidden size-[18px] dark:block" aria-hidden />
    </button>
  );
}
