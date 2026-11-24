"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import type { BlogGraphData, BlogGraphNode, GraphDomain } from "@/lib/blog-source";

type PositionedNode = BlogGraphNode & {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  r: number;
  phase: number;
};

const DOMAIN_COLORS: Record<GraphDomain, string> = {
  ai: "#8be8ff",
  exam: "#9cf2b6",
  math: "#f7c873",
};

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const computeLayout = (data: BlogGraphData) => {
  const hubs = data.nodes.filter((n) => n.kind === "hub");
  const notes = data.nodes.filter((n) => n.kind === "note");

  const domainOrder: GraphDomain[] = ["ai", "exam", "math"];
  const sortedHubs = [...hubs].sort(
    (a, b) => domainOrder.indexOf(a.domain) - domainOrder.indexOf(b.domain) || b.weight - a.weight,
  );

  const positioned = new Map<string, PositionedNode>();
  const hubChildren = new Map<string, BlogGraphNode[]>();

  for (const edge of data.edges) {
    if (edge.kind === "topic") {
      const list = hubChildren.get(edge.source) ?? [];
      const note = notes.find((n) => n.id === edge.target);
      if (note) list.push(note);
      hubChildren.set(edge.source, list);
    }
  }

  const hubTotal = Math.max(sortedHubs.length, 1);
  sortedHubs.forEach((hub, index) => {
    const angle = (index / hubTotal) * Math.PI * 2 - Math.PI / 2;
    const ringRadius = hub.domain === "ai" ? 175 + (index % 2) * 58 : hub.domain === "exam" ? 235 : 210;
    const x = Math.cos(angle) * ringRadius * 1.32;
    const y = Math.sin(angle) * ringRadius * 0.88;
    const r = Math.min(11, 5.5 + Math.sqrt(hub.weight) * 0.65);

    positioned.set(hub.id, {
      ...hub,
      x,
      y,
      baseX: x,
      baseY: y,
      r,
      phase: index * 0.9,
    });

    const children = hubChildren.get(hub.id) ?? [];
    children.forEach((child, childIdx) => {
      const a = childIdx * GOLDEN_ANGLE + angle;
      const dist = 16 + Math.sqrt(childIdx + 1) * 11.5;
      const nx = x + Math.cos(a) * dist;
      const ny = y + Math.sin(a) * dist;
      positioned.set(child.id, {
        ...child,
        x: nx,
        y: ny,
        baseX: nx,
        baseY: ny,
        r: Math.min(6.2, 2.7 + (child.weight - 1) * 0.85),
        phase: (index * 7 + childIdx) * 0.37,
      });
    });
  });

  // Pull cross-referenced notes gently toward each other
  for (let iter = 0; iter < 12; iter += 1) {
    for (const edge of data.edges) {
      if (edge.kind !== "ref") continue;
      const a = positioned.get(edge.source);
      const b = positioned.get(edge.target);
      if (!a || !b) continue;
      const dx = b.baseX - a.baseX;
      const dy = b.baseY - a.baseY;
      a.baseX += dx * 0.035;
      a.baseY += dy * 0.035;
      b.baseX -= dx * 0.035;
      b.baseY -= dy * 0.035;
      a.x = a.baseX;
      a.y = a.baseY;
      b.x = b.baseX;
      b.y = b.baseY;
    }
  }

  return [...positioned.values()];
};

