import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter } from "../../lib/motion";
import { C } from "../../lib/tokens";

/**
 * Word-by-word masked rise. Each word sits in its own overflow-hidden slot and
 * springs up from below the baseline, staggered by `stagger` frames.
 * Mask padding is generous so descenders and italics are never clipped.
 */
export const KineticTitle: React.FC<{
  text: string;
  fontSize: number;
  delay?: number;
  stagger?: number;
  color?: string;
  italic?: boolean;
  weight?: number;
  lineHeight?: number;
  className?: string;
}> = ({ text, fontSize, delay = 0, stagger = 3, color = C.ink, italic, weight = 600, lineHeight = 1.0, className }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div
      className={`font-display ${className ?? ""}`}
      style={{
        fontSize,
        lineHeight,
        color,
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        letterSpacing: "-0.01em",
        display: "flex",
        flexWrap: "wrap",
        columnGap: fontSize * 0.24,
      }}
    >
      {words.map((w, i) => {
        const s = enter(frame, fps, delay + i * stagger);
        const y = interpolate(s, [0, 1], [110, 0]);
        return (
          <span
            key={`${w}-${i}`}
            style={{ display: "inline-block", overflow: "hidden", padding: "0.06em 0.04em 0.14em", margin: "-0.06em -0.04em -0.14em" }}
          >
            <span style={{ display: "inline-block", transform: `translateY(${y}%)` }}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};
