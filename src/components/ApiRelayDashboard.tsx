"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import relaySnapshotData from "@/data/relay-snapshot.json";
import { siteProfile } from "@/data/site-config";
import { useLanguage } from "@/components/LanguageProvider";
import type { Locale } from "@/i18n/config";
import type { MessagePath } from "@/i18n/messages";

type RelaySnapshot = {
  health: {
    reachable: boolean;
    checkedAt: string;
    lastSuccessAt: string | null;
    detail: string;
  };
};

type RelayHealth = {
  label: string;
  reason: string;
  tone: "checking" | "offline" | "online";
};

const relaySnapshot = relaySnapshotData as RelaySnapshot;
const relayOrigin = siteProfile.publicRelayUrl.replace(/\/$/, "");
const liveHealthUrl = `${relayOrigin}${siteProfile.relayHealthPath}`;

const EASE = [0.22, 1, 0.36, 1] as const;

const formatCheckedAt = (value: string | null, locale: Locale, fallback: string) => {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

const buildSnapshotHealth = (locale: Locale, t: (path: MessagePath) => string): RelayHealth => {
  if (relaySnapshot.health.reachable) {
    const checked = formatCheckedAt(relaySnapshot.health.checkedAt, locale, t("relay.noSuccess"));
    return {
      label: t("relay.onlineSnapshot"),
      reason: `${t("relay.latest")} ${checked} · ${t("relay.snapshotCadence")}`,
      tone: "online",
    };
  }

  const lastSeen = formatCheckedAt(relaySnapshot.health.lastSuccessAt, locale, t("relay.noSuccess"));
  return {
    label: t("relay.offline"),
    reason: `${t("relay.lastOnline")} ${lastSeen} · ${t("relay.snapshotCadence")}`,
    tone: "offline",
  };
};

export function ApiRelayDashboard() {
  const reduceMotion = useReducedMotion();
  const { locale, t } = useLanguage();
  const [liveHealth, setLiveHealth] = useState<RelayHealth | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!siteProfile.relayBrowserProbeEnabled) {
      setLiveHealth(null);
      return;
    }

    if (window.location.protocol === "https:" && liveHealthUrl.startsWith("http://")) {
      const base = buildSnapshotHealth(locale, t);
      setLiveHealth({
        ...base,
        reason: `${base.reason} · ${t("relay.httpsPending")}`,
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
        if (payload.success === false) throw new Error("status failed");
        if (active) {
          setLiveHealth({
            label: t("relay.liveOnline"),
            reason: t("relay.justProbed"),
            tone: "online",
          });
        }
      } catch {
        if (active) {
          const base = buildSnapshotHealth(locale, t);
          setLiveHealth({
            ...base,
            reason: `${base.reason} · ${t("relay.unreadable")}`,
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
  }, [locale, t]);

  const health = liveHealth ?? buildSnapshotHealth(locale, t);

  const copyOrigin = async () => {
    try {
      await navigator.clipboard.writeText(relayOrigin);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div className="dashboard-shell">
      <motion.section
        className="relay-gateway-frame"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
      >
        <header className="relay-gateway-topline">
          <p className="eyebrow">01 — API Relay / Gateway</p>
          <div aria-live="polite" className={`relay-health ${health.tone}`} role="status">
            <span className="relay-health-dot" aria-hidden="true" />
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
            <span>OPENAI / RESPONSES COMPATIBLE</span>
            <span>SSE & WEBSOCKET STREAMING</span>
            <span>MULTI-PROVIDER ROUTING</span>
          </div>
        </div>

        <footer className="relay-gateway-footer">
          <a className="relay-launch" href={siteProfile.publicRelayUrl} target="_blank" rel="noreferrer">
            <span className="relay-launch-copy">
              <small>EXTERNAL GATEWAY</small>
              <strong>{t("relay.open")}</strong>
            </span>
            <span className="relay-launch-arrow" aria-hidden="true">↗</span>
          </a>
          <div className="relay-address">
            <span>{t("relay.address")}</span>
            <div className="relay-address-row">
              <code>{relayOrigin}</code>
              <button className="relay-copy-btn" onClick={copyOrigin} type="button">
                {copied ? t("relay.copiedUrl") : t("relay.copyUrl")}
              </button>
            </div>
          </div>
        </footer>
      </motion.section>
      <p className="relay-landing-footnote">{t("relay.footnote")}</p>
    </div>
  );
}
