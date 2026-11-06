# Roadmap

Kế hoạch triển khai và theo dõi tiến độ toàn dự án. **Đây là nguồn sự thật về tiến độ**: xong việc nào thì tick việc đó trong cùng commit.

**Trạng thái:** `[x]` xong · `[~]` đang làm · `[ ]` chưa làm · ⏳ chờ chủ dự án · 🔒 bị chặn bởi việc khác

**Ảnh:** việc cần ảnh mà chưa có thì làm tiếp bằng placeholder, để `[~]` kèm "chờ ảnh" cho tới khi ảnh thật vào (quy tắc đầy đủ trong `AGENTS.md`).

**Quy ước:** mỗi việc có mã (ví dụ `P2.3`) để nhắc trong commit message (`feat(hero): shader gradient [P2.3]`). Mỗi giai đoạn chỉ được coi là xong khi đạt hết **Tiêu chí xong** của giai đoạn đó, cộng với "Hoàn thành một việc" trong `AGENTS.md`.

---

## Tổng quan

| Giai đoạn | Nội dung                                          | Trạng thái   |
| --------- | ------------------------------------------------- | ------------ |
| P0        | Nền tảng                                          | ✅ Xong      |
| P1        | Khung trang: layout, Nav, Footer                  | ✅ Xong      |
| P2        | Hero: ảnh chân dung + shader gradient             | ✅ Xong      |
| P3        | About / Bento                                     | ✅ Xong      |
| P4        | Projects: danh sách, BrowserFrame, trang chi tiết | ⬜ Tiếp theo |
| P5        | Experience & Activities                           | ⬜           |
| P6        | Contact                                           | ⬜           |
| P7        | SEO & metadata                                    | ⬜           |
| P8        | Chất lượng: a11y, hiệu năng, kiểm thử             | ⬜           |
| P9        | Deploy                                            | ⬜           |

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

## P1 · Khung trang ✅

Mục tiêu: trang chủ có khung hoàn chỉnh với các section rỗng, điều hướng chạy được ở mọi kích thước màn hình.

- [x] **P1.1** Component `Container` (độ rộng tối đa, lề 16px ở mobile) và `Section` (id để neo, tiêu đề dùng `text-headline` + `text-serif-accent`)
- [x] **P1.2** `Nav`: logo/tên, link neo tới các section, `LanguageSwitcher`, `ThemeToggle`. Dính đầu trang, nền mờ khi cuộn
- [x] **P1.3** Menu mobile (dưới 768px): nút mở, khoá cuộn, đóng bằng Esc, focus trap
- [x] **P1.4** Link "Bỏ qua đến nội dung" (skip link) cho bàn phím
- [x] **P1.5** `Footer`: email, mạng xã hội, ©, nút lên đầu trang
- [x] **P1.6** Dựng trang chủ với 5 section rỗng có tiêu đề song ngữ; xoá trang tạm hiện tại
- [x] **P1.7** Trang 404 song ngữ (`[lang]/not-found.tsx`)
- [x] **P1.8** Smooth scroll: dùng CSS `scroll-behavior` (tắt khi reduced motion). Chỉ thêm Lenis nếu P2/P4 cần đồng bộ animation với scroll

**Tiêu chí xong:** bấm link trong Nav cuộn đúng section ở cả `/` và `/vi`; menu mobile dùng được hoàn toàn bằng bàn phím; không có thanh cuộn ngang ở 375px.

---

## P2 · Hero ✅

Mục tiêu: điểm "wow" của trang, tham khảo `demo/style-demo.html`.

