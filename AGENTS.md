<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio: hướng dẫn cho agent

Portfolio cá nhân của một Frontend Engineer (animation, 3D, design system). Style: hero là khung bo góc với gradient xanh nhiễu hạt chạy bằng shader, headline cỡ lớn có một cụm chữ nghiêng serif màu accent, phía dưới là lưới bento các widget tương tác. Bản mẫu tham khảo: `demo/style-demo.html` (HTML tĩnh, không phải code của app).

## Stack

- Next.js 16 (App Router, thư mục `src/`), React 19, TypeScript strict
- Tailwind CSS v4: cấu hình bằng CSS, **không có** `tailwind.config.*`
- shadcn/ui (style new-york, base Radix), dùng gói `cn` của shadcn để gộp class
- React Bits (cài qua shadcn CLI), GSAP + `@gsap/react`
- Chưa có backend. Mọi dữ liệu là file trong `src/content/`
- Song ngữ Anh / Việt, tự làm theo hướng dẫn i18n của Next (không dùng thư viện), `next-themes` cho theme

## Lệnh

| Việc | Lệnh |
|---|---|
| Chạy dev | `npm run dev` → http://localhost:3000 |
| Kiểm tra | `npm run lint` và `npm run build` (cả hai phải qua trước khi báo xong) |
| Thêm component shadcn | `npx shadcn@latest add <tên>` → `src/components/ui/` |
| Thêm component React Bits | `npx shadcn@latest add @react-bits/<Tên>-TS-TW` → `src/components/reactbits/` |

Với React Bits, luôn dùng biến thể **`-TS-TW`** (TypeScript + Tailwind), không dùng `-JS-*` hay `-*-CSS`.

## Cấu trúc

```
src/proxy.ts             Định tuyến ngôn ngữ (/ → rewrite /en, /en → redirect /, /vi giữ nguyên)
src/app/[lang]/          Mọi route nằm dưới [lang]. Root layout ở đây. /tokens là trang tra cứu token (không index, không dịch)
src/i18n/config.ts       locales, Localized, t(), localizedPath() (dùng được cả client)
src/i18n/server.ts       getLocale(), getDictionary() cho Server Component
src/i18n/dictionaries/   Chữ giao diện: en.ts (gốc) và vi.ts
src/lib/format.ts        Định dạng ngày theo ngôn ngữ
src/components/layout/   Nav, Footer
src/components/sections/ Mỗi section của trang chủ một file: Hero, About, Projects, DesignSystem, Contact
src/components/bento/    Widget trong lưới bento
src/components/ui/       shadcn (được sửa thoải mái, code thuộc dự án)
src/components/reactbits/ React Bits (như trên)
src/components/three/    Canvas WebGL, scene, wrapper cho shader
src/shaders/             File .glsl
src/content/             Dữ liệu: profile, experience, skills, projects (có kiểu trong types.ts)
src/styles/tokens.css    Design token (nguồn sự thật)
src/styles/tokens.ts     Bản JS của token cho shader / GSAP / Framer Motion
public/images/           Ảnh, quy tắc đặt tên ở docs/IMAGES.md
docs/DESIGN.md           Quy tắc thiết kế chi tiết
```

## Quy tắc bắt buộc

### Design token
- Không viết mã màu hex, `rgb()` hay font-family trực tiếp trong component. Dùng class từ token: `bg-background`, `bg-card`, `text-muted-foreground`, `text-primary`, `text-highlight`, `border-border`...
- Cỡ chữ tiêu đề dùng `text-display`, `text-headline`, `text-title`, `text-eyebrow`. Không tự đặt `text-[56px]`.
- Cụm chữ nghiêng nhấn mạnh dùng utility `text-serif-accent`, **tối đa một cụm mỗi tiêu đề**.
- Bo góc: `rounded-card` cho card, `rounded-hero` cho hero, `rounded-full` cho nút dạng pill.
- Cần token mới thì thêm vào `src/styles/tokens.css` (và `tokens.ts` nếu JS cần), đừng hard-code tại chỗ.
- **Hai theme light và dark**, mặc định light ở lần vào đầu (không theo hệ điều hành). Quản lý bằng `next-themes` (`src/components/layout/ThemeProvider.tsx`), nút đổi là `ThemeToggle`.
- Light ở `:root`, dark ở `.dark` trong `tokens.css`. Mọi token semantic phải có giá trị ở **cả hai** khối.
- Chữ màu accent dùng `text-emphasis`, **không** dùng `text-primary`. `text-emphasis` **chỉ cho chữ lớn** (≥ 24px, hoặc ≥ 19px đậm) vì ở light nó chỉ đạt 3.2:1. Chữ nhỏ cần nhấn thì dùng `text-foreground` kèm gạch chân hoặc chấm màu. `bg-primary` chỉ dùng làm nền nút với `text-primary-foreground`.
- Hero cũng theo theme: dùng `--hero-from/via/to` và `text-hero-foreground`. Shader lấy màu từ `themeColors[theme]` trong `tokens.ts`.
- Không dùng `dark:` để tô màu. Nếu một màu khác nhau giữa hai theme thì đó là token. `dark:` chỉ dùng để ẩn/hiện (ví dụ icon mặt trời/mặt trăng).
- Component client đọc theme bằng `useTheme()` phải tránh lệch hydration: đừng render text khác nhau theo theme ở lần render đầu.
- Kiểm tra mọi thay đổi giao diện ở cả hai theme.

