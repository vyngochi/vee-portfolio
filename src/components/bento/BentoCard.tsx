"use client";

import { cn } from "@/lib/utils";

/**
 * Một ô trong lưới bento: nền card, viền, bo góc card, spotlight theo chuột.
 * Nội dung bên trong có thể là Server Component (truyền qua children).
 */
export function BentoCard({
  label,
  className,
  children,
}: {
  /** Nhãn nhỏ ở góc trên (text-eyebrow) */
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <article
      onPointerMove={onPointerMove}
      className={cn(
        "spotlight relative isolate flex min-h-52 flex-col gap-4 overflow-hidden rounded-card border border-border bg-card p-6 text-card-foreground",
        "transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--primary)_45%,var(--border))]",
        className,
      )}
    >
      <p className="text-eyebrow font-semibold uppercase text-muted-foreground">{label}</p>
      {children}
    </article>
  );
}
