import type { Tone } from "@/components/graphs";
import { cn } from "@/components/ui";

const STANDARDS: { name: string; tone: Tone }[] = [
  { name: "ISO 45001", tone: "primary" },
  { name: "ISO 14001", tone: "success" },
  { name: "ISO 9001", tone: "info" },
  { name: "WHS Act 2011", tone: "primary" },
  { name: "Model WHS Regulations", tone: "primary" },
  { name: "SafeWork NSW", tone: "primary" },
  { name: "Privacy Act 1988", tone: "info" },
  { name: "Australian Privacy Principles", tone: "info" },
];

const TONE_HOVER_TEXT: Record<Tone, string> = {
  primary: "hover:text-accent-text",
  success: "hover:text-(--badge-green-text)",
  info: "hover:text-(--badge-blue-text)",
  danger: "hover:text-destructive-text",
};

/** Marquee of the standards & frameworks Briesa is built around (buildpass-style
    trust strip, adapted for a pre-revenue product). Pauses on hover so a reader
    can pick out — and hover into — the individual framework they care about. */
export function TrustStrip() {
  return (
    <section className="border-border border-y bg-bg-secondary py-10">
      <p className="web-container mb-7 text-center font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
        Built around the standards Australian auditors test
      </p>
      <div className="group relative flex overflow-hidden [--duration:34s] [--gap:3.5rem] [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 animate-marquee items-center gap-[var(--gap)] pr-[var(--gap)] group-hover:[animation-play-state:paused]"
          >
            {STANDARDS.map((s) => (
              <span
                key={s.name}
                className={cn(
                  "whitespace-nowrap font-medium text-lg text-text-tertiary tracking-tight transition-colors duration-200 md:text-xl",
                  TONE_HOVER_TEXT[s.tone],
                )}
              >
                {s.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
