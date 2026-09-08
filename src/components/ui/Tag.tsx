import { cn } from "@/lib/utils";

/**
 * Monospace stack/tech pill with a sharp tactical frame.
 */
export function Tag({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "crimson";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border px-2 py-1 font-mono text-[11px] leading-none tracking-wide transition-colors",
        variant === "crimson"
          ? "border-crimson/30 bg-crimson/10 text-crimson"
          : "border-white/10 bg-white/[0.03] text-metal-grey hover:border-crimson/40 hover:text-bright",
        className,
      )}
    >
      {children}
    </span>
  );
}
