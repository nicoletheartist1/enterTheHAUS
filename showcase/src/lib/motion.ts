import { interpolate, spring } from "remotion";
import { EASE, EASE_IN, SPRING, T } from "./tokens";

/** Physics entrance: 0 → 1 (with a little settle) starting at `delay` frames. */
export const enter = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: SPRING });

/** Clamped eased 0 → 1 between two frames. */
export const ramp = (frame: number, from: number, to: number, easing = EASE) =>
  interpolate(frame, [from, to], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Exit progress for the 111–135 window. */
export const exitProgress = (frame: number) => ramp(frame, T.exitStart, T.scene, EASE_IN);
