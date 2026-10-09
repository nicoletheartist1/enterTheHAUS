import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, COPPER, EASE_SCAN, T, W } from "../../lib/tokens";

/**
 * Directional copper flare that sweeps across each cut. Centred on the boundary
 * so it covers the outgoing wipe and unveils the incoming scene in one gesture.
 */
export const CopperStreak: React.FC = () => {
  const frame = useCurrentFrame();
  // Symmetric curve: the blade crosses the 40/60 split exactly on the cut frame.
  const x = interpolate(frame, [0, T.wipe], [-1000, W + 600], { easing: EASE_SCAN, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = interpolate(frame, [0, T.wipe / 2, T.wipe], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {/* soft cream bloom */}
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: x - 380,
          width: 900,
          transform: "skewX(-16deg)",
          background: `linear-gradient(90deg, rgba(255,233,210,0) 0%, rgba(255,233,210,${0.55 * glow}) 50%, rgba(255,233,210,0) 100%)`,
        }}
      />
      {/* main copper blade */}
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: x,
          width: 260,
          transform: "skewX(-16deg)",
          backgroundImage: COPPER,
          boxShadow: `0 0 80px 20px rgba(200,122,84,${0.55 * glow})`,
        }}
      />
      {/* trailing hairline */}
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: x - 120,
          width: 6,
          transform: "skewX(-16deg)",
          background: C.brown,
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
