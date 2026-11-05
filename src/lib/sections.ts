/**
 * Các section của trang chủ theo đúng thứ tự hiển thị.
 * id dùng làm anchor (#about...) và làm khoá chữ trong từ điển (dict.nav[id], dict.sections[id]).
 */
export const homeSections = ["about", "work", "experience", "contact"] as const;
export type HomeSectionId = (typeof homeSections)[number];

/** id của phần đầu trang, dùng cho link "Lên đầu trang" */
export const TOP_ID = "top";
/** id của <main>, đích của skip link */
export const MAIN_ID = "main";
