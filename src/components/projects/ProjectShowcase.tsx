import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

/**
 * Plate for a project. Renders a real capture when `project.screenshot` is
 * set, otherwise a typographic plate built from the project's own index —
 * honest about being a placeholder rather than imitating a browser window.
 */
export function ProjectShowcase({
  project,
  order = 1,
  className,
}: {
  project: Project;
  order?: number;
  className?: string;
}) {
  const host = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <figure className={cn("w-full", className)}>
      <div className="relative overflow-hidden rounded-md border border-rule bg-carbon">
        {project.screenshot ? (
          <div className="relative aspect-video">
            <Image
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div className="relative flex aspect-video items-center justify-center">
            <span
              aria-hidden
              className="font-display text-[7rem] leading-none font-bold text-white/6 sm:text-[9rem]"
            >
              {String(order).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-3 font-mono text-[11px] tracking-tactical text-metal-dim uppercase">
        <span className="truncate">{project.title}</span>
        {host && <span className="shrink-0 normal-case">{host}</span>}
      </figcaption>
    </figure>
  );
}
