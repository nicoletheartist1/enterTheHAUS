import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Project, Shot } from "../../data/projects";
import { enter } from "../../lib/motion";
import { C, COPPER } from "../../lib/tokens";
import { BrandPlate } from "./BrandPlate";

const heroShot = (p: Project): Shot | null => {
  const l = p.layout;
  if (l.kind === "tandem" || l.kind === "product") return l.desktop;
  if (l.kind === "stack") return l.screens[0];
  return null;
};

/**
 * 4-column index of every project. Thumbnails are 16:10, `cover` anchored to the
 * top so each site's nav + hero stays in frame. Tiles pop in on a stagger.
 */
export const ProjectGrid: React.FC<{ projects: Project[]; width: number; delay?: number }> = ({
  projects,
  width,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cols = 4;
  const gap = 20;
  const tileW = Math.floor((width - gap * (cols - 1)) / cols);
  const tileH = Math.round((tileW * 10) / 16);

  const tiles = [...projects.map((p) => ({ p })), { p: null as Project | null }];

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${tileW}px)`, gap, width }}>
      {tiles.map(({ p }, i) => {
        const s = enter(frame, fps, delay + i * 2);
        const shot = p ? heroShot(p) : null;
        return (
          <div
            key={p?.slug ?? "vision"}
            style={{
              opacity: interpolate(s, [0, 0.6], [0, 1], { extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px) scale(${interpolate(s, [0, 1], [0.94, 1])})`,
            }}
          >
            <div style={{ padding: 1.5, borderRadius: 10, backgroundImage: COPPER }}>
              <div style={{ width: tileW - 3, height: tileH, borderRadius: 9, overflow: "hidden", background: C.ink }}>
                {p && shot ? (
                  <Img
                    src={staticFile(shot.src)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  />
                ) : p && p.layout.kind === "plate" ? (
                  <BrandPlate
                    width={tileW - 3}
                    height={tileH}
                    monogram={p.layout.monogram}
                    title={p.title}
                    category={p.category}
                    compact
                  />
                ) : (
                  <div
                    className="font-display"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: COPPER,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 34,
                      fontWeight: 600,
                      color: C.ink,
                    }}
                  >
                    VISION
                  </div>
                )}
              </div>
            </div>
            <div
              className="font-mono uppercase"
              style={{ marginTop: 10, fontSize: 12, letterSpacing: "0.14em", color: C.cream, whiteSpace: "nowrap" }}
            >
              {p ? `${String(i + 1).padStart(2, "0")}  ${p.title}` : "theHAUS. | VISION"}
            </div>
          </div>
        );
      })}
    </div>
  );
};
