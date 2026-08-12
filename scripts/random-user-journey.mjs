import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out", import.meta.url));
const requiredRoutes = ["/", "/overview/", "/blog/", "/api-relay/", "/portfolio/", "/cv/", "/academic/"];
const mathRegressionRoute = "/blog/9185bf3a6c-sigmoid/";
const attentionMaskRoute = "/blog/0d01619aaa-attention-mask/";
const delimiterRegressionRoute = "/blog/68d90729b9-transformer/";
const complexMathRoute = "/blog/b42deb2ee5/";
const adjacentMathRoute = "/blog/6c6ec480ee/";
const walkSteps = 48;

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

const isSafePath = (candidate) => {
  const normalized = normalize(candidate);
  return normalized === "." || (!normalized.startsWith("..") && !/^[a-zA-Z]:/.test(normalized));
};

const fileForPath = (pathname) => {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, "");
  const target = cleanPath && !cleanPath.endsWith("/") ? cleanPath : `${cleanPath}index.html`;
  assert.ok(isSafePath(target), `Unsafe path requested: ${pathname}`);
  return join(root, target);
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    const filePath = fileForPath(url.pathname);
    const body = await readFile(filePath);
    response.writeHead(200, { "content-type": mimeTypes.get(extname(filePath)) ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    response.end("<h1>404</h1>");
  }
});

const listen = () =>
  new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      assert.ok(address && typeof address === "object");
      resolve(`http://127.0.0.1:${address.port}`);
    });
  });

const fetchPage = async (baseUrl, path) => {
  const response = await fetch(new URL(path, baseUrl));
  const body = await response.text();
  assert.equal(response.status, 200, `${path} returned ${response.status}`);
  return body;
};

const internalLinks = (html) => {
  const links = [...html.matchAll(/href="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/") && !href.startsWith("/_next/"))
    .map((href) => new URL(href, "http://example.test").pathname)
    .filter((pathname) => !extname(pathname))
    .map((pathname) => (pathname.endsWith("/") ? pathname : `${pathname}/`));

  return [...new Set(links)];
};

