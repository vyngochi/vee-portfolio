import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HeroShader } from "@/components/three/HeroShader";
import { profile } from "@/content/profile";
import { localizedPath, t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { HeroFrame } from "./HeroFrame";

/**
 * Hero. Thứ tự lớp (sau → trước), mỗi lớp lệch theo chuột với độ sâu khác nhau:
 *   1. Nền: gradient CSS theo token (fallback) + shader WebGL
 *   2. Chữ trang trí cực lớn (profile.heroWord), nét mảnh, nằm SAU ảnh chân dung
 *   3. Ảnh chân dung tách nền, đứng sát đáy, cột phải
 *   4. Tên + tagline ở cột trái (KHÔNG bao giờ bị ảnh che), thông tin nhỏ, scroll cue
 * Khung là @container: cỡ tên (text-hero, đơn vị cqi) và độ rộng cột tính theo bề rộng khung,
 * nên tên luôn vừa cột trái ở mọi kích thước màn hình.
 */
export async function Hero() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const tagline = t(profile.tagline, locale);
  const aboutHref = `${localizedPath(locale, "/")}#about`;

  return (
    <Container className="pt-4 pb-6 sm:pt-6">
      <HeroFrame
        className="@container grain relative isolate flex min-h-[660px] flex-col overflow-hidden rounded-hero text-hero-foreground shadow-hero md:min-h-[min(780px,calc(100svh-104px))]"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 80%, var(--hero-from), var(--hero-via) 45%, var(--hero-to) 80%)",
        }}
      >
        {/* 1. Shader */}
        <HeroShader className="absolute inset-0 -z-10 size-full" />

        {/* 2. Chữ trang trí sau ảnh */}
        <p
          aria-hidden
          className="parallax-layer pointer-events-none absolute top-[9%] right-[3%] z-0 hidden font-poster text-[19cqi] leading-none tracking-[0.01em] text-transparent uppercase opacity-30 select-none [-webkit-text-stroke:2px_var(--hero-foreground)] md:block"
          style={{ "--depth": 8 } as React.CSSProperties}
        >
          {profile.heroWord}
        </p>

        {/* 4a. Thông tin nhỏ */}
        <div
          className="parallax-layer relative z-30 flex flex-wrap items-start justify-between gap-4 p-5 sm:p-8 md:p-10"
          style={{ "--depth": 4 } as React.CSSProperties}
        >
          <div className="flex flex-col gap-2">
            <p className="text-eyebrow font-semibold uppercase">
              {t(profile.role, locale)}
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-eyebrow uppercase opacity-70">
              {profile.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4b. Tên + tagline: cột trái, luôn nằm TRƯỚC ảnh và không chồng lên ảnh */}
        <div
          className="parallax-layer relative z-30 flex flex-col gap-5 px-5 sm:px-8 md:mt-auto md:max-w-[58cqi] md:px-10 md:pb-24"
          style={{ "--depth": 10 } as React.CSSProperties}
        >
          <h1 className="text-hero md:whitespace-nowrap">
            {/*
              overflow-hidden làm mask cho animation trượt lên. Với line-height 0.9, đuôi chữ g/y của Manrope
              thò khoảng 0.2em xuống dưới dòng, nên pb chừa 0.3em (và -mb trả lại khoảng cách) để không bị cắt.
            */}
            <span className="-mb-[0.3em] block overflow-hidden pb-[0.3em]">
              <span className="block animate-rise">{profile.name}</span>
            </span>
          </h1>
          <p className="max-w-[28ch] text-xl leading-snug font-medium text-balance motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-300 motion-safe:duration-700 sm:text-2xl">
            {tagline.lead}{" "}
            <span className="text-serif-accent text-[1.15em]">
              {tagline.accent}
            </span>
            {tagline.tail}
          </p>
        </div>

        {/* 3. Ảnh chân dung: mobile ở đáy giữa, desktop ở cột phải */}
        <div
          className="parallax-layer pointer-events-none absolute bottom-0 left-1/2 z-20 aspect-[866/1476] h-[48%] -translate-x-1/2 md:left-auto md:right-[5%] md:h-[82%] md:translate-x-0 lg:h-[92%]"
          style={{ "--depth": 16 } as React.CSSProperties}
        >
          <Image
            src="/images/profile/portrait-cutout.webp"
            alt={dict.hero.portraitAlt.replace("{name}", profile.name)}
            fill
            preload
            // Bộ tối ưu ảnh của Next trả về JPEG cho file này, làm mất nền trong suốt.
            // Ảnh gốc đã cắt sát và nén sẵn (WebP ~95 KB) nên phục vụ thẳng.
            unoptimized
            className="portrait-shadow object-contain object-bottom motion-safe:animate-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-1000 motion-safe:ease-out-expo"
          />
        </div>

        {/* Scroll cue */}
        <a
          href={aboutHref}
          className="parallax-layer absolute bottom-8 left-10 z-30 hidden items-center gap-2 text-eyebrow uppercase opacity-80 transition-opacity hover:opacity-100 md:inline-flex"
          style={{ "--depth": 4 } as React.CSSProperties}
        >
          <ArrowDown
            className="size-3.5 motion-safe:animate-bounce"
            aria-hidden
          />
          {dict.hero.scroll}
        </a>
      </HeroFrame>
    </Container>
  );
}
