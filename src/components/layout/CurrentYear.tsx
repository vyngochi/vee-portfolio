/**
 * Năm hiện tại cho dòng ©.
 * Dự án bật cacheComponents nên đọc giờ hiện tại (new Date()) phải nằm trong "use cache":
 * năm được tính lúc build và giữ nguyên tới lần deploy sau.
 */
export async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
