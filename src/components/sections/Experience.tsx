import { ArrowDownRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TechTag } from "@/components/projects/TechTag";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { localizedPath, t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { formatPeriod } from "@/lib/format";

/**
 * Section Experience: timeline dọc, mới nhất trước. [P5]
 * Mỗi mục: thời gian, công ty, vai trò, loại, tóm tắt, điểm nổi bật, stack.
 * Dự án có khối ở mục Work thì có link nhảy tới đó; dự án confidential chỉ ghi nhãn "Dự án nội bộ".
 * Nội dung luôn hiện sẵn (không chờ cuộn), chỉ có hiệu ứng hover nhẹ.
 */
export async function Experience() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const d = dict.experience;

  return (
    <Section id="experience" title={dict.sections.experience}>
      <ol className="relative flex flex-col gap-12 border-l border-border pl-6 sm:pl-10">
        {experience.map((job) => {
          const project = projects.find((p) => p.slug === job.projectSlug);
          const visible = project && !project.confidential;
          return (
            <li key={`${job.company}-${job.start}`} className="group relative">
              {/* Chấm mốc trên đường kẻ; ô 40px quanh chấm là điểm neo cho bông hoa (hiện khi hiệu ứng bay bật) */}
              <span
                data-logo-anchor="node"
                aria-hidden
                className="absolute -top-[7px] -left-[calc(1.5rem+20px)] grid size-10 place-items-center sm:-left-[calc(2.5rem+20px)]"
              >
                <span className="size-2.5 rounded-full border-2 border-background bg-foreground ring-1 ring-border transition-transform duration-300 ease-spring group-hover:scale-150" />
              </span>
              <div className="grid gap-x-12 gap-y-4 md:grid-cols-[14rem_minmax(0,1fr)]">
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-sm text-muted-foreground">
                    {formatPeriod(job.start, job.end, locale, dict.common.present)}
                  </p>
                  <p className="text-eyebrow uppercase text-muted-foreground">{d.kind[job.kind]}</p>
                </div>

                <div className="flex flex-col gap-5">
                  <header className="flex flex-col gap-1">
                    <h3 className="text-title font-semibold">{job.company}</h3>
                    <p className="text-lg text-muted-foreground">{t(job.role, locale)}</p>
                    {job.project ? <p className="text-sm text-muted-foreground">{job.project}</p> : null}
                  </header>

                  <p className="max-w-[64ch] leading-relaxed text-pretty">{t(job.summary, locale)}</p>

                  <ul className="flex flex-col divide-y divide-border border-y border-border text-sm">
                    {job.highlights.map((h) => (
                      <li key={h.en} className="py-2.5">
                        {t(h, locale)}
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-2">
                    {job.stack.map((item) => (
                      <TechTag key={item} name={item} />
                    ))}
                  </ul>

                  {visible ? (
                    <a
                      href={`${localizedPath(locale, "/")}#project-${project.slug}`}
                      className="group/link inline-flex w-fit items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {dict.common.viewProject}
                      <ArrowDownRight
                        className="size-4 transition-transform duration-300 ease-spring group-hover/link:translate-x-0.5 group-hover/link:translate-y-0.5"
                        aria-hidden
                      />
                    </a>
                  ) : project?.confidential ? (
                    <p className="w-fit rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">
                      {dict.common.confidential}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
