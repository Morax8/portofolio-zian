"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, PROFILE } from "@/lib/data";

export function Footer() {
  const [ping, setPing] = useState(28);
  const year = new Date().getFullYear();

  // Simulated latency heartbeat — purely decorative "system online" flavor.
  useEffect(() => {
    const id = window.setInterval(() => {
      setPing(22 + Math.floor(Math.random() * 26));
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-crimson/15 bg-void">
      {/* top hairline glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute h-2.5 w-2.5 rounded-full bg-crimson animate-status-pulse" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-crimson" />
              </span>
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
            <span className="mb-1 tracking-widest text-metal-dim">
              // INDEX
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

          {/* system readout */}
          <div className="font-mono text-xs">
            <span className="mb-3 block tracking-widest text-metal-dim">
              // SYSTEM_STATUS
            </span>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-metal-grey">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-status-pulse" />
                SYS_ONLINE
              </p>
              <p className="text-metal-grey">
                latency:{" "}
                <span className="text-emerald-400">{ping}ms</span>{" "}
                <span className="text-metal-dim">· ping ok</span>
              </p>
              <p className="text-metal-grey">
                region: <span className="text-bright">{PROFILE.location}</span>
              </p>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 font-mono text-[11px] text-metal-dim sm:flex-row sm:items-center">
          <p>
            © {year} {PROFILE.name}. ALL_RIGHTS_RESERVED.
          </p>
          <p className="flex items-center gap-2">
            <span>BUILT_WITH</span>
            <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-white/10 bg-white/[0.03] px-2 py-1 text-metal-grey">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              Next.js 16 · Tailwind v4
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
