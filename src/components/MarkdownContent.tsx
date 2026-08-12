"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import katex from "katex";
import { createHeadingId } from "@/lib/markdown";

const inlinePattern =
  /(!?\[[^\]]*]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\\\[[\s\S]*?\\\]|(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$|\\\([^\\\n]*?\\\)|(?<![\\$\\])\$(?!\$)(?:\\.|[^$\\\n])*?(?<!\\)\$(?!\$))/g;

type Block =
  | { type: "code"; content: string; language: string }
  | { type: "heading"; depth: 1 | 2 | 3 | 4 | 5 | 6; content: string }
  | { type: "image"; alt: string; src: string }
  | { type: "math"; content: string }
  | { type: "table"; rows: string[][] }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "paragraph"; content: string };

const splitTableRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const isTableDivider = (line: string) =>
  /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);

const renderLatex = (value: string, displayMode = false) => {
  const source = value.replace(/\u00a0/g, " ").replace(/%5C/gi, "\\").replace(/%20/g, " ").trim();
  if (!source) return "";

  try {
    const rendered = katex.renderToString(source, {
      displayMode,
      errorColor: "inherit",
      output: "htmlAndMathml",
      strict: "ignore",
      throwOnError: false,
      trust: false,
    });
    return rendered.includes("katex-error")
      ? `<span class="math-fallback">${escapeHtml(source)}</span>`
      : rendered;
  } catch {
    return `<span class="math-fallback">${escapeHtml(source)}</span>`;
  }
};

const resolveImageSource = (src: string, sourcePath?: string) => {
  if (/^(https?:|data:|\/)/.test(src)) return src;
  if (!sourcePath) return src;

  const segments = sourcePath.split("/").slice(0, -1);
  for (const part of decodeURI(src).split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") segments.pop();
    else segments.push(part);
  }

  return `https://raw.githubusercontent.com/Tonkic/tonkic-obsidian-vault/main/${segments
    .map(encodeURIComponent)
    .join("/")}`;
};

const normalizeVaultPath = (value: string) =>
  value
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean)
    .join("/");

const resolveVaultPath = (href: string, sourcePath?: string) => {
  const [pathWithMaybeHash, hash = ""] = href.split("#");
  const [pathOnly, query = ""] = pathWithMaybeHash.split("?");

  try {
    const decoded = decodeURI(pathOnly);
    const segments = decoded.startsWith("/")
      ? []
      : sourcePath?.split("/").slice(0, -1) ?? [];

    for (const part of decoded.split("/")) {
      if (!part || part === ".") continue;
      if (part === "..") segments.pop();
      else segments.push(part);
    }

    const normalized = normalizeVaultPath(segments.join("/"));
    return {
      hash: hash ? `#${hash}` : "",
      path: normalized.endsWith(".md") ? normalized : `${normalized}.md`,
      query: query ? `?${query}` : "",
    };
  } catch {
    return null;
  }
};

const resolveLinkHref = (href: string, sourcePath?: string, linkMap?: Record<string, string>) => {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (!linkMap) return href;

  const resolved = resolveVaultPath(href, sourcePath);
  if (!resolved) return href;

  const target = linkMap[resolved.path];
  return target ? `${target}${resolved.hash}` : href;
};

const readDisplayMathBlock = (lines: string[], start: number, delimiter: "$$" | "\\[", firstContent: string) => {
  const math: string[] = [];
  const closingDelimiter = delimiter === "$$" ? "$$" : "\\]";
  const firstClose = firstContent.indexOf(closingDelimiter);
  if (firstClose >= 0) {
    return { content: firstContent.slice(0, firstClose).trim(), end: start + 1 };
  }

  if (firstContent.trim()) math.push(firstContent);
  let index = start + 1;
  while (index < lines.length) {
    const close = lines[index].indexOf(closingDelimiter);
    if (close >= 0) {
      math.push(lines[index].slice(0, close));
      return { content: math.join("\n").trim(), end: index + 1 };
    }
    math.push(lines[index]);
    index += 1;
  }

  return { content: math.join("\n").trim(), end: index };
};

const parseBlocks = (content: string): Block[] => {
  const withoutFrontmatter = content.replace(/^\uFEFF?---\s*\n[\s\S]*?\n---\s*(?:\n|$)/, "");
  const lines = withoutFrontmatter.replace(/\$\$\$\$/g, "$$\n$$").replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index].trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", content: code.join("\n"), language });
      index += 1;
      continue;
    }

    const listMath = trimmed.match(/^(?:[-*]|\d+[.)])\s+(\$\$|\\\[)(.*)$/);
    if (listMath) {
      const delimiter = listMath[1] as "$$" | "\\[";
      const math = readDisplayMathBlock(lines, index, delimiter, listMath[2]);
      if (math.content) blocks.push({ type: "math", content: math.content });
      index = math.end;
      continue;
    }

    const displayDelimiter = trimmed.startsWith("$$") ? "$$" : trimmed.startsWith("\\[") ? "\\[" : null;
    if (displayDelimiter) {
      const math = readDisplayMathBlock(lines, index, displayDelimiter, trimmed.slice(displayDelimiter.length));
      if (math.content) blocks.push({ type: "math", content: math.content });
      index = math.end;
      continue;
    }

    const image = trimmed.match(/^!\[([^\]]*)]\(([^)]+)\)$/);
    if (image) {
      blocks.push({ type: "image", alt: image[1], src: image[2] });
      index += 1;
      continue;
    }

    if (trimmed.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const rows = [splitTableRow(trimmed)];
      index += 2;
      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: "heading",
        depth: Math.min(heading[1].length, 6) as 1 | 2 | 3 | 4 | 5 | 6,
        content: heading[2],
      });
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (
        index < lines.length &&
        /^[-*]\s+/.test(lines[index].trim()) &&
        !/^[-*]\s+(?:\$\$|\\\[)/.test(lines[index].trim())
      ) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "list", items, ordered: false });
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (
        index < lines.length &&
        /^\d+[.)]\s+/.test(lines[index].trim()) &&
        !/^\d+[.)]\s+(?:\$\$|\\\[)/.test(lines[index].trim())
      ) {
        items.push(lines[index].trim().replace(/^\d+[.)]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "list", items, ordered: true });
      continue;
    }

    const paragraph: string[] = [trimmed];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,6})\s+/.test(lines[index].trim())) {
      const next = lines[index].trim();
      if (
        next.startsWith("```") ||
        next.startsWith("$$") ||
        next.startsWith("\\[") ||
        /^(?:[-*]|\d+[.)])\s+(?:\$\$|\\\[)/.test(next) ||
        /^[-*]\s+/.test(next) ||
        /^\d+[.)]\s+/.test(next)
      ) break;
      if (next.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) break;
      paragraph.push(next);
      index += 1;
    }
    blocks.push({ type: "paragraph", content: paragraph.join(" ") });
  }

  return blocks;
};

