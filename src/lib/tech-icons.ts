import {
  siGit,
  siGitlab,
  siClickup,
  siJira,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siSwagger,
  siThreedotjs,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

/**
 * Logo cho từng công nghệ trong src/content/skills.ts (khoá = đúng tên trong skills.ts).
 * Logo lấy từ Simple Icons (CC0). Công nghệ không có logo thương hiệu thì không có trong bảng,
 * TechIcon sẽ dùng icon chung.
 * Thêm công nghệ mới vào skills.ts thì thêm logo ở đây (tìm tên tại https://simpleicons.org).
 */
export const techIcons: Record<string, SimpleIcon> = {
  React: siReact,
  TypeScript: siTypescript,
  "Next.js": siNextdotjs,
  "Three.js": siThreedotjs,
  "Node.js": siNodedotjs,
  Swagger: siSwagger,
  Git: siGit,
  GitLab: siGitlab,
  ClickUp: siClickup,
  Jira: siJira,
  Vercel: siVercel,
};
