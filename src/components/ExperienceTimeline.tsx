"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/lib/experiences";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { y: 20 },
  visible: { y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <>
      <motion.h2
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-heading font-bold text-xs tracking-widest uppercase text-muted mb-10 flex items-center gap-3"
      >
        <span className="w-6 h-px bg-accent inline-block" />
        Experience & Leadership
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        <div className="absolute left-2.75 top-2 bottom-2 w-px bg-border" />

        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            variants={item}
            className="relative pl-9 pb-10 last:pb-0"
          >
            <div className="absolute left-0 top-1 w-5.75 h-5.75 rounded-full border border-accent bg-background flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
              <div>
                <p className="font-heading font-bold text-foreground text-sm leading-snug">
                  {exp.role}
                </p>
                <p className="text-xs text-accent mt-1">{exp.org}</p>
                <p className="text-xs text-muted mt-0.5">{exp.period}</p>
              </div>
              <p className="md:col-span-2 text-sm text-foreground/60 leading-relaxed">
                {exp.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
