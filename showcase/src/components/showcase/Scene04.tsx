import React from "react";
import { PROJECTS } from "../../data/projects";
import { ShowcaseScene } from "./ShowcaseScene";

/** Scene 04 — theHAUS Glam. Copy + assets live in src/data/projects.ts. */
export const Scene04: React.FC = () => <ShowcaseScene project={PROJECTS[3]} index={3} />;
