export type GameStatus = "Released" | "Early Access" | "In Development" | "Classified";

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  genre: string;
  platforms: string[];
  status: GameStatus;
  release: string;
  progress?: number;
  stage?: string;
  description: string;
  cover: { id: string; alt: string };
  screenshots: { id: string; alt: string }[];
  features: string[];
  metric?: { label: string; value: string };
};

export const games: Game[] = [
  {
    slug: "voidfall",
    title: "VOIDFALL",
    tagline: "Five operatives. One collapsing city. No respawns.",
    genre: "Tactical hero shooter",
    platforms: ["PC", "PS5", "Xbox Series X|S"],
    status: "Released",
    release: "March 2025",
    description:
      "A 5v5 round-based shooter set in Meridian Arc — a megacity slowly falling into a singularity. Every match the map loses ground, forcing fights into tighter, deadlier space. Season 07: Operation Blackout is live now.",
    cover: { id: "1763198216825-06c985c712a2", alt: "VOIDFALL key art: a lone operative facing a glowing orb above a ruined city" },
    screenshots: [
      { id: "1763198216782-b534fea3dcf1", alt: "VOIDFALL: snow-covered megastructures on the Frostline map" },
      { id: "1728289306599-399d47b9cb43", alt: "VOIDFALL: brutalist tower district at dusk" },
      { id: "1692798201163-b20340b93ee0", alt: "VOIDFALL: mountain ridge overlooking the singularity" },
      { id: "1672872476232-da16b45c9001", alt: "VOIDFALL: neon-lit streets of Meridian Arc at night" },
    ],
    features: ["24 operatives, 11 maps", "Collapsing-arena ranked mode", "Cross-play & cross-progression", "Official esports title"],
    metric: { label: "Players", value: "9.4M" },
  },
  {
    slug: "neon-drift-zero",
    title: "NEON DRIFT: ZERO",
    tagline: "Anti-gravity racing at the speed of light.",
    genre: "Arcade racer",
    platforms: ["PC", "Switch 2"],
    status: "Early Access",
    release: "Early Access since June 2026",
    progress: 82,
    stage: "Early Access · Update 0.9",
    description:
      "Twelve tracks carved through a city that never switches off. Drift, boost and slipstream through hand-built circuits with a soundtrack that reacts to your racing line.",
    cover: { id: "1557515126-1bf9ada5cb93", alt: "NEON DRIFT: ZERO — aerial view of a city's light trails at night" },
    screenshots: [
      { id: "1586968272237-a3d597214887", alt: "NEON DRIFT: ZERO — red and black elevated rail circuit" },
      { id: "1573767291321-c0af2eaf5266", alt: "NEON DRIFT: ZERO — the Overpass track from above" },
      { id: "1519608487953-e999c86e7455", alt: "NEON DRIFT: ZERO — pit lane walkway at night" },
    ],
    features: ["12 tracks, 3 leagues", "Reactive soundtrack", "Ghost-racing leaderboards", "Full release 2027"],
    metric: { label: "Steam rating", value: "94%" },
  },
  {
    slug: "echo-protocol",
    title: "ECHO PROTOCOL",
    tagline: "Every sound you make is a weapon — or a confession.",
    genre: "Narrative stealth-action",
    platforms: ["PC", "PS5", "Xbox Series X|S"],
    status: "In Development",
    release: "Target window: Q3 2027",
    progress: 64,
    stage: "Alpha",
    description:
      "Play as Ash, a sound engineer who can see audio. Map rooms with echolocation, bend acoustics to slip past patrols and reconstruct a conspiracy from overheard fragments in rain-soaked Neo-Osaka.",
    cover: { id: "1601042879364-f3947d3f9c16", alt: "ECHO PROTOCOL concept: rain-slicked Neo-Osaka street lit by neon" },
    screenshots: [
      { id: "1519608487953-e999c86e7455", alt: "ECHO PROTOCOL: elevated walkway during a night patrol" },
      { id: "1531819177115-428566ccfb50", alt: "ECHO PROTOCOL: twin towers on the skyline" },
    ],
    features: ["Echolocation traversal", "Branching investigation", "Fully non-lethal route", "Dynamic acoustic AI"],
  },
  {
    slug: "signal-lost",
    title: "SIGNAL LOST",
    tagline: "Four survivors. One transmitter. Something listening.",
    genre: "Co-op survival horror",
    platforms: ["PC"],
    status: "In Development",
    release: "To be announced",
    progress: 23,
    stage: "Pre-production",
    description:
      "A four-player co-op horror set on a research outpost at the edge of a frozen desert. Repair the array, ration power and decide who goes outside when the static starts to speak.",
    cover: { id: "1653549892877-3d84e67c2632", alt: "SIGNAL LOST concept: a thin luminous filament in darkness" },
    screenshots: [{ id: "1682687218147-9806132dc697", alt: "SIGNAL LOST concept: aerial view of the frozen desert outpost" }],
    features: ["4-player co-op", "Procedural storms", "Proximity voice", "Permadeath expeditions"],
  },
  {
    slug: "starforge-tactics",
    title: "STARFORGE TACTICS",
    tagline: "Command the last fleet between the stars.",
    genre: "Turn-based strategy",
    platforms: ["PC", "iOS", "Android"],
    status: "Released",
    release: "October 2023",
    description:
      "Our first game: a tight, replayable fleet-tactics roguelite where every hull plate matters. Over 3 million commanders and a 4.8-star average on mobile stores.",
    cover: { id: "1531819177115-428566ccfb50", alt: "STARFORGE TACTICS key art: illuminated towers against the night sky" },
    screenshots: [{ id: "1573767291321-c0af2eaf5266", alt: "STARFORGE TACTICS: fleet map overview" }],
    features: ["40+ ship classes", "Daily seeded runs", "Cross-save mobile/PC", "Mod support"],
    metric: { label: "Commanders", value: "3.1M" },
  },
  {
    slug: "project-kestrel",
    title: "PROJECT KESTREL",
    tagline: "[ REDACTED ]",
    genre: "Unannounced",
    platforms: ["TBA"],
    status: "Classified",
    release: "Signal incoming",
    progress: 8,
    stage: "Concept",
    description:
      "Our most ambitious project yet is in early concept with a small strike team in Berlin. We're hiring for it — and that's all we can say.",
    cover: { id: "1626379945538-6c8824dd898f", alt: "Abstract violet and blue light — Project Kestrel teaser" },
    screenshots: [],
    features: ["Strike team of 12", "New in-house engine tech", "Hiring now"],
  },
];

