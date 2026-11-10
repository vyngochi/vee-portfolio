<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio: hướng dẫn cho agent

Portfolio cá nhân của một Frontend Engineer (animation, 3D, design system). Style: hero là khung bo góc với gradient xanh nhiễu hạt chạy bằng shader, headline cỡ lớn có một cụm chữ nghiêng serif màu accent, phía dưới là lưới bento các widget tương tác. Bản mẫu tham khảo: `demo/style-demo.html` (HTML tĩnh, không phải code của app).

## Mục đích: portfolio để XIN VIỆC

Đây là portfolio để ứng tuyển vị trí frontend. **Mọi thành phần phải cho nhà tuyển dụng một thông tin thật về chủ dự án**: đã làm gì, ở đâu, kết quả, thành tích, kỹ năng có bằng chứng trong CV hoặc dự án.

- Trước khi thêm bất kỳ thứ gì, hỏi: "nhà tuyển dụng lướt 30 giây thì học được gì từ cái này?". Không trả lời được thì không thêm.
- **Không** thêm widget đồ chơi hay tự nói về chính trang web (đổi màu accent, minh hoạ easing, nút nam châm, "mỗi ô là một component sống"...).
- **Không** lặp lại cùng một thông tin ở nhiều chỗ.
- **Không** khẳng định kỹ năng mà CV / dự án không chứng minh.
- Hiệu ứng (shader, parallax, chuyển cảnh) chỉ là lớp nền làm trang có chất lượng, không bao giờ là nội dung.

## Tiến độ

`docs/ROADMAP.md` là nguồn sự thật về tiến độ. **Trước khi bắt đầu** đọc roadmap để biết việc tiếp theo và việc đang chờ chủ dự án. **Khi xong một việc**, tick nó trong roadmap ở cùng commit, ghi mã việc vào commit message (ví dụ `feat(nav): mobile menu [P1.3]`). Quyết định kiến trúc mới thì thêm một dòng vào "Nhật ký quyết định".

## Stack

