"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { LocalizedString } from "@/i18n/config";

export function LocalizedText({ text }: { text: LocalizedString }) {
  const { locale } = useLanguage();
  return <>{text[locale]}</>;
}
