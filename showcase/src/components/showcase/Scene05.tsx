import React from "react";
import { PROJECTS } from "../../data/projects";
import { ShowcaseScene } from "./ShowcaseScene";

/** Scene 05 — Still Her Glow. Copy + assets live in src/data/projects.ts. */
export const Scene05: React.FC = () => <ShowcaseScene project={PROJECTS[4]} index={4} />;
