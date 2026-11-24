"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { navItems, siteProfile } from "@/data/site-config";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const sectionKey = isBlog ? "/blog" : pathname;

  return (
    <div className={`site-frame ${isBlog ? "site-frame-blog" : ""}`}>
      <header className="site-header">
        <Link className="brand-mark" href="/" aria-label={`Tonkic ${t("nav.home")}`}>
          <span className="brand-dot" aria-hidden="true" />
          <span>{siteProfile.name}</span>
        </Link>

        <nav className="site-nav" aria-label={t("nav.main")}>
          <div className="site-nav-links">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`nav-link ${active ? "active" : ""}`}
                  href={item.href}
                  key={item.href}
                >
                  {active ? (
                    <motion.span
                      aria-hidden="true"
                      className="nav-active-bg"
                      layoutId="nav-active-bg"
                      transition={{ duration: reduceMotion ? 0 : 0.36, ease: EASE }}
                    />
                  ) : null}
                  <span className="nav-link-label">{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </div>
          <LanguageToggle />
        </nav>
      </header>

      <motion.main
        id="main-content"
        key={sectionKey}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.42, ease: EASE }}
      >
        {children}
      </motion.main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {siteProfile.name}</span>
        <div>
          <Link href="/academic">{t("nav.academic")}</Link>
          <a href={siteProfile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={`mailto:${siteProfile.email}`}>{siteProfile.email}</a>
        </div>
      </footer>
    </div>
  );
}
