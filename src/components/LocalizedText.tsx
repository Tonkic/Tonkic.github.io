import type { LocalizedString } from "@/i18n/config";

export function LocalizedText({ text }: { text: LocalizedString }) {
  return (
    <>
      <span data-lang="zh">{text.zh}</span>
      <span data-lang="en">{text.en}</span>
    </>
  );
}
