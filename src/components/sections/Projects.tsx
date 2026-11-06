import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { siGithub } from "simple-icons";
import { Section } from "@/components/layout/Section";
import { TechTag } from "@/components/projects/TechTag";
import { BrowserFrame } from "@/components/projects/BrowserFrame";
import { featuredProjects } from "@/content/projects";
import { t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { formatPeriod } from "@/lib/format";
import { getProjectMedia } from "@/lib/project-media";

/**
 * Section Work: mỗi dự án là một khối luôn mở (không có trang riêng, không có chế độ thu gọn). [P4]
 * Bố cục md+: khung trình duyệt nhỏ bên trái, thông tin bên phải; mobile xếp dọc.
 * Dự án confidential (Hito Compass) không hiện ở đây, chỉ ở Experience.
 */
export async function Projects() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const d = dict.projects;
  const list = featuredProjects.filter((p) => !p.confidential);
  const strip = (url: string) => url.replace(/^https?:\/\//, "");

  return (
    <Section id="work" title={dict.sections.work}>
      <div className="flex flex-col border-t border-border">
        {list.map((project, i) => {
          const media = getProjectMedia(project.slug);
          const address = project.links?.live
            ? strip(project.links.live)
            : project.links?.github
              ? strip(project.links.github)
              : project.slug;
          const startYear = project.start.slice(0, 4);
          const endYear = project.end?.slice(0, 4);
          const years = endYear && endYear !== startYear ? `${startYear}–${endYear}` : startYear;

          return (
            <article
              key={project.slug}
              className={cn(
                "flex flex-col gap-8 border-b border-border py-10 md:grid md:gap-12",
                // Ziczac: dự án lẻ khung bên trái, dự án chẵn khung bên phải
                i % 2 === 0
                  ? "md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)]"
                  : "md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]",
              )}
            >
              <div className={cn("flex flex-col gap-6 md:self-start", i % 2 === 1 && "md:order-2")}>
              <BrowserFrame
                address={address}
                media={media}
                liveUrl={project.links?.live}
                labels={{
                  frame: d.browserLabel,
                  placeholder: d.placeholder,
                  waitingFor: d.waitingFor,
                  loadLive: d.loadLive,
                  openLive: d.openLive,
                  closeLive: d.closeLive,
                  alt: d.previewAlt.replace("{title}", project.title),
                }}
              />
                {/* Ô cho bông hoa bay tới đậu, nằm dưới khung (chỉ hiện khi hiệu ứng bay đang bật, md+) */}
                <div
                  data-logo-anchor="project"
                  aria-hidden
                  className="hidden size-24 self-center group-data-[logo-flight=on]/stage:block"
                />
              </div>

              <div className="flex flex-col gap-6">
                <header className="flex flex-col gap-2">
                  <p className="flex flex-wrap items-center gap-x-3 font-mono text-sm text-muted-foreground">
                    <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>{years}</span>
                    <span className="text-eyebrow uppercase">{d.kind[project.kind]}</span>
                  </p>
                  <h3 className="text-headline">{project.title}</h3>
                  <p className="text-muted-foreground">{t(project.tagline, locale)}</p>
                </header>

                <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-3">
                  {[
                    { label: d.role, value: t(project.role, locale) },
                    {
                      label: d.period,
                      value: formatPeriod(project.start, project.end, locale, dict.common.present),
                    },
                    ...(project.team ? [{ label: d.team, value: t(project.team, locale) }] : []),
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col gap-0.5">
                      <dt className="text-eyebrow uppercase text-muted-foreground">{f.label}</dt>
                      <dd className="text-sm font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="leading-relaxed text-pretty">{t(project.description, locale)}</p>

                <ul className="flex flex-col divide-y divide-border border-y border-border text-sm">
                  {project.highlights.map((h) => (
                    <li key={h.en} className="py-2.5">
                      {t(h, locale)}
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <TechTag key={item} name={item} />
                  ))}
                </ul>

                {project.links ? (
                  <div className="flex flex-wrap gap-3">
                    {project.links.github ? (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
                          <path d={siGithub.path} />
                        </svg>
                        {dict.common.sourceCode}
                        <span className="sr-only">{dict.common.opensInNewTab}</span>
                      </a>
                    ) : null}
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                      >
                        {dict.common.liveSite}
                        <ExternalLink className="size-4" aria-hidden />
                        <span className="sr-only">{dict.common.opensInNewTab}</span>
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
