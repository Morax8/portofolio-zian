"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Check, Copy, Mail, MapPin, Send } from "lucide-react";
import { PROFILE, SOCIALS } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { cn } from "@/lib/utils";

const SOCIAL_ICON = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

type SubmitState = "idle" | "sending" | "sent";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitState>("idle");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fireToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      fireToast("EMAIL_ADDRESS_COPIED");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      fireToast("COPY_FAILED — SELECT MANUALLY");
    }
  };

  const mailtoFallback = () => {
    fireToast("OPENING_MAIL_CLIENT…");
    const subject = encodeURIComponent(`Portfolio contact — ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`,
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (res.ok) {
        setStatus("sent");
        fireToast("MESSAGE_TRANSMITTED");
        window.setTimeout(() => {
          setStatus("idle");
          setForm({ name: "", email: "", message: "" });
        }, 2000);
        return;
      }
      // Server/config problem → hand off to the user's mail client.
      if (res.status >= 500 || res.status === 503) {
        mailtoFallback();
        return;
      }
      // Validation error → surface it and let the user fix the input.
      setStatus("idle");
      fireToast(data.error ?? "TRANSMISSION_FAILED");
    } catch {
      // Network failure → mail client fallback.
      mailtoFallback();
    }
  };

  return (
    <Section id="contact" width="narrative">
      <SectionHeader
        index="04"
        eyebrow="OPEN_CHANNEL"
        title="Let's build something."
        description="Have a project, a role, or a research idea? Send a transmission — I read every message."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid gap-6 lg:grid-cols-2"
      >
        {/* LEFT — form */}
        <motion.form
          variants={rise}
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-carbon/60 p-6 transition-colors duration-300 focus-within:border-crimson/30 sm:p-7"
        >

          <div className="relative">
            <div className="mb-6 flex items-center gap-3 font-mono text-xs">
              <span className="text-crimson">{"//"}</span>
              <span className="tracking-tactical text-metal-dim uppercase">
                Transmission_Form
              </span>
            </div>

            <div className="space-y-5">
              <Field
                label="NAME"
                id="name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Your name"
                required
              />
              <Field
                label="EMAIL"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                placeholder="you@domain.com"
                required
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-[11px] tracking-widest text-metal-dim"
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="What are we building?"
                  className="w-full resize-none rounded-md border border-white/10 bg-black/40 px-3.5 py-3 text-sm text-bright placeholder:text-metal-dim/70 transition-all duration-300 focus:border-crimson/60 focus:outline-none"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.98 }}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-crimson px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-crimson-red disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Transmitting…
                </>
              ) : status === "sent" ? (
                <>
                  <Check className="h-4 w-4" />
                  Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  Send Transmission
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* RIGHT — direct contact + socials */}
        <motion.div variants={container} className="flex flex-col gap-6">
          {/* direct card */}
          <motion.div
            variants={rise}
            className="relative overflow-hidden rounded-lg border border-crimson/20 bg-carbon/70 p-6 sm:p-7"
          >

            <div className="relative">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-metal-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-status-pulse" />
                DIRECT_LINE
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-bright">
                Reach me directly
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-metal-grey">
                Fastest response is over email. Copy the address or use the
                transmission form.
              </p>

              {/* copy widget */}
              <div className="mt-5 flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/40 px-3.5 py-3">
                <span className="truncate font-mono text-sm text-bright">
                  {PROFILE.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy email address"
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors",
                    copied
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                      : "border-crimson/30 bg-crimson/5 text-crimson hover:bg-crimson/15",
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-metal-dim">
                <MapPin className="h-3.5 w-3.5 text-crimson/70" />
                {PROFILE.location}
              </p>
            </div>
          </motion.div>

          {/* socials */}
          <motion.div variants={container} className="grid gap-3">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICON[s.icon];
              return (
                <motion.a
                  key={s.label}
                  variants={rise}
                  href={s.href}
                  target={s.icon === "mail" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-md border border-white/10 bg-carbon/50 px-4 py-3.5 transition-all duration-300 hover:border-crimson/40 hover:bg-carbon"
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-black/40 text-metal-grey transition-all duration-300 group-hover:scale-110 group-hover:border-crimson/40 group-hover:text-crimson">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] tracking-widest text-metal-dim">
                        {s.label.toUpperCase()}
                      </span>
                      <span className="block text-sm text-bright">
                        {s.handle}
                      </span>
                    </span>
                  </span>
                  <span className="font-mono text-metal-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-crimson">
                    ↗
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0"
          >
            <div className="flex items-center gap-2.5 rounded-md border border-crimson/30 bg-carbon px-4 py-3 font-mono text-xs text-bright">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-status-pulse" />
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] tracking-widest text-metal-dim"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-white/10 bg-black/40 px-3.5 py-3 text-sm text-bright placeholder:text-metal-dim/70 transition-all duration-300 focus:border-crimson/60 focus:outline-none"
      />
    </div>
  );
}
