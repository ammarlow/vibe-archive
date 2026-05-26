import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";
import { GithubIcon } from "./GithubIcon";

const statusStyles: Record<Project["status"], string> = {
  live: "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30",
  wip: "bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/30",
  archived: "bg-slate-400/10 text-slate-300 ring-1 ring-slate-400/30",
};

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  wip: "In progress",
  archived: "Archived",
};

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const primaryHref = project.url ?? project.repo ?? "#";

  return (
    <a
      href={primaryHref}
      target="_blank"
      rel="noreferrer noopener"
      className="card-hover glass group relative flex flex-col overflow-hidden rounded-2xl"
    >
      <div
        className={`relative h-32 w-full bg-gradient-to-br ${project.accent}`}
      >
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md text-2xl ring-1 ring-white/25 shadow-lg">
          <span aria-hidden>{project.emoji}</span>
        </div>
        <div className="absolute right-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[project.status]}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {statusLabel[project.status]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-white">
            {project.name}
          </h3>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/60">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/70 ring-1 ring-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-white/40">
          <time dateTime={project.createdAt}>
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </time>
          {project.repo && (
            <span className="inline-flex items-center gap-1.5 text-white/50 transition-colors group-hover:text-white">
              <GithubIcon className="h-3.5 w-3.5" />
              Repo
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
