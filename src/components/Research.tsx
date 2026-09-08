"use client";

import { motion, type Variants } from "framer-motion";
import { Brain, FlaskConical, type LucideIcon } from "lucide-react";
import { RESEARCH } from "@/lib/data";
import { Section } from "./ui/Section";
import { Tag } from "./ui/Tag";

const ICONS: LucideIcon[] = [FlaskConical, Brain];
const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const line: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
};

export function Research() {
  return (
    <Section width="grid" className="py-8 md:py-12">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="group/box relative overflow-hidden rounded-lg border border-crimson/25 bg-carbon/60 p-6 sm:p-8 md:p-10"
      >
        {/* header */}
        <motion.div
          variants={rise}
          className="relative z-10 flex items-center gap-3 text-xs"
        >
          <motion.span
            variants={line}
            style={{ transformOrigin: "left" }}
            className="h-px w-8 bg-crimson/40"
          />
          <span className="tracking-tactical text-metal-dim uppercase">
            Research & lab work
          </span>
        </motion.div>

        {/* items */}
        <div className="relative z-10 mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
          {RESEARCH.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.index}
                variants={rise}
                className="group relative flex flex-col transition-colors duration-300 md:border-l md:border-white/10 md:pl-8 md:hover:border-crimson/30 md:first:border-l-0 md:first:pl-0"
              >
                {/* hover wash */}
                <span className="pointer-events-none absolute -inset-3 rounded-lg bg-crimson/4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-crimson/30 bg-crimson/5 text-crimson transition-colors duration-300 group-hover:border-crimson group-hover:bg-crimson/15">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>

                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-metal-dim">
                      {item.index} · {item.org}
                    </p>
                    <h3 className="font-display text-lg font-bold text-bright transition-colors duration-300 group-hover:text-crimson">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="relative mt-4 text-sm leading-relaxed text-metal-grey">
                  {item.body}
                </p>

                <motion.div
                  className="relative mt-5 flex flex-wrap gap-1.5"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                  }}
                >
                  {item.tags.map((t) => (
                    <motion.span key={t} variants={rise}>
                      <Tag variant="crimson">{t}</Tag>
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
