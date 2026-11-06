import { existsSync } from "node:fs";
import path from "node:path";

export type ProjectMedia =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string }
  | { kind: "none"; expected: string };

const base = (slug: string) => `/images/projects/${slug}`;
const has = (publicPath: string) => existsSync(path.join(process.cwd(), "public", publicPath));

/**
 * Chọn media cho BrowserFrame theo file thực sự có trong public/images/projects/<slug>/ (xem docs/IMAGES.md):
 * demo.mp4 > 01-home.png > cover.jpg. Chưa có file nào thì trả "none" kèm tên file đang chờ,
 * để chỉ cần đặt file đúng tên là ảnh thật tự hiện ra.
 */
export function getProjectMedia(slug: string): ProjectMedia {
  const dir = base(slug);
  const cover = has(`${dir}/cover.jpg`) ? `${dir}/cover.jpg` : undefined;
  if (has(`${dir}/demo.mp4`)) return { kind: "video", src: `${dir}/demo.mp4`, poster: cover };
  if (has(`${dir}/01-home.png`)) return { kind: "image", src: `${dir}/01-home.png` };
  if (cover) return { kind: "image", src: cover };
  return { kind: "none", expected: `${dir}/demo.mp4` };
}
