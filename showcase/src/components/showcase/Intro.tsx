import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TOTAL } from "../../data/projects";
import { ramp } from "../../lib/motion";
import { C, COPPER, EASE_IN, SAFE, T, W } from "../../lib/tokens";
import { KineticTitle } from "../atoms/KineticTitle";
import { MetallicBadge } from "../atoms/MetallicBadge";

/** 2.5s title card: wordmark, copper rule draw, tagline. */
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const rule = ramp(frame, 8, 40);
  const out = ramp(frame, T.intro - 16, T.intro, EASE_IN);
  const fade = (d: number) => ({ opacity: ramp(frame, d, d + 14) * (1 - out), transform: `translateY(${interpolate(ramp(frame, d, d + 20), [0, 1], [24, 0]) - out * 30}px)` });
  return (
    <AbsoluteFill style={{ background: C.canvas }}>
      {/* full-bleed ink band anchors the frame — no floating type in a void */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, background: C.ink }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, backgroundImage: COPPER }} />
      </div>
      <div style={{ position: "absolute", left: SAFE, top: SAFE, right: SAFE }} className="flex items-center justify-between">
        <div style={fade(0)}><MetallicBadge>Portfolio Showcase</MetallicBadge></div>
        <div className="font-mono uppercase" style={{ ...fade(4), fontSize: 14, letterSpacing: "0.22em", color: C.slate }}>
          {String(TOTAL).padStart(2, "0")} Digital Platforms
        </div>
      </div>
      <div style={{ position: "absolute", left: SAFE, top: 250, width: W - SAFE * 2, opacity: 1 - out, transform: `translateY(${-out * 30}px)` }}>
        <KineticTitle text="theHAUS. | VISION" fontSize={168} delay={4} stagger={4} />
        <div style={{ height: 3, width: (W - SAFE * 2) * rule, backgroundImage: COPPER, margin: "36px 0 30px" }} />
        <KineticTitle text="Where God Leads. Where Excellence Lives." fontSize={54} delay={20} stagger={2} color={C.terracotta} />
      </div>
      <div style={{ position: "absolute", left: SAFE, right: SAFE, bottom: SAFE + 20 }} className="flex items-end justify-between">
        <div className="font-sans" style={{ ...fade(26), fontSize: 26, fontWeight: 300, color: C.cream, maxWidth: 900, lineHeight: 1.4 }}>
          Selected platforms, storefronts and experiences — designed and engineered by R. Nicole.
        </div>
        <div className="font-mono uppercase" style={{ ...fade(30), fontSize: 14, letterSpacing: "0.22em", color: C.cream }}>
          enterthehaus.co
        </div>
      </div>
    </AbsoluteFill>
  );
};
