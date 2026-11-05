import { cn } from "@/lib/utils";

/** Khung nội dung: rộng tối đa 1240px, lề 16px ở mobile, 24px từ sm trở lên. */
export function Container({
  as: Tag = "div",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6", className)} {...props}>
      {children}
    </Tag>
  );
}
