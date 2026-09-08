"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to hold before animating — use to stagger siblings. */
  delay?: number;
  as?: "div" | "li" | "span" | "figure" | "p";
  /** Travel distance in px. Keep it short; long throws read as decoration. */
  y?: number;
}

/**
 * Scroll-triggered fade/rise, and the only entrance animation on the site.
 *
 * Client component by necessity, but it only wraps its children — Server
 * Components passed in as `children` still render on the server, so using
 * this inside a Server Component does not pull that component's tree client-side.
 *
 * `delay` lives inside the variant transition on purpose: a variant's own
 * transition takes precedence over the `transition` prop, so a delay passed
 * that way would be discarded.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  y = 16,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: EASE },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
