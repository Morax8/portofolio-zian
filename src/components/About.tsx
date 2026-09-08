import { Boxes, Brain, Code, Database, type LucideIcon } from "lucide-react";
import { ABOUT_PARAGRAPHS, TECH_CARDS } from "@/lib/data";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

const ICONS: Record<string, LucideIcon> = {
  FRONTEND: Code,
  BACKEND_DB: Database,
  AI_DATASCI: Brain,
  INFRA_TOOLS: Boxes,
};

export function About() {
  return (
    <Section id="about" width="narrative">
      <SectionHeader
        index="01"
        eyebrow="OPERATOR_PROFILE"
        title="Full-stack engineering, applied ML."
        description="Between the browser and the model — I ship both."
      />

      {/* narrative */}
      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
        <Reveal className="border-l-2 border-crimson/40 pl-5">
          <p className="font-mono text-xs leading-relaxed text-metal-dim">
            {"// focus"}
          </p>
          <p className="mt-2 font-display text-lg font-medium leading-snug text-bright">
            Turning ambiguous ideas into production systems that hold up under
            load.
          </p>
        </Reveal>
        <div className="space-y-5">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-sm leading-relaxed text-metal-grey sm:text-base">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* tech stack grid */}
      <div className="mt-16">
        <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs">
          <span className="text-crimson">{"//"}</span>
          <span className="tracking-tactical text-metal-dim uppercase">
            Tech_Stack
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_CARDS.map((card, i) => {
            const Icon = ICONS[card.title];
            return (
              <Reveal key={card.index} delay={i * 0.07}>
                <article className="group relative h-full rounded-md border border-dashed border-zinc-800 bg-carbon/50 p-5 transition-all duration-300 hover:border-crimson/50 hover:bg-carbon">
      
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/40 text-crimson transition-colors group-hover:border-crimson/40">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[10px] text-metal-dim">
                      [{card.index}]
                    </span>
                  </div>

                  <h3 className="mt-4 font-mono text-sm font-semibold tracking-wide text-bright">
                    [{card.index}_{card.title}]
                  </h3>
                  <p className="mt-1 text-xs text-metal-dim">{card.caption}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {card.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