### Chuyển động
- Easing: `ease-out-expo` cho chuyển cảnh, `ease-spring` cho tương tác (hover, nhấn). Trong JS lấy từ `src/styles/tokens.ts`.
- Chỉ animate `transform`, `opacity`, `filter`, `clip-path`. Không animate `width`, `height`, `top`, `left` trên phần tử lớn.
- Luôn tôn trọng `prefers-reduced-motion`: animation phải có trạng thái tĩnh hợp lý, shader dừng ở một khung đẹp.
- Nội dung phải đọc được ngay khi tải. Không để text ở `opacity: 0` chờ scroll mới hiện.
- Mỗi màn hình chỉ có một điểm "wow". Đừng chồng nhiều hiệu ứng lớn lên nhau.

### Server / Client component
- Mặc định là Server Component. Chỉ thêm `"use client"` ở component lá cần state, effect, sự kiện chuột hay WebGL.
- Three.js / R3F / GSAP chỉ chạy trong Client Component. Canvas nặng thì nạp bằng `next/dynamic` với `ssr: false`.

### Ngôn ngữ (i18n)
- Hai ngôn ngữ `en` (mặc định, URL không tiền tố) và `vi` (URL `/vi/...`). Không tự đoán ngôn ngữ theo trình duyệt.
- **Không viết cứng chữ hiển thị trong component.** Chữ giao diện lấy từ `getDictionary()`; nội dung cá nhân lấy từ `src/content/` qua `t(value, locale)`.
- Thêm khoá vào `en.ts` thì thêm luôn vào `vi.ts`. Text mới trong `src/content/` dùng `{ en, vi }`.
- Bản tiếng Việt do agent dịch phải được chủ dự án duyệt. Không bịa thông tin khi dịch.
- Link nội bộ luôn đi qua `localizedPath(locale, path)`.
- Server Component lấy ngôn ngữ bằng `getLocale()`. Client Component **nhận chữ và locale qua props**, không tự import từ điển.
- Ngày tháng dùng `formatYearMonth` / `formatPeriod` trong `src/lib/format.ts`.
- Kiểm tra mọi trang ở cả `/` và `/vi`.

### Nội dung và dữ liệu cá nhân
- Text hiển thị (tên, giới thiệu, kinh nghiệm, dự án) nằm trong `src/content/`, không viết cứng trong component.
- `docs/private/` chứa CV gốc và đã được gitignore. Được đọc để lấy thông tin, **không bao giờ** copy file đó vào `public/` hay commit.
- Không đưa lên trang: số điện thoại, địa chỉ nhà, ngày sinh, số giấy tờ, trừ khi chủ dự án yêu cầu rõ ràng. Email, LinkedIn, GitHub, thành phố thì được.
- Nội dung chưa có thì ghi rõ là dữ liệu mẫu, đừng bịa thành tích như thật.

### Font
- Mọi font phải có subset `vietnamese` (kiểm tra trước khi thêm). Font hiện tại: Manrope (sans), Playfair Display italic (serif nhấn), JetBrains Mono (mono), nạp bằng `next/font/google` trong `src/app/layout.tsx`.

### Ảnh
- Theo `docs/IMAGES.md`: chữ thường, không dấu, nối bằng gạch ngang. Hiển thị bằng `next/image`.

## Hoàn thành một việc nghĩa là

1. `npm run lint` và `npm run build` đều qua.
2. Đã mở trang trên trình duyệt ở cả desktop và bề ngang khoảng 375px, ở **cả light và dark**, ở **cả `/` và `/vi`**; không có thanh cuộn ngang.
3. Nếu sửa token: kiểm tra lại `/tokens`.
