# Design system

Nguồn sự thật: `src/styles/tokens.css`. Xem trực quan ở route `/tokens` khi chạy `npm run dev`.

## Tinh thần

Sâu và có chất liệu: ánh sáng xanh dương như phát ra từ màn hình, bề mặt có nhiễu hạt như phim. Chữ sans rất lớn, sát nhau, tạo khối. Một cụm chữ nghiêng serif màu cam làm điểm nhấn cảm xúc. Chuyển động chậm ở cảnh lớn, nảy nhẹ ở tương tác nhỏ.

Hai theme, **mặc định dark** ở lần vào đầu, người xem đổi bằng nút `ThemeToggle` (theme mới lan tròn từ chỗ bấm) và lựa chọn được ghi nhớ.

- **Light:** nền trắng ngả xanh, hero là sương xanh nhạt với chữ tối.
- **Dark:** nền gần đen, hero xanh sâu phát sáng với chữ sáng.

## Ba tầng token

| Tầng | Ví dụ | Dùng ở đâu |
|---|---|---|
| Primitive | `--ink-900`, `--amber-500`, `--blue-500` | Chỉ trong `tokens.css` |
| Semantic | `--background`, `--primary`, `--highlight` | Component (qua class Tailwind) |
| Tailwind | `bg-background`, `text-primary`, `text-display` | JSX |

Đổi màu thương hiệu: sửa giá trị primitive hoặc trỏ semantic sang primitive khác. Component không phải sửa.

## Màu

| Token | Light | Dark | Vai trò |
|---|---|---|---|
| `background` | `#f5f6fa` | `#0b0e17` | Nền trang |
| `card` | `#ffffff` | `#121725` | Bề mặt card, bento |
| `muted` / `secondary` / `accent` | `#e6e9f2` | `#1a2032` | Nền phụ, hover của menu |
| `border` | `#dfe3ec` | `#222a3d` | Đường kẻ, viền |
| `muted-foreground` | `#5b6480` | `#8790a8` | Chữ phụ, nhãn |
| `foreground` | `#0e1220` | `#eef1f8` | Chữ chính |
| `primary` | `#ffa800` | `#ffa800` | **Nền** nút chính, focus ring (chữ trên nó là `#111`) |
| `emphasis` | `#e85d04` | `#ffa800` | **Chữ** màu accent, chỉ cho chữ lớn: `text-serif-accent`, tiêu đề |
| `highlight` | `#00796b` | `#00ffe0` | Accent phụ, dùng ít: chấm sáng, hover của chip, scroll cue |
| `glow` | `#1a5fe0` | `#1f6fff` | Ánh sáng xanh |
| `hero-from → via → to` | `#8fb4ff → #dce6fb → #f5f6fa` | `#0a3d8f → #06122e → #000` | Gradient hero, cũng là fallback khi shader chưa chạy |
| `hero-foreground` | `#0e1220` | `#eef1f8` | Chữ trong hero |

Vì sao light cần `emphasis` riêng: cam `#ffa800` trên nền sáng chỉ đạt độ tương phản 1.8:1, không đọc được. Light dùng cam ngả đỏ `#e85d04`: vẫn tươi, đạt 3.2:1, đủ chuẩn AA cho **chữ lớn** (từ 24px, hoặc 19px đậm). Vì vậy `text-emphasis` chỉ dùng cho tiêu đề và cụm serif nhấn. Chữ nhỏ cần nhấn (link, nhãn) thì dùng `text-foreground` kèm gạch chân hoặc chấm màu `bg-primary`. Tương tự, ngọc `#00ffe0` được thay bằng `#00796b` (4.9:1).

Quy tắc: `emphasis` và `highlight` không đứng cạnh nhau với diện tích lớn. Mỗi khối có tối đa một accent nổi bật. Màu khác nhau giữa hai theme luôn là token, không dùng `dark:` để tô màu.

## Chữ

| Token | Cỡ | Dùng cho |
|---|---|---|
| `text-hero` | 56 → 160px, theo bề rộng khung hero (`cqi`) | Chỉ cho tên ở hero. Tên luôn một màu, không tách serif, không để ảnh che |
| `text-display` | 56 → 168px | Tiêu đề lớn (trang 404, trang chi tiết) |
| `text-headline` | 28 → 46px | Tiêu đề section |
| `text-title` | 24 → 44px | Tên dự án trong danh sách |
| `text-base` | 16px | Văn bản |
| `text-eyebrow` | 11.5px, viết hoa | Nhãn, thông tin phụ ở hero |
| `text-serif-accent` | theo cỡ cha | Cụm chữ nghiêng màu primary |

Font: **Manrope** (mọi thứ), **Playfair Display italic** (chỉ cho `text-serif-accent`), **Anton** (`font-poster`, chỉ cho chữ trang trí cực lớn vẽ viền ở hero), **JetBrains Mono** (code, token, số liệu kỹ thuật). Cả bốn hỗ trợ tiếng Việt.

> Ảnh tham khảo dùng Instrument Serif, nhưng font này không có dấu tiếng Việt nên được thay bằng Playfair Display.

## Bo góc

`rounded-md` (12px, input), `rounded-lg` (14px, nút vuông), `rounded-card` (22px), `rounded-hero` (28px), `rounded-full` (nút pill, chip, swatch).

## Chuyển động

| Token | Giá trị | Dùng cho |
|---|---|---|
| `ease-out-expo` | `cubic-bezier(.22,1,.36,1)` | Chữ hiện ra, chuyển trang, preview bay theo chuột |
| `ease-spring` | `cubic-bezier(.34,1.56,.64,1)` | Hover nút, chip, nút nam châm |
| `animate-rise` | 1.1s | Chữ trượt lên từ dưới mask |
| `duration` (tokens.ts) | 0.2 / 0.45 / 1.1s | fast / base / slow |

## Bề mặt

- `grain`: phủ nhiễu hạt lên khối (hero, card nổi bật, ảnh preview). Độ đậm và chế độ hoà trộn đổi theo theme: dark dùng `overlay` 0.2, light dùng `soft-light` 0.35 để không trông bẩn.
- `shadow-hero`: bóng cho khung hero. `shadow-float`: cho phần tử nổi (preview ảnh). Ở light, bóng ngả xanh và nhẹ hơn.
- Gradient hero: `--hero-from` → `--hero-via` → `--hero-to`. Đây cũng là màu fallback khi shader WebGL chưa chạy.
