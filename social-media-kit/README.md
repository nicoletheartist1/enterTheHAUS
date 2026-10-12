# theHAUS. — Social Media Kit (4 Rooms)

Built from the live Hub at enterthehaus.co (Replit: **Current HAUS Site** → `artifacts/the-haus`):
room names, colors, icons, taglines and descriptions are copied from `src/pages/Hub.tsx` and `src/components/RoomIcons.tsx`.

| File | Size | Use |
|---|---|---|
| `haus-01-four-rooms-feed.png` | 1080×1350 | Feed: the four Rooms at a glance |
| `haus-02-site-mockup-feed.png` | 1080×1350 | Feed: laptop + phone mockups of the Hub |
| `haus-03-room-vision.png` … `haus-06-room-stillher.png` | 1080×1350 | Carousel: one slide per Room |
| `haus-07-enter-story.png` | 1080×1920 | Story: "Enter the HAUS" with link sticker |

## Ready-to-post captions

**01 · Four Rooms**
Four rooms. One Founder. 👑
VISION · GLAM · FREQUENCY · stillHER
Built to empower, equip, and elevate — everyone. God is the Founder; I'm just the steward, sis.
Which room are you walking into first? Tell me below. ✨
#theHAUS #GodIsTheFounder #WhereGodLeads #HausOfVision #stillHER

**02 · Site mockup**
This is where vision becomes something you can touch. 🙏
The HAUS. is open: brand design, glam, music & worship, and handcrafted jewelry, all under one roof.
Enter the HAUS 👉 enterthehaus.co
#theHAUS #GodIsTheFounder #WhereGodLeads

**03–06 · Room carousel**
Take the tour, y'all. Swipe through all four rooms 👉
01 VISION: brand design studio
02 GLAM: wellness-informed pro artistry
03 FREQUENCY: music & worship
04 stillHER: handcrafted jewelry
Save this so you know which door to knock on. 💎
#theHAUS #HausOfVision #HausFrequency #stillHER #GodIsTheFounder

**07 · Story**: add a link sticker to `enterthehaus.co`.

## Notes
- **Logo:** the gold "the HAUS." is set in Seasons with the site's gold gradient as a stand-in.
  To use the real logo, drop `haus-gold-logo-1280.webp` into `source/img/` and swap the `.wordmark` elements for an `<img>`.
- **Fonts:** Seasons and Agrandir are licensed and are not committed to this public repo.
  Copy `Seasons.ttf`, `Agrandir-Regular.otf` and `Agrandir-GrandLight.otf` from the Replit app's
  `artifacts/the-haus/src/fonts/` into `source/fonts/` as `seasons.ttf`, `agrandir.otf`, `agrandir-light.otf`.

## Re-render
From `source/`: `node render.js img screens.html` (device screens), then `node render.js .. haus.html` (needs Playwright + Chromium).
