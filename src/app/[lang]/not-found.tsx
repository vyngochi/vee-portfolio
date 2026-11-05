import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

// Trang 404 song ngữ. Mọi URL không khớp đều tới đây nhờ [lang]/[...rest]/page.tsx. [P1.7]
export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <Container className="flex flex-1 flex-col justify-center gap-6 py-24">
      <p className="font-mono text-sm text-muted-foreground">404 · {dict.notFound.title}</p>
      <h1 className="text-display">
        {dict.notFound.lead} <span className="text-serif-accent">{dict.notFound.accent}</span>
      </h1>
      <p className="max-w-[50ch] text-lg text-muted-foreground">{dict.notFound.description}</p>
      <Link
        href={localizedPath(locale, "/")}
        className="group inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 ease-spring group-hover:-translate-x-0.5" aria-hidden />
        {dict.notFound.backHome}
      </Link>
    </Container>
  );
}
