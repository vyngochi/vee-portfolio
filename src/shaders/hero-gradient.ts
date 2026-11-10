/**
 * Shader gradient nhiễu hạt cho hero (WebGL 1, vẽ một hình chữ nhật phủ kín canvas).
 * Viết dạng chuỗi trong file .ts để không cần cấu hình loader cho .glsl.
 * LƯU Ý: bên trong chuỗi GLSL chỉ được dùng ký tự ASCII (kể cả comment), nếu không shader không biên dịch được.
 *
 * Uniform:
 *   uTime    giây, dừng ở một giá trị cố định khi giảm chuyển động
 *   uRes     kích thước canvas (pixel thật)
 *   uMouse   vị trí chuột trong khung, 0..1, gốc ở góc dưới trái
 *   uC0..uC3 bảng màu theo theme (src/styles/tokens.ts → heroShaderPalette)
 *   uAccent  màu primary, tạo quầng ấm quanh con trỏ
 *   uGrain   độ đậm nhiễu hạt (hạt đứng yên theo pixel, không đổi theo thời gian để khỏi nhấp nháy)
 */

export const heroVertexShader = /* glsl */ `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const heroFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uAccent;
uniform float uGrain;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Sin-free hash (Dave Hoskins) for the grain: the sin() hash above shows diagonal stripes
// at large pixel coordinates once the grain stops moving
float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float t = uTime * 0.05;

  // Domain warping: noise bent by noise gives soft, smoky light bands
  vec2 q = vec2(fbm(p * 1.1 + t), fbm(p * 1.1 - t + 4.7));
  float n = fbm(p * 0.9 + q * 1.7 + (m - p) * 0.25);

  // Light gathers bottom-left and fades toward top-right
  float diag = smoothstep(1.25, 0.15, uv.x * 0.7 + (1.0 - uv.y) * 0.9);

  vec3 col = uC0;
  col = mix(col, uC1, smoothstep(0.30, 0.62, n) * (0.45 + diag));
  col = mix(col, uC2, smoothstep(0.55, 0.85, n) * 0.85 * (0.3 + diag));
  col = mix(col, uC3, smoothstep(0.72, 0.95, n) * 0.4);

  // Warm glow around the pointer
  col = mix(col, uAccent, 0.16 * smoothstep(0.55, 0.0, distance(p, m)));

  // Pull the top-left edge back to the base color so text stays readable
  col = mix(uC0, col, 0.55 + 0.45 * smoothstep(0.0, 0.6, uv.x + uv.y * 0.3));

  // Static film grain: fixed per pixel, never re-rolled per frame (animated grain flickers and glares)
  col += (grainHash(gl_FragCoord.xy) - 0.5) * uGrain;

  gl_FragColor = vec4(col, 1.0);
}
`;