export const players = [
  {
    handle: "KAIRO",
    name: "Kai Rønning",
    role: "In-game leader",
    country: "NO",
    kd: "1.34",
    rating: "1.21",
    image: { id: "1541294054180-6c46ae51bbf2", alt: "Kai 'KAIRO' Rønning portrait" },
  },
  {
    handle: "VEX",
    name: "Vera Exner",
    role: "Duelist",
    country: "DE",
    kd: "1.52",
    rating: "1.33",
    image: { id: "1613698808499-f772ccb4f527", alt: "Vera 'VEX' Exner portrait" },
  },
  {
    handle: "WRAITH",
    name: "Omar Haddad",
    role: "Sentinel",
    country: "AE",
    kd: "1.18",
    rating: "1.09",
    image: { id: "1610741141761-23b20808980e", alt: "Omar 'WRAITH' Haddad portrait" },
  },
  {
    handle: "NOVA",
    name: "Seo-yeon Park",
    role: "Initiator",
    country: "KR",
    kd: "1.27",
    rating: "1.17",
    image: { id: "1585732436636-f786c52696d6", alt: "Seo-yeon 'NOVA' Park portrait" },
  },
  {
    handle: "RYUJI",
    name: "Ryuji Tanaka",
    role: "Controller",
    country: "JP",
    kd: "1.11",
    rating: "1.12",
    image: { id: "1611269260746-e2f584353ebe", alt: "Ryuji 'RYUJI' Tanaka portrait" },
  },
];

export const tournaments = [
  {
    day: "14",
    month: "NOV",
    name: "VOIDFALL Masters — Seoul",
    location: "Jamsil Arena, Seoul",
    format: "16 teams · LAN · Double elim",
    prize: "$500,000",
    status: "Tickets on sale",
    cta: "Get tickets",
  },
  {
    day: "06",
    month: "DEC",
    name: "NXV Open Series #4",
    location: "Online · EU / NA",
    format: "128 teams · Swiss → Playoffs",
    prize: "$40,000",
    status: "Registration open",
    cta: "Register team",
  },
  {
    day: "17",
    month: "JAN",
    name: "Neon Drift Grand Prix",
    location: "Verti Music Hall, Berlin",
    format: "64 drivers · Time attack",
    prize: "$75,000",
    status: "Qualifiers live",
    cta: "Enter qualifiers",
  },
  {
    day: "21",
    month: "FEB",
    name: "VOIDFALL Collegiate Cup",
    location: "Online · Global",
    format: "University teams · Bo3",
    prize: "$25,000 in scholarships",
    status: "Opens 5 Jan",
    cta: "Notify me",
  },
];

export const sponsors = ["VOLTCORE", "Strata", "aurex", "HYPERLINE", "pulse/labs", "ORBIT", "KINETIC", "Monolith"];

export const studioTeam = [
  {
    name: "Mara Lindqvist",
    role: "Studio Director",
    prev: "15 years shipping shooters",
    image: { id: "1644353224392-7e532d7b8f4b", alt: "Portrait of Mara Lindqvist" },
  },
  {
    name: "Dev Anand",
    role: "Technical Director",
    prev: "Engine & netcode lead",
    image: { id: "1610741338724-8b60c2983768", alt: "Portrait of Dev Anand" },
  },
  {
    name: "Léa Fontaine",
    role: "Art Director",
    prev: "Concept art & world-building",
    image: { id: "1620110500184-d24e04981faf", alt: "Portrait of Léa Fontaine" },
  },
  {
    name: "Tomasz Wójcik",
    role: "Game Director, ECHO PROTOCOL",
    prev: "Narrative systems designer",
    image: { id: "1580428180163-76ab1efe2aed", alt: "Portrait of Tomasz Wójcik" },
  },
  {
    name: "Ama Owusu",
    role: "Head of Esports",
    prev: "Former pro, coach & caster",
    image: { id: "1580046939256-c377c5b099f1", alt: "Portrait of Ama Owusu" },
  },
  {
    name: "Hiro Sato",
    role: "Audio Director",
    prev: "Reactive music systems",
    image: { id: "1559828801-04565cd31e27", alt: "Portrait of Hiro Sato" },
  },
];

export const devlog = [
  { date: "2026.10.09", tag: "AUDIO", title: "Echolocation v3: rooms now remember what you heard" },
  { date: "2026.09.18", tag: "ART", title: "Neo-Osaka district 2 enters greybox lighting pass" },
  { date: "2026.08.27", tag: "AI", title: "Patrols react to footstep material and rain intensity" },
];
