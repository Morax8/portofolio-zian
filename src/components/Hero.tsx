"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "7+", label: "Roles" },
  { value: "8+", label: "Projects" },
  { value: "3+", label: "Orgs" },
];

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-32 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-start">

        {/* Left — text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs text-accent tracking-widest uppercase font-heading font-medium mb-5"
          >
            Informatika UMN · Class of 2028
          </motion.p>

          {/* Name + mobile photo side by side */}
          <div className="flex items-start gap-5 md:block mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold uppercase text-foreground leading-none tracking-tight text-6xl md:text-8xl flex-1"
            >
              Aditya
              <br />
              Zianur
            </motion.h1>

            {/* Mobile-only photo — sits beside the name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden relative w-28 shrink-0 aspect-4/5 rounded-xl border-2 border-accent overflow-hidden shadow-[0_0_24px_rgba(222,255,154,0.14)] bg-zinc-800"
            >
              <Image
                src="/foto/hero.png"
                alt="Aditya Zianur"
                fill
                className="object-cover object-top"
                sizes="112px"
                priority
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base md:text-lg text-foreground/70 max-w-md leading-relaxed mb-3"
          >
            I build fast, ship clean, and break things — on purpose.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-sm text-muted mb-8"
          >
            Head of R&D Division @ HMIF XVI UMN · Lab Supervisor
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <a
              href="#projects"
              className="bg-accent text-accent-fg font-heading font-bold text-sm px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="border border-border text-foreground/60 text-sm px-5 py-2.5 rounded-sm hover:border-accent hover:text-accent transition-colors"
            >
              Get in touch
            </a>
            <a
              href="/AdityaZianur_Resume.pdf"
              download
              className="border border-border text-foreground/60 text-sm px-5 py-2.5 rounded-sm hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex gap-10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading font-bold text-2xl text-accent">{s.value}</p>
                <p className="text-xs text-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop-only large photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden md:block relative w-72 aspect-4/5 rounded-2xl border-2 border-accent overflow-hidden shadow-[0_0_48px_rgba(222,255,154,0.14)] bg-zinc-800"
        >
          <Image
            src="/foto/hero.png"
            alt="Aditya Zianur"
            fill
            className="object-cover object-top"
            sizes="288px"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
