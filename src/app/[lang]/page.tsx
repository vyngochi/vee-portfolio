import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { formatPeriod } from "@/lib/format";

// Trang tạm để kiểm tra i18n và theme. Sẽ được thay bằng các section thật.
export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-8 px-4 py-24 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-eyebrow uppercase text-muted-foreground">{dict.home.building}</p>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={dict.language.label} />
          <ThemeToggle label={dict.theme.toggle} />
        </div>
      </div>

      <h1 className="text-display">
        {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
        <span className="text-serif-accent">{profile.name.split(" ").at(-1)}</span>
      </h1>
      <p className="text-headline">{t(profile.role, locale)}</p>
      <p className="max-w-[65ch] text-lg text-muted-foreground">{t(profile.summary, locale)}</p>

      <ul className="flex flex-col gap-2 border-t border-border pt-6">
        {experience.map((job) => (
          <li key={job.company} className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold">
              {job.company} · {t(job.role, locale)}
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              {formatPeriod(job.start, job.end, locale, dict.common.present)}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
