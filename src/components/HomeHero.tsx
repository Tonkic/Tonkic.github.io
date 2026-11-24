"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
const LETTERS = "Tonkic".split("");

export function HomeHero({
  noteCount,
  repoCount,
  totalStars,
  relayReachable,
}: {
  noteCount: number;
  repoCount: number;
  totalStars: number;
  relayReachable: boolean;
}) {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="landing-hero" aria-label={t("home.landing")}>
      <div className="landing-glow" aria-hidden="true" />

      <div className="landing-stage">
        <motion.div
          className="landing-coords"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span>N23.13° E113.32°</span>
          <span aria-hidden="true">/</span>
          <span>SCNU · AI</span>
        </motion.div>

        <h1 className="landing-title" aria-label="Tonkic">
          {LETTERS.map((letter, i) => (
            <span className="letter-wrap" key={i} aria-hidden="true">
              <motion.span
                className="letter"
                initial={reduce ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.12 + i * 0.055,
                  duration: 0.78,
                  ease: EASE,
                }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="landing-tagline"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.55, duration: 0.55, ease: EASE }}
        >
          AI INFRASTRUCTURE · BACKEND · KNOWLEDGE
        </motion.p>
      </div>

      <motion.nav
        aria-label="Primary Spaces"
        className="portal-strip"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.68, duration: 0.65, ease: EASE }}
      >
        <Link className="portal-tile portal-blog" href="/blog">
          <div className="portal-top">
            <span className="portal-num">01</span>
            <svg className="portal-glyph" viewBox="0 0 44 20" aria-hidden="true">
              <line x1="6" y1="14" x2="18" y2="6" />
              <line x1="18" y1="6" x2="30" y2="13" />
              <line x1="30" y1="13" x2="39" y2="5" />
              <circle cx="6" cy="14" r="2.2" />
              <circle cx="18" cy="6" r="2.8" />
              <circle cx="30" cy="13" r="2.2" />
              <circle cx="39" cy="5" r="2.5" />
            </svg>
          </div>
          <div className="portal-body">
            <strong>{t("home.knowledge")}</strong>
            <span>{t("home.knowledgeSub")}</span>
          </div>
          <div className="portal-foot">
            <em>{noteCount} {t("home.notesUnit")}</em>
            <i aria-hidden="true">→</i>
          </div>
        </Link>

        <Link className="portal-tile portal-portfolio" href="/portfolio">
          <div className="portal-top">
            <span className="portal-num">02</span>
            <span className="portal-stat-chip">★ {totalStars}</span>
          </div>
          <div className="portal-body">
            <strong>{t("home.projects")}</strong>
            <span>{t("home.projectsSub")}</span>
          </div>
          <div className="portal-foot">
            <em>{repoCount} {t("home.reposUnit")}</em>
            <i aria-hidden="true">→</i>
          </div>
        </Link>

        <Link className="portal-tile portal-relay" href="/api-relay">
          <div className="portal-top">
            <span className="portal-num">03</span>
            <span className={`portal-live-dot ${relayReachable ? "online" : "offline"}`} aria-hidden="true" />
          </div>
          <div className="portal-body">
            <strong>{t("home.relay")}</strong>
            <span>{t("home.relaySub")}</span>
          </div>
          <div className="portal-foot">
            <em>tonkicapi.xyz</em>
            <i aria-hidden="true">→</i>
          </div>
        </Link>

        <Link className="portal-tile portal-cv" href="/cv">
          <div className="portal-top">
            <span className="portal-num">04</span>
            <span className="portal-mono-tag">A4 / PDF</span>
          </div>
          <div className="portal-body">
            <strong>{t("home.cv")}</strong>
            <span>{t("home.cvSub")}</span>
          </div>
          <div className="portal-foot">
            <em>CV</em>
            <i aria-hidden="true">→</i>
          </div>
        </Link>
      </motion.nav>
    </section>
  );
}
