export type ProjectStatus = "live" | "wip" | "archived";

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  repo?: string;
  tags: string[];
  status: ProjectStatus;
  emoji: string;
  accent: string; // tailwind gradient classes for the card thumbnail
  createdAt: string; // ISO date
}

export const projects: Project[] = [
  {
    id: "kayangan-trading-app",
    name: "Kayangan Trading App",
    description:
      "Internal tooling for a trading workflow — order entry, position tracking, and PnL views.",
    repo: "https://github.com/ammarlow/KayanganTradingApp",
    tags: ["finance", "trading", "internal"],
    status: "wip",
    emoji: "📈",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    createdAt: "2025-04-12",
  },
  {
    id: "text-editor",
    name: "Text Editor",
    description:
      "A minimal, fast text editor experiment — exploring rich text rendering and keybindings.",
    repo: "https://github.com/ammarlow/TextEditor",
    tags: ["productivity", "experiment"],
    status: "archived",
    emoji: "✍️",
    accent: "from-slate-400 via-slate-500 to-slate-700",
    createdAt: "2024-11-03",
  },
  {
    id: "ai-blackjack",
    name: "AI Blackjack",
    description:
      "Blackjack you can play against an AI agent. Counts cards, picks strategies, and trash talks.",
    repo: "https://github.com/ammarlow/ai-blackjack",
    tags: ["ai", "game"],
    status: "live",
    emoji: "🂡",
    accent: "from-rose-500 via-red-600 to-orange-500",
    createdAt: "2025-01-20",
  },
  {
    id: "ammar-notes",
    name: "Ammar Notes",
    description:
      "Personal knowledge base — fast capture, markdown-first, with a clean writing surface.",
    repo: "https://github.com/ammarlow/ammar-notes",
    tags: ["notes", "productivity"],
    status: "live",
    emoji: "🗒️",
    accent: "from-amber-400 via-yellow-500 to-orange-500",
    createdAt: "2024-08-14",
  },
  {
    id: "ammarlow-github-io",
    name: "ammarlow.github.io",
    description:
      "Personal site & portfolio — a living index of who I am and what I've shipped.",
    url: "https://ammarlow.github.io",
    repo: "https://github.com/ammarlow/ammarlow.github.io",
    tags: ["portfolio", "site"],
    status: "live",
    emoji: "🌐",
    accent: "from-indigo-500 via-violet-500 to-purple-600",
    createdAt: "2024-05-01",
  },
  {
    id: "gex-heatmap",
    name: "GEX Heatmap",
    description:
      "Gamma exposure heatmap visualization for options markets. Spot the dealer pinning levels.",
    repo: "https://github.com/ammarlow/gex-heatmap",
    tags: ["finance", "options", "viz"],
    status: "wip",
    emoji: "🔥",
    accent: "from-fuchsia-500 via-pink-500 to-rose-500",
    createdAt: "2025-03-06",
  },
  {
    id: "malaysia-calendar",
    name: "Malaysia Calendar",
    description:
      "Public holiday calendar for Malaysia with ICS export and a beautiful schedule view.",
    repo: "https://github.com/ammarlow/malaysia-calendar",
    tags: ["calendar", "utility"],
    status: "live",
    emoji: "🇲🇾",
    accent: "from-red-500 via-amber-400 to-yellow-300",
    createdAt: "2025-02-11",
  },
  {
    id: "options-tracker",
    name: "Options Tracker",
    description:
      "Track open options positions, deltas, and theta decay across your portfolio.",
    repo: "https://github.com/ammarlow/options-tracker",
    tags: ["finance", "options"],
    status: "wip",
    emoji: "📊",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
    createdAt: "2025-03-18",
  },
  {
    id: "simple-pos",
    name: "Simple POS",
    description:
      "A no-fuss point of sale built with Vue — for small shops that just need to ring up a sale.",
    repo: "https://github.com/ammarlow/simple-pos",
    tags: ["pos", "vue", "small-business"],
    status: "wip",
    emoji: "🧾",
    accent: "from-green-400 via-emerald-500 to-teal-600",
    createdAt: "2026-05-26",
  },
  {
    id: "stable-diffusion-xl",
    name: "Stable Diffusion XL Playground",
    description:
      "Local playground for SDXL — prompt experiments, LoRA tests, and image gallery.",
    repo: "https://github.com/ammarlow/stable-diffusion-xl-base-1.0",
    tags: ["ai", "image-gen", "experiment"],
    status: "archived",
    emoji: "🎨",
    accent: "from-purple-500 via-fuchsia-500 to-pink-500",
    createdAt: "2024-09-22",
  },
  {
    id: "ticketify",
    name: "Ticketify",
    description:
      "Lightweight ticketing system — open issues, assign owners, and resolve fast.",
    repo: "https://github.com/ammarlow/ticketify",
    tags: ["productivity", "saas"],
    status: "wip",
    emoji: "🎟️",
    accent: "from-blue-500 via-indigo-500 to-violet-600",
    createdAt: "2025-05-30",
  },
];
