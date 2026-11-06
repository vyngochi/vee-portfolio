import { Braces } from "lucide-react";
import { techIcons } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

type Item = { name: string; group: string };

/**
 * Dải logo công nghệ chạy từ phải sang trái, vô hạn. Rê chuột thì dừng.
 * Danh sách được lặp hai lần và dịch -50% để vòng lặp liền mạch; bản lặp là aria-hidden.
 * Giảm chuyển động: không chạy, các ô xuống dòng thành lưới tĩnh.
 * Logo màu đen (Next.js, Vercel, Three.js) dùng màu chữ để không biến mất ở dark.
 */
export function TechMarquee({ items }: { items: Item[] }) {
  return (
    <div data-logo-track className="group/marquee -mx-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:mx-0 motion-reduce:[mask-image:none]">
      <div className="flex w-max motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={cn(
              "flex shrink-0 gap-4 pr-4",
              copy === 1 && "motion-reduce:hidden",
              "motion-reduce:flex-wrap motion-reduce:pr-0",
            )}
          >
            {items.map((item) => (
              <Tile key={item.name} {...item} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Tile({ name, group }: Item) {
  const icon = techIcons[name];
  const isBlack = icon?.hex === "000000";
  const brand = isBlack || !icon ? "var(--foreground)" : `#${icon.hex}`;

  return (
    <li
      className={cn(
        "flex w-44 shrink-0 items-center gap-3 rounded-2xl border border-border bg-background/60 p-4",
        "transition-[transform,border-color,background-color] duration-300 ease-spring",
        "hover:-translate-y-1 hover:border-[var(--brand)] hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]",
      )}
      style={{ "--brand": brand } as React.CSSProperties}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" aria-hidden className="size-9 shrink-0" fill={brand}>
          <path d={icon.path} />
        </svg>
      ) : (
        <Braces className="size-9 shrink-0 text-muted-foreground" aria-hidden />
      )}
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-semibold tracking-tight">{name}</span>
        <span className="truncate text-xs text-muted-foreground">{group}</span>
      </span>
    </li>
  );
}
