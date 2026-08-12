"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function PrintResumeButton() {
  const { t } = useLanguage();
  return (
    <button className="resume-print-button" onClick={() => window.print()} type="button">
      {t("common.exportPdf")}
    </button>
  );
}
