import { Easing } from "remotion";

/** Locked VISION palette. Never recolor source captures — these are for chrome only. */
export const C = {
  canvas: "#F6FCFC",
  ink: "#0C1A33",
  terracotta: "#A36446",
  slate: "#6F6A69",
  cream: "#FFE9D2",
  brown: "#4A1A0B",
} as const;

export const COPPER =
  "linear-gradient(135deg, #B87333 0%, #E5A882 25%, #C87A54 50%, #E89E78 75%, #944D2A 100%)";

/** Canvas + grid geometry (px). Left column = 40%, stage = 60%, 64px safe area. */
export const W = 1920;
export const H = 1080;
export const SAFE = 64;
export const SPLIT = W * 0.4; // 768 — stage panel starts here and bleeds to the right edge
export const LEFT_W = SPLIT - SAFE * 2; // 640 text measure
export const STAGE = { x: SPLIT + SAFE, y: SAFE, w: W - SPLIT - SAFE * 2, h: H - SAFE * 2 }; // 1024 x 952

export const FPS = 30;

/** Scene staging (frames) — per brief. */
export const T = {
  scene: 135,
  enterEnd: 24,
  holdStart: 25,
  holdEnd: 110,
  exitStart: 111,
  intro: 75,
  outro: 105,
  wipe: 22, // copper streak length, centred on each cut
} as const;

/** Apple/Framer-grade ease-out for entrances & exits. */
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
/** Ease-in mirror, used when content leaves the frame. */
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);
/** Symmetric in-out for UI scanning so scroll starts and lands gently (readable). */
export const EASE_SCAN = Easing.bezier(0.65, 0, 0.35, 1);

export const SPRING = { stiffness: 120, damping: 14, mass: 1 } as const;
