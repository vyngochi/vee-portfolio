/** Tách tên thành phần đầu và từ cuối, để từ cuối hiển thị bằng chữ nghiêng serif: "Ngo Chi Vy" → { lead: "Ngo Chi", last: "Vy" } */
export function splitName(name: string): { lead: string; last: string } {
  const parts = name.trim().split(/\s+/);
  const last = parts.pop() ?? "";
  return { lead: parts.join(" "), last };
}
