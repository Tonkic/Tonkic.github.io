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
  timeLabel: string;
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
    return {
      label: t("relay.onlineSnapshot"),
      timeLabel: formatCheckedAt(relaySnapshot.health.checkedAt, locale, t("relay.noSuccess")),
      tone: "online",
    };
  }

  return {
    label: t("relay.offline"),
    timeLabel: formatCheckedAt(relaySnapshot.health.lastSuccessAt, locale, t("relay.noSuccess")),
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
            timeLabel: t("relay.justProbed"),
            tone: "online",
          });
        }
      } catch {
        // Keep snapshot state
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
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div className="dashboard-shell">
      <motion.section
        className="relay-gateway-frame"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.52, ease: EASE }}
      >
        <header className="relay-gateway-topline">
          <p className="eyebrow">03 — Gateway</p>
          <div aria-live="polite" className={`relay-health ${health.tone}`} role="status">
            <span className="relay-health-dot" aria-hidden="true" />
            <strong>{health.label}</strong>
            <small>{health.timeLabel}</small>
          </div>
        </header>

        <div className="relay-gateway-body">
          <h1 className="relay-gateway-title" aria-label="Model API Relay">
            <span>MODEL API</span>
            <span>RELAY</span>
          </h1>
          <div className="relay-landing-meta">
            <span>OPENAI / RESPONSES</span>
            <span>SSE & WEBSOCKET</span>
            <span>MULTI-PROVIDER</span>
          </div>
        </div>

        <footer className="relay-gateway-footer">
          <a className="relay-launch" href={siteProfile.publicRelayUrl} target="_blank" rel="noreferrer">
            <span className="relay-launch-copy">
              <small>TONKICAPI.XYZ</small>
              <strong>{t("relay.open")}</strong>
            </span>
            <span className="relay-launch-arrow" aria-hidden="true">↗</span>
          </a>

          <button className="relay-endpoint-surface" onClick={copyOrigin} type="button">
            <span>{copied ? t("relay.copiedUrl") : t("relay.address")}</span>
            <code>{relayOrigin}</code>
          </button>
        </footer>
      </motion.section>
    </div>
  );
}
