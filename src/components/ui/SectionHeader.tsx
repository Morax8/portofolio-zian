import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  /** e.g. "03" */
  index: string;
  /** e.g. "SELECTED_WORK" */
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Editorial section header: monospace index + eyebrow above a display title.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="text-crimson">[{index}]</span>
        <span className="h-px w-8 bg-crimson/40" />
        <span className="tracking-tactical text-metal-dim uppercase">
          {eyebrow}
        </span>
      </div>
      <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-bright sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-sm leading-relaxed text-metal-grey sm:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
