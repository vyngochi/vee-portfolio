"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };

/**
 * Menu toàn màn hình cho mobile (dưới md). Dùng <dialog> gốc với showModal():
 * trình duyệt lo sẵn focus trap, phím Esc, làm trơ phần trang phía sau và trả focus về nút mở khi đóng.
 */
export function MobileMenu({
  links,
  labels,
  className,
}: {
  links: NavLink[];
  labels: { open: string; close: string; menu: string; navigation: string };
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function open() {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
    buttonRef.current?.setAttribute("aria-expanded", "true");
  }

  function close() {
    dialogRef.current?.close();
  }

  // Chạy cả khi đóng bằng Esc (sự kiện close của dialog)
  function handleClose() {
    document.documentElement.style.overflow = "";
    buttonRef.current?.setAttribute("aria-expanded", "false");
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={open}
        aria-label={labels.open}
        aria-expanded="false"
        aria-controls="mobile-menu"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground",
          className,
        )}
      >
        <Menu className="size-[18px]" aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label={labels.menu}
        onClose={handleClose}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col px-4 pt-3 pb-10 sm:px-6">
          <div className="flex h-12 items-center justify-between">
            <span className="text-eyebrow uppercase text-muted-foreground">{labels.menu}</span>
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card"
            >
              <X className="size-[18px]" aria-hidden />
            </button>
          </div>

          <nav aria-label={labels.navigation} className="mt-auto">
            <ul className="flex flex-col gap-2">
              {links.map((link, i) => (
                <li
                  key={link.href}
                  className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:duration-500"
                  style={{ animationDelay: `${60 + i * 50}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex items-baseline gap-4 border-b border-border py-3 text-title transition-colors hover:text-emphasis"
                  >
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
