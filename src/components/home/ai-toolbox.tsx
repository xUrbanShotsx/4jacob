"use client";

import {
  AlertTriangle,
  ClipboardCheck,
  CornerDownLeft,
  FileWarning,
  GraduationCap,
  IdCard,
  type LucideIcon,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Tone } from "@/components/graphs";
import { FadeUp, fadeUpItem, Stagger } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { cn, Kbd } from "@/components/ui";

type Demo = {
  /** Chip label when a capability offers more than one example. */
  label: string;
  heading: string;
  meta: string;
  items: string[];
  footerLabel: string;
};

type Capability = {
  name: string;
  body: string;
  icon: LucideIcon;
  tone: Tone;
  ctaLabel: string;
  demos: Demo[];
};

const CAPABILITIES: Capability[] = [
  {
    name: "Toolbox Talks",
    body: "Generate numbered speaker talking points from any WHS topic in seconds.",
    icon: MessageSquare,
    tone: "primary",
    ctaLabel: "Generate this toolbox talk",
    demos: [
      {
        label: "Working at Heights — EWP",
        heading: "TOOLBOX TALK — Working at Heights — EWP",
        meta: "Toolbox talk · Level 3, Site 01 · Safety Manager",
        items: [
          "Pre-use EWP inspection — check tyres, controls, safety cage and harness anchor points before commencing work.",
          "Exclusion zones — establish a 2 m perimeter around the EWP base. Spotter required at all times.",
          "Weather limits — cease operations if wind exceeds 45 km/h or lightning within 10 km.",
          "Emergency descent — demonstrate the manual lowering procedure before elevated work begins.",
          "Rescue plan — confirm rescue procedures are briefed and equipment is on standby.",
        ],
        footerLabel: "talk points generated",
      },
      {
        label: "Manual Handling",
        heading: "TOOLBOX TALK — Manual Handling",
        meta: "Toolbox talk · Site-wide · Crew leader",
        items: [
          "Plan the lift — check the load's weight, size and path before anyone picks it up.",
          "Use mechanical aids where you can — trolleys, hoists and team lifts beat a sore back.",
          "Keep loads close and lift with your legs, not your back.",
          "Take regular breaks on repetitive tasks — fatigue causes most manual handling injuries.",
          "Report awkward or heavy tasks so the job can be redesigned, not just repeated.",
        ],
        footerLabel: "talk points generated",
      },
      {
        label: "Confined Spaces",
        heading: "TOOLBOX TALK — Confined Spaces",
        meta: "Toolbox talk · Site 04 · Safety Manager",
        items: [
          "Permit required — no entry without a signed confined space permit on site.",
          "Test the atmosphere before entry and continuously while inside — oxygen, gas, vapour.",
          "A trained standby person stays at the entry point at all times.",
          "Know the rescue plan before you go in — don't rely on someone else knowing it.",
          "Isolate all energy sources feeding the space before work begins.",
        ],
        footerLabel: "talk points generated",
      },
    ],
  },
  {
    name: "SWMS Drafting",
    body: "Draft task descriptions and key hazards from the HRCW category automatically.",
    icon: FileWarning,
    tone: "danger",
    ctaLabel: "Generate this SWMS",
    demos: [
      {
        label: "Excavation Works",
        heading: "SWMS — Excavation Works (Trench > 1.5 m)",
        meta: "SWMS draft · HRCW: Excavation · Site 07",
        items: [
          "Task — excavate trench to 1.8 m depth using a 5-tonne excavator.",
          "Hazard — trench collapse: install shoring or battering to engineered spec before entry.",
          "Hazard — underground services: obtain a dial-before-you-dig clearance and hand-expose within 1 m of marked services.",
          "Hazard — falls into excavation: barricade and signpost the perimeter, ladder access every 9 m.",
          "Control — daily excavation inspection by a competent person, recorded before each shift.",
        ],
        footerLabel: "SWMS clauses drafted",
      },
    ],
  },
  {
    name: "Permit Controls",
    body: "Suggest safety controls based on permit type and work location.",
    icon: ClipboardCheck,
    tone: "info",
    ctaLabel: "Generate these controls",
    demos: [
      {
        label: "Hot Work Permit",
        heading: "PERMIT — Hot Work (Welding, Fabrication Bay)",
        meta: "Permit controls · Location: Level 2 workshop",
        items: [
          "Remove or shield combustible material within 10 m of the hot work area.",
          "Stage a fire extinguisher and fire blanket within reach before starting.",
          "Maintain a fire watch during work and for 30 minutes after completion.",
          "Gas test the atmosphere if working near flammable vapours or in a confined space.",
          "Permit signed off by the area supervisor before work begins.",
        ],
        footerLabel: "controls suggested",
      },
    ],
  },
  {
    name: "Incident Actions",
    body: "Recommend corrective actions from incident type and severity automatically.",
    icon: AlertTriangle,
    tone: "danger",
    ctaLabel: "Generate these actions",
    demos: [
      {
        label: "Dropped Tool — Near Miss",
        heading: "INCIDENT — Near Miss: Dropped Tool (Level 4)",
        meta: "Incident actions · Severity: Moderate · Site 02",
        items: [
          "Tool lanyards mandatory for all hand tools used above 2 m — effective immediately.",
          "Run a toolbox talk on dropped-object prevention for all trades on Level 4.",
          "Install debris netting on the affected scaffold bay.",
          "Review and reissue exclusion zone signage below active work areas.",
          "Follow-up inspection in 7 days to confirm controls are in place.",
        ],
        footerLabel: "corrective actions recommended",
      },
    ],
  },
  {
    name: "Course Outlines",
    body: "Build structured training content and learning objectives for any WHS topic.",
    icon: GraduationCap,
    tone: "success",
    ctaLabel: "Generate this outline",
    demos: [
      {
        label: "Working Safely at Heights",
        heading: "COURSE OUTLINE — Working Safely at Heights",
        meta: "Course outline · 4 hours · All site workers",
        items: [
          "Identify fall hazards and the hierarchy of fall controls on site.",
          "Correctly inspect and fit a full-body harness and lanyard.",
          "Explain exclusion zone and permit requirements for elevated work.",
          "Demonstrate emergency and rescue procedures for a suspended worker.",
          "Pass a practical assessment on EWP pre-start checks.",
        ],
        footerLabel: "learning objectives drafted",
      },
    ],
  },
  {
    name: "Licence Mapping",
    body: "Map required tickets and licences to a worker's role and site type instantly.",
    icon: IdCard,
    tone: "info",
    ctaLabel: "Generate this mapping",
    demos: [
      {
        label: "Scaffolder — Site 03",
        heading: "LICENCE MAP — Scaffolder, Site 03",
        meta: "Licence mapping · Role: Intermediate scaffolder",
        items: [
          "High Risk Work Licence — Scaffolding (Intermediate, class SI).",
          "White Card — general construction induction.",
          "Working at Heights — verification of competency.",
          "First Aid certificate — recommended for crew leads.",
          "Site-specific induction — renews every 12 months.",
        ],
        footerLabel: "licences mapped",
      },
    ],
  },
];

