import React from "react";
import { C, COPPER } from "../../lib/tokens";

/**
 * Typographic plate shown inside a device when a project has no capture in its repo.
 * It is deliberately a title plate, not a fake UI — swap in a real capture via the manifest.
 * `shimmer` (0 → 1) drives a copper light sweep across the monogram.
 */
export const BrandPlate: React.FC<{
  width: number;
  height: number;
  monogram: string;
  title: string;
  category: string;
  shimmer?: number;
  scale?: number;
  /** Thumbnail mode: monogram only, no labels. */
  compact?: boolean;
}> = ({ width, height, monogram, title, category, shimmer = 0, scale = 1, compact = false }) => {
  const mono = Math.round(height * (monogram.length > 1 ? 0.44 : 0.52));
  return (
    <div
      style={{
        width,
        height,
        background: C.cream,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* fine editorial frame */}
      <div style={{ position: "absolute", inset: compact ? 8 : 18, border: `1px solid rgba(163,100,70,0.35)` }} />
      {!compact && (
      <>
      <div
        className="font-mono uppercase"
        style={{ position: "absolute", top: 34, left: 40, fontSize: 12, letterSpacing: "0.22em", color: C.slate }}
      >
        theHAUS. | VISION
      </div>
      <div
        className="font-mono uppercase"
        style={{ position: "absolute", top: 34, right: 40, fontSize: 12, letterSpacing: "0.22em", color: C.slate }}
      >
        {category}
      </div>
      </>
      )}
      <div style={{ transform: `scale(${scale})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          className="font-display"
          style={{
            fontSize: mono,
            lineHeight: 0.9,
            fontWeight: 700,
            // Seasons kerns VV into a "W" — open the pair up so monograms read as letters.
            letterSpacing: "0.08em",
            backgroundImage: `linear-gradient(105deg, rgba(255,233,210,0) ${shimmer * 140 - 30}%, rgba(255,247,238,0.9) ${
              shimmer * 140 - 15
            }%, rgba(255,233,210,0) ${shimmer * 140}%), ${COPPER}`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            padding: "0 0 0.06em 0.08em",
          }}
        >
          {monogram}
        </div>
        {!compact && (
          <>
            <div style={{ width: 120, height: 2, backgroundImage: COPPER, margin: `${height * 0.04}px 0` }} />
            <div className="font-display" style={{ fontSize: Math.round(height * 0.085), color: C.brown, fontWeight: 700 }}>
              {title}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
