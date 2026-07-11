import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = (process.env.RELAY_BASE_URL || "https://tonkic.opik.net").replace(/\/$/, "");
const outputFile = path.join("src", "data", "relay-snapshot.json");
const checkedAt = new Date().toISOString();

const readPrevious = async () => {
  try {
    return JSON.parse(await readFile(outputFile, "utf8"));
  } catch {
    return { health: {}, status: {}, models: [] };
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

const roundPrice = (value) => Math.round(Number(value || 0) * 1_000_000) / 1_000_000;

const main = async () => {
  const previous = await readPrevious();
  const [statusResult, pricingResult] = await Promise.allSettled([
    fetchJson("/api/status"),
    fetchJson("/api/pricing"),
  ]);

  const statusPayload = statusResult.status === "fulfilled" ? statusResult.value?.data : null;
  const pricingPayload = pricingResult.status === "fulfilled" ? pricingResult.value : null;
  const endpoint = pricingPayload?.supported_endpoint
    ? Object.values(pricingPayload.supported_endpoint)[0]
    : null;
  const vendors = new Map((pricingPayload?.vendors || []).map((vendor) => [vendor.id, vendor.name]));

  const status = statusPayload
    ? {
        systemName: statusPayload.system_name || "New API",
        version: statusPayload.version || "未知",
        docsLink: statusPayload.docs_link || previous.status?.docsLink || "",
        serverAddress: baseUrl,
        endpointPath: endpoint?.path || previous.status?.endpointPath || "/v1/chat/completions",
        endpointMethod: endpoint?.method || previous.status?.endpointMethod || "POST",
        priceCurrency: "USD",
      }
    : previous.status;

  const models = Array.isArray(pricingPayload?.data)
    ? pricingPayload.data.map((model) => ({
        modelName: model.model_name,
        vendor: vendors.get(model.vendor_id) || model.owner_by || "未知供应商",
        inputPrice: roundPrice(model.model_ratio),
        outputPrice: roundPrice(model.completion_ratio),
        cachePrice: roundPrice(model.cache_ratio),
        endpointTypes: model.supported_endpoint_types || [],
      }))
    : previous.models;

  const reachable = Boolean(statusPayload);
  const errors = [statusResult, pricingResult]
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason?.message || String(result.reason));

  const snapshot = {
    health: {
      reachable,
      checkedAt,
      lastSuccessAt: reachable ? checkedAt : previous.health?.lastSuccessAt || null,
      detail: errors.length ? errors.join("; ") : "公开状态接口响应正常",
    },
    status,
    models,
  };

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Relay snapshot updated: ${reachable ? "online" : "offline"}, ${models.length} models`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
