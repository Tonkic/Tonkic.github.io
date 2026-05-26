"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems, siteProfile } from "@/data/site";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  return (
    <div className="site-frame">
      <motion.header
        className="site-header"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link className="brand-mark" href="/" aria-label="Tonkic homepage">
          <span>{siteProfile.name}</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                className={`nav-pill ${active ? "active" : ""} ${item.tone}`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </motion.header>
      <main>{children}</main>
    </div>
  );
}
