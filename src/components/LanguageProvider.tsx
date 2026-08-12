"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { defaultLocale, isLocale, localeStorageKey, type Locale } from "@/i18n/config";
import { getMessage, type MessagePath } from "@/i18n/messages";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: MessagePath) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useLayoutEffect(() => {
    const saved = window.localStorage.getItem(localeStorageKey);
    const prepared = document.documentElement.dataset.locale;
    const detected: Locale = isLocale(saved)
      ? saved
      : isLocale(prepared ?? null)
        ? prepared as Locale
        : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    setLocaleState(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    setLocale: (nextLocale) => {
      window.localStorage.setItem(localeStorageKey, nextLocale);
      setLocaleState(nextLocale);
    },
    t: (path) => getMessage(locale, path),
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
