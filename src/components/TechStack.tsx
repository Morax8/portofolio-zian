"use client";

import { motion } from "framer-motion";

const categories = [
  {
    label: "Languages",
    items: ["JavaScript / TypeScript", "PHP", "Python", "Java", "SQL", "HTML / CSS"],
  },
  {
    label: "Frameworks",
    items: ["Next.js", "React", "Laravel", "Express.js", "Tailwind CSS", "Bootstrap", "Flask"],
  },
  {
    label: "Tools",
    items: ["Git", "MySQL", "MongoDB", "Postman", "Figma", "Linux"],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const chip = {
  hidden: { scale: 0.95 },
  visible: { scale: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export default function TechStack() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border">
      <motion.h2
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-heading font-bold text-xs tracking-widest uppercase text-muted mb-10 flex items-center gap-3"
      >
        <span className="w-6 h-px bg-accent inline-block" />
        Tech Stack
      </motion.h2>

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.label} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-8">
            <p className="text-xs text-muted uppercase tracking-widest font-heading font-medium pt-1">
              {cat.label}
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className="md:col-span-3 flex flex-wrap gap-2"
            >
              {cat.items.map((item) => (
                <motion.span
                  key={item}
                  variants={chip}
                  whileHover={{ scale: 1.06 }}
                  className="border border-border px-3 py-1.5 text-sm font-heading font-medium text-foreground/70 rounded-sm cursor-default hover:border-accent hover:text-accent hover:bg-accent/5 transition-colors duration-200"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
