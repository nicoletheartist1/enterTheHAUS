import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CopperStreak } from "../components/showcase/CopperStreak";
import { SCENES } from "../components/showcase";
import { Intro } from "../components/showcase/Intro";
import { Outro } from "../components/showcase/Outro";
import { C, T } from "../lib/tokens";
import "../lib/fonts";

/** Intro (75) + 11 × 135 + Outro (105) = 1665 frames = 55.5s @ 30fps. */
export const MASTER_FRAMES = T.intro + SCENES.length * T.scene + T.outro;

const starts = SCENES.map((_, i) => T.intro + i * T.scene);
const cuts = [...starts, T.intro + SCENES.length * T.scene];

export const MasterShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: C.canvas }}>
    <Sequence durationInFrames={T.intro} name="Intro">
      <Intro />
    </Sequence>
    {SCENES.map((Scene, i) => (
      <Sequence key={i} from={starts[i]} durationInFrames={T.scene} name={`Scene ${String(i + 1).padStart(2, "0")}`}>
        <Scene />
      </Sequence>
    ))}
    <Sequence from={cuts[cuts.length - 1]} durationInFrames={T.outro} name="Outro">
      <Outro />
    </Sequence>
    {/* Copper streak centred on every cut */}
    {cuts.map((c) => (
      <Sequence key={`streak-${c}`} from={c - T.wipe / 2} durationInFrames={T.wipe} name="Copper streak">
        <CopperStreak />
      </Sequence>
    ))}
  </AbsoluteFill>
);
