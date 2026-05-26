import Link from "next/link";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";
import { firstTierCards, secondTierCards, siteProfile } from "@/data/site";

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-grid">
        <Reveal className="hero-panel">
          <p className="eyebrow">Personal Website</p>
          <h1 className="hero-title">
            Tonkic
            <span>builds</span>
          </h1>
          <p className="hero-copy">
            我是 {siteProfile.realName}，目前关注人工智能、计算机视觉、计算机图形学、机器学习与
            computational photography。这个站先帮第一次来的访客快速判断：我是谁，以及这里有什么。
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/blog">
              看 Blog
            </Link>
            <Link className="button" href="/api-relay">
              看模型 API 中转
            </Link>
            <Link className="button" href="/overview">
              全站总览
            </Link>
          </div>
        </Reveal>

        <Reveal className="glass-panel orbit-panel" delay={0.08}>
          <div className="orbit-ring" />
          <div className="orbit-ring" />
          <div className="orbit-copy">
            <span className="large-number">02</span>
            <p>第一梯队内容是 Blog 和模型 API 中转；Portfolio、CV、学术内容作为第二梯队入口保留。</p>
          </div>
        </Reveal>
      </section>

      <div className="marquee" aria-hidden="true">
        <span>Blog / API Relay / Portfolio / CV / Academic / </span>
        <span>Blog / API Relay / Portfolio / CV / Academic / </span>
      </div>

      <section>
        <Reveal className="section-heading">
          <p className="eyebrow">First Tier</p>
          <h2>先看这里。</h2>
          <p>站点入口不是平均分配注意力，而是先把最有用的两件事推到前台。</p>
        </Reveal>
        <div className="card-grid two-up">
          {firstTierCards.map((card, index) => (
            <HoverCard card={card} index={index} key={card.href} />
          ))}
        </div>
      </section>

      <section>
        <Reveal className="section-heading">
          <p className="eyebrow">Second Tier</p>
          <h2>再看这些。</h2>
        </Reveal>
        <div className="card-grid">
          {secondTierCards.map((card, index) => (
            <HoverCard card={card} index={index} key={card.href} />
          ))}
        </div>
      </section>
    </div>
  );
}
