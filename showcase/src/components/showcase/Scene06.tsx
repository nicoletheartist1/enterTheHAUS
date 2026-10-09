import React from "react";
import { PROJECTS } from "../../data/projects";
import { ShowcaseScene } from "./ShowcaseScene";

/** Scene 06 — Document Weaver. Copy + assets live in src/data/projects.ts. */
export const Scene06: React.FC = () => <ShowcaseScene project={PROJECTS[5]} index={5} />;