- Next.js 16 (App Router, thư mục `src/`), React 19, TypeScript strict
- Tailwind CSS v4: cấu hình bằng CSS, **không có** `tailwind.config.*`
- shadcn/ui (style new-york, base Radix), dùng gói `cn` của shadcn để gộp class
- React Bits (cài qua shadcn CLI), GSAP + `@gsap/react`
- Chưa có backend. Mọi dữ liệu là file trong `src/content/`
- Song ngữ Anh / Việt, tự làm theo hướng dẫn i18n của Next (không dùng thư viện). Theme cũng tự làm, không dùng `next-themes`

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
src/lib/tech-icons.ts    Logo công nghệ (Simple Icons, CC0), khoá = tên trong skills.ts. Thêm công nghệ thì thêm logo ở đây
src/components/layout/   Nav, MobileMenu, Footer, Container, Section, ThemeToggle, LanguageSwitcher, theme-script
src/lib/sections.ts      Thứ tự và id các section trang chủ (homeSections), MAIN_ID, TOP_ID
src/components/brand/    Logo hoa (FlowerLogo, vector) và LogoStage (GSAP: hoa bay từ hero xuống About; điểm neo là data-logo-anchor (hero, about, project), chữ là data-logo-word)
src/components/projects/ BrowserFrame (khung trình duyệt: video / ảnh / iframe), dùng trong khối dự án ở Projects.tsx; media chọn bởi src/lib/project-media.ts
src/components/sections/ Mỗi section của trang chủ một file: Hero, About, Projects, Experience, Contact
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
docs/ROADMAP.md          Kế hoạch triển khai và tiến độ
```

## Quy tắc bắt buộc

### Design token
- Không viết mã màu hex, `rgb()` hay font-family trực tiếp trong component. Dùng class từ token: `bg-background`, `bg-card`, `text-muted-foreground`, `text-primary`, `text-highlight`, `border-border`...
- Cỡ chữ tiêu đề dùng `text-display`, `text-headline`, `text-title`, `text-eyebrow`. Không tự đặt `text-[56px]`.
- Cụm chữ nghiêng nhấn mạnh dùng utility `text-serif-accent`, **tối đa một cụm mỗi tiêu đề**.
- Bo góc: `rounded-card` cho card, `rounded-hero` cho hero, `rounded-full` cho nút dạng pill.
- Cần token mới thì thêm vào `src/styles/tokens.css` (và `tokens.ts` nếu JS cần), đừng hard-code tại chỗ.
- **Hai theme light và dark**, mặc định **dark** ở lần vào đầu (không theo hệ điều hành): `<html>` được server render sẵn class `dark`. Một inline script trong `<head>` (`src/components/layout/theme-script.ts`) đọc `localStorage["theme"]` và chỉ bỏ class `dark` khi người xem đã chọn light, trước khi trang hiện, theo hướng dẫn "Preventing flash before hydration" của Next. Nút đổi là `ThemeToggle`, dùng `applyTheme()`. **Không cài lại `next-themes`**: nó gây cảnh báo "Encountered a script tag" với React 19.
- Light ở `:root`, dark ở `.dark` trong `tokens.css`. Mọi token semantic phải có giá trị ở **cả hai** khối.
- Chữ màu accent dùng `text-emphasis`, **không** dùng `text-primary`. `text-emphasis` **chỉ cho chữ lớn** (≥ 24px, hoặc ≥ 19px đậm) vì ở light nó chỉ đạt 3.2:1. Chữ nhỏ cần nhấn thì dùng `text-foreground` kèm gạch chân hoặc chấm màu. `bg-primary` chỉ dùng làm nền nút với `text-primary-foreground`.
- Hero cũng theo theme: dùng `--hero-from/via/to` và `text-hero-foreground`. Shader lấy màu từ `themeColors[theme]` trong `tokens.ts`.
- Không dùng `dark:` để tô màu. Nếu một màu khác nhau giữa hai theme thì đó là token. `dark:` chỉ dùng để ẩn/hiện (ví dụ icon mặt trời/mặt trăng).
- Server không biết theme của người xem. Đừng render text hay thuộc tính khác nhau theo theme; dùng CSS (`dark:hidden`, token) để thể hiện khác biệt. Code client cần biết theme thì đọc `document.documentElement.classList.contains("dark")` trong effect hoặc event handler.
- Kiểm tra mọi thay đổi giao diện ở cả hai theme.

### Chuyển động
- Easing: `ease-out-expo` cho chuyển cảnh, `ease-spring` cho tương tác (hover, nhấn). Trong JS lấy từ `src/styles/tokens.ts`.
- Chỉ animate `transform`, `opacity`, `filter`, `clip-path`. Không animate `width`, `height`, `top`, `left` trên phần tử lớn.
- Luôn tôn trọng `prefers-reduced-motion`: animation phải có trạng thái tĩnh hợp lý, shader dừng ở một khung đẹp.
- Nội dung phải đọc được ngay khi tải. Không để text ở `opacity: 0` chờ scroll mới hiện.
- Mỗi màn hình chỉ có một điểm "wow". Đừng chồng nhiều hiệu ứng lớn lên nhau.

### Cache Components
- `next.config.ts` bật `cacheComponents` và `partialPrefetching`. Không gọi `new Date()`, `Date.now()`, `Math.random()`, `crypto.randomUUID()` trực tiếp khi render: bọc trong `"use cache"` (giá trị tính lúc build, xem `CurrentYear.tsx`) hoặc chuyển vào effect / event handler.
- Route chỉ để báo lỗi (như `[lang]/[...rest]`) export `instant = false` để tắt kiểm tra instant navigation.
- Dev overlay báo "Issue" thì phải xử lý, không bỏ qua.

### WebGL / shader
- Hero dùng WebGL thuần (`src/components/three/HeroShader.tsx`, shader trong `src/shaders/*.ts`). Chỉ thêm Three.js / R3F khi làm scene 3D thật.
- **Chuỗi GLSL chỉ chứa ký tự ASCII**, kể cả comment. Có dấu tiếng Việt là shader không biên dịch được.
- Không gọi `WEBGL_lose_context.loseContext()` khi cleanup: Strict Mode chạy effect hai lần trên cùng canvas, lần sau sẽ nhận context đã chết.
- Mọi canvas phải: dừng vẽ khi ra khỏi màn hình / tab ẩn, giới hạn pixel ratio, có fallback CSS khi không có WebGL, đứng yên khi giảm chuyển động.

### Ảnh trong suốt
- Ảnh PNG/WebP có nền trong suốt dùng `next/image` với `unoptimized` (bộ tối ưu của Next đang trả JPEG làm mất nền). Bù lại, tự cắt sát và nén file trước khi đưa vào `public/`.
- Ảnh là phần tử lớn nhất trong khung hình đầu (LCP) thì dùng `preload` (Next 16 bỏ `priority`).

### Lint của React Compiler
- `react-hooks/immutability` không cho sửa `document` / biến ngoài component ngay trong thân component. Đặt thao tác DOM vào một hàm ở cấp module (ví dụ `applyTheme`, `applyAccent`) rồi gọi từ event handler.
- Đọc trạng thái DOM (class, data-*) trong component bằng `useSyncExternalStore` thay vì `useEffect` + `setState`.

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
- Mọi font phải có subset `vietnamese` (kiểm tra trước khi thêm). Font hiện tại: Manrope (sans), Playfair Display italic (serif nhấn), Anton (`font-poster`, chữ PORTFOLIO cực lớn ở hero), JetBrains Mono (mono), nạp bằng `next/font/google` trong `src/app/[lang]/layout.tsx`.
- Chữ chỉ vẽ viền (`-webkit-text-stroke`) phải dùng **font tĩnh** (như Anton). Font biến thể (Manrope...) có nét chồng nhau, vẽ viền sẽ lộ đường thừa bên trong chữ.

### Sự cố dev server trên Windows
- Log báo `EPERM: operation not permitted, rename ... .next\dev\...` hoặc trang trả CSS cũ / `Unexpected end of JSON input`: bộ nhớ đệm `.next` bị hỏng do file bị khoá. Dừng server, xoá `.next`, chạy lại `npm run dev`. Không chạy `npm run build` khi dev server đang chạy.

### Ảnh
- Theo `docs/IMAGES.md`: chữ thường, không dấu, nối bằng gạch ngang. Hiển thị bằng `next/image`.

### Khi việc cần ảnh hoặc video: hỏi rồi làm tiếp bằng ảnh tạm
Agent không tự tạo, tải hay lấy ảnh từ nơi khác để thay ảnh của chủ dự án.

1. **Kiểm tra trước:** xem `public/images/` đã có file đúng tên theo `docs/IMAGES.md` chưa. Có rồi thì dùng luôn.
2. **Thiếu thì hỏi ngay** trong câu trả lời, đúng mẫu sau (gom mọi ảnh thiếu của việc đó vào một lần hỏi):
   > 📷 **Cần ảnh cho P4.8**
   > - `public/images/projects/evcare/demo.mp4`: video 16:10, 5–10 giây, không tiếng, dưới 3 MB
   > - Dùng ở: BrowserFrame trên trang chi tiết EVCare
   > - Gợi ý: quay đoạn xoay mô hình 3D trạng thái xe
3. **Làm tiếp bằng ảnh tạm:** placeholder đúng tỉ lệ, màu từ token (`bg-muted`, viền `border-border`), ghi rõ chữ "Placeholder" và tên file đang chờ. Không dùng ảnh stock hay ảnh AI làm placeholder. Code phải sẵn sàng để chỉ cần đặt file đúng tên là ảnh thật hiện ra.
4. **Chưa tick xong:** trong `docs/ROADMAP.md`, việc đó để `[~]` kèm ghi chú "chờ ảnh", và thêm ảnh còn thiếu vào bảng "Chờ chủ dự án". Chỉ tick `[x]` khi ảnh thật đã vào.
5. **Khi chủ dự án gửi ảnh:**
   - Đổi tên và đặt đúng chỗ theo `docs/IMAGES.md`.
   - Kiểm tra tỉ lệ và dung lượng; báo lại nếu lệch nhiều so với yêu cầu thay vì tự cắt mất nội dung quan trọng.
   - **Xoá metadata EXIF** (nhất là toạ độ GPS) của ảnh chụp trước khi commit.
   - Gỡ placeholder, tick việc trong roadmap, xoá dòng tương ứng khỏi bảng "Chờ chủ dự án".
6. **Ngoại lệ, phải dừng và chờ:** khi thiết kế phụ thuộc vào chính nội dung ảnh (ví dụ bố cục About tuỳ ảnh chân dung dọc hay ngang, hoặc màu cần hợp với ảnh). Khi đó hỏi, nói rõ đang chờ gì, và chuyển sang việc khác trong roadmap không phụ thuộc ảnh đó.

## Hoàn thành một việc nghĩa là

1. `npm run lint` và `npm run build` đều qua.
2. Đã mở trang trên trình duyệt ở cả desktop và bề ngang khoảng 375px, ở **cả light và dark**, ở **cả `/` và `/vi`**; không có thanh cuộn ngang.
3. Nếu sửa token: kiểm tra lại `/tokens`.
