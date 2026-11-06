import { ArrowUp, ArrowUpRight } from "lucide-react";
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
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_auto] md:items-end">
        <div className="flex flex-col gap-3">
          <p className="text-eyebrow uppercase text-muted-foreground">
            {dict.footer.getInTouch}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="w-fit break-all text-title underline decoration-border decoration-1 underline-offset-8 transition-colors hover:decoration-primary"
          >
            {profile.email}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-eyebrow uppercase text-muted-foreground">
            {dict.footer.elsewhere}
          </p>
          <ul className="flex flex-col gap-2">
            {profile.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-medium transition-colors hover:text-highlight"
                >
                  {social.label}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">{dict.common.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={`#${TOP_ID}`}
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
        >
          {dict.footer.backToTop}
          <ArrowUp
            className="size-4 transition-transform duration-300 ease-spring group-hover:-translate-y-0.5"
            aria-hidden
          />
        </a>
      </Container>

      <Container className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-border py-6 text-xs text-muted-foreground">
        <p>
          © <CurrentYear /> {t(profile.name, locale)}. {dict.footer.rights}
        </p>
        <p>{dict.footer.builtWith}</p>
      </Container>
    </footer>
  );
}
