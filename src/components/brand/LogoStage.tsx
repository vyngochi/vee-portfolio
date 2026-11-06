"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Bọc Hero + About và điều khiển bông hoa "bay":
 *   1. Khi tải trang: hoa từ mép phải của chữ PORTFOLIO chạy sang trái, chữ lộ dần theo sau (từ phải qua trái),
 *      hoa dừng ở điểm neo bên trái hero (trên tên).
 *   2. Khi cuộn: hoa bay theo đúng tiến độ cuộn xuống điểm neo trong thẻ About, xoay một vòng và phóng to lên.
 *   3. Cuộn tiếp: hoa rời About, bay xuống dải công nghệ (data-logo-track) rồi tự lướt mượt từ trái sang phải ở khoảng trống ngay dưới thẻ công nghệ và dừng ở cuối.
 * Các điểm neo là phần tử có data-logo-anchor="hero" | "about" (mỗi nơi có một logo tĩnh).
 * Chữ PORTFOLIO là phần tử có data-logo-word.
 * Chỉ chạy ở md trở lên và khi không giảm chuyển động; ngoài ra logo tĩnh ở About là đủ (hero ẩn logo tĩnh).
 */
export function LogoStage({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo: React.ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const flyer = flyerRef.current;
      const intro = introRef.current;
      if (!stage || !flyer || !intro) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const heroAnchor = stage.querySelector<HTMLElement>(
            '[data-logo-anchor="hero"]',
          );
          const aboutAnchor = stage.querySelector<HTMLElement>(
            '[data-logo-anchor="about"]',
          );
          const word = stage.querySelector<HTMLElement>("[data-logo-word]");
          const track = stage.querySelector<HTMLElement>("[data-logo-track]");
          if (!heroAnchor || !aboutAnchor || !word) return;

          stage.dataset.logoFlight = "on";

          // Vị trí/kích thước của phần tử so với stage, không phụ thuộc vị trí cuộn
          const place = (el: HTMLElement) => {
            const s = stage.getBoundingClientRect();
            const r = el.getBoundingClientRect();
            return {
              x: r.left - s.left,
              y: r.top - s.top,
              w: r.width,
              h: r.height,
            };
          };
          const geo = () => ({
            hero: place(heroAnchor),
            about: place(aboutAnchor),
            word: place(word),
            // Khung của thẻ công nghệ; hoa lướt ở khoảng trống ngay dưới thẻ
            track: track ? place(track.closest("article") ?? track) : null,
          });
          let g = geo();
          gsap.set(flyer, { width: g.hero.w, height: g.hero.h });

          // --- Cuộn: điểm neo hero -> điểm neo about ---------------------------------------------
          const fly = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              start: 0,
              end: () =>
                Math.max(
                  1,
                  g.about.y + g.about.h / 2 - window.innerHeight * 0.55,
                ),
              scrub: 0.6,
              invalidateOnRefresh: true,
              onRefreshInit: () => {
                g = geo();
                gsap.set(flyer, { width: g.hero.w, height: g.hero.h });
              },
            },
          });
          fly.fromTo(
            flyer,
            { x: () => g.hero.x, y: () => g.hero.y, scale: 1, rotation: 0 },
            {
              x: () => g.about.x + (g.about.w - g.hero.w) / 2,
              y: () => g.about.y + (g.about.h - g.hero.h) / 2,
              scale: () => g.about.w / g.hero.w,
              rotation: 360,
            },
          );

          // --- Cuộn tiếp: About -> đầu dải công nghệ -> lăn sang phải ------------------------------
          if (track) {
            const vh = () => window.innerHeight;
            const s1 = () =>
              Math.max(1, g.about.y + g.about.h / 2 - vh() * 0.55);
            const trackMid = () => (g.track ? g.track.y + g.track.h + 80 : 0);
            const s2 = () => Math.max(s1() + 1, trackMid() - vh() * 0.7);
            const small = () => Math.min(1, 72 / g.hero.w);
            const trackY = () => trackMid() - g.hero.h / 2;
            const trackStartX = () =>
              (g.track ? g.track.x : 0) + 48 - g.hero.w / 2;
            const trackEndX = () =>
              (g.track ? g.track.x + g.track.w : 0) - 48 - g.hero.w / 2;

            gsap.fromTo(
              flyer,
              {
                x: () => g.about.x + (g.about.w - g.hero.w) / 2,
                y: () => g.about.y + (g.about.h - g.hero.h) / 2,
                scale: () => g.about.w / g.hero.w,
                rotation: 360,
              },
              {
                x: trackStartX,
                y: trackY,
                scale: small,
                rotation: 360,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: stage,
                  start: s1,
                  end: s2,
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              },
            );

            // Hoa chạm điểm đầu của vùng lướt thì tự lướt mượt sang phải (không theo tiến độ cuộn) và dừng ở cuối dải.
            // Cuộn ngược lên khỏi vùng đó thì đưa hoa về đầu dải để tween cuộn ở trên tiếp quản.
            let glide: gsap.core.Tween | undefined;
            ScrollTrigger.create({
              trigger: stage,
              start: s2,
              invalidateOnRefresh: true,
              onEnter: () => {
                glide?.kill();
                glide = gsap.to(flyer, {
                  x: trackEndX(),
                  rotation: 1080,
                  duration: 1.8,
                  delay: 0.7, // chờ tween cuộn (scrub) ở trên về đúng đầu dải
                  ease: "power2.inOut",
                });
              },
              onLeaveBack: () => {
                glide?.kill();
                gsap.set(flyer, { x: trackStartX(), rotation: 360 });
              },
            });
          }

          // --- Mở đầu: hoa chạy từ mép phải chữ sang trái, chữ lộ dần theo sau -------------------
          const reveal = { p: 0 };
          const apply = () => {
            const rest = 1 - reveal.p;
            const dx = rest * (g.word.x + g.word.w - g.hero.w / 2 - g.hero.x);
            const dy =
              rest * (g.word.y + g.word.h / 2 - g.hero.h / 2 - g.hero.y);
            gsap.set(intro, {
              x: dx,
              y: dy,
              rotation: -360 * rest,
              opacity: Math.min(1, reveal.p * 8),
            });
            // Phần chữ ở bên trái tâm hoa vẫn ẩn; chữ lộ dần từ phải qua trái
            const centre = g.hero.x + dx + g.hero.w / 2 - g.word.x;
            const leftPct = Math.min(
              100,
              Math.max(0, (centre / g.word.w) * 100),
            );
            word.style.clipPath = `inset(0 0 0 ${leftPct}%)`;
          };
          apply();

          const tween = gsap.to(reveal, {
            p: 1,
            duration: 2.4,
            delay: 0.4,
            ease: "power3.inOut",
            onUpdate: apply,
          });
          // Tải lại khi đã cuộn giữa trang: bỏ qua mở đầu
          if (window.scrollY > 40) tween.progress(1);
          // Cuộn sớm khi mở đầu chưa xong: hoàn tất ngay để hoa không kẹt ở bên phải
          const skipIntro = () => {
            if (window.scrollY > 40) {
              tween.progress(1);
              window.removeEventListener("scroll", skipIntro);
            }
          };
          window.addEventListener("scroll", skipIntro, { passive: true });

          return () => {
            window.removeEventListener("scroll", skipIntro);
            delete stage.dataset.logoFlight;
            word.style.clipPath = "";
          };
        },
      );
    },
    { scope: stageRef },
  );

  return (
    <div ref={stageRef} className="group/stage relative">
      {children}
      {/* Chỉ hiện khi đang bay (data-logo-flight="on"); không chắn chuột */}
      <div
        ref={flyerRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-30 hidden will-change-transform group-data-[logo-flight=on]/stage:block"
      >
        <div ref={introRef} className="size-full">
          {logo}
        </div>
      </div>
    </div>
  );
}
