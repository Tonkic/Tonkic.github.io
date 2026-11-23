"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
const LETTERS = "Tonkic".split("");

export function HomeHero() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="landing-hero" aria-label={t("home.landing")}>
      <div className="landing-glow" aria-hidden="true" />
      <motion.div
        className="landing-ruler"
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <span key={i} className="ruler-tick" style={{ left: `${(i / 8) * 100}%` }} />
        ))}
      </motion.div>

      <motion.span
        className="corner-mark corner-tl"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.2, duration: 0.6, ease: EASE }}
      >
        N23.13° / E113.32°
      </motion.span>
      <motion.span
        className="corner-mark corner-tr"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.26, duration: 0.6, ease: EASE }}
      >
        SCNU · SCHOOL OF AI
      </motion.span>

      <div className="landing-stage">
        <motion.span
          className="landing-eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.15, duration: 0.5, ease: EASE }}
        >
          01 — Index
        </motion.span>

        <h1 className="landing-title" aria-label="Tonkic">
          {LETTERS.map((letter, i) => (
            <span className="letter-wrap" key={i} aria-hidden="true">
              <motion.span
                className="letter"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.28 + i * 0.065,
                  duration: 0.85,
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
          transition={{ delay: reduce ? 0 : 0.85, duration: 0.65, ease: EASE }}
        >
          AI INFRASTRUCTURE · BACKEND SYSTEMS · KNOWLEDGE BASE
        </motion.p>

        <motion.div
          className="landing-actions"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 1.02, duration: 0.65, ease: EASE }}
        >
          <Link className="button primary" href="/blog">
            {t("home.knowledge")}
          </Link>
          <Link className="button" href="/api-relay">
            {t("home.relay")}
          </Link>
          <Link className="button" href="/portfolio">
            {t("home.projects")}
          </Link>
          <Link className="button" href="/cv">
            CV
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="status-bar"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.25, duration: 0.6, ease: EASE }}
      >
        <span className="status-live">
          <i className="status-dot" aria-hidden="true" />
          {t("home.online")}
        </span>
        <span>GUANGZHOU · UTC+8</span>
        <span>STATIC / GITHUB PAGES</span>
      </motion.div>
    </section>
  );
}
