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
          如果你刚来到这里，可以从 Blog 和模型 API 中转开始；项目、CV 和学术内容放在第二层。
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
