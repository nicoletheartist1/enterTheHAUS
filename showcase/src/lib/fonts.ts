import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

/**
 * House typefaces (same files as crystal-arc-craft/remotion/public/fonts).
 * Only these three cuts exist, so components request exactly 700 / 400 / 300 —
 * never an in-between weight or italic, which the browser would fake.
 */
const faces: { family: string; file: string; weight: string; format: "opentype" | "truetype" }[] = [
  { family: "Seasons", file: "seasons.ttf", weight: "700", format: "truetype" }, // The Seasons Bold
  { family: "Agrandir", file: "agrandir.otf", weight: "400", format: "opentype" }, // Agrandir Regular
  { family: "Agrandir", file: "agrandir-light.otf", weight: "300", format: "opentype" }, // Agrandir Grand Light
];

// Block every frame until all faces are registered so headless renders never flash fallback type.
const handle = delayRender("Loading VISION fonts", { timeoutInMilliseconds: 30000 });

Promise.all(
  faces.map((f) =>
    loadFont({
      family: f.family,
      url: staticFile(`fonts/${f.file}`),
      weight: f.weight,
      style: "normal",
      format: f.format,
    }),
  ),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error("Font load failed", err);
    continueRender(handle);
  });
