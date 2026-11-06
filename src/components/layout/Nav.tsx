import Link from "next/link";
import { profile } from "@/content/profile";
import { localizedPath, t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { homeSections } from "@/lib/sections";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavShell } from "./NavShell";
import { ThemeToggle } from "./ThemeToggle";

/** Thanh điều hướng chính. Link neo trỏ về trang chủ đúng ngôn ngữ nên dùng được từ mọi trang. */
export async function Nav() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const home = localizedPath(locale, "/");
  const name = t(profile.name, locale);

  const links = homeSections.map((id) => ({ href: `${home}#${id}`, label: dict.nav[id] }));

  return (
    <NavShell>
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href={home} className="text-lg font-bold tracking-tight" aria-label={`${name}, ${dict.nav.home}`}>
          {name}
          <span className="text-emphasis">.</span>
        </Link>

        <nav aria-label={dict.nav.label} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={dict.language.label} />
          <ThemeToggle label={dict.theme.toggle} />
          <MobileMenu
            className="md:hidden"
            links={links}
            labels={{
              open: dict.nav.openMenu,
              close: dict.nav.closeMenu,
              menu: dict.nav.menu,
              navigation: dict.nav.label,
            }}
          />
        </div>
      </Container>
    </NavShell>
  );
}
