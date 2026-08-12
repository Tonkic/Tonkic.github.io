"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();
  const nextLocale = locale === "zh" ? "en" : "zh";

  return (
    <button
      aria-label={t("language.switchTo")}
      aria-pressed={locale === "en"}
      className={`language-toggle ${compact ? "compact" : ""}`}
      onClick={() => setLocale(nextLocale)}
      type="button"
    >
      <span className={locale === "zh" ? "active" : ""}>中</span>
      <i aria-hidden>·</i>
      <span className={locale === "en" ? "active" : ""}>EN</span>
    </button>
  );
}
