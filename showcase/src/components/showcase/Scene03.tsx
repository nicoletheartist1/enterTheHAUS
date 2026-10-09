import React from "react";
import { PROJECTS } from "../../data/projects";
import { ShowcaseScene } from "./ShowcaseScene";

/** Scene 03 — enter TheHAUS. Copy + assets live in src/data/projects.ts. */
export const Scene03: React.FC = () => <ShowcaseScene project={PROJECTS[2]} index={2} />;
