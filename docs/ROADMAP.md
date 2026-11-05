# Roadmap

Kế hoạch triển khai và theo dõi tiến độ toàn dự án. **Đây là nguồn sự thật về tiến độ**: xong việc nào thì tick việc đó trong cùng commit.

**Trạng thái:** `[x]` xong · `[~]` đang làm · `[ ]` chưa làm · ⏳ chờ chủ dự án · 🔒 bị chặn bởi việc khác

**Ảnh:** việc cần ảnh mà chưa có thì làm tiếp bằng placeholder, để `[~]` kèm "chờ ảnh" cho tới khi ảnh thật vào (quy tắc đầy đủ trong `AGENTS.md`).

**Quy ước:** mỗi việc có mã (ví dụ `P2.3`) để nhắc trong commit message (`feat(hero): shader gradient [P2.3]`). Mỗi giai đoạn chỉ được coi là xong khi đạt hết **Tiêu chí xong** của giai đoạn đó, cộng với "Hoàn thành một việc" trong `AGENTS.md`.

---

## Tổng quan

| Giai đoạn | Nội dung | Trạng thái |
|---|---|---|
| P0 | Nền tảng | ✅ Xong |
| P1 | Khung trang: layout, Nav, Footer | ⬜ Tiếp theo |
| P2 | Hero: headline + shader gradient | ⬜ |
| P3 | About / Bento | ⬜ |
| P4 | Projects: danh sách, BrowserFrame, trang chi tiết | ⬜ |
| P5 | Experience & Activities | ⬜ |
| P6 | Contact | ⬜ |
| P7 | SEO & metadata | ⬜ |
| P8 | Chất lượng: a11y, hiệu năng, kiểm thử | ⬜ |
| P9 | Deploy | ⬜ |

Thứ tự trang chủ: **Hero → About (bento) → Projects → Experience → Contact → Footer**.

---

## P0 · Nền tảng ✅

- [x] **P0.1** Khởi tạo Next.js 16, TypeScript, Tailwind v4, cấu trúc thư mục
- [x] **P0.2** Design token ba tầng, hai theme light (mặc định) / dark, trang `/tokens`
- [x] **P0.3** Nút đổi theme có hiệu ứng lan tròn, script chống chớp màu (không dùng next-themes)
- [x] **P0.4** shadcn/ui (gói `cn`), React Bits (biến thể TS-TW)
- [x] **P0.5** i18n: `/` tiếng Anh, `/vi` tiếng Việt, proxy, từ điển, nút EN / VI
- [x] **P0.6** Nội dung từ CV trong `src/content/`, song ngữ, có kiểu dữ liệu
- [x] **P0.7** Tài liệu agent: `AGENTS.md`, `CLAUDE.md`, `docs/DESIGN.md`, `docs/IMAGES.md`
- [x] **P0.8** Git, repo GitHub `vyngochi/vee-portfolio`

---

## P1 · Khung trang

Mục tiêu: trang chủ có khung hoàn chỉnh với các section rỗng, điều hướng chạy được ở mọi kích thước màn hình.

- [ ] **P1.1** Component `Container` (độ rộng tối đa, lề 16px ở mobile) và `Section` (id để neo, tiêu đề dùng `text-headline` + `text-serif-accent`)
- [ ] **P1.2** `Nav`: logo/tên, link neo tới các section, `LanguageSwitcher`, `ThemeToggle`. Dính đầu trang, nền mờ khi cuộn
- [ ] **P1.3** Menu mobile (dưới 768px): nút mở, khoá cuộn, đóng bằng Esc, focus trap
- [ ] **P1.4** Link "Bỏ qua đến nội dung" (skip link) cho bàn phím
- [ ] **P1.5** `Footer`: email, mạng xã hội, ©, nút lên đầu trang
- [ ] **P1.6** Dựng trang chủ với 5 section rỗng có tiêu đề song ngữ; xoá trang tạm hiện tại
- [ ] **P1.7** Trang 404 song ngữ (`[lang]/not-found.tsx`)
- [ ] **P1.8** Quyết định smooth scroll: CSS `scroll-behavior` hay Lenis (Lenis chỉ nếu P2/P4 cần đồng bộ với scroll)

**Tiêu chí xong:** bấm link trong Nav cuộn đúng section ở cả `/` và `/vi`; menu mobile dùng được hoàn toàn bằng bàn phím; không có thanh cuộn ngang ở 375px.

---

## P2 · Hero

Mục tiêu: điểm "wow" của trang, tham khảo `demo/style-demo.html`.

