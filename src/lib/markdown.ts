export type MarkdownHeading = {
  depth: number;
  text: string;
  id: string;
};

export const stripMarkdownFrontmatter = (content: string) =>
  content.replace(/^\uFEFF?---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, "");

const cleanHeadingText = (value: string) =>
  value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/\$+/g, "")
    .trim();

export const createHeadingId = (value: string, used: Map<string, number>) => {
  const base =
    cleanHeadingText(value)
      .normalize("NFKC")
      .toLocaleLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "section";
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
};

export const extractMarkdownHeadings = (content: string, skipLeadingTitle?: string): MarkdownHeading[] => {
  const used = new Map<string, number>();
  const headings: MarkdownHeading[] = [];
  const normalizedTitle = skipLeadingTitle ? cleanHeadingText(skipLeadingTitle).toLocaleLowerCase() : "";
  let inCode = false;
  let seenFirstBlock = false;

  for (const line of stripMarkdownFrontmatter(content).replace(/\r\n/g, "\n").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("```")) {
      inCode = !inCode;
      seenFirstBlock = true;
      continue;
    }
    if (inCode) continue;

    const match = trimmed.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (!match) {
      seenFirstBlock = true;
      continue;
    }

    const depth = match[1].length;
    const text = match[2];
    if (!seenFirstBlock && depth === 1 && normalizedTitle && cleanHeadingText(text).toLocaleLowerCase() === normalizedTitle) {
      seenFirstBlock = true;
      continue;
    }

    seenFirstBlock = true;
    headings.push({
      depth,
      text: cleanHeadingText(text) || text,
      id: createHeadingId(text, used),
    });
  }

  return headings;
};
