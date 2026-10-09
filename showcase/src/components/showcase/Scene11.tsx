import React from "react";
import { PROJECTS } from "../../data/projects";
import { ShowcaseScene } from "./ShowcaseScene";

/** Scene 11 — Classroom. Copy + assets live in src/data/projects.ts. */
export const Scene11: React.FC = () => <ShowcaseScene project={PROJECTS[10]} index={10} />;