- [ ] **P2.1** Bố cục: khung `rounded-hero` + `grain` + `shadow-hero`, headline `text-display` so le hai dòng, cụm `text-serif-accent`, dãy thông tin `text-eyebrow`, scroll cue
- [ ] **P2.2** Nền gradient CSS theo token `hero-from/via/to`: là bản tĩnh và cũng là fallback
- [ ] **P2.3** Shader gradient nhiễu hạt (Three.js, fragment shader fbm), nạp bằng `next/dynamic` với `ssr: false`
- [ ] **P2.4** Shader theo theme: đọc `themeColors` trong `tokens.ts`, đổi màu mượt khi đổi theme
- [ ] **P2.5** Tương tác chuột: ánh sáng đi theo con trỏ (lerp); trên cảm ứng thì tự trôi
- [ ] **P2.6** Hiệu năng: dừng render khi hero ra khỏi màn hình hoặc tab ẩn, giới hạn pixel ratio, giảm độ phân giải trên mobile
- [ ] **P2.7** `prefers-reduced-motion`: shader đứng yên ở một khung đẹp, headline không chạy animation
- [ ] **P2.8** Headline hiện ra bằng animation `rise` (hoặc SplitText của React Bits), chữ luôn đọc được kể cả khi JS chưa chạy

**Tiêu chí xong:** đẹp ở cả hai theme; tắt JS vẫn thấy hero tĩnh đầy đủ chữ; shader không làm tụt FPS khi cuộn trên laptop tầm trung.

**Quyết định cần chốt:** Three.js thuần (nhẹ hơn, đủ cho một shader phẳng) hay React Three Fiber (tiện nếu sau này thêm scene 3D). Đề xuất: **Three.js thuần** cho hero; R3F chỉ khi làm scene 3D ở P4.

---

## P3 · About / Bento

Mục tiêu: lưới bento các widget sống, dữ liệu lấy từ `src/content/`.

- [ ] **P3.1** Lưới bento responsive: 4 cột → 2 cột → 1 cột
- [ ] **P3.2** Thẻ About: `profile.summary` + chip tech stack từ `skills.ts`
- [ ] **P3.3** Thẻ Design token: đổi màu accent trực tiếp (`accentPresets`), cả trang và shader đổi theo
- [ ] **P3.4** Thẻ Motion: so sánh easing linear / ease-out-expo / ease-spring
- [ ] **P3.5** Thẻ nút nam châm (magnetic button)
- [ ] **P3.6** Thẻ học vấn: FPT University, GPA, năm tốt nghiệp dự kiến
- [ ] **P3.7** Thẻ giờ địa phương + trạng thái nhận việc ⏳ (cần thành phố)
- [ ] **P3.8** Hiệu ứng spotlight theo chuột trên thẻ (chỉ thiết bị có hover)

**Tiêu chí xong:** mọi chữ lấy từ content/từ điển; widget dùng được bằng bàn phím; reduced motion tắt các chuyển động lặp.

---

## P4 · Projects

Mục tiêu: khoe dự án thật, có khung xem web động và trang chi tiết.

- [ ] **P4.1** Danh sách dự án `featured` dạng hàng lớn, số thứ tự, tag, năm
- [ ] **P4.2** Preview ảnh/video bay theo chuột khi hover (ẩn trên cảm ứng)
- [ ] **P4.3** Component `BrowserFrame`: khung cửa sổ trình duyệt theo token, ba chế độ:
  - video lặp tự động, không tiếng (mặc định)
  - ảnh screenshot tự cuộn
  - iframe trang thật, chỉ nạp khi bấm "Xem trực tiếp" (nhiều trang chặn nhúng)
- [ ] **P4.4** Trang chi tiết `/projects/[slug]` và `/vi/projects/[slug]`, dựng sẵn bằng `generateStaticParams`
- [ ] **P4.5** Nội dung trang chi tiết: vai trò, thời gian, nhóm, mô tả, điểm nổi bật, stack, link GitHub / trang thật, `BrowserFrame`
- [ ] **P4.6** Điều hướng dự án trước / sau
- [ ] **P4.7** Dự án `confidential` (Hito Compass): không có trang chi tiết, không screenshot, chỉ hiện ở Experience
- [ ] **P4.8** Ảnh và video thật ⏳ (cover + `demo.mp4` cho BeeWise, EVCare)
- [ ] **P4.9** (Tuỳ chọn) Scene 3D nhỏ cho EVCare, gợi lại tính năng 3D của dự án

**Tiêu chí xong:** chưa có ảnh vẫn hiển thị đẹp bằng placeholder; trang chi tiết có metadata riêng; video không tự phát khi bật reduced motion.

---

## P5 · Experience & Activities

- [ ] **P5.1** Timeline kinh nghiệm từ `experience.ts`: công ty, vai trò, thời gian (`formatPeriod`), tóm tắt, điểm nổi bật, stack
- [ ] **P5.2** Liên kết sang trang dự án qua `projectSlug` (trừ dự án confidential)
- [ ] **P5.3** Hoạt động & giải thưởng từ `activities`
- [ ] **P5.4** Animation hiện dần khi cuộn, nhưng nội dung luôn hiện sẵn (không chờ observer)

**Tiêu chí xong:** ngày tháng đúng định dạng ở cả hai ngôn ngữ; đọc tốt ở 375px.

---

## P6 · Contact

