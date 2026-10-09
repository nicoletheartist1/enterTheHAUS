import React from "react";
import { C, COPPER } from "../../lib/tokens";

/**
 * Category pill. `outline` = copper gradient border on canvas (default);
 * `solid` = copper fill with ink type; `chip` = quiet cream metadata chip.
 */
export const MetallicBadge: React.FC<{
  children: React.ReactNode;
  variant?: "outline" | "solid" | "chip";
  style?: React.CSSProperties;
}> = ({ children, variant = "outline", style }) => {
  if (variant === "chip") {
    return (
      <div
        className="font-mono uppercase"
        style={{
          fontSize: 13,
          letterSpacing: "0.12em",
          color: C.brown,
          background: C.cream,
          border: `1px solid rgba(163,100,70,0.35)`,
          borderRadius: 999,
          padding: "9px 16px 8px",
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  const solid = variant === "solid";
  return (
    <div style={{ display: "inline-flex", padding: 1.5, borderRadius: 999, backgroundImage: COPPER, ...style }}>
      <div
        className="font-sans uppercase"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 15,
          fontWeight: 400,
          letterSpacing: "0.2em",
          color: C.ink,
          background: solid ? "transparent" : C.canvas,
          borderRadius: 999,
          padding: "10px 22px 10px 18px",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{ width: 8, height: 8, borderRadius: 8, ...(solid ? { backgroundColor: C.ink } : { backgroundImage: COPPER }) }}
        />
        {children}
      </div>
    </div>
  );
};
