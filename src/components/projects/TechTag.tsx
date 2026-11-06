import { Braces } from "lucide-react";
import { techIcons } from "@/lib/tech-icons";

/** Tên trong projects.ts khác tên trong skills.ts thì ánh xạ về cùng một logo */
const alias: Record<string, string> = { "REST API": "RESTful API" };

/**
 * Nhãn công nghệ của dự án: logo thương hiệu (màu thật) + tên. Logo đen dùng màu chữ để không biến mất ở dark.
 * Công nghệ không có logo thương hiệu (REST API) dùng icon chung.
 */
export function TechTag({ name }: { name: string }) {
  const icon = techIcons[alias[name] ?? name];
  const fill = !icon || icon.hex === "000000" ? "currentColor" : `#${icon.hex}`;

  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium">
      {icon ? (
        <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0" fill={fill}>
          <path d={icon.path} />
        </svg>
      ) : (
        <Braces className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      )}
      {name}
    </li>
  );
}
