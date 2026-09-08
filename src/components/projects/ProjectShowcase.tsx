"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

const AUTOPLAY_MS = 4500;
const SWIPE_PX = 50;
const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Plate for a project inside the detail modal. When `project.screenshots`
 * exist they render as a paginated carousel — one capture at a time with
 * prev/next arrows, dots, keyboard + swipe, and an auto-advancing slideshow
 * that pauses on hover or on demand. Otherwise a typographic plate built
 * from the project's own index stands in.
 */
export function ProjectShowcase({
  project,
  order = 1,
  className,
}: {
  project: Project;
  order?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const host = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  const shots = project.screenshots ?? [];
  const count = shots.length;
  const hasShots = count > 0;
  const showCtrls = count > 1;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const paginate = useCallback(
    (d: number) => {
      setDirection(d);
      setIndex((i) => (i + d + count) % count);
    },
    [count],
  );

  const goTo = (n: number) => {
    if (n === index) return;
    setDirection(n > index ? 1 : -1);
    setIndex(n);
  };

  const playing = hasShots && showCtrls && !reduce && !userPaused && !hovering;

  // Auto-advance. The timer resets on every navigation / pause because
  // `index` and `playing` are dependencies.
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => paginate(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, index, paginate]);

  // Arrow-key navigation while the modal is open.
  useEffect(() => {
    if (!showCtrls) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showCtrls, paginate]);

  const slide = reduce ? 0 : 64;
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? slide : -slide, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -slide : slide, opacity: 0 }),
  };

  /* ---------- no screenshots: typographic index plate ---------- */
  if (!hasShots) {
    return (
      <figure className={cn("w-full", className)}>
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md border border-rule bg-carbon">
          <span
            aria-hidden
            className="font-display text-[7rem] leading-none font-bold text-white/6 sm:text-[9rem]"
          >
            {pad(order)}
          </span>
        </div>
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-3 font-mono text-[11px] tracking-tactical text-metal-dim uppercase">
          <span className="truncate">{project.title}</span>
          {host && <span className="shrink-0 normal-case">{host}</span>}
        </figcaption>
      </figure>
    );
  }

  // Container ratio is pinned to the first capture so the stage never
  // resizes mid-transition (all shots in a project share the same ratio).
  const stage = shots[0];
  const active = shots[index];

  /* ---------- paginated carousel ---------- */
  return (
    <figure className={cn("w-full", className)}>
      {showCtrls && (
        <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-tactical text-metal-dim uppercase">
          <span>Screenshots</span>
          <span className="flex items-center gap-3">
            {!reduce && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="text-metal-dim transition-colors hover:text-crimson"
              >
                {playing ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
              </button>
            )}
            <span className="tabular-nums text-metal-dim/80">
              {pad(index + 1)} / {pad(count)}
            </span>
          </span>
        </div>
      )}

      <div
        className="relative overflow-hidden rounded-md border border-rule bg-carbon select-none"
        style={{ aspectRatio: `${stage.width} / ${stage.height}` }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > SWIPE_PX) paginate(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className="absolute inset-0"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
          >
            <Image
              src={active.src}
              alt={`${project.title} screenshot ${index + 1}`}
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {showCtrls && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous screenshot"
              className="absolute top-1/2 left-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/10 bg-black/50 text-bright backdrop-blur-sm transition-colors hover:border-crimson/50 hover:text-crimson"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next screenshot"
              className="absolute top-1/2 right-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/10 bg-black/50 text-bright backdrop-blur-sm transition-colors hover:border-crimson/50 hover:text-crimson"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {showCtrls && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to screenshot ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-crimson"
                  : "w-1.5 bg-white/15 hover:bg-white/30",
              )}
            />
          ))}
        </div>
      )}

      <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-3 font-mono text-[11px] tracking-tactical text-metal-dim uppercase">
        <span className="truncate">{project.title}</span>
        {host && <span className="shrink-0 normal-case">{host}</span>}
      </figcaption>
    </figure>
  );
}
