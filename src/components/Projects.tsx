"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

type Project = {
  title: string;
  tags: string[];
  desc: string;
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
};

const projects: Project[] = [
  {
    title: "INFORTA 2026 Website",
    tags: ["Next.js", "Express.js", "Socket.io"],
    desc: "Full-stack event platform with a real-time Kahoot-like quiz via Socket.io.",
    featured: true,
    liveUrl: "https://infortaumn.my.id",
  },
  {
    title: "Phishing Website Detection",
    tags: ["Python", "Machine Learning", "Deep Learning", "URL Features"],
    desc: "ML classifier leveraging URL lexical features to detect phishing sites, using an ensemble-based approach with full feature extraction pipeline.",
    featured: true,
    repoUrl: "https://github.com/Morax8/FinalProjectML",
  },
  {
    title: "HMIF Official Website",
    tags: ["Laravel", "React", "MySQL"],
    desc: "Maintain the organization's company profile site, keeping content current and the Laravel backend stable for student users.",
    featured: false,
    liveUrl: "https://hmif.umn.ac.id",
  },
  {
    title: "Loan Approval Prediction",
    tags: ["Python", "Scikit-Learn", "Flask"],
    desc: "Predictive model comparing Decision Tree and Gradient Boosting for loan eligibility, with a web interface for real-time predictions.",
    featured: false,
  },
  {
    title: "HMIF Penetration Testing",
    tags: ["Kali Linux", "dirb", "whatweb"],
    desc: "Security assessment of the HMIF website using web enumeration and reconnaissance tools, with a documented vulnerability report.",
    featured: false,
  },
  {
    title: "PPIF Website",
    tags: ["Next.js", "React", "Express.js", "Socket.io"],
    desc: "Study program introduction website with an integrated real-time quiz platform for incoming Informatics students, built as Website Division Coordinator.",
    featured: false,
    liveUrl: "https://ppif-2025.vercel.app",
  },
  {
    title: "BYTE Event Website",
    tags: ["Laravel", "Pusher", "MySQL"],
    desc: "Event website for the BYTE tech event featuring real-time audience interaction via Pusher. Optimized the Laravel backend to handle concurrent user sessions during live events.",
    featured: false,
    liveUrl: "https://byteumn.com",
  },
  {
    title: "Company Profile CMS",
    tags: ["Laravel", "Eloquent ORM", "MySQL"],
    desc: "Company profile web application with a custom-built CMS for SMK STRADA, developed during internship. Used Eloquent ORM for efficient dynamic content management.",
    featured: false,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-border"
    >
      <motion.h2
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-heading font-bold text-xs tracking-widest uppercase text-muted mb-10 flex items-center gap-3"
      >
        <span className="w-6 h-px bg-accent inline-block" />
        Projects
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {projects.map((p) => (
          <motion.div
            key={p.title}
            variants={card}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={[
              "bg-surface rounded-xl p-6 group cursor-default flex flex-col",
              "border transition-all duration-300",
              p.featured
                ? "border-accent/30 hover:border-accent hover:shadow-[0_0_28px_rgba(222,255,154,0.18)]"
                : "border-border hover:border-accent/40 hover:shadow-[0_0_20px_rgba(222,255,154,0.1)]",
            ].join(" ")}
          >
            <h3 className="font-heading font-bold text-foreground text-sm leading-snug mb-3">
              {p.title}
            </h3>

            <p className="text-sm text-foreground/55 leading-relaxed mb-4 flex-1">
              {p.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-muted border border-border px-2 py-0.5 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(p.liveUrl || p.repoUrl) && (
              <div className="flex gap-4 pt-3 border-t border-border">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
                  >
                    <ExternalLink size={11} />
                    Live
                  </a>
                )}
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
                  >
                    <GithubIcon size={11} />
                    Code
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
