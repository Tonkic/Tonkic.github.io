export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export type LocalizedString = Record<Locale, string>;

export const defaultLocale: Locale = "zh";
export const localeStorageKey = "tonkic-locale";

export const isLocale = (value: string | null): value is Locale =>
  value !== null && locales.includes(value as Locale);
