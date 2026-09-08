import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PROFILE, STATS } from "@/lib/data";
import { Reveal } from "./ui/Reveal";

/**
 * Swiss-grid hero. Stays a Server Component — <Reveal> is the only client
 * boundary, and it wraps server-rendered children rather than pulling this
 * tree client-side.
 */
export function Hero() {
  return (
    <section id="top" className="border-b border-rule">
      <div className="mx-auto w-full max-w-7xl px-6 pt-24 md:px-12 md:pt-28 lg:px-20">
        {/* masthead rule — real metadata, not telemetry */}
        <div className="flex items-baseline justify-between border-b border-rule pb-4 font-mono text-[11px] tracking-tactical text-metal-dim uppercase">
          <span>Portfolio — Vol. 2026</span>
          <span>{PROFILE.location}</span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 pt-14 lg:grid-cols-12 lg:pt-20">
          {/* ── statement, cols 1–7 ── */}
          <div className="lg:col-span-7">
            <Reveal as="div">
              <h1 className="font-display text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.85] font-bold tracking-display text-bright">
                ADITYA
                <br />
                <span className="text-crimson">ZIANUR</span>
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-10 max-w-2xl font-display text-2xl leading-[1.2] font-medium text-bright md:text-3xl">
                {PROFILE.headline}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-metal-grey">
                {PROFILE.lede}
              </p>
            </Reveal>

            <Reveal
              delay={0.24}
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-red"
              >
                View work
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-md border border-rule-strong px-5 py-3 text-sm font-semibold text-bright transition-colors hover:border-bright"
              >
                Get in touch
              </a>
              <a
                href={PROFILE.resumeHref}
                className="ml-1 inline-flex items-center border-b border-rule-strong pb-0.5 font-mono text-xs text-metal-grey transition-colors hover:border-crimson hover:text-crimson"
              >
                Résumé (PDF)
              </a>
            </Reveal>
          </div>

          {/* ── portrait, cols 9–12 ── */}
          <Reveal
            as="figure"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden border border-rule bg-carbon">
              <Image
                src={PROFILE.photo}
                alt="Aditya Zianur"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-3 border-t border-rule pt-3 font-mono text-[11px] tracking-tactical text-metal-dim uppercase">
              {PROFILE.currentPost}
            </figcaption>
          </Reveal>
        </div>

        {/* ── data row ── */}
        <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-rule py-8 sm:grid-cols-4 sm:gap-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <dt className="font-mono text-[11px] tracking-tactical text-metal-dim uppercase">
                {stat.label}
              </dt>
              <dd className="mt-2 font-display text-4xl font-bold tracking-display text-bright">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
