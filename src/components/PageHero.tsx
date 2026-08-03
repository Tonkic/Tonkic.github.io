import { Reveal } from "@/components/Reveal";

export function PageHero({
  eyebrow,
  title,
  outline,
  children,
}: {
  eyebrow: string;
  title: string;
  outline: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="hero-panel">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="hero-title">
        {title}
        <span>{outline}</span>
      </h1>
      {children ? <p className="hero-copy">{children}</p> : null}
    </Reveal>
  );
}
