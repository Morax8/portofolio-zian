import { NAV_LINKS, PROFILE } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-rule bg-void">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 bg-crimson" />
              <span className="font-display text-sm font-bold text-bright">
                {PROFILE.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-metal-grey">
              Full-stack engineer & ML researcher. Building fast, shipping clean.
            </p>
          </div>

          {/* nav */}
          <nav className="flex flex-col gap-2 font-mono text-xs">
            <span className="mb-1 tracking-tactical text-metal-dim uppercase">
              Index
            </span>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-metal-grey transition-colors hover:text-crimson"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* location + meta */}
          <div className="font-mono text-xs">
            <span className="mb-3 block tracking-tactical text-metal-dim uppercase">
              Meta
            </span>
            <div className="space-y-2 text-metal-grey">
              <p>
                Based in{" "}
                <span className="text-bright">{PROFILE.location}</span>
              </p>
              <p className="text-metal-dim">
                Available for{" "}
                <span className="text-metal-grey">
                  freelance, contract, and full-time roles
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-rule pt-6 font-mono text-[11px] text-metal-dim sm:flex-row sm:items-center">
          <p>
            © {year} {PROFILE.name}. All rights reserved.
          </p>
          <p>
            Built with{" "}
            <span className="text-metal-grey">Next.js · Tailwind v4</span>
          </p>
        </div>
      </div>
    </footer>
  );
}