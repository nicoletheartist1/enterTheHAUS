import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

const faces: { family: string; file: string; weight: string; style?: string }[] = [
  { family: "Cormorant", file: "cormorant-500.woff2", weight: "500" },
  { family: "Cormorant", file: "cormorant-600.woff2", weight: "600" },
  { family: "Cormorant", file: "cormorant-500-italic.woff2", weight: "500", style: "italic" },
  { family: "Poppins", file: "poppins-300.woff2", weight: "300" },
  { family: "Poppins", file: "poppins-400.woff2", weight: "400" },
  { family: "Poppins", file: "poppins-500.woff2", weight: "500" },
  { family: "Poppins", file: "poppins-600.woff2", weight: "600" },
  { family: "Space Mono", file: "spacemono-400.woff2", weight: "400" },
];

// Block every frame until all faces are registered so headless renders never flash fallback type.
const handle = delayRender("Loading VISION fonts", { timeoutInMilliseconds: 30000 });

Promise.all(
  faces.map((f) =>
    loadFont({
      family: f.family,
      url: staticFile(`fonts/${f.file}`),
      weight: f.weight,
      style: f.style ?? "normal",
      format: "woff2",
    }),
  ),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error("Font load failed", err);
    continueRender(handle);
  });
