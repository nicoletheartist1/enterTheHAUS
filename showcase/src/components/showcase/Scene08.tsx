import React from "react";
import { PROJECTS } from "../../data/projects";
import { ShowcaseScene } from "./ShowcaseScene";

/** Scene 08 — Jukebox on Wheels. Copy + assets live in src/data/projects.ts. */
export const Scene08: React.FC = () => <ShowcaseScene project={PROJECTS[7]} index={7} />;
