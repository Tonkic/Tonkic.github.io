"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LinkCard } from "@/data/site";

export function HoverCard({ card, index = 0 }: { card: LinkCard; index?: number }) {
  return (
    <motion.article
      className="hover-card"
      initial={{ opacity: 0, y: 34, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ y: -10, scale: 1.018 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={card.href}>
        <span className="card-eyebrow">{card.eyebrow}</span>
        <h3>{card.label}</h3>
        <p>{card.description}</p>
        <span className="card-arrow">进入</span>
      </Link>
    </motion.article>
  );
}