- [ ] **P6.1** Headline lớn có cụm serif nhấn, email kèm nút Copy (có phản hồi "Đã copy")
- [ ] **P6.2** Link GitHub, LinkedIn
- [ ] **P6.3** Form liên hệ ⏳ (chờ chọn Formspree / Web3Forms, hay chỉ email)
- [ ] **P6.4** Nút tải CV ⏳ (chờ bản CV công khai không có số điện thoại trong `public/cv/`)

**Tiêu chí xong:** gửi form thử thành công (nếu có form); báo lỗi rõ ràng khi gửi thất bại.

---

## P7 · SEO & metadata

- [ ] **P7.1** Metadata từng trang theo ngôn ngữ (title, description, canonical, hreflang)
- [ ] **P7.2** Ảnh khi share link tạo bằng `next/og`, theo ngôn ngữ, theo đúng design token
- [ ] **P7.3** `sitemap.ts` có cả bản `en` và `vi`; `robots.ts`; chặn index `/tokens`
- [ ] **P7.4** Favicon: `src/app/icon.png`, `apple-icon.png` (thay favicon mặc định của Next)
- [ ] **P7.5** JSON-LD `Person` (tên, vai trò, link mạng xã hội)

**Tiêu chí xong:** chia sẻ link lên LinkedIn / Facebook hiện ảnh và tiêu đề đúng ngôn ngữ.

---

## P8 · Chất lượng

- [ ] **P8.1** Accessibility: điều hướng bằng bàn phím toàn trang, focus nhìn thấy được, tương phản đạt AA, `alt` cho ảnh
- [ ] **P8.2** Kiểm tra reduced motion trên toàn trang
- [ ] **P8.3** Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] **P8.4** Kiểm tra ma trận: 2 theme × 2 ngôn ngữ × (desktop, 375px) trên Chrome, Safari, Firefox
- [ ] **P8.5** Dọn dẹp: gỡ component và dependency không dùng (ví dụ SplitText nếu không dùng), xoá file `.gitkeep` thừa
- [ ] **P8.6** Chủ dự án duyệt toàn bộ bản tiếng Việt ⏳

---

## P9 · Deploy

- [ ] **P9.1** Kết nối repo GitHub với Vercel, mỗi PR có bản preview
- [ ] **P9.2** Biến môi trường `NEXT_PUBLIC_SITE_URL`
- [ ] **P9.3** Tên miền ⏳ (chờ chọn tên miền)
- [ ] **P9.4** (Tuỳ chọn) Vercel Analytics / Speed Insights

**Tiêu chí xong:** trang chạy ở tên miền thật, cả `/` và `/vi`, chia sẻ link hiện đúng ảnh.

---

## Chờ chủ dự án ⏳

| Việc | Cần cho | Ghi chú |
|---|---|---|
| Tên có dấu | P1, P2 | CV viết "Ngo Chi Vy" |
| Thành phố | P3.7 | Có thể bỏ thẻ giờ địa phương nếu không muốn công khai |
| Link BeeWise | P4.5 | Nếu sản phẩm được công khai |
| Ảnh chân dung | P3 | `profile/portrait.jpg`, `avatar.jpg` |
| Ảnh + video dự án | P4.8 | Xem `docs/IMAGES.md` |
| Chọn cách liên hệ | P6.3 | Formspree / Web3Forms / chỉ email |
| CV công khai | P6.4 | Bản PDF không có số điện thoại |
| Duyệt bản tiếng Việt | P8.6 | Toàn bộ `vi` trong `src/content/` và `src/i18n/dictionaries/vi.ts` |
| Tên miền | P9.3 | |

---

## Nhật ký quyết định

| Ngày | Quyết định | Lý do |
|---|---|---|
| 2026-11-05 | Next.js thay vì Astro | Chứng minh stack nhà tuyển dụng hay yêu cầu, AI vibe code ổn định |
| 2026-11-05 | Style: hero gradient nhiễu hạt + bento + design system | Kết hợp ảnh tham khảo với ba thế mạnh animation, 3D, design system |
| 2026-11-05 | Hai theme, light mặc định, hero theo theme | Dễ đọc với nhà tuyển dụng; hero giữ điểm nhấn ở cả hai theme |
| 2026-11-05 | Playfair Display thay Instrument Serif | Instrument Serif không có dấu tiếng Việt |
| 2026-11-05 | Emphasis light `#e85d04` | Tươi hơn; chỉ dùng cho chữ lớn vì tương phản 3.2:1 |
| 2026-11-05 | Gói `cn` của shadcn thay clsx + tailwind-merge | Mặc định của shadcn CLI mới |
| 2026-11-05 | i18n tự làm, `/` tiếng Anh, `/vi` tiếng Việt, không tự đoán ngôn ngữ | Không cần thư viện; một URL cho mỗi ngôn ngữ, tốt cho SEO |
| 2026-11-05 | Bỏ next-themes, dùng inline script | next-themes gây cảnh báo script tag với React 19 |
| 2026-11-05 | Dữ liệu là file TS trong `src/content/`, không backend | Đủ cho portfolio, có kiểu, dễ nâng lên Keystatic sau |
