import { cn } from "@/lib/utils";
import { flowerPetals, flowerViewBox } from "./flower-paths";

/**
 * Màu các cánh theo palette của trang (primitive trong tokens.css), đi vòng quanh hoa theo chiều kim đồng hồ
 * từ cánh trên cùng: xanh dương -> aqua -> vàng -> cam rồi quay lại. Cánh i đổi dần từ ring[i] sang ring[i + 1].
 */
const ring = [
  "var(--blue-600)",
  "var(--blue-500)",
  "var(--blue-300)",
  "var(--aqua-400)",
  "var(--amber-400)",
  "var(--orange-600)",
  "var(--amber-400)",
  "var(--aqua-400)",
  "var(--blue-300)",
  "var(--blue-500)",
];

/**
 * Logo hoa cá nhân (vector, vẽ lại từ file gốc): 10 cánh, mỗi cánh một dải màu lấy từ palette (xem `ring`).
 * Dùng màu primitive nên không đổi theo theme.
 * idPrefix phải khác nhau nếu có nhiều logo trên cùng trang (id của gradient không được trùng).
 */
export function FlowerLogo({
  idPrefix,
  className,
  title,
}: {
  idPrefix: string;
  className?: string;
  /** Có title thì logo được đọc bởi trình đọc màn hình; không có thì là trang trí (aria-hidden) */
  title?: string;
}) {
  return (
    <svg
      viewBox={flowerViewBox}
      className={cn("block", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        {flowerPetals.map((petal, i) => (
          <linearGradient
            key={i}
            id={`${idPrefix}-petal-${i}`}
            gradientUnits="userSpaceOnUse"
            x1={petal.from[0]}
            y1={petal.from[1]}
            x2={petal.to[0]}
            y2={petal.to[1]}
          >
            <stop offset="0.1" style={{ stopColor: ring[i % ring.length] }} />
            <stop offset="0.9" style={{ stopColor: ring[(i + 1) % ring.length] }} />
          </linearGradient>
        ))}
      </defs>
      {flowerPetals.map((petal, i) => (
        <path key={i} d={petal.d} fill={`url(#${idPrefix}-petal-${i})`} />
      ))}
    </svg>
  );
}
