"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import {
  EXPERIENCES,
  type ExperienceCategory,
  type ExperienceItem,
} from "@/lib/data";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Tag } from "./ui/Tag";
import { cn } from "@/lib/utils";

type Filter = "ALL" | ExperienceCategory;
const FILTERS: Filter[] = ["ALL", "LEADERSHIP", "DEVELOPMENT", "LAB & SECURITY"];
const FILTER_LABELS: Record<Filter, string> = {
  ALL: "All",
  LEADERSHIP: "Leadership",
  DEVELOPMENT: "Development",
  "LAB & SECURITY": "Lab & security",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---- automatic reverse-chronological ordering -------------------------
   Parses the free-text `period` (e.g. "May 2025 – Nov 2025", "Nov 2025 –
   Present") so the timeline always renders newest-first, regardless of the
   order roles are authored in data.ts. Add/edit an item and it re-sorts. */
const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];
const PRESENT_KEY = 10_000 * 12; // sentinel: ongoing roles sort as "latest"

function monthKey(token: string): number {
  const m = token.trim().toLowerCase().match(/([a-z]{3})[a-z]*\s+(\d{4})/);
  if (!m) return 0;
  const month = MONTHS.indexOf(m[1]);
  const year = Number(m[2]);
  return month < 0 || !year ? 0 : year * 12 + month;
}

function periodKeys(period: string): { start: number; end: number } {
  const [rawStart = "", rawEnd = ""] = period.split(/[–—-]/);
  const start = monthKey(rawStart);
  const end = /present|current|now|ongoing/i.test(rawEnd)
    ? PRESENT_KEY
    : monthKey(rawEnd);
  return { start, end: end || start };
}

/** Newest first — by end date, then start date (both descending). */
function byRecency(a: ExperienceItem, b: ExperienceItem): number {
  const ka = periodKeys(a.period);
  const kb = periodKeys(b.period);
  return kb.end - ka.end || kb.start - ka.start;
}

// Sorted + numbered once at module load; [EXP_0N] reflects chronological rank.
const ORDERED = [...EXPERIENCES]
  .sort(byRecency)
  .map((exp, i) => ({ exp, order: i + 1 }));

export function ExperienceTimeline() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visible = ORDERED.filter(
    ({ exp }) => filter === "ALL" || exp.categories.includes(filter),
  );

  const countFor = (f: Filter) =>
    f === "ALL"
      ? EXPERIENCES.length
      : EXPERIENCES.filter((e) => e.categories.includes(f)).length;

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setExpandedId(null); // avoid a stray-open card lingering across filters
  };

  return (
    <Section id="experience" width="narrative">
      <SectionHeader
        index="02"
        eyebrow="Experience"
        title="Leadership & engineering timeline."
        description="Filter by track, then click any role to expand the full case log — achievements, impact, and live deliverables."
      />

      {/* filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => changeFilter(f)}
              aria-pressed={active}
              className={cn(
                "group inline-flex cursor-pointer items-center gap-2 rounded-[2px] border px-3 py-2 text-xs transition-colors duration-200",
                active
                  ? "border-crimson bg-crimson/15 text-crimson"
                  : "border-white/10 bg-carbon/50 text-metal-grey hover:border-crimson/40 hover:text-bright",
              )}
            >
              <span>{FILTER_LABELS[f]}</span>
              <span
                className={cn(
                  "rounded-[2px] px-1.5 py-0.5 font-mono text-[10px] transition-colors",
                  active
                    ? "bg-crimson/20 text-crimson"
                    : "bg-white/5 text-metal-dim",
                )}
              >
                {String(countFor(f)).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* timeline */}
      <div className="relative mt-12">
        {/* central spine */}
        <div className="absolute bottom-0 left-4 top-0 w-px md:left-1/2 md:-translate-x-1/2">
          <div className="h-full w-full bg-linear-to-b from-transparent via-crimson/40 to-transparent" />
        </div>

        <ul className="space-y-6 md:space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map(({ exp, order }, i) => (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                order={order}
                isLeft={i % 2 === 0}
                expanded={expandedId === exp.id}
                onToggle={() =>
                  setExpandedId((cur) => (cur === exp.id ? null : exp.id))
                }
                hovered={hoveredId === exp.id}
                onHover={setHoveredId}
              />
            ))}
          </AnimatePresence>
        </ul>

        {/* empty-state guard (defensive; every filter currently has items) */}
        {visible.length === 0 && (
          <p className="py-10 text-center text-xs text-metal-dim">
            No records in this track.
          </p>
        )}
      </div>
    </Section>
  );
}