const TONE_ICON: Record<Tone, string> = {
  primary: "text-accent-text",
  success: "text-(--badge-green-text)",
  info: "text-(--badge-blue-text)",
  danger: "text-destructive-text",
};

const TONE_DOT: Record<Tone, string> = {
  primary: "bg-accent-text",
  success: "bg-(--badge-green-text)",
  info: "bg-(--badge-blue-text)",
  danger: "bg-destructive-text",
};

const TONE_BORDER: Record<Tone, string> = {
  primary: "border-accent-text",
  success: "border-(--badge-green-text)",
  info: "border-(--badge-blue-text)",
  danger: "border-destructive-text",
};

const TONE_GLOW: Record<Tone, string> = {
  primary: "hover:border-accent-text hover:shadow-[0_10px_32px_-14px_var(--accent-text)]",
  success:
    "hover:border-(--badge-green-text) hover:shadow-[0_10px_32px_-14px_var(--badge-green-text)]",
  info: "hover:border-(--badge-blue-text) hover:shadow-[0_10px_32px_-14px_var(--badge-blue-text)]",
  danger: "hover:border-destructive-text hover:shadow-[0_10px_32px_-14px_var(--destructive-text)]",
};

/**
 * The interactive centrepiece: pick a capability on the right (or a topic
 * chip when one offers a few), hit Generate — or press Enter — and watch the
 * example write itself out. A demo a builder can actually drive, not a
 * screenshot of a command they'd never type.
 */
