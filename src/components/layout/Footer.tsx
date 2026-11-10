import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import { t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { TOP_ID } from "@/lib/sections";
import { Container } from "./Container";
import { CurrentYear } from "./CurrentYear";

export async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6 text-xs text-muted-foreground">
        <p>
          © <CurrentYear /> {t(profile.name, locale)}. {dict.footer.rights}
        </p>
        <p>{dict.footer.builtWith}</p>
        <a
          href={`#${TOP_ID}`}
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
        >
          {dict.footer.backToTop}
          <ArrowUp
            className="size-4 transition-transform duration-300 ease-spring group-hover:-translate-y-0.5"
            aria-hidden
          />
        </a>
      </Container>
    </footer>
  );
}
