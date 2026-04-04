import { readFileSync } from "node:fs"
import { join } from "node:path"
import matter from "gray-matter"

export type SitePage = {
  title: string
  description?: string
  body: string
}

function readPage(filename: string): SitePage {
  const fullPath = join(process.cwd(), "content", filename)
  const raw = readFileSync(fullPath, "utf-8")
  const parsed = matter(raw)

  return {
    title: typeof parsed.data.title === "string" ? parsed.data.title : "",
    description: typeof parsed.data.description === "string" ? parsed.data.description : undefined,
    body: parsed.content,
  }
}

export function getHomePage(): SitePage {
  return readPage("index.md")
}

export function getCvPage(): SitePage {
  return readPage("cv.md")
}
