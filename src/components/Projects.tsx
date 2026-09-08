"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/data";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectModal } from "./projects/ProjectModal";

interface Active {
  project: Project;
  order: number;
}

export function Projects() {
  const [active, setActive] = useState<Active | null>(null);

  return (
    <Section id="projects" width="grid">
      <SectionHeader
        index="03"
        eyebrow="Selected work"
        title="Featured projects."
        description="Real-time platforms, applied ML, and production event portals. Select any project for the full detail."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            order={i + 1}
            onOpen={() => setActive({ project, order: i + 1 })}
          />
        ))}
      </div>

      {/* interactive lightbox */}
      <AnimatePresence>
        {active && (
          <ProjectModal
            project={active.project}
            order={active.order}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
