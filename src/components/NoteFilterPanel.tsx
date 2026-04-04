import { useEffect, useMemo, useRef, useState, type ChangeEvent, type MouseEvent } from "react"
import { layout, prepare } from "@chenglou/pretext"

type FilterItem = {
  notePath: string
  title: string
  excerpt: string
  aliases: string[]
  categories: string[]
  searchText: string
}

type Props = {
  items: FilterItem[]
  emptyLabel?: string
  showResultsByDefault?: boolean
}

function toNoteUrl(notePath: string): string {
  const segs = notePath
    .split("/")
    .filter(Boolean)
    .map((s) => encodeURIComponent(s))
  return `/posts/${segs.join("/")}`
}

export default function NoteFilterPanel({
  items,
  emptyLabel = "当前目录暂无文件",
  showResultsByDefault = true,
}: Props) {
  const [query, setQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [includeCategories, setIncludeCategories] = useState<string[]>([])
  const [excludeCategories, setExcludeCategories] = useState<string[]>([])
  const excerptRefs = useRef<Map<string, HTMLParagraphElement>>(new Map())

  const categories = useMemo(() => {
    return Array.from(new Set(items.flatMap((item) => item.categories))).sort((a, b) => a.localeCompare(b, "zh-CN"))
  }, [items])

  const hasIntersection = (source: string[], selected: string[]) => {
    if (selected.length === 0) return false
    return selected.some((v) => source.includes(v))
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      if (includeCategories.length > 0 && !hasIntersection(item.categories, includeCategories)) return false
      if (excludeCategories.length > 0 && hasIntersection(item.categories, excludeCategories)) return false

      if (q && !item.searchText.includes(q)) return false
      return true
    })
  }, [excludeCategories, includeCategories, items, query])

  const hasActiveFilter =
    query.trim() !== "" ||
    includeCategories.length > 0 ||
    excludeCategories.length > 0
  const shouldShowResults = showResultsByDefault || hasActiveFilter

  const onQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

  const removeFrom = (list: string[], value: string) => list.filter((v) => v !== value)

  const onCategoryLeftClick = (token: string) => {
    if (includeCategories.includes(token)) {
      setIncludeCategories(removeFrom(includeCategories, token))
      return
    }

    setIncludeCategories([...includeCategories, token])
    if (excludeCategories.includes(token)) {
      setExcludeCategories(removeFrom(excludeCategories, token))
    }
  }

  const onCategoryRightClick = (event: MouseEvent<HTMLButtonElement>, token: string) => {
    event.preventDefault()

    if (excludeCategories.includes(token)) {
      setExcludeCategories(removeFrom(excludeCategories, token))
      return
    }

    setExcludeCategories([...excludeCategories, token])
    if (includeCategories.includes(token)) {
      setIncludeCategories(removeFrom(includeCategories, token))
    }
  }

  const clearFilters = () => {
    setIncludeCategories([])
    setExcludeCategories([])
  }

  const selectionSummary = includeCategories.length + excludeCategories.length

  useEffect(() => {
    const elements = Array.from(excerptRefs.current.values())
    if (elements.length === 0) return

    const cache = new Map<string, ReturnType<typeof prepare>>()
    for (const el of elements) {
      const text = el.textContent?.trim() ?? ""
      if (!text) continue

      const style = window.getComputedStyle(el)
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
  }, [filtered])

  return (
    <section className="filter-panel">
      <div className="filter-toolbar">
        <input
          className="filter-input"
          type="search"
          placeholder="搜索标题、正文、别名、分类..."
          value={query}
          onChange={onQuery}
        />
        <button type="button" className="filter-menu-toggle" onClick={() => setMenuOpen((v) => !v)}>
          筛选菜单
          {selectionSummary > 0 && <span className="filter-count">{selectionSummary}</span>}
        </button>
        <button type="button" className="filter-clear-btn" onClick={clearFilters} disabled={selectionSummary === 0}>
          清空筛选
        </button>
      </div>

      {menuOpen && (
        <div className="filter-menu" role="region" aria-label="分类筛选">
          <div className="filter-menu-help">左键：包含，右键：排除。再次点击可取消。</div>
          <div className="token-legend">
            <span className="token-legend-item include">已包含</span>
            <span className="token-legend-item exclude">已排除</span>
            <span className="token-legend-item neutral">未选择</span>
          </div>

          <div className="filter-menu-section">
            <h4>分类</h4>
            {categories.length === 0 ? (
              <p className="filter-empty">当前结果集中无分类</p>
            ) : (
              <ul className="token-chip-list">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      className={`token-chip ${includeCategories.includes(c) ? "include" : excludeCategories.includes(c) ? "exclude" : "neutral"}`}
                      onClick={() => onCategoryLeftClick(c)}
                      onContextMenu={(e) => onCategoryRightClick(e, c)}
                      title="左键包含，右键排除"
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      )}

      {shouldShowResults && filtered.length === 0 ? (
        <p className="filter-empty">未匹配到结果</p>
      ) : shouldShowResults ? (
        <ul className="notes-list filter-results">
          {filtered.map((item) => (
            <li key={item.notePath} className="entry-row file-row">
              <a className="entry-link" href={toNoteUrl(item.notePath)}>
                <span>{item.title}</span>
                {item.excerpt && (
                  <p
                    className="note-preview"
                    ref={(el) => {
                      if (el) excerptRefs.current.set(item.notePath, el)
                      else excerptRefs.current.delete(item.notePath)
                    }}
                  >
                    {item.excerpt}
                  </p>
                )}
                {(item.categories.length > 0 || item.aliases.length > 0) && (
                  <div className="meta-chip-list compact">
                    {item.categories.map((c) => (
                      <span key={`${item.notePath}-cat-${c}`} className="meta-chip category">
                        {c}
                      </span>
                    ))}
                    {item.aliases.map((a) => (
                      <span key={`${item.notePath}-alias-${a}`} className="meta-chip alias">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="filter-empty">输入关键词或在筛选菜单中选择分类包含/排除条件后显示结果</p>
      )}

      {items.length === 0 && <p className="filter-empty">{emptyLabel}</p>}
    </section>
  )
}
