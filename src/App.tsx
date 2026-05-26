import { useMemo, useState } from "react";
import { Search, Sparkles, X } from "lucide-react";
import { projects, type Project, type ProjectStatus } from "./data/projects";
import { ProjectCard } from "./components/ProjectCard";
import { GithubIcon } from "./components/GithubIcon";
import { BackgroundFX } from "./components/BackgroundFX";

type Filter = "all" | ProjectStatus;

const filterOptions: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "wip", label: "In progress" },
  { id: "archived", label: "Archived" },
];

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered: Project[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter((p) => (filter === "all" ? true : p.status === filter))
      .filter((p) => (activeTag ? p.tags.includes(activeTag) : true))
      .filter((p) => {
        if (!q) return true;
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [query, filter, activeTag]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      live: projects.filter((p) => p.status === "live").length,
      wip: projects.filter((p) => p.status === "wip").length,
      archived: projects.filter((p) => p.status === "archived").length,
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-white">
      <BackgroundFX />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" aria-hidden />
              vibe-coded archive
            </div>
            <a
              href="https://github.com/ammarlow"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10"
            >
              <GithubIcon className="h-4 w-4" />
              @ammarlow
            </a>
          </div>

          <div className="max-w-3xl">
            <h1 className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl">
              The vibe-code <br /> project archive.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
              A growing index of everything I've built on a whim — late nights,
              weekend hacks, and ideas that wouldn't let go. Some shipped, some
              shelved, all archived.
            </p>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3 sm:max-w-md sm:grid-cols-4">
            <Stat label="Projects" value={stats.total} accent="text-white" />
            <Stat label="Live" value={stats.live} accent="text-emerald-300" />
            <Stat label="WIP" value={stats.wip} accent="text-amber-300" />
            <Stat
              label="Archived"
              value={stats.archived}
              accent="text-slate-300"
            />
          </div>
        </header>

        <section className="mt-12 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                aria-hidden
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, tags, ideas…"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/40 outline-none ring-0 backdrop-blur transition focus:border-violet-400/60 focus:bg-white/10"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur">
              {filterOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFilter(opt.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    filter === opt.id
                      ? "bg-white text-ink-900 shadow"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveTag(null)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                activeTag === null
                  ? "bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/40"
                  : "bg-white/5 text-white/60 ring-1 ring-white/10 hover:text-white"
              }`}
            >
              All tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                  activeTag === tag
                    ? "bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/40"
                    : "bg-white/5 text-white/60 ring-1 ring-white/10 hover:text-white"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10">
          {filtered.length === 0 ? (
            <div className="glass flex flex-col items-center justify-center gap-3 rounded-2xl px-6 py-16 text-center">
              <div className="text-3xl">🛸</div>
              <h3 className="text-lg font-semibold">Nothing here yet</h3>
              <p className="max-w-md text-sm text-white/60">
                No projects match your filters. Try clearing your search or
                picking a different tag.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                  setActiveTag(null);
                }}
                className="mt-2 rounded-lg bg-white px-4 py-2 text-xs font-medium text-ink-900 transition hover:bg-white/90"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-24 flex flex-col items-center gap-2 border-t border-white/5 pt-10 text-center text-xs text-white/40">
          <p>Built with React, Vite & Tailwind — vibes maintained by hand.</p>
          <p>© {new Date().getFullYear()} Ammar Low. All projects, archived with love.</p>
        </footer>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="glass rounded-xl px-4 py-3">
      <div className={`text-2xl font-semibold tabular-nums ${accent}`}>
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-white/40">
        {label}
      </div>
    </div>
  );
}

export default App;
