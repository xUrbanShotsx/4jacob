"use client";

import { motion } from "motion/react";
import { NumberTicker } from "@/components/number-ticker";
import { cn } from "@/components/ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Semantic tone → design-token color. Never decorative: each tone reports a
    real status (brand emphasis, success, informational, risk). */
export type Tone = "primary" | "success" | "info" | "danger";

const TONE_STROKE: Record<Tone, string> = {
  primary: "stroke-accent-text",
  success: "stroke-(--badge-green-text)",
  info: "stroke-(--badge-blue-text)",
  danger: "stroke-destructive-text",
};

export const TONE_TEXT: Record<Tone, string> = {
  primary: "text-accent-text",
  success: "text-(--badge-green-text)",
  info: "text-(--badge-blue-text)",
  danger: "text-destructive-text",
};

const TONE_BORDER_BG: Record<Tone, string> = {
  primary: "border-accent-border bg-accent-bg",
  success: "border-(--badge-green-bg) bg-(--badge-green-bg)",
  info: "border-(--badge-blue-bg) bg-(--badge-blue-bg)",
  danger: "border-destructive-border bg-destructive-bg",
};

export const TONE_FILL: Record<Tone, string> = {
  primary: "bg-accent-text",
  success: "bg-(--badge-green-text)",
  info: "bg-(--badge-blue-text)",
  danger: "bg-destructive-text",
};

/** Status thresholds for progress-style values: what the number itself means. */
export function toneForValue(value: number): Tone {
  if (value >= 90) return "success";
  if (value >= 70) return "primary";
  return "danger";
}

/* ───────────────────────────── Compliance ring ─────────────────────────────
   Animated progress donut. Stroke "fills" via pathLength as it scrolls in. */
export function ComplianceRing({
  value,
  label,
  sublabel,
  size = 168,
  tone = "primary",
  className,
}: {
  value: number;
  label?: string;
  sublabel?: string;
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = size / 2;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${label ?? "Value"}: ${value}%`}
        className="-rotate-90"
      >
        <circle cx={c} cy={c} r={r} fill="none" strokeWidth={stroke} className="stroke-border" />
        <motion.circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="butt"
          className={TONE_STROKE[tone]}
          pathLength={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-medium text-3xl text-text tracking-tight">
          <NumberTicker value={value} suffix="%" />
        </span>
        {label && (
          <span className="mt-1 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
            {label}
          </span>
        )}
        {sublabel && <span className="mt-0.5 text-text-muted text-xs">{sublabel}</span>}
      </div>
    </div>
  );
}

/* ──────────────────────────────── Sparkline ────────────────────────────────
   A small trend line that draws itself in, with an area wash beneath. */
export function Sparkline({
  data,
  width = 220,
  height = 64,
  className,
  trend = "down",
}: {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  /** "down" colours the line as an improving (declining incidents) trend. */
  trend?: "up" | "down";
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((d, i) => [i * stepX, height - ((d - min) / span) * (height - 8) - 4]);
  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const colour = trend === "down" ? "text-(--badge-green-text)" : "text-destructive-text";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn(colour, className)}
      role="img"
      aria-label="Trend over time"
    >
      <motion.path
        d={area}
        fill="currentColor"
        className="opacity-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      {pts.length > 0 && (
        <motion.circle
          cx={pts[pts.length - 1][0]}
          cy={pts[pts.length - 1][1]}
          r={3.5}
          fill="currentColor"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />
      )}
    </svg>
  );
}

/* ─────────────────────────────── Bar chart ─────────────────────────────────
   Vertical bars that grow from the baseline as they scroll in. */
export function BarChart({
  data,
  className,
  height = 180,
  format = (v) => `${v}`,
  accentIndex,
}: {
  data: { label: string; value: number; caption?: string; tone?: Tone }[];
  className?: string;
  height?: number;
  format?: (v: number) => string;
  /** Index of the bar to render in the primary accent when no bar sets its own `tone`. Defaults to the last bar. */
  accentIndex?: number;
}) {
  const max = Math.max(...data.map((d) => d.value));
  const accent = accentIndex ?? data.length - 1;
  const hasTones = data.some((d) => d.tone);

  return (
    <div className={cn("flex items-end gap-3 sm:gap-5", className)} style={{ height }}>
      {data.map((d, i) => {
        const tone: Tone | null = d.tone ?? (!hasTones && i === accent ? "primary" : null);
        return (
          <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span
              className={cn(
                "font-medium text-sm tabular-nums",
                tone ? TONE_TEXT[tone] : "text-text",
              )}
            >
              {format(d.value)}
            </span>
            <motion.div
              className={cn(
                "w-full origin-bottom border",
                tone ? TONE_BORDER_BG[tone] : "border-border bg-bg-secondary",
              )}
              style={{ height: `${(d.value / max) * 100}%` }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            />
            <span className="text-center font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
              {d.label}
            </span>
            {d.caption && (
              <span className="text-center text-[0.65rem] text-text-muted">{d.caption}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────── Progress rows ─────────────────────────────
   Labelled square meters that fill from the left as they scroll in. */
export function ProgressRows({
  rows,
  className,
}: {
  rows: { label: string; value: number; tone?: Tone }[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {rows.map((row, i) => (
        <div key={row.label}>
          <div className="flex items-baseline justify-between">
            <span className="text-text-secondary text-xs">{row.label}</span>
            <span className="font-mono text-[0.6rem] text-text-tertiary tabular-nums">
              {row.value}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full bg-bg-secondary">
            <motion.div
              className={cn("h-full", row.tone ? TONE_FILL[row.tone] : "bg-text")}
              style={{ originX: 0 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: row.value / 100 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────── Heatmap ──────────────────────────────────
   A grid of square cells whose ink scales with intensity (values 0–1). */
export function Heatmap({
  data,
  cols = 7,
  className,
}: {
  data: number[];
  cols?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("grid gap-1", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {data.map((v, i) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static heatmap, cells never reorder
          key={i}
          className="aspect-square bg-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 + v * 0.78 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.015, ease: EASE }}
        />
      ))}
    </div>
  );
}
