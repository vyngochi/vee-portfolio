import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * Một section của trang chủ. id dùng làm anchor; scroll-mt chừa chỗ cho Nav dính đầu trang.
 * Tiêu đề chia lead + accent: accent hiển thị bằng chữ nghiêng serif (tối đa một cụm mỗi tiêu đề).
 */
export function Section({
  id,
  title,
  note,
  className,
  children,
}: {
  id: string;
  title: { lead: string; accent: string };
  /** Ghi chú nhỏ bên phải tiêu đề */
  note?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-24 py-16 sm:py-24", className)}>
      <Container className="flex flex-col gap-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id={headingId} className="text-headline">
            {title.lead} <span className="text-serif-accent">{title.accent}</span>
          </h2>
          {note ? <p className="text-eyebrow uppercase text-muted-foreground">{note}</p> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
