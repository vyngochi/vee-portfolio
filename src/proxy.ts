import { NextResponse, type NextRequest } from "next/server";

// Định tuyến ngôn ngữ (xem src/i18n/config.ts):
//   /vi/...  → giữ nguyên
//   /en/...  → chuyển hướng 308 về /... để tiếng Anh chỉ có một URL
//   /...     → rewrite nội bộ sang /en/... (URL trên trình duyệt không đổi)
// Giá trị viết thẳng ở đây vì proxy chạy tách biệt, không nên phụ thuộc module dùng chung.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/vi" || pathname.startsWith("/vi/")) {
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Bỏ qua file nội bộ của Next, API và mọi đường dẫn có đuôi file (ảnh, favicon, pdf...)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