function ExperienceRow({
  exp,
  order,
  isLeft,
  expanded,
  onToggle,
  hovered,
  onHover,
}: {
  exp: ExperienceItem;
  order: number;
  isLeft: boolean;
  expanded: boolean;
  onToggle: () => void;
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const active = exp.current === true;
  const panelId = `exp-panel-${exp.id}`;
  const lit = hovered || active;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: EASE, layout: { duration: 0.45, ease: EASE } }}
      className="relative grid grid-cols-1 md:grid-cols-2"
    >
      {/* spine node — lights up on hover / active */}
      <div className="pointer-events-none absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
        <div className="relative">
          <span
            className={cn(
              "relative flex h-4 w-4 rotate-45 items-center justify-center border bg-void transition-colors duration-300",
              hovered
                ? "border-crimson"
                : active
                  ? "border-crimson"
                  : "border-crimson/30",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 transition-colors",
                lit ? "bg-crimson" : "bg-crimson/40",
              )}
            />
          </span>
        </div>
      </div>

      {/* card slot — alternates sides on desktop, animates on filter */}
      <motion.div
        layout
        className={cn(
          "pl-12 md:pl-0",
          isLeft ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12",
        )}
      >
        <article
          onMouseEnter={() => onHover(exp.id)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            "group relative overflow-hidden rounded-lg bg-carbon/70 transition-colors duration-300",
            expanded
              ? "border border-crimson/50"
              : "border border-dashed border-zinc-800 hover:border-crimson/40",
          )}
        >
          {/* crimson top-line highlight */}
          <span
            className={cn(
              "absolute left-0 top-0 z-10 h-px w-full origin-left bg-linear-to-r from-crimson to-transparent transition-transform duration-500",
              expanded ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
            )}
          />

          {/* collapsed header — click target toggles the accordion */}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="flex w-full cursor-pointer flex-col gap-3 p-5 text-left sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-metal-dim">
                {String(order).padStart(2, "0")} · {exp.org}
              </span>
              {active ? (
                <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-crimson/40 bg-crimson/10 px-2 py-0.5 text-[10px] tracking-wide text-crimson">
                  Current
                </span>
              ) : null}
            </div>

            <div>
              <h3 className="font-display text-lg font-bold leading-tight text-bright transition-colors group-hover:text-crimson sm:text-xl">
                {exp.role}
              </h3>

              {/* org badge · date chip · category */}
              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-crimson/25 bg-crimson/5 px-2 py-1 text-crimson">
                  <Building2 className="h-3 w-3" />
                  {exp.org}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-white/10 bg-white/[0.03] px-2 py-1 text-metal-grey">
                  <Calendar className="h-3 w-3 text-crimson/70" />
                  {exp.period}
                </span>
                {exp.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-[3px] border border-white/10 bg-white/[0.03] px-2 py-1 text-metal-dim"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* short summary */}
            <p className="text-sm leading-relaxed text-metal-grey">
              {exp.summary}
            </p>

            {/* primary tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {exp.tags.slice(0, 4).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            {/* expand indicator */}
            <div className="mt-1 flex items-center gap-1.5 text-[10px] tracking-wide text-metal-dim transition-colors group-hover:text-crimson">
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  expanded && "rotate-180",
                )}
              />
              {expanded ? "Hide details" : "View details"}
            </div>
          </button>

          {/* expanded detail panel */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="panel"
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="border-t border-crimson/15 px-5 pb-6 pt-4 sm:px-6">
                  {/* responsibilities */}
                  <h4 className="text-[10px] tracking-widest text-metal-dim uppercase">
                    Responsibilities
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-metal-grey">
                    {exp.desc}
                  </p>

                  {/* achievements */}
                  <h4 className="mt-5 text-[10px] tracking-widest text-metal-dim uppercase">
                    Key achievements
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm leading-relaxed text-metal-grey"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-crimson/70" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* technical impact */}
                  {exp.impact && (
                    <div className="mt-5 rounded-md border border-crimson/20 bg-crimson/5 p-3">
                      <p className="text-[10px] tracking-widest text-crimson uppercase">
                        Technical impact
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-bright/90">
                        {exp.impact}
                      </p>
                    </div>
                  )}

                  {/* full stack */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <Tag key={t} variant="crimson">
                        {t}
                      </Tag>
                    ))}
                  </div>

                  {/* direct project link */}
                  {exp.liveUrl && (
                    <a
                      href={exp.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn mt-5 inline-flex items-center gap-2 rounded-md border border-crimson/40 bg-crimson/10 px-4 py-2.5 text-xs text-crimson transition-all hover:bg-crimson hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Visit project
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </motion.div>
    </motion.li>
  );
}
