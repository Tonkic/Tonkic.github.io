# ADR 001：静态站的中转服务健康状态

## 状态

已采用，2026-08-12 收窄快照 Interface。

## 背景

本站部署在 GitHub Pages，中转站位于 `https://tonkicapi.xyz/`。公开状态接口没有向本站开放 CORS，因此浏览器不能可靠地直接读取状态。本站也不应复制中转站的模型与价格目录。

## 决策

1. GitHub Actions 每 15 分钟运行 `scripts/sync-relay-snapshot.mjs`，只请求无需鉴权的 `/api/status`。
2. 快照只保存 `health`：`reachable`、`checkedAt`、`lastSuccessAt` 和 `detail`。
3. 同步失败时标记本次不可达，并保留最近一次成功时间。
4. 浏览器实时探测默认关闭；只有接口向 `https://tonkic.github.io` 开放受限 CORS 后才可启用。
5. 模型、供应商、价格、用户信息、API Key、额度和请求记录不进入快照或前端资源。

## 结果

- 页面可以在纯静态架构下显示最近一次健康状态。
- 快照 Interface 与实际 UI 一致，避免生成和发布未消费的价格数据。
- 状态可能比真实服务滞后约 15 分钟；实时信息以中转站自身页面为准。
- Pages 部署仍依赖公开健康接口，但探测失败不会清除最近成功时间。
