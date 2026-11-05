"use client";

/**
 * Script chạy ngay khi trình duyệt đọc HTML (trước khi vẽ trang).
 * Server render type="text/javascript" để script chạy; client render type="text/plain"
 * để React không cảnh báo "Encountered a script tag" khi phải dựng lại cây phía client (ví dụ trang 404).
 * Theo hướng dẫn "Preventing flash before hydration" của Next.js.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
