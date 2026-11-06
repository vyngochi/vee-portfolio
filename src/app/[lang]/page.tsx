import { FlowerLogo } from "@/components/brand/FlowerLogo";
import { LogoStage } from "@/components/brand/LogoStage";
import { Section } from "@/components/layout/Section";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { getDictionary } from "@/i18n/server";
import { homeSections } from "@/lib/sections";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <>
      <LogoStage logo={<FlowerLogo idPrefix="fly" className="size-full" />}>
        <Hero />
        <About />
      </LogoStage>

      {/* Các section chưa làm (P4–P6) */}
      {homeSections
        .filter((id) => id !== "about")
        .map((id) => (
          <Section key={id} id={id} title={dict.sections[id]}>
            <div className="flex min-h-48 items-center justify-center rounded-card border border-dashed border-border text-sm text-muted-foreground">
              {dict.sections.placeholder}
            </div>
          </Section>
        ))}
    </>
  );
}
