/**
 * Showcase manifest — one entry per scene, in reel order.
 *
 * Every image's intrinsic size is recorded so the frames can scale and scroll it
 * without distortion (width-fit, height derived from the true aspect ratio).
 *
 * To swap a brand plate for a real capture: drop the file into
 * public/projects/<slug>/ and replace `layout: "plate"` with a `tandem` layout + screens.
 */

export type Shot = { src: string; w: number; h: number };

export type Stage = "ink" | "cream" | "brown";

export type Layout =
  /** Laptop (desktop capture, auto-scroll) + phone (mobile capture, auto-scroll). */
  | { kind: "tandem"; desktop: Shot; mobile: Shot }
  /** Laptop + a 3:4 product photography card, shown complete (contain). */
  | { kind: "product"; desktop: Shot; product: Shot; mobile?: Shot }
  /** Staggered 2.5D browser-card stack for multi-screen products. */
  | { kind: "stack"; screens: [Shot, Shot, Shot] }
  /** Typographic brand plate — used where no capture exists in the repo yet. */
  | { kind: "plate"; monogram: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  statement: string;
  detail: string;
  chips: string[];
  repo: string;
  stage: Stage;
  layout: Layout;
  /** Max scroll travel in screen px — keeps scans readable on very tall pages. */
  maxScroll?: number;
};

const p = (slug: string, file: string, w: number, h: number): Shot => ({
  src: `projects/${slug}/${file}`,
  w,
  h,
});