const renderInline = (text: string, sourcePath?: string, linkMap?: Record<string, string>) => {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(inlinePattern)) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));

    const token = match[0];
    const link = token.match(/^(!?)\[([^\]]*)]\(([^)]+)\)$/);
    if (link) {
      if (link[1]) {
        nodes.push(
          <img
            alt={link[2]}
            className="markdown-inline-image"
            key={match.index}
            src={resolveImageSource(link[3], sourcePath)}
          />,
        );
      } else {
        nodes.push(
          <a
            href={resolveLinkHref(link[3], sourcePath, linkMap)}
            key={match.index}
            rel={/^(https?:)/.test(link[3]) ? "noreferrer" : undefined}
            target={/^(https?:)/.test(link[3]) ? "_blank" : undefined}
          >
            {link[2] || link[3]}
          </a>,
        );
      }
    } else if (token.startsWith("`")) {
      nodes.push(<code key={match.index}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("$") || token.startsWith("\\(") || token.startsWith("\\[")) {
      const display = token.startsWith("$$") || token.startsWith("\\[");
      const delimiterLength = token.startsWith("$") ? (display ? 2 : 1) : 2;
      nodes.push(
        <span className={display ? "math-inline math-inline-display" : "math-inline"} key={match.index}>
          <span dangerouslySetInnerHTML={{ __html: renderLatex(token.slice(delimiterLength, -delimiterLength), display) }} />
        </span>,
      );
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length ? nodes : text;
};

function CodeBlock({ content, language }: { content: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="code-block">
      <div className="code-block-bar">
        <span>{language || "code"}</span>
        <button onClick={copy} type="button">
          {copied ? t("blog.copied") : t("blog.copy")}
        </button>
      </div>
      <pre>
        <code>{content}</code>
      </pre>
    </div>
  );
}

function MathBlock({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const copy = async () => {
    await navigator.clipboard.writeText(`$$\n${content}\n$$`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <figure className="math-block">
      <button onClick={copy} type="button">
        {copied ? t("blog.copied") : t("blog.copyFormula")}
      </button>
      <div aria-label={t("blog.formula")} className="math-block-content">
        <span dangerouslySetInnerHTML={{ __html: renderLatex(content, true) }} />
      </div>
    </figure>
  );
}

export function MarkdownContent({
  content,
  contentEn,
  linkMap,
  sourcePath,
}: {
  content: string;
  contentEn?: string;
  linkMap?: Record<string, string>;
  sourcePath?: string;
}) {
  const { locale } = useLanguage();
  const localizedContent = locale === "en" && contentEn ? contentEn : content;
  const blocks = useMemo(() => parseBlocks(localizedContent), [localizedContent]);
  const headingIds = new Map<string, number>();

  return (
    <div className="markdown-content">
      {blocks.map((block, index) => {
        if (block.type === "code") {
          return <CodeBlock content={block.content} key={index} language={block.language} />;
        }

        if (block.type === "math") {
          return <MathBlock content={block.content} key={index} />;
        }

        if (block.type === "image") {
          return (
            <figure className="markdown-image" key={index}>
              <img alt={block.alt} src={resolveImageSource(block.src, sourcePath)} />
              {block.alt ? <figcaption>{block.alt}</figcaption> : null}
            </figure>
          );
        }

        if (block.type === "table") {
          const [head, ...body] = block.rows;
          return (
            <div className="markdown-table-wrap" key={index}>
              <table>
                <thead>
                  <tr>
                    {head.map((cell, cellIndex) => (
                      <th key={cellIndex}>{renderInline(cell, sourcePath, linkMap)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{renderInline(cell, sourcePath, linkMap)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item, sourcePath, linkMap)}</li>
              ))}
            </List>
          );
        }

        if (block.type === "heading") {
          const Heading = `h${Math.min(block.depth + 1, 6)}` as "h2" | "h3" | "h4" | "h5" | "h6";
          return <Heading id={createHeadingId(block.content, headingIds)} key={index}>{renderInline(block.content, sourcePath, linkMap)}</Heading>;
        }

        return <p key={index}>{renderInline(block.content, sourcePath, linkMap)}</p>;
      })}
    </div>
  );
}
