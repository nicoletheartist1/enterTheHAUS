import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PROJECTS } from "../../data/projects";
import { ramp } from "../../lib/motion";
import { C, COPPER, H, LEFT_W, SAFE, SPLIT, STAGE } from "../../lib/tokens";
import { KineticTitle } from "../atoms/KineticTitle";
import { MetallicBadge } from "../atoms/MetallicBadge";
import { ProjectGrid } from "../atoms/ProjectGrid";

/** 3.5s close: index of all 11 projects + signature. */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const panelIn = ramp(frame, 0, 20);
  const fade = (d: number) => ({ opacity: ramp(frame, d, d + 14), transform: `translateY(${interpolate(ramp(frame, d, d + 20), [0, 1], [24, 0])}px)` });
  return (
    <AbsoluteFill style={{ background: C.canvas }}>
      <div style={{ position: "absolute", left: SAFE, top: SAFE, width: LEFT_W, height: H - SAFE * 2 }} className="flex flex-col justify-between">
        <div style={fade(0)}><MetallicBadge>theHAUS. | VISION</MetallicBadge></div>
        <div className="flex flex-col" style={{ gap: 28 }}>
          <KineticTitle text="Where God Leads." fontSize={96} delay={4} />
          <KineticTitle text="Where Excellence Lives." fontSize={96} delay={10} color={C.terracotta} />
          <div className="font-sans" style={{ ...fade(18), fontSize: 24, fontWeight: 300, color: C.slate, lineHeight: 1.5, maxWidth: 560 }}>
            Eleven platforms. One standard. Let’s build what you were called to establish.
          </div>
        </div>
        <div className="flex items-center" style={{ gap: 18, ...fade(22) }}>
          <div style={{ width: 56, height: 2, backgroundImage: COPPER }} />
          <div className="font-mono uppercase" style={{ fontSize: 16, letterSpacing: "0.22em", color: C.ink }}>enterthehaus.co</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: SPLIT, top: 0, right: 0, bottom: 0, background: C.ink, transform: `translateX(${(1 - panelIn) * 260}px)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundImage: COPPER }} />
        <div style={{ position: "absolute", left: SAFE, top: SAFE, width: STAGE.w, height: STAGE.h }} className="flex items-center">
          <ProjectGrid projects={PROJECTS} width={STAGE.w} delay={6} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
