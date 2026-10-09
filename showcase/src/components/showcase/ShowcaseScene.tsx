import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Project } from "../../data/projects";
import { TOTAL } from "../../data/projects";
import { enter, exitProgress, ramp } from "../../lib/motion";
import { C, COPPER, EASE, EASE_SCAN, H, LEFT_W, SAFE, SPLIT, STAGE, T } from "../../lib/tokens";
import { BrandPlate } from "../atoms/BrandPlate";
import { BrowserCard, Laptop, laptopSize, Phone, phoneSize, PhotoCard, ScrollScreen } from "../atoms/DeviceMockup";
import { KineticTitle } from "../atoms/KineticTitle";
import { MetallicBadge } from "../atoms/MetallicBadge";

/*
 * Scene staging (135 frames @ 30fps = 4.5s)
 *   0–24    entrance — stage panel sweeps in, type + devices spring up
 *   25–110  hold — captures auto-scroll top → down (readable in-out ease)
 *   111–135 exit — copy slides off, stage wipes away; master adds the copper streak
 */

const STAGE_BG: Record<Project["stage"], string> = {
  ink: C.ink,
  cream: C.cream,
  brown: C.brown,
};

/** Pop-in transform for a device: spring rise + fade, optional delay. */
const useRise = (delay: number, distance = 120) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = enter(frame, fps, delay);
  return {
    opacity: ramp(frame, delay, delay + 10),
    transform: `translateY(${interpolate(s, [0, 1], [distance, 0])}px)`,
  };
};

/** Gentle hold drift so the stage never sits dead still. */
const useDrift = (amount: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [T.holdStart, T.exitStart], [0, amount], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const scanProgress = (frame: number) => ramp(frame, T.holdStart, T.holdEnd, EASE_SCAN);

/* ───────────────────────────── Stage layouts ───────────────────────────── */

const TandemStage: React.FC<{ project: Project }> = ({ project }) => {
  const frame = useCurrentFrame();
  const l = project.layout;
  const scan = scanProgress(frame);
  const lap = laptopSize(760);
  const ph = phoneSize(216);
  const lapRise = useRise(4);
  const phoneRise = useRise(10, 160);
  const drift = useDrift(-10);
  // Phone scans a beat behind the laptop for a layered, conversational read.
  const phoneScan = ramp(frame, T.holdStart + 8, T.holdEnd, EASE_SCAN);
  if (l.kind !== "tandem") return null;
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 150 + drift, ...lapRise }}>
        <Laptop screenW={760}>
          <ScrollScreen shot={l.desktop} width={760} height={lap.screenH} progress={scan} maxScroll={project.maxScroll} />
        </Laptop>
      </div>
      <div style={{ position: "absolute", left: STAGE.w - ph.w - 20, top: STAGE.h - ph.h - 40 + drift * 1.8, ...phoneRise }}>
        <Phone screenW={216}>
          <ScrollScreen
            shot={l.mobile}
            width={216}
            height={ph.screenH}
            progress={phoneScan}
            maxScroll={project.maxScroll}
          />
        </Phone>
      </div>
    </>
  );
};

const ProductStage: React.FC<{ project: Project }> = ({ project }) => {
  const frame = useCurrentFrame();
  const l = project.layout;
  const lap = laptopSize(720);
  const cardW = 300;
  const cardH = Math.round((cardW * 4) / 3) + 32;
  const lapRise = useRise(4);
  const cardRise = useRise(10, 160);
  const drift = useDrift(-10);
  // Desktop capture fits the 16:10 screen exactly — a slow push-in keeps it alive without cropping on entry.
  const push = interpolate(frame, [T.holdStart, T.exitStart], [1, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (l.kind !== "product") return null;
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 170 + drift, ...lapRise }}>
        <Laptop screenW={720}>
          <div style={{ transform: `scale(${push})`, transformOrigin: "50% 0%" }}>
            <ScrollScreen shot={l.desktop} width={720} height={lap.screenH} />
          </div>
        </Laptop>
      </div>
      <div
        style={{
          position: "absolute",
          left: STAGE.w - cardW - 28 - 10,
          top: STAGE.h - cardH - 30 + drift * 1.8,
          ...cardRise,
        }}
      >
        <PhotoCard width={cardW} shot={l.product} />
      </div>
    </>
  );
};

const StackStage: React.FC<{ project: Project }> = ({ project }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const l = project.layout;
  const cardW = 620;
  const first = l.kind === "stack" ? l.screens[0] : { w: 16, h: 10 };
  const cardH = Math.round((cardW * first.h) / first.w) + 34;
  const stepX = (STAGE.w - cardW - 20) / 2;
  const stepY = (STAGE.h - cardH - 60) / 2;
  const hold = ramp(frame, T.holdStart, T.exitStart, EASE_SCAN);
  if (l.kind !== "stack") return null;
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 2200 }}>
      {l.screens.map((shot, i) => {
        const s = enter(frame, fps, 4 + i * 5);
        // Depth parallax: back cards drift less than front cards during the hold.
        const parallax = hold * (i + 1) * -8;
        return (
          <div
            key={shot.src}
            style={{
              position: "absolute",
              left: 10 + stepX * i + parallax,
              top: 30 + stepY * i,
              opacity: ramp(frame, 4 + i * 5, 14 + i * 5),
              transform: `translateY(${interpolate(s, [0, 1], [140, 0])}px) rotateY(${-10 + hold * 4}deg) rotateX(4deg)`,
              transformOrigin: "50% 50%",
            }}
          >
            <BrowserCard width={cardW} shot={shot} />
          </div>
        );
      })}
    </div>
  );
};

