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

const EASE = [0.22, 1, 0.36, 1] as const;

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

  return (
    <div className="dashboard-shell">
      <motion.section
        className="relay-gateway-frame"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
      >
        <header className="relay-gateway-topline">
          <p className="eyebrow">01 — API Relay / Gateway</p>
          <div aria-live="polite" className={`relay-health ${health.tone}`} role="status">
            <span className="relay-health-dot" aria-hidden />
            <span>
              <strong>{health.label}</strong>
              <small>{health.reason}</small>
            </span>
          </div>
        </header>

        <div className="relay-gateway-body">
          <h1 className="relay-gateway-title" aria-label="Model API Relay">
            <span>MODEL API</span>
            <span>RELAY</span>
          </h1>
          <div className="relay-landing-meta">
            <span>OPENAI COMPATIBLE</span>
            <span>PUBLIC ACCESS</span>
          </div>
        </div>

        <footer className="relay-gateway-footer">
          <a className="relay-launch" href={siteProfile.publicRelayUrl} target="_blank" rel="noreferrer">
            <span className="relay-launch-copy">
              <small>EXTERNAL GATEWAY</small>
              <strong>打开中转站</strong>
            </span>
            <span className="relay-launch-arrow" aria-hidden>↗</span>
          </a>
          <div className="relay-address">
            <span>服务地址</span>
            <strong>{relayOrigin}</strong>
          </div>
        </footer>
      </motion.section>
      <p className="relay-landing-footnote">服务详情、模型列表与价格以中转站内实时信息为准。</p>
    </div>
  );
}
