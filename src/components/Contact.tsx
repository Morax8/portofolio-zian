"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
    </svg>
  );
}

type MagneticProps = {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
};

function MagneticLink({
  href,
  target,
  rel,
  children,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

const links = [
  {
    href: "https://github.com/Morax8",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: <GithubIcon size={16} />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/aditya-zianur",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: <LinkedinIcon size={16} />,
    label: "LinkedIn",
  },
  {
    href: "mailto:adityazianurrahm@gmail.com",
    icon: <Mail size={16} />,
    label: "Email",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-border"
    >
      <motion.h2
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-heading font-bold text-xs tracking-widest uppercase text-muted mb-12 flex items-center gap-3"
      >
        <span className="w-6 h-px bg-accent inline-block" />
        Contact
      </motion.h2>

      <motion.p
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-foreground/60 text-sm leading-relaxed max-w-md mb-8"
      >
        Open to internship opportunities, project collaborations, and anything
        that involves building or breaking web systems. Don&apos;t hesitate to
        reach out.
      </motion.p>

      <motion.div
        initial={{ y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-4"
      >
        {links.map((link) => (
          <MagneticLink
            key={link.label}
            href={link.href}
            target={link.target}
            rel={link.rel}
            className="flex items-center gap-2.5 border border-border px-5 py-2.5 text-sm text-foreground/70 rounded-sm hover:border-accent hover:text-accent hover:bg-accent/5 transition-colors duration-200"
          >
            {link.icon}
            {link.label}
          </MagneticLink>
        ))}
      </motion.div>
    </section>
  );
}