const stylesheetLinks = (html) =>
  [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/_next/static/css/"));

const seededRandom = (seed = 20260601) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

const run = async () => {
  const baseUrl = await listen();

  try {
    const discoveredLinks = new Set(requiredRoutes);
    for (const route of requiredRoutes) {
      const html = await fetchPage(baseUrl, route);
      for (const link of internalLinks(html)) {
        discoveredLinks.add(link);
      }
    }

    for (const link of discoveredLinks) {
      await fetchPage(baseUrl, link);
    }

    const homeHtml = await fetchPage(baseUrl, "/");
    const blogHtml = await fetchPage(baseUrl, "/blog/");
    assert.ok(homeHtml.includes("language-toggle"), "Homepage has no language switcher");
    assert.ok(homeHtml.includes("切换到英文"), "Homepage has no Chinese language-switch label");
    assert.ok(homeHtml.includes("tonkic-locale"), "Locale preference bootstrap is missing");
    assert.ok(blogHtml.includes('data-lang="zh"') && blogHtml.includes('data-lang="en"'), "Blog index does not contain both language templates");

    const sigmoidHtml = await fetchPage(baseUrl, mathRegressionRoute);
    const renderedMathBlocks = [...sigmoidHtml.matchAll(/class="math-block-content"[\s\S]*?<\/figure>/g)]
      .map((match) => match[0])
      .join("\n");
    assert.ok(renderedMathBlocks, "No rendered math blocks found on sigmoid page");
    assert.ok(renderedMathBlocks.includes('class="katex'), "Sigmoid formulas are not rendered by KaTeX");
    assert.ok(renderedMathBlocks.includes("<mfrac>"), "Fraction structure is missing from sigmoid formulas");
    assert.ok(!sigmoidHtml.includes('class="blog-article-summary"'), "Generated summary still duplicates the article body");
    assert.ok(Buffer.byteLength(sigmoidHtml, "utf8") < 1_000_000, "Blog article HTML still contains the full knowledge base payload");

    const attentionHtml = await fetchPage(baseUrl, attentionMaskRoute);
    const attentionMathBlocks = [...attentionHtml.matchAll(/class="math-block-content"[\s\S]*?<\/figure>/g)]
      .map((match) => match[0])
      .join("\n");
    assert.ok(attentionMathBlocks, "No rendered math blocks found on attention mask page");
    assert.ok(attentionMathBlocks.includes('class="katex'), "Attention formula is not rendered by KaTeX");
    assert.ok(attentionMathBlocks.includes("<msqrt>"), "Square root structure is missing from attention formula");

    const complexMathHtml = await fetchPage(baseUrl, complexMathRoute);
    const complexMathBlocks = [...complexMathHtml.matchAll(/class="math-block-content"[\s\S]*?<\/figure>/g)]
      .map((match) => match[0])
      .join("\n");
    assert.ok(complexMathBlocks.includes("<mfrac>"), "Complex fraction structure is missing");
    assert.ok(complexMathBlocks.includes("⌊"), "Floor command did not render as a mathematical operator");
    assert.ok(!complexMathBlocks.includes("katex-error"), "Complex formula exposes a KaTeX parser error");

    const adjacentMathHtml = await fetchPage(baseUrl, adjacentMathRoute);
    const adjacentMathBlocks = [...adjacentMathHtml.matchAll(/class="math-block-content"[\s\S]*?<\/figure>/g)]
      .map((match) => match[0])
      .join("\n");
    assert.ok(adjacentMathBlocks.includes("<mfrac>") || adjacentMathBlocks.includes('class="katex'), "Adjacent display formulas were not separated");
    assert.ok(!adjacentMathBlocks.includes("katex-error"), "Adjacent display formulas expose a KaTeX parser error");

    const delimiterHtml = await fetchPage(baseUrl, delimiterRegressionRoute);
    const delimiterStart = delimiterHtml.indexOf('<div class="blog-article-body">');
    const delimiterEnd = delimiterHtml.indexOf('<nav class="blog-article-pagination"', delimiterStart);
    const delimiterBody = delimiterStart >= 0 && delimiterEnd > delimiterStart ? delimiterHtml.slice(delimiterStart, delimiterEnd) : "";
    assert.ok(delimiterBody.includes('class="math-inline math-inline-display"'), "Delimiter regression page has no display math");
    assert.ok(!delimiterBody.includes("\\[1.0"), "\\[...\\] delimiter leaked into article text");

    const cssPaths = stylesheetLinks(sigmoidHtml);
    assert.ok(cssPaths.length > 0, "No stylesheet found on sigmoid page");
    const cssText = (await Promise.all(cssPaths.map((path) => fetchPage(baseUrl, path)))).join("\n");
    assert.ok(cssText.includes(".language-toggle"), "Language switcher styles are missing");
    assert.match(cssText, /html\[data-locale=(?:"en"|en)]\s*\[data-lang=(?:"zh"|zh)]/, "Locale visibility styles are missing");
    assert.ok(!cssText.includes("vertical-align:-.42em"), "Math fractions still use negative vertical alignment");
    assert.ok(!cssText.includes("vertical-align: -0.42em"), "Math fractions still use negative vertical alignment");
    for (const obsoleteSelector of [
      ".knowledge-explorer",
      ".category-chip",
      ".relay-status-panel",
      ".model-card",
      ".resume-sheet",
    ]) {
      assert.ok(!cssText.includes(obsoleteSelector), `Obsolete selector returned: ${obsoleteSelector}`);
    }

    const random = seededRandom();
    let current = "/";
    const visited = new Set([current]);

    for (let step = 0; step < walkSteps; step += 1) {
      const html = await fetchPage(baseUrl, current);
      const links = internalLinks(html);
      assert.ok(links.length > 0, `${current} has no internal links for a visitor to continue`);

      current = links[Math.floor(random() * links.length)];
      visited.add(current);
    }

    assert.ok(visited.has("/portfolio/"), "Random journey never reached Portfolio");
    assert.ok(visited.has("/blog/"), "Random journey never reached Blog");

    console.log(
      `Random visitor journey passed: ${visited.size} unique routes visited, ${discoveredLinks.size} links checked.`,
    );
  } finally {
    server.close();
  }
};

await run();
