"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const LETTERS = "Tonkic".split("");

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="landing-hero" aria-label="Tonkic landing">
      <motion.div
        className="landing-ruler"
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduce ? 0 : 1.2, ease: EASE }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <span key={i} className="ruler-tick" style={{ left: (i / 8) * 100 + "%" }} />
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
            <span className="letter-wrap" key={i} aria-hidden>
              <motion.span
                className="letter"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.32 + i * 0.07,
                  duration: 0.9,
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
          transition={{ delay: reduce ? 0 : 0.95, duration: 0.7, ease: EASE }}
        >
          ARTIFICIAL INTELLIGENCE / SYSTEMS / KNOWLEDGE
        </motion.p>

        <motion.div
          className="landing-actions"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 1.15, duration: 0.7, ease: EASE }}
        >
          <Link className="button primary" href="/blog">
            知识库
          </Link>
          <Link className="button" href="/portfolio">
            项目
          </Link>
          <a className="button" href="/cv">
            CV
          </a>
        </motion.div>
      </div>

      <motion.div
        className="status-bar"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.4, duration: 0.6, ease: EASE }}
      >
        <span>STATUS — ONLINE</span>
        <span>STATIC / GITHUB PAGES</span>
        <span>© 2026 TONKIC</span>
      </motion.div>
    </section>
  );
}
