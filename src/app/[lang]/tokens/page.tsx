import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Design tokens",
  robots: { index: false },
};

// Trang tra cứu token khi phát triển. Mọi màu/chữ/bo góc ở đây đọc từ src/styles/tokens.css.

const colorTokens = [
  { name: "background", className: "bg-background" },
  { name: "card", className: "bg-card" },
  { name: "muted", className: "bg-muted" },
  { name: "border", className: "bg-border" },
  { name: "muted-foreground", className: "bg-muted-foreground" },
  { name: "foreground", className: "bg-foreground" },
  { name: "primary", className: "bg-primary" },
  { name: "emphasis", className: "bg-emphasis" },
  { name: "highlight", className: "bg-highlight" },
  { name: "glow", className: "bg-glow" },
  { name: "destructive", className: "bg-destructive" },
];

const textColorTokens = [
  { name: "text-foreground", className: "text-foreground text-base" },
  { name: "text-muted-foreground", className: "text-muted-foreground text-base" },
  { name: "text-highlight", className: "text-highlight text-base" },
  // emphasis chỉ dùng cho chữ lớn (≥ 24px)
  { name: "text-emphasis", className: "text-emphasis text-2xl font-semibold" },
];

const typeTokens = [
  { name: "text-display", className: "text-display", sample: "Frontend" },
  { name: "text-headline", className: "text-headline", sample: "Dự án chọn lọc" },
  { name: "text-title", className: "text-title", sample: "Orbit UI" },
  { name: "text-base", className: "text-base", sample: "Mình thích biến một Figma tĩnh thành trải nghiệm mượt ở 60fps." },
  { name: "text-eyebrow", className: "text-eyebrow uppercase", sample: "Web · Animation · WebGL" },
  { name: "font-mono", className: "font-mono text-sm", sample: "--accent: #ffa800" },
];

const radiusTokens = ["rounded-md", "rounded-lg", "rounded-card", "rounded-hero", "rounded-full"];

const easingTokens = [
  { name: "linear", className: "ease-linear" },
  { name: "ease-out-expo", className: "ease-out-expo" },
  { name: "ease-spring", className: "ease-spring" },
];

function Section({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-t border-border py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-headline">{title}</h2>
        <span className="text-eyebrow uppercase text-muted-foreground">{note}</span>
      </div>
      {children}
    </section>
  );
}

export default function TokensPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-eyebrow uppercase text-highlight">src/styles/tokens.css</p>
      </div>
      <h1 className="text-display mt-3 mb-10">
        Design <span className="text-serif-accent">tokens</span>
      </h1>

      <Section title="Màu" note="bg-* · text-* · border-*">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {colorTokens.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div className={`${c.className} h-16 rounded-lg border border-border`} />
              <code className="font-mono text-xs text-muted-foreground">{c.name}</code>
            </div>
          ))}
        </div>
        <div className="grid gap-3 rounded-card border border-border bg-card p-6 sm:grid-cols-2">
          {textColorTokens.map((t) => (
            <p key={t.name} className={t.className}>
              <code className="font-mono text-xs">{t.name}</code> · Chữ đọc được trên nền card
            </p>
          ))}
        </div>
      </Section>

      <Section title="Chữ" note="Manrope · Playfair Display italic · JetBrains Mono">
        <div className="flex flex-col gap-6">
          {typeTokens.map((t) => (
            <div key={t.name} className="flex flex-col gap-1 border-b border-dashed border-border pb-4">
              <code className="font-mono text-xs text-muted-foreground">{t.name}</code>
              <span className={t.className}>{t.sample}</span>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <code className="font-mono text-xs text-muted-foreground">text-serif-accent</code>
            <span className="text-headline">
              Cùng làm gì đó <span className="text-serif-accent">chuyển động</span> nhé?
            </span>
          </div>
        </div>
      </Section>

      <Section title="Bo góc" note="rounded-*">
        <div className="flex flex-wrap gap-4">
          {radiusTokens.map((r) => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div className={`${r} size-20 border border-border bg-card`} />
              <code className="font-mono text-xs text-muted-foreground">{r}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Chuyển động" note="Rê chuột vào khung để chạy">
        <div className="group grid gap-4 rounded-card border border-border bg-card p-6">
          {easingTokens.map((e) => (
            <div key={e.name} className="grid grid-cols-[120px_1fr] items-center gap-4">
              <code className="font-mono text-xs text-muted-foreground">{e.name}</code>
              <div className="relative h-1.5 rounded-full bg-border">
                <span
                  className={`${e.className} absolute top-1/2 left-0 size-4 -translate-y-1/2 rounded-full bg-primary transition-[left] duration-700 group-hover:left-[calc(100%-1rem)]`}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Bề mặt" note="grain · shadow-hero">
        <div
          className="grain flex min-h-56 items-end overflow-hidden rounded-hero p-8 text-hero-foreground shadow-hero"
          style={{ background: "radial-gradient(120% 90% at 30% 80%, var(--hero-from), var(--hero-via) 45%, var(--hero-to) 80%)" }}
        >
          <span className="text-title">
            Hero <span className="text-serif-accent">gradient</span>
          </span>
        </div>
      </Section>

      <Section title="Component shadcn" note="src/components/ui">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button className="rounded-full px-6">Pill</Button>
        </div>
      </Section>
    </div>
  );
}
