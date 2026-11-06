import { FlowerLogo } from "@/components/brand/FlowerLogo";
import { BentoCard } from "@/components/bento/BentoCard";
import { TechMarquee } from "@/components/bento/TechMarquee";
import { Section } from "@/components/layout/Section";
import { activities, education, profile } from "@/content/profile";
import { languages, skills } from "@/content/skills";
import { t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { formatYearMonth } from "@/lib/format";

/**
 * Section About: lưới bento, MỖI THẺ LÀ THÔNG TIN THẬT từ CV (xem "Mục đích" trong AGENTS.md). [P3]
 * Bố cục (md, 4 cột):
 *   About (2×2)          | Thành tích (2)
 *                        | Học vấn (2)
 *   Công nghệ (4, toàn chiều rộng)
 */
export async function About() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const b = dict.bento;

  return (
    <Section id="about" title={dict.sections.about}>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <BentoCard label={b.about.label} className="sm:col-span-2 md:row-span-2">
          {/* Điểm đáp của bông hoa bay từ hero (md+): to, nằm giữa phần trống của thẻ; dưới md chỉ là logo tĩnh */}
          <div className="flex flex-1 items-center justify-center py-4">
            <div
              data-logo-anchor="about"
              className="aspect-[148.1/153.7] w-44 group-data-[logo-flight=on]/stage:invisible sm:w-56 lg:w-64"
            >
              <FlowerLogo idPrefix="about" className="size-full" />
            </div>
          </div>
          <p className="mt-auto max-w-[44ch] text-xl leading-relaxed font-medium text-pretty sm:text-2xl sm:leading-relaxed">
            {t(profile.summary, locale)}
          </p>
        </BentoCard>

        <BentoCard label={b.achievements.label} className="sm:col-span-2">
          <ul className="flex flex-col divide-y divide-border">
            {activities.map((item) => (
              <li key={item.title.en} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold tracking-tight">{t(item.title, locale)}</h3>
                  {item.date ? (
                    <span className="font-mono text-xs text-muted-foreground">{formatYearMonth(item.date, locale)}</span>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(item.description, locale)}
                  {item.organizer ? <span className="block text-xs">{item.organizer}</span> : null}
                </p>
              </li>
            ))}
          </ul>
        </BentoCard>

        <BentoCard label={b.education.label} className="sm:col-span-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold tracking-tight">{education.school}</h3>
            <p className="text-muted-foreground">{t(education.degree, locale)}</p>
          </div>
          <dl className="mt-auto grid gap-x-8 gap-y-4 border-t border-border pt-4 sm:grid-cols-[auto_auto_minmax(0,1fr)]">
            {education.gpa ? (
              <div className="flex flex-col gap-1">
                <dt className="text-eyebrow uppercase text-muted-foreground">{b.education.gpa}</dt>
                <dd className="font-mono text-2xl font-medium tabular-nums">{t(education.gpa, locale).split(" ")[0]}</dd>
              </div>
            ) : null}
            {education.expectedGraduation ? (
              <div className="flex flex-col gap-1">
                <dt className="text-eyebrow uppercase text-muted-foreground">{b.education.graduation}</dt>
                <dd className="font-mono text-2xl font-medium tabular-nums">{education.expectedGraduation}</dd>
              </div>
            ) : null}
            <div className="flex flex-col gap-1">
              <dt className="text-eyebrow uppercase text-muted-foreground">{b.education.languages}</dt>
              <dd className="text-sm">
                {languages.map((l) => (
                  <span key={l.en} className="block">{t(l, locale)}</span>
                ))}
              </dd>
            </div>
          </dl>
        </BentoCard>

        <BentoCard label={b.stack.label} className="min-h-0 sm:col-span-2 md:col-span-4">
          {/* Tâm đúng góc trên phải của khung thẻ (hoa ghim ở góc, nhô ra một nửa): nơi bông hoa bay tới đậu (chỉ hiện khi hiệu ứng bay đang bật, md+) */}
          <div
            data-logo-anchor="tech"
            aria-hidden
            className="absolute -top-6 -right-6 hidden size-12 group-data-[logo-flight=on]/stage:block"
          />
          <TechMarquee
            items={skills.flatMap((group) =>
              group.items.map((name) => ({ name, group: t(group.label, locale) })),
            )}
          />
        </BentoCard>
      </div>
    </Section>
  );
}