const PlateStage: React.FC<{ project: Project }> = ({ project }) => {
  const frame = useCurrentFrame();
  const l = project.layout;
  const screenW = 860;
  const lap = laptopSize(screenW);
  const rise = useRise(4);
  const drift = useDrift(-8);
  const shimmer = ramp(frame, T.holdStart, T.holdEnd, EASE_SCAN);
  const breathe = interpolate(frame, [T.holdStart, T.exitStart], [1, 1.035], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (l.kind !== "plate") return null;
  return (
    <div style={{ position: "absolute", left: (STAGE.w - lap.w) / 2, top: (STAGE.h - lap.h) / 2 + drift, ...rise }}>
      <Laptop screenW={screenW}>
        <BrandPlate
          width={screenW}
          height={lap.screenH}
          monogram={l.monogram}
          title={project.title}
          category={project.category}
          shimmer={shimmer}
          scale={breathe}
        />
      </Laptop>
    </div>
  );
};

/* ───────────────────────────── Left column ───────────────────────────── */

const ProgressRail: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const fill = ramp(frame, 0, T.scene);
  return (
    <div style={{ display: "flex", gap: 6, width: LEFT_W }}>
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: "rgba(111,106,105,0.22)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${i < index ? 100 : i === index ? fill * 100 : 0}%`,
              backgroundImage: COPPER,
            }}
          />
        </div>
      ))}
    </div>
  );
};

const CopyColumn: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSize = project.title.length > 15 ? 92 : 108;
  const fade = (d: number) => ({
    opacity: ramp(frame, d, d + 14),
    transform: `translateY(${interpolate(enter(frame, fps, d), [0, 1], [26, 0])}px)`,
  });
  return (
    <div
      style={{ position: "absolute", left: SAFE, top: SAFE, width: LEFT_W, height: H - SAFE * 2 }}
      className="flex flex-col justify-between"
    >
      {/* Top: counter + rail */}
      <div style={fade(0)}>
        <div className="flex items-baseline justify-between" style={{ marginBottom: 18 }}>
          <div className="font-mono" style={{ fontSize: 20, letterSpacing: "0.08em" }}>
            <span className="text-copper">{String(index + 1).padStart(2, "0")}</span>
            <span style={{ color: C.slate }}> / {String(TOTAL).padStart(2, "0")}</span>
          </div>
          <div className="font-mono uppercase" style={{ fontSize: 13, letterSpacing: "0.22em", color: C.slate }}>
            theHAUS. | VISION
          </div>
        </div>
        <ProgressRail index={index} />
      </div>

      {/* Middle: pill, headline, sell-point, detail, chips */}
      <div className="flex flex-col" style={{ gap: 30 }}>
        <div style={fade(3)}>
          <MetallicBadge>{project.category}</MetallicBadge>
        </div>
        <KineticTitle text={project.title} fontSize={titleSize} delay={6} lineHeight={0.98} />
        <div
          className="font-sans"
          style={{ ...fade(12), fontSize: 28, lineHeight: 1.32, fontWeight: 500, color: C.ink, maxWidth: 600 }}
        >
          {project.statement}
        </div>
        <div className="font-sans" style={{ ...fade(15), fontSize: 19, lineHeight: 1.5, fontWeight: 300, color: C.slate, maxWidth: 560 }}>
          {project.detail}
        </div>
        <div className="flex flex-wrap" style={{ gap: 10, ...fade(18) }}>
          {project.chips.map((c) => (
            <MetallicBadge key={c} variant="chip">
              {c}
            </MetallicBadge>
          ))}
        </div>
      </div>

      {/* Bottom: signature */}
      <div className="flex items-center" style={{ gap: 18, ...fade(20) }}>
        <div style={{ width: 56, height: 2, backgroundImage: COPPER }} />
        <div className="font-mono uppercase" style={{ fontSize: 13, letterSpacing: "0.22em", color: C.slate }}>
          enterthehaus.co
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────────── Scene ───────────────────────────── */

export const ShowcaseScene: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const frame = useCurrentFrame();
  const out = exitProgress(frame);
  const panelIn = ramp(frame, 0, 20, EASE);
  const stageBg = STAGE_BG[project.stage];
  const layout = project.layout.kind;

  return (
    <AbsoluteFill style={{ background: C.canvas }}>
      {/* Left column copy */}
      <div style={{ position: "absolute", inset: 0, opacity: 1 - out, transform: `translateX(${-70 * out}px)` }}>
        <CopyColumn project={project} index={index} />
      </div>

      {/* Stage panel: full-bleed to top/right/bottom edges — no floating voids */}
      <div
        style={{
          position: "absolute",
          left: SPLIT,
          top: 0,
          right: 0,
          bottom: 0,
          background: stageBg,
          transform: `translateX(${(1 - panelIn) * 260}px)`,
          clipPath: `inset(0 0 0 ${out * 100}%)`,
          overflow: "hidden",
        }}
      >
        {/* Atmosphere: terracotta glow + fine copper grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              project.stage === "cream"
                ? `radial-gradient(70% 60% at 70% 40%, rgba(163,100,70,0.16), rgba(255,233,210,0) 70%)`
                : `radial-gradient(70% 60% at 70% 40%, rgba(163,100,70,0.32), rgba(12,26,51,0) 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: project.stage === "cream" ? 0.35 : 0.18,
            backgroundImage:
              "linear-gradient(rgba(163,100,70,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(163,100,70,0.35) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
        />
        {/* Copper spine on the split line */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundImage: COPPER }} />

        {/* Device stage (safe area inside the panel) */}
        <div style={{ position: "absolute", left: SAFE, top: SAFE, width: STAGE.w, height: STAGE.h }}>
          {layout === "tandem" && <TandemStage project={project} />}
          {layout === "product" && <ProductStage project={project} />}
          {layout === "stack" && <StackStage project={project} />}
          {layout === "plate" && <PlateStage project={project} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};