- [x] **P2.1** Bố cục: khung `rounded-hero` + `grain` + `shadow-hero`, headline `text-display` so le hai dòng, cụm `text-serif-accent`, dãy thông tin `text-eyebrow`, scroll cue
- [x] **P2.2** Nền gradient CSS theo token `hero-from/via/to`: là bản tĩnh và cũng là fallback
- [x] **P2.3** Shader gradient nhiễu hạt bằng WebGL thuần (fragment shader fbm), không dùng thư viện
- [x] **P2.4** Shader theo theme: đọc `themeColors` trong `tokens.ts`, đổi màu mượt khi đổi theme
- [x] **P2.5** Tương tác chuột: ánh sáng đi theo con trỏ (lerp); trên cảm ứng thì tự trôi
- [x] **P2.6** Hiệu năng: dừng render khi hero ra khỏi màn hình hoặc tab ẩn, giới hạn pixel ratio, giảm độ phân giải trên mobile
- [x] **P2.7** `prefers-reduced-motion`: shader đứng yên ở một khung đẹp, headline không chạy animation
- [x] **P2.8** Headline hiện ra bằng animation `rise` (CSS), chữ luôn đọc được kể cả khi JS chưa chạy
- [x] **P2.9** Ảnh chân dung tách nền trong hero. Tên một khối một màu ở cột trái (không bao giờ bị ảnh che), chữ trang trí "PORTFOLIO" nằm sau người, tagline có cụm serif nhấn, parallax theo chuột

**Tiêu chí xong:** đẹp ở cả hai theme; tắt JS vẫn thấy hero tĩnh đầy đủ chữ; shader không làm tụt FPS khi cuộn trên laptop tầm trung.

**Đã chốt:** hero dùng **WebGL thuần** (một shader phẳng không cần Three.js, nhẹ hơn khoảng 150 KB). Three.js / R3F để dành cho scene 3D ở P4 nếu làm.

---

## P3 · About / Bento ✅

Mục tiêu: lưới bento, **mỗi thẻ là thông tin thật từ CV** (`src/content/`) cho nhà tuyển dụng.

- [x] **P3.1** Lưới bento responsive: 4 cột → 2 cột → 1 cột
- [x] **P3.2** Thẻ About: `profile.summary` (không lặp tagline của hero)
- [x] **P3.3** ~~Thẻ Design token đổi màu accent~~ → **bỏ**: widget tự nói về trang web, không cho nhà tuyển dụng thông tin gì. Thay bằng thẻ **Thành tích** (`activities`: Tuổi Trẻ Start-up Award, học bổng khởi nghiệp FPT, Global Hackathon)
- [x] **P3.4** ~~Thẻ Motion minh hoạ easing~~ → **bỏ** (cùng lý do). Thay bằng thẻ Điểm mạnh, rồi **bỏ** (2026-11-06); ngoại ngữ chuyển vào thẻ Học vấn
- [x] **P3.5** ~~Nút nam châm~~ → **bỏ** (cùng lý do). Thẻ **Công nghệ** riêng với chip từ `skills.ts`
- [x] **P3.6** Thẻ học vấn: FPT University, GPA, năm tốt nghiệp dự kiến
- [x] **P3.7** ~~Thẻ giờ địa phương + trạng thái nhận việc~~ → thay bằng thẻ **Hiện tại** (công việc đang làm, từ `experience.ts`). Chủ dự án đã bỏ `availability`; chưa có thành phố
- [x] **P3.9** Logo hoa (vector, `components/brand/`) bay theo cuộn: mở đầu hoa chạy từ phải sang trái làm chữ PORTFOLIO lộ dần, rồi bay từ hero xuống thẻ About theo tiến độ cuộn (GSAP ScrollTrigger). Mobile / giảm chuyển động: chỉ logo tĩnh ở About
- [x] **P3.8** Hiệu ứng spotlight theo chuột trên thẻ (chỉ thiết bị có hover)

**Tiêu chí xong:** mọi chữ lấy từ content/từ điển; không thẻ nào thiếu thông tin cho nhà tuyển dụng; không lặp nội dung với hero.

---

## P4 · Projects

Mục tiêu: khoe dự án thật, có khung xem web động và trang chi tiết.

- [x] **P4.1** Danh sách dự án `featured` dạng hàng lớn, số thứ tự, tag, năm
- [ ] **P4.2** Preview ảnh/video bay theo chuột khi hover (ẩn trên cảm ứng)
- [x] **P4.3** Component `BrowserFrame`: khung cửa sổ trình duyệt theo token, ba chế độ:
  - video lặp tự động, không tiếng (mặc định)
  - ảnh screenshot tự cuộn
  - iframe trang thật, chỉ nạp khi bấm "Xem trực tiếp" (nhiều trang chặn nhúng)
