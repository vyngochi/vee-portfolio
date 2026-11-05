"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

/**
 * Vỏ của Nav: dính đầu trang, trong suốt khi ở đầu trang và có nền mờ + viền dưới khi đã cuộn.
 * Phần nội dung (link, nút) là Server Component truyền vào qua children.
 */
export function NavShell({ children }: { children: React.ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, getScrolled, getServerScrolled);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        "sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 ease-out-expo",
        "data-[scrolled]:border-border data-[scrolled]:bg-background/80 data-[scrolled]:backdrop-blur-md",
      )}
    >
      {children}
    </header>
  );
}
