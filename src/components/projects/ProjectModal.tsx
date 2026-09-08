"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import type { Project } from "@/lib/data";
import { GithubIcon } from "../ui/BrandIcons";
import { Tag } from "../ui/Tag";
import { ProjectShowcase } from "./ProjectShowcase";

/**
 * Lightbox detail view. Rendered inside the parent's <AnimatePresence>, so
 * mount/unmount transitions are handled there.
 */
export function ProjectModal({
  project,
  order,
  onClose,
}: {
  project: Project;
  order: number;
  onClose: () => void;
}) {
  // Escape to close + scroll lock while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const hasLinks = Boolean(project.liveUrl || project.repoUrl);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — details`}
    >
      {/* backdrop — click outside to close */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* panel */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-rule-strong bg-carbon shadow-2xl shadow-black/70"
      >
        {/* header */}
        <div className="flex shrink-0 items-center justify-between border-b border-rule px-5 py-4 sm:px-7">
          <div className="flex items-baseline gap-3 font-mono text-[11px] tracking-tactical uppercase">
            <span className="text-crimson">
              {String(order).padStart(2, "0")}
            </span>
            {project.featured && (
              <span className="hidden text-metal-dim sm:inline">Featured</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-metal-grey transition-colors hover:border-crimson/50 hover:text-crimson"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">
          {/* screenshot / preview area */}
          <ProjectShowcase project={project} order={order} />

          {/* title + metadata */}
          <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-bright sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-metal-grey">
            {project.desc}
          </p>

          {/* stack */}
          <div className="mt-8">
            <h4 className="font-mono text-[11px] tracking-tactical text-metal-dim uppercase">
              Stack
            </h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Tag key={t} variant="crimson">
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        {/* footer actions */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:px-7">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-crimson px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-crimson-red"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-bright transition-colors hover:border-crimson/50 hover:bg-white/3"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub Repository
            </a>
          )}
          {!hasLinks && (
            <p className="flex-1 py-2.5 text-center font-mono text-xs text-metal-dim">
              {"// no public link — internal / coursework build"}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