- [x] **P4.4** ~~Trang chi tiết `/projects/[slug]`~~ → **bỏ** (2026-11-06): chỉ 2 dự án, mỗi dự án ít nội dung, trang riêng sẽ mỏng. Thay bằng khối luôn mở ngay ở trang chủ (khung nhỏ bên trái, thông tin bên phải), không có chế độ thu gọn
- [x] **P4.5** Nội dung trong khối dự án: vai trò, thời gian, nhóm, mô tả, điểm nổi bật, stack, link GitHub / trang thật, `BrowserFrame`
- [x] **P4.6** ~~Điều hướng dự án trước / sau~~ → bỏ cùng P4.4
- [x] **P4.7** Dự án `confidential` (Hito Compass): không hiện ở mục Dự án, không screenshot, chỉ hiện ở Experience
- [~] **P4.8** Ảnh và video thật ⏳ chờ ảnh: code đã sẵn, đặt `demo.mp4` / `01-home.png` / `cover.jpg` đúng tên là hiện (cover + `demo.mp4` cho BeeWise, EVCare)
- [ ] **P4.9** (Tuỳ chọn) Scene 3D nhỏ cho EVCare, gợi lại tính năng 3D của dự án

**Tiêu chí xong:** chưa có ảnh vẫn hiển thị đẹp bằng placeholder; trang chi tiết có metadata riêng; video không tự phát khi bật reduced motion.

---

## P5 · Experience & Activities

- [x] **P5.1** Timeline kinh nghiệm từ `experience.ts`: công ty, vai trò, thời gian (`formatPeriod`), tóm tắt, điểm nổi bật, stack
- [x] **P5.2** Link nhảy tới khối dự án (`#project-<slug>`) qua `projectSlug`; dự án confidential chỉ ghi nhãn "Dự án nội bộ"
- [x] **P5.3** ~~Hoạt động & giải thưởng~~ → đã chuyển lên thẻ Thành tích ở bento (P3.3), không lặp lại ở P5
- [x] **P5.4** ~~Animation hiện dần khi cuộn~~ → bỏ: nội dung hiện sẵn, chỉ có hover nhẹ trên chấm mốc (đúng quy tắc không giấu nội dung chờ cuộn)

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

| Việc                 | Cần cho | Ghi chú                                                            |
| -------------------- | ------- | ------------------------------------------------------------------ |
| ~~Tên có dấu~~ | ✅ | Đã có: EN "Ngo Chi Vy", VI "Ngô Chí Vỹ" |
| Thành phố | (tuỳ chọn) | Thẻ giờ địa phương đã thay bằng thẻ Hiện tại; chỉ cần nếu muốn hiện nơi sống |
| Link BeeWise         | P4.5    | Nếu sản phẩm được công khai                                        |
| Ảnh chân dung        | P3      | `profile/portrait.jpg`, `avatar.jpg`                               |
| Ảnh + video dự án    | P4.2, P4.8 | `public/images/projects/beewise/` và `evcare/`: `demo.mp4` (16:10, 5–10 giây, không tiếng, dưới 3 MB), `cover.jpg` 1600×1000. Xem `docs/IMAGES.md` |
| Chọn cách liên hệ    | P6.3    | Formspree / Web3Forms / chỉ email                                  |
| CV công khai         | P6.4    | Bản PDF không có số điện thoại                                     |
| Duyệt bản tiếng Việt | P8.6    | Toàn bộ `vi` trong `src/content/` và `src/i18n/dictionaries/vi.ts` |
| Tên miền             | P9.3    |                                                                    |

---

## Nhật ký quyết định

