# Hướng dẫn thêm ảnh

Mọi ảnh đặt trong `public/images/`. Trong code gọi bằng đường dẫn bắt đầu từ `/images/...`, ví dụ `/images/profile/avatar.jpg`.

> Không đặt file ghi chú (như file này) trong `public/`, vì mọi thứ trong `public/` đều ai cũng tải được.

## Quy tắc đặt tên

- Chữ thường, không dấu, nối bằng gạch ngang: `portrait-casual.jpg` ✅, `Ảnh Chân Dung (1).JPG` ❌
- Không dấu cách, không ký tự đặc biệt, đuôi file viết thường (`.jpg`, không `.JPG`)
- Ảnh cùng loại nhiều tấm thì đánh số 2 chữ số ở đầu: `01-home.png`, `02-detail.png`
- Tên mô tả **nội dung**, không mô tả ngày chụp hay tên máy: `workspace.jpg` ✅, `IMG_20250312.jpg` ❌

## Cấu trúc và tên gợi ý

```
public/images/
├── profile/                  Ảnh cá nhân
│   ├── portrait-cutout.webp  ✅ Đã có. Ảnh tách nền (trong suốt), cắt sát người, 866×1476. Dùng ở hero
│   ├── portrait-laptop.webp  ✅ Đã có. Ảnh tách nền cầm laptop, cắt sát, 1000×897. Dùng ở Contact
│   ├── avatar.jpg            Ảnh vuông 1:1, 800×800. Dùng cho nav, footer, thẻ About
│   ├── portrait.jpg          Ảnh dọc 4:5, 1200×1500. Ảnh chính ở phần About
│   ├── portrait-casual.jpg   Ảnh đời thường, dùng cho hover hoặc ô bento
│   └── workspace.jpg         Góc làm việc / setup, 16:9, 1600×900
│
├── projects/                 Mỗi dự án một thư mục, tên thư mục = slug của dự án
│   └── ten-du-an/            ví dụ: orbit-ui, pulse-dashboard
│       ├── cover.jpg         Ảnh đại diện 16:10, 1600×1000. Dùng cho preview khi hover và thẻ dự án
│       ├── 01-home.png       Screenshot desktop, đánh số theo thứ tự xuất hiện
│       ├── 02-detail.png
│       ├── mobile-01.png     Screenshot điện thoại (nếu có)
│       └── demo.mp4          Video ngắn 5–10 giây, không tiếng, để lặp (nếu có)
│
├── og/
│   └── og-default.jpg        Ảnh hiện khi share link lên Facebook, LinkedIn... 1200×630
│
└── brand/
    ├── logo.svg              Logo / chữ ký tên của bạn (nếu có)
    └── signature.svg         Chữ ký tay (tuỳ chọn)
```

Favicon không để ở đây. Theo quy ước Next.js, đặt thẳng vào `src/app/`:

- `src/app/icon.png`: 512×512
- `src/app/apple-icon.png`: 180×180

## Định dạng và dung lượng

| Loại ảnh | Định dạng | Ghi chú |
|---|---|---|
| Ảnh chụp (chân dung, góc làm việc) | `.jpg` hoặc `.webp` | Dưới 500 KB mỗi ảnh |
| Screenshot giao diện có chữ | `.png` hoặc `.webp` | PNG giữ chữ sắc nét |
| Logo, icon | `.svg` | |
| Video demo | `.mp4` (H.264) | Dưới 3 MB, không tiếng |

Không cần nén quá kỹ vì `next/image` sẽ tự resize và đổi sang định dạng nhẹ hơn khi hiển thị. Chỉ cần ảnh gốc không quá 2–3 MB.
