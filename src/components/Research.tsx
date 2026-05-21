"use client";

import { motion } from "framer-motion";

export default function Research() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border">
      <motion.h2
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-heading font-bold text-xs tracking-widest uppercase text-muted mb-12 flex items-center gap-3"
      >
        <span className="w-6 h-px bg-accent inline-block" />
        Research
      </motion.h2>

      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="border border-border bg-surface rounded-xl p-6 max-w-2xl"
      >
        <p className="text-xs text-accent uppercase tracking-widest mb-3 font-heading font-medium">
          Working Paper
        </p>
        <h3 className="font-heading font-bold text-foreground text-base leading-snug">
          Supply Chain Attacks in Open-Source Software Ecosystems
        </h3>
        <p className="text-sm text-foreground/55 leading-relaxed mt-3">
          Investigation into attack vectors, case studies, and mitigation
          strategies for software supply chain vulnerabilities within open-source
          dependency networks.
        </p>
      </motion.div>
    </section>
  );
}
