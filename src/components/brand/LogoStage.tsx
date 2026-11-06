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
          const techAnchor = stage.querySelector<HTMLElement>('[data-logo-anchor="tech"]');
          if (!heroAnchor || !aboutAnchor || !word) return;

          stage.dataset.logoFlight = "on";
          const cleanups: (() => void)[] = [];

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
          const projectAnchors = Array.from(
            stage.querySelectorAll<HTMLElement>('[data-logo-anchor="project"]'),
          );
          const nodeAnchors = Array.from(
            stage.querySelectorAll<HTMLElement>('[data-logo-anchor="node"]'),
          );
          const geo = () => ({
            hero: place(heroAnchor),
            about: place(aboutAnchor),
            aboutSection: place(aboutAnchor.closest("section") ?? aboutAnchor),
            word: place(word),
            // Góc trên phải thẻ Công nghệ: hoa đậu ở đó
            tech: techAnchor ? place(techAnchor) : null,
            // Ô trống cạnh tiêu đề từng dự án: nơi hoa đậu lại
            projects: projectAnchors.map(place),
            // Các chấm mốc trên timeline Kinh nghiệm
            nodes: nodeAnchors.map(place),
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

          // --- Cuộn tiếp: About -> góc trên phải thẻ Công nghệ (theo tiến độ cuộn, xoay thêm một vòng) ---
          if (techAnchor) {
            const vh = () => window.innerHeight;
            const s1 = () =>
              Math.max(1, g.about.y + g.about.h / 2 - vh() * 0.55);
            // Hoa nằm yên trong About tới khoảng 2/3 section (giữa khung nhìn chạm 2/3) rồi mới bay tiếp
            const leave = () =>
              g.aboutSection.y + g.aboutSection.h * (2 / 3) - vh() * 0.5;
            const techSlot = () => ({
              x: (g.tech?.x ?? 0) + ((g.tech?.w ?? 0) - g.hero.w) / 2,
              y: (g.tech?.y ?? 0) + ((g.tech?.h ?? 0) - g.hero.h) / 2,
              scale: (g.tech?.w ?? g.hero.w) / g.hero.w,
            });
            const s2 = () =>
              Math.max(
                s1() + 201,
                (g.tech ? g.tech.y + g.tech.h / 2 : 0) - vh() * 0.6,
              );

            gsap.fromTo(
              flyer,
              {
                x: () => g.about.x + (g.about.w - g.hero.w) / 2,
                y: () => g.about.y + (g.about.h - g.hero.h) / 2,
                scale: () => g.about.w / g.hero.w,
                rotation: 360,
              },
              {
                x: () => techSlot().x,
                y: () => techSlot().y,
                scale: () => techSlot().scale,
                rotation: 720,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: stage,
                  start: () => Math.min(Math.max(leave(), s1() + 1), s2() - 200),
                  end: s2,
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              },
            );

            // --- Mỗi dự án: khi cuộn tới đầu dự án, hoa từ vị trí trước đó (góc thẻ Công nghệ / dự án trước) bay nhẹ xuống ---
            // Tự chạy, KHÔNG theo tiến độ cuộn. x và y dùng easing khác nhau nên đường bay là đường cong.
            // Mỗi dự án một góc xoay màu (hue-rotate). Cả hai dự án hoa xoay vòng chậm (spin) khi đang ở khu vực dự án.
            const hues = [35, 150];
            const slot = (j: number) => ({
              x: g.projects[j].x + (g.projects[j].w - g.hero.w) / 2,
              y: g.projects[j].y + (g.projects[j].h - g.hero.h) / 2,
              scale: g.projects[j].w / g.hero.w,
            });

            // Mỗi cú bay là một timeline tạm dừng, dựng sẵn từ dự án trước tới dự án này (giá trị đầu/cuối rõ ràng).
            // Cuộn xuống thì play(), cuộn ngược thì reverse(): hoa bay NGƯỢC lại đúng đường cong, xoay và đổi màu ngược.
            projectAnchors.forEach((anchor, k) => {
              const article = anchor.closest("article");
              if (!article) return;
              const rot0 = 720 + 360 * k;
              const hop = gsap.timeline({
                paused: true,
                defaults: { duration: 1.6, immediateRender: false },
              });
              hop.fromTo(
                flyer,
                { x: k === 0 ? () => techSlot().x : () => slot(k - 1).x },
                { x: () => slot(k).x, ease: "power2.inOut" },
                0,
              );
              hop.fromTo(
                flyer,
                {
                  y: k === 0 ? () => techSlot().y : () => slot(k - 1).y,
                  scale: k === 0 ? () => techSlot().scale : () => slot(k - 1).scale,
                },
                { y: () => slot(k).y, scale: () => slot(k).scale, ease: "power1.inOut" },
                0,
              );
              hop.fromTo(
                flyer,
                { rotation: rot0, filter: `hue-rotate(${k === 0 ? 0 : hues[k - 1]}deg)` },
                { rotation: rot0 + 360, filter: `hue-rotate(${hues[k]}deg)`, ease: "power2.inOut" },
                0,
              );
              // Kích thước/vị trí ô đổi khi resize: tính lại giá trị đầu/cuối rồi giữ nguyên tiến độ
              const onRefresh = () => hop.invalidate();
              ScrollTrigger.addEventListener("refresh", onRefresh);
              ScrollTrigger.create({
                trigger: article,
                start: "top 70%",
                onEnter: () => hop.play(),
                onLeaveBack: () => hop.reverse(),
              });
              // Dọn khi matchMedia hoàn tác
              cleanups.push(() => ScrollTrigger.removeEventListener("refresh", onRefresh));
            });

            // --- Kinh nghiệm: hoa bay tới chấm mốc đầu của timeline (tự chạy, lùi được khi cuộn ngược),
            // rồi chạy dọc đường kẻ theo tiến độ cuộn tới chấm mốc cuối. ---
            if (nodeAnchors.length > 0) {
              const nodeSlot = (i: number) => ({
                x: g.nodes[i].x + (g.nodes[i].w - g.hero.w) / 2,
                y: g.nodes[i].y + (g.nodes[i].h - g.hero.h) / 2,
                scale: g.nodes[i].w / g.hero.w,
              });
              const last = projectAnchors.length - 1;
              const prev = () => (last >= 0 ? slot(last) : techSlot());
              const prevHue = last >= 0 ? hues[Math.min(last, hues.length - 1)] : 0;
              const rotN = 720 + 360 * projectAnchors.length;
              const n = nodeAnchors.length;

              const toNode = gsap.timeline({
                paused: true,
                defaults: { duration: 1.6, immediateRender: false },
              });
              toNode.fromTo(
                flyer,
                { x: () => prev().x },
                { x: () => nodeSlot(0).x, ease: "power2.inOut" },
                0,
              );
              toNode.fromTo(
                flyer,
                { y: () => prev().y, scale: () => prev().scale },
                { y: () => nodeSlot(0).y, scale: () => nodeSlot(0).scale, ease: "power1.inOut" },
                0,
              );
              toNode.fromTo(
                flyer,
                { rotation: rotN, filter: `hue-rotate(${prevHue}deg)` },
                { rotation: rotN + 360, filter: "hue-rotate(0deg)", ease: "power2.inOut" },
                0,
              );
              const onRefreshNode = () => toNode.invalidate();
              ScrollTrigger.addEventListener("refresh", onRefreshNode);
              cleanups.push(() => ScrollTrigger.removeEventListener("refresh", onRefreshNode));
              ScrollTrigger.create({
                trigger: nodeAnchors[0],
                start: "top 80%",
                onEnter: () => toNode.play(),
                onLeaveBack: () => toNode.reverse(),
              });

              if (n > 1) {
                const mid = (i: number) => g.nodes[i].y + g.nodes[i].h / 2;
                gsap.fromTo(
                  flyer,
                  { x: () => nodeSlot(0).x, y: () => nodeSlot(0).y, rotation: rotN + 360 },
                  {
                    x: () => nodeSlot(n - 1).x,
                    y: () => nodeSlot(n - 1).y,
                    rotation: rotN + 360 + 720,
                    ease: "none",
                    immediateRender: false,
                    scrollTrigger: {
                      trigger: stage,
                      start: () => mid(0) - vh() * 0.35,
                      end: () => Math.max(mid(0) - vh() * 0.35 + 1, mid(n - 1) - vh() * 0.35),
                      scrub: 0.6,
                      invalidateOnRefresh: true,
                    },
                  },
                );
              }
            }

            // Xoay vòng chậm từ khi hoa đậu ở thẻ Công nghệ tới hết khu vực dự án (xoay phần tử con nên không đụng tới tween bay)
            if (projectAnchors.length > 0) {
              const spin = gsap.to(intro, {
                rotation: "+=360",
                duration: 16,
                ease: "none",
                repeat: -1,
                paused: true,
              });
              const articles = projectAnchors.map((a) => a.closest("article") ?? a);
              ScrollTrigger.create({
                trigger: techAnchor.closest("article") ?? articles[0],
                start: "top 90%",
                endTrigger: nodeAnchors[nodeAnchors.length - 1] ?? articles[articles.length - 1],
                end: "bottom top",
                onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
              });
            }
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
            cleanups.forEach((fn) => fn());
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
