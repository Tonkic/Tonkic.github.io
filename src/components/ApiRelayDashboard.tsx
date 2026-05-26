"use client";

import { motion } from "framer-motion";
import { siteProfile } from "@/data/site";

type PricingModel = {
  modelName: string;
  vendor: string;
  inputPrice: number;
  outputPrice: number;
  cachePrice: number;
  endpointTypes: string[];
};

const relayInfo = {
  baseUrl: "http://8.134.220.84:8020",
  systemName: "New API",
  version: "v0.0.0",
  docsLink: "https://my.feishu.cn/wiki/PRSaw0rEFiKEcqkE0qScnwf2n6f?from=from_copylink",
  endpointPath: "/v1/chat/completions",
  endpointMethod: "POST",
  quotaDisplayType: "USD",
};

const pricingModels: PricingModel[] = [
  {
    modelName: "claude-opus-4-6",
    vendor: "Anthropic",
    inputPrice: 2.5,
    outputPrice: 5,
    cachePrice: 0.1,
    endpointTypes: ["openai"],
  },
  {
    modelName: "gpt-5.5",
    vendor: "OpenAI",
    inputPrice: 2.5,
    outputPrice: 6,
    cachePrice: 0.1,
    endpointTypes: ["openai"],
  },
  {
    modelName: "gpt-5.3-codex",
    vendor: "OpenAI",
    inputPrice: 0.875,
    outputPrice: 8,
    cachePrice: 0.1,
    endpointTypes: ["openai"],
  },
  {
    modelName: "gpt-5.4",
    vendor: "OpenAI",
    inputPrice: 1.25,
    outputPrice: 6,
    cachePrice: 0.1,
    endpointTypes: ["openai"],
  },
  {
    modelName: "deepseek-v4-flash-free",
    vendor: "DeepSeek",
    inputPrice: 0.07,
    outputPrice: 2,
    cachePrice: 0.02,
    endpointTypes: ["openai"],
  },
  {
    modelName: "mimo-v2.5",
    vendor: "New API",
    inputPrice: 0.2,
    outputPrice: 5,
    cachePrice: 0.2,
    endpointTypes: ["openai"],
  },
  {
    modelName: "mimo-v2.5-pro",
    vendor: "New API",
    inputPrice: 0.5,
    outputPrice: 3,
    cachePrice: 0.2,
    endpointTypes: ["openai"],
  },
];

export function ApiRelayDashboard() {
  return (
    <div className="dashboard-shell">
      <section className="dashboard-hero">
        <motion.div
          className="hero-panel"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">API Relay</p>
          <h1 className="hero-title">
            模型 API
            <span>中转</span>
          </h1>
          <p className="hero-copy">
            这是对外售卖的模型 API 中转入口。本站不保存 API Key；模型调用、充值和 token 管理都在中转站完成。
          </p>
          <div className="hero-actions">
            <a className="button primary" href={siteProfile.publicRelayUrl} target="_blank" rel="noreferrer">
              打开中转站
            </a>
            <a className="button" href={relayInfo.docsLink} target="_blank" rel="noreferrer">
              查看文档
            </a>
          </div>
        </motion.div>

        <motion.aside
          className="glass-panel"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Public Snapshot</p>
          <p className="status-dot online">中转站：公开入口可访问</p>
          <p>服务地址：{relayInfo.baseUrl}</p>
          <p>公开数据：来自 New API /api/status 与 /api/pricing 的最近快照</p>
          <p>说明：当前 GET 响应未返回 CORS 头，静态站不能在浏览器中直接读取接口。</p>
        </motion.aside>
      </section>

      <section className="stats-grid">
        <StatCard label="系统名" value={relayInfo.systemName} meta="New API" />
        <StatCard label="版本" value={relayInfo.version} meta="status.version" />
        <StatCard label="公开模型" value={String(pricingModels.length)} meta="/api/pricing snapshot" />
        <StatCard label="接口格式" value="OpenAI" meta={relayInfo.endpointPath} />
      </section>

      <section className="glass-panel split-panel">
        <div>
          <p className="eyebrow">Gateway</p>
          <h2>对外售卖中转</h2>
          <p>模型与价格使用公开信息快照展示。真正调用模型仍需要用户进入中转站登录并创建自己的 token。</p>
          <div className="inline-actions">
            <a className="button primary" href={siteProfile.publicRelayUrl} target="_blank" rel="noreferrer">
              进入中转站
            </a>
            <a className="button" href={relayInfo.docsLink} target="_blank" rel="noreferrer">
              文档
            </a>
          </div>
        </div>
        <div className="entry-list">
          <InfoRow label="服务地址" value={relayInfo.baseUrl} />
          <InfoRow label="额度显示" value={relayInfo.quotaDisplayType} />
          <InfoRow label="OpenAI endpoint" value={relayInfo.endpointPath} />
          <InfoRow label="请求方法" value={relayInfo.endpointMethod} />
        </div>
      </section>

      <section className="glass-panel" id="models">
        <p className="eyebrow">Pricing Models</p>
        <h2>公开模型与价格</h2>
        <div className="model-grid">
          {pricingModels.map((model, index) => (
            <PricingModelCard index={index} key={model.modelName} model={model} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, meta }: { label: string; value: string; meta: string }) {
  return (
    <article className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{meta}</span>
    </article>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="entry-row">
      <span className="entry-meta">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PricingModelCard({ model, index }: { model: PricingModel; index: number }) {
  return (
    <motion.article
      className="model-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.035, duration: 0.42 }}
    >
      <div className="model-card-head">
        <h3>{model.modelName}</h3>
        <span className="model-status available">公开</span>
      </div>
      <p>provider: {model.vendor}</p>
      <div className="price-stack">
        <span>输入价格 ${model.inputPrice}</span>
        <span>输出价格 ${model.outputPrice}</span>
        <span>缓存价格 ${model.cachePrice}</span>
      </div>
      <div className="tag-row">
        {model.endpointTypes.map((type) => (
          <span className="tag" key={type}>
            {type}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
