import React from "react";
import { PROJECTS } from "../../data/projects";
import { ShowcaseScene } from "./ShowcaseScene";

/** Scene 02 — Mae’s Joint. Copy + assets live in src/data/projects.ts. */
export const Scene02: React.FC = () => <ShowcaseScene project={PROJECTS[1]} index={1} />;
