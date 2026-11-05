import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { vi } from "./dictionaries/vi";

// Chỉ dùng trong Server Component. Client Component nhận chữ qua props.

const dictionaries: Record<Locale, Dictionary> = { en, vi };

/** Ngôn ngữ của request hiện tại, đọc từ segment [lang] */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Từ điển chữ giao diện của ngôn ngữ hiện tại */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}

export function getDictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale];
}
