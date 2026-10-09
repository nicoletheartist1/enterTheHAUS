import "./index.css";
import "./lib/fonts";
import React from "react";
import { Composition, Folder } from "remotion";
import { MasterShowcase, MASTER_FRAMES } from "./compositions/MasterShowcase";
import { SCENES } from "./components/showcase";
import { Intro } from "./components/showcase/Intro";
import { Outro } from "./components/showcase/Outro";
import { FPS, H, T, W } from "./lib/tokens";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="MasterShowcase" component={MasterShowcase} durationInFrames={MASTER_FRAMES} fps={FPS} width={W} height={H} />
    <Folder name="Scenes">
      <Composition id="Intro" component={Intro} durationInFrames={T.intro} fps={FPS} width={W} height={H} />
      {SCENES.map((Scene, i) => (
        <Composition
          key={i}
          id={`Scene${String(i + 1).padStart(2, "0")}`}
          component={Scene}
          durationInFrames={T.scene}
          fps={FPS}
          width={W}
          height={H}
        />
      ))}
      <Composition id="Outro" component={Outro} durationInFrames={T.outro} fps={FPS} width={W} height={H} />
    </Folder>
  </>
);
