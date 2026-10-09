import React from "react";
import { PROJECTS } from "../../data/projects";
import { ShowcaseScene } from "./ShowcaseScene";

/** Scene 01 — Vessels of Victory. Copy + assets live in src/data/projects.ts. */
export const Scene01: React.FC = () => <ShowcaseScene project={PROJECTS[0]} index={0} />;
