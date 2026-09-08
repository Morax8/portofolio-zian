"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: whichever section owns the upper third of the viewport wins.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.href.slice(1)),
    ).filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActiveId(top.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.6, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-rule bg-void/90 backdrop-blur-md"
          : "border-transparent bg-void/40 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Wordmark */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 bg-crimson" />
          <span className="font-display text-sm font-bold tracking-tight text-bright">
            {PROFILE.name}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  isActive
                    ? "text-bright"
                    : "text-metal-grey hover:text-bright",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-crimson"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
              </a>
            );
          })}
          <a
            href={PROFILE.resumeHref}
            className="inline-flex items-center gap-2 rounded-md border border-rule-strong px-3.5 py-2 text-sm text-bright transition-colors hover:border-bright"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            Résumé
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-bright md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-rule bg-void/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-rule py-4 text-base text-metal-grey transition-colors hover:text-bright"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={PROFILE.resumeHref}
                onClick={() => setOpen(false)}
                className="mt-4 mb-2 inline-flex items-center justify-center gap-2 rounded-md border border-rule-strong px-3.5 py-3 text-sm text-bright"
              >
                <Download className="h-4 w-4" />
                Résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
