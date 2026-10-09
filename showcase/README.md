# theHAUS. | VISION — Portfolio Motion Showcase

A Remotion reel presenting 11 digital platforms in a dual-column editorial layout.
**1920×1080 · 30fps · 1665 frames (55.5s)**

## Commands

```bash
cd showcase
npm install

npm run dev          # Remotion Studio: scrub every scene live
npm run typecheck    # tsc --noEmit
npm run build        # bundle → ./build
npm run render       # full reel → out/thehaus-vision-showcase.mp4 (h264, crf 16)
npm run render:still # poster frame → out/poster.png

# One scene on its own (Scene01 … Scene11, Intro, Outro)
npx remotion render src/index.ts Scene05 out/scene05.mp4
```

On a machine without a Remotion-managed Chrome, add `--browser-executable=/path/to/chrome-headless-shell`.

## Architecture

```
src/
  Root.tsx                         MasterShowcase + every scene as its own composition
  compositions/MasterShowcase.tsx  Intro → Scene01…11 → Outro, copper streak on every cut
  components/showcase/
    ShowcaseScene.tsx              shared 40/60 scene template (copy column + stage)
    Scene01.tsx … Scene11.tsx      one file per project
    Intro.tsx  Outro.tsx  CopperStreak.tsx
  components/atoms/
    DeviceMockup.tsx               Laptop · Phone · BrowserCard · PhotoCard · ScrollScreen
    KineticTitle.tsx               word-by-word masked spring rise
    MetallicBadge.tsx              copper pill / chip
    ProjectGrid.tsx                11-project index (outro)
    BrandPlate.tsx                 typographic plate for projects without a capture
  data/projects.ts                 ← all copy, chips, layouts and asset sizes live here
  lib/tokens.ts                    locked palette, grid geometry, easing, spring, timing
  lib/fonts.ts                     @remotion/fonts loadFont + delayRender
```

**Scene timing (135 frames):** 0–24 entrance (spring `stiffness 120 / damping 14`) ·
25–110 auto-scroll scan · 111–135 exit wipe + copper streak.
Entrances and exits use `cubic-bezier(0.16, 1, 0.3, 1)`. Scroll scans use a symmetric
in-out curve so the page starts and stops gently enough to read.

**Image rules:** every capture is width-fit at its true aspect ratio (no stretching) and
starts at the top, so the nav and hero always show first. `maxScroll` per project limits
how far the scan travels. Product photography uses `contain` on a canvas mat.

**Motion engine:** all animation is frame-driven through `spring()` / `interpolate()`.
Framer Motion is intentionally not used: its time-based animations don't render
deterministically in Remotion's frame-by-frame renderer.

## Asset audit

| # | Project | Source used | Status |
|---|---|---|---|
| 01 | Vessels of Victory | `Vessels-of-Victory`: **repo is empty** | Brand plate |
| 02 | Mae's Joint | `Maes-Joint-Menu-Site-total/screenshots` (`maes-joint-menu-site` is empty) | ✅ Desktop + mobile |
| 03 | enter TheHAUS | `enterTheHAUS/index.html`, captured locally | ✅ Desktop + mobile |
| 04 | theHAUS Glam | `theHAUS`: **README only** (`Thehauss` empty, `theHAUSSS` README only) | Brand plate |
| 05 | Still Her Glow | `crystal-arc-craft/remotion/public/img` | ✅ Desktop + product photo |
| 06 | Document Weaver | `Document-Weaver` / `Document-Weaver-total` / `Dw`: **no source** | Brand plate |
| 07 | Prophetic Ascent | `Prophetic-Ascent/export/theHAUS-portfolio/02-captures` | ✅ 3-screen stack |
| 08 | Jukebox on Wheels | `dj-modernaire-website-`: built and captured locally | ⚠️ Photos are hosted on an external CDN that the capture environment couldn't reach, so the scan is limited to the hero + "Precision & Quality" section |
| 09 | Dilla Day | `Dilla-Day-Site/screenshots` | ✅ Desktop + mobile |
| 10 | WHOLElistic | `Career-Class-Hub/artifacts/wholelistic`: built and captured locally | ✅ Desktop + mobile |
| 11 | Classroom | `Career-Class-Hub/artifacts/career-school`: built and captured locally | ✅ Desktop + mobile |

### Swapping a brand plate for a real capture

1. Add `desktop.jpg` (1440px wide, full page) and `mobile.jpg` (390 or 780px wide) to `public/projects/<slug>/`.
2. In `src/data/projects.ts`, change that project's `layout` to:
   ```ts
   layout: { kind: "tandem", desktop: p("<slug>", "desktop.jpg", W, H), mobile: p("<slug>", "mobile.jpg", W, H) },
   maxScroll: 600,
   ```
   using the images' real pixel sizes.

The scene, transitions and outro grid pick it up automatically.
