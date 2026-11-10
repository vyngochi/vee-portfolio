import { FlowerLogo } from "@/components/brand/FlowerLogo";
import { LogoStage } from "@/components/brand/LogoStage";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <LogoStage logo={<FlowerLogo idPrefix="fly" className="size-full" />}>
        <Hero />
        <About />
        <Projects />
        <Experience />
      </LogoStage>

      <Contact />
    </>
  );
}
