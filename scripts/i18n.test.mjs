import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);

const importTypeScript = async (path) => {
  const source = await readFile(new URL(path, root), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
};

const flattenKeys = (value, prefix = "") => Object.entries(value).flatMap(([key, child]) => {
  const path = prefix ? `${prefix}.${key}` : key;
  return typeof child === "string" ? [path] : flattenKeys(child, path);
});

test("Chinese and English dictionaries stay structurally identical", async () => {
  const { messages, getMessage } = await importTypeScript("src/i18n/messages.ts");
  const zhKeys = flattenKeys(messages.zh).sort();
  const enKeys = flattenKeys(messages.en).sort();

  assert.deepEqual(enKeys, zhKeys);
  for (const locale of ["zh", "en"]) {
    for (const path of zhKeys) {
      const value = getMessage(locale, path);
      assert.equal(typeof value, "string");
      assert.ok(value.trim(), `${locale}.${path} is empty`);
    }
  }
});

test("locale configuration and persistence contract stay stable", async () => {
  const config = await importTypeScript("src/i18n/config.ts");
  assert.deepEqual(config.locales, ["zh", "en"]);
  assert.equal(config.defaultLocale, "zh");
  assert.equal(config.localeStorageKey, "tonkic-locale");
  assert.equal(config.isLocale("zh"), true);
  assert.equal(config.isLocale("en"), true);
  assert.equal(config.isLocale("fr"), false);
  assert.equal(config.isLocale(null), false);
});

test("bilingual content templates include English portfolio and resume data", async () => {
  const site = await readFile(new URL("src/data/site.ts", root), "utf8");
  const resume = await readFile(new URL("src/data/resume-en.ts", root), "utf8");
  const layout = await readFile(new URL("src/app/layout.tsx", root), "utf8");

  assert.match(site, /summaryEn:/);
  assert.match(site, /contentEn:/);
  assert.match(resume, /resumeProjectsEn/);
  assert.match(layout, /tonkic-locale/);
  assert.match(layout, /document\.documentElement\.dataset\.locale/);
});
