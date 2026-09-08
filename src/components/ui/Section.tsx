import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  /** grid → max-w-7xl (Hero/Projects/Tech) · narrative → max-w-6xl (Exp/About/Contact) */
  width?: "grid" | "narrative";
  className?: string;
  children: React.ReactNode;
}

/**
 * Global layout container. Encodes the spec's width + padding rules so
 * every section stays visually aligned.
 */
export function Section({
  id,
  width = "grid",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full px-6 py-16 md:px-12 md:py-24 lg:px-20",
        width === "grid" ? "max-w-7xl" : "max-w-6xl",
        // offset for the sticky navbar when anchor-scrolling
        id && "scroll-mt-24",
        className,
      )}
    >
      {children}
    </section>
  );
}
