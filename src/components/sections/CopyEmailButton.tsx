"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Nút sao chép email, đổi sang trạng thái "Đã sao chép" trong 2 giây. Chữ nhận qua props. [P6.1] */
export function CopyEmailButton({ email, copyLabel, copiedLabel }: { email: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Trình duyệt chặn clipboard: người xem vẫn còn link mailto ngay bên cạnh
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-transform duration-300 ease-spring hover:-translate-y-0.5 active:translate-y-0"
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  );
}