function ToolboxDemo({
  capability,
  demoIndex,
  onSelectDemo,
}: {
  capability: Capability;
  demoIndex: number;
  onSelectDemo: (i: number) => void;
}) {
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");
  const [visibleCount, setVisibleCount] = useState(0);
  const demo = capability.demos[demoIndex];

  useEffect(() => {
    if (status !== "generating") return;
    if (visibleCount >= demo.items.length) {
      setStatus("done");
      return;
    }
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 450);
    return () => clearTimeout(t);
  }, [status, visibleCount, demo.items.length]);

  const generate = () => {
    setVisibleCount(0);
    setStatus("generating");
  };

  return (
    <div className="flex w-full flex-col overflow-hidden border border-border bg-bg">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-border border-b bg-bg-secondary px-4 py-3">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-3 flex items-center gap-1.5 font-mono text-[0.65rem] text-text-tertiary">
          <Sparkles className="size-3 text-accent-text" /> AI toolbox — {capability.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {capability.demos.length > 1 && (
          <>
            <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
              Pick a topic
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {capability.demos.map((d, i) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => onSelectDemo(i)}
                  className={cn(
                    "border px-3 py-1.5 text-[13px] transition-colors",
                    i === demoIndex
                      ? "border-accent-text bg-accent-bg text-text"
                      : "border-border text-text-secondary hover:border-border-hover hover:text-text",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          type="button"
          onClick={generate}
          disabled={status === "generating"}
          className={cn(
            "flex items-center justify-between gap-3 border border-border-strong bg-bg-secondary px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60",
            capability.demos.length > 1 ? "mt-4" : "mt-0",
            TONE_GLOW[capability.tone],
          )}
        >
          <span className="text-[13px] text-text">
            {status === "generating" ? "Generating…" : capability.ctaLabel}
          </span>
          <Kbd className="hidden shrink-0 items-center gap-1 sm:inline-flex">
            <CornerDownLeft className="size-2.5" /> Enter
          </Kbd>
        </button>

        <div className="mt-5 flex-1 font-mono text-[12.5px] leading-relaxed">
          <AnimatePresence mode="wait">
            {status === "idle" ? (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-text-muted"
              >
                {capability.demos.length > 1
                  ? "Choose a topic above, then generate"
                  : "Hit generate"}{" "}
                — Briesa drafts it in seconds, ready to attach to your record.
              </motion.p>
            ) : (
              <motion.div
                key={`${capability.name}-${demo.label}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-text">{demo.heading}</p>
                <p className="mt-1 text-[11px] text-text-tertiary">{demo.meta}</p>

                <ol className="mt-3 space-y-1.5">
                  {demo.items.slice(0, visibleCount || demo.items.length).map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2 text-text-secondary"
                    >
                      <span className={cn("shrink-0 tabular-nums", TONE_ICON[capability.tone])}>
                        {i + 1}.
                      </span>
                      <span className="text-balance">{item}</span>
                    </motion.li>
                  ))}
                  {status === "generating" && (
                    <li className="flex items-center gap-1 pt-1 text-text-tertiary">
                      <span className="size-1 animate-bounce rounded-full bg-text-tertiary [animation-delay:0ms]" />
                      <span className="size-1 animate-bounce rounded-full bg-text-tertiary [animation-delay:150ms]" />
                      <span className="size-1 animate-bounce rounded-full bg-text-tertiary [animation-delay:300ms]" />
                    </li>
                  )}
                </ol>

                {status === "done" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 flex flex-wrap items-center justify-between gap-2 border-border border-t pt-3"
                  >
                    <p className="text-(--badge-green-text)">
                      → {demo.items.length} {demo.footerLabel}
                    </p>
                    <button
                      type="button"
                      onClick={generate}
                      className="font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider underline-offset-2 transition-colors hover:text-text hover:underline"
                    >
                      Regenerate
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function AiToolbox() {
  const [capabilityIndex, setCapabilityIndex] = useState(0);
  const [demoIndex, setDemoIndex] = useState(0);
  const capability = CAPABILITIES[capabilityIndex];

  const selectCapability = (i: number) => {
    setCapabilityIndex(i);
    setDemoIndex(0);
  };

  return (
    <section className="section-padding">
      <div className="web-container">
        <SectionHeading
          align="center"
          eyebrow="AI toolbox"
          title="The paperwork, drafted before you start"
          lede="Briesa's AI turns a topic, a permit or an incident into audit-ready content — so the field crew spends minutes on documentation, not hours. Click a capability, then generate."
        />

        <div className="mt-14 grid items-stretch gap-px border border-border bg-border shadow-black/5 shadow-xl lg:grid-cols-2 dark:shadow-black/20">
          <FadeUp className="flex bg-bg p-6 sm:p-8">
            <ToolboxDemo
              key={`${capability.name}-${demoIndex}`}
              capability={capability}
              demoIndex={demoIndex}
              onSelectDemo={setDemoIndex}
            />
          </FadeUp>

          <Stagger
            className="grid gap-px self-stretch bg-border sm:grid-cols-2"
            stagger={0.07}
            amount={0.2}
          >
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              const isSelected = i === capabilityIndex;
              return (
                <motion.div
                  key={c.name}
                  variants={fadeUpItem}
                  onClick={() => selectCapability(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectCapability(i);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  className={cn(
                    "group flex cursor-pointer flex-col gap-2.5 border bg-bg p-6 text-left transition-all duration-300",
                    isSelected ? TONE_BORDER[c.tone] : "border-transparent",
                    TONE_GLOW[c.tone],
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-[0.65rem] text-text-tertiary tabular-nums">
                      <Icon
                        className={cn(
                          "size-3.5 transition-transform duration-300 group-hover:scale-110",
                          TONE_ICON[c.tone],
                        )}
                      />
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] text-text-secondary uppercase tracking-wider">
                        <span className={cn("size-1.5 rounded-full", TONE_DOT[c.tone])} />
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-[15px] tracking-tight">{c.name}</h3>
                  <p className="text-[13px] text-text-tertiary leading-relaxed">{c.body}</p>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
