import React from "react";
import { Img, staticFile } from "remotion";
import type { Shot } from "../../data/projects";
import { C, COPPER } from "../../lib/tokens";

/**
 * A fixed-size viewport onto a capture. The image is width-fit (never stretched):
 * its rendered height comes from the capture's true aspect ratio, and `progress`
 * (0 → 1) scrolls it from the very top (nav + hero) down by at most `maxScroll`.
 * A capture shorter than the viewport is letterboxed with `contain` instead of cropped.
 */
export const ScrollScreen: React.FC<{
  shot: Shot;
  width: number;
  height: number;
  progress?: number;
  maxScroll?: number;
  background?: string;
}> = ({ shot, width, height, progress = 0, maxScroll = Infinity, background = C.ink }) => {
  const imgH = (width * shot.h) / shot.w;
  const overflow = Math.max(0, imgH - height);
  const travel = Math.min(overflow, maxScroll);
  return (
    <div style={{ width, height, overflow: "hidden", position: "relative", background }}>
      {imgH >= height ? (
        <Img
          src={staticFile(shot.src)}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: imgH,
            transform: `translateY(${-travel * progress}px)`,
          }}
        />
      ) : (
        <Img
          src={staticFile(shot.src)}
          style={{ width, height, objectFit: "contain", objectPosition: "center" }}
        />
      )}
    </div>
  );
};

/** Copper hairline frame: a 2px metallic gradient edge around any device. */
const CopperEdge: React.FC<{ radius: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  radius,
  children,
  style,
}) => (
  <div style={{ padding: 2, borderRadius: radius, backgroundImage: COPPER, ...style }}>{children}</div>
);

const SHADOW = "0 40px 80px -20px rgba(12,26,51,0.45), 0 18px 36px -18px rgba(12,26,51,0.5)";

/** Laptop: 16:10 screen, ink bezel, copper edge, slate base. Total width = screenW + 100. */
export const Laptop: React.FC<{ screenW: number; children: React.ReactNode }> = ({ screenW, children }) => {
  const screenH = Math.round((screenW * 10) / 16);
  const bezel = 14;
  const lidW = screenW + bezel * 2 + 4;
  const baseW = lidW + 68;
  return (
    <div style={{ width: baseW, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CopperEdge radius={20} style={{ boxShadow: SHADOW }}>
        <div style={{ background: C.ink, borderRadius: 18, padding: bezel, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 5,
              left: "50%",
              width: 5,
              height: 5,
              marginLeft: -2.5,
              borderRadius: 5,
              background: C.slate,
            }}
          />
          <div style={{ width: screenW, height: screenH, borderRadius: 4, overflow: "hidden" }}>{children}</div>
        </div>
      </CopperEdge>
      <div
        style={{
          width: baseW,
          height: 20,
          marginTop: -1,
          borderRadius: "2px 2px 14px 14px",
          background: `linear-gradient(180deg, ${C.slate} 0%, ${C.ink} 100%)`,
          boxShadow: SHADOW,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 120,
            marginLeft: -60,
            height: 7,
            borderRadius: "0 0 8px 8px",
            background: C.ink,
          }}
        />
      </div>
    </div>
  );
};

/** Laptop geometry helper so layouts can reason about footprint without rendering. */
export const laptopSize = (screenW: number) => {
  const screenH = Math.round((screenW * 10) / 16);
  return { screenH, w: screenW + 32 + 68, h: screenH + 32 + 20 };
};

/** Phone: 9:19.5 screen, ink bezel, copper edge, dynamic-island pill. */
export const Phone: React.FC<{ screenW: number; children: React.ReactNode }> = ({ screenW, children }) => {
  const screenH = Math.round((screenW * 19.5) / 9);
  return (
    <CopperEdge radius={44} style={{ boxShadow: SHADOW }}>
      <div style={{ background: C.ink, borderRadius: 42, padding: 9 }}>
        <div style={{ width: screenW, height: screenH, borderRadius: 33, overflow: "hidden", position: "relative" }}>
          {children}
          <div
            style={{
              position: "absolute",
              top: 9,
              left: "50%",
              width: 74,
              marginLeft: -37,
              height: 21,
              borderRadius: 21,
              background: C.ink,
            }}
          />
        </div>
      </div>
    </CopperEdge>
  );
};

export const phoneSize = (screenW: number) => {
  const screenH = Math.round((screenW * 19.5) / 9);
  return { screenH, w: screenW + 22, h: screenH + 22 };
};

/** Editorial browser card: cream chrome bar + capture, for 2.5D stacks. */
export const BrowserCard: React.FC<{ width: number; shot: Shot }> = ({ width, shot }) => {
  const screenH = Math.round((width * shot.h) / shot.w);
  return (
    <CopperEdge radius={14} style={{ boxShadow: SHADOW }}>
      <div style={{ borderRadius: 12, overflow: "hidden", background: C.cream }}>
        <div style={{ height: 30, display: "flex", alignItems: "center", gap: 7, paddingLeft: 14 }}>
          {[C.terracotta, C.brown, C.slate].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: 10, background: c }} />
          ))}
        </div>
        <ScrollScreen shot={shot} width={width} height={screenH} />
      </div>
    </CopperEdge>
  );
};

/** Product photo card: a canvas mat around a 3:4 photo shown complete (contain, centered). */
export const PhotoCard: React.FC<{ width: number; shot: Shot }> = ({ width, shot }) => {
  const h = Math.round((width * 4) / 3);
  return (
    <CopperEdge radius={18} style={{ boxShadow: SHADOW }}>
      <div style={{ background: C.canvas, borderRadius: 16, padding: 14 }}>
        <Img
          src={staticFile(shot.src)}
          style={{ width, height: h, objectFit: "contain", objectPosition: "center", display: "block" }}
        />
      </div>
    </CopperEdge>
  );
};
