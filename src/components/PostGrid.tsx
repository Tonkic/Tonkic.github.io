import { useEffect } from "react"
import { layout, prepare } from "@chenglou/pretext"

type PostCard = {
  slug: string
  notePath: string
  folder: string
  title: string
  date?: string
  tags: string[]
  excerpt: string
}

type PostGroup = {
  folder: string
  posts: PostCard[]
}

type Props = {
  groups: PostGroup[]
}

function toPostUrl(notePath: string): string {
  const segments = notePath
    .split("/")
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
  return `/posts/${segments.join("/")}`
}

export default function PostGrid({ groups }: Props) {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".card .excerpt"))
    if (cards.length === 0) return

    const cache = new Map<string, ReturnType<typeof prepare>>()

    for (const el of cards) {
      const style = window.getComputedStyle(el)
      const text = el.textContent?.trim() ?? ""
      if (!text) continue

      const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      const lineHeight = Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) * 1.5
      const width = Math.max(120, el.clientWidth)
      const key = `${font}|${text}`

      let prepared = cache.get(key)
      if (!prepared) {
        prepared = prepare(text, font)
        cache.set(key, prepared)
      }

      const { height } = layout(prepared, width, lineHeight)
      el.style.minHeight = `${Math.ceil(height)}px`
    }
  }, [])

  return (
    <div>
      <nav className="folder-nav" aria-label="文件夹导航">
        {groups.map((group) => (
          <a key={group.folder} href={`#folder-${encodeURIComponent(group.folder)}`} className="folder-nav-link">
            {group.folder}
          </a>
        ))}
      </nav>

      {groups.map((group) => (
        <section className="folder-section" id={`folder-${encodeURIComponent(group.folder)}`} key={group.folder}>
          <h2 className="folder-title">{group.folder}</h2>
          <div className="grid">
            {group.posts.map((post) => (
              <a href={toPostUrl(post.notePath)} style={{ textDecoration: "none", color: "inherit" }} key={post.slug}>
                <article className="card">
                  <h3>{post.title}</h3>
                  <div className="meta">
                    {post.date ?? ""} {post.tags.length > 0 ? `· ${post.tags.join(" / ")}` : ""}
                  </div>
                  <p className="excerpt">{post.excerpt}</p>
                </article>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
