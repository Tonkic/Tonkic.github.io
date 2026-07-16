export type MarkdownHeading = {
  depth: number;
  text: string;
  id: string;
};

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

export const extractMarkdownHeadings = (content: string): MarkdownHeading[] => {
  const used = new Map<string, number>();
  const headings: MarkdownHeading[] = [];
  let inCode = false;

  for (const line of content.replace(/\r\n/g, "\n").split("\n")) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = line.trim().match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (!match) continue;
    headings.push({
      depth: match[1].length,
      text: match[2],
      id: createHeadingId(match[2], used),
    });
  }

  return headings;
};
