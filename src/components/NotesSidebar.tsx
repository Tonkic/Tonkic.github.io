import { useMemo, useRef, useState, type MouseEvent } from "react"

type DirectoryEntry = {
  path: string
  name: string
  depth: number
  parentPath: string | null
  childDirPaths: string[]
  posts: Array<{
    notePath: string
    title: string
  }>
}

type Props = {
  directories: DirectoryEntry[]
  currentPath?: string
}

type TreeNode = {
  entry: DirectoryEntry
  children: TreeNode[]
}

function toDirectoryUrl(path: string): string {
  if (!path) return "/posts"
  const segs = path
    .split("/")
    .filter(Boolean)
    .map((s) => encodeURIComponent(s))
  return `/posts/${segs.join("/")}`
}

function toNoteUrl(notePath: string): string {
  const segs = notePath
    .split("/")
    .filter(Boolean)
    .map((s) => encodeURIComponent(s))
  return `/posts/${segs.join("/")}`
}

function buildTree(entries: DirectoryEntry[]): TreeNode[] {
  const map = new Map<string, TreeNode>()
  for (const entry of entries) {
    if (!entry.path) continue
    map.set(entry.path, { entry, children: [] })
  }

  const roots: TreeNode[] = []
  for (const node of map.values()) {
    const parentPath = node.entry.parentPath
    if (!parentPath) {
      roots.push(node)
      continue
    }

    const parent = map.get(parentPath)
    if (parent) {
      parent.children.push(node)
    } else {
      roots.push(node)
    }
  }

  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => a.entry.name.localeCompare(b.entry.name, "zh-CN"))
    for (const n of nodes) sortNodes(n.children)
  }
  sortNodes(roots)
  return roots
}

function buildOpenSet(currentPath: string): Set<string> {
  const open = new Set<string>()
  if (!currentPath) return open

  const parts = currentPath.split("/").filter(Boolean)
  let cursor = ""
  for (const part of parts) {
    cursor = cursor ? `${cursor}/${part}` : part
    open.add(cursor)
  }
  return open
}

export default function NotesSidebar({ directories, currentPath = "" }: Props) {
  const tree = useMemo(() => buildTree(directories), [directories])
  const [openSet, setOpenSet] = useState<Set<string>>(() => buildOpenSet(currentPath))
  const clickTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const toggle = (path: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  const handleLabelClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()

    const pending = clickTimers.current.get(path)
    if (pending) {
      clearTimeout(pending)
      clickTimers.current.delete(path)
    }

    const timer = setTimeout(() => {
      toggle(path)
      clickTimers.current.delete(path)
    }, 180)

    clickTimers.current.set(path, timer)
  }

  const handleLabelDoubleClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    const pending = clickTimers.current.get(path)
    if (pending) {
      clearTimeout(pending)
      clickTimers.current.delete(path)
    }
    window.location.href = toDirectoryUrl(path)
  }

  const renderNode = (node: TreeNode) => {
    const path = node.entry.path
    const isOpen = openSet.has(path)
    const isActive = currentPath === path
    const isBranch = currentPath.startsWith(`${path}/`)
    const hasChildren = node.children.length > 0
    const hasFiles = node.entry.posts.length > 0
    const isExpandable = hasChildren || hasFiles
    const linkClass = `sidebar-link tree ${isActive ? "active" : isBranch ? "active-branch" : ""}`

    return (
      <li key={path} className="sidebar-tree-item">
        <div className={`sidebar-item-row ${isActive ? "active" : isBranch ? "active-branch" : ""}`}>
          {isExpandable ? (
            <button
              className="sidebar-toggle"
              type="button"
              aria-label={isOpen ? "收起目录" : "展开目录"}
              aria-expanded={isOpen}
              onClick={() => toggle(path)}
            >
              {isOpen ? "▾" : "▸"}
            </button>
          ) : (
            <span className="sidebar-toggle placeholder" />
          )}
          <a
            className={linkClass}
            href={toDirectoryUrl(path)}
            onClick={(e) => handleLabelClick(e, path)}
            onDoubleClick={(e) => handleLabelDoubleClick(e, path)}
            title="单击展开/收起，双击进入目录"
            draggable={false}
          >
            <span>{node.entry.name}</span>
          </a>
        </div>
        {isOpen && (
          <ul className="sidebar-tree">
            {node.children.map((c) => renderNode(c))}
            {node.entry.posts.map((post) => {
              const fileActive = currentPath === post.notePath
              return (
                <li key={post.notePath} className="sidebar-tree-item sidebar-file-item">
                  <a className={`sidebar-link file ${fileActive ? "active" : ""}`} href={toNoteUrl(post.notePath)}>
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </li>
    )
  }

  return (
    <aside className="notes-sidebar">
      <div className="notes-sidebar-title">目录</div>
      <a className={`sidebar-link ${!currentPath ? "active" : ""}`} href="/posts">
        全部笔记
      </a>
      <ul className="sidebar-tree">{tree.map((n) => renderNode(n))}</ul>
    </aside>
  )
}
