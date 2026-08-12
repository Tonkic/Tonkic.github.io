import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { assertRelaySnapshot, createRelaySnapshot, emptyRelaySnapshot } from "./relay-snapshot.mjs";

const baseUrl = (process.env.RELAY_BASE_URL || "https://tonkicapi.xyz").replace(/\/$/, "");
const outputFile = path.join("src", "data", "relay-snapshot.json");
const checkedAt = new Date().toISOString();

const readPrevious = async () => {
  try {
    return JSON.parse(await readFile(outputFile, "utf8"));
  } catch {
    return emptyRelaySnapshot();
  }
};

const fetchJson = async (pathname) => {
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`${pathname} returned HTTP ${response.status}`);
  return response.json();
};

const main = async () => {
  const previous = await readPrevious();
  let reachable = false;
  let detail = "公开状态接口响应正常";

  try {
    const payload = await fetchJson("/api/status");
    reachable = payload?.success !== false;
    if (!reachable) detail = "公开状态接口返回失败";
  } catch (error) {
    detail = error instanceof Error ? error.message : String(error);
  }

  const snapshot = createRelaySnapshot({ checkedAt, previous, reachable, detail });
  assertRelaySnapshot(snapshot);

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Relay snapshot updated: ${reachable ? "online" : "offline"}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
