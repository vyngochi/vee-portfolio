import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { profile } from "@/content/profile";
import { t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { splitName } from "@/lib/name";
import { homeSections } from "@/lib/sections";

export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const name = splitName(profile.name);

  return (
    <>
      {/* Hero tạm: sẽ thay bằng hero thật ở P2 */}
      <Container className="pt-10 pb-6 sm:pt-16">
        <div
          className="grain flex min-h-[420px] flex-col justify-end gap-4 overflow-hidden rounded-hero p-6 text-hero-foreground shadow-hero sm:p-12"
          style={{ background: "radial-gradient(120% 90% at 30% 80%, var(--hero-from), var(--hero-via) 45%, var(--hero-to) 80%)" }}
        >
          <p className="text-eyebrow uppercase opacity-75">{t(profile.role, locale)}</p>
          <h1 className="text-display">
            {name.lead} <span className="text-serif-accent">{name.last}</span>
          </h1>
        </div>
      </Container>

      {homeSections.map((id) => (
        <Section key={id} id={id} title={dict.sections[id]}>
          <div className="flex min-h-48 items-center justify-center rounded-card border border-dashed border-border text-sm text-muted-foreground">
            {dict.sections.placeholder}
          </div>
        </Section>
      ))}
    </>
  );
}
