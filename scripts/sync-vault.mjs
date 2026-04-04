import { existsSync, rmSync } from "node:fs"
import { spawnSync } from "node:child_process"
import { join } from "node:path"

const root = process.cwd()
const targetDir = join(root, "content", "vault")
const repoUrl = "https://github.com/Tonkic/tonkic-obsidian-vault.git"

function run(cmd, args, cwd = root) {
  const result = spawnSync(cmd, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

if (existsSync(targetDir)) {
  console.log("[sync:vault] Removing existing vault directory...")
  rmSync(targetDir, { recursive: true, force: true })
}

console.log("[sync:vault] Cloning vault repository...")
run("git", ["clone", "--depth", "1", repoUrl, targetDir])

console.log("[sync:vault] Done.")
