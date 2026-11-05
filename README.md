# Portfolio

Portfolio cá nhân. Style: hero gradient nhiễu hạt chạy bằng shader + lưới bento tương tác + design system (xem bản mẫu ở `demo/style-demo.html`).

## Chạy dự án

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Thêm component React Bits

Dự án dùng biến thể **TS-TW** (TypeScript + Tailwind). Cấu hình nằm ở `components.json`.

```bash
npx shadcn@latest add @react-bits/<TênComponent>-TS-TW
```

Ví dụ: `npx shadcn@latest add @react-bits/SplitText-TS-TW`. File được tạo trong `src/components/reactbits/`, dependency (gsap, three...) được cài tự động. Tên component lấy từ URL trên reactbits.dev.

## Cấu trúc

```
├── demo/                  Bản demo style (HTML tĩnh, chỉ để tham khảo)
├── docs/
│   ├── DESIGN.md          Design system: màu, chữ, bo góc, chuyển động
│   ├── IMAGES.md          Hướng dẫn đặt tên và kích thước ảnh
│   └── private/           CV gốc (gitignore, không deploy)
├── public/
│   └── images/            Ảnh cá nhân: profile/, projects/, og/, brand/
└── src/
    ├── app/               Route của Next.js (layout.tsx, page.tsx, globals.css)
    ├── components/
    │   ├── layout/        Nav, Footer
    │   ├── sections/      Từng section của trang: Hero, About, Projects, DesignSystem, Contact
    │   ├── bento/         Các widget trong lưới bento
    │   ├── reactbits/     Component cài từ React Bits (code thuộc về dự án, sửa thoải mái)
    │   ├── ui/            Component nhỏ dùng lại: Button, Chip, Card...
    │   └── three/         Canvas WebGL và scene 3D
    ├── shaders/           File .glsl
    ├── content/           Dữ liệu: thông tin cá nhân, danh sách dự án
    ├── hooks/             Custom hooks (useMouse, useReducedMotion...)
    ├── lib/               Hàm tiện ích
    └── styles/            Design tokens (màu, font, easing)
```

Các file `.gitkeep` chỉ để giữ thư mục rỗng trong git. Xoá khi thư mục đã có file thật.