| Ngày       | Quyết định                                                           | Lý do                                                              |
| ---------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 2026-11-05 | Next.js thay vì Astro                                                | Chứng minh stack nhà tuyển dụng hay yêu cầu, AI vibe code ổn định  |
| 2026-11-05 | Style: hero gradient nhiễu hạt + bento + design system               | Kết hợp ảnh tham khảo với ba thế mạnh animation, 3D, design system |
| 2026-11-05 | Hai theme, light mặc định, hero theo theme                           | Dễ đọc với nhà tuyển dụng; hero giữ điểm nhấn ở cả hai theme       |
| 2026-11-05 | Playfair Display thay Instrument Serif                               | Instrument Serif không có dấu tiếng Việt                           |
| 2026-11-05 | Emphasis light `#e85d04`                                             | Tươi hơn; chỉ dùng cho chữ lớn vì tương phản 3.2:1                 |
| 2026-11-05 | Gói `cn` của shadcn thay clsx + tailwind-merge                       | Mặc định của shadcn CLI mới                                        |
| 2026-11-05 | i18n tự làm, `/` tiếng Anh, `/vi` tiếng Việt, không tự đoán ngôn ngữ | Không cần thư viện; một URL cho mỗi ngôn ngữ, tốt cho SEO          |
| 2026-11-05 | Bỏ next-themes, dùng inline script                                   | next-themes gây cảnh báo script tag với React 19                   |
| 2026-11-06 | Hero có ảnh chân dung tách nền | Gương mặt dễ nhớ |
| 2026-11-06 | Tên không nằm sau ảnh; chiều sâu chuyển sang chữ trang trí, cỡ tên theo container query (cqi) | Tên là thông tin quan trọng nhất: phải đọc trọn, một màu, ở mọi kích thước màn hình |
| 2026-11-06 | Logo hoa vẽ lại thành SVG 10 cánh (file gốc là ảnh raster 2.3 MB) và bay hero → About bằng GSAP ScrollTrigger | Nhẹ, nét ở mọi cỡ, giữ màu thương hiệu; chỉ chạy ở md+ và khi không giảm chuyển động |
| 2026-11-06 | Bỏ thẻ Điểm mạnh; Công nghệ thành thẻ toàn chiều rộng, mỗi nhóm một cột, mỗi công nghệ một ô logo (`TechTile`) | Soft skill không có bằng chứng; ô logo màu rõ và chuyên nghiệp hơn chip
| 2026-11-06 | Hoa tiếp tục tới chấm mốc đầu timeline Kinh nghiệm rồi chạy dọc đường kẻ theo cuộn tới chấm cuối | Gắn hiệu ứng nền với nội dung thật (mốc thời gian) |
| 2026-11-06 | Dự án bố trí ziczac; hoa đậu dưới khung từng dự án: cả hai dự án: hoa tự bay nhẹ xuống khi cuộn tới đầu dự án (không theo cuộn), cuộn ngược thì bay lùi; hoa xoay chậm ở cả hai | Tránh hoa bay sang dự án 2 khi chưa đọc xong dự án 1; chỉ md+ và khi không giảm chuyển động |
| 2026-11-06 | Bỏ trang chi tiết dự án, dùng khối dự án luôn mở ở trang chủ; media chọn theo file có thật trong `public/` (demo.mp4 > 01-home.png > cover.jpg) | Chỉ cần đặt file đúng tên là thay placeholder; Hito Compass không lộ ra ngoài Experience |
| 2026-11-06 | Shader hero bằng WebGL thuần | Một shader phẳng không cần Three.js; nhẹ hơn khoảng 150 KB |
| 2026-11-06 | Ảnh tách nền dùng `unoptimized` | Bộ tối ưu ảnh của Next trả JPEG, làm mất nền trong suốt |
| 2026-11-06 | Bỏ thẻ demo (đổi accent, easing, nút nam châm) khỏi bento, thay bằng thông tin thật từ CV | Portfolio để xin việc: mọi thành phần phải cho nhà tuyển dụng thông tin thật (xem mục "Mục đích" trong AGENTS.md) |
| 2026-11-06 | Tên theo ngôn ngữ (`profile.name` là Localized) | Bản tiếng Việt hiện tên có dấu "Ngô Chí Vỹ" |
| 2026-11-06 | Smooth scroll bằng CSS, chưa dùng Lenis                              | Đủ cho link neo; Lenis chỉ khi cần đồng bộ animation theo scroll   |
| 2026-11-06 | Menu mobile dùng `<dialog>` gốc                                      | Trình duyệt lo sẵn focus trap, Esc, trả focus                      |
| 2026-11-06 | 404 song ngữ qua `[lang]/[...rest]` + `instant = false`              | Giữ Nav, Footer, theme; tắt kiểm tra instant cho route chỉ báo 404 |
| 2026-11-05 | Dữ liệu là file TS trong `src/content/`, không backend               | Đủ cho portfolio, có kiểu, dễ nâng lên Keystatic sau               |
