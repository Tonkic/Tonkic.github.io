import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { firstTierCards, navItems, secondTierCards } from "@/data/site";

export const metadata = {
  title: "全站总览",
};

export default function OverviewPage() {
  return (
    <div className="page-stack">
      <Reveal className="hero-panel">
        <p className="eyebrow">Visitor Navigation</p>
        <h1 className="hero-title">
          全站
          <span>总览</span>
        </h1>
        <p className="hero-copy">
          这是给第一次访问的陌生访客准备的导航页。它回答两个问题：我是谁，这个站里有什么。
        </p>
      </Reveal>

      <section className="route-grid">
        {[...firstTierCards, ...secondTierCards].map((card) => (
          <article className="route-card" key={card.href}>
            <Link href={card.href}>
              <span className="card-eyebrow">{card.eyebrow}</span>
              <h3>{card.label}</h3>
              <p>{card.description}</p>
              <span className="card-arrow">打开栏目</span>
            </Link>
          </article>
        ))}
      </section>

      <Reveal className="glass-panel">
        <p className="eyebrow">Navigation Map</p>
        <div className="tag-row">
          {navItems.map((item) => (
            <Link className="tag" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