export function BlogKnowledgeGraph({ data }: { data: BlogGraphData }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeDomain, setActiveDomain] = useState<"all" | GraphDomain>("all");
  const [focusedTopic, setFocusedTopic] = useState<string | null>(null);
  const [hovered, setHovered] = useState<{ node: PositionedNode; screenX: number; screenY: number } | null>(null);
  const [paused, setPaused] = useState(false);

  const nodes = useMemo(() => computeLayout(data), [data]);

  const counts = useMemo(() => {
    let ai = 0;
    let exam = 0;
    let math = 0;
    for (const n of data.nodes) {
      if (n.kind !== "note") continue;
      if (n.domain === "ai") ai += 1;
      else if (n.domain === "exam") exam += 1;
      else math += 1;
    }
    return { all: ai + exam + math, ai, exam, math };
  }, [data.nodes]);

  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of data.edges) {
      if (!map.has(edge.source)) map.set(edge.source, new Set());
      if (!map.has(edge.target)) map.set(edge.target, new Set());
      map.get(edge.source)!.add(edge.target);
      map.get(edge.target)!.add(edge.source);
    }
    return map;
  }, [data.edges]);

  const cameraRef = useRef({ x: 0, y: 0, zoom: 1, targetX: 0, targetY: 0, targetZoom: 1 });
  const dragRef = useRef({ active: false, moved: false, startX: 0, startY: 0, camStartX: 0, camStartY: 0 });
  const hoveredIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (focusedTopic) {
      const hub = nodes.find((n) => n.kind === "hub" && n.topic === focusedTopic);
      if (hub) {
        cameraRef.current.targetX = -hub.baseX;
        cameraRef.current.targetY = -hub.baseY;
        cameraRef.current.targetZoom = 1.65;
        return;
      }
    }

    if (activeDomain === "all") {
      cameraRef.current.targetX = 0;
      cameraRef.current.targetY = 0;
      cameraRef.current.targetZoom = 1;
      return;
    }

    const matching = nodes.filter((n) => n.domain === activeDomain);
    if (matching.length) {
      const cx = matching.reduce((s, n) => s + n.baseX, 0) / matching.length;
      const cy = matching.reduce((s, n) => s + n.baseY, 0) / matching.length;
      cameraRef.current.targetX = -cx * 0.75;
      cameraRef.current.targetY = -cy * 0.75;
      cameraRef.current.targetZoom = activeDomain === "ai" ? 1.08 : 1.42;
    }
  }, [activeDomain, focusedTopic, nodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    const mountTime = performance.now();
    let rafId = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const render = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const cam = cameraRef.current;

      const lerpFactor = reduceMotion ? 1 : 0.12;
      cam.x += (cam.targetX - cam.x) * lerpFactor;
      cam.y += (cam.targetY - cam.y) * lerpFactor;
      cam.zoom += (cam.targetZoom - cam.zoom) * lerpFactor;

      const elapsed = now - mountTime;
      const introProgress = reduceMotion ? 1 : Math.min(1, elapsed / 900);
      const introEase = 1 - Math.pow(1 - introProgress, 4);

      const animateDrift = !reduceMotion && !paused;
      const tSec = now * 0.001;

      for (const node of nodes) {
        const driftX = animateDrift ? Math.cos(tSec * 0.55 + node.phase) * (node.kind === "hub" ? 1.2 : 2.2) : 0;
        const driftY = animateDrift ? Math.sin(tSec * 0.48 + node.phase) * (node.kind === "hub" ? 1.2 : 2.2) : 0;
        node.x = (node.baseX + driftX) * introEase;
        node.y = (node.baseY + driftY) * introEase;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width / 760, height / 520) * cam.zoom;
      const centerX = width / 2 + cam.x * scale;
      const centerY = height / 2 + cam.y * scale;

      const hoveredId = hoveredIdRef.current;
      const neighbors = hoveredId ? adjacency.get(hoveredId) : null;

      const isNodeHighlighted = (node: PositionedNode) => {
        if (focusedTopic && node.topic !== focusedTopic) return false;
        if (activeDomain !== "all" && node.domain !== activeDomain) return false;
        return true;
      };

      // Draw edges
      for (const edge of data.edges) {
        const a = nodeMap.get(edge.source);
        const b = nodeMap.get(edge.target);
        if (!a || !b) continue;

        const activePair = hoveredId && (edge.source === hoveredId || edge.target === hoveredId);
        const visibleCluster = isNodeHighlighted(a) && isNodeHighlighted(b);

        ctx.beginPath();
        ctx.moveTo(centerX + a.x * scale, centerY + a.y * scale);
        ctx.lineTo(centerX + b.x * scale, centerY + b.y * scale);

        if (activePair) {
          ctx.strokeStyle = edge.kind === "ref" ? "rgba(247, 200, 115, 0.85)" : "rgba(139, 232, 255, 0.65)";
          ctx.lineWidth = edge.kind === "ref" ? 1.6 : 1.15;
        } else if (!visibleCluster || hoveredId) {
          ctx.strokeStyle = "rgba(244, 240, 232, 0.025)";
          ctx.lineWidth = 0.6;
        } else {
          ctx.strokeStyle = edge.kind === "ref" ? "rgba(247, 200, 115, 0.24)" : "rgba(244, 240, 232, 0.075)";
          ctx.lineWidth = edge.kind === "ref" ? 1 : 0.7;
        }
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        const sx = centerX + node.x * scale;
        const sy = centerY + node.y * scale;
        if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40) continue;

        const isHovered = hoveredId === node.id;
        const isNeighbor = neighbors?.has(node.id) ?? false;
        const inFilter = isNodeHighlighted(node);
        const dimmed = !inFilter || Boolean(hoveredId && !isHovered && !isNeighbor);

        const color = DOMAIN_COLORS[node.domain];
        const radius = Math.max(2, node.r * Math.pow(cam.zoom, 0.35) * (isHovered ? 1.38 : 1));

        if ((node.kind === "hub" || isHovered) && !dimmed) {
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 2.3, 0, Math.PI * 2);
          ctx.fillStyle = node.domain === "ai"
            ? "rgba(139, 232, 255, 0.13)"
            : node.domain === "exam"
              ? "rgba(156, 242, 182, 0.13)"
              : "rgba(247, 200, 115, 0.14)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.globalAlpha = dimmed ? 0.14 : node.kind === "hub" || isHovered || isNeighbor ? 1 : 0.78;
        ctx.fillStyle = isHovered ? "#ffffff" : color;
        ctx.fill();

        if (node.kind === "hub" && !dimmed) {
          ctx.font = `600 ${Math.max(10, Math.min(12, 11 * Math.pow(cam.zoom, 0.2)))}px var(--font-sans), sans-serif`;
          ctx.fillStyle = "rgba(244, 240, 232, 0.88)";
          ctx.textAlign = "center";
          ctx.fillText(node.label, sx, sy - radius - 6);
        }
      }

      ctx.globalAlpha = 1;
      ctx.restore();

      if (animateDrift || Math.abs(cam.targetX - cam.x) > 0.05 || Math.abs(cam.targetZoom - cam.zoom) > 0.002 || introProgress < 1) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    rafId = window.requestAnimationFrame(render);

    const kickLoop = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(render);
    };

    const pickNode = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      const cam = cameraRef.current;
      const scale = Math.min(rect.width / 760, rect.height / 520) * cam.zoom;
      const centerX = rect.width / 2 + cam.x * scale;
      const centerY = rect.height / 2 + cam.y * scale;

      let best: PositionedNode | null = null;
      let bestDist = 18;

      for (const node of nodes) {
        const sx = centerX + node.x * scale;
        const sy = centerY + node.y * scale;
        const d = Math.hypot(mx - sx, my - sy);
        const hitRadius = Math.max(9, node.r * Math.pow(cam.zoom, 0.35) + 5);
        if (d < hitRadius && d < bestDist) {
          best = node;
          bestDist = d;
        }
      }

      return best ? { node: best, screenX: mx, screenY: my } : null;
    };

    const onPointerDown = (event: PointerEvent) => {
      dragRef.current = {
        active: true,
        moved: false,
        startX: event.clientX,
        startY: event.clientY,
        camStartX: cameraRef.current.targetX,
        camStartY: cameraRef.current.targetY,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragRef.current.active) {
        const dx = event.clientX - dragRef.current.startX;
        const dy = event.clientY - dragRef.current.startY;
        if (Math.hypot(dx, dy) > 4) dragRef.current.moved = true;
        const rect = canvas.getBoundingClientRect();
        const scale = Math.min(rect.width / 760, rect.height / 520) * cameraRef.current.zoom;
        cameraRef.current.targetX = dragRef.current.camStartX + dx / scale;
        cameraRef.current.targetY = dragRef.current.camStartY + dy / scale;
        canvas.style.cursor = "grabbing";
        setHovered(null);
        hoveredIdRef.current = null;
        kickLoop();
        return;
      }

      const hit = pickNode(event.clientX, event.clientY);
      const nextId = hit?.node.id ?? null;
      if (hoveredIdRef.current !== nextId) {
        hoveredIdRef.current = nextId;
        kickLoop();
      }
      setHovered(hit);
      canvas.style.cursor = hit ? "pointer" : "grab";
    };

    const onPointerUp = (event: PointerEvent) => {
      const wasMoved = dragRef.current.moved;
      dragRef.current.active = false;
      canvas.style.cursor = hoveredIdRef.current ? "pointer" : "grab";

      if (!wasMoved) {
        const hit = pickNode(event.clientX, event.clientY);
        if (hit?.node.kind === "note" && hit.node.href) {
          router.push(hit.node.href);
        } else if (hit?.node.kind === "hub") {
          setFocusedTopic((prev) => (prev === hit.node.topic ? null : hit.node.topic));
        } else if (focusedTopic) {
          setFocusedTopic(null);
        }
      }
    };

    const onPointerLeave = () => {
      dragRef.current.active = false;
      if (hoveredIdRef.current) {
        hoveredIdRef.current = null;
        kickLoop();
      }
      setHovered(null);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 0.9;
      cameraRef.current.targetZoom = Math.min(2.8, Math.max(0.65, cameraRef.current.targetZoom * factor));
      kickLoop();
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [activeDomain, adjacency, data.edges, focusedTopic, nodes, paused, reduceMotion, router]);

  const selectDomain = (domain: "all" | GraphDomain) => {
    setFocusedTopic(null);
    setActiveDomain(domain);
  };

  const resetView = () => {
    setFocusedTopic(null);
    setActiveDomain("all");
    cameraRef.current.targetX = 0;
    cameraRef.current.targetY = 0;
    cameraRef.current.targetZoom = 1;
  };

  return (
    <section className="vault-graph-stage" aria-label="Knowledge Constellation">
      <header className="vault-graph-bar">
        <div className="vault-graph-tabs" role="tablist" aria-label="Knowledge domains">
          {(
            [
              { id: "all", label: t("blog.graphAll"), count: counts.all },
              { id: "ai", label: t("blog.graphAi"), count: counts.ai, dot: DOMAIN_COLORS.ai },
              { id: "exam", label: t("blog.graphExam"), count: counts.exam, dot: DOMAIN_COLORS.exam },
              { id: "math", label: t("blog.graphMath"), count: counts.math, dot: DOMAIN_COLORS.math },
            ] as const
          ).map((item) => {
            const active = activeDomain === item.id && !focusedTopic;
            return (
              <button
                aria-selected={active}
                className={`vault-graph-tab ${active ? "active" : ""}`}
                key={item.id}
                onClick={() => selectDomain(item.id)}
                role="tab"
                type="button"
              >
                {"dot" in item ? <i style={{ background: item.dot }} aria-hidden="true" /> : null}
                <span>{item.label}</span>
                <small>{item.count}</small>
              </button>
            );
          })}
          {focusedTopic ? (
            <button className="vault-graph-tab active" onClick={() => setFocusedTopic(null)} type="button">
              <span>{focusedTopic} ×</span>
            </button>
          ) : null}
        </div>

        <div className="vault-graph-controls">
          {(activeDomain !== "all" || focusedTopic) ? (
            <button className="vault-graph-icon-btn" onClick={resetView} type="button">
              {t("blog.graphReset")}
            </button>
          ) : null}
          {!reduceMotion ? (
            <button
              aria-label={paused ? t("blog.graphPlay") : t("blog.graphPause")}
              className="vault-graph-icon-btn"
              onClick={() => setPaused((v) => !v)}
              type="button"
            >
              {paused ? "▶" : "❚❚"}
            </button>
          ) : null}
        </div>
      </header>

      <div className="vault-graph-canvas-wrap" ref={containerRef} data-lenis-prevent>
        <canvas ref={canvasRef} />
        {hovered ? (
          <div
            className="vault-graph-tooltip"
            style={{
              transform: `translate(${Math.min(hovered.screenX + 14, (containerRef.current?.clientWidth ?? 600) - 210)}px, ${Math.max(12, hovered.screenY - 38)}px)`,
            }}
          >
            <small>{hovered.node.topic}</small>
            <strong>
              {hovered.node.label}
              {hovered.node.kind === "note" ? " ↗" : ` (${hovered.node.weight})`}
            </strong>
          </div>
        ) : null}
      </div>
    </section>
  );
}
