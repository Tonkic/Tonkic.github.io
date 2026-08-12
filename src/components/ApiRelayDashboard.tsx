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
  tone: "checking" | "offline" | "online" | "unknown";
};

const relaySnapshot = relaySnapshotData as RelaySnapshot;
const relayOrigin = siteProfile.publicRelayUrl.replace(/\/$/, "");
const liveHealthUrl = `${relayOrigin}${siteProfile.relayHealthPath}`;

const EASE = [0.22, 1, 0.36, 1] as const;

const formatCheckedAt = (value: string | null, locale: Locale, fallback: string) => {
  if (!value) return fallback;
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
};

const snapshotHealth = (locale: Locale, t: (path: MessagePath) => string): RelayHealth =>
  relaySnapshot.health.reachable
    ? {
        label: t("relay.onlineSnapshot"),
        reason: `${t("relay.latest")}: ${formatCheckedAt(relaySnapshot.health.checkedAt, locale, t("relay.noSuccess"))}`,
        tone: "online",
      }
    : {
        label: t("relay.offline"),
        reason: `${t("relay.lastOnline")}: ${formatCheckedAt(relaySnapshot.health.lastSuccessAt, locale, t("relay.noSuccess"))}`,
        tone: "offline",
      };

export function ApiRelayDashboard() {
  const reduceMotion = useReducedMotion();
  const { locale, t } = useLanguage();
  const [health, setHealth] = useState<RelayHealth>(() => snapshotHealth(locale, t));

  useEffect(() => {
    if (!siteProfile.relayBrowserProbeEnabled) {
      setHealth({
        ...snapshotHealth(locale, t),
        reason: `${snapshotHealth(locale, t).reason}; ${t("relay.corsPending")}`,
      });
      return;
    }

    if (window.location.protocol === "https:" && liveHealthUrl.startsWith("http://")) {
      setHealth({
        ...snapshotHealth(locale, t),
        reason: `${snapshotHealth(locale, t).reason}; ${t("relay.httpsPending")}`,
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
          setHealth({
            label: t("relay.liveOnline"),
            reason: t("relay.justProbed"),
            tone: "online",
          });
        }
      } catch {
        if (active) {
          setHealth({
            ...snapshotHealth(locale, t),
            reason: `${snapshotHealth(locale, t).reason}; ${t("relay.unreadable")}`,
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
              <strong>{t("relay.open")}</strong>
            </span>
            <span className="relay-launch-arrow" aria-hidden>↗</span>
          </a>
          <div className="relay-address">
            <span>{t("relay.address")}</span>
            <strong>{relayOrigin}</strong>
          </div>
        </footer>
      </motion.section>
      <p className="relay-landing-footnote">{t("relay.footnote")}</p>
    </div>
  );
}
