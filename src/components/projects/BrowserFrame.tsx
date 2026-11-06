"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { ExternalLink } from "lucide-react";
import type { ProjectMedia } from "@/lib/project-media";

export interface BrowserFrameLabels {
  frame: string;
  placeholder: string;
  waitingFor: string;
  loadLive: string;
  openLive: string;
  closeLive: string;
  alt: string;
}

const reduceQuery = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(reduceQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Khung cửa sổ trình duyệt để xem web động. Ba chế độ: video lặp, ảnh, iframe trang thật. [P4.3]
 * - Video lặp tự động, không tiếng; bật giảm chuyển động thì không tự phát mà hiện nút điều khiển.
 * - Iframe chỉ nạp khi bấm (nhiều trang chặn nhúng nên luôn kèm link mở tab mới). Chỉ hiện khi có liveUrl.
 * - Chưa có media: placeholder đúng tỉ lệ, ghi tên file đang chờ.
 */
export function BrowserFrame({
  address,
  media,
  liveUrl,
  labels,
}: {
  /** Chữ hiện trong thanh địa chỉ */
  address: string;
  media: ProjectMedia;
  liveUrl?: string;
  labels: BrowserFrameLabels;
}) {
  const [live, setLive] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(reduceQuery).matches,
    () => false,
  );

  return (
    <figure
      aria-label={labels.frame}
      className="overflow-hidden rounded-card border border-border bg-card shadow-float"
    >
      <div className="flex items-center gap-3 border-b border-border bg-muted px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-background px-3 py-1 text-center font-mono text-xs text-muted-foreground">
          {address}
        </span>
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
          >
            {labels.openLive}
            <ExternalLink className="size-3" aria-hidden />
          </a>
        ) : null}
      </div>

      <div className="relative aspect-[16/10] bg-muted">
        {live && liveUrl ? (
          <iframe
            src={liveUrl}
            title={labels.frame}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="absolute inset-0 size-full bg-background"
          />
        ) : media.kind === "video" ? (
          <video
            src={media.src}
            poster={media.poster}
            muted
            loop
            playsInline
            autoPlay={!reduceMotion}
            controls={reduceMotion}
            preload="metadata"
            className="absolute inset-0 size-full object-cover object-top"
          />
        ) : media.kind === "image" ? (
          <Image
            src={media.src}
            alt={labels.alt}
            fill
            sizes="(min-width: 1240px) 1192px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in srgb, var(--border) 60%, transparent) 14px 15px)",
            }}
          >
            <p className="text-eyebrow font-semibold uppercase text-muted-foreground">
              {labels.placeholder}
            </p>
            <p className="text-sm text-muted-foreground">
              {labels.waitingFor}{" "}
              <code className="font-mono text-foreground">{media.expected}</code>
            </p>
          </div>
        )}

        {liveUrl && !live ? (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="absolute right-4 bottom-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-float transition-transform duration-300 ease-spring hover:-translate-y-0.5"
          >
            {labels.loadLive}
          </button>
        ) : null}
        {live ? (
          <button
            type="button"
            onClick={() => setLive(false)}
            className="absolute right-4 bottom-4 rounded-full bg-background px-4 py-2 text-sm font-semibold shadow-float"
          >
            {labels.closeLive}
          </button>
        ) : null}
      </div>
    </figure>
  );
}
