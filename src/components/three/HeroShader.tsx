"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { heroFragmentShader, heroVertexShader } from "@/shaders/hero-gradient";
import { heroShaderPalette, themeColors } from "@/styles/tokens";

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB | null {
  const m = hex.trim().match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : null;
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Nền gradient nhiễu hạt chạy bằng WebGL thuần (không thư viện) cho hero. [P2.3–P2.7]
 * - Màu theo theme, chuyển mượt khi đổi theme (theo dõi class "dark" trên <html>).
 * - Quầng sáng theo chuột (chỉ chuột thật); cảm ứng thì tự trôi.
 * - Dừng vẽ khi hero ra khỏi màn hình hoặc tab bị ẩn; giới hạn pixel ratio, mobile vẽ ở 1x.
 * - Giảm chuyển động: vẽ một khung tĩnh, chỉ vẽ lại khi đổi theme / kích thước.
 * Không có WebGL thì canvas giữ trong suốt, gradient CSS của hero vẫn hiện.
 */
export function HeroShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, heroVertexShader);
    const fs = compile(gl, gl.FRAGMENT_SHADER, heroFragmentShader);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Hai tam giác phủ kín khung
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const loc = {
      time: u("uTime"),
      res: u("uRes"),
      mouse: u("uMouse"),
      c0: u("uC0"),
      c1: u("uC1"),
      c2: u("uC2"),
      c3: u("uC3"),
      accent: u("uAccent"),
      grain: u("uGrain"),
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    // Màu hiện tại (current) chạy dần về màu đích (target) để đổi theme mượt
    const readTarget = (): { colors: RGB[]; accent: RGB; grain: number } => {
      const theme = root.classList.contains("dark") ? "dark" : "light";
      const p = heroShaderPalette[theme];
      const accent = hexToRgb(getComputedStyle(root).getPropertyValue("--primary")) ?? hexToRgb(themeColors[theme].primary)!;
      return {
        colors: [p.c0, p.c1, p.c2, p.c3].map((c) => hexToRgb(c)!) as RGB[],
        accent,
        grain: p.grain,
      };
    };
    let target = readTarget();
    const current = {
      colors: target.colors.map((c) => [...c]) as RGB[],
      accent: [...target.accent] as RGB,
      grain: target.grain,
    };

    const mouseTarget = { x: 0.35, y: 0.3 };
    const mouse = { x: 0.35, y: 0.3 };
    let hasPointer = false;

    const resize = () => {
      const dprCap = window.innerWidth < 768 ? 1 : 1.5;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
    const start = performance.now();

    const draw = (now: number) => {
      const t = reduceMotion ? 3 : (now - start) / 1000;
      const k = reduceMotion ? 1 : 0.06;

      if (!hasPointer && !reduceMotion) {
        mouseTarget.x = 0.4 + Math.sin(t * 0.21) * 0.18;
        mouseTarget.y = 0.35 + Math.cos(t * 0.17) * 0.15;
      }
      mouse.x = lerp(mouse.x, mouseTarget.x, reduceMotion ? 1 : 0.04);
      mouse.y = lerp(mouse.y, mouseTarget.y, reduceMotion ? 1 : 0.04);

      current.colors.forEach((c, i) => c.forEach((v, j) => (c[j] = lerp(v, target.colors[i][j], k))));
      current.accent.forEach((v, j) => (current.accent[j] = lerp(v, target.accent[j], k)));
      current.grain = lerp(current.grain, target.grain, k);

      gl.uniform1f(loc.time, t);
      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform2f(loc.mouse, mouse.x, mouse.y);
      gl.uniform3fv(loc.c0, current.colors[0]);
      gl.uniform3fv(loc.c1, current.colors[1]);
      gl.uniform3fv(loc.c2, current.colors[2]);
      gl.uniform3fv(loc.c3, current.colors[3]);
      gl.uniform3fv(loc.accent, current.accent);
      gl.uniform1f(loc.grain, current.grain);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!canvas.dataset.ready) canvas.dataset.ready = "true";
    };

    // Vòng lặp chỉ chạy khi hero đang hiện trên màn hình và tab đang mở
    let frame = 0;
    let inView = true;
    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (reduceMotion) {
        draw(performance.now());
      } else if (inView && !document.hidden) {
        frame = requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      hasPointer = true;
      mouseTarget.x = (e.clientX - r.left) / r.width;
      mouseTarget.y = 1 - (e.clientY - r.top) / r.height;
    };
    const onPointerLeave = () => {
      hasPointer = false;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now());
    });
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    // Đổi theme (class) hoặc đổi accent (style) trên <html>
    const themeObserver = new MutationObserver(() => {
      target = readTarget();
      if (reduceMotion) draw(performance.now());
    });

    resize();
    resizeObserver.observe(canvas);
    intersection.observe(host);
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class", "style"] });
    document.addEventListener("visibilitychange", sync);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    sync();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      // Không gọi WEBGL_lose_context.loseContext(): Strict Mode chạy effect hai lần trên cùng canvas,
      // context đã bị huỷ thì lần chạy sau không biên dịch được shader. Trình duyệt tự giải phóng khi canvas bị gỡ.
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none opacity-0 transition-opacity duration-1000 ease-out-expo data-[ready]:opacity-100",
        className,
      )}
    />
  );
}
