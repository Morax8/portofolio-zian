"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import type { Project } from "@/lib/data";
import { GithubIcon } from "../ui/BrandIcons";
import { Tag } from "../ui/Tag";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectCard({
  project,
  order,
  onOpen,
}: {
  project: Project;
  order: number;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: ((order - 1) % 3) * 0.07,
        ease: EASE,
      }}
      className={project.span}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={reduce ? undefined : { y: -4 }}
        whileTap={reduce ? undefined : { scale: 0.995 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        aria-label={`Open details for ${project.title}`}
        className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-md border border-rule bg-carbon/50 p-6 text-left transition-colors duration-300 hover:border-rule-strong"
      >
        {/* Index numeral — the card's visual anchor now that the
            decorative code block is gone. Sized and inset so it never
            reaches the title's text column. */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-4 right-5 font-display text-5xl leading-none font-bold text-white/5 transition-colors duration-300 group-hover:text-crimson/25"
        >
          {String(order).padStart(2, "0")}
        </span>

        {/* Always rendered so titles share a baseline across the grid,
            featured or not. */}
        <span className="mb-3 block h-4 font-mono text-[11px] tracking-tactical text-crimson uppercase">
          {project.featured ? "Featured" : ""}
        </span>

        <h3 className="pr-20 font-display text-xl leading-tight font-bold text-bright transition-colors duration-300 group-hover:text-crimson">
          {project.title}
        </h3>

        <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-metal-grey">
          {project.desc}
        </p>

        {/* mb-6 guarantees a gap even when mt-auto collapses to zero on
            content-tall cards. */}
        <div className="mt-5 mb-6 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-rule pt-4 font-mono text-[11px] text-metal-dim">
          <span className="flex items-center gap-4">
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                Live site
              </span>
            )}
            {project.repoUrl && (
              <span className="inline-flex items-center gap-1.5">
                <GithubIcon className="h-3.5 w-3.5" />
                Repository
              </span>
            )}
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-crimson" />
        </div>
      </motion.button>
    </motion.div>
  );
}