export const PROJECTS: Project[] = [
  {
    slug: "vessels-of-victory",
    title: "Vessels of Victory",
    category: "Ministry · Digital Community",
    statement: "A digital home where ministry and community gather as one.",
    detail: "Faith-forward platform design for a growing ministry.",
    chips: ["Ministry", "Community", "Web Platform"],
    repo: "Vessels-of-Victory",
    stage: "ink",
    layout: { kind: "plate", monogram: "VV" },
  },
  {
    slug: "maes-joint",
    title: "Mae’s Joint",
    category: "Culinary · Takeout Ordering",
    statement: "A neighborhood food brand turned into an order-ready experience.",
    detail: "Owner-editable weekly menu, built-in pay links, delivery days.",
    chips: ["Admin Menu Editor", "Mobile-First", "Pay Links"],
    repo: "Maes-Joint-Menu-Site-total",
    stage: "cream",
    layout: {
      kind: "tandem",
      desktop: p("maes-joint", "desktop.jpg", 1440, 2400),
      mobile: p("maes-joint", "mobile.jpg", 430, 1900),
    },
    maxScroll: 620,
  },
  {
    slug: "enter-the-haus",
    title: "enter TheHAUS",
    category: "Creative Agency · Studio Portal",
    statement: "Everything you need is already in the HAUS.",
    detail: "The front door to the theHAUS. | VISION studio and its rooms.",
    chips: ["Studio Portal", "Waitlist", "Responsive"],
    repo: "enterTheHAUS",
    stage: "cream",
    layout: {
      kind: "tandem",
      desktop: p("enter-the-haus", "desktop.jpg", 1440, 1709),
      mobile: p("enter-the-haus", "mobile.jpg", 780, 3228),
    },
    maxScroll: 520,
  },
  {
    slug: "thehaus-glam",
    title: "theHAUS Glam",
    category: "Beauty · Glam Services",
    statement: "Wellness-informed beauty, booked with intention.",
    detail: "Service menu and booking experience for glam clientele.",
    chips: ["Glam Services", "Wellness-Informed", "Booking"],
    repo: "theHAUS",
    stage: "brown",
    layout: { kind: "plate", monogram: "G" },
  },
  {
    slug: "still-her-glow",
    title: "Still Her Glow",
    category: "Luxury Jewelry · E-Commerce",
    statement: "Heavy blessings. High fashion. Handcrafted with intention.",
    detail: "Storefront, collections and story for a handcrafted jewelry line.",
    chips: ["Handcrafted", "Storefront", "Collections"],
    repo: "crystal-arc-craft",
    stage: "cream",
    layout: {
      kind: "product",
      desktop: p("still-her-glow", "desktop.jpg", 1440, 900),
      product: p("still-her-glow", "product.jpg", 1320, 1768),
    },
  },
  {
    slug: "document-weaver",
    title: "Document Weaver",
    category: "Automation · Document Workflows",
    statement: "Documents and workflows, woven into one engine.",
    detail: "Automated document generation and workflow orchestration.",
    chips: ["Automation", "Workflow Engine", "Docs"],
    repo: "Document-Weaver",
    stage: "ink",
    layout: { kind: "plate", monogram: "DW" },
  },
  {
    slug: "prophetic-ascent",
    title: "Prophetic Ascent",
    category: "Spiritual Growth · Learning",
    statement: "Emotionally intelligent. Spiritually grounded.",
    detail: "Sanctuary dashboard, training modules and a prophetic journal.",
    chips: ["School of the Prophets", "Journal", "Research Companion"],
    repo: "Prophetic-Ascent",
    stage: "ink",
    layout: {
      kind: "stack",
      screens: [
        p("prophetic-ascent", "screen-1.jpg", 1440, 1000),
        p("prophetic-ascent", "screen-2.jpg", 1440, 1000),
        p("prophetic-ascent", "screen-3.jpg", 1440, 1000),
      ],
    },
  },
  {
    slug: "jukebox-on-wheels",
    title: "Jukebox on Wheels",
    category: "Mobile DJ · Event Booking",
    statement: "Unforgettable events. Experience the difference.",
    detail: "Booking-first site for DJ Modernaire, Birmingham, AL.",
    chips: ["DJ Modernaire", "Event Booking", "Birmingham, AL"],
    repo: "dj-modernaire-website-",
    stage: "cream",
    layout: {
      kind: "tandem",
      desktop: p("jukebox-on-wheels", "desktop.jpg", 1440, 1900),
      mobile: p("jukebox-on-wheels", "mobile.jpg", 780, 4800),
    },
    maxScroll: 360,
  },
  {
    slug: "dilla-day",
    title: "Dilla Day",
    category: "Cultural Event · Music",
    statement: "A tribute to J Dilla — honoring his legacy, raising Lupus awareness.",
    detail: "One-page launch for Dilla Day BHM ’26 with Eventbrite ticketing.",
    chips: ["BHM ’26", "Ticketing", "Lineup"],
    repo: "Dilla-Day-Site",
    stage: "cream",
    layout: {
      kind: "tandem",
      desktop: p("dilla-day", "desktop.jpg", 1440, 3000),
      mobile: p("dilla-day", "mobile.jpg", 390, 844),
    },
    maxScroll: 700,
  },
  {
    slug: "wholelistic",
    title: "WHOLElistic",
    category: "Case Coordination · Community Hub",
    statement: "Name the invisible systems. Claim your mandate.",
    detail: "The Authorization Intensive and the 5 Bureaucracies framework.",
    chips: ["Authorization Intensive", "5 Bureaucracies", "Community"],
    repo: "Career-Class-Hub",
    stage: "cream",
    layout: {
      kind: "tandem",
      desktop: p("wholelistic", "desktop.jpg", 1440, 3200),
      mobile: p("wholelistic", "mobile.jpg", 780, 4800),
    },
    maxScroll: 640,
  },
  {
    slug: "classroom",
    title: "Classroom",
    category: "Career Training · LMS",
    statement: "You already have the authority. Time to use it.",
    detail: "The Strategy Suite™ — programs, lessons and a student dashboard.",
    chips: ["Strategy Suite™", "Lesson Viewer", "Dashboard"],
    repo: "Career-Class-Hub",
    stage: "cream",
    layout: {
      kind: "tandem",
      desktop: p("classroom", "desktop.jpg", 1440, 3200),
      mobile: p("classroom", "mobile.jpg", 780, 4800),
    },
    maxScroll: 640,
  },
];

export const TOTAL = PROJECTS.length;
