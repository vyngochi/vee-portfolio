import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { getDictionary } from "@/i18n/server";
import { homeSections } from "@/lib/sections";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <>
      <Hero />

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
