"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import relaySnapshotData from "@/data/relay-snapshot.json";
import { siteProfile } from "@/data/site-config";

type PricingModel = {
  modelName: string;
  vendor: string;
  inputPrice: number;
  outputPrice: number;
  cachePrice: number;
  endpointTypes: string[];
};

type RelaySnapshot = {
  health: {
    reachable: boolean;
    checkedAt: string;
    lastSuccessAt: string | null;
    detail: string;
  };
  status: {
    systemName: string;
    version: string;
    docsLink: string;
    serverAddress: string;
    endpointPath: string;
    endpointMethod: string;
    priceCurrency: string;
  };
  models: PricingModel[];
};

type RelayHealth = {
  label: string;
  reason: string;
  tone: "checking" | "offline" | "online" | "unknown";
};

const relaySnapshot = relaySnapshotData as RelaySnapshot;
const relayOrigin = siteProfile.publicRelayUrl.replace(/\/$/, "");
const liveHealthUrl = `${relayOrigin}${siteProfile.relayHealthPath}`;

const formatCheckedAt = (value: string | null) => {
  if (!value) return "暂无成功记录";
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
};

const snapshotHealth = (): RelayHealth =>
  relaySnapshot.health.reachable
    ? {
        label: "服务在线（自动快照）",
        reason: `最近探测：${formatCheckedAt(relaySnapshot.health.checkedAt)}`,
        tone: "online",
      }
    : {
        label: "最近探测未连接",
        reason: `上次在线：${formatCheckedAt(relaySnapshot.health.lastSuccessAt)}`,
        tone: "offline",
      };

export function ApiRelayDashboard() {
  const reduceMotion = useReducedMotion();
  const [health, setHealth] = useState<RelayHealth>(snapshotHealth);

  useEffect(() => {
    if (!siteProfile.relayBrowserProbeEnabled) {
      setHealth({
        ...snapshotHealth(),
        reason: `${snapshotHealth().reason}；实时探测等待接口开放 CORS`,
      });
      return;
    }

    if (window.location.protocol === "https:" && liveHealthUrl.startsWith("http://")) {
      setHealth({
        ...snapshotHealth(),
        reason: `${snapshotHealth().reason}；实时探测等待中转站启用 HTTPS`,
      });
      return;
    }

    let active = true;
    let currentController: AbortController | null = null;

    const probe = async () => {
      currentController?.abort();
      const controller = new AbortController();
      currentController = controller;
      const timeout = window.setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(liveHealthUrl, {
          cache: "no-store",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as { success?: boolean };
        if (payload.success === false) throw new Error("状态接口返回失败");
        if (active) {
          setHealth({
            label: "服务在线（实时）",
            reason: `刚刚通过 ${siteProfile.relayHealthPath} 探测`,
            tone: "online",
          });
        }
      } catch {
        if (active) {
          setHealth({
            ...snapshotHealth(),
            reason: `${snapshotHealth().reason}；浏览器实时接口暂不可读`,
          });
        }
      } finally {
        window.clearTimeout(timeout);
      }
    };

    void probe();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void probe();
    }, 60000);

    return () => {
      active = false;
      currentController?.abort();
      window.clearInterval(interval);
    };
  }, []);

  const { models, status } = relaySnapshot;

  return (
    <div className="dashboard-shell">
      <section className="dashboard-hero">
        <motion.div
          className="hero-panel"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">API Relay</p>
          <h1 className="hero-title">
            模型 API
            <span>中转</span>
          </h1>
          <p className="hero-copy">OpenAI compatible 模型中转服务。模型调用、充值和 token 管理均在中转站内完成。</p>
          <div className="hero-actions">
            <a className="button primary" href={siteProfile.publicRelayUrl} target="_blank" rel="noreferrer">
              打开中转站
            </a>
            {status.docsLink ? (
              <a className="button" href={status.docsLink} target="_blank" rel="noreferrer">
                查看文档
              </a>
            ) : null}
          </div>
        </motion.div>

        <motion.aside
          className="glass-panel relay-status-panel"
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Service Status</p>
          <p aria-live="polite" className={`status-dot ${health.tone}`} role="status">
            {health.label}
          </p>
          <p>{health.reason}</p>
          <div className="relay-address">
            <span>服务地址</span>
            <strong>{relayOrigin}</strong>
          </div>
          <div className="relay-address">
            <span>接口格式</span>
            <strong>OpenAI compatible</strong>
          </div>
        </motion.aside>
      </section>

      <section className="stats-grid">
        <StatCard label="系统名" value={status.systemName} meta="New API" />
        <StatCard label="版本" value={status.version} meta="公开状态" />
        <StatCard label="公开模型" value={String(models.length)} meta="自动同步" />
        <StatCard label="快照时间" value={formatCheckedAt(relaySnapshot.health.checkedAt)} meta="北京时间" />
      </section>

      <section className="glass-panel split-panel">
        <div>
          <p className="eyebrow">Gateway</p>
          <h2>调用入口</h2>
          <p>本站只展示公开信息，不保存 API Key。账户、额度和 token 均由中转站管理。</p>
          <div className="inline-actions">
            <a className="button primary" href={siteProfile.publicRelayUrl} target="_blank" rel="noreferrer">
              进入中转站
            </a>
          </div>
        </div>
        <div className="entry-list">
          <InfoRow label="服务地址" value={status.serverAddress || relayOrigin} />
          <InfoRow label="OpenAI endpoint" value={status.endpointPath} />
          <InfoRow label="请求方法" value={status.endpointMethod} />
          <InfoRow label="价格单位" value={status.priceCurrency} />
        </div>
      </section>

      <section className="glass-panel" id="models">
        <p className="eyebrow">Pricing Models</p>
        <h2>公开模型与价格</h2>
        <p className="snapshot-note">价格来自公开接口构建快照，实际计费以中转站内显示为准。</p>
        <div className="model-grid">
          {models.map((model, index) => (
            <PricingModelCard index={index} key={model.modelName} model={model} reduceMotion={Boolean(reduceMotion)} />
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

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(price);

function PricingModelCard({
  model,
  index,
  reduceMotion,
}: {
  model: PricingModel;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      className="model-card"
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: reduceMotion ? 0 : index * 0.035, duration: reduceMotion ? 0 : 0.42 }}
    >
      <div className="model-card-head">
        <h3>{model.modelName}</h3>
        <span className="model-status available">公开</span>
      </div>
      <p>provider: {model.vendor}</p>
      <div className="price-stack">
        <span>输入价格 ${formatPrice(model.inputPrice)}</span>
        <span>输出价格 ${formatPrice(model.outputPrice)}</span>
        <span>缓存价格 ${formatPrice(model.cachePrice)}</span>
      </div>
      <div className="tag-row">
        {model.endpointTypes.map((type) => (
          <span className="tag" key={type}>{type}</span>
        ))}
      </div>
    </motion.article>
  );
}
